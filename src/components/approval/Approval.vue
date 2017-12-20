<template>
  <div class="approval-board">
    <div class="searcher">
      <div class="searcher-tab">
        <div class="tab-items" :class="{active:!isPersonal}" @click="changeType(false)"><span
          class="tab-title">企业</span></div>
        <div class="tab-items" :class="{active:isPersonal}" @click="changeType(true)"><span class="tab-title">个人</span>
        </div>
      </div>
      <div class="approval-content">
        <div class="demo"
             :class="{'active':isPersonal,'unactive':!isPersonal,'focus':isFocus,'unfocus':!isFocus}"></div>
        <div class="approval-body">
          <i-form ref="searchData" :model="searchData" :rules="rules" :label-width="110">
            <Row :gutter="10">
              <i-col span="6">
                <FormItem :label="labelName.name" prop="name">
                  <i-input v-model="searchData.name" :placeholder="labelName.tip"/>
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem :label="labelName.code" prop="code">
                  <i-input v-model="searchData.code" :placeholder="labelName.codeTip"/>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="受理日期" prop="date">

                  <DatePicker type="date" placeholder="选择开始时间" format="yyyy年MM月dd日" v-model="searchData.startDate"
                              style="width: 45%;display: inline-block"></DatePicker>
                  <span style="width: 5%;display: inline-block">--</span>
                  <DatePicker type="date" placeholder="选择结束时间" format="yyyy年MM月dd日" v-model="searchData.endDate"
                              style="width: 45%;display: inline-block"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="4">
                            <span class="approval-btn" v-bind:class="{'approval-btn-loading':isLoading}"
                                  @click="search"><Icon type="ios-search-strong" v-if="!isLoading"></Icon><Icon
                              type="load-c" class="load" v-if="isLoading"></Icon>
                                <span v-if="!isLoading">查询</span>
                            </span>
              </i-col>
            </Row>
          </i-form>
        </div>
      </div>
    </div>
    <div class="approval-result">
      <div class="approval-result-title">
        <div class="text"><img :src="iconImg">审批记录</div>
      </div>
      <div class="approval-result-content">
        <ApprovalBoard :content="content" :columns="columns" :total="total" :current="current" :page-size="pageSize"
                       :is-personal="isPersonal" :callback="getData"></ApprovalBoard>

      </div>
    </div>
  </div>
</template>
<script>
  import ApprovalBoard from './ApprovalBoard.vue'
  import Meta from './Meta'
  import axios from 'axios'
  import util from '../../lib/util'
  import Vue from 'vue'

  Vue.component('ApprovalBoard', ApprovalBoard)
  let personalColumns = Meta.personalColumns
  let enterpriseColumns = Meta.enterpriseColumns

  export default {
    data () {
      const checkDate = (rule, value, callback) => {
        let startDate = this.searchData.startDate
        let endDate = this.searchData.endDate
        if (startDate > endDate) {
          callback(new Error('开始时间不能大于结束时间'))
        } else {
          if ((endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000) > 5) {
            callback(new Error('查询范围不能超过5天'))
          } else {
            callback()
          }
        }

      }
      return {
        isPersonal: false,
        isFocus: false,
        isLoading: false,
        searchData: {
          startDate: (new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * 5)),
          endDate: new Date()
        },
        iconImg: require('../../images/title_icon.png'),
        content: {},
        columns: [],
        current: 0,
        pageSize: 6,
        total: 0,
        rules: {
          date: [{validator: checkDate, trigger: 'change'}]
        }
      }
    },
    created () {
      this.getData()
    },
    computed: {
      labelName: function () {
        return this.isPersonal ? {name: '姓名', code: '证件号', tip: '请输入姓名', codeTip: '请输入证件号'} : {name: '企业名称', code: '统一信用代码', tip: '请输入企业名称', codeTip: '请输入社会统一信用代码'}
      }
    },
    methods: {
      setType (isPersonal) {
        this.isPersonal = isPersonal
      },
      getData () {
        this.$Loading.start()
        let current = Number(this.$route.query.page)
        if (this.$route.query.page && !isNaN(current)) {
          this.current = Number(this.$route.query.page)
        } else {
          this.current = 0
        }
        let data = Object.assign({}, this.searchData)
        data.startDate = new Date(data.startDate).getTime()
        data.endDate = new Date(data.endDate).getTime()
        let queryString = ''
        for (let key in data) {
          if (data[key]) {
            queryString += `${key}=${data[key]}&`
          }
        }
        let url = `/service/api/credit/operation/enterprise/list?` + queryString + `pageNum=${this.current}&limitSize=${this.pageSize}&_t=${new Date().valueOf()}`
        if (this.$route.query.type === 'person') {
          this.isPersonal = true
          this.columns = personalColumns
          url = `/service/api/credit/operation/person/list?` + queryString + `pageNum=${this.current}&limitSize=${this.pageSize}&_t=${new Date().valueOf()}`
        }
        else {
          this.columns = enterpriseColumns
        }
        //
        axios(url).then(res => {
          let result = util.responseProcessor(res)
          if (result.code === '0') {
            this.content = result
            this.total = result.totalCount
          }
        }).catch(error => {
          if (error.response) {
            util.responseProcessor(error.response)
          }
        }).finally(() => {
          this.$Loading.finish()
        })
      },
      changeType (isPersonal) {
        this.isPersonal = isPersonal
        this.$refs.searchData.resetFields()
        if (this.isPersonal) {
          this.$router.push('/approval?type=person')
        } else {
          this.$router.push('/approval')

        }
        this.getData()
      },

      search () {
        this.$refs.searchData.validate((valid) => {
          if (valid) {
            if (!this.isLoading) {
              this.current = 0
              if (this.$route.query.page) {
                let route = this.$route
                route.query.page = 0
                this.$router.push(route)
              }
              this.getData()
            } else {
              this.$Message.warn('正在查询请稍后')
            }
          } else {
            this.$Message.error('查询信息不正确')
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import "./animate";

  .approval-board {
    padding: 0 0 24px 0;
    > .searcher {
      text-align: center;
      .searcher-tab {
        .tab-items {
          display: inline-block;
          width: 122px;
          text-align: center;
          height: 28-5px;
          line-height: 28-5px;
          margin: 16px 0 10px 0;
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: #1889e3;
          }
          .tab-title {
            padding: 5px 2px;
          }
        }
        .active {
          .tab-title {
            border-bottom: 3px solid #1889E3;
          }
          color: #1889E3;
        }
      }
      > .approval-content {
        margin: 0 auto;
        .active {
          left: 61px;
          margin: 0 auto;
          z-index: 499;
        }

        .unactive {
          left: -61px;
          margin: 0 auto;
          z-index: 500;
        }
        .focus {
          border-color: transparent transparent #46a1e9 transparent;
        }
        .unfocus {
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

        .approval-btn {
          width: 120px;
          height: 36px;
          line-height: 40px;
          display: inline-block;
          font-size: 14px !important;
          background-color: #EB4449;
          color: white;
          cursor: pointer;
          border: 0;
          border-radius: 5px 5px;
          i {
            margin-right: 2px;
            font-size: 16px !important;
            position: relative;
            top: 2px;
          }
        }
        .approval-btn-loading {
          background: rgba(
            235, 68, 73, 0.5);
        }
      }
    }
    .approval-body {
      background-color: white;
      padding: 20px 0;
      border: 1px solid #D3D9E1;
      border-radius: 5px 5px;
      box-shadow: 2px 3px 8px rgba(200, 200, 200, 1);
      .ivu-input {
        font-size: 14px !important;
        height: 36px;
      }
      .ivu-form-item-label {
        font-size: 14px !important;
        padding: (36-14)/2px 10px;
      }
      .ivu-form-item-content {
        height: 36px;
      }
      .ivu-input-icon {
        height: 36px;
        line-height: 36px;
        width: 36px;
      }
      .ivu-form-item {
        margin-bottom: 0;
        vertical-align: middle;
        zoom: 1;
      }

    }
    .approval-result {
      font-size: 18px;
      color: #4A4A4A;
      display: block;
      background: #FFFFFF;
      box-shadow: 0 3px 5px 0 rgba(225, 225, 225, 0.50);
      margin: 5px auto 0 auto;
      padding: 0 30px 14px 30px;
      th {
        text-align: center;
      }
      > .approval-result-title {
        border-bottom: 2px solid #E6E6E6;
        > .text {
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
      > .approval-result-content {
        position: relative;
        min-height: 481px;
      }
    }
  }
</style>
