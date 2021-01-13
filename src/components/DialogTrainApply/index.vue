<template>
  <el-dialog
    title="报名申请"
    :visible.sync="mVisible"
    width="500px"
    top="30vh"
    style="height: 90vh;overflow-y: scroll;"
  >
    <!--accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"-->
    <el-form :model="form" ref="ruleForm" style="width: 100%;">
      <el-form-item label="报名文件" :label-width="formLabelWidth">
        <div>
          <el-upload
            :action="uploadUrl"
            :file-list="fileList"
            :headers="headers"
            class="upload-demo"
            ref="upload"
            :limit="1"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-remove="removeImg"
          >
            <el-button :disabled="fileList.length>0" size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="mVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSignUpActivities">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getToken} from "_u/auth";
  import {baseUrl, upload} from "_u/config.js";

  export default {
    name: 'DialogTrainApply',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      trainId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        form: {},
        formLabelWidth: "200px",
        fileList: [],
        headers: {
          token: getToken()
        },
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
      uploadUrl() {
        return upload
      }
    },
    methods: {
      removeImg(file) {
        this.fileList = [];
      },
      uploadSuccess(file, fileList) {
        // 上传成功
        if (file.code !== 200) {
          this.$message.error(file.message);
          this.fileList.splice(0, this.fileList);
          return false;
        } else {
          let body = {
            name: fileList.name,
            url: file.data[0]
          };
          this.fileList.push(body);
        }
      },
      uploadError(file) {
        this.$message.error("上传失败，请稍后再试");
        return false;
      },
      handleSignUpActivities() {
        if (!this.fileList.length) {
          this.$message({
            message: '请上传报名文件',
            type: 'warning'
          });
        }
        this.$confirm('确认报名该活动？')
          .then(_ => {
            signUpTraining(this.trainId, this.fileList[0].url)
              .then(res => {
                this.$message({
                  message: '报名成功',
                  type: 'success'
                });
                this.$emit('onOk')
                // this.$confirm("立即查看我参与的培训?", "报名成功!", {
                //   confirmButtonText: "前往查看",
                //   cancelButtonText: "暂不查看",
                //   type: "success"
                // })
                //   .then(_ => {
                //     this.$router.push({path: '/ParticipateInTraining'})
                //   })
              })
          })
          .catch(_ => {
          });
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
</style>
