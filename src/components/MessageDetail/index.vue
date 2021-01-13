<template>
  <!--详情信息-->
  <div>
    <div class="btw lh-24">
      <h3>{{ title }}</h3>
    </div>
    <div class="dec-contact">
      <div class="wrap mv-16">
        <span v-for="(v, i) in list" :key="i">
          {{ v.label }}：{{ v.value }}
        </span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "MessageDetail",
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {},
  props: {
    title: {
      type: String,
      default: "详情",
    },
    list: {
      type: Array,
      default: () => {},
    },
  },
  mounted: function () {},
  filters: {},
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
.dec-contact {
  > div {
    > span {
      flex: 0 0 32%;
      line-height: 25px;
      margin-bottom: 15px;
      margin-right: 1.3%;
    }
    .dec-time {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
    }
  }
  .border-not-last:not(:last-of-type) {
    border-bottom: 1px solid #dfdfdf;
  }
}
</style>