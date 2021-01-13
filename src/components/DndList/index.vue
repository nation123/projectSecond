<template>
  <div class="dndList">
    <div v-if="list1.length" :style="{width:width1}" class="dndList-list">
      <draggable :set-data="setData" :list="list1" 
                 @end="ends" group="article" class="dragArea">
        <div v-for="(element,index) in list1" :key="index" class="list-complete-item btw"  >
          <div :class="['list-complete-item-handle',curIndex==index?color:'']" @click.stop="showSecond(element,index)">{{ element.name }}</div>
          <div class="row">
            <span @click.stop="editEle(element)">
              <i style="color:skyblue" class="el-icon-edit" />
            </span>
            <span @click.stop="deleteEle(element,index)">
              <i style="color:#ff4949;margin:0 15px;" class="el-icon-delete" />
            </span>
            <span>
              <el-switch v-model="element.showd" @change="toswitch(element)" active-color="#13ce66" inactive-color="#ccc"></el-switch>
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <div v-if="list2.length" :style="{width:width2}">
      <div class="center">
        <span>序号</span>
        <span>参数名称</span>
        <span>操作</span>
      </div>
      <draggable :list="list2" group="article" class="dragArea">
        <div v-for="(element,index) in list2" :key="index" class="center">
          <div>{{++index}}</div>
          <div>
            <div>{{element.name}}</div>
         
          </div>
          <div class="arc">
            <span style="flex:1;"  @click="editEle(element)">
              <i style="color:skyblue;"  class="el-icon-edit" />
            </span>
            <span  style="flex:1;" @click="deleteEle(element,index)">
              <i style="color:#ff4949;" class="el-icon-delete" />
            </span>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
   data() {
    return {
     curIndex:0,
    }
  },
  name: "DndList",
  components: { draggable },
  props: {
    color:{
      type: String,
      default: ""
    },
    list1: {
      type: Array,
      default() {
        return [];
      }
    },
    list2: {
      type: Array,
      default() {
        return [];
      }
    },
    list1Title: {
      type: String,
      default: "list1"
    },
    list2Title: {
      type: String,
      default: "list2"
    },
    width1: {
      type: String,
      default: "100%"
    },
    width2: {
      type: String,
      default: "100%"
    }
  },
  methods: {
    toswitch(ele){
       this.$emit('toswitch',{
         ele:ele
       })
    },
   ends(){
      this.$emit('ends')
   },
    isNotInList1(v) {
    
      return this.list1.every(k => v.id !== k.id);
    },
    isNotInList2(v) {
     
      return this.list2.every(k => v.id !== k.id);
    },
    showSecond(item,index){
    
      this.curIndex = index;
      this.$emit('showSecond',{
        ele:item
      })
    },
    editEle(item){
        this.$emit('editEle',{
        ele:item
      })
    },
    deleteEle(item,indexs) {
     this.$emit('deleteEle',{
        ele:item,
        index:indexs
      })
      
    },
    pushEle(ele) {
      
      for (const item of this.list2) {
        if (item.id === ele.id) {
          const index = this.list2.indexOf(item);
          this.list2.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList1(ele)) {
        this.list1.push(ele);
      }
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
   
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}
.red{
  color:red;
}
.blue{
  color:blue;
}
.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
  margin-bottom: 10px;
}

.list-complete-item-handle {
  flex:1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
.center > span,
.center > div {
  text-align: center;
  line-height: 40px;
  border: 1px solid #ccc;
  border-right: 0;
}
.center > span:nth-of-type(1),
.center > div:nth-of-type(1) {
  flex: 1;
}

.center > span:nth-of-type(2),
.center > div:nth-of-type(2) {
  flex: 3;
  input {
    width: 90%;
    border: 0;
    text-align: center;
    background: #fff;
  }
}

.center > span:nth-of-type(3),
.center > div:nth-of-type(3) {
  flex: 1;
  border-right: 1px solid #ccc;
}
</style>
