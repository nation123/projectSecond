<template>
  <!--项目其他项（初期，中期，结项）Item-->
  <div class>
    <HeaderTitle :title="'项目阶段性汇总资料'">
      <div slot="bodyContent" class="pv-20">
        <HxTableItem :content="content" v-if="content && content.length>0"></HxTableItem>
        <EmptyData :text="'暂无阶段汇总资料'" v-else></EmptyData>
        <div>
          <div class="row align">
            <h3>项目阶段任务：</h3>
            <div>
              <el-link type="primary" class="fz-15" @click="isShowTask=true">点击查看详情</el-link>
            </div>
          </div>
          <div class="row align ">
            <h3>项目阶段文件：</h3>
            <div class="col">
              <el-link type="primary" class="fz-15" @click="isShowFile=true">点击查看详情</el-link>
              <!-- <a class="hover-blue fz-15 mb-10" title="点击预览" v-for="item in ProjectFile" :key="item.id" :href="item.fileUrl" v-full target="_blank">{{item.fileName}}</a> -->
            </div>
          </div>
          <div class="row align">
            <h3>项目阶段工作记录：</h3>
            <div>
              <el-link type="primary" class="fz-15" @click="isShowRecord=true">点击查看详情</el-link>
            </div>
          </div>
        </div>
      </div>
    </HeaderTitle>
    <DialogTaskList v-if="isShowTask" :visible.sync="isShowTask" :phaseId="phaseId"></DialogTaskList>
    <DialogFileList v-if="isShowFile" :visible.sync="isShowFile" :phaseId="phaseId"></DialogFileList>
    <DialogRecordList v-if="isShowRecord" :visible.sync="isShowRecord" :phaseId="phaseId"></DialogRecordList>
  </div>
</template>
<script type="text/javascript">
import DialogTaskList from "./components/DialogTaskList"
import DialogFileList from "./components/DialogFileList"
import DialogRecordList from "./components/DialogRecordList"
export default {
  name: "Phase",
  components:{DialogTaskList,DialogFileList,DialogRecordList},
  data() {
    return {
      isShowTask:false,
      isShowFile:false,
      isShowRecord:false,
      ProjectSummary: [],
      content: [],
    };
  },
  computed: {},
  watch: {
    phaseId(v) {
      if (v) {
        console.log(v);
        this.init();
      }
    },
  },
  methods: {
    init() {
      this.getProjectSummary();
    },
    getProjectSummary() {
      let params = {
        phaseId: this.phaseId,
        current: 1,
        size: 100,
      };
      this.$api.p.projectPhaseSummary
        .getProject_phase_summaryList( params )
        .then((res) => {
         this.content = res.data.map(v=>{
            v.label = v.fieldName
            v.value = v.fieldValue
            v.isFile = (v.fieldType===5)
           return v
          })
        });
    },
  },
  props: {
    phaseId: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  mounted: function () {
    this.init();
  },
  filters: {},
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
</style>
