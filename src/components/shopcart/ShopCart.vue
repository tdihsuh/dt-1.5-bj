<template>
    <div class="shop-cart">
        <ul class="shop-cart-list">
            <li v-for="(item,index) in itemList" class="shop-cart-item"
                key="{index}" >
                <div>
                    <img class="image" :src="item.image"/>
                    <span class="desc">
                        <div class="price">{{item.price | currency('￥') }}</div>
                        <div>{{item.desc}}</div>
                    </span>
                    <img class="add" :src="addImage" @click="add(item)"/>
                </div>
            </li>
        </ul>
        <div class="total">{{ productValue.amount |currency('￥')}}</div>
        <div class="total-panel">
            <span class="amount">商品数量：{{ productValue.size }}</span>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from  'vuex'
    export default {
        data(){
            return {
                addImage:require('./add.png'),
                itemList: [
                    {
                        id: 1,
                         image:require('./1.jpg'),
                        price: '2999',
                        desc: 'OPPO R11 全网通4G+64G 双卡双待手机 玫瑰金色',
                        quantiy:0
                    },
                    {
                        id: 2,
                          image:require('./2.jpg'),
                        price: '999.00',
                        desc: '荣耀 畅玩6A 3GB+32GB 金色 全网通4G手机 双卡双待'
                    },
                    {
                        id: 3,
                         image:require('./3.jpg'),
                        price: '2498.00',
                        desc: 'vivo X9s 全网通 4GB+64GB 磨砂黑 移动联通电信4G手机 双卡双待'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
                productValue: 'productValue'
            })
        },
        methods:{
            add(item){
                this.$store.commit('add', item)
            }
        }

    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import '../common';
    .shop-cart{
        >.shop-cart-list{
            padding: 10px;
            >.shop-cart-item {
                margin-bottom: 20px;
                > div {
                    height: 100px;
                    background-color: #f5f5d5;
                    margin-bottom: 10px;
                    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
                    border-radius: @border-radius-base*1.5 @border-radius-base*1.5;
                    //border: 1px solid @primary-color;
                    > span {
                        display: inline-block;
                        position: relative;
                        top: -40px;
                        height: 80px;
                        line-height: 80px;
                        margin: 10px 10px;
                    }
                    > img.image {
                            height: 80px;
                            margin: 10px 10px;
                    }
                    > .desc {
                        display: inline-block;
                        color: @primary-color;
                        line-height: 30px;
                        margin: 20px 10px;
                        top: -30px;
                        >.price{
                            top:0;
                            color: @error-color;
                            font-weight:800;
                        }
                    }
                    >img.add{
                        height: 40px;
                        margin: 30px 20px;
                        float: right;
                        &:hover{
                            cursor: pointer;
                        }

                    }

                }

                }
            }
        }
    .total{
        position: fixed;
        bottom: 0;
        width: 10%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border:1px solid @primary-color;
        background: @primary-color;
        z-index: 99;
        left: 0;
        color: white;
        font-weight: 800;
        font-size:18px ;
        border-radius: @border-radius-base*1.5 @border-radius-base*1.5 0 0 ;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    }
    .total-panel{
        position: fixed;
        bottom: 0;
        right: 0;
        width: 89%;
        padding:0 1%;
        height: 40px;
        z-index: 98;
        background-color: white;
        border: 1px solid lightgray;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
        >span{
            display: inline-block;
            height: 40px;
            line-height: 40px;
        }
        >.amount{
            float: right;
        }

    }

</style>