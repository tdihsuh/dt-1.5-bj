<template>
    <div class="stat">
        <Card :bordered="false" class="stat-board">
            <div slot="title" class="stat-title">
                <span class="text"><img :src="iconImg" />河南省城市联合奖惩情况监测图</span>
            </div>
            <div class="stat-content clear">
                <highmaps class="maps" :options="options"></highmaps>
                <div class="billboard"><Table  :columns="columns"  height={350} :data="data1"></Table></div>
            </div>
        </Card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueHighcharts from 'vue-highcharts'
    import HighCharts from 'highcharts'
    import HighMaps from 'highcharts/modules/map'
    import axios from 'axios';
    import mapData from './henan'
    HighMaps(HighCharts)
    Vue.use(VueHighcharts, { HighCharts });
    let data =[]
    HighCharts.each(mapData.features, function(md) {
        var tmp = {
            name: md.properties.name,
            value: Math.floor((Math.random() * 1000) + 1) // 生成 1 ~ 100 随机值
        }
        console.log(tmp);
        data.push(tmp);
    })
    let options ={
        chart: {},
        title: {
            text: '河南省'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table><tr><td>{point.name}</td></tr>',
            pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
            '<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>' +
            '<tr><td>值</td><td>{point.value}</td></tr>' +
            '<tr><td>经纬度</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>',
            footerFormat: '</table>'
        },
        colorAxis: {
            min: 0,
            minColor: '#D3C9E7',
            maxColor: '#8685D0',
            labels: {
                style: {
                    "color": "grey", "fontWeight": "bold"
                }
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical'
        },
        series: [{
            data: data,
            mapData: mapData,
            joinBy: 'name',
            name: '河南',
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            states: {
                hover: {
                    color: '#ccc'
                }
            }
        }]
    }
    export default {
        data() {
            return {
                iconImg: require('../../images/title_icon.png'),
                options: options,
                columns: [
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '联合激励数量',
                        key: 'joint_incentive'
                    },
                    {
                        title: '联合惩戒数量',
                        key: 'joint_punishment'
                    },
                    {
                        title: '查询次数',
                        key: 'query_times'
                    },
                    {
                        title: '活跃度',
                        key: 'activity_metrics'
                    },
                    {
                        title: '排名',
                        key: 'order'
                    }
                ],
                data1: [{city: "郑州", joint_incentive: 761,joint_punishment:100,query_times:10000,activity_metrics:1200,order:0}  ,
                    {city: "开封", joint_incentive: 200,joint_punishment:100,query_times:10000,activity_metrics:1200,order:0}   ,
                    {city: "洛阳", joint_incentive: 837,joint_punishment:100,query_times:10000,activity_metrics:1200,order:0}   ,
                    {city: "平顶山", joint_incentive: 297,joint_punishment:100,query_times:10000,activity_metrics:1200,order:0} ,
                    {city: "安阳", joint_incentive: 480,joint_punishment:100,query_times:10000,activity_metrics:1200,order:0}   ]

            }
        },
        methods: {
            row (row, index) {
                return 'row';
            }
        }

    }

</script>
<style rel="stylesheet/less" lang="less">
   /* .row{
        height:55px ;
    }*/
    .stat{
        padding: 14px 20px;
    }
    .stat-board{
        .ivu-card-head{
            padding: 0 20px;
        }
        .stat-title{
            font-size: 18px;
            color: #4A4A4A;
            display: block;
            >.text{
                display: inline-block;
                height: 62px;
                line-height: 62px;
                border-bottom: 4px solid #1889E3;
                img{
                    position: relative;
                    top:5px;
                    margin-right: 4px;
                }
            }
        }
        .stat-content{
            padding: 30px;
            .maps{
                width: 40%;
                float: left;
                display: inline-block;
                height: 350px;
            }
            .billboard{
                width: 52%;
                float: left;
                margin-left: 40px;
                height: 350px;
                display: inline-block;
                .ivu-table-wrapper,.ivu-table-body,.ivu-table{
                    font-size: 18px;
                    text-align: center;
                }
                thead{
                    tr{
                        background-image: url("./city_rank_bg.png");
                        background-size: cover;
                        height:55px ;
                        th{
                            background: transparent;
                            color: white;
                            text-align: center;
                            .ivu-table-cell{
                                padding: 0;
                            }
                        }
                    }
                }
                td{
                        text-align: center;
                }
            }
        }
    }
</style>