<template>
  <!-- <upload-img 
   @success="successFun" 
   :FileList="form.imgUrl"
   @remove="errFun"
   :options="{
            className: 'upload-demo',
            text: '点击上传',
            listType: 'file',
            limit: 1
        }"
  ></upload-img>-->
  <el-upload
    :class="options.className"
    :action="action"
    :file-list="fileList"
    :headers="headers"
    :accept="options.accept"
    :list-type="options.listType"
    :limit="options.limit"
    :on-success="uploadSuccess"
    :on-preview="previewFile"
    :on-error="uploadError"
    :on-remove="removeImg"
  >
    <el-button size="small" type="primary">{{ options.text }}</el-button>
  </el-upload>
</template>

<script>
import { upload } from "_u/config.js";
import { getToken } from "_u/auth";
import { urlAutoCompletion } from "_u";
export default {
  name: "UploadImg",
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          className: "upload-demo",
          text: "点击上传",
          listType: "picture",
          accept: "image/jpeg, image/gif, image/png, image/bmp",
          limit: 1
        };
      }
    },
    FileList: {
      type: String,
      default: ""
    }
  },
  watch: {
    FileList: {
      handler(n, o) {
        console.log(n);
        this.fileList = [];
        let typeName, name;
        if (this.options.listType === "picture") {
          typeName = "img";
          name = "img";
        } else {
          typeName = "file";
          name = "file";
        }
        if (n.length > 5) {
          n = n.split(",");
          n.map(v => {
            let body = {
              type: typeName,
              name: name,
              url: urlAutoCompletion(v),
              uploadUrl: v
            };
            this.fileList.push(body);
          });
        } else {
          this.fileList = [];
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      action: upload,
      headers: {
        token: getToken()
      },
      fileList: []
    };
  },

  methods: {
    previewFile(file) {
      if (file && file.url) {
        window.open(file.url);
      }
    },
    removeImg(file, fileList) {
      let _this = this;
      if (fileList.length < 1) {
        _this.fileList = [];
      } else {
        _this.fileList = fileList;
      }

      _this.$emit("remove", {
        data: _this.fileList
      });
    },
    uploadSuccess(file, fileList) {
      // 上传成功
      let _this = this;
      if (file.code !== 200) {
        _this.$message.error(file.message);
        _this.fileList = [];
        return false;
      } else {
        let body = {
          name: fileList.name,
          url: urlAutoCompletion(fileList.url),
          uploadUrl: file.data
        };
        _this.fileList.push(body);
        _this.$emit("success", {
          data: _this.fileList
        });
      }
    },
    uploadError(file) {
      this.$message.error("上传失败，请稍后再试");
      return false;
    }
  }
};
</script>

<style scoped></style>
