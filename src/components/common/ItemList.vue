<template>
    <div class="item-list-wrapper">
    <ul class="item-list clear" v-for="o in list">
        <li v-for="item in o " key="item.name" class="clear">
            <span class="item-name">{{ item.name }}</span><span class="item-content">{{ item.content }}</span>
        </li>
    </ul>
   </div>
</template>
<script>
    export default {
        props:['list'],
        created(){
           // console.log(this.list);
        }
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    ul:first-child{
        border-top:0;
    }

.item-list{
    padding: 15px 40px;
    border-top: 2px solid #e6e6e6;
    >li{
        font-size:14px;
        display: block;

        padding: 1px 0;
        .item-name,.item-content{
            display: inline-block;
            line-height:30px;
            text-align:left;
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