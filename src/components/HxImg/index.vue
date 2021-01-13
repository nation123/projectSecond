<template>
  <el-image :src="newSrc" :preview-src-list="[newSrc]" :fit="fit"/>
</template>

<script>
  import {resourseUrl} from "_u/config";
  export default {
    name: "HxImg",
    props: {
      src: {
        type: String,
        default: ''
      },
      fit: {
        type: String,
        default: ''
      },
    },
   
    computed: {
      newSrc() {
        let b = /(http|https):\/\/([\w.]+\/?)\S*/.test(this.src);
        if (!b) { return resourseUrl + this.src }
        return this.src
      }
    },
  };
</script>
<style>
</style>
