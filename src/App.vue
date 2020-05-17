<template>
  <div>
    <c-tabs @change="change">
      <c-tab-item label="item" asd="123" value="111111111111111">111111111111111</c-tab-item>
      <c-tab-item label="item">2222222222</c-tab-item>
      <c-tab-item label="item">333333333</c-tab-item>
      <c-tab-item label="item">34444444</c-tab-item>
      <c-tab-item label="item">5555555</c-tab-item>
      <c-tab-item label="item">66666666</c-tab-item>
      <c-tab-item label="item">7777777777</c-tab-item>
    </c-tabs>
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
      return {}
    },
    methods: {
      change(val) {
        console.log(val)
      }
    }
  }
</script>

<style>
</style>
