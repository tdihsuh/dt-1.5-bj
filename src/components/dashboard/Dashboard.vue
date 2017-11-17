<template>
    <div class="stat">
        <Card :bordered="false" class="stat-board">
            <div slot="title" class="stat-title">
                <span class="text"><img :src="iconImg"/>河南省城市联合奖惩情况监测图</span>
            </div>

            <div class="stat-content clear">
                <Row>
                    <Col span="12">
                    <highmaps class="maps" :options="options"/>
                    </Col>
                    <Col span="12">
                    <OrderTable :data="data" :columns="columns" class="order-by-city"></OrderTable>
                    </Col>
                </Row>
            </div>
        </Card>
        <Card :bordered="false" class="stat-board">
            <div slot="title" class="stat-title">
                <span class="text"><img :src="iconImg"/>河南省部委联合奖惩情况监测图</span>
            </div>
            <div class="stat-content clear stat-bottom ">
                <OrderDepartmentTable :data="data1" :columns="columns1"></OrderDepartmentTable>
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
    import mapData from './henan'


    HighMaps(HighCharts)
    Vue.use(VueHighcharts, {HighCharts})
    Vue.component('OrderTable', OrderTable)
    Vue.component('OrderDepartmentTable', OrderDepartmentTable)
    let data = []
    HighCharts.each(mapData.features, function (md) {
        var tmp = {
            name: md.properties.name,
            value: Math.floor((Math.random() * 1000) + 1) // 生成 1 ~ 100 随机值
        }
        data.push(tmp)
    })
    let options = {
        chart: {},
        title: {
            text:null
        },
        mapNavigation: {
            enabled: true,
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
            headerFormat: '<table><tr><td>{point.name}</td></tr>',
            pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
            '<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>' +
            '<tr><td>活跃度</td><td>{point.value}</td></tr>' +
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
                    color: 'yellow'
                }
            }
        }]
    }
    export default {
        props:['nav'],
        beforeCreate(){
            this.$emit("hideNav", true);
        },
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
                data: [{
                    city: "郑州",
                    joint_incentive: 761,
                    joint_punishment: 100,
                    query_times: 10000,
                    activity_metrics: 1200,
                    order: 1
                },
                    {
                        city: "开封",
                        joint_incentive: 200,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 2
                    },
                    {
                        city: "洛阳",
                        joint_incentive: 837,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 3
                    },
                    {
                        city: "平顶山",
                        joint_incentive: 297,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 4
                    },
                    {
                        city: "安阳",
                        joint_incentive: 480,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 6
                    }],
                columns1: [{
                    title: '部委',
                    key: 'department'
                },
                    {
                        title: '已联合部委数',
                        key: 'joint_department'
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
                        title: '部委活跃度',
                        key: 'activity_metrics'
                    },
                    {
                        title: '排名',
                        key: 'order'
                    }
                ],
                data1: [{
                    department: '省发改委',
                    joint_department: 12,
                    joint_incentive: 121,
                    joint_punishment: 12,
                    query_times: 12,
                    activity_metrics: 12,
                    order: 1
                },
                    {
                        department: '省交通厅',
                        joint_department: 12,
                        joint_incentive: 121,
                        joint_punishment: 12,
                        query_times: 12,
                        activity_metrics: 12,
                        order: 2
                    },
                    {
                        department: '省人社厅',
                        joint_department: 12,
                        joint_incentive: 121,
                        joint_punishment: 12,
                        query_times: 12,
                        activity_metrics: 12,
                        order: 3
                    },
                    {
                        department: '税务局',
                        joint_department: 12,
                        joint_incentive: 121,
                        joint_punishment: 12,
                        query_times: 12,
                        activity_metrics: 12,
                        order: 4
                    }]

            }
        },
        methods: {
            row(row, index) {
                return 'row';
            }
        },
        created() {
            let data = [
                [{
                    city: "郑州",
                    joint_incentive: 761,
                    joint_punishment: 100,
                    query_times: 10000,
                    activity_metrics: 1200,
                    order: 1
                },
                    {
                        city: "济源",
                        joint_incentive: 479,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 2
                    },
                    {
                        city: "开封",
                        joint_incentive: 200,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 3
                    },
                    {
                        city: "洛阳",
                        joint_incentive: 837,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 4
                    },
                    {
                        city: "平顶山",
                        joint_incentive: 297,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 6
                    },
                    {
                        city: "安阳",
                        joint_incentive: 480,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 7
                    }],
                [{
                    city: "鹤壁",
                    joint_incentive: 515,
                    joint_punishment: 100,
                    query_times: 10000,
                    activity_metrics: 1200,
                    order: 8
                },
                    {
                        city: "新乡",
                        joint_incentive: 335,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 9
                    },
                    {
                        city: "焦作",
                        joint_incentive: 196,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 10
                    },
                    {
                        city: "濮阳",
                        joint_incentive: 573,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 11
                    },
                    {
                        city: "驻马店",
                        joint_incentive: 146,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 12
                    },
                    {
                        city: "许昌",
                        joint_incentive: 205,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 13
                    }],
                [{
                    city: "漯河",
                    joint_incentive: 728,
                    joint_punishment: 100,
                    query_times: 10000,
                    activity_metrics: 1200,
                    order: 14
                },
                    {
                        city: "三门峡",
                        joint_incentive: 805,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 15
                    },
                    {
                        city: "南阳",
                        joint_incentive: 337,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 16
                    },
                    {
                        city: "商丘",
                        joint_incentive: 620,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 17
                    },
                    {
                        city: "周口",
                        joint_incentive: 423,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 18
                    },
                    {
                        city: "信阳",
                        joint_incentive: 198,
                        joint_punishment: 100,
                        query_times: 10000,
                        activity_metrics: 1200,
                        order: 19
                    }]
            ]
            var i = 0
            let len = data.length
            setInterval(() => {
                this.data = data[i % len]
                i++
            }, 2200);
        }

    }

</script>
<style rel="stylesheet/less" lang="less">
    .stat {
        padding: 14px 20px;
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