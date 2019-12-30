<script>
import BlockElement from './BlockElement.vue'

export default {
  name: 'ColumnElement',
  components: {
    BlockElement
  },
  props: {
    column: { type: Object, required: true },
    size: { type: Number, required: true }
  },
  render(createElement) {
    const block = this.column.blocks.map((block) => {
      return createElement('BlockElement', {
          props: {
            block: block
          }
        }
      )
    });

    return createElement('div', {
        class: 'column',
        style: [
          { width: (this.isMobile ? 100 : (100 / this.size)) + '%' }, 
          this.column.style
        ]
      },
      block
    )
  }
}
</script>