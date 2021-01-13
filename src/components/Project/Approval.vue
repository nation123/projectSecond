<template>
  <!--项目立项Item-->
  <div class>
    <HeaderTitle :title="'项目申报材料'">
      <div slot="bodyContent" class="pv-20">
        <el-table :data="list" style="width: 100%">
          <el-table-column align="center" label="文件名称">
            <template slot-scope="{row}">
              <a class="hover-blue" title="点击预览" :href="row.fileUrl" v-full target="_blank">{{row.fileName}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上传时间">
            <template slot-scope="{row}">
              <div>{{row.createTime | formatSe}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </HeaderTitle>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Approval",
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted: function () {},
  filters: {},
};
</script>
<style  rel="stylesheet/scss" scoped lang='scss'>
</style>
