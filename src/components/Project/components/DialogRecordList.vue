<template>
  <el-dialog :title="'项目阶段工作记录'" :visible.sync="mVisible" width="900px" top="20vh">
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.p.projectMemberRecord.getProject_member_recordListPhase_id "
      :fetch-argument="{params:{phaseId:this.phaseId}}"
    >
      <template slot="tableColumn">
        <el-table-column align="center" prop="username" label="成员"></el-table-column>
        <el-table-column align="center" prop="title" label="工作记录"></el-table-column>
        <el-table-column align="center" prop="content" label="工作内容"></el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="{row}">
            <div>{{row.createTime | formatSe}}</div>
          </template>
        </el-table-column>
      </template>
    </hx-table>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogRecordList",
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
