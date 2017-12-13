<template>
    <div v-if="isInit" class="init-board" >
        <img :src="searchIcon">
        <div>输入关键字搜索审批记录</div>
    </div>
    <div v-else-if="hasContent" class="has-result-board" >
        <i-table :data="this.content.obj" :columns="columns"  ></i-table>
        <div class="pagination">
            <Page :total="total" :current="Number(current)+1" :pageSize="pageSize" @on-change="changePage" show-elevator ></Page>
        </div>
    </div>
    <div v-else class="init-board" >
        <img :src="emptyIcon">
        <div>没有查询到满足条件的记录！请重新输入关键字查看记录信息！</div>
    </div>

</template>
<script>
    export default {
        props:['content','columns','isPersonal','pageSize','current','total','callback'],
        data(){
            return {
                searchIcon:require('../search/search_icon.png'),
                emptyIcon:require('../search/emptystate_icon.png'),

            }
        },
        created(){

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
                if(this.content.obj && this.content.obj.length !== 0 && this.columns.length !== 0){
                    return true
                }
                else{
                    return false
                }
            }
        },
        methods:{
            changePage(i){
                if(this.isPersonal){
                    this.$router.push(`/approval?type=person&page=${i-1}`)
                    this.callback()
                }
                else{
                    this.$router.push(`/approval?page=${i-1}`)
                    this.callback()
                }
            }
        }

    }

</script>
<style rel="stylesheet/less" lang="less">
    .init-board{

    }
    .has-result-board{
        position: relative;
        .pagination{
            margin: 20px auto 0 auto;
            text-align: center;
            width: 100%;
            display: flex;
            justify-content:center;
        }
    }
</style>