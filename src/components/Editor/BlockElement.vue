<script>
export default {
  name: 'BlockElement',
  props: {
    block: { type: Object, required: true }
  },
  render(createElement) {
    const textElement = createElement(this.block.elemType || 'div', {
        class: 'block',
        style: [
          this.block.style,
          { fontSize: `${this.block.width/10}vw` }
        ]
      },
      this.block.value
    );

    const imageElement = createElement(this.block.elemType || 'div', {
        class: 'block',
        style: [
          this.block.style
        ],
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
