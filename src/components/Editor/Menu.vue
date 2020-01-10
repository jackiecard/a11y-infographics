<template>
  <aside class="menu">
    <slot/>
  </aside>
</template>
<script>
export default {
  name: 'Menu',
  props: {
  },
}
</script>

<style lang="scss">
.menu {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
  background: white;
  z-index: 999;
  padding: 0 20px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.29);
  color: #2D2D2D;
}
</style>
