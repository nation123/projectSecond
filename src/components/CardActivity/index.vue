<template>
  <div class="card-components">
    <el-card class="box-card" :style="cssStyle">
      <div slot="header" class="clearfix" v-if="data.title">
        <span class="card-title">{{data.title}}</span>
        <el-button
          class="card-more"
          type="text"
          @click="isMore.onClick"
          v-if="isMore"
        >{{isMore.text || '更多'}}</el-button>
      </div>
      <!-- 传入item显示单个静态效果 -->
      <div class="text item pt-10" @click="data.onClick(data.item)" v-if="data.item">
        <!-- <hx-img :style="imgStyle" :src="data.item.cover" alt /> -->
        <img 
        :style="imgStyle" 
        :src="urlAutoCompletion(data.item.cover)"
         :class="fit"
         @error="defImg"
         alt="">
        <p class="card-title">{{ data.item.title || data.item.name }}</p>
        <div class="btw" style="padding:0px;margin:0px;">
          <p class="card-desc">进行中</p>
          <p class="card-desc">{{data.item.trainTypeName}}</p>
          </div>
         <p class="card-desc">报名截止：2020-07-12  12：20</p>
         <p class="card-desc">活动时间：{{data.item.trainStartTime | formatSe}} 至 {{data.item.trainEndTime | formatSe}}</p>
         <p class="card-desc">活动地点：{{data.item.address}}</p>

        <slot name="item-other"></slot>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
import {urlAutoCompletion} from "_u/index";
import errorImg from "../../assets/404_images/error.jpg";
export default {
  name: "HxCardActivity",
  data() {
    return {
      urlAutoCompletion,
      errorImg
    };
  },
  computed: {},
  components: {},
  methods: {
     defImg(event) {
      let img = event.srcElement;
      img.src = this.errorImg;
      img.onerror = null; //防止闪图
    }
  },
  props: {
    fit: {
      type: String,
      default: "contain"
    },
    imgStyle: {
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "100px"
        };
      }
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          width: "360px",
          height: "320px"
        };
      }
    },
    isMore: {
      type: Object,
      default: () => {
        return null;
      }
    },
    data: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  mounted: function() {},
  filters: {}
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
.card-components {
  .card-title {
    font-size: 13px;
    color:black;
    font-weight: bold;
  }
  .card-more {
    float: right;
    padding: 3px 0;
  }
  .card-desc{
    font-size: 12px;
  }

}
</style>
