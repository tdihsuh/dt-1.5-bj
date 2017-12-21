<template>
  <div class="memo-content" @renderAllList="getAllList">
    <Tabs class="memo-tabs" :value="status" @on-click="changeTab">
      <TabPane :label="labelPublish" name="publish">
        <MemoTable :columns="columnsPublish" :data='dataPublish' :is-publish="true"></MemoTable>
      </TabPane>
      <TabPane :label="labelUnpublish" name="unpublish">
        <MemoTable :columns="columnsUnpublish" :data='dataUnpublish' :is-publish="false"></MemoTable>
      </TabPane>
      <TabPane :label="labelPending" name="pending">
        <MemoTable :columns="columnsPending" :data='dataPending' :is-publish="false"></MemoTable>
      </TabPane>
      <TabPane :label="labelAdd" name="add">
        <MemoForm :is-add="true" :times="times"></MemoForm>
      </TabPane>
    </Tabs>
    <Modal v-model="isShowDetails" width="1000px">
      <div slot="header" class="details-header">备忘录详情</div>
      <MemoDetails :mid="publishMemo"></MemoDetails>
      <div slot="footer" class="details-footer">
        <Button type="ghost" class="return-btn"  @click="isShowDetails=false">返回</Button>
      </div>
    </Modal>
    <Modal v-model="isShowUnpublish" width="1000px" :styles="{top: '50px'}">
      <div slot="header" class="details-header">
        审核备忘录
      </div>
      <MemoDetails :mid="unpublishMemo"></MemoDetails>
      <div slot="footer" class="details-footer">
        <Button type="success" class="return-btn"   @click="isShowUnpublish=false">审核通过</Button>
        <Button type="error" class="return-btn" @click="isShowUnpublish=false">驳回修改</Button>
        <Button type="ghost"  class="return-btn" @click="isShowUnpublish=false">返回</Button>
      </div>
    </Modal>
    <Modal v-model="isShowPending" width="1000px" :styles="{top: '50px'}">
      <div slot="header" class="details-header">
        备忘录修改
      </div>
      <MemoForm :is-add="false" :mid="pendingMemo" :close-handler="handleModal"></MemoForm>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import util from '../../lib/util'
  import TabLabel from './TabLabel.vue'
  import MemoTable from './MemoTable.vue'
  import MemoForm from './MemoForm.vue'
  import MemoDetails from './MemoDetails.vue'
  import Meta from './Meta'

  Vue.component('TabLabel', TabLabel)
  Vue.component('MemoTable', MemoTable)
  Vue.component('MemoForm', MemoForm)
  Vue.component('MemoDetails', MemoDetails)
  export default {
    data () {
      return {
        isShowDetails: false,
        isShowUnpublish: false,
        isShowPending: false,
        pendingMemo: undefined,
        unpublishMemo: undefined,
        publishMemo: undefined,
        times: 0,
        memoId: '',
        pageSize: 100,
        labelPublish: Meta.labelPublish,
        labelUnpublish: Meta.labelUnpublish,
        labelPending: Meta.labelPending,
        labelAdd: Meta.labelAdd,
        columnsPublish: Meta.columnBase.concat([{
          title: '发布时间',
          key: 'updateTime',
          align: 'center',
          render: (h, params) => {
            let date = ''
            if (params.row.createTime) {
              date = new Date(params.row.createTime).Format('yyyy/MM/dd hh:mm:ss')
            }
            return h('span', {}, date)
          }
        },
          {
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
                    this.isShowDetails = true
                    this.publishMemo = params.row.id
                  }
                },
              }, '查看详细')
            }
          }]),
        columnsUnpublish: Meta.columnBase.concat([{
          title: '提交时间',
          key: 'updateTime',
          align: 'center',
          render: (h, params) => {
            let date = ''
            if (params.row.createTime) {
              date = new Date(params.row.createTime).Format('yyyy/MM/dd hh:mm:ss')
            }
            return h('span', {}, date)
          }
        }, {
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
                  this.unpublishMemo = params.row.id
                }
              }
            }, '进入审核')
          }
        }]),
        columnsPending: Meta.columnBase.concat([{
          title: '更新时间',
          key: 'updateTime',
          align: 'center',
          render: (h, params) => {
            let date = ''
            if (params.row.createTime) {
              date = new Date(params.row.createTime).Format('yyyy/MM/dd hh:mm:ss')
            }
            return h('span', {}, date)
          }
        }, {
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
                  this.isShowPending = true
                  this.pendingMemo = params.row.id
                }
              }
            }, '继续修改')
          }
        }]),
        dataPublish: [],
        dataPending: [],
        dataUnpublish: []
      }
    },
    beforeCreate () {

    },
    created () {
      let status = this.$route.query.status
      if (status === 'publish' || status === 'pending' || status === 'unpublish' || status === 'add') {

      }
      else {
        this.$router.push(`/memo?status=publish`)
      }
      let statusList = ['publish', 'unpublish', 'pending']
      for (let s of statusList) {
        this.getList(s)
      }

    },
    computed: {
      status: function () {
        return this.$route.query.status ? this.$route.query.status : 'publish'
      }
    },
    methods: {

      getPendingList () {
        // /api/memo/pending/list
        axios.get(`/service/api/memo/modify/list?limitSize=${this.pageSize}&_t=${new Date().valueOf()}`).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.dataPending = result.obj
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        })
      },
      getUnpblishList () {
        axios.get(`/service/api/memo/pending/list?limitSize=${this.pageSize}&_t=${new Date().valueOf()}`).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.dataUnpublish = result.obj
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        })
      },
      getPublishList () {
        axios.get(`/service/api/memo/publish/list?limitSize=${this.pageSize}&_t=${new Date().valueOf()}`).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.dataPublish = result.obj
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        })
      },
      getAllList () {
        let statusList = ['publish', 'unpublish', 'pending']
        for (let s of statusList) {
          this.getList(s)
        }
      },
      getList (v) {
        if (v === 'pending') {
          this.getPendingList()
        }
        else if (v === 'publish') {
          this.getPublishList()
        }
        else if (v === 'unpublish') {
          this.getUnpblishList()
        }
      },
      changeTab (v) {
        this.memoId = undefined
        this.getList(v)
        this.times += 1
        this.$router.push(`/memo?status=${v}`)
      },
      handleModal () {
        this.isShowDetails = false
        this.isShowUnpublish = false
        this.isShowPending = false
        this.getList(this.status)
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
  .ivu-modal-footer {
    border-top: 0;
    .details-footer {
      width: 100%;
      margin: 0 0 8px 0;
      text-align: center;
      .return-btn {
        width: 100px;
      }
    }
  }

  .memo-content {
    padding: 5px 0;
    .ivu-tabs-nav-scroll-disabled {
      display: none;
    }

    color: #4A4A4A;
    .memo-tabs {
      background-color: white;
      .ivu-tabs-tab {
        height: 60px;
        line-height: 60-14px;
        font-size: 14px;
        .ivu-badge {
          position: relative;
          top: -2px;
          left: 4px
        }

      }
      .ivu-tabs-content {
        font-size: 12px;
        .ivu-tabs-tabpane {
          min-height: 650px;
          padding: 25px 50px;
        }
      }
    }
  }
</style>
