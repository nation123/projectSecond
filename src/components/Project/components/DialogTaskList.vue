<template>
  <el-dialog :title="'项目阶段任务'" :visible.sync="mVisible" width="750px" top="20vh">
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.p.projectPhaseTask.getProject_phase_taskList"
      :fetch-argument="{params:{phaseId:this.phaseId}}"
    >
      <template slot="tableColumn">
        <el-table-column align="center" prop="taskName" label="任务名称"></el-table-column>
        <el-table-column align="center" prop="taskChargeUserName" label="负责人"></el-table-column>
        <el-table-column align="center" label="提交状态">
          <template slot-scope="{row}">
            <div>{{{0:'未提交',1:'提交中',2:'已通过',3:'已拒绝'}[row.executeState]}}</div>
          </template>
        </el-table-column>
      </template>
    </hx-table>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogTaskList",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    phaseId: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      keyTable: 0,
      params: {
        current: 1,
        size: 10,
      },
      formLabelWidth: "120px",
      rules: {},
    };
  },
  watch: {
    mVisible(v) {},
  },
  computed: {
    mVisible: {
      get() {
        return this.visible;
      },
      set(s) {
        this.$emit("update:visible", s);
      },
    },
    uploadUrl() {
      return upload;
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
</style>
