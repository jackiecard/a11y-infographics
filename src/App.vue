<template>
  <div id="app">
    <FlowEditor/>
  </div>
</template>

<script>
import FlowEditor from './components/Flow/FlowEditor.vue'

export default {
  name: 'app',
  components: {
    FlowEditor
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
} */
</style>
