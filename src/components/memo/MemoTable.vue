<template>
    <div class="memo-list">
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>
<script>

    export default {
        props:['columns','data','isPublish'],
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
</style>