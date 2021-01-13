<template>
  <!--案例正文-->
  <div class>
    <el-dialog
      title="报名申请"
      :visible.sync="mVisible"
      width="500px"
      top="30vh"
      style="height: 90vh;overflow-y: scroll;"
    >
      <!--pdf -->
      <div>
        <!-- <pdf :src="content.content"></pdf> -->
        <div class="pdf" v-show="fileType === 'pdf'">
          <div class="turn-detail">
            <div @click="changePdfPage(0)"></div>
            <div @click="changePdfPage(1)"></div>
          </div>
          <!-- 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 -->
          <pdf
            :src="fullPdf(content.content)"
            :page="currentPage"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler"
          ></pdf>
          <p class="arrow center">
            <!-- 上一页 -->
            <span
              @click="changePdfPage(0)"
              class="turn curpoint"
              :class="{grey: currentPage==1}"
            >上一页</span>
            {{currentPage}} / {{pageCount}}
            <!-- 下一页 -->
            <span
              @click="changePdfPage(1)"
              class="turn curpoint"
              :class="{grey: currentPage==pageCount}"
            >下一页</span>
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import pdf from "vue-pdf";
export default {
  data() {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      src: "" // pdf文件地址
    };
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
  components: {
    pdf
  },

  methods: {
    fullPdf(val) {
      if (val.indexOf(".pdf") === -1) {
        return val + ".pdf";
      }
    },
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    }
  },

  props: {
    content: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // this.src = pdf.createLoadingTask(this.content.content);
  },
  filters: {}
};
</script>
<style  rel="stylesheet/scss"  lang='scss'>
.turn-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 20;
  > div:nth-of-type(1) {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 25;
  }
  > div:nth-of-type(2) {
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 25;
  }
}
</style>