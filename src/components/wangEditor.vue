<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editoritem',
    components: { E },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function(value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      }
      //value为编辑框输入的内容，这里监听一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      var editor = new E('#editor') //创建editor实例
      this.seteditor()
      editor.txt.html(this.value)
    },
    methods: {
      seteditor() {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.config.height = 800;
        // this.editor.config.uploadImgServer = 'http://10.103.0.245:8888/questions/add' 
        this.editor.config.uploadImgShowBase64 = true // 可上传本地图片 若false 只能上传网络图片
        this.editor.config.showLinkImg = false; //隐藏网络图片上传
        this.editor.config.uploadFileName = 'qfile'
        this.editor.config.uploadImgTimeout = 50000000;
        this.editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片

        // 配置菜单
        this.editor.config.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          // 'italic', // 斜体
          // 'underline', // 下划线
          // 'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          // 'backColor', // 背景颜色
          // 'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          // 'quote', // 引用
          'image', // 插入图片
          'table', // 表格
          'code', //代码
          'undo', // 撤销
          'redo', // 恢复
        ]
        //插入图片
        this.editor.config.uploadImgHooks = {
          // fail: (xhr, editor, result) => {// 插入图片失败回调
          //   console.log('失败',result)
          // },
          // success: (xhr, editor, result) => {// 图片上传成功回调
          //   console.log('成功',result)
          //   // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          // },
          // timeout: (xhr, editor) => {// 网络超时的回调
          //   console.log('网络超时aaaa')
          // },
          // error: (xhr, editor,result) => {// 图片上传错误的回调
          //   console.log('上传错误',result)
          // },
          customInsert: (insertImgFn, result, editor) => {// 图片上传成功，插入图片的回调
            
            //result为上传图片成功的时候返回的数据 
            // console.log('回显',result.data1)
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              // console.log(result)
            // let id = result.data.fileId;
            // let a = result.data.fileName.split('.')[1];
            // let str = id + '/' + a;
            // let url = '图片下载地址？fileId=' + str;
            // let url = "http://otp.cdinfotech.top"+result.url
            // var url1 = result.data1
            // var  url2 = result.data2
            // insertImgFn(url1)
            // }
          }
        }
        this.editor.config.onchange = (html) => { // 配置 onchange 回调函数，将数据同步到 vue 中
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change',this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      }
    }
  }
</script>

<style scoped>
/* 修改样式，要使用到css的>>>进行穿透，注意不能用scss，使用scss不能识别到>>>,因而会不起作用 */
.editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    font-size: .16rem;
}
.toolbar {
    border: 1px solid #ccc;
    height:.4rem;
    border-bottom: 0;
}
.text {
    border: 1px solid #ccc;
    height: 4rem;
}
</style>