<template>
  <div class="center">
    <!-- 柱状图 -->
    <div
      :id="chartMes.id"
      :style="{ width: chartMes.width, height: chartMes.height }"
    ></div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {
    draw() {
      // 初始化echarts实例
      let _this = this;
      let con = _this.chartMes;
      let myChart = this.$echarts.init(document.getElementById(con.id));
      // 绘制图表
      var option = {
        //此处占用篇幅过大，先省略等下会进行解释

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        label: {
          color: "#ffffff"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          x: 100, //控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            type: "category",
            data: con.xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0, //强制文字产生间隔
              rotate: 45, //文字逆时针旋转45°
              textStyle: {
                //文字样式
                color: "#666",
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: con.name || "数量",
            type: con.type || "bar", //bar line
            barWidth: "60%",
            barWidth: 40,
            data: con.seriesData,
            smooth: true,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16
                  }
                },
                color: function(params) {
                  var colorList = con.colorList;
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
      myChart.on("click", function(params) {
        _this.$emit("handleClick", {
          data: params
        });
      });
    }
  },
  props: ["chartMes"],
  mounted: function() {
    this.draw();
  },
  filters: {}
};
</script>
<style lang="scss"></style>
