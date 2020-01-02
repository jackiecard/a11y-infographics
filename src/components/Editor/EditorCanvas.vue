<template>
  <div :class="['editor-canvas', { 'editor-canvas--edit': editMode}]">
    <button @click="toggleEditMode">Edit</button>
    <button @click="undoAction">Undo</button>
    <button @click="addSection">Add Section</button>
    <section 
      v-for="(section, i) in sections" 
      :key="i"
      class="section"
      :style="{ flexDirection: section.type === 'list' ? 'column' : 'row' }">
      <section-control>
        <template slot="remove">
          <button class="btn btn--remove" @click="removeSection(section.id)">
            Remove
          </button>
          <button class="btn btn--remove" @click="duplicateSection(section.id)">
            Duplicate
          </button>
        </template>
      </section-control>

      <column-element
        v-for="(column, c) in section.columns"
        :key="c"
        :column="column"
        :size="section.columns.length"
        :isList="section.type === 'list'"/>

    </section>
  </div>
</template>
<script>
import ColumnElement from './ColumnElement.vue'
import SectionControl from './SectionControl.vue'

export default {
  name: 'EditorCanvas',
  components: {
    ColumnElement,
    SectionControl
  },
  data() {
    return {
      editMode: true
    }
  },
  props: {
    sections: { type: Array, required: true },
    removeSection: { type: Function, required: true },
    undoAction: { type: Function, required: true },
    addSection: { type: Function, required: true },
    duplicateSection: { type: Function, required: true },
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode
    }
  }
}
</script>

<style lang="scss">
  .editor-canvas {

    &--edit {
      .section {
        outline: 3px solid green;
      }

      .column {
        outline: 3px solid yellow;
      }

      .block {
        outline: 3px solid pink;
      }
    }

    .section {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column !important;
      }
    }
  }
</style>