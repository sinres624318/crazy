<template>
  <div>
    <c-tabs @change="change">
      <c-tab-item value="123" c="123">
        <div>123</div>
        <div>123</div>
        <div>123555</div>
        <div>123555</div>
      </c-tab-item>
      <c-tab-item :value="item" :label="item.text" v-for="item in tabsData"></c-tab-item>
      <c-tab-item label="item"></c-tab-item>
      <c-tab-item label="item">34444444</c-tab-item>
      <c-tab-item label="item">5555555</c-tab-item>
      <c-tab-item label="item">66666666</c-tab-item>
      <c-tab-item label="item">7777777777</c-tab-item>
    </c-tabs>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        tabsData:[
          {
            id:1,
            text:'123'
          },
          {
            id:2,
            text:'234'
          },
          {
            id:3,
            text:'345'
          },
          {
            id:4,
            text:'456'
          },
        ]
      }
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
