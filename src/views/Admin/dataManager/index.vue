<template>
  <div class="">
    <header-indicates
      title="会员管理"
      :btn-option="{ text: '添加', onClick: showAdd }"
    >
      <div slot="titleRight" class="row align">
        <el-input
          style="width:300px"
          placeholder="输入姓名或手机号进行搜索"
          v-model="content"
          @input="keyTable++"
          clearable
        ></el-input>
      </div>
      <div slot="headRight" class="align">
        <el-button v-router="{ name: 'statict' }" type="success" size="mini">
          充值统计
        </el-button>
      </div>
    </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.member.getMemberPage"
      :fetch-argument="{
        params: {
          content
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
          prop="remainHours"
          label="剩余时间(小时)"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
        ></el-table-column>

        <el-table-column align="center" prop="" width="220" label="操作">
          <template slot-scope="{ row }">
            <div>
              <el-button type="primary" size="mini" @click="showEdit(row)"
                >编辑</el-button
              >
              <el-button type="warning" size="mini" @click="pay(row)"
                >充值</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-delete="{
                  name: row.name,
                  fetchFun: $api.r.member.deleteMember,
                  fetchArgument: { id: row.id },
                  cb: () => keyTable++
                }"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </hx-table>
    <DialogAddJobFair
      :data="data"
      :visible.sync="isShowAdd"
      @onOk="keyTable++"
    ></DialogAddJobFair>
    <DialogPay
      :data="data"
      :visible.sync="isShowPay"
      @onOk="keyTable++"
    ></DialogPay>
  </div>
</template>

<script>
import DialogAddJobFair from "./components/DialogAddJobFair";
import DialogPay from "./components/DialogPay";
export default {
  components: { DialogAddJobFair, DialogPay },
  data() {
    return {
      data: {},
      content: "",
      isShowAdd: false,
      isShowPay: false,
      keyTable: 0
    };
  },
  computed: {},

  methods: {
    showAdd() {
      this.data = {};
      this.isShowAdd = true;
    },
    showEdit(row) {
      this.data = row;
      this.isShowAdd = true;
    },
    pay(row) {
      this.data = row;
      this.isShowPay = true;
    }
  },
  mounted() {},
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
