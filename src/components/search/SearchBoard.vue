<template>
    <div v-if="isInit" class="init-board" >
        <img :src="searchIcon">
        <div>奖惩信息查询</div>
    </div>
    <div v-else-if="hasContent" class="has-result-board" >
       <Table :data="content" :columns="columns"  ></Table>
    </div>
    <div v-else class="init-board" >
        <img :src="emptyIcon">
        <div>没有查询到任何信息！</div>
    </div>
</template>
<script>
    export default {
        props:['content','columns','isPersonal'],
        data(){
            return {
                searchIcon:require('./search_icon.png'),
                emptyIcon:require('./emptystate_icon.png')
            }
        },
        computed:{
            isInit(){
                if(this.columns.length === 0){
                    return true
                }
                else{
                    return false
                }
            },
            hasContent(){
                if(this.content.length !== 0 && this.columns.length !== 0){
                    return true
                }
                else{
                    return false
                }
            }
        },
        methods:{

        }
    }

</script>
<style rel="stylesheet/less" lang="less" >

    .init-board{
        text-align: center;
        img{
            margin: 131px auto 14px auto;
        }
        div{

            color: #9B9B9B;
            letter-spacing: 0;
        }

    }
    .ivu-table-header{
        color: #777777;
        letter-spacing: 0;
        border: 1px solid #EEEEEE;


        tr{

        }
        th{
            border: 1px solid #fff;
            height: 48px;
            background-color: #eee;
            font-size: 14px;
        }
    }
    td{
        font-size: 14px;
    }
    .has-result-board{
        margin-top: 40px;
        font-size: 14px;
        color: #353742;
        letter-spacing: 0;
        .result-tag{
            display: inline-block;
            border: 1px solid #1889E3;
            border-radius: 3px;
            height: 24px;
            line-height: 24px;
        }
    }
</style>