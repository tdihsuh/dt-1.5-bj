<template>
  <div class="memo-list">
    <i-table :columns="columns" :data="data"></i-table>
   <!-- <Page &lt;!&ndash;:total="total" :current="Number(current)+1" :pageSize="pageSize" @on-change="changePage"&ndash;&gt;
          show-elevator></Page>-->
  </div>
</template>
<script>

  export default {
    props: ['columns', 'data', 'isPublish'],
  }

</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>
