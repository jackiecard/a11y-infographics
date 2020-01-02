<template>
  <div class="section-control">
    <slot name="remove" />
  </div>
</template>
<script>
export default {
  name: 'SectionControl',
  props: {
    text: { type: String }
  }
}
</script>

<style lang="scss">
  .section-control{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
  }
</style>
