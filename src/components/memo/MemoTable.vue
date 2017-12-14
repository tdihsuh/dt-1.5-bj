<template>
  <div class="memo-list">
    <i-table :columns="columns" :data="data"></i-table>
  </div>
</template>
<script>

  export default {
    props: ['columns', 'data', 'isPublish'],
  }

</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>
