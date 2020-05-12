<template>
  <c-input type="number" @input="input" v-model="value" :thousand-mark="true"></c-input>
</template>

<script>
  import CInput from './components/input';

  export default {
    name: 'App',
    components: {
      CInput
    },
    data() {
      return {
        value: '123'
      }
    },
    methods: {
      input() {
        console.log(this.value)
      }
    }
  }
</script>

<style>
</style>
