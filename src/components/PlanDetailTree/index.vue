<template>
  <div>
    <el-tree
      :data="treeObj.children"
      node-key="id"
      default-expand-all
      :highlight-current="true"
      :expand-on-click-node="false">
      <div class="custom-tree-node btw w100 pr10" slot-scope="{ node, data }" @click="onClickItem(node.data)">
        <span class="w100" style="height:50px;line-height:50px">{{ node.data.chapterName }}</span>
        <span style="">
          <i v-if="node.data.needCheckRemark && showTips.includes('needCheckRemark')" class="el-icon-message-solid red"></i>
          <i v-if="node.data.needCheckInput && showTips.includes('needCheckInput')" class="el-icon-message-solid red"></i>
          <i class="el-icon-success" :class="{blue:node.data.chapterStatus==1}"></i>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'Sticky',
    props: {
      showTips:{
        type: Array,//needCheckInput,needCheckRemark
        default:[]
      },
      treeData: {
        type: Object,
        default: {}
      },
    },
    watch: {
      treeData(v){
        let treeObj = v
        if (treeObj&&treeObj.children) {
          this.checkTreeStatus(treeObj)
          this.$set(this, "treeObj", treeObj);
        }
      }
    },
    data() {
      return {
        treeObj: {}
      }
    },
    methods: {
      //递归检查各节点状态
      checkTreeStatus(tree) {
        if (tree.children && tree.children.length > 0) {
          let isAllOk = 1
          for (let child of tree.children) {
            if (this.checkTreeStatus(child) === 0) { isAllOk = 0 }
          }
          tree.chapterStatus = isAllOk
          return isAllOk
        } else {
          return tree.chapterStatus//叶子节点直接返回结果
        }
      },
      onClickItem(item) {
        this.showTips.forEach(v=>{
          item[v]=false
        })
        this.$emit('onClickItem', item)
      }
    }
  }
</script>
