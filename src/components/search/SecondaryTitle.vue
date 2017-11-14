<template>
    <div class="secondary-title">
        <img :src="lable"><div class="secondary-title-text">{{ title }}</div>
    </div>
</template>
<script>
    props:['title']
    export default {
        label:require('./lable.png')
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .secondary-title{
        font-size:16px;
        color:#353842;
        line-height:24px;
        text-align:left;
    }
</style>