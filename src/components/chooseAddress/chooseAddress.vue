<template>
  <!-- 选择地址-->
  <div class="address-container">
     <!-- 使用：<choose-address @getAddressData="getAddressData"></choose-address> -->
        <el-cascader
          :options="options"
          width="100%"
          v-model="selectedOptions"
          placeholder="选择地区"
          @change="getAddressData"
          :separator="' '"
        ></el-cascader>
  </div>
</template>

<script>
import options from "_a/data/country-level3-data";
export default {
  name: "chooseAddress",
  data() {
    return {
      // form: {},
      selectedOptions: [], //存放默认值
      options: options, //存放城市数据也就是显示出来
      formCustom: {
        Detail: "", //详细地址信息
        DetailMap: "", //城市地址详细地址拼接
        address: "" //省份城市
      }
    };
  },

  methods: {
    // 触发三级联动 我们这是需要传字符串所以需要把数组转为字符串并用"/"间隔
    getAddressData(value) {
      this.formCustom.address = value.join("/"); //获取到城市地址
      this.$emit("getAddressData",{
        addressData:value
      })
      // console.log(value)
    },
    showList() {
      const req = {};
      gymnasiumLookVue(req).then(res => {
        if (res.data.code == "200") {
          console.log(res)
          this.introductionListLook = res.data.data.rows;
          this.introductionListLook.map(item => {
            // 地址回显
            // 切开省份地址和地址描述
            //通过刚才添加的空格把两者区分开 下标为0就是三级联动 ，为1就是三级联动后面的具体地址描述
            let addressData = item.address.split("\xa0");
            //三级联动的value要与label相同，所以不能有"/"切割开就好了
            let selectData = addressData[0].split("/");
            // 地址省份( 三级联动 )
            this.selectedOptions = selectData;
            // 省份城市后面的具体描述
            this.formCustom.Detail = addressData[1]; // 如果有默认值不操作时把默认值传过去

            if (this.selectedOptions) {
              this.formCustom.address = this.selectedOptions.join("/");
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  computed: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.address-container{
  width:100%;
  .el-cascader{
    display: block;
  }
}
</style>
