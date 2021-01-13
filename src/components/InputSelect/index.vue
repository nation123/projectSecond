<template>
  <!--
       <InputSelect 
        :placeholder="'请输入老师'"
        :fetchFun="$api.c.rscenter
        .postRscenterApiV1UserList"
        :fetchArgument="{}"
        :searchName="'username'"
        :fetchArgumentParams="{}"
        @change="change"
        :defaultItem="{username:'111',id:'123'}"
  -->
  <!-- let checkUserId = (rule, value, callback) => {
     this.$nextTick(() => {
        if (!this.form.userId) {
          return callback(new Error('请输入并选择老师名称'));
        }else {
        callback();
      }
      })
      }; 
       userId: [
          {
           required: true, validator: checkUserId, trigger: ['blur','change']
          },
        ],
    -->
  <div>
    <el-select
      style="width: 500px"
      v-model="selectValue"
      filterable
      remote
      ref="selection"
      :label-in-value="true"
      @focus="initSelect"
      @change="changeSelect"
      reserve-keyword
      :remote-method="fetchList"
      :loading="loadingOrg"
      :placeholder="placeholder"
    >
      <el-option
        v-for="v in selectList"
        :key="v.id"
        :label="v.username || v.name"
        :value="v.id"
      ></el-option>
    </el-select>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "InputSelect",
  data() {
    return {
      selectValue: "",
      loadingOrg: false,
      selectList: []
    };
  },
  computed: {},
  components: {},
  watch: {
    defaultItem: {
      handler(val, oldval) {
        let _this = this;
        if (val.id) {
          let arr = [];
          arr.push(val);
          _this.selectList = arr;
          _this.selectValue = val.id;
        } else {
          _this.selectList = [];
          _this.selectValue = "";
        }
      },
      immediate: true
    }
  },
  methods: {
    initSelect() {
      // console.log(this.selectValue);
      // if (this.selectValue === "") {
      this.fetchList();
      // }
    },
    changeSelect(e) {
      this.$nextTick(() => {
        let selectName = this.$refs.selection.selectedLabel;
        this.$emit("change", {
          id: this.selectValue,
          name: selectName
        });
      });
    },
    fetchList(queryName = "") {
      let _this = this;
      _this.loadingOrg = true;
      _this.selectList = [];
      let data = {
        ..._this.fetchArgument
      };
      let params = {
        ..._this.fetchArgumentParams
      };
      data[_this.searchName] = queryName.trim() || "";
      params[_this.searchName] = queryName.trim() || "";
      _this
        .fetchFun({ params, data })
        .then(res => {
          _this.total = res.data.total;
          _this.loadingOrg = false;
          if (typeof _this.filterFun === "function") {
            // function
            _this.selectList = _this.filterFun(res.data.records);
          } else {
            // undefined
            _this.selectList = res.data.records;
          }
        })
        .catch(e => {
          _this.loadingOrg = false;
        });
    }
  },
  props: {
    searchName: {
      type: String,
      default: "name"
    },
    placeholder: {
      type: String,
      default: null
    },
    defaultItem: {
      type: Object,
      default: () => {}
    },
    fetchFun: {
      type: Function,
      default: () => {}
    },
    fetchArgument: {
      type: Object,
      default: () => ({})
    },
    fetchArgumentParams: {
      type: Object,
      default: () => ({})
    },
    filterFun: {
      // 处理数据
      type: Function,
      default: null
    }
  },
  mounted: function() {},
  filters: {}
};
</script>
<style rel="stylesheet/scss" scoped lang="scss"></style>
