<template>
  <div class="">
    <header-indicates
      title="消息管理"
      :btn-option="{ text: '添加', onClick: showAdd }"
    >
    </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.plt.getPltNoticePage"
      :fetch-argument="{}"
    >
      <template slot="tableColumn">
        <el-table-column
          align="center"
          label="标题"
          prop="title"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="content"
          label="正文"
        ></el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="{ row }">
            <div class="center">
              <el-button type="primary" size="mini" @click="showEdit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-delete="{
                  name: row.title,
                  fetchFun: $api.r.plt.deletePltNotice,
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
  </div>
</template>

<script>
import DialogAddJobFair from "./components/DialogAddJobFair";
export default {
  components: { DialogAddJobFair },
  data() {
    return {
      data: {},
      mediaUrl: "",
      isShowAdd: false,
      keyTable: 0,
      keyAudio: 3000
    };
  },
  computed: {},

  methods: {
    listen(row) {
      if (row.url) {
        this.keyAudio++;
        this.mediaUrl = row.url;
      } else {
        this.$message.error("音频播放失败，请确认您已上传音频");
      }
    },
    showAdd() {
      this.data = {};
      this.isShowAdd = true;
    },
    showEdit(row) {
      this.data = row;
      this.isShowAdd = true;
    }
  },
  mounted() {},
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
