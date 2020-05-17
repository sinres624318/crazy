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
    }
  }
</script>

<style scoped>

</style>
