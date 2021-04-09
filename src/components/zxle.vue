<template>
    <div class="learnMain">
        <my-header></my-header>
        <div class="learnTop">
            <div class="topCon">
                <div class="inputCon">
                    <label for="">选择题型：</label>
                    <select name="" id="" v-model="type" @change='getValuetx($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in txList" :value="item.name">{{item.name}}</option>
                    </select>
                    <label for="">选择章节：</label>
                    <select name="" id="" v-model="char" @change='getValuezj($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in zjList" :value="item.name">{{item.name}}</option>
                    </select>
                    <label for="">选择难度：</label>
                    <select name="" id="" v-model="nd" @change='getValuend($event)'>
                        <option value="">请选择...</option>
                        <option v-bind:key="index" v-for="(item,index) in levList" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="tjBtn" @click="lesubmit()">提交</div>
            </div>
        </div>
        <div class="learnCon">
          <div class="tList" v-bind:key="index" v-for="(item,index) in stList">
            <div class="tQues">{{index+1}}.{{item.question}}</div>
            <div class="tBtn" @click="look(index)">查看答案</div>
            <div class="tjx" v-show="index === isShow">
              <div class="ans">{{item.answer}}</div>
            </div>
          </div>
          <div class="white"></div>
        </div>
    </div>
</template>

<script>
import MyHeader from './head'
export default {
  name: 'zxle',
  components: {
    MyHeader
  },
  data () {
    return {
      levList: ['难', '中', '易'],
      txNum: '0',
      isShow: -1,
      txList:[],
      zjList:[],
      stList:[],
      type:'',
      char:'',
      nd:''
    }
  },
  methods: {
    look (index) {
      if(this.isShow == index){
        this.isShow = -1
      }else{
        this.isShow = index
      }
    },
    lesubmit () {
      console.log('222222',this.type,this.char,this.nd)
      let formData = new FormData()
      formData.append('charpter', this.char)
      formData.append('type', this.type)
      formData.append('difficulty', this.nd)
      this.$axios({
      method: 'post',
      url: '/questions/learn',
      data:formData
      }).then((res) => {
      console.log('数据是：', res)
      this.stList = []
      for (let i = 0; i < res.data.length; i++) {
        this.stList.push(
            res.data[i]
        )
      }
      }).catch((e) => {
          console.log('在线学习请求数据失败')
      })
    },
    getValuetx (e) {
        this.type = e.target.value 
    },
    getValuezj (e) {
        this.char = e.target.value
    },
    getValuend (e) {
        this.nd = e.target.value
    }
  },
   mounted () {
      this.$axios({
        method: 'get',
        url: '/types/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.txList.push(
                res.data[i]
            )
        }
      }).catch((e) => {
          console.log('数据获取失败')
      })
      this.$axios({
        method: 'get',
        url: '/charpters/all',
      }).then((res) => {
        console.log('数据是：', res)
        for (let i = 0; i < res.data.length; i++) {
            this.zjList.push(
                res.data[i]
            )
        }
      }).catch((e) => {
          console.log('数据获取失败')
      })
      // 默认显示所有习题
      this.$axios({
      method: 'get',
      url: '/questions/all',
      }).then((res) => {
      console.log('数据是：', res)
      this.stList = []
      for (let i = 0; i < res.data.length; i++) {
        this.stList.push(
            res.data[i]
        )
      }
      }).catch((e) => {
          console.log('在线学习请求数据失败')
      })
  }
}
</script>

<style scoped lang="scss">
.learnMain{
    width:100%;
    height:100%;
    overflow: hidden;
    .learnTop{
      width:100%;
      height: .5rem;
      background: #6c72f3;
      .topCon{
        width:10rem;
        height: 100%;
        margin: 0 auto;
        display: flex; //子元素垂直居中
        align-items: center; //子元素垂直居中
        padding-left: 3%;
      }
      .inputCon{
          width:90%;
          height: 100%;
          float: left;
          font-size: .18rem;
          color:#fff;
          line-height: .5rem;
          select{
              width: 1.6rem;
              height: .3rem;
              padding: 0 .1rem;
              box-sizing: border-box;
              background: 0 0;
              line-height: .3rem;
              font-size: 16px;
              color: #fff;
              border: 1px solid #c8c8ca;
              margin:0 .1rem .2rem 0;
              direction: ltr;//字体超出省略号表示
              text-overflow: ellipsis;//字体超出省略号表示
              option{
                  direction: ltr;//字体超出省略号表示
              }
          }
      }
      .tjBtn{
          width:.56rem;
          height:.27rem;
          float: left;
          background: #fff;
          text-align: center;
          line-height: .27rem;
          color: #6c72f3;
          cursor: pointer;
          font-size: .16rem;
      }
    }
    .learnCon{
      width:11rem;
      background: #fff;
      overflow: auto; //超出显示滚动条
      margin: 0 auto;
      padding: .2rem;
      .tList{
        width:100%;
        height:auto;
        margin-bottom: .25rem;
        .tQues{
          width:100%;
          height:auto;
          margin-bottom: .25rem;
          font-size: .18rem;
          color:#333;
          line-height: .2rem;
        }
        .tBtn{
          width:1.06rem;
          height:.28rem;
          background: #6c72f3;
          line-height: .28rem;
          text-align: center;
          color:#fff;
          font-size: .16rem;
          margin-bottom: .3rem;
          cursor: pointer;
        }
        .tjx{
          width:100%;
          height:auto;
          padding:.16rem;
          border:.01rem solid #6c72f3;
          font-size: .16rem;
          color:#333;
        }
      }
      .white{
        width:.3rem;
        height:1rem;
        margin: 0 auto;
      }
    }
}
</style>
