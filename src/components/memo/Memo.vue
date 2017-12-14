<template>
  <div class="memo-content">
    <Tabs class="memo-tabs" :value="status" @on-click="changeTab">
      <TabPane :label="labelPublish" name="publish">
        <MemoTable :columns="columnsPublish" :data='dataPublish' :is-publish="true"></MemoTable>
      </TabPane>
      <TabPane :label="labelUnpublish" name="unpublish">
        <MemoTable :columns="columnsUnpublish" :data='dataUnpublish' :is-publish="false"></MemoTable>
      </TabPane>
      <TabPane :label="labelAdd" name="add">
        <MemoForm :is-add="true"></MemoForm>
      </TabPane>
    </Tabs>
    <Modal v-model="isShowDetails" width="1000px">
      <div slot="header" class="details-header">失信协同监管</div>
      <div class="details-content">
        <ItemList :list="list"></ItemList>
        <div class="item-tag clear"><span class="item-name">标签：</span><span class="item-content"><span class="tag">重大违法税收</span></span>
        </div>
        <div class="item-details clear">
          <ItemList :list="list1"></ItemList>
        </div>
        <div class="item-details clear">
          <ItemList :list="list2"></ItemList>
        </div>

      </div>
      <div slot="footer" class="details-footer">
        <Button type="ghost" size="large" class="return-btn" @click="isShowDetails=false">返回</Button>
      </div>
    </Modal>
    <Modal v-model="isShowUnpublish" width="1000px" :styles="{top: '50px'}">
      <div slot="header" class="details-header">
        失信协同监管
      </div>
      <MemoForm :is-add="false" :close-handler="handleModal"></MemoForm>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import Vue from 'vue'
  import TabLabel from './TabLabel.vue'
  import MemoTable from './MemoTable.vue'
  import MemoForm from './MemoForm.vue'

  Vue.component('TabLabel', TabLabel)
  Vue.component('MemoTable', MemoTable)
  Vue.component('MemoForm', MemoForm)
  let data = [{
    memo_name: '失信企业协同监管',
    sponsor: '省发改委',
    joint_count: 17,
    operator: 'admin001',
    publish_date: '2017/08/12 13:56:00',
    id: 2
  },
    {
      memo_name: '失信企业协同监管',
      sponsor: '省发改委',
      joint_count: 17,
      operator: 'admin001',
      publish_date: '2017/08/12 13:56:00',
      id: 1
    }]
  let columnBase = [
    {
      title: '备忘录名称',
      key: 'memo_name',
      align: 'center'
    },
    {
      title: '发起单位',
      key: 'sponsor',
      align: 'center'
    },
    {
      title: '联合部委数量',
      key: 'joint_count',
      align: 'center'
    },
    {
      title: '发布用户',
      key: 'operator',
      align: 'center'
    },
    {
      title: '发布时间',
      key: 'publish_date',
      align: 'center'
    }
  ]

  export default {
    data () {
      return {
        isShowDetails: false,
        isShowUnpublish: false,
        mid: '',
        labelPublish: (h) => {
          return h('TabLabel', {
            props: {
              count: 2,
              text: '已发布备忘录',
              icon: 'icon-yifabu'
            }
          })
        },
        labelUnpublish: (h) => {
          return h('TabLabel', {
            props: {
              count: 0,
              text: '暂存备忘录',
              icon: 'icon-zancun'
            }
          })
        },
        labelAdd: (h) => {
          return h('TabLabel', {
            props: {
              count: 0,
              text: '新增备忘录',
              icon: 'icon-xinzeng'
            }
          })
        },
        columnsPublish: columnBase.concat({
          title: '操作',
          key: 'id',
          align: 'center',
          render: (h, params) => {
            return h('a', {
              attrs: {
                class: 'link-details',
                id: params.row.id
              },
              props: {
                'mid': params.row.id
              },
              on: {
                click: this.openDetails
              },
            }, '查看详细')
          }
        }),
        columnsUnpublish: columnBase.concat({
          title: '操作',
          key: 'id',
          align: 'center',
          render: (h, params) => {
            return h('a', {
              attrs: {
                class: 'link-details',
                id: params.row.id
              },
              props: {
                'mid': params.row.id
              },
              on: {
                click: () => {
                  this.isShowUnpublish = true
                }
              }
            }, '查看详细')
          }
        }),
        dataPublish: data,
        dataUnpublish: data,
        list: [[
          {name: '联合惩戒备忘录：', content: '关于重大违法税收案件联合备忘录'},
          {name: '联合奖惩性质：', content: '联合惩戒'},
          {name: '认定部门：', content: '省发改委'}
        ]],
        list1: [[
          {name: '措施：', content: '对欠缴查补税款的当事人，在出境前未按照规定结清应纳税款、滞纳金或者提供纳税担保的，税务司机可以通知出入境管理机关阻止其出境。'},
          {name: '法律及政策依据：', content: '对于xxx，认为其xxx'},
          {name: '实施部门：', content: '省发改委'}
        ]],
        list2: [[
          {name: '措施：', content: '对欠缴查补税款的当事人，在出境前未按照规定结清应纳税款、滞纳金或者提供纳税担保的，税务司机可以通知出入境管理机关阻止其出境。'},
          {name: '法律及政策依据：', content: '对于xxx，认为其xxx'},
          {name: '实施部门：', content: '省发改委'}
        ]]
      }
    },
    computed: {},
    created () {
      let status = this.$route.query.status ? this.$route.query.status : 'publish'

    },
    computed: {
      status: function () {
        return this.$route.query.status ? this.$route.query.status : 'publish'
      }
    },
    methods: {
      changeTab (v) {
        this.$router.push(`/memo?status=${v}`)
      },
      openDetails (e) {
        let mid = e.target.attributes.getNamedItem('id').value
        this.isShowDetails = true

      },
      handleModal () {
        this.isShowUnpublish = false
      }
    }
  }

</script>
<style rel="stylesheet/less" lang="less">
  .details-header {
    font-size: 14px;
    color: #353842;
    text-align: left;
    height: 50-28px;
    line-height: 50-28px;
  }

  .details-content {
    min-height: 200px;
    font-size: 14px;
    .item-details {
      margin: 10px 40px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
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
        color: #353842;
        width: 80%;
        > .tag {
          display: inline-block;
          border: 1px solid #1889e3;
          border-radius: 3px;
          width: 114px;
          height: 28px;
          line-height: 28px;
          color: #1889e3;
          text-align: center;
        }
      }
    }
  }

  .ivu-modal-footer {
    border-top: 0;
    .details-footer {
      width: 100%;
      margin: 8px 0;
      text-align: center;
      .return-btn {
        width: 120px;
        height: 36px;
      }
    }
  }

  .memo-content {
    padding: 12px 0;
    .ivu-tabs-nav-scroll-disabled {
      display: none;
    }

    color: #4A4A4A;
    .memo-tabs {
      background-color: white;
      .ivu-tabs-tab {
        height: 60px;
        line-height: 60-16px;
        font-size: 16px;
        .ivu-badge {
          position: relative;
          top: -2px;
          left: 4px
        }

      }
      .ivu-tabs-content {
        font-size: 14px;
        .ivu-tabs-tabpane {
          min-height: 650px;
          padding: 25px 50px;
        }
      }
    }
  }
</style>
