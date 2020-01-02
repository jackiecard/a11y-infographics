<script>
import BlockElement from './BlockElement.vue'

export default {
  name: 'ColumnElement',
  components: {
    BlockElement
  },
  props: {
    column: { type: Object, required: true },
    size: { type: Number, required: true },
    isList: { type: Boolean, required: false, default: false }
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 800 ? true : false;
    }
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

    const blockWrapper = createElement('div', {
        class: 'block-wrapper'
      },
      block
    );

    return createElement('div', {
      class: 'column',
      style: [
          { width: (this.isList ? 100 : (100 / this.size)) + '%' }, 
          this.column.style
        ]
      },
      [blockWrapper]
    )
  }
}
</script>

<style lang="scss">
  .column {
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
      width: 100% !important;
    }
  }
</style>
