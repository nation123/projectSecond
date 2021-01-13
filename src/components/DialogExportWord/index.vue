<template>
  <div class="DialogExportWord">
    <el-dialog
      title="导出预览"
      :visible.sync="mVisible"
      width="1000px"
      top="5vh"
      @opened="fetchData"
    >
      <div v-loading="loading">
        <div style="height: 75vh;overflow-y: scroll;">
          <div id="text-root-container" style="padding: 10%;">
            <div ref="textRoot" id="text-root">
              <div>
                <h1>实训信息</h1>
                <info :info="info"></info>
              </div>
              <div class="mt-30">
                <h1>实训总结</h1>
                <div v-html="info.summary"></div>
              </div>
              <div class="mt-30">
                <h1>实训成果</h1>
                <div v-html="info.achievement"></div>
              </div>
              <div class="mt-30">
                <h1>企业评价</h1>
                <div v-html="info.evaluationUrl"></div>
                <img :src="evaluationUrl">
              </div>
            </div>
          </div>
        </div>
        <div style="" class="center">
          <!--<el-button round type="primary" @click="exportWord" class="mt20">导出Word</el-button>-->
          <el-button round type="primary" @click="exportPdf" class="mt20" style="width: 200px;">导出PDF</el-button>
          <!--<el-button round type="primary" @click="test" class="mt20">TEST</el-button>-->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {scrollTo} from '@/utils/scroll-to'
  import "../../assets/js/jquery.wordexport";
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  import { baseUrlCom } from "_u/config.js";
  import Info from "../../views/PracticeEnterprise/components/Info";

  const createRichDom = richText => {
    let div = document.createElement("DIV");
    div.innerHTML = richText
    return div
  }

  export default {
    name: 'DialogExportWord',
    components:{Info},
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {
        }
      },
    },
    data() {
      return {
        loading: false,
        data: {}
      }
    },
    computed: {
      mVisible: {
        get() {
          return this.visible
        },
        set(s) {
          this.$emit('update:visible', s);
        }
      },
      evaluationUrl(){
        return baseUrlCom + this.info.evaluation
      }
    },
    methods: {
      fetchData() {
        // this.loading = true
        // getOutlineFull(this.planId)
        //   .then(res => {
        //     this.data = res.data
        //     this.loading = false
        //     this.parsingTree()
        //   }, error => {
        //     this.loading = false
        //   })
      },
      async exportWord() {
        const getBase64Image = img => new Promise((resolve, reject) => {
          let canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          let base64 = canvas.toDataURL("image/png");
          resolve(base64)
        })

        let imgElementList = []
        const checkImg = node => {
          for (let i = 0; i < node.childElementCount; i++) {
            let child = node.children[i];
            child.crossOrigin = "Anonymous";
            if (child.tagName === 'IMG') {
              imgElementList.push(child)
            } else {
              checkImg(child)
            }
          }
        }
        checkImg(this.$refs.textRoot);
        this.loading = true
        for (let img of imgElementList) {
          let imgUrl = img.src
          if (imgUrl.substr(0, 7).toLowerCase() == "http://" || imgUrl.substr(0, 8).toLowerCase() == "https://") {
            // let res = await getFileBase64(imgUrl)
            // img.src = 'data:image/png;base64,' + res.data
            img.src = await getBase64Image(img)
            // let file = await getFile(imgUrl)
            // img.src = 'data:image/png;base64,' + btoa(new Uint8Array(file).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          }
        }
        setTimeout(() => {
          window.$("#text-root").wordExport('实训详情');
          this.loading = false
        }, 300)
      },
      exportPdf() {
        let self = this
        html2Canvas(document.querySelector(`#text-root-container`), {
          // allowTaint: true
          useCORS: true//看情况选用上面还是下面的，
        }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save('实训详情.pdf')
          }
        )
      }
    },
  }
</script>

<style scoped lang="scss">
  .DialogExportWord {

  }
</style>
