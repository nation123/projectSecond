<template>
  <el-dialog :title="'项目阶段文件'" :visible.sync="mVisible" width="750px" top="20vh">
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.p.projectFile.getProject_fileListPhase_id"
      :fetch-argument="{params:{phaseId:this.phaseId}}"
    >
      <template slot="tableColumn">
        <el-table-column align="center" prop="fileName" label="文件名称"></el-table-column>
        <el-table-column align="center" prop="content" label="内容"></el-table-column>
        <el-table-column align="center" label="查看">
          <template slot-scope="{row}">
            <a class="hover-blue fz-15 mb-10" title="点击预览" :href="row.fileUrl" v-full target="_blank">查看预览</a>
          </template>
        </el-table-column>
      </template>
    </hx-table>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogFIleList",
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
