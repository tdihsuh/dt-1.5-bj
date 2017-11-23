<template>
    <div class="tab-label">
        <span class="tab-text"><i class="iconfont" :class="icon"></i>&nbsp;{{ text }}</span>
        <Badge :count="count"></Badge>
    </div>
</template>
<script>
    export default {

        props:['text','count','icon'],
        data(){
            return {

            }
        },
        created(){

        },
        methods:{ }
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .tab-label{
        .iconfont{
            font-size: 18px;
        }
       /* .icon{
            position: relative;
            width: 16px;
            height: 16px;
            top:2px;
            margin-right: 3px;
            overflow: hidden;
        }*/
    }
</style>