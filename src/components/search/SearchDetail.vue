<template>
    <div class="subject-details-content">
        <div class="feed-back-unit clear">
            <span class="crumbs">
                <img :src="pathIcon" alt=""><!--
                --><span class="crumbs-text">您所在的位置：<router-link to="/search">奖惩查询</router-link> > 详情</span></span>
            <Button type="primary" icon="compose" @click="feedbackOpen=true"  class="feedback-btn">处理反馈</Button></div>
        <Modal class="feedback-modal"
                title="处理反馈"
                v-model="feedbackOpen"
                :mask-closable="false"
                ok-text="处理并下载报告">
            <Form  :model="formItem" :label-width="100">
                <FormItem label="处理结果：" >
                    <RadioGroup   v-model="formItem.feedbackResult">
                        <Radio  label="process">行政许可正常办理</Radio>
                        <p><Radio  label="reject">行政许可拒绝办理</Radio></p>
                        <p><Radio  label="priority">行政许可加速审核</Radio></p>
                    </RadioGroup>
                </FormItem>
                <FormItem label="处理说明：">
                    <Input v-model="formItem.description" type="textarea" :autosize="false" :rows="5" placeholder="请输入内容" ></Input>
                </FormItem>
            </Form>
        </Modal>
        <div class="executor-info ">
            <div class="subject-name">
                <span>{{ name }}</span>
            </div>
            <div class="excutor-content info-panel">
                <PanelTitle title="奖惩基本信息"></PanelTitle>
                <span v-for="o in items">
                <SecondaryTitle :title="o.title"></SecondaryTitle>
                <ItemList :list="o.content"></ItemList>
                    </span>
            </div>

        </div>
       <div class="subject-base-info info-panel">
           <PanelTitle :title="titleArray[0]"></PanelTitle>
           <ItemList :list="list1"></ItemList>
       </div>
        <div class="subject-info-more info-panel" id="more-info">
            <PanelTitle title="奖惩详细信息"></PanelTitle>
            <transition name="slide-fade">
            <ItemList :list="items[0].content" v-if="isDisplay" class="can-close"> </ItemList>
            </transition>
            <div class="display-more" @click="expand()" id="expand-op">
                <span class="display-more-text" ><span v-if="!isDisplay">显示更多</span><!--
               --><span v-if="isDisplay">收起详细信息</span></span><!--
                --><img :src="moreImg" class="icon" :class="{'close':isDisplay }"></div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        created(){
            if(this.$route.params.type==='person'){
                this.titleArray = ['个人基本信息']
                this.name = "赵海"
            }
        },
        data(){
          return {
              pathIcon:require('../../images/path_icon.png'),
              isDisplay:false,
              feedbackOpen:false,
              titleArray:['企业基本信息'],
              name:"辉山乳业有限责任公司",
              formItem: {feedbackResult:'priority',description:''},
              moreImg:require('./more.png'),
              items:[
                  {title:'失信被执行人',
                      content:[
                          [{
              }, {name:'联合惩戒认定部门：',content:'省发改委、省教育厅、省科技厅'},
                  {name:'联合惩戒实施部门：',content:'省发改委、省教育厅、省科技厅、省工商局、省地税局、省公安厅、省人社厅'},
                  {name:'联合惩戒措施：',content:'限制政府采购、招标投标、行政审批、政府扶持、融资信贷、市场准入、资质认定政府采购、招标投标、行政审批、政府扶持、融资信贷、市场准入、资质认定'},
                  {name:'惩戒认定时间：',content:'2017/01/12'},
              ],
                      ]},
                  {title:'失信被执行人',
                      content:[[{
                  }, {name:'联合惩戒认定部门：',content:'省发改委、省教育厅、省科技厅'},
                      {name:'联合惩戒实施部门：',content:'省发改委、省教育厅、省科技厅、省工商局、省地税局、省公安厅、省人社厅'},
                      {name:'联合惩戒措施：',content:'限制政府采购、招标投标、行政审批、政府扶持、融资信贷、市场准入、资质认定政府采购、招标投标、行政审批、政府扶持、融资信贷、市场准入、资质认定'},
                      {name:'惩戒认定时间：',content:'2017/01/12'},
                  ]
                      ]},

              ],
              list1:[[
                  { name:'姓名：',content:'赵海'},
                  { name:'身份证号码：',content:'11010019890124890X'},
                  { name:'性别：',content:'男'},
                  { name:'户籍地址：',content:'北京市海淀区西土城路十号'}
              ]]
          }
        },
        methods:{
            expand(){
                this.isDisplay=!this.isDisplay
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    @-webkit-keyframes shake {
        from {top: 0px;}
        to {top: 2px;}
    }

    @keyframes shake {
        from {top: 0px;}
        to {top: 2px;}
    }
    .feedback-modal{
        .ivu-modal-body{
            font-size: 12px!important;
        }
        .ivu-modal-content{
            .ivu-modal-header-inner{
                color: #353842;
                line-height: 21px;
            }
        }
        .ivu-modal-footer{
            text-align: center;
            button{
                width: 120px;
                border: 1px solid #D0D0D0;
                border-radius: 4px;
                text-align: center;
                font-size: 12px;
            }
        }
    }
    .subject-details-content{
        margin: 0 auto;

        .feed-back-unit{
            background-color: white;
            height: 60px;
            padding: 0 5px;
            >.crumbs{
                display: inline-block;
                font-size: 15px;
                padding: 0 3px;

                >img{
                   position: relative;
                    top:6px;
                    margin-right: 12px;
                    height: 24px;
                }
                >span{
                    margin: 22px 0 14px 0;
                    display: inline-block;
                    height: 24px;
                    line-height: 24px;
                }

            }
            >.feedback-btn{
                float: right;
                width: 100px;
                margin-top: 15px;
            }
        }
        .info-panel{
            margin-bottom: 12px;
            background-color: white;
            padding: 10px 30px 30px 30px;
            box-shadow: 0 3px 5px 0 rgba(225,225,225,0.50);
            >.display-more{
                cursor: pointer;
                width: 100%;
                text-align: center;
                font-size:14px;
                color:#353842;
                line-height:30px;
                text-align:center;
                margin-top: 16px;
                >.icon{
                    margin-left: 6px;
                    position: relative;
                    animation: shake 0.8s infinite;

                }
                >.close{
                    transition: all .3s ease;
                    transform: rotate(180deg);

                }
            }

        }
        >.executor-info{
            background-color: white;

            >.subject-name{
                height: 68px;
                background-image: url('./detail_bg.png');
                text-align: center;
                font-size: 22px;
                >span{
                    display:block ;
                    padding: 34px 0 10px 0;
                }
            }
            >.excutor-content{
                padding: 10px 30px 30px 30px;
            }


        }
    }
</style>