<template>
  <!-- 普通图片封装，避免滚动条消失bug -->
  <!--use: <HxNorImg :src="v.coverUrl" :fit="'fill'" :cssStyle="{width:'100%',height:'400px',opacity:'1'}"></HxNorImg> -->
  <img v-full :style="cssStyle" :class="fit" :src="src" @error="defImg" />
</template>

<script>
import errorImg from "../../assets/404_images/error.jpg";
export default {
  name: "HxNorImg",
  props: {
    fit: {
      type: String,
      default: "contain"
      // contain, fill,cover,scale-down,fit-none
    },
    src: {
      type: String,
      default: null
    },

    cssStyle: {
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "160px"
        };
      }
    }
  },
  methods: {
    defImg(event) {
      const img = event.srcElement;
      img.src = this.errorImg;
      img.onerror = null; // 防止闪图
    }
  },
  data() {
    return {
      errorImg
    };
  },
  computed: {}
};
</script>
<style>
</style>
