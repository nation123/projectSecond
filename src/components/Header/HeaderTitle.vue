<template>
  <!--headerTitle-->
  <div>
    <div class="btw bb  w100">
      <h3 class=" flex-1">{{title}}</h3>
      <slot name="rightContent"></slot>
    </div>
    <slot name="bodyContent"></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "HeaderTitle",
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  mounted: function () {},
  filters: {},
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
</style>