<template>
  <div class="center">
    <!-- 层叠曲线图 -->
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
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: con.legendData,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: con.xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: con.seriesData,
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = con.colorList;
              return colorList[params.dataIndex];
            },
          },
        },
      };
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    },
  },
  props: ["chartMes"],
  mounted: function () {
    this.draw();
  },
  filters: {},
};
</script>
<style lang='scss'>
</style>
