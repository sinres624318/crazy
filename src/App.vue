<template>
  <div>
    <c-tabs :tabs-data="[0,1,2,3,4,5,6,7,8,0,9,1,4,123,5,12,12]"></c-tabs>
  </div>
</template>

<script>
  import CTabs from './components/tabs';

  export default {
    name: 'App',
    components: {
      CTabs
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
