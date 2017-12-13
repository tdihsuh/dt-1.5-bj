<template>
    <div class="item-list-wrapper" >
    <ul class="item-list clear" v-for="o in list" :style="listStyle">
        <li v-for="item in o "  class="clear">
            <span class="item-name">{{ item.name }}</span><span class="item-content">{{ item.content }}</span>
        </li>
    </ul>
   </div>
</template>
<script>
    export default {
        props:['list','listStyle'],
        created(){
           // console.log(this.list);
        }
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
.item-list{
    padding: 10px 40px;
    >li{
        font-size:14px;
        display: block;
        padding: 1px 0;
        .item-name,.item-content{
            display: inline-block;
            line-height:30px;
            text-aligFormn:left;
            float: left;
        }
        >.item-name{
            width: 20%;
            color:#9b9b9b;

        }
        >.item-content{
            color:#353842;
            width: 80%;
        }
    }
}
</style>