<template>
  <div>
    <select v-model="inputVal">
      <option 
        v-for="(types, i) in availableTypes" 
        :key="i" 
        :value="types">{{types}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'BlockTypeEdit',
  props: {
    value: { required: true },
    availableTypes: { required: false, default: () => ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>

<style lang="scss">
</style>
