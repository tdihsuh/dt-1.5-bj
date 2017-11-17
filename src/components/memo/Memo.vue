<template>
    <div class="memo-content">
        <Tabs class="memo-tabs" :value="status" @on-click="changeTab">
            <TabPane :label="labelPublish" name="publish" ><MemoTable :columns="columns" :is-publish ="true"></MemoTable></TabPane>
            <TabPane :label="labelUnpublish" name="unpublish"><MemoTable :columns="columns" :is-publish ="false"></MemoTable></TabPane>
            <TabPane :label="labelAdd" name="add"></TabPane>
        </Tabs>
    </div>
</template>
<script>
    import Vue from 'vue'
    import TabLabel from './TabLabel.vue'
    import MemoTable from './MemoTable.vue'
    Vue.component('TabLabel',TabLabel)
    Vue.component('MemoTable',MemoTable)
    let columns = [
        {
            title: '备忘录名称',
            key: 'memo_name',
            align:'center'
        },
        {
            title: '发起单位',
            key: 'sponsor',
            align:'center'
        },
        {
            title: '联合部委数量',
            key: 'joint_count',
            align:'center'
        },
        {
            title: '发布用户',
            key: 'operator',
            align:'center'
        },
        {
            title: '发布时间',
            key: 'publish_date',
            align:'center'
        },
        {
            title: '操作',
            key: 'options',
            align:'center'
        }
    ]
    export default {
        data(){
            return {
                labelPublishImg:'./memo_publish',
                labelUnpublishImg:'./memo_draft_unpublish',
                labelAddImg:'./memo_add',
                activeLabel:'已发布备忘录',
                labelPublish:(h) => {
                    return h('TabLabel', {
                            props: {
                                count: 2,
                                text:'已发布备忘录',
                                img:this.labelPublishImg,
                                active:this.activeLabel
                            }
                        })
                },
                labelUnpublish:(h) => {
                    return h('TabLabel', {
                        props: {
                            count: 0,
                            text:'暂存备忘录',
                            img:this.labelUnpublishImg,
                            active:this.activeLabel
                        }
                    })
                },
                labelAdd:(h) => {
                    return h('TabLabel', {
                        props: {
                            count: 0,
                            text:'新增备忘录',
                            img:this.labelAddImg,
                            active:this.activeLabel
                        }
                    })
                },
                columns:columns,
                dataPublish:[],
                dataUnpublish:[]
            }
        },
        computed:{

        },
        created(){
            let status = this.$route.query.status?this.$route.query.status:'publish'
            this.changeImage(status)

        },
        computed:{
            status:function(){
                return this.$route.query.status?this.$route.query.status:'publish'
            }
        },
        methods: {
            changeImage(v){
                switch (v) {
                    case 'publish':
                        this.activeLabel = '已发布备忘录'
                        break
                    case 'unpublish':
                        this.activeLabel = '暂存备忘录'
                        break
                    case  'add':
                        this.activeLabel = '新增备忘录'
                        break

                }
            },
            changeTab(v) {
                this.$router.push(`/memo?status=${v}`)
                this.changeImage(v)

            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .memo-content{
        padding: 12px 0;
        .ivu-tabs-nav-scroll-disabled{
            display: none;
        }
        color: #4A4A4A;
        .memo-tabs{
            background-color: white;
            .ivu-tabs-tab{
                height: 60px;
                line-height: 60-16px;
                font-size: 16px;
                .ivu-badge{
                    position: relative;
                    top:-2px;
                    left:4px
                }

            }
            .ivu-tabs-content{
                font-size: 14px;
                .ivu-tabs-tabpane{
                    min-height: 650px;
                    padding: 12px  50px;
                }
            }
        }
    }
</style>