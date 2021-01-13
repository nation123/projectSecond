<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;">

    </div>
  </div>
</template>
<script>
  /**
   * 官方文档
   * http://www.wangeditor.com/
   */
  import E from "wangeditor";
  import {resourseUrl, upload} from "_u/config.js";
  import {getToken} from "_u/auth";

  const removeWordXml = text => {
    let html = text;
    html = html.replace(/<\/?SPANYES[^>]*>/gi, "");//  Remove  all  SPAN  tags
    // html = html.replace(/<(\w[^>]*)  class=([^|>]*)([^>]*)/gi, "<$1$3");  //  Remove  Class  attributes
    // html = html.replace(/<(\w[^>]*)  style="([^"]*)"([^>]*)/gi, "<$1$3");  //  Remove  Style  attributes
    html = html.replace(/<(\w[^>]*)  lang=([^|>]*)([^>]*)/gi, "<$1$3");//  Remove  Lang  attributes
    html = html.replace(/<\\?\?xml[^>]*>/gi, "");//  Remove  XML  elements  and  declarations
    html = html.replace(/<\/?\w+:[^>]*>/gi, "");//  Remove  Tags  with  XML  namespace  declarations:  <o:p></o:p>
    html = html.replace(/&nbsp;/, "");//  Replace  the  &nbsp;
    html = html.replace(/\n(\n)*( )*(\n)*\n/gi, '\n');
    //  Transform  <P>  to  <DIV>
    // var  re  =  new  RegExp("(<P)([^>]*>.*?)(<//P>)","gi")  ;            //  Different  because  of  a  IE  5.0  error
//        html = html.replace(re, "<div$2</div>");
    return html;
  }
  export default {
    name: "Editor",
    data() {
      return {
        editor: null,
        editorContent: ''
      };
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    props: ['catchData', 'defaultHtml'], // 接收父组件的方法
    mounted() {

      this.editor = new E(this.$refs.editorElem);
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = removeWordXml(html);
        this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];
      // this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      this.editor.customConfig.uploadImgServer = upload
      this.editor.customConfig.uploadFileName = 'file'
      // this.editor.customConfig.uploadImgParams = { }
      this.editor.customConfig.uploadImgHeaders = {
        token: getToken()
      }
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = resourseUrl + result.data
          insertImg(url)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }

      this.editor.create(); // 创建富文本实例
      if (this.defaultHtml) { //初始化富文本的默认值
        this.editor.txt.html(this.defaultHtml);
      }
    }
  }
</script>
