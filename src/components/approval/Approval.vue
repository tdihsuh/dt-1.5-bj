<template>
    <div class="approval-board">
        <div class="searcher">
            <div class="searcher-tab">
                <div class="tab-items" :class="{active:!isPersonal}"@click="changeType(false)"><span class="tab-title" >企业</span></div>
                <div class="tab-items" :class="{active:isPersonal}" @click="changeType(true)"><span class="tab-title" >个人</span></div>
            </div>
            <div class="approval-content">
                <div class="demo" :class="{'active':isPersonal,'unactive':!isPersonal,'focus':isFocus,'unfocus':!isFocus}"></div>
                <div class="approval-body" >
                    <Form ref="searchData" :model="searchData" :label-width="110">
                        <Row :gutter="10">
                            <Col span="6">
                              <FormItem :label="labelName.name" prop="name">
                               <Input v-model="searchData.name" :placeholder="labelName.tip" />
                             </FormItem>
                           </Col>
                            <Col span="6">
                            <FormItem :label="labelName.code" prop="code">
                                <Input v-model="searchData.code" :placeholder="labelName.codeTip" />
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="受理日期">
                                <Row>
                                    <Col span="11">
                                    <DatePicker type="date" placeholder="选择开始时间" format="yyyy年MM月dd日" v-model="searchData.startDate"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center;display: inline-block;height: 46px;line-height: 46px;font-size: 14px">--</Col>
                                    <Col span="11">
                                    <DatePicker type="date" placeholder="选择结束时间" format="yyyy年MM月dd日"  v-model="searchData.endDate"></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                            </Col>
                            <Col span="4">
                            <span class="approval-btn" @click="search"><Icon type="ios-search-strong"></Icon>查询</span>
                            </Col>
                        </Row>
                    </Form>
                    <!--<input  class="approval-input" autofocus="true" :placeholder="tip"  @focus="isFocus=true"  @blur="isFocus=false">--><!--
                    <!--&ndash;&gt;<span class="approval-btn" @click="search"><Icon type="ios-approval-strong"></Icon>查询</span>-->
                </div>
            </div>
        </div>
        <div class="approval-result">
            <div class="approval-result-title"><div class="text"> <img :src="iconImg">审批记录</div></div>
            <div class="approval-result-content">
                <ApprovalBoard :content="content" :columns="columns" :is-personal="isPersonal"></ApprovalBoard>
                <!--<SearchBoard :content="content" :columns="columns" :is-personal="isPersonal"></SearchBoard>-->
            </div>
        </div>
    </div>
</template>
<script>
    import ApprovalBoard  from './ApprovalBoard.vue'
    /*import DetailsLink from './DetailsLink.vue'*/
    import Vue from 'vue'
    Vue.component('ApprovalBoard',ApprovalBoard)
    /* Vue.component('SearchBoard',SearchBoard)*/
    let styleBase = {
        display: 'inline-block',
        borderRadius: '3px',
        height: '24px',
        margin:'0 5px',
        width:'130px',
        overflow: 'hidden',
        textOverflow:'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '24px',
        fontSize:'10px',
        textAlign:'center',
        padding:'0 9px'
    }
    let style = {
        border: '1px solid #1889E3',
        color:'#1889E3'
    }


    let styleActive = {
        border: '1px solid #EB4449',
        color:'#EB4449',
    }
    let style1 = {
        color:'#1889E3',
    }
    Object.assign(style,styleBase)
    Object.assign(styleActive,styleBase)
    Object.assign(style1,styleBase)
    let renderTagsUnit = (h, params) => {
        let row = params.row
        let htmlArray = [];
        let tags = row.tags
        if(tags.length >3){
            tags.slice(0,3).map(tag => {
                let hTag = h('span', {
                    style: tag.isPositive?styleActive:style
                }, tag.name)
                htmlArray.push(hTag)
            })
            let hTag = h('span', {
                style: style1

            }, '...')
            htmlArray.push(hTag)
        }
        else{
            tags.map(tag => {
                let hTag = h('span', {
                    style: tag.isPositive?styleActive:style
                }, tag.name)
                htmlArray.push(hTag)
            })
        }
        return h('span', {props:{tags:row.tags},style:{'display':'block','margin':'5px 0'}},htmlArray);
    }
    let enterpriseColumns = [
        {
            title: '企业名称',
            key: 'enterprise_name',
            align:'center'
        },
        {
            title: '统一社会信用代码',
            key: 'credit_code',
            align:'center'
        },
        {
            title: '联合奖惩标签',
            key: 'tags',
            align:'center',
            render: renderTagsUnit
        },
        {
            title: '操作',
            key: 'operations',
            align:'center',
            render: (h, params) => {
                return h('router-link',{
                    props:{
                        to:`/approval/detail/${params.row.code}/enterprise`
                    }
                }, '详细信息');
            }
        }
    ]

    let personalColumns = [
        {
            title: '姓名',
            key: 'name',
            align:'center'
        },
        {
            title: '身份证号',
            key: 'certification',
            align:'center'
        },
        {
            title: '联合奖惩标签',
            key: 'tags',
            align:'center',
            render: renderTagsUnit
        },
        {
            title: '操作',
            key: 'operations',
            align:'center',
            render: (h, params) => {
                return h('router-link',{
                    props:{
                        to:`/approval/detail/${params.row.code}/person`
                    }
                }, '详细信息');
            }
        }
    ]
    export default {
        data(){
            return {
                isPersonal:false,
                isFocus:false,
                searchData:{startDate:new Date().Format('yyyy年MM月dd日'),endDate:new Date().Format('yyyy年MM月dd日')},
                iconImg: require('../../images/title_icon.png'),
                content:[],
                columns:[],
                personalColumns,
                enterpriseColumns
            }
        },
        created(){
            if(this.$route.query.type === 'person'){
                this.isPersonal = true;
            }
        },
        computed:{
            labelName:function(){
                return this.isPersonal?
                    {name:'姓名',code:"证件号",tip:"请输入姓名",codeTip:'请输入证件号'}:
                    {name:'企业名称',code:"统一信用代码",tip:"请输入企业名称",codeTip:'请输入社会统一信用代码'}
            }
        },
        methods:{
            setType(isPersonal){
                this.isPersonal = isPersonal

            },
            changeType(isPersonal){
                this.isPersonal = isPersonal;
                if(this.isPersonal){
                    this.$router.push('/approval?type=person')
                }
                else{
                    this.$router.push('/approval')
                }
            },
            search(){
                this.content = []
                if(this.isPersonal){
                    this.columns = this.personalColumns
                    this.content = [{
                        name:'张晓多',
                        certification:'110100198907180902',
                        tags:[{name:'失信被执行人'},{name:'奖励措施',isPositive:true} ,{name:'违法嫌疑人'},{name:'违法嫌疑人'}],
                        code:111,
                        operations:'详细信息'
                    }]
                }
                else{
                    this.columns = this.enterpriseColumns
                    this.content = [/*{
                        enterprise_name:'北京开发有限责任公司',
                        credit_code:'913710007628687892',
                        tags:[{name:'失信被执行人'},{name:'奖励措施',isPositive:true} ],
                        code:123,
                        operations:'详细信息'
                    }*/]
                }
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .approval-board {
        padding: 24px 24px;
        > .searcher {
            text-align: center;
            .searcher-tab{
                .tab-items{
                    display: inline-block;
                    width: 122px;
                    text-align: center;
                    height: 28-5px;
                    line-height: 28-5px;
                    margin: 16px 0 10px 0;
                    font-size: 16px;
                    cursor: pointer;
                    &:hover{
                        color:#1889e3;
                    }
                    .tab-title{
                        padding: 5px 2px;
                    }
                }
                .active{
                    .tab-title{
                        border-bottom: 3px solid #1889E3;
                    }
                    color: #1889E3;
                }
            }
            >.approval-content{
                margin:0 auto;
               // width: 800px;
                .active{
                    left: 61px;
                   margin: 0 auto;
                    z-index: 499;
                }

                .unactive{
                    left: -61px;
                    margin: 0 auto;
                    z-index: 500;
                }
                .focus{
                    border-color: transparent transparent #46a1e9 transparent;
                }
                .unfocus{
                    border-color: transparent transparent #D3D9E1 transparent;
                }

                .demo {
                    position: relative;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    top: 1px;
                    border-width: 0 10px 11px 10px;


                }
                .demo::before {
                    position: absolute;
                    content: '';
                    top: 2px;
                    width: 0;
                    height: 0;
                    left: -9.3px;
                    border-style: solid;
                    border: 15px solid;
                    border-width: 0 9.3px 10px 9.3px;
                    border-color: transparent transparent #ffffff transparent;

                }

                .approval-btn{
                    width: 120px;
                    height: 46px;
                    line-height: 46px;
                    display: inline-block;
                    font-size: 14px!important;
                    background-color: #EB4449;
                    color: white;
                    cursor: pointer;
                    border-top-right-radius: 3px!important;
                    border-bottom-right-radius: 3px!important;
                    i{
                        margin-right: 2px;
                        font-size: 20px!important;
                        position: relative;
                        top:2px;
                    }
                }
            }
        }
        .approval-body{
            background-color: white;
            padding: 20px 0 0 0;
            .ivu-input{
                font-size: 14px!important;
                height: 46px;
            }
            .ivu-form-item-label{
                font-size: 14px!important;
                padding: (46-14)/2px 10px;
            }
            .ivu-input-icon{
                height: 46px;
                line-height: 46px;
                width: 46px;
            }
            box-shadow: 0 3px 5px 0 rgba(225,225,225,0.50);
        }
        .approval-result{
            font-size: 18px;
            color: #4A4A4A;
            display: block;
            background: #FFFFFF;
            box-shadow: 0 3px 5px 0 rgba(225,225,225,0.50);
            margin: 5px auto 0 auto;
            padding: 0 30px 14px 30px;
            th{
                text-align: center;
            }
            > .approval-result-title {
                border-bottom: 2px solid #E6E6E6;
                >.text{
                    display: inline-block;
                    height: 62px;
                    line-height: 62px;
                    border-bottom: 4px solid #1889E3;
                    position: relative;
                    top: 2px;
                    img {
                        position: relative;
                        top: 5px;
                        margin-right: 4px;
                    }
                }

            }
            >.approval-result-content{
                min-height: 481px;
            }
        }
    }
</style>