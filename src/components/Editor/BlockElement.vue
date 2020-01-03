<script>
export default {
  name: 'BlockElement',
  props: {
    block: { type: Object, required: true },
    hideStyles: { type: Boolean, required: false, default: false }
  },
  render(createElement) {
    const textElement = createElement(this.block.elemType || 'div', {
        class: 'block',
        style: !this.hideStyles ? [
          this.block.style,
          { fontSize: `${this.block.config.width/10}vw` }
        ] : null
      },
      this.block.value
    );

    const imageElement = createElement(this.block.elemType || 'div', {
        class: 'block',
        style: !this.hideStyles ? [
          this.block.style,
          { width: `100%` },
          { height: `100%` }
        ] : null,
        attrs: this.block.attrs ? this.block.attrs : null,
      }
    );

    return this.block.type === 'text' ?  textElement : imageElement;
  }
}
</script>

<style lang="scss">
.block {
  * {
    font-size: 100%;
  }
}
</style>
