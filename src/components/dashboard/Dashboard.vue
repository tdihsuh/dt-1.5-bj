<template>
  <div class="stat">
    <Card :bordered="false" class="stat-board">
      <div slot="title" class="stat-title">
        <span class="text"><img :src="iconImg"/>河南省城市联合奖惩情况监测图</span>
      </div>

      <div class="stat-content clear">
        <Row>
          <i-col span="12">
            <highmaps class="maps" :options="options" ref="areaMaps"/>
          </i-col>
          <i-col span="12">
            <OrderTable class="order-by-city"></OrderTable>
          </i-col>
        </Row>
      </div>
    </Card>
    <Card :bordered="false" class="stat-board">
      <div slot="title" class="stat-title">
        <span class="text"><img :src="iconImg"/>河南省部委联合奖惩情况监测图</span>
      </div>
      <div class="stat-content clear stat-bottom ">
        <OrderDepartmentTable></OrderDepartmentTable>
      </div>
    </Card>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueHighcharts from 'vue-highcharts'
  import HighCharts from 'highcharts'
  import HighMaps from 'highcharts/modules/map'
  import axios from 'axios'
  import {mapActions, mapGetters} from 'vuex'
  import util from '../../lib/util'
  import OrderTable from './OrderTable'
  import OrderDepartmentTable from './OrderDepartmentTable'

  let map = require('./henan.json')
  HighMaps(HighCharts)
  Vue.use(VueHighcharts, {HighCharts})
  Vue.component('OrderTable', OrderTable)
  Vue.component('OrderDepartmentTable', OrderDepartmentTable)

  let data = []
  HighCharts.each(map.features, function (md) {
    let tmp = {
      name: md.properties.name,
      selectCount: 0,
      rank: 1,
      activeCount: 0,
      uniCount: 0,
      value: 0
    }
    data.push(tmp)
  })

  let options = {
    chart: {},
    title: {
      text: null
    },
    mapNavigation: {
      enabled: false,
      enableMouseWheelZoom: false,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<table class="rank-tips"><tr><td>{point.name}</td></tr>',
      pointFormat: '<tr class="rank-tips-fullname"><th colspan="2">{point.properties.fullname}</th></tr>' +
      '<tr><td class="rank-tips-title">奖惩数量：</td><td>{point.uniCount}</td></tr>' +
      '<tr><td class="rank-tips-title">查询次数：</td><td>{point.selectCount}</td></tr>' +
      '<tr><td class="rank-tips-title">活跃度：</td><td>{point.activeCount}</td></tr>' +
      '<tr><td class="rank-tips-title">排名：</td><td>{point.rank}</td></tr>',
      footerFormat: '</table>'
    },
    colorAxis: {
      min: 0,
      max: 1500,
      minColor: '#E1FFFF',
      maxColor: '#2f6fd0',
      labels: {
        style: {
          'color': 'grey', 'fontWeight': 'bold'
        }
      }
    },
    legend: {
      align: 'right',
      layout: 'vertical'
    },
    series: [{
      data: data,
      mapData: map,
      joinBy: 'name',
      name: '河南',
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      states: {
        hover: {
          color: '#EFFFEF',
        }
      }
    }],

  }
  export default {
    props: ['nav'],
    data () {
      return {
        iconImg: require('../../images/title_icon.png'),
        options: options
      }
    },
    methods: {
      ...mapActions([
        'getAllData', 'allAreaData'
      ]),
      ...mapGetters([
        'allAreaData', 'mapOptions'
      ])
    },
    created () {
      this.getAllData()
      this.$Loading.start()
      axios.get(`/service/api/count/areaRank`).then(res => {
        let maps = this.$refs.areaMaps.chart
        let areaData = util.responseProcessor(res)
        this.$Loading.finish()
        if (areaData.code === '0' && areaData.obj.length > 0) {
          let d = []
          areaData.obj.map(o => {
            let tmp = {
              areaName: o.areaName,
              name: o.areaName.replace('市', ''),
              uniCount: o.uniCount,
              selectCount: o.selectCount,
              activeCount: o.activeCount,
              rank: o.rank,
              value: o.activeCount
            }
            d.push(tmp)
          })

          maps.update({
            series: [{data: d}]
          })
        }
      })
    }

  }
</script>
<style rel="stylesheet/less" lang="less">
  .rank-tips {
    width: 200px;
    padding: 0 20px;
    tr.rank-tips-fullname {
      th {
        padding-bottom: 10px;
        text-align: center;
        color: #2f6fd0;
      }

    }
    tr {
      th {
        font-size: 14px;
      }
      td {
        width: 80px;
        text-align: left;
        font-size: 12px;
      }
      td.rank-tips-title {
        font-weight: 700;
      }
    }

  }

  .stat {
    padding: 14px 0;
  }

  .stat-board {
    margin-top: 14px;
    .ivu-card-head {
      padding: 0 20px;
    }
    .stat-title {
      font-size: 18px;
      color: #4A4A4A;
      display: block;
      > .text {
        display: inline-block;
        height: 62px;
        line-height: 62px;
        border-bottom: 4px solid #1889E3;
        img {
          position: relative;
          top: 5px;
          margin-right: 4px;
        }
      }
    }
    .stat-bottom {
      border: 1px solid #eee;
    }
    .stat-content {
      margin: 10px 30px;
      .maps {
        display: inline-block;
        height: 350px;
        width: 90%;
      }
      .billboard {
        margin-left: 40px;
        height: 350px;
        display: inline-block;
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>
