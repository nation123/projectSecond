<template>
  <el-dialog
    :title="data && data.id ? '编辑会员' : '添加会员'"
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
          label="会员姓名"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.name"
            placeholder="请输入会员姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input
            class="inline-input"
            style="width:500px;"
            maxlength="11"
            v-model="form.phone"
            placeholder="请输入手机号"
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
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
    };
  },
  watch: {
    data(v) {
      this.form = {
        id: v.id || null,
        name: v.name || "",

        phone: v.phone || ""
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
          _this.$api.r.member.patchMember(body).then(res => {
            _this.$message.success("更新会员成功");
            _this.mVisible = false;
            _this.$emit("onOk");
          });
        } else {
          _this.$api.r.member.postMember({ data }).then(res => {
            _this.$message.success("创建会员成功");
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
