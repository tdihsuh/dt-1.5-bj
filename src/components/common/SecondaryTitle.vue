<template>
    <div class="secondary-title">
        <img :src="lableIcon"><div class="secondary-title-text">{{ title }}</div>
    </div>
</template>
<script>

    export default {
        props:['title'],
        data(){
            return {
                lableIcon:require('../../images/lable.png')
            }
        }

    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .secondary-title{
        font-size:16px;
        color:#353842;
        line-height:24px;
        text-align:left;
        padding: 25px 0 0 12px;
        >img{
            width:14px;
            height:20px;
            position: relative;
            top:4px;
        }
        >.secondary-title-text{
            font-size:18px;
            color:#4a4a4a;
            letter-spacing:0;
            text-align:left;
            display: inline-block;
            margin-left: 14px;
        }
    }
</style>