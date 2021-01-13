<template>
  <div class="center">
    <!-- 饼状图 -->
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
      let con = this.chartMes;

      let myChart = this.$echarts.init(document.getElementById(con.id));
      // 绘制图表

      var option = {
        title: {
          text: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          //  show: false,
          data: con.xAxisData
        },
        series: [
          {
            name: con.name || "金额",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
              normal: {
                // position: "inner",
                // show: false
              }
            },
            data: con.seriesData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)"
                },
                labelLine: { show: true },
                color: function(params) {
                  let colorList = con.colorList;
                  // console.log(colorList)
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
    }
  },

  props: ["id", "chartMes"],
  mounted: function() {
    this.draw();
  },
  filters: {}
};
</script>
<style lang="scss"></style>
