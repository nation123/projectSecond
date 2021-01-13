<template>
  <!--楼层顶部组件-->
  <div class="mb-10 head-bg p-10" style="border-radius:8px;">
    <div class="btw align">
      <div class="row align">
        <slot name="headLeft"></slot>
        <span @click="back" style="color:#fff">{{headerMessage[0]}}</span>
        <slot name="headLeftRight"></slot>
      </div>
      <div class="row">
        <slot name="headRight"></slot>
        <el-button
          v-if="headerMessage[1] && visibleRight"
          size="mini"
          icon="el-icon-plus"
          round
          @click="toAdd"
        >{{headerMessage[1]}}</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name:'HeaderNav',
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {
    toAdd() {
      this.$emit("toAdd");
    },
    back() {
      this.$emit("back");
    }
  },
  props: {
    headerMessage: {
      type: Array,
      default: []
    },
    visibleRight: {
      type: Boolean,
      default: true
    }
  },
  mounted: function() {},
  filters: {}
};
</script>
<style lang='scss'>
.head-bg{
background: linear-gradient(
 90deg,
 #409EFF 0%,
 #409EFF 0%,
 #409EFF 100%,
 #409EFF 100%
 );
}
</style>
