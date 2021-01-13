<template>
  <div>
    <el-dialog
      title="查看详情"
      :visible.sync="mVisible"
      width="900px"
      top="10vh"
      style="height: 90vh;overflow-y: auto;"
    >
    <HxTableItem :content="content"></HxTableItem>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "_u/auth";
export default {
  name: "DialogTable",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    content: {
      type: Array,
      default: false
    }
  },

  data() {
    return {
      formLabelWidth: "200px",
      headers: {
        token: getToken()
      }
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
  methods: {},
  mounted() {}
};
</script>

<style lang="scss">
.baseUl {
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0;
  > li {
    font-size: 15px;
    border-top: 1px solid #ccc;
    color: #666;
    align-items: stretch;
    line-height: 25px;
    > p:nth-of-type(1) {
      width: 240px;
      padding: 12px 0;
      display: flex;
      margin: 0;
      justify-content: center;
      background: #dedede;
      align-items: center;
    }
    > p:nth-of-type(2) {
      padding: 12px 20px;
      flex: 1;
      margin: 0;
      height: auto;
      overflow: hidden;
      img {
        width: 90%;
        margin: 10px auto;
      }
    }
    > div {
      padding: 12px 20px;
      flex: 1;
      height: auto;
    }
  }
  > li:nth-of-type(1) {
    border-top: 0;
  }
}
</style>
