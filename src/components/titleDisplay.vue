<template>
    <div class="setCon">
        <div class="disBtn">
            <div class="disTit" :key="item" v-for="(item,i) in disList" @click="dian(i)" :class="{disSel:i==current}">{{item}}</div>
        </div>
        <div class="quaBox">
          <textarea class="displayBox" id="qus" v-show="qisShow" v-model="this.testList[this.show].t"></textarea>
          <textarea class="displayBox" id="ans" v-show="aisShow" v-model="this.testList[this.show].a"></textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: 'titleDisplay',
  data () {
    return {
      disList: ['试题', '答案'],
      setList: ['甲', '乙', '丙', '重修'],
      current: false,
      qisShow: true,
      aisShow: false,
      // 这组数据请求得到
      testList:[
        {t:'1',a:'11'},
        {t:'2',a:'22'},
        {t:'3',a:'33'},
      ],
      show:0
    }
  },
  methods: {
    dian (index) {
      this.current = index // 传回当前点击元素的下标
      if(this.current==0){
        this.qisShow = true
        this.aisShow = false
      }else{
        this.qisShow = false
        this.aisShow = true
      }
    },
    daGet(){
      this.show = sessionStorage.getItem('txId') - 1
    }
  },
  mounted () {
    setInterval(this.daGet, 1);
    // 需请求接口显示相应题型某章节的试题和答案 选择的数据存储在session里 传给后台
    var seltxList = JSON.parse(sessionStorage.getItem('seltxList'))
    var selzjList = JSON.parse(sessionStorage.getItem('selzjList'))
    // 问题：数组用formdata怎么传过去
    let formData = new FormData()
    for (var i = 0; i < seltxList.length; i++) {
        formData.append("txs",seltxList[i].name);
    }
    for (var i = 0; i < selzjList.length; i++) {
        formData.append("zjs",selzjList[i].name);
    }
    this.$axios({
    method: 'post',
    url: '/types/update',
    data:formData
    }).then((res) => {
    console.log('数据是：', res)
    }).catch((e) => {
        console.log('更新失败')
    })
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
            background: #fff;
            color:#333;
            cursor: pointer;
            line-height: .27rem;
        }
        .disSel{
            background: #6c72f3;
            color:#fff;
        }
    }
    .quaBox{
      width:100%;
      height:90%;
    }
    .displayBox{
        width:100%;
        height:100%;
        border:.01rem solid #333;
        background: none;
    }
}
</style>
