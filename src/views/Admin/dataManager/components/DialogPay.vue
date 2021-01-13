<template>
  <el-dialog
    title="充值"
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
          label="充值金额"
          type="number"
          :label-width="formLabelWidth"
          prop="chargeMoney"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.chargeMoney"
            placeholder="请输入充值金额"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="充值时间"
          :label-width="formLabelWidth"
          prop="chargeHour"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            type="number"
            v-model="form.chargeHour"
            placeholder="请输入充值时间"
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
        chargeHour: [
          { required: true, message: "请输入充值时间", trigger: "blur" }
        ],
        chargeMoney: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    data(v) {
      this.form = {
        memberId: v.id || null,
        chargeMoney: v.chargeMoney || "",
        chargeHour: v.chargeHour || ""
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
        if (form.memberId) {
          let body = {
            data: data
          };
          _this.$api.r.plt.postPltMember_recharge_record(body).then(res => {
            _this.$message.success("会员充值成功");
            _this.mVisible = false;
            _this.$emit("onOk");
          });
        } else {
          _this.$api.r.plt.postPltMember_recharge_record({ data }).then(res => {
            _this.$message.success("创建市场资源成功");
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
