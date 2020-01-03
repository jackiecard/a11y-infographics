<template>
  <div>
    <button @click="toggleCanvas()">Show Structure</button>
    <button @click="render()">Render</button>
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
    <div class="canvas"
      v-if="showCanvas"
      :style="[containerStyle, {'--canvas-aspect-ratio:': `${containerWidth} / ${containerHeight}` }]" 
      ref="parent">
      <section 
        v-for="(section, k) in sections" 
        :key="k"
        class="section"
        >
        <vue-draggable-resizable 
          v-for="(block, i) in sectionBlocks(section.id)"
          :key="i"
          :w="block.coordinates.width" 
          :h="block.coordinates.height"
          :minHeight="50" 
          :minWidth="50"
          :grid="[10,10]"
          :handles="['tl','tr','br','bl']"
          :style="{ width: block.coordinates.width + '%', height: block.coordinates.height + '%', left: block.coordinates.left + '%', top: block.coordinates.top + '%', 'z-index': block.config.zIndex }"
          @activated="active = block"
          @resizing="(left, top, width, height) => onResizing(block.id, width, height)"
          @dragging="(left, top) => onDragging(block.id, left, top)">

          <div class="control">
            <button class="btn btn--handle">X</button>
            <button class="btn btn--layer-up" @click="layerUp(block.id, block.config.zIndex)">U</button>
            <button class="btn btn--layer-down" @click="layerDown(block.id, block.config.zIndex)">D</button>
          </div>
          <BlockElement :block="block"></BlockElement>
        </vue-draggable-resizable>
      </section>
    </div>

    <!-- <div class="config">
      {{active}}
    </div> -->
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import BlockElement from '../Editor/BlockElement'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FlowEditor',
  components: {
    VueDraggableResizable,
    BlockElement
  },
  data() {
    return {
      showCanvas: true,
      active: null
    }
  },
  computed: {
    ...mapGetters([
      'projectName',
      'blocks',
      'containerWidth',
      'containerHeight',
      'containerStyle',
      'sections'
    ])
  },
  methods: {
    ...mapActions([
      'setProjectName',
      'setBlockCooordinates',
      'setBlockConfig',
      'render'
    ]),
    onDragging(id, left, top) {
      let x = (left / this.$refs.parent.offsetWidth) * 100;
      let y = (top / this.$refs.parent.offsetHeight) * 100;

      this.setBlockCooordinates({
        id: id,
        coordinates: {
          left: x,
          top: y
        }
      })
    },
    onResizing(id, width, height) {
      let w = (width / this.$refs.parent.offsetWidth) * 100;
      let h = (height / this.$refs.parent.offsetHeight) * 100;

      this.setBlockCooordinates({
        id: id,
        coordinates: {
          width: w,
          height: h
        }
      })
    },
    layerUp(id, z) {
      console.log(id, z)
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
          zIndex: z - 1
        }
      })
    },
    sectionBlocks(sectionId) {
      return this.blocks.filter(block => block.sectionId === sectionId)
    },
    toggleCanvas() {
      this.showCanvas = !this.showCanvas
    }
  },
}
</script>

<style lang="scss">
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
