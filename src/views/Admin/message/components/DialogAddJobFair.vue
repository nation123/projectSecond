<template>
  <el-dialog
    :title="data && data.id ? '编辑消息' : '添加消息'"
    :visible.sync="mVisible"
    append-to-body
    width="750px"
    top="15vh"
  >
    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        style="width:80%;"
        class
      >
        <el-form-item
          label="消息标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.title"
            placeholder="请输入消息标题"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="消息正文"
          :label-width="formLabelWidth"
          prop="content"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            type="textarea"
            :rows="6"
            v-model="form.content"
            placeholder="请输入消息正文"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="mVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogAddJobFair",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {},
      rules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入消息正文", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    data(v) {
      this.form = {
        id: v.id || null,
        title: v.title || "",

        content: v.content || ""
      };
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    mVisible(v) {}
  },
  computed: {
    mVisible: {
      get() {
        return this.visible;
      },
      set(s) {
        this.$emit("update:visible", s);
      }
    },
    uploadUrl() {
      return upload;
    }
  },
  methods: {
    handleSubmit() {
      let _this = this;
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        let form = this.form;
        let data = {
          ...form
        };
        if (form.id) {
          let body = {
            id: form.id,
            data: data
          };
          _this.$api.r.plt.patchPltNotice(body).then(res => {
            _this.$message.success("更新消息成功");
            _this.mVisible = false;
            _this.$emit("onOk");
          });
        } else {
          _this.$api.r.plt.postPltNotice({ data }).then(res => {
            _this.$message.success("创建消息成功");
            _this.mVisible = false;
            _this.$emit("onOk");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
