<template>
  <div class="memo-form-div">
    <SecondaryTitle title="备忘录基本信息：" style="padding: 10px 0" ></SecondaryTitle>
    <i-form :model="memoBaseInfo" :rules="rules" ref="memoBaseForm"  :label-width="160" label-position="left" class="memo-form">
      <FormItem label="联合惩戒备忘录：" prop="name">
        <i-input v-model="memoBaseInfo.name" placeholder="请输入备忘录名称(不少于2字)" class="input-item" ></i-input>
      </FormItem>
      <FormItem label="联合奖惩性质：" prop="type">
        <RadioGroup v-model="memoBaseInfo.type">
          <Radio label="t_0"><span style="color:rgb(235, 68, 73);margin: 0 20px 0 0">联合激励</span></Radio>
          <Radio label="t_1"><span style="color:rgb(24, 137, 227);margin: 0 20px 0 0">联合惩戒</span></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="认定部门：" prop="departments">
        <i-select v-model="memoBaseInfo.departments" filterable multiple placeholder="请选择或输入部门关键字进行搜索" class="input-item">
          <Option v-for="item in departmentOptions" :value="item.value"  :key="item.value">{{ item.label }}</Option>
        </i-select>
      </FormItem>
      <FormItem label="标签：" prop="tag">
        <i-input v-model="memoBaseInfo.tag" placeholder="请输入标签(不少于2字)" class="input-item"></i-input>
      </FormItem>
      <div style="text-align:center;padding-top: 20px">
        <i-button type="primary" @click="saveBaseInfo()" :disabled="!formValid" v-if="!hasId">保存基本信息</i-button>
      </div>
    </i-form>
    <div class="saved-measures-list" v-if="hasId">
      <SecondaryTitle title="奖励/惩戒措施：" style="padding: 10px 0" ></SecondaryTitle>
      <Collapse accordion style="margin-bottom: 15px">
        <Panel v-for="(measure,index) in memo.savedMeasures" :key="measure.departmentName" :name="measure.departmentName"  v-if="measure.departmentMergeItemList.length>0" >
         <div class="title"><span class="department-name">{{ measure.departmentName }}</span> <span class="counter">共{{measure.departmentMergeItemList.length}}项</span></div>
           <ul class="measure-ul" slot="content">
            <li v-for=" (m,i) in measure.departmentMergeItemList">
              <Row class="measure-li-row">
                <i-col span="8"><a class="short-fake-link" :title="m.measure">{{m.measure}}</a></i-col>
                <i-col span="14" class="measure-by"><a class="short-fake-link" :title="m.reason">{{m.reason}}</a></i-col>
                <i-col span="2" style="text-align: center">
                  <i-button  class="delete-measure-btn" @click="deleteMeasure(m.id)" type="error" size="small">删除</i-button>
                </i-col>
              </Row>
            </li>
        </ul>
        </Panel>
      </Collapse>
      <i-form :model="measure"   :label-width="160" label-position="left" class="memo-form">
        <div class="measure">
          <FormItem label="措施：">
            <i-input v-model="measure.measureName" placeholder="请输入奖励／惩戒措施"></i-input>
          </FormItem>
          <FormItem label="法律及政策依据：">
            <i-input v-model="measure.measureBy" placeholder="请输入法律及政策依据"></i-input>
          </FormItem>
          <FormItem label="实施部门：">
            <i-select v-model="measure.department" filterable placeholder="请选择或输入部门关键字进行搜索">
              <Option v-for="item in departmentOptions" :value="item.value" :key="item.value" > {{ item.label }}</Option>
            </i-select>
          </FormItem>
          <div class="add-measure">
            <Button type="ghost" :disabled="!addFormValid" @click="addMeasure()"  class="add-measure-btn" size="small" icon="plus-round">添加</Button>
          </div>
        </div>
      </i-form>
      <div class="add-form-footer" v-if="isAdd">
        <Button type="error" @click="saveBaseInfo(-1,'/memo?status=pending')">暂存备忘录</Button>
        <Button type="primary" @click="saveBaseInfo(0,'/memo?status=pending')">提交审核</Button>
      </div>
      <div class="add-form-footer" v-else>
        <Button type="error">暂存备忘录</Button>
        <Button type="primary">提交审核</Button>
        <Button type="ghost" @click="closeHandler">返回</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from  'axios'
  import util from '../../lib/util'
  export default {
    props: ['isAdd', 'closeHandler','id'],
    data () {
      return {
        departmentList:require('../common/departments'),
        departmentOptions: this.processDepartmentList(),
        memoId:undefined,
        rules:{
        },
        memoBaseInfo:{
          type: "t_0", tag:null, name:null, departments: [],
        },
        memo: {
          savedMeasures: [
          ]
        },
        measure: {}
      }
    },
    created(){
      if(this.$route.query.id){
        this.memoId = this.$route.query.id
        this.getMemoDetails()
      }
      else{
        if(this.id) {
          this.memoId = id
        }
        else{
          this.memoId = undefined
        }
      }
    },
    computed: {
      hasId(){
        if(this.id){
          return true
        }
        else{
          if(this.$route.query.id){
            this.memoId = this.$route.query.id
            return true
          }
          else{
            this.measure = {}
            this.memoBaseInfo = {
              type: "t_0", tag:null, name:null, departments: [],
            }
            this.memo = {
              savedMeasures: [
              ]
            }
            return false
          }
        }
      },
      formValid:function(){
        if( this.memoBaseInfo.name && this.memoBaseInfo.name.length >= 2
          && this.memoBaseInfo.tag && this.memoBaseInfo.tag.length >= 2
          && this.memoBaseInfo.departments.length>0 ){
          return true
        }
        else{
          return false
        }
      },
      addFormValid:function(){
        if( this.measure.measureName && this.measure.measureName.length >= 2  &&
        this.measure.measureBy && this.measure.measureBy.length >= 2 &&
            this.measure.department
        ){
          return true
        }
        else{
          return false
        }
      }
    },
    methods: {
      processDepartmentList(departments){
        let tmp =[]
        let d = require('../common/departments')
        for (let key in Object.keys(d)) {
          if(d[key]){
            tmp.push(
              {
                value:"d_"+ key, label: d[key]
              })
          }

        }
        return tmp
      },
      getMemoDetails(){
        axios.get(`/service/api/memo/detail?id=${this.memoId}`).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            for(let d of result.obj.relationDepartment.split(',')){
              this.memoBaseInfo.departments.push('d_'+d)
            }
            this.memoBaseInfo.type = 't_'+result.obj.type
            this.memoBaseInfo.name = result.obj.name
            this.memoBaseInfo.tag = result.obj.tags
            this.memo.savedMeasures = result.obj.departmentItems
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        })
      },
      deleteMeasure(id){
        console.log(id)
        let param = new URLSearchParams()
        param.append('id', id)
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          params: param
        }
        axios.post('/service/api/memo/department/delete',null,config).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.$Message.success('删除成功')
            this.getMemoDetails()
          }
        }).catch(error => {
          if (error.response) {

            util.responseProcessor(error.response)
            this.$Message.error('删除失败')
          }
        })
      },
      addMeasure (e) {
        let param = new URLSearchParams()
        param.append('memoId', this.memoId)
        param.append('departmentCode', this.measure.department.replace('d_',''))
        param.append('measure', this.measure.measureName)
        param.append('reason', this.measure.measureBy)
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          params: param
        }
        axios.post('/service/api/memo/department/add',null,config).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.measure = {}
            this.getMemoDetails()
          }
        }).catch(error => {
          if (error.response) {

            util.responseProcessor(error.response)
          }
        })
      },
      removeMeasure (i) {
        // this.memo.measures.splice(i, 1)
      },
      saveBaseInfo(status,to){
        let param = new URLSearchParams()
        let tmp = []
        let s = status ? status : -1
        for(let d of [...new Set(this.memoBaseInfo.departments)] ){
          tmp.push(d.replace('d_',''))
        }
        param.append('name', this.memoBaseInfo.name)
        param.append('type', this.memoBaseInfo.type.replace('t_',''))
        param.append('relationDepartment', tmp.join())
        param.append('tags', this.memoBaseInfo.tag)
        param.append('status', s)
        // 修改备忘录
        if(this.memoId){
          param.append('id', this.memoId)
        }
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          params: param
        }
        axios.post('/service/api/memo/temporary', null, config).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.$Message.info('保存成功')
            this.memoId = result.obj
            if(to){
              this.measure = {}
              this.memoBaseInfo = {
                type: "t_0", tag:null, name:null, departments: [],
              }
              this.memo = {
                savedMeasures: [
                ]
              },
              this.$router.push(to)
            }
            else{
              this.$router.push('/memo?status=add&id='+result.obj)
            }

          }
          else {
            this.$Message.info('保存失败')
          }
        }).catch(error => {
          if (error.response) {
            this.$Message.info('保存失败')
            util.responseProcessor(error.response)
          }
        })


      }
    }
  }

</script>
<style rel="stylesheet/less" lang="less">
  .memo-form-div {
    margin: 0 auto;
    width: 900px;
    .memo-form{
        //padding: 15px 0 0 12px;
    }
    .input-item {
      width: 540px;
    }
    * {
      font-size: 14px;
    }
    .ivu-input, ivu-radio-group, .ivu-radio-wrapper, .ivu-checkbox-wrapper, .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value,
    .ivu-form .ivu-form-item-label {
      font-size: 14px;
    }
    .ivu-form-item {
      margin: 8px 0;
    }
    .ivu-form-item-label {
      color: #666666;
      line-height: 20px;
      padding: 0 12px 0 0;
      &::before{
        content:"* ";
        color:rgb(235, 68, 73)
      }

    }
    .saved-measures-list {

    padding: 15px 0;
      .title{
        display: inline-block;
        width: 800px;
        >.counter{
          float: right;
        }
      }
      .measure-li-row{
        font-size: 12px;
        border: 1px solid #d0d0d0;
        &:hover{
          background:rgba(45,140,240,0.2);
        }
        .measure-by{
          border-left:1px solid #d0d0d0;
          border-right:1px solid #d0d0d0;
        }
        >div{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          padding: 8px 4px;
          height: 34px;
          .short-fake-link{
            color:#666
          }
        }
        .delete-measure-btn{
          position: relative;
          top:-5px;
        }
      }
    }
    .measure {
      background: #f7f7f7;
      padding: 8px 30px 15px 30px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      margin: 5px 0 20px 0;
      position: relative;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      .add-measure {
        padding: 0 10px;
        text-align: center;
        .add-measure-btn[disabled='disabled'] {
          background-color: #d0d0d0;
          border: 1px solid #c3cbd6;
          color: #777;
        }
        .add-measure-btn {
          margin: 5px 0 5px 0;
          color: #1889e3;
          background-color: transparent;
          border: 1px solid #1889e3;
          border-radius: 4px;
          width: 78px;
         /* &:hover {
            background-color: #1889e3;
            color: white;
          }*/
        }
      }

    }
    .add-form-footer {
      text-align: center;
      .ivu-btn {
        border-radius: 4px;
        width: 120px;
        height: 36px;
        margin: 5px 15px;
      }
    }

  }
</style>
