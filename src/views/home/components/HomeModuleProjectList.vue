<template>
  <div class="HomeModuleProjectList">
    <div class="btw">
      <div class="card col"  v-for="(v, i) in list" :key="i" :class="[`bgcol-${i%3}`]">
        <h4 class="text-hide-2">{{v.name}}</h4>
        <p class="text-hide-1">{{v.cooperateCompanyName}}</p>
        <p class="text-hide-1">{{v.subtypeName}}</p>
      </div>
    </div>
    <div class="center-v w100" style="margin-top: 40px">
      <el-button type="primary" v-open="'HomeProjectList'" style="width: 200px"
        >查看全部</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeModuleProjectList",
  data() {
    return {
      keyTable: 0,
    };
  },
  props: {},
  data() {
    return {
      list: [],
    };
  },
  mounted(){
    this.getList();
  },
  methods: {
    getList() {
      this.$api.p.project
        .getProjectListHomeNew({ params: { current: 1, size: 3 } })
        .then((res) => {
          this.list = res.data.records;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.HomeModuleProjectList {
  .card {
    width:380px;
    height: 220px;
    padding: 30px;
    color: #fff;
    box-shadow: 0px 12px 32px 0px rgba(102, 163, 233, 0.1);
    border-radius: 8px;
    overflow: hidden;
    >h4{
      font-size: 20px;
      height:60px;
      margin: 25px 0 0;
      line-height: 35px;
    }
    >p:nth-of-type(1){
      font-size: 16px;
      margin-bottom: 16px;
    }
    >p:nth-of-type(2){
      margin: 0;
      font-size: 16px;
    }
  }
  .bgcol-0{
    background: #7FC7FD;
  }
  .bgcol-1{
    background: #F2BF97;
  }
  .bgcol-2{
    background: #B8B8F3;
  }
}
</style>
