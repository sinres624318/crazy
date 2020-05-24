<template>
  <div>
    <c-rate v-model="rateValue" :show-score="true"></c-rate>
    <c-tabs @change="change">
      <c-tab-item value="123" c="123">
        <div>123</div>
        <div>123</div>
        <div>123555</div>
        <div>123555</div>
      </c-tab-item>
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
        rateValue: 0.3,
      }
    },
    watch: {
      rateValue() {
        console.log(this.rateValue)
      }
    },
    methods: {
      change(val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>
</style>
