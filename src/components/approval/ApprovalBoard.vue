<template>
    <div v-if="isInit" class="init-board" >
        <img :src="searchIcon">
        <div>输入关键字搜索审批记录</div>
    </div>
    <div v-else-if="hasContent" class="has-result-board" >
        <i-table :data="currentRows" :columns="columns"  ></i-table>
        <div class="pagination">
            <Page :total="total" :current="current" :pageSize="pageSize" @on-change="changePage" show-elevator></Page>
        </div>
    </div>
    <div v-else class="init-board" >
        <img :src="emptyIcon">
        <div>没有查询到满足条件的记录！请重新输入关键字查看记录信息！</div>
    </div>
</template>
<script>
    export default {
        props:['content','columns','isPersonal'],
        data(){
            return {
                searchIcon:require('../search/search_icon.png'),
                emptyIcon:require('../search/emptystate_icon.png'),
                current:1,
                pageSize:5
            }
        },
        created(){
            let current = Number(this.$route.query.page)
            if(this.$route.query.page && !isNaN(current)){
                this.current = current
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
            },
            total(){
                return this.content.length
            },
            currentRows(){
                return this.content.slice(this.current-1,this.pageSize)
            }
        },
        methods:{
            changePage(i){
                this.current = i
                if(this.isPersonal){
                    this.$router.push(`/approval?type=person&page=${i}`)
                }
                else{
                    this.$router.push(`/approval?page=${i}`)
                }
            }
        }

    }

</script>
<style rel="stylesheet/less" lang="less">
    .init-board{

    }
    .has-result-board{
        .pagination{
            margin: 20px auto 0 auto;
            text-align: center;
            width: 100%;
            display: flex;
            justify-content:center;
        }
    }
</style>