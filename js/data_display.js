window.onload = function() {
        chart1();
        chart2();
    }
    // 基于准备好的dom，初始化echarts实例
function chart1() {
    var myChart = echarts.init(document.getElementById('chart1'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function chart2() {
    var MyScatter = echarts.init(document.getElementById('chart2'));

    var data = [
        ['2012-03-01',
            1,
            "翻身"
        ],
        [
            '2012-04-01',
            0.5,
            "没翻身"
        ],
        [
            '2017-03-02',
            0.5,
            "翻身"
        ]
    ];
    // var textStyle = {
    //     color: '#fff',
    //     fontStyle: 'normal',
    //     fontWeight: 'normal',
    //     fontFamily: '微软雅黑',
    //     fontSize: 14,
    // };
    option = {
        title: {
            text: '访问量'
        },
        legend: {
            data: ['访问量']
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            name: '时间轴',
            axisLine: {
                lineStyle: {
                    color: 'black',
                    // width: 8, //这里是为了突出显示加上的
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#C23A36'],
                    width: 1,
                    type: 'solid'
                }
            },
            nameGap: 30,
            maxInterval: 3600 * 2 * 1000,
            // min: data.time[0][0],
            // max: data.time[1][0],

        },
        yAxis: {
            type: 'value',
            name: '人次',
            //  splitArea: { show: false }, //去除网格区域

            //splitLine: { show: false }, //去除网格线

            axisLine: {
                lineStyle: {
                    color: 'black',
                    // width: 8, //这里是为了突出显示加上的
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#C23A36'],
                    width: 1,
                    type: 'solid'
                }
            }
        },
        series: [{
            name: '访问量',
            type: 'scatter',
            symbolSize: '8',
            itemStyle: {
                normal: {
                    color: '#666'
                }
            },
            data: data,

        }]
    };
    MyScatter.setOption(option);
}