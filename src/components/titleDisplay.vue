<template>
    <div class="setCon">
        <div class="disBtn">
            <div class="disTit" :key="item" v-for="(item,i) in disList" @click="dian(i)" :class="{disSel:i==current}">{{item}}</div>
        </div>
        <div class="quaBox" v-for="(val,key,index) in txList" :key="key" v-show="index==show">
            <div class="displayBox" id="qus" v-show="qisShow">
                <div class="qus" v-for="(item,i) in val" :key="i" v-html="item.question"></div>
            </div>
            <div class="displayBox" id="ans" v-show="aisShow">
                <div class="qus" v-for="(item,i) in val" :key="i" v-html="item.answer"></div>
            </div>
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
      current: 0,
      qisShow: true,
      aisShow: false,
      testList:[],
      show:0,
      txList:{},
      arr:[],
      txname:''
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
      this.show = sessionStorage.getItem('txId') - 1 //点击的题型对应的下标
      this.txname = sessionStorage.getItem('txName')
    }
  },
  mounted () {
    //测试router-link传递数据
    var aa = this.$route.query.name
    console.log('aaaaaaaaaaa',this.$route.query)
    //测试router-link传递数据
    setInterval(this.daGet, 1000);
    // console.log('wwwwwww',this.props.history.state)
    this.txList = JSON.parse(sessionStorage.getItem('responseQ'))
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
        overflow: auto;
        padding: .1rem;
        .qus{
          width:100%;
          height:auto;
          word-wrap: break-word;
        }
    }
}
</style>
