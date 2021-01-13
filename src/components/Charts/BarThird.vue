<template>
  <div class="center">
    <!-- 三维度的柱状图 -->
    <div :id="chartMes.id" :style="{width: chartMes.width, height: chartMes.height}"></div>
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          // 控制图的大小，调整下面这些值就可以，
          x: 50, //控制x轴文字与底部的距离
          y2: 100 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        color: con.legendColor,
        legend: {
          data: con.legendData,
          color: "skyblue"
        },
        xAxis: [
          {
            type: "category",
            data: con.xAxisData,
            axisPointer: {
              type: "shadow"
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
        yAxis: con.yAxis,
        series: con.seriesData
      };
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    }
  },
  props: ["chartMes"],
  mounted: function() {
    this.draw();
  },
  filters: {}
};
</script>
<style lang='scss'>
</style>
