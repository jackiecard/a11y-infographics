<template>
  <div>
    <Menu>
      <Logo/>
      <button>New</button>
      <button>Undo</button>
      <button @click="render()">Render</button>
      <div v-if="active"
        @mouseover="mouseOverConfig = true" 
        @mouseout="mouseOverConfig = false">
        <input type="text" v-model="active.value" />
        <input type="text" v-model="active.elemType" />
        <input type="text" v-model="active.style.backgroundColor" />
        <input type="text" v-model="active.style.textAlign" />
      </div>
    </Menu>
    <button @click="toggleCanvas()">{{this.showCanvas ? 'Structure' : 'Canvas'}} View</button>
    <button @click="toggleOutlineBlocks()">{{this.outlineBlocks ? 'Hide' : 'Show'}} Outline</button>
    <select v-model="$store.state.mobileMode">
      <option :value=false>Desktop</option>
      <option :value=true>Mobile</option>
    </select>
    <div class="structure"
      v-if="!showCanvas">
      <section 
        v-for="(section, k) in sections" 
        :key="k"
        >
        <ul>
          <li 
            v-for="(block, i) in sectionBlocks(section.id)"
            :key="i">
            <BlockElement :block="block" :hide-styles="true"></BlockElement>
          </li>
        </ul>
      </section>
    </div>
    <div class="canvas-wrapper">
      <div 
        :class="['canvas', ,
                 { 'canvas--blocks': outlineBlocks }]"
        v-if="showCanvas"
        :style="[containerStyle, 
          {'--canvas-aspect-ratio': containerSize }]" 
        ref="parent">
        <section 
          v-for="(section, k) in sections" 
          :key="k"
          class="section"
          >
          <div 
            v-for="(block, i) in sectionBlocks(section.id)"
            :key="i">
            <vue-draggable-resizable 
              :w="block.coordinates.width" 
              :h="block.coordinates.height"
              :minHeight="50" 
              :minWidth="50"
              :grid="[10,10]"
              :handles="['tl','tr','br','bl']"
              :style="blockCoordinates(block)"
              @activated="setActive(block), editOn(block.id)"
              @deactivated="editOff"
              @resizing="(left, top, width, height) => onResizing(left, top, width, height, block)"
              @dragging="(left, top) => onDragging(left, top, block)">
              <div class="control">
                <button class="btn btn--handle">X</button>
                <button class="btn btn--layer-up" @click="layerUp(block.id, block.config.zIndex)">U</button>
                <button class="btn btn--layer-down" @click="layerDown(block.id, block.config.zIndex)">D</button>
              </div>
              <BlockElement v-if="!isEditable(block)" :block="block"></BlockElement>
              <textarea 
                v-if="isEditable(block)" 
                class="editing" 
                v-model="block.value"
                :style="[block.style, { fontSize: `${block.coordinates.width/20}vw` }, { resize: 'none' }]"></textarea>
            </vue-draggable-resizable>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import vClickOutside from 'v-click-outside'
import BlockElement from '../Editor/BlockElement'
import Logo from '../Editor/Logo'
import Menu from '../Editor/Menu'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FlowEditor',
  components: {
    VueDraggableResizable,
    BlockElement,
    Logo,
    Menu
  },
  directives: {
    vClickOutside
  },
  data() {
    return {
      showCanvas: true,
      outlineBlocks: true,
      active: null,
      activeId: null,
      editing: false,
      mouseOverConfig: false,
      isMobile: window.innerWidth <= 800
    }
  },
  computed: {
    ...mapGetters([
      'projectName',
      'blocks',
      'containerStyle',
      'containerDesktop',
      'containerMobile',
      'sections',
      'mobileMode'
    ]),
    containerSize() {
      return `${this.isMobile ? this.containerMobile.width : this.containerDesktop.width} / ${this.isMobile ? this.containerMobile.height : this.containerDesktop.height}`
    }
  },
  methods: {
    ...mapActions([
      'setProjectName',
      'setBlockCooordinates',
      'setBlockConfig',
      'render',
      'setMobileMode'
    ]),
    onDragging(left, top, block) {
      this.setActive(block);

      let x = (left / this.$refs.parent.offsetWidth) * 100;
      let y = (top / this.$refs.parent.offsetHeight) * 100;

      this.setBlockCooordinates({
        id: block.id,
        coordinates: {
          left: x,
          top: y
        }
      })
    },
    onResizing(left, top, width, height, block) {
      this.setActive(block);

      let w = (width / this.$refs.parent.offsetWidth) * 100;
      let h = (height / this.$refs.parent.offsetHeight) * 100;

      this.setBlockCooordinates({
        id: block.id,
        coordinates: {
          width: w,
          height: h
        }
      })
    },
    layerUp(id, z) {
      this.setBlockConfig({
        id: id,
        config: {
          zIndex: z + 1
        }
      })
    },
    layerDown(id, z) {
      this.setBlockConfig({
        id: id,
        config: {
          zIndex: (z - 1) >= 0 ? z - 1 : 0
        }
      })
    },
    sectionBlocks(sectionId) {
      return this.blocks.filter(block => block.sectionId === sectionId)
    },
    toggleCanvas() {
      this.showCanvas = !this.showCanvas
    },
    setActive(block) {
      this.active = block;
    },
    editOn(id) {
      this.activeId = id;
    },
    editOff() {
      if (this.mouseOverConfig) {
        return;
      }
      this.activeId = null;
      this.active = null;
    },
    isEditable(block) {
      return block.type === 'text' && this.activeId === block.id
    },
    toggleOutlineBlocks() {
      this.outlineBlocks = !this.outlineBlocks;
    },
    blockCoordinates(block) {
      if(this.mobileMode) {
        return { width: block.coordinatesMobile.width + '%', height: block.coordinatesMobile.height + '%', left: block.coordinatesMobile.left + '%', top: block.coordinatesMobile.top + '%', 'z-index': block.config.zIndex }
      }
      return { width: block.coordinates.width + '%', height: block.coordinates.height + '%', left: block.coordinates.left + '%', top: block.coordinates.top + '%', 'z-index': block.config.zIndex }
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

* {
  box-sizing: border-box;
}

.editor {
  margin: 40px 0 0;
}

.canvas {
  --canvas-aspect-ratio: 1/1;
  position: relative;

  &::before {
   content: "";
   display: block;
   padding-bottom: calc(100% / (var(--canvas-aspect-ratio)));
 }

 .block {
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100%;
 }

 .vdr {
   border-color: transparent;
 }

 &--blocks {
  .vdr {
    border-color: black;
  }
 }
}

.canvas-wrapper {
  max-width: 75%;
}

.draggable.active {
  .control {
    display: block;
  }
}

.control {
  display: none;
}

.config {
  position: absolute;
  z-index: 999;
  width: 190px;
  top: 0;
  right: 0;
  background: white;
}

.editing {
  width: 100%;
  height: 100%;
}

.btn {
  position: absolute;
  border: 1px solid black;
  width: 40px;
  height: 40px;

  &--handle {
    right: 0;
  }

  &--layer-up {
    right: 40px;
  }

  &--layer-down {
    right: 80px;
  }
}

.structure {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>
