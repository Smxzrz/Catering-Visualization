// 柱状图
(function () {
    var myChart = echarts.init(document.querySelector('.bar .chart'));
    var option = {
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        // title:{
        //     text:bar_data.title,
        //     left: 'center',
        // },
        // color: ['#2f89cf'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: "5%",
            top: "5%",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'none',
            },
        ],
        xAxis: [
            {
                type: 'category',
                // data: ['2016-08-01', '2016-08-02', '2016-08-03', '2016-08-04', '2016-08-06', '2016-08-07'],
                data: bar_data.x_data,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                    fontsize:'5',
                    // interval: 0,
                    // rotate: 30,
                    color:'#fff',
                },
                axisLine:{
                    show:false,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                interval : 1,
                axisLabel:{
                    color:"#fff",
                    fontsize:'12'
                },
                axisLine: {
                    lineStyle:{
                        color:"rgba(255,255,255,0.1)",
                        width:2
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:"rgba(255,255,255,0.1)"
                    }
                }
            }
        ],
        series: [
            {
                colorBy:'data',
                name: '销量个数',
                type: 'bar',
                barWidth: '35%',
                data: bar_data.y_data,
                itemStyle:{
                    borderRadius:5
                }
            }
        ]
    };
    myChart.setOption(option);

    window.addEventListener("resize",function () {
        myChart.resize();
    });
})();

// 折线图
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line .chart"));
  // 2.指定配置
  var option = {
      toolbox: {
          feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
          }
      },
      dataZoom: [
          {
              type: 'inside',
              xAxisIndex: [0],
          },
      ],
      tooltip: {
          trigger: "axis"
      },
      legend: {
          // 如果series 对象有name 值，则 legend可以不用写data
          // 修改图例组件 文字颜色
          itemStyle:{
              color: "#4c9bfd",
          },
          textStyle:{
              color:"#4c9bfd",
          },

          // 这个10% 必须加引号
          left: "10%"
      },
      grid: {
          top: "30%",
          left: "3%",
          right: "13%",
          bottom: "3%",
          show: true, // 显示边框
          borderColor: "#012f4a", // 边框颜色
          containLabel: true // 包含刻度文字在内
          },
      xAxis: {
          type: "category",
          boundaryGap: false,
          data:line_data.x_data,
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
              color: "#fff" // 文本颜色
          },
          axisLine: {
              show: false // 去除轴线
          }
      },
      yAxis: {
          type: "value",
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
              color: "#fff" // 文本颜色
          },
          axisLine: {
              show: false // 去除轴线
          },
          splitLine: {
              lineStyle: {
                  color: "#012f4a" // 分割线颜色
              }
          }
      },
      series: [
          {
              markLine: {
                  data: [{ type: 'average', name: 'Avg' }]
              },
              markPoint: {
                  data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                      ]
              },
              colorBy:'data',
              name: '销售金额',
              type: "line",
              // true 可以让我们的折线显示带有弧度
              smooth: true,
              data: line_data.y_data
          },
      ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
  myChart.setOption(option);
})();

// 气泡图
(function () {
    myChart = echarts.init(document.querySelector(".qipao .chart"));

    //数据
    var data = sca_data;
    // var img = "data:image/png;base64,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";
    //控制每行字符个数

    var xData = [],
        yData = [],
        Datas = [];
    data.map(function(a, b) {
        xData.push(a.name);
        yData.push(a.value);
        Datas.push([a.name, a.value])
        if (a.value === 0) {
            yData.push(a.value + min);
        } else {
            yData.push(a.value);
        }
        yData.push((Math.random(0,1) * 100).toFixed(0));
    });
    //找出最大值，判断缩放比
    let max = 0;
    let len = data.length;
    let scale = 1;
    for (let i = 0; i < len; i++) {
        if (data[i].value > max) {
            max = data[i].value;
        }
    }
    if (max > 0 && max < 100) {
        scale = 0.2;
    } else if (max > 100 && max < 500) {
        scale = 0.3;
    } else if (max > 500 && max < 1000) {
        scale = 0.5;
    } else if (max > 1000 && max < 5000) {
        scale = 1;
    } else if (max > 5000) {
        scale = 1.5;
    }
    console.log(scale)
    var option = {
        tooltip: {},
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'none',
            },
        ],
        grid: {
            left: '15%',
            bottom: '15%',
            top: '20%',
            width: '70%'
        },
        xAxis: {
            type: 'category',
            data: xData,
            splitLine: {
                show: false
            }, //去除网格线
            axisTick: {
                alignWithLabel: true,
            },
            axisLine: {
                lineStyle: {
                    color: '#4073b2',
                    width: 2,
                }
            },
            axisLabel: {
                // interval: 0,
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                },
                formatter: function(value) {
                    var ret = ""; //拼接加\n返回的类目项
                    var maxLength = 3; //每项显示文字个数
                    var valLength = value.length; //X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1) //如果类目项的文字大于3,
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = ""; //每次截取的字符串
                            var start = i * maxLength; //开始截取的位置
                            var end = start + maxLength; //结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    } else {
                        return value;
                    }
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '消费金额',
            nameTextStyle: {
                color: "#fff",
                fontSize: 14,
                margin: 2,
            },
            splitLine: {
                show: false
            }, //去除网格线
            axisLine: {
                lineStyle: {
                    // color: '#4073b2',
                    width: 2,
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            }
        },
        series: [{
            markLine: {
                  data: [{ type: 'average', name: 'Avg' }]
            },
            name: '',
            type: 'scatter',
            data: Datas,
            // symbol: `image://${img}`,
            symbol: 'roundRect',    // 旗袍格式
            colorBy: 'data',        // 按data给气泡颜色，每个颜色都不一样
            symbolSize: function(data) {
                // console.log('sadf1211221',data[1]);
                if (data[1] < 5) {
                    return Math.sqrt(data[1]) / 0.17;
                }
                return Math.sqrt(data[1]) / scale;
            },
            animationDurationUpdate: 8000,
            animationEasingUpdate: 8000,
            animationDelay: function(idx) {
                // 越往后的数据延迟越大
                return idx * 400;
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    // distance: 16,
                    formatter: function(params) {
                        return params.value[1]
                    },
                    color: '#fff',
                    fontSize: 14
                }

            }
        }]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    })
})();

// 滚动框
(function () {
    var MyMarhq = '';
    clearInterval(MyMarhq);
    $('.tbl-body tbody').empty();
    $('.tbl-header tbody').empty();
    var str = '';
    var Items = roll_data
    $.each(Items,function (i, item) {
        str = '<tr>'+
            '<td>'+item.order+'</td>'+
            '<td>'+item.vip_name+'</td>'+
            '<td>'+item.sale_num+'</td>'+
            '<td>'+item.price+'</td>'+
            '<td>'+item.sale_money+'</td>'+
            '</tr>'

        $('.tbl-body tbody').append(str);
        $('.tbl-header tbody').append(str);
    });

    if(Items.length > 1){   // 因为一共有四个框，如果大于四条数据就让他滚动显示
        // $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
        $('.tbl-body').css('top', '0');         //  将表格初始高度设置为 0
        var tblTop = 0;
        var speedhq = 50; // 数值越大越慢
        var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();
        function Marqueehq(){
            if(tblTop <= -outerHeight*Items.length){
                tblTop = 0;
            } else {
                tblTop -= 1;
            }
            $('.tbl-body').css('top', tblTop+'px');
        }

        MyMarhq = setInterval(Marqueehq,speedhq);

    // 鼠标移上去取消事件
    $(".tbl-header tbody").hover(function (){
        clearInterval(MyMarhq);
    },function (){
        clearInterval(MyMarhq);
        MyMarhq = setInterval(Marqueehq,speedhq);
    })

}
})();

// 地图
(function() {
    var myChart = echarts.init(document.querySelector('.map .chart'));
    var option = {
        title:{
            // text: '广东省地图',
            left: 'left',
            textStyle:{
                color: "#fff",
            },
        },
        series:[
            // 省份地图
            {
                colorBy:'data',
            // data:[{name: '广州市', selected: 'true'}],
                data : city_high,
                type: 'map',
                map: '广东',
                layoutCenter: ['50%', '30%'],//位置
                layoutSize: '50%',//大小
                roam: true,
                itemStyle: {
                    normal: {
                      // 地图省份的背景颜色
                      areaColor: "rgba(20, 41, 87,0.6)",
                      borderColor: "#195BB9",
                      borderWidth: 1
                    },
                    emphasis: {
                      areaColor: "#2B91B7",
                    }
                }

            }]
    };
    myChart.setOption(option);
})();

// 另一个饼图
(function() {
  var myChart = echarts.init(document.querySelector(".pie1 .chart"));
  var option = {
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   top: '5%',
  //   left: 'center'
  // },
  series: [
    {
      name: '销售金额',
      type: 'pie',
      radius: ['50', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: pie1_data
    }
  ]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();


// 词云
(function () {
    myChart = echarts.init(document.querySelector(' .wordcloud .chart'));

option = {
  tooltip: {
    show: true,
    // formatter: (params) => {
    //     const { name, value } = params;
    //     return `${name}:${value}`;
    // },
  },

  series: [
    {
      drawOutOfBound:true,      // 因为有些菜名太长，默认超出不显示，修改参数使他超出也显示
      colorBy: 'data',
      type: 'wordCloud',
      // size: ['9%', '99%'],
      sizeRange: [5, 30],
      // textRotation: [0, 45, 90, -45],
      rotationRange: [-45, 90],
      shape: 'circle',
      textPadding: 0,
      width: '100%',
      // 画布高
      height: '100%',
      autoSize: {
        enable: true,
        minSize: 10,
      },
      textStyle: {
        emphasis: {
          shadowBlur: 2,
          shadowColor: '#333',
        },
      },
      data:wordcloud_data
    },
  ],
};

    myChart.setOption(option);
    window.addEventListener('resize',function () {
        myChart.resize();
    })
})();


// 饼图
(function() {
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  var option = {
      tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //     bottom: '0%',
      //     itemWidth: 5,
      //     itemHeight: 2,
      //     color: "rgba(255,255,255,.5)",
      //     fontSize: "5",
      //     textStyle: {
      //         color: "#4c9bfd"
      //     },
      // },
      series: [
          {
              colorBy:'data',
              name: "销量占比",
              type: "pie",
              radius: ["10%", "90%"],
              center: ["50%", "50%"],
              roseType: "radius",
              // 图形的文字标签
              itemStyle: {
                borderRadius: 5
              },
              label: {
                  fontSize: 12,
              },
              // 链接图形和文字的线条
              labelLine: {
                  // length 链接图形的线条
                  length: 6,
                  // length2 链接文字的线条
                  length2: 8
              },
              data: pie_data
          }
      ]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();



