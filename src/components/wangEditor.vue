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
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      var editor = new E('#editor')
      this.seteditor()
      editor.txt.html(this.value)
    },
    methods: {
      seteditor() {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.config.height = 800;
        this.editor.config.uploadImgShowBase64 = true // 可上传本地图片 若false 只能上传网络图片
        this.editor.config.pasteFilterStyle = true; // 关闭粘贴样式的过滤
        this.editor.config.pasteIgnoreImg = false; // 忽略粘贴内容中的图片

        // 配置菜单
        this.editor.config.menus = [
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
          'image', // 插入图片
          'table', // 表格
          'undo', // 撤销
          'redo', // 恢复
        ]

        this.editor.config.uploadImgHooks = {
          fail: (xhr, editor, result) => {// 插入图片失败回调
            
          },
          success: (xhr, editor, result) => {// 图片上传成功回调
            
          },
          timeout: (xhr, editor) => {// 网络超时的回调
            
          },
          error: (xhr, editor) => {// 图片上传错误的回调
            
          },
          customInsert: (insertImg, result, editor) => {// 图片上传成功，插入图片的回调
            
            //result为上传图片成功的时候返回的数据 console.log(result.data[0].url)
            // 
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              // console.log(result)
              let url = "http://otp.cdinfotech.top"+result.url
              insertImg(url)
            // }
          }
        }
        // 上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
          this.editor.config.customAlert = function (info) {
              // info 是需要提示的内容
              alert('自定义提示：' + info);
              console.log(info);
          }
          this.editor.config.customUploadImg = function (files, insert) {
              // files 是 input 中选中的文件列表
              // insert 是获取图片 url 后，插入到编辑器的方法
 
              // 上传代码返回结果之后，将图片插入到编辑器中
              insert(imgUrl)
          }
        this.editor.config.onchange = (html) => { // 配置 onchange 回调函数，将数据同步到 vue 中
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
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
    height: 1.8rem;
}
</style>