<template>
  <div class="main">
    <div class="top-box">
      <div class="top_sales">
        <div class="sales_forehead">
          <span class="forehead_text">总销售额</span>
          <i class="el-icon-warning-outline"></i>
        </div>
        <div class="sales_money">¥ <span>126,560</span></div>
        <div class="sales_proportion">
          <div class="proportion_left">
            周同比 <span>12%</span>
            <p class="triangle_red"></p>
          </div>
          <div class="proportion_right">
            日同比 <span>11%</span>
            <p class="triangle_green"></p>
          </div>
        </div>
        <div class="day_pro">
          日销售额
          <p class="day_text">￥<span>12,423</span></p>
        </div>
      </div>
      <div class="top_access">
        <div class="sales_forehead">
          <span class="forehead_text">访问量</span>
          <i class="el-icon-warning-outline"></i>
        </div>
        <div class="sales_money">¥ <span>88,46</span></div>
        <div class="item_content">
          <div class="access_echarts">
            <div class="trend_content" ref="trend_content"></div>
          </div>
        </div>

        <div class="day_pro">
          日访问量
          <p class="day_text">￥<span>1,234</span></p>
        </div>
      </div>
      <div class="top_pay">
        <div class="sales_forehead">
          <span class="forehead_text">支付笔数</span>
          <i class="el-icon-warning-outline"></i>
        </div>
        <div class="sales_money">¥ <span>65,60</span></div>
        <div class="item_content">
          <div class="pay_echarts">
            <div class="pay_content" ref="pay_content"></div>
          </div>
        </div>

        <div class="day_pro">
          转化率
          <p class="day_text"><span>60%</span></p>
        </div>
      </div>
      <div class="top_effect">
        <div class="sales_forehead">
          <span class="forehead_text">运营活动效果</span>
          <i class="el-icon-warning-outline"></i>
        </div>
        <div class="sales_money">78%</div>
        <div class="item_content">
          <div class="effect_echarts">
            <div class="effect_content" ref="effect_content"></div>
          </div>
        </div>
        <div class="sales_proportion effect">
          <div class="proportion_left">
            周同比 <span>12%</span>
            <p class="triangle_red"></p>
          </div>
          <div class="proportion_right">
            日同比 <span>11%</span>
            <p class="triangle_green"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="market-visit">
      <div class="market_top">
        <div class="market_top_left">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="销售额" name="first">
              <div class="item_content">
                <div class="market_echarts">
                  <div class="market_content" ref="market_content"></div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="访问量" name="second">
              <div class="item_content">
                <div class="visit_echarts">
                  <div class="visit_content" ref="visit_content"></div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="market_top_right">
          <ul class="right_date">
            <ol>
              今日
            </ol>
            <ol>
              本周
            </ol>
            <ol>
              本月
            </ol>
            <ol>
              全年
            </ol>
            <ol>
              <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </ol>
          </ul>
          <div class="ranking_visit">
            <p>门店访问量排名</p>
            <div
              class="store_des"
              v-for="(item, index) in visitData"
              :key="index"
            >
              <div class="des_left">
                <p :class="['left_index', `${index}` < 3 ? 'firstNum' : '']">
                  {{ index + 1 }}
                </p>
                <p class="left_name">工专路{{ index }}号店</p>
              </div>
              <div class="des_right">{{ item.des_right }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HotSearch></HotSearch>
  </div>
</template>
<script>
import echarts from "echarts";
import HotSearch from "@/components/dashboard/analysis/hotSearch";
export default {
  name: "analysis",
  components: { HotSearch },
  data() {
    return {
      activeName: "second",
      timer: null,
      value: "",
      market_content: null,
      visit_content: null,
      visitData: [
        {
          des_right: "323,234"
        },
        {
          des_right: "323,134"
        },
        {
          des_right: "423,234"
        },
        {
          des_right: "363,234"
        },
        {
          des_right: "373,284"
        },
        {
          des_right: "263,135"
        }
      ]
    };
  },
  //   created() {
  //     window.chartResize = () => {
  //       this.market_content.resize();
  //       this.visit_content.resize();
  //     };
  //     window.addEventListener("resize", chartResize);
  //     this.getMarketData();
  //     this.getVisitData();
  //   },
  mounted() {
    this.windowResize();
    this.getAccessData();
    this.getMarketData();
    this.getVisitData();
    this.$nextTick(() => {
      this.getPayData();
      this.getEffectData();
      this.getMarketData();
      this.getVisitData();
    });
    // window.addEventListener("resize", function () {
    //   this.getMarketData().resize();
    //   this.getVisitData().resize();
    // });
  },
  methods: {
    chartResize() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getMarketData.resize();
        this.getVisitData.resize();
      }, 500);
    },
    windowResize() {
      window.addEventListener("resize", this.chartResize);
      this.$on("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.chartResize);
      });
    },
    getAccessData() {
      let trend_content = echarts.init(this.$refs.trend_content);
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
              color: "#975fe4",
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
                      color: "#975fe4"
                    },
                    {
                      offset: 0.6,
                      color: "#975fe4"
                    },
                    {
                      offset: 0.8,
                      color: "#975fe4"
                    }
                  ],
                  false
                ),
                shadowColor: "#975fe4",
                shadowBlur: 6
              }
            }
          }
        ]
      };

      trend_content.setOption(option);
    },
    getPayData() {
      let pay_content = echarts.init(this.$refs.pay_content);
      let option = {
        // width: "100%",

        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "-15%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
          height: "100%"
        },
        xAxis: [
          {
            show: false,
            type: "category",
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
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
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
            ]
          }
        ]
      };
      pay_content.setOption(option);
    },
    getEffectData() {
      let effect_content = echarts.init(this.$refs.effect_content);
      let option = {
        dataset: {
          source: [
            ["score", "amount", "product"],
            [89.3, 58212, "Matcha Latte"]
          ]
        },
        grid: {
          left: "-30%",
          //   bottom: "0%",
          containLabel: true
        },
        xAxis: {
          show: false,
          name: "amount"
        },
        yAxis: {
          show: false,
          type: "category"
        },
        color: "#13c2c2",
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product"
            },
            barWidth: 27
          }
        ]
      };

      effect_content.setOption(option);
    },
    handleClick(tab, event) {
      console.log(tab, "event");
      this.windowResize();
      //   this.getMarketData();
      //   this.getVisitData();
    },
    getMarketData() {
      this.market_content = echarts.init(this.$refs.market_content);
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisLine: {
              lineStyle: {
                color: "#bfbfbf",
                type: "solid"
              }
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: "#bfbfbf",
                type: "solid"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#bbbbbb",
              textStyle: {
                fontSize: 14
              }
            }
          }
        ],
        yAxis: [
          {
            name: "销售趋势",
            // nameLocation: "end",
            nameTextStyle: {
              align: "right"
            },
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220, 100, 60, 80, 150, 170]
          }
        ]
      };

      this.market_content.setOption(option);
    },
    getVisitData() {
      console.log("111111111tab");
      this.visit_content = echarts.init(this.$refs.visit_content);
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisLine: {
              lineStyle: {
                color: "#bfbfbf",
                type: "solid"
              }
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: "#bfbfbf",
                type: "solid"
              }
            },
            axisLabel: {
              margin: 10,
              color: "#bbbbbb",
              textStyle: {
                fontSize: 14
              }
            }
          }
        ],
        yAxis: [
          {
            name: "访问量趋势",
            // nameLocation: "end",
            nameTextStyle: {
              align: "right"
            },
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [70, 66, 160, 204, 300, 330, 250, 170, 30, 70, 160, 190]
          }
        ]
      };

      this.visit_content.setOption(option);
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  .top-box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .top_sales,
  .top_access,
  .top_pay,
  .top_effect {
    display: inline-block;
    width: 23%;
    background: #fff;
    padding: 20px;
    .sales_forehead {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .sales_money {
      font-size: 30px;
      margin: 10px 0;
    }
    .sales_proportion {
      display: flex;
      flex-direction: row;
      align-items: center;
      .proportion_left {
        .triangle_red {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent red transparent;
          vertical-align: middle;
        }
      }
      .proportion_right {
        margin-left: 20px;
        .triangle_green {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 5px;
          border-style: solid;
          border-color: green transparent transparent transparent;
          vertical-align: middle;
        }
      }
    }
    .day_pro {
      border-top: 1px solid #ccc;
      padding-top: 12px;
      .day_text {
        display: inline-block;
        margin: 0;
      }
    }
  }
  .top_access,
  .top_pay,
  .top_effect {
    margin-left: 20px;
    .effect {
      border-top: 1px solid #ccc;
      padding-top: 4px;
      margin-top: 5px;
    }
  }
  .top_effect {
    padding: 15px 15px 5px 15px;
  }
  .item_content {
    height: 44px;
    width: 100%;
    .access_echarts,
    .pay_echarts,
    .effect_echarts,
    .market_echarts,
    .visit_echarts {
      height: 100%;
      width: 100%;
      position: relative;
      .trend_content,
      .pay_content,
      .effect_content,
      .market_content,
      .visit_content {
        height: 100%;
        width: 100%;
      }
      .market_content,
      .visit_content {
        width: 1150px;
        height: 300px;
      }
    }
  }
  .market-visit {
    background: #fff;
    margin-top: 20px;
    padding: 10px 0;
    .el-tabs {
      margin-left: 20px;
      .el-tabs__nav {
        margin-left: 20px;
      }
    }
    .item_content {
      height: 300px;
      width: 70%;
    }
  }
  .market_top_right {
    position: relative;
    .right_date {
      position: absolute;
      right: 10px;
      top: -376px;
      display: flex;
      flex-direction: row;
      align-items: center;
      ol {
        padding-left: 10px;
      }
    }
    .ranking_visit {
      position: absolute;
      right: 30px;
      top: -292px;
      width: 210px;
      .store_des {
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .des_left {
          display: flex;
          flex-direction: row;
          align-items: center;
          .left_index {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            color: #000;
            margin-right: 10px;
            &.firstNum {
              color: #fff;
              background: #314659;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>
