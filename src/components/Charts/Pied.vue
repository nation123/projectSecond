<template>
  <div class="ml20 border">
    <!-- 圆环图 -->
    <div :id="id" :style="{ width: '350px', height: '200px' }"></div>
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
      let myChart = this.$echarts.init(document.getElementById(this.id));
      // 绘制图表
      let _this = this;
      var option = {
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        color: ["#00c0ef"],
        legend: {
          orient: "vertical",
          x: "left",
          data: [],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["70%", "85%"],
            avoidLabelOverlap: false,
            hoveranination: false,
            silent: true,
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function (argument) {
                  var html;
                  html = _this.number;
                  return html;
                },
                textStyle: {
                  fontSize: 40,
                  color: "#00c0ef",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [{ value: 335, name: "" }],
          },
        ],
      };
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    },
  },
  props: ["id", "number"],
  mounted: function () {
    this.draw();
  },
  filters: {},
};
</script>
<style lang="scss"></style>
