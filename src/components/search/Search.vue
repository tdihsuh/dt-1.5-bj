<template>
    <div class="search-board">
        <div class="searcher">
            <div class="searcher-tab">
                <div class="tab-items" :class="{active:!isPersonal}"@click="changeType(false)"><span class="tab-title" >企业</span></div>
                <div class="tab-items" :class="{active:isPersonal}" @click="changeType(true)"><span class="tab-title" >个人</span></div>
            </div>
            <div class="search-content">
                <div class="demo" :class="{'active':isPersonal,'unactive':!isPersonal,'focus':isFocus,'unfocus':!isFocus}"></div>
                <div class="search-body">
                    <input  class="search-input" autofocus="true" :placeholder="tip"  @focus="isFocus=true"  @blur="isFocus=false"><!--
                    --><span class="search-btn" @click="search"><Icon type="ios-search-strong"></Icon>查询</span>
                </div>
            </div>
        </div>
        <div class="search-result">
            <div class="search-result-title"><div class="text"> <img :src="iconImg">主体查询</div></div>
            <div class="search-result-content">
                <SearchBoard :content="content" :columns="columns" :is-personal="isPersonal"></SearchBoard>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchBoard from './SearchBoard.vue'
    import DetailsLink from './DetailsLink.vue'
    import Vue from 'vue'
    Vue.component('DetailsLink',DetailsLink)
    Vue.component('SearchBoard',SearchBoard)
    let style = {
        display: 'inline-block',
        border: '1px solid #1889E3',
        color:'#1889E3',
        borderRadius: '3px',
        height: '24px',
        magrin:'2px',
        width:'96px',
        overflow: 'hidden',
        textOverflow:'ellipsis',
        whiteSpace: 'nowrap',
        margin:'3px 2px',
        lineHeight: '24px',
        fontSize:'10px',
        textAlign:'center',
        padding:'0 9px'
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
            render: (h, params) => {
                let row = params.row
                let htmlArray = [];
                row.tags.map(tag => {
                    let hTag = h('span', {
                        style: style
                    }, tag)
                    htmlArray.push(hTag)
                })
                return h('span', htmlArray);
            }
        },
        {
            title: '操作',
            key: 'operations',
            align:'center',
            render: (h, params) => {
                return h(DetailsLink,{
                    props:{
                        to:`/search/detail/${params.row.code}/enterprise`
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
            render: (h, params) => {
                let row = params.row
                let htmlArray = [];
                row.tags.map(tag => {
                    let hTag = h('span', {
                            style:style
                    }, tag)
                    htmlArray.push(hTag)
                })
                return h('span', htmlArray);
            }
        },
        {
            title: '操作',
            key: 'operations',
            align:'center',
            render: (h, params) => {
                return h(DetailsLink,{
                    props:{
                        to:`/search/detail/${params.row.code}/person`
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
            tip:function(){
                return this.isPersonal?'请输入姓名或者证件号码进行搜索':'请输入企业全称或者社会统一信用代码进行搜索'
            }
        },
        methods:{
            setType(isPersonal){
                this.isPersonal = isPersonal

            },
            changeType(isPersonal){
                this.isPersonal = isPersonal;
                if(this.isPersonal){
                    this.$router.push('/search?type=person')
                }
                else{
                    this.$router.push('/search')
                }
            },
            search(){
            this.content = []
                if(this.isPersonal){
                    this.columns = this.personalColumns
                    this.content = [{
                        name:'张晓多',
                        certification:'110100198907180902',
                        tags:['失信被执行人','违法嫌疑人' ,'违法嫌疑人','违法嫌疑人'],
                        code:111,
                        operations:'详细信息'
                    }]
                }
                else{
                    this.columns = this.enterpriseColumns
                    this.content = [{
                        enterprise_name:'北京开发有限责任公司',
                        credit_code:'913710007628687892',
                        tags:['失信被执行人','企业协同监管'],
                        code:123,
                        operations:'详细信息'
                    }]
                }
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .search-board {
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
            >.search-content{
                margin:0 auto;
                width: 700px;
                .active{
                    left: 403px;
                    z-index: 499;
                }

                .unactive{
                    left: 278px;
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

                .search-input{

                }
                input::-webkit-input-placeholder {  color:#D3D9E1;}
                input:-moz-placeholder {color:#D3D9E1;}
                input::-moz-placeholder { color:#D3D9E1; }
                input:-ms-input-placeholder {color:#D3D9E1;}
                input{
                    height: 46px;
                    line-height: 46px;
                    border: 1px solid #D3D9E1;
                    appearance: none;
                    border-top-left-radius: 3px!important;
                    border-bottom-left-radius: 3px!important;
                    font-size: 14px!important;
                    z-index: 498;
                    width: 600px;
                    padding: 0 10px;

                }
                　

                input:focus{
                    outline:none;
                    border: 1px solid #46a1e9;
                }
                .search-btn{
                    width: 100px;
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
        .search-result{
            font-size: 18px;
            color: #4A4A4A;
            display: block;
            background: #FFFFFF;
            box-shadow: 0 3px 5px 0 rgba(225,225,225,0.50);
            margin: 30px auto 0 auto;
            padding: 0 30px 14px 30px;
            width: 1200px;
            > .search-result-title {
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
            >.search-result-content{
                min-height: 481px;
            }
        }
    }
</style>