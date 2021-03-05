<template>
    <div class="setCon">
        <div class="disBtn">
            <div class="disTit" :key="item" v-for="(item,i) in disList" @click="dian(i)" :class="{disSel:i==current}">{{item}}</div>
        </div>
        <div class="quaBox">
          <div class="displayBox" id="qus" v-show="qisShow">
            <div class="qus" :key="item" v-for="item in testList[this.show]">{{item.question}}</div>
          </div>
          <div class="displayBox" id="ans" v-show="aisShow">
            <div class="qus" :key="item" v-for="item in testList[this.show]">{{item.answer}}</div>
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
      current: false,
      qisShow: true,
      aisShow: false,
      // 这组数据请求得到
      testList:[
        [
          {type:'',id:'',question:'asfnsdkjngflsdkgndjsgnksdgnksdfgsd',answer:'11'},
          {type:'',id:'',question:'nfbjsdkfnkdsfnhkdsfhksdjksdfhsdklhfksdhfkdshfdshfdsfhkdslfhsdlkhfkdshfklsdhfkdshfkldshfdsfjdshfldsfjlsdhfhdsklfhkdslsdfjksldfl;dsfjlsdfals;',answer:'22'},
          {type:'',id:'',question:'sdfdsf',answer:'33'},
        ],
        [
          {type:'',id:'',question:'1',answer:'44'},
          {type:'',id:'',question:'2',answer:'55'},
          {type:'',id:'',question:'3',answer:'6677'},
        ]
      ],
      show:0,
      selZjList:[],
      selTxlist:[]
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
    //抽题组卷
    this.selZjList = sessionStorage.getItem('selzjList')
    this.selTxlist = sessionStorage.getItem('seltxList')
    let formData = new FormData()
    formData.append("charpter",JSON.stringify(this.selZjList));//数组转换成json字符串
    formData.append("type",JSON.stringify(this.selTxlist));//数组转换成json字符串
    this.$axios({
        method: 'post',
        url: '/papers/extract',
        data:formData
    }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
          this.testList.push(
              res.data[i]
          )
        }
    }).catch((e) => {
        console.log('数据获取失败')
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
