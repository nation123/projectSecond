<template>
  <div class="aduit-admin">
    <!-- 审核 -->
    <!-- <AduitByAdmin
    v-if="data.id"
    :visible.sync="isShowAduit"
    :fetchFun="$api.t.certificate.getCertificateState"
    :fetchArgument="{id:data.id}"
    :data="data"
    :aduitTitle="'请审核该证书是否通过?'"
    ></AduitByAdmin>-->
    <el-dialog
      :title="title?title:'查看审核详情'"
      :visible.sync="mVisible"
      width="750px"
      top="10vh"
      style="height: 90vh;overflow-y: scroll;"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="auditIndex" label="审核节点"></el-table-column>
        <el-table-column align="center" prop="roleName" label="审核角色"></el-table-column>
        <el-table-column align="center" prop="auditorName" label="审核人员"></el-table-column>
        <el-table-column align="center" label="审核结果">
          <template slot-scope="{row}">
             <el-tag :type="{0:'',1:'warning',2:'success',3:'danger'}[row.state]">
                {{{0:'未申请',1:'审核中',2:'已通过',3:'已拒绝'}[row.state]}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="auditTime" label="审核时间"></el-table-column>
        <el-table-column align="center" prop="message" label="审核留言"></el-table-column>
        <el-table-column align="center" prop="message" label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="isNeedAduit(row) && row.state===1"
              @click="handleClick(row)"
              type="primary"
              size="mini"
            >审核</el-button>
            <el-button
              v-if="row.state===2"
              type="success"
              size="mini"
            >已通过</el-button>
            <el-button
              v-if="row.state===3"
              type="danger"
              size="mini"
            >已拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "_u/auth";
export default {
  name: "AuditStatusByAdmin",
  props: {
    data: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    fetchFun: {
      type: Function,
      default: false,
    },
    fetchArgument: {
      type: Object,
      default: {},
    },
    aduitFun: {
      type: Function,
      default: false,
    },

    aduitTitle: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      tableData: [],
      headers: {
        token: getToken(),
      },
    };
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
    roles() {
      return this.$store.getters.userInfo.roles;
    },
  },
  methods: {
    isNeedAduit(row) {
      let isTrue = 0;
      let currentAuditRoleId = this.data.currentAuditRoleId;

      this.roles.map((v) => {
        if (v.id === row.roleId && v.id === currentAuditRoleId) {
          isTrue++;
        }
      });
      return isTrue > 0;
    },
    handleClick(row) {
      let _this = this;
      this.$prompt("", `${_this.aduitTitle || "请审核该证书是否通过?"}`, {
        distinguishCancelAndClose: true,
        confirmButtonText: "拒绝",
        cancelButtonText: "同意",
        inputPlaceholder: "请输入理由",
        inputErrorMessage: "请输入拒绝理由",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        confirmButtonClass:'rejectBottom',
        cancelButtonClass:'passBottom',
        inputValidator: (value) => {
          // 点击按钮时，对文本框里面的值进行验证
        },
        callback: function (action, instance) {
          let value = instance.inputValue || "";
          let data = {};
          let id = _this.data.id;
          switch (action) {
            case "confirm":
              // 拒绝
              data.state = 3;
              data.message = value;
              break;
            case "cancel":
              // 同意
              data.state = 2;
              data.message = value || "同意";
              break;
            default:
              return false;
          }
          data.businessId = row.businessServiceId;
          data.nodeId = row.nodeId;
          _this.aduitFun({ id, data }).then((res) => {
            _this.$message({
              type: "success",
              message: "操作成功!",
            });
            _this.mVisible = false;
            _this.$emit('onOk');
            // _this.keyTable++;
          });
        },
      });
    },
    getData() {
      this.fetchFun(this.fetchArgument).then((res) => {
        this.tableData = res.data;
      });
    },
  },
  mounted() {
    console.log(this.data);
    this.getData();
  },
};
</script>

<style lang="scss">

   .rejectBottom{
      background: #F56C6C!important;
      color: #fff!important;
      border:none;
   }
   .passBottom{
      background: #409EFF!important;
      color: #fff!important;
      border:none;
   }


.baseUl {
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0;
  > li {
    font-size: 15px;
    border-top: 1px solid #ccc;
    color: #666;
    align-items: stretch;
    line-height: 25px;
    > p:nth-of-type(1) {
      width: 240px;
      padding: 12px 0;
      display: flex;
      margin: 0;
      justify-content: center;
      background: #dedede;
      align-items: center;
    }
    > p:nth-of-type(2) {
      padding: 12px 20px;
      flex: 1;
      margin: 0;
      height: auto;
      overflow: hidden;
      img {
        width: 90%;
        margin: 10px auto;
      }
    }
    > div {
      padding: 12px 20px;
      flex: 1;
      height: auto;
    }
  }
  > li:nth-of-type(1) {
    border-top: 0;
  }
}
</style>
