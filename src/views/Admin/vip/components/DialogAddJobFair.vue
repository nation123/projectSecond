<template>
  <el-dialog
    title="更新音频"
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
        <el-form-item label="上传音频" :label-width="formLabelWidth" prop="url">
          <UploadImg
            @success="success"
            :FileList="form.url"
            :options="{
              className: 'upload-demo',
              text: '点击上传',
              listType: 'file',
              limit: 1
            }"
            @remove="remove"
          ></UploadImg>
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
      form: {
        url: ""
      },
      rules: {
        url: [{ required: true, message: "请上传音频文件", trigger: "change" }]
      }
    };
  },
  watch: {
    data(v) {
      this.form = {
        id: v.id || null,
        url: v.url || "",
        type: v.type || 1
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
    success(e) {
      this.form.url = e.data[0].uploadUrl;
    },
    remove() {
      this.form.url = "";
    },
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

        let body = {
          id: form.id,
          data: data
        };

        _this.$api.r.plt.patchPltMedia(body).then(res => {
          _this.$message.success("更新音频成功");
          _this.mVisible = false;
          _this.$emit("onOk");
        });
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
