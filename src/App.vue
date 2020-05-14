<template>
  <div>
    <c-input type="number" show-word-limit maxlength="110" :show-step-button="true"
             placeholder="请输入"
             @input="input" v-model="value"></c-input>
    <c-input type="textarea" show-word-limit maxlength="12220" :show-step-button="true"
             placeholder="请输入"
             @input="textarea" v-model="value2"></c-input>
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
        value: '',
        value2: '',
        elTextarea: ''
      }
    },
    methods: {
      input() {
        console.log(this.value)
      },
      textarea() {
        console.log(this.value2)
      },
    }
  }
</script>

<style>
</style>
