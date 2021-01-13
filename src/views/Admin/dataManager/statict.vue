<template>
  <div class="">
    <header-indicates title="充值统计">
      <div slot="titleRight" class="row align">
        <el-date-picker
          v-model="time"
          type="month"
          value-format="yyyy-MM"
          @change="keyTable++"
          placeholder="选择月"
        >
        </el-date-picker>
      </div>
      <div slot="headRight" class="align">
        <el-button type="warning" size="mini" @click="exportData">
          导出
        </el-button>
      </div>
    </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.plt.getPltMember_recharge_recordPage"
      :fetch-argument="{
        params: {
          time
        }
      }"
    >
      <template slot="tableColumn">
        <el-table-column
          align="center"
          prop="name"
          label="会员姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="chargeMoney"
          label="充值金额"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="chargeHour"
          label="充值时长"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="充值时间"
        ></el-table-column>
      </template>
    </hx-table>
    <DialogAddJobFair
      :data="data"
      :visible.sync="isShowAdd"
      @onOk="keyTable++"
    ></DialogAddJobFair>
  </div>
</template>

<script>
import DialogAddJobFair from "./components/DialogAddJobFair";
import { baseUrl } from "_u/config";
import axios from "axios";
import { getToken } from "_u/auth";
export default {
  components: { DialogAddJobFair },
  data() {
    return {
      data: {},
      time: this.getMonth(),
      content: "",
      isShowAdd: false,
      keyTable: 0
    };
  },
  computed: {},

  methods: {
    exportData() {
      let time = this.time;
      let token = getToken();
      let url = `${baseUrl}/plt/member_recharge_record/export?time=${time}&token=${token}`;
      window.open(url, "_blank");
    },
    getMonth() {
      let date = new Date();
      let y = date.getFullYear(); //获取完整的年份(4位)
      let m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m;
      }

      return y + "-" + m;
    },
    showAdd() {
      this.data = {};
      this.isShowAdd = true;
    },
    showEdit(row) {
      this.data = row;
      this.isShowAdd = true;
    },
    showUploadFile() {},
    httpRequest(param) {
      console.log(param);
      let _this = this;
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("file", fileObj); // 文件对象
      let url = baseUrl + "/market_resource/import";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: getToken(),
          "x-auth-token": getToken()
        }
      };
      axios
        .post(url, fd, config)
        .then(res => {
          if (res.data.code === 200) {
            _this.$message.success("上传数据成功");
            _this.dialogFormVisible = false;
            _this.keyTable++;
          }
        })
        .catch(err => {
          _this.$alert("上传数据失败", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log("上传失败");
            }
          });
        });
    },
    fileChange(file, fileList) {
      // this.dataList = fileList;
    },
    onSuccess(res) {
      let _this = this;
      _this.$message.success("上传数据成功");
      _this.dialogFormVisible = false;
      _this.keyTable++;
    },
    onError(res) {
      this.$alert("创建失败", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          console.log("上传失败");
        }
      });
    }
  },
  mounted() {
    this.getMonth();
  },
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
