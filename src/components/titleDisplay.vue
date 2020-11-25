<template>
    <div class="setCon">
        <div class="disBtn">
            <div class="disTit">试题</div>
            <div class="disAns">答案</div>
            <!-- 遗留问题 -->
        </div>
        <textarea class="displayBox"></textarea>
    </div>
</template>

<script>
export default {
  name: 'titleDisplay',
  data () {
    return {
      disList: ['试题', '答案'],
      setList: ['甲', '乙', '丙', '重修'],
      current: 0
    }
  },
  methods: {
    dian (index, event) {
      this.current = index // 传回当前点击元素的下标
    //   var el = event.currentTarget
    }
  }
}
</script>

<style scoped lang="scss">
.setCon{
    width:80%;
    height:100%;
    background: #e8e9fd;
    padding: .2rem;
    font-size: .16rem;
    color:#333;
    float: left;
    .disBtn{
        width:100%;
        height:.27rem;
        margin-bottom: .1rem;
        .disTit,.disAns{
            width:.8rem;
            height: 100%;
            float: left;
            text-align: center;
            font-size: .16rem;
            color: #333;
            background: #6c72f3;
            color:#fff;
            cursor: pointer;
        }
        .disAns{
            background: #fff;
            color:#333;
        }
    }
    .displayBox{
        width:80%;
        height:90%;
        border:.01rem solid #333;
        background: none;
    }
}
</style>
