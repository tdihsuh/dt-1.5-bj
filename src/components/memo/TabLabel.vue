<template>
    <div class="tab-label" @mouseenter="enter" @mouseleave="leave" @click="change()">
        <img :src="iconImg" class="icon"/>
        <span class="tab-text">{{ text }}</span>
        <Badge :count="count"></Badge>
    </div>
</template>
<script>
    export default {

        props:['img','text','count','active'],
        data(){
            return {
                iconImg:undefined,
                activeText:this.active
            }
        },
        created(){
            if(this.activeText === this.text){
                this.iconImg = require(`${this.img}_selected.png`)
            }
            else{
                this.iconImg = require(`${this.img}.png`)
            }
        },
        methods:{
            enter(){
                    this.iconImg = require(`${this.img}_selected.png`)
            },
            leave(){
                if(this.activeText !== this.text){
                    this.iconImg = require(`${this.img}.png`)
                }

            },
            change(){
                console.log
                this.iconImg = require(`${this.img}_selected.png`)
                console.log(this.iconImg)
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .tab-label{
        .icon{
            position: relative;
            width: 16px;
            height: 16px;
            top:2px;
            margin-right: 3px;
            overflow: hidden;
        }
    }
</style>