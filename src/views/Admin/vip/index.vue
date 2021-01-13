<template>
  <div class="">
    <header-indicates title="音频管理"> </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.plt.getPltMediaPage"
      :fetch-argument="{}"
    >
      <template slot="tableColumn">
        <el-table-column align="center" label="音频类型">
          <template slot-scope="{ row }">
            <div>
              {{ { 1: "测试音频", 2: "正式音频" }[row.type] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="deviceCode" label="是否上传">
          <template slot-scope="{ row }">
            <div v-if="row.url">
              <el-button type="primary" size="mini">已上传</el-button>
            </div>
            <div v-else>
              <el-button type="danger" size="mini">未上传</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
        ></el-table-column>

        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="{ row }">
            <div class="center">
              <el-button type="success" size="mini" @click="listen(row)"
                >试听</el-button
              >
              <el-button type="primary" size="mini" @click="showEdit(row)"
                >更新</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </hx-table>
    <audio
      style="display: none"
      v-if="mediaUrl"
      :key="keyAudio"
      :src="mediaUrl"
      autoplay
      controls="controls"
    >
      Your browser does not support the audio element.
    </audio>
    <DialogAddJobFair
      :data="data"
      :visible.sync="isShowAdd"
      @onOk="keyTable++"
    ></DialogAddJobFair>
  </div>
</template>

<script>
import DialogAddJobFair from "./components/DialogAddJobFair";
import { urlAutoCompletion } from "_u";
export default {
  components: { DialogAddJobFair },
  data() {
    return {
      urlAutoCompletion,
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
        this.mediaUrl = urlAutoCompletion(row.url);
      } else {
        this.$message.error("音频播放失败，请确认您已上传音频");
      }
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
