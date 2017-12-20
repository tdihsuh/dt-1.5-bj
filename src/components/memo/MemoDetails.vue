<template>
  <div class="details-content">
    <ItemList :list="baseInfo"></ItemList>
    <div class="item-tag clear"><span class="item-name">标签：</span><span class="item-content"><span class="tag" :class="{'tag-reward':isReward,'tag-punish':!isReward}">{{ tag }}</span></span>
    </div>
    <Collapse accordion>
      <Panel v-for="(measure,index) in measures" :key="measure.departmentName" :name="measure.departmentName"  v-if="measure.departmentMergeItemList.length>0" >
        <div class="title"><span class="department-name">{{ measure.departmentName }}</span> <span class="counter">共{{measure.departmentMergeItemList.length}}项</span></div>
        <ul class="measure-ul" slot="content">
          <li v-for=" (m,i) in measure.departmentMergeItemList">
            <Row class="measure-li-row">
              <i-col span="8"><a class="short-fake-link" :title="m.measure">{{m.measure}}</a></i-col>
              <i-col span="16" class="measure-by"><a class="short-fake-link" :title="m.reason">{{m.reason}}</a></i-col>
            </Row>
          </li>
        </ul>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import axios from  'axios'
  import util from '../../lib/util'
  let departmentList = require('../common/departments.json')
  export default {
    props:['mid'],
    data(){
      return {
        id:undefined,
        baseInfo: [],
        tag:'',
        isReward:false,
        measures:[]
      }
    },
    watch:{
      mid:function(val,old){
        this.details()
      }
    },
    methods:{
      details(){
        axios.get(`/service/api/memo/detail?id=${this.mid}&_t=${new Date().valueOf()}`).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            let departments = result.obj.relationDepartment.split(',')
            let tempDepartments = []
            for(let did of departments){
              tempDepartments.push(departmentList[did])
            }
            this.baseInfo = [[
              {name: '联合惩戒备忘录：', content: result.obj.name},
              {name: '联合奖惩性质：', content: result.obj.type==='0'?'联合激励':'联合惩戒'},
              {name: '认定部门：', content: tempDepartments.join()}
            ]]
            this.tag = result.obj.tags
            this.isReward =  result.obj.type==='0'?true:false
            this.measures = result.obj.departmentItems
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        })
      }
    }

  }

</script>
<style rel="stylesheet/less" lang="less">
  .details-content {
    min-height: 200px;
    font-size: 12px;
    .item-details {
      margin: 10px 40px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    .item-list{
      >li{
        font-size: 12px!important;
      }
    }
    .item-tag {
      padding: 0 40px 20px 40px;
      .item-name, .item-content {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        text-align: left;
        float: left;
      }
      > .item-name {
        width: 20%;
        color: #9b9b9b;

      }
      > .item-content {
        color: rgb(235, 68, 73);
        width: 80%;
        > .tag-reward {
          color: rgb(235, 68, 73);
          border: 1px solid rgb(235, 68, 73);
        }
        > .tag-punish {
          border: 1px solid #1889e3;
          color: #1889e3;
        }
        > .tag {
          display: inline-block;
          border-radius: 3px;
          width: 114px;
          height: 22px;
          line-height: 22px;
          text-align: center;
        }
      }
    }
    .title{
      display: inline-block;
      width: 900px;
      >.counter{
        float: right;
      }
    }
    .measure-li-row {
      font-size: 12px;
      border: 1px solid #d0d0d0;
      &:hover {
        background: rgba(45, 140, 240, 0.2);
      }
      .measure-by {
        border-left: 1px solid #d0d0d0;
        border-right: 1px solid #d0d0d0;
      }
      > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 8px 4px;
        height: 34px;
        .short-fake-link {
          color: #666
        }
      }
    }
  }

</style>
