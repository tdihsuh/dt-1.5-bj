<template>
  <div>
    <div v-if="isInit" class="init-board">
      <img :src="searchIcon">
      <div>奖惩信息查询</div>
    </div>
    <div v-if="!isInit && (personInfo().length>0 || enterpriseInfo().length>0)" class="has-result-board">
      <i-table :data="isPersonal?personInfo():enterpriseInfo()" :columns="columns"></i-table>
    </div>
    <div v-if="!isInit && personInfo().length === 0 && enterpriseInfo().length===0" class="init-board">
      <img :src="emptyIcon">
      <div>没有查询到任何信息！</div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['columns', 'isPersonal'],
    data () {
      return {
        searchIcon: require('./search_icon.png'),
        emptyIcon: require('./emptystate_icon.png'),
        content: []
      }
    },
    computed: {
      isInit () {
        if (this.columns.length === 0) {
          return true
        }
        else {
          return false
        }
      }
    },
    methods: {
      ...mapGetters([
        'enterpriseInfo', 'personInfo'
      ])

    }
  }
</script>
<style rel="stylesheet/less" lang="less">

  .init-board {
    text-align: center;
    img {
      margin: 131px auto 14px auto;
    }
    div {

      color: #9B9B9B;
      letter-spacing: 0;
    }
  }

  .ivu-table-header {
    color: #777777;
    letter-spacing: 0;
    border: 1px solid #EEEEEE;

    tr {

    }
    th {
      border: 1px solid #fff;
      height: 48px;
      background-color: #eee;
      font-size: 14px;
    }
  }

  td {
    font-size: 14px;
  }

  .has-result-board {
    margin-top: 40px;
    font-size: 12px;
    color: #353742;
    letter-spacing: 0;
    .ivu-table-row {
      //height: 73px;
      td{
          font-size: 12px;
      }
    }
    .result-tag {
      display: inline-block;
      border: 1px solid #1889E3;
      border-radius: 3px;
      height: 24px;
      line-height: 24px;
    }
  }
</style>
