<template>
  <div id="app">
    <Editor/>
  </div>
</template>

<script>
import Editor from './components/Editor/Editor.vue'

export default {
  name: 'app',
  components: {
    Editor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}
</style>
