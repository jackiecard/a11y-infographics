<script>
import { mapGetters, mapActions } from 'vuex'
import EditorCanvas from './EditorCanvas.vue'
export default {
  name: 'Editor',
  components: {
    EditorCanvas
  },
  computed: mapGetters([
    'projectName',
    'structure',
  ]),
  methods: {
    ...mapActions([
      'setProjectName',
      'setStructure',
      'removeSection',
      'undo',
      'addSection',
      'duplicateSection'
    ])
  },
  render(createElement) {
    return createElement('EditorCanvas', {
        props: {
          sections: this.structure.sections,
          removeSection: this.removeSection,
          undoAction: this.undo,
          addSection: this.addSection,
          duplicateSection: this.duplicateSection
        }
      }
    );
  }
}
</script>

<style lang="scss">
.editor {
  margin: 40px 0 0;
}
</style>
