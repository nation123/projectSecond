<template>
  <el-dialog :title="title?title:'审核详情'" :visible.sync="mVisible" width="750px" top="10vh">
    <el-form :model="form" :rules="rules" ref="ruleForm" style="width:90%;" class>
      <el-form-item label="审核理由" :label-width="formLabelWidth" prop="message">
        <el-input
          type="textarea"
          v-model="form.name"
          :rows="5"
          placeholder="请输入审核理由,通过可不填，拒绝必须填写"
          style="width:550px;"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleSubmit(3)" type="danger">拒 绝</el-button>
      <el-button type="primary" @click="handleSubmit(2)" v-loading="loading">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogAudit",
  props: {
    title: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    fetchFun: {
      type: Function,
      default: false,
    },
    data:{
      type: Object,
      default: () => {
        return {};
      },
    },
    fetchArgument: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      formLabelWidth: "100px",
      form: {},
      rules: {
        message: [
          { required: true, message: "请输入佐证名称", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    mVisible(v) {
      if (v) {
        this.keyImg++;
        this.form = {
          name: "",
          uploadUrl: "",
        };
      }
    },
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
  },
  methods: {
    handleSubmit(type) {
      let data = {
        businessId: 0,
        message: this.form.message || "",
        nodeId: 0,
        state: type,
      };
      if (type === 3) {
        // 拒绝
        this.$refs["ruleForm"].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.fetchFun(this.fetchArgument).then((res) => {
            this.$emit("onOk", {
              data: this.form,
            });
          });
        });
      } else if (type === 2) {
        // 通过
        this.fetchFun(this.fetchArgument).then((res) => {
          this.$emit("onOk", {
            data: this.form,
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
