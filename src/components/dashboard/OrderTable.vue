<template>
    <table class="order-table">
        <thead>
        <tr>
            <th v-for="(col, index) in columns">
                {{ col.title }}
            </th>
        </tr>
        </thead>
        <transition-group name="list-complete" tag="tbody">
        <tr v-for="(o, index) in data" :key="o.city" class="list-complete-item">
            <td v-for="v in o">
                {{ v }}
            </td>
        </tr>
        </transition-group>
    </table>
</template>
<script>
    export default {
        props:['data','columns']
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .list-complete-item {
        transition: opacity 1s linear;
        opacity: 1;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
    }
    .list-complete-leave-active {
        position: absolute;
        color: transparent;
        width: 0;
        height: 0;
    }
    .order-table{
        width: 100%;
        border-collapse:collapse;
        td,th{
            width: 16.5%;
            text-align: center;
            height:58px ;
        }
        thead{
            tr{
                background-image: url("./city_rank_bg.png");
                background-size: cover;
                th{
                    background: transparent;
                    color: white;
                    text-align: center;
                }
            }
        }
        tbody{
            tr{
                border-top:0;
                border-left:0;
                border-right:0;
                border-bottom: 2px solid  #F4F4F4;
            }
        }
    }
</style>