<template>
  <!--审核状态Tag-->
  <div>
    <el-tag
      :type="{0:'text',1:'primary',2:'success',3:'danger'}[auditStatus]"
      @click="handleTag(auditStatus)"
    >{{{0:'未申请',1:'申请中',2:'已通过',3:'已拒绝'}[auditStatus] || '无'}}</el-tag>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "AuditTag",
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {
    handleTag(auditStatus) {
      this.$emit("clickTag", {
        status: auditStatus,
      });
    },
  },
  props: {
    auditStatus: {
      type: Number,
      default: 1,
    },
  },
  mounted: function () {},
  filters: {},
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
</style>