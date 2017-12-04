<template>
    <div class="stat">
        <Card :bordered="false" class="stat-board">
            <div slot="title" class="stat-title">
                <span class="text"><img :src="iconImg"/>河南省城市联合奖惩情况监测图</span>
            </div>

            <div class="stat-content clear">
                <Row>
                    <Col span="12">
                    <highmaps class="maps" :options="mapOptions()"/>
                    </Col>
                    <Col span="12">
                    <OrderTable  class="order-by-city"></OrderTable>
                    </Col>
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
    import OrderTable from './OrderTable'
    import OrderDepartmentTable from './OrderDepartmentTable'
    //import mapData from './henan'
    HighMaps(HighCharts)
    Vue.use(VueHighcharts, {HighCharts})
    Vue.component('OrderTable', OrderTable)
    Vue.component('OrderDepartmentTable', OrderDepartmentTable)
   /* let data = []*/
   /* HighCharts.each(mapData.features, function (md) {
        var tmp = {
            name: md.properties.name,
            value: Math.floor((Math.random() * 1000) + 1) // 生成 1 ~ 100 随机值
        }
        data.push(tmp)
    })*/
  //  let options =
    import { mapActions,mapGetters } from 'vuex'
    export default {
        props:['nav'],
        data() {
            return {
                iconImg: require('../../images/title_icon.png')
            }
        },
        methods: {
            ...mapActions([
               'getAllData','allAreaData'
            ]),
            ...mapGetters([
                'allAreaData','mapOptions'
            ])
        },
        created() {
            this.getAllData()
        }

    }

</script>
<style rel="stylesheet/less" lang="less">
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
        .stat-bottom{
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