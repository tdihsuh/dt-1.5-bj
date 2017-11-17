<template>
    <div v-if="isInit" class="init-board" >
        <img :src="searchIcon">
        <div>输入关键字搜索审批记录</div>
    </div>
    <div v-else-if="hasContent" class="has-result-board" >
        <Table :data="content" :columns="columns"  ></Table>
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
                emptyIcon:require('../search/emptystate_icon.png')
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
<style rel="stylesheet/less" lang="less" scoped>
</style>