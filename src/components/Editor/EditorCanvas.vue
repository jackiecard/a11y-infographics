<script>
import ColumnElement from './ColumnElement.vue'
import BlockElement from './BlockElement.vue'
export default {
  name: 'EditorCanvas',
  components: {
    ColumnElement,
    BlockElement
  },
  props: {
    sections: { type: Array, required: true }
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 800 ? true : false;
    }
  },
  render(createElement) {
    return createElement('div', {
        class: 'editor-canvas'
      },
      this.sections.map((section) => {
        return createElement('div', {
            class: 'section',
            style: { display: this.isMobile ? 'block' : 'flex' },
          },
          section.columns.map((column) => {
            return createElement('ColumnElement', {
                props: {
                  column: column,
                  size: section.columns.length
                }
              },
            )
          })
        )
      })
    );
  }
}
</script>
