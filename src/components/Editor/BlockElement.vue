<script>
export default {
  name: 'BlockElement',
  props: {
    block: { type: Object, required: true }
  },
  render(createElement) {
    const textElement = createElement(this.block.elemType || 'div', {
        class: 'column',
        style: this.block.style
      },
      this.block.value
    );

    const imageElement = createElement(this.block.elemType || 'div', {
        class: 'column',
        style: this.block.style,
        attrs: this.block.elemType == 'img' ? {
          src: this.block.src,
          alt: this.block.value
        } : null,
      }
    );

    return this.block.type === 'text' ? textElement : imageElement
  }
}
</script>

<style lang="scss">
</style>
