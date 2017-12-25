<template>
  <router-link :to="to" class="link-details">
    <slot></slot>
  </router-link>
</template>
<script>
  export default {
    props: ['to'],
    created () {
      
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .link-details {
    color: #1889E3
  }
</style>
