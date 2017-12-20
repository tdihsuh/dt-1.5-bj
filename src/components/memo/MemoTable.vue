<template>
  <div class="memo-list">
    <i-table :columns="columns" :data="data" :row-class-name="rowClassName"></i-table>
  </div>
</template>
<script>

  export default {
    props: ['columns', 'data', 'isPublish'],
    methods:{
      rowClassName (row, index) {
        return 'row-list'
      },
    }
  }

</script>
<style rel="stylesheet/less" lang="less">
  .memo-list{
    .row-list {
      font-size: 12px;
    }
    td{
      font-size: 12px!important;
    }
  }

</style>
