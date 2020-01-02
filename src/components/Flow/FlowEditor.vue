<template>
  <div class="wrapper"
    :style="[containerStyle, {'--wrapper-aspect-ratio:': `${containerWidth} / ${containerHeight}` }]" 
    ref="parent">
    <section v-for="(section, k) in sections" :key="k">
      <vue-draggable-resizable 
        v-for="(block, i) in sectionBlocks(section.id)"
        :key="i"
        :w="block.width" 
        :h="block.height"
        :minHeight="50" 
        :minWidth="50"
        :grid="[20,20]"
        :handles="['tl','tr','br','bl']"
        :style="{ width: block.width + '%', height: block.height + '%', left: block.x + '%', top: block.y + '%', 'z-index': block.zIndex }"
        @resizing="(left, top, width, height) => onResizing(block.id, width, height)"
        @dragging="(left, top) => onDragging(block.id, left, top)">

        <button class="btn btn--handle">X</button>
        <button class="btn btn--layer-up" @click="layerUp(block.id, block.zIndex)">U</button>
        <button class="btn btn--layer-down" @click="layerDown(block.id, block.zIndex)">D</button>
        <BlockElement :block="block"></BlockElement>
      </vue-draggable-resizable>
    </section>
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
      'setBlockConfig'
    ]),
    onDragging(id, left, top) {
      let x = (left / this.$refs.parent.offsetWidth) * 100;
      let y = (top / this.$refs.parent.offsetHeight) * 100;

      this.setBlockConfig({
        id: id,
        config: {
          x: x,
          y: y
        }
      })
    },
    onResizing(id, width, height) {
      let w = (width / this.$refs.parent.offsetWidth) * 100;
      let h = (height / this.$refs.parent.offsetHeight) * 100;

      this.setBlockConfig({
        id: id,
        config: {
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
          zIndex: z - 1
        }
      })
    },
    sectionBlocks(sectionId) {
      return this.blocks.filter(block => block.sectionId === sectionId)
    }
  },
}
</script>

<style lang="scss">
.editor {
  margin: 40px 0 0;
}

.wrapper {
  --wrapper-aspect-ratio: 1/1;
  position: relative;

  &::before {
   content: "";
   display: block;
   padding-bottom: calc(100% / (var(--wrapper-aspect-ratio)));
 }
}

.draggable.active {
  .btn {
    display: block;
  }
}

.btn {
  position: absolute;
  border: 1px solid black;
  width: 40px;
  height: 40px;
  display: none;

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
</style>
