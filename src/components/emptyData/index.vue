<template>
  <div class="zwsj">
    <!--调用<ecs-nodata v-if="list[0].title==''" :icon="require('@/assets/images/搜索@2x.png')" text="暂无维修产品"></ecs-nodata> -->
    <hx-img v-if="icon" :src="icon" :width="imgW" :height="imgH" />
    <div class="center" style="color: #999;font-size: 16px;margin-top: 5px;min-height: 50px;">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
  props: {
    icon: {},
    text: {
      default: "暂无数据"
    },
    imgW: {
      default: "175px"
    },
    imgH: {
      default: "95px"
    }
  }
};
</script>

<style scoped>
.zwsj {
  padding: 120px 0;
  text-align: center;
}
</style>

