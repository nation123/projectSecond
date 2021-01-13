<template>
  <div class="HomeModuleDeclareAnnouncement">
    <div>
      <div class="btw align" v-for="(v, i) in list" :key="i">
        <p
          class="home-texts curpoint"
          title="点击查看详情"
          @click="showDetail(v.id)"
        >
          {{
            `关于${v.name}申报产教融合项目审核${
              { 2: "", 3: "不" }[v.state]
            }通过的通知`
          }}
        </p>
        <span class="home-time">{{ v.createTime | formatDay }}</span>
      </div>
    </div>
   
    <div class="center-v w100" style="margin-top: 40px">
      <el-button type="primary" v-open="'HomeAnnounce'" style="width: 200px"
        >查看全部</el-button
      >
    </div>
    <DialogShowCompany
      :visible.sync="isShowCompany"
      :content="content"
    ></DialogShowCompany>
  </div>
</template>

<script>
import DialogShowCompany from "_c/DialogShowCompany";

export default {
  name: "HomeModuleDeclareAnnouncement",
  components: { DialogShowCompany },
  data() {
    return {
      isShowCompany: false,
      content: [],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    showDetail(projectId) {
      let _this = this;
      this.$api.p.project
        .getProjectDesensitization({ id: projectId })
        .then((res) => {
          let project = res.data;
          _this.content = [
            {
              label: "公司名称",
              value: project.cooperateCompanyName,
            },
            {
              label: "公司负责人",
              value: project.companyChargeName,
            },
            {
              label: "公司负责人手机号",
              value: project.companyChargePhone,
            },
            {
              label: "项目名称",
              value: project.name,
            },
            {
              label: "项目简介",
              value: project.brief,
            },
            {
              label: "项目类型",
              value: project.subtypeName,
            },
            {
              label: "项目负责人",
              value: project.projectLeaderName,
            },
            {
              label: "项目负责人手机号",
              value: project.projectLeaderPhone,
            },
            {
              label: "项目期望目标",
              value: project.expectedResult,
            },
          ];
          _this.isShowCompany = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.HomeModuleDeclareAnnouncement {
  .home-texts {
    font-size: 16px;
    color: #222;
    line-height: 25px;
    font-weight: 800;
    &:hover {
      color: #409eff;
    }
  }
  .home-time {
    font-size: 14px;
    color: #888;
    line-height: 25px;
  }
  .card {
    width: 270px;
    height: 220px;
    padding: 30px;
    background: white;
    box-shadow: 0px 12px 32px 0px rgba(102, 163, 233, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background: url("../img/bg_card_declare.png") no-repeat;
    background-size: 115px 96px;
    background-position: right bottom;
    &:not(:last-child) {
      margin-right: 29px;
    }

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #222222;
      line-height: 28px;
    }
    .time {
      font-size: 14px;
      font-weight: 400;
      color: #888888;
      line-height: 14px;
    }
  }
}
</style>
