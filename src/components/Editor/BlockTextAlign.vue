<template>
  <div>
    <div
      v-for="(types, i) in availableTypes" 
      :key="i" >
      <input 
        type="radio" 
        v-model="inputVal"
        :id="types"
        :name="types" 
        :value="types">
      <label :for="types">{{types}}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlockTextAlign',
  props: ['value'],
  data() {
    return {
      availableTypes: ['left', 'center', 'right']
    }
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
