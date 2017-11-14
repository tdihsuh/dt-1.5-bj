<template>
    <div class="person-details-content">
        <div class="feed-back-unit clear">
            <span class="crumbs">
                <img :src="pathIcon" alt=""><!--
                --><span class="crumbs-text">您所在的位置：<router-link to="/search">奖惩查询</router-link> > 详情</span></span>
            <Button type="primary" icon="compose"  class="feedback-btn">处理反馈</Button></div>
        <div class="executor-info">
            <div class="person-name">
                <span>赵海</span>
            </div>
            <div class="excutor-content">
                <PanelTitle title="奖惩基本信息"></PanelTitle>
            </div>

        </div>
       <div class="person-base-info"></div>
        <div class="person-info-more"></div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import SecondaryTitle from './SecondaryTitle.vue'
    Vue.component('SecondaryTitle',SecondaryTitle)
    export default {
        data(){
          return {
              pathIcon:require('../../images/path_icon.png')
          }
        },
        created(){
            console.log(this)
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .person-details-content{
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
                margin-top: 20px;
            }
        }
        >.executor-info{
            background-color: white;

            >.person-name{
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