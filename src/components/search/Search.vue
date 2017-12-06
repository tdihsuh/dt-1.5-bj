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
                    <input  v-model="key" class="search-input" autofocus="true" :placeholder="tip"  @focus="isFocus=true"
                            @blur="isFocus=false" @keyup.enter="search"><!--
                    --><span class="search-btn" @click="search"><Icon type="ios-search-strong"></Icon>查询</span>
                </div>
            </div>
        </div>
        <div class="search-result">
            <div class="search-result-title"><div class="text"> <img :src="iconImg">主体查询</div></div>
            <div class="search-result-content">
                <SearchBoard  :columns="columns" :is-personal="isPersonal"></SearchBoard>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchBoard from './SearchBoard.vue'
    import DetailsLink from './DetailsLink.vue'
    import Vue from 'vue'
    import { mapActions,mapGetters } from 'vuex'
    Vue.component('DetailsLink',DetailsLink)
    Vue.component('SearchBoard',SearchBoard)
    let renderTagsUnit = (h, params) => {
        let row = params.row
        let htmlArray = [];
        let tags = row.tags.split(',')

        if(tags.length >3){
            tags.slice(0,3).map(tag => {
                let hTag = h('span', {
                }, tag)
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
                }, tag)
                htmlArray.push(hTag)
            })
        }
        return h('span', {props:{tags:row.tags},style:{'display':'block','margin':'5px 0'}},htmlArray);
    }
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
    export default {

        data(){
            return {
                isPersonal:false,
                isFocus:false,
                key:'',
                iconImg: require('../../images/title_icon.png'),
                columns:[],
                enterpriseColumns : [
                    {
                        title: '企业名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '统一社会信用代码',
                        key: 'code',
                        align:'center'
                    },
                    {
                        title: '联合奖惩标签',
                        key: 'tags',
                        render: renderTagsUnit
                    },
                    {
                        title: '操作',
                        key: 'operations',
                        align:'center',
                        render: (h, params) => {
                            return h(DetailsLink,{
                                props:{
                                    to:`/search/detail/${params.row.eid}/enterprise`
                                }
                            }, '详细信息');
                        }
                    }],
                personalColumns :[
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '身份证号',
                        key: 'identityCard',
                        align:'center'
                    },
                    {
                        title: '联合奖惩标签',
                        key: 'tags',
                        render: renderTagsUnit
                    },
                    {
                        title: '操作',
                        key: 'operations',
                        align:'center',
                        render: (h, params) => {
                            return h(DetailsLink,{
                                props:{
                                    to:`/search/detail/${params.row.pid}/person`
                                }
                            }, '详细信息');
                        }
                    }
                ]
            }
        },

        created(){
            if(this.$route.query.type === 'person'){
                this.isPersonal = true;
                this.columns =  this.personalColumns
            }
            else{
                this.columns = this.enterpriseColumns
            }
        },

        computed:{
            tip:function(){
                return this.isPersonal?'请输入姓名或者证件号码进行搜索':'请输入企业全称或者社会统一信用代码进行搜索'
            }
        },
        methods:{
            ...mapActions([
                'searchEnterprise','searchPerson'
            ]),
            setType(isPersonal){
                this.isPersonal = isPersonal

            },
            changeType(isPersonal){
                this.isPersonal = isPersonal;
                if(this.isPersonal){
                    this.columns =  this.personalColumns
                    this.key = ''
                    this.$router.push('/search?type=person')
                }
                else{
                    this.columns = this.enterpriseColumns
                    this.key = ''
                    this.$router.push('/search')
                }
            },
            search(){
                this.content = []
                if(this.key){
                    if(this.isPersonal){
                        this.searchPerson(this.key)
                    }
                    else{

                        this.searchEnterprise(this.key)
                    }
                }
                else{

                    this.$Message.config({
                        top: 100,
                        duration: 2
                    });
                    if(this.isPersonal) {
                        this.$Message.error('请输入个人关键信息以便搜索')
                    }
                    else{
                        this.$Message.error('请输入企业关键信息以便搜索')
                    }
                }


            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .search-board {
        padding: 0 0 24px 0;
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
                    left: 402px;
                    z-index: 499;
                }
                .unactive{
                    left: 277px;
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
                    top: 1px;
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
           th{
               text-align: center;
           }
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