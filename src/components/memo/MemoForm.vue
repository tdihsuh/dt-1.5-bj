<template>
  <div class="memo-form-div">
    <SecondaryTitle title="备忘录基本信息：" style="padding: 10px 0" ></SecondaryTitle>
    <i-form :model="memo" :label-width="160" label-position="left" class="memo-form">
      <FormItem label="联合惩戒备忘录：">
        <i-input v-model="memo.name" placeholder="请输入备忘录名称" class="input-item"></i-input>
      </FormItem>
      <FormItem label="联合奖惩性质：">
        <RadioGroup v-model="memo.type">
          <Radio label="0"><span style="color:rgb(235, 68, 73);margin: 0 20px 0 0">联合激励</span></Radio>
          <Radio label="1"><span style="color:rgb(24, 137, 227);margin: 0 20px 0 0">联合惩戒</span></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="认定部门：">
        <i-select v-model="memo.departments" filterable multiple placeholder="请选择或输入部门关键字进行搜索" class="input-item">
          <Option v-for="(item,key) in departmentList" :value="item" :key="key">{{ item }}</Option>
        </i-select>
      </FormItem>
      <FormItem label="标签：">
        <i-input v-model="memo.tag" placeholder="请输入标签" class="input-item"></i-input>
      </FormItem>
      <div style="text-align:center;padding-top: 20px">
        <i-button type="primary" @click="saveBaseInfo()" v-if="!hasSaveBaseInfo">保存基本信息</i-button>
      </div>
    </i-form>
    <div class="saved-measures-list" v-if="hasSaveBaseInfo">
      <SecondaryTitle title="奖励/惩戒措施：" style="padding: 10px 0" ></SecondaryTitle>
      <Collapse accordion style="margin-bottom: 15px">
        <Panel v-for="(measure,index) in memo.savedMeasures" :key="departmentList[measure.department]" :name="measure.department+''" v-if="measure.measures.length>0" >
         <div class="title"><span class="department-name">{{ departmentList[measure.department+''] }}</span> <span class="counter">{{measure.measures.length}}</span></div>
           <ul class="measure-ul" slot="content">
            <i-table :columns="columns" :data="measure.measures"></i-table>
        </ul>
        </Panel>
      </Collapse>
      <i-form :model="measure" :label-width="160" label-position="left" class="memo-form">
        <div class="measure">
          <FormItem label="措施：">
            <i-input v-model="measure.measureName" placeholder="请输入奖励／惩戒措施"></i-input>
          </FormItem>
          <FormItem label="法律及政策依据：">
            <i-input v-model="measure.measureBy" placeholder="请输入法律及政策依据"></i-input>
          </FormItem>
          <FormItem label="实施部门：">
            <i-select v-model="measure.department" filterable placeholder="请选择或输入部门关键字进行搜索">
              <Option v-for="(item,key) in departmentList" :value="item" :key="key"> {{ item }}</Option>
            </i-select>
          </FormItem>
          <div class="add-measure">
            <Button type="ghost" class="add-measure-btn" size="small" icon="plus-round">添加</Button>
          </div>
        </div>
      </i-form>
      <div class="add-form-footer" v-if="isAdd">
        <Button type="error">暂存备忘录</Button>
        <Button type="primary">提交审核</Button>
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
  export default {
    props: ['isAdd', 'closeHandler'],
    data () {
      return {
        departmentList: require('../common/departments'),
        hasSaveBaseInfo:false,
        columns:[
          {
            title: '措施',
            key: 'measureName',
            align: 'center'
          },
          {
            title: '法律及政策依据',
            key: 'measureBy',
            align: 'center'
          },
          {
            title: '操作',
            key: 'identityCard',
            align: 'center'
          }
        ],
        memo: {
          type: 0,
          departments: [],
          savedMeasures: [
            {
              measures:[
                {measureName: '测试措施',
                  measureBy: '必须严格依照法律规定的权限和程序进行，不得与法律相违背。行政机关实施行政管理，应当依照法律、法规、规章的规定进行。这里所依据的法律，既包括实体法，也包括程序法'}
                  ],
              department: 1,
            },
            {
              department: 2,
              measures:[
                {measureName: '测试措施', measureBy: '法律依据'},
                {measureName: '测试措施', measureBy: '法律依据'},
                {measureName: '测试措施', measureBy: '法律依据'},
                {measureName: '测试措施', measureBy: '法律依据'}
                ]
            }
          ]
        },
        measure: {}
      }
    },
    methods: {
      addMeasure (e) {
        // this.memo.measures.push({})
      },
      removeMeasure (i) {
        // this.memo.measures.splice(i, 1)
      },
      saveBaseInfo(){
        this.hasSaveBaseInfo = true
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
      margin: 10px 0;
    }
    .ivu-form-item-label {
      color: #666666;
      line-height: 20px;
      padding: 0 12px 0 0;

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
    }
    .measure {
      background: #f7f7f7;
      padding: 10px 30px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      margin: 5px 0 20px 0;
      position: relative;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      .add-measure {
        padding: 0 40px;
        text-align: center;
        .add-measure-btn {
          margin: 18px 0 20px 0;
          color: #1889e3;
          background-color: transparent;
          border: 1px solid #1889e3;
          border-radius: 4px;
          width: 78px;
          &:hover {
            background-color: #1889e3;
            color: white;
          }
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
