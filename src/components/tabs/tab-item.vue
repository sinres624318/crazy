<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "CTabItem",
    inheritAttrs: false,
    props: {
      label: String
    },
    updated() {
      // this.$parent.$emit('tab-nav-update');
    }
  }
</script>

<style scoped>

</style>
