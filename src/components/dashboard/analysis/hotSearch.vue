<template>
  <div class="main">
    <div class="hot-search">
      <p style="margin: 0 0 10px 0;">线上热门搜索</p>
      <div class="hot_box">
        <div class="charts-content">
          <div class="charts_one">
            <p class="charts_tit">搜索用户数</p>
            <div class="item_content">
              <div class="market_echarts">
                <div class="hot_content" ref="hot_content"></div>
              </div>
            </div>
          </div>
          <div class="charts_two">
            <p class="charts_tit">人均搜索次数</p>
            <div class="item_content">
              <div class="market_echarts">
                <div class="sales_content" ref="sales_content"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="ranking-title">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="ranking" label="排名" width="180">
            </el-table-column>
            <el-table-column prop="searchName" label="搜索关键词" width="180">
            </el-table-column>
            <el-table-column prop="userNum" label="用户数"> </el-table-column>
            <el-table-column prop="gains" label="周涨幅"> </el-table-column>
          </el-table>
        </div>
        <div class="pagina-box" v-show="pagelist.total > 10">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="pagelist.currentPage"
            :page-size="pagelist.pageSize"
            background
            layout="prev, pager, next,jumper"
            v-show="pagelist.total > 10"
            :total="pagelist.total"
          >
          </el-pagination>
          <!-- <el-button class="jumper" type="primary" size="small">跳转</el-button> -->
        </div>
      </div>
    </div>
    <div class="salse-account">
      <div class="sales-top">
        <p>销售额类别占比</p>
        <div class="switch_btns">
          <el-button plain @click="switchEcharts(1)">全部渠道</el-button>
          <el-button plain @click="switchEcharts(2)">线上</el-button>
          <el-button plain @click="switchEcharts(3)">门店</el-button>
        </div>
      </div>
      <div class="sales-charts">
        <p class="sales_tit">销售额</p>
        <div class="item_content">
          <div class="market_echarts">
            <div class="accout_content" ref="accout_content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "hotSearch",
  data() {
    return {
      tableData: [
        {
          ranking: "2016-05-02",
          searchName: "王小虎",
          userNum: "1518",
          gains: "49%"
        },
        {
          ranking: "2016-05-04",
          searchName: "王小虎",
          userNum: "1517",
          gains: "20%"
        },
        {
          ranking: "2016-05-01",
          searchName: "王小虎",
          userNum: "1519",
          gains: "44%"
        },
        {
          ranking: "2016-05-03",
          searchName: "王小虎",
          userNum: "1516",
          gains: "35%"
        },
        {
          ranking: "2016-05-03",
          searchName: "王小",
          userNum: "1516",
          gains: "35%"
        },
        {
          ranking: "2016-05-03",
          searchName: "王虎",
          userNum: "1516",
          gains: "35%"
        }
      ],
      pagelist: {
        total: 15,
        currentPage: 1,
        pageSize: 4
      },
      allChannel: {
        getvalue: [40, 85, 60, 75, 30],
        getrate: [3440, 7800, 5300, 6500, 2200]
      },
      onlineData: {
        getvalue: [20, 65, 30, 45, 70],
        getrate: [1440, 6800, 2300, 4500, 7200]
      },
      storesData: {
        getvalue: [50, 85, 30, 45, 10],
        getrate: [5440, 8800, 3300, 5500, 1200]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getHotData();
      this.getpiechartData(this.allChannel.getvalue, this.allChannel.getrate);
    });
  },
  methods: {
    getHotData() {
      let hot_content = echarts.init(this.$refs.hot_content);
      let sales_content = echarts.init(this.$refs.sales_content);
      let option = {
        // width: "100%",
        grid: {
          left: "-10%",
          right: "0%",
          bottom: "0%",
          top: "0%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: [
            "0:00",
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:00",
            "7:00",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00"
          ]
        },
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            type: "line",
            smooth: true, //是否平滑曲线显示
            showSymbol: false,
            data: [
              0,
              35,
              62,
              55,
              97,
              64,
              44,
              66,
              78,
              82,
              33,
              20,
              30,
              35,
              62,
              55,
              97,
              64,
              44,
              66,
              78,
              82,
              33,
              20,
              0
            ],
            itemStyle: {
              color: "#38a7f0",
              // borderColor: '#f1f1f1',
              borderWidth: 1
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#d1e9ff"
                    },
                    {
                      offset: 0.6,
                      color: "#d1e9ff"
                    },
                    {
                      offset: 0.8,
                      color: "#d1e9ff"
                    }
                  ],
                  false
                ),
                shadowColor: "#d1e9ff",
                shadowBlur: 6
              }
            }
          }
        ]
      };

      hot_content.setOption(option);
      sales_content.setOption(option);
    },
    getpiechartData(getvalue, getrate) {
      let accout_content = echarts.init(this.$refs.accout_content);
      //职称结构取数
      let getname = ["小说", "教材", "期刊", "动漫", "其他"];
      var getvalue = getvalue;
      var getrate = getrate;
      var data = [];
      for (var i = 0; i < getname.length; i++) {
        data.push({
          name: getname[i],
          value: getvalue[i],
          rate: getrate[i]
        });
      }
      var colorList = ["#503EFF", "#3E82FF", "#8BF39A", "#00FCFD", "#f2637b"];
      //职称结构图表
      let option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // selectedMode: false, // 取消图例上的点击事件
          type: "plain",
          icon: "circle",
          orient: "vertical",
          left: "55%",
          top: "30%",
          align: "left",
          itemGap: 15,
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          symbolKeepAspect: false,
          textStyle: {
            color: "#000",
            rich: {
              name: {
                verticalAlign: "right",
                align: "left",
                width: 35,
                fontSize: 12
              },
              value: {
                align: "left",
                width: 60,
                fontSize: 12
              },
              count: {
                align: "left",
                width: 80,
                fontSize: 12
              }
            }
          },
          data: data.map(item => item.name),
          formatter: function(name) {
            if (data && data.length) {
              for (var i = 0; i < data.length; i++) {
                if (name === data[i].name) {
                  let rateIcon = "￥";
                  return (
                    "{name| " +
                    name +
                    "}  " +
                    "{value| " +
                    data[i].value +
                    "%}" +
                    rateIcon +
                    Math.abs(data[i].rate)
                  );
                }
              }
            }
          }
        },
        series: [
          {
            // tooltip: {
            //   trigger: "item",
            //   formatter: function(params) {
            //     return (
            //       params.name +
            //       "：" +
            //       params.value +
            //       "册<br>占比：" +
            //       params.percent.toFixed(2) +
            //       "%"
            //     );
            //   }
            // },
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 5,
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            type: "pie",
            radius: ["30%", "50%"],
            center: ["30%", "50%"],
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: params => {
                  return params.name + ":" + params.value + "%";
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12"
                }
              }
            },
            data: data
          }
        ]
      };
      accout_content.setOption(option);
    },
    switchEcharts(num) {
      if (num == 1) {
        this.getpiechartData(this.allChannel.getvalue, this.allChannel.getrate);
      } else if (num == 2) {
        this.getpiechartData(this.onlineData.getvalue, this.onlineData.getrate);
      } else {
        this.getpiechartData(this.storesData.getvalue, this.storesData.getrate);
      }
    },
    // 换页
    handlePageChange(val) {
      let that = this;
      //   that.getShareData(params);
      that.pagelist.currentPage = val;
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
}
.hot-search {
  width: 50%;
  background: #fff;
  padding: 20px;
  margin: 20px 0;
}
.charts_one,
.charts_two {
  width: 49%;
}
.charts_two {
  margin-left: 20px;
}
.hot_box {
  border-top: 1px solid #ccc;
  .charts-content {
    display: flex;
    flex-direction: row;
    .item_content {
      height: 80px;
      width: 100%;
      .market_echarts {
        height: 100%;
        width: 100%;
        .hot_content,
        .sales_content {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
.pagina-box {
  margin: 20px 0 0 0;
}
.salse-account {
  width: 49%;
  background: #fff;
  margin-left: 20px;
  margin-top: 20px;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .sales-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .sales-charts {
    .item_content {
      height: 446px;
      width: 100%;
      .market_echarts {
        height: 100%;
        width: 100%;
        .accout_content {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
