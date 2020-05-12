<template>
  <div>
    <c-input type="text" show-word-limit maxlength="110" :show-step-button="true" @input="input" v-model="value" :thousand-mark="true" :value-thousand-mark="false"></c-input>
    <c-input type="textarea" show-word-limit maxlength="12220" :show-step-button="true" @input="textarea" v-model="value2"></c-input>
  </div>
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
        value: '1233',
        value2: 'asdasda'
      }
    },
    methods: {
      input() {
        console.log(this.value)
      },
      textarea() {
        console.log(this.value2)
      }
    }
  }
</script>

<style>
</style>
