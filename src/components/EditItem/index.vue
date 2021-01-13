<template>
  <div class="row center">
    <template v-if="!isEdit">
              <span class="mr-20" style="text-align: center;">
                {{ this.names }}
              </span>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-edit"
        @click="handleEdit"
      ></el-button>
    </template>
    <template v-else>
      <el-select v-model="tempList" multiple placeholder="请选择">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div style="width: 20px;"></div>
      <el-button
        class="cancel-btn"
        size="mini"
        icon="el-icon-refresh"
        type="warning"
        @click="handleCancel"
      >撤销
      </el-button>
      <el-button
        type="success"
        size="mini"
        icon="el-icon-circle-check-outline"
        @click="handleOk"
      >确认
      </el-button>
    </template>
  </div>
</template>

<script>
  import {baseUrl, upload, DICT} from "_u/config.js";

  export default {
    props: {
      dictCode: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        isEdit: false,
        typeList: [],
        tempList: [],
      }
    },
    computed: {
      names() {
        let list = this.text.split(',') || [];
        return list.reduce((p, v) => {
          if (p) {
            p += ','
          }
          return p + this.getNameById(v)
        }, '')
      },
    },
    methods: {
      handleEdit() {
        this.tempList = this.text.split(',')
        this.isEdit = true
      },
      handleOk() {
        this.isEdit = false
        let tempText = this.tempList.join(',')
        this.$emit('clickOk', tempText)
        // this.updateData()
      },
      handleCancel() {
        this.isEdit = false
      },
      getCourseType() {
        getDictByCode(this.dictCode).then(res => {
          this.typeList = res.data || [];
        });
      },
      getNameById(id) {
        let obj = this.typeList.find(v => {
          return v.id === id
        }) || {}
        return obj.name || id
      },
    },
    mounted() {
      this.getCourseType()
    }
  };
</script>

<style scoped>
</style>

