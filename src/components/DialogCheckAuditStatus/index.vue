<template>
  <div>
    <!-- 查看审核详情 -->
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
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "_u/auth";
export default {
  name: "DialogCheckAuditStatus",
  props: {
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
  },
  methods: {
    getData() {
      this.fetchFun(this.fetchArgument).then((res) => {
        this.tableData = res.data;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
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
