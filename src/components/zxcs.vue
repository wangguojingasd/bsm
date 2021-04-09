<template>
    <div class="learnMain">
        <my-header></my-header>
        <div class="learnTop">
          <div class="learnCer">
            <div class="djs">
              剩余时间：<span>{{hour}}</span> ：<span>{{minutes}}</span> ：<span>{{seconds}}</span>
            </div>
            <div class="cue">（ 选择题请输入正确选项，判断题正确输入1，错误输入0）</div>
            <div class="submit" @click="subTest()">提交</div>
          </div>
        </div>
        <div class="learnCon">
          <div class="tList" v-bind:key="index" v-for="(item,index) in stList">
            <div class="tQues">{{index+1}}.{{item.question}}（<div contenteditable="true" v-html="stuAnw[index]" @input="stuAnw[index]=$event.target.innerHTML"></div>）</div> 
            <!-- contenteditable 实现可编辑的div v-html @input 实现 v-model -->
          </div>
        </div>
        <div class="grade" v-show="gradeShow">
            <div class="delCon">
                <div class="editTop">
                    <div class="topTxt">{{sjName}}</div>
                    <div class="topImg" @click="close()"><img src="../assets/close.png" alt=""></div>
                </div>
                <div class="txtMid">
                  <div class="deltxt">您的成绩是：{{score}}分</div>
                  <div class="deltxt">错误的题号是：<span v-bind:key="index" v-for="(item,index) in falseList">{{item}}&nbsp;</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from './head'
export default {
  name: 'zxcs',
  components: {
    MyHeader
  },
  data () {
    return {
      txNum: '0',
      ansShow: false,
      stList: [],
      hour:1,
      minutes:0,
      seconds:0,
      stuAnw:[],
      rightAnw:[],
      score:0,
      gradeShow:false,
      falseList:[],
      time:null,
      sjName:'',
      qusId:1
    }
  },
  methods:{
    close (id) {
      this.gradeShow = false
    },
    // 倒计时 暂时没用
    num(n) {
      // 倒计时结束重新刷新页面
      if (this.hour === 0 && this.minutes === 0 && this.seconds === 2) {
        this.$message.warning('倒计时结束!即将刷新页面!');
      }
      if (this.hour === 0 && this.minutes === 0 && this.seconds === 0) {
        window.location.reload();
      }
      return n < 10 ? '0' + n : '' + n;
    },
    // 倒计时
    timer() {
      var _this = this;
      _this.time = window.setInterval(function (params) {
        if(_this.seconds === 0 && _this.minutes != 0){
          _this.seconds = 59;
          _this.minutes -=1;
        }
        else if (_this.seconds === 0 && _this.minutes === 0 && _this.hour != 0){
          _this.seconds = 59;
          _this.minutes = 59;
          _this.hour -= 1;
          if(_this.hour <= 0){
            _this.hour == 0;
          }
        }
        else if (_this.seconds === 0 && _this.minutes === 0 && _this.hour === 0){
          _this.seconds = 0;
          window.clearInterval(time) //取消定时器
        }else {
          _this.seconds -= 1;
        }
      },1000)
    },
    //提交测试
    subTest(){
      this.falseList = []
      this.score = 0
      console.log(this.stuAnw)
      for(var i=0;i<this.stList.length;i++){
        if(this.stuAnw[i] === this.stList[i].answer){
          this.score += this.stList[i].score; //分数
        }else{
          this.falseList.push(i+1) //错题号
        }
      }
      console.log(this.score)
      this.gradeShow = true
      window.clearInterval(this.time)
    }
  },
  mounted () {
    var name = sessionStorage.getItem('username')
    let formData = new FormData()
    formData.append('username', name)
    // 请求测试数据
    this.$axios({
    method: 'post',
    url: '/test/create',
    data:'wgj'
    }).then((res) => {
    console.log('数据是：', res)
    this.stList = []
    for(var i in res.data.list){ // i 对象的属性 res.data.list[i] 属性的值
        var aa = i
        for(let j=0;j<res.data.list[i].length;j++){
            this.stList.push(res.data.list[i][j])
        }
    }
    this.sjName = res.data.testName
    //时间匹配
    switch (res.data.duration) { //'0.5小时','1小时','1.5小时','2小时'
      case '0.5小时':
        this.hour = 0;this.minutes = 30;this.seconds = 0;
        break;
      case '1小时':
        this.hour = 1;this.minutes = 0;this.seconds = 0;
        break;
      case '1.5小时':
        this.hour = 1;this.minutes = 30;this.seconds = 0;
        break;
      default:
        this.hour = 2;this.minutes = 0;this.seconds = 0;
        break;
    }
    this.timer();
    }).catch((e) => {
        console.log('在线测试请求数据失败')
    })
  },
  watch: { // no
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
  },
  computed: {// no
    // 倒计时
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    },
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
      padding: .07rem .2rem;
      .learnCer{
        width:11rem;
        height: 100%;
        margin: 0 auto;
        .djs{
          width: 20%;
          height:.36rem;
          float: left;
          // background: red;
          line-height: .36rem;
          font-size: .18rem;
          color:#fff;
        }
        .cue{
          width: 50%;
          height:.36rem;
          float: left;
          line-height: .36rem;
          font-size: .14rem;
          color:#fff;
        }
        .submit{
          width:5%;
          height:.36rem;
          background: #fff;
          text-align: center;
          line-height: .36rem;
          color: #6c72f3;
          font-size: .15rem;
          float: right;
          cursor: pointer;
        }
        .score{
          width:10%;
          height:.36rem;
          text-align: center;
          line-height: .36rem;
          color: #fff;
          font-size: .18rem;
          float: right;
        }
      }
    }
    .learnCon{
      width:11rem;
      height:100%;
      background: #fff;
      margin: 0 auto;
      padding: .2rem;
      border-top:.01rem solid #ddd;
      overflow: auto;
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
          div{
            display: inline;
          }
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
          font-size: .18rem;
          color:#333;
        }
      }
    }
    .grade{
      position: fixed;
      background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
      left:0;
      top:0;
      right:0;
      bottom:0;
      z-index: 999;
      .delCon{
          width:4.4rem;
          height:3rem;
          position: absolute;
          background: #7d8ef7;
          top:10%;
          left:50%;
          transform:translate(-50%,50%);
          .editTop{
              width:100%;
              height:.36rem;
              margin-bottom: .2rem;
              .topTxt{
                  width: 80%;
                  height: 100%;
                  float: left;
                  font-size:.16rem;
                  color:#fff;
                  line-height: .36rem;
                  padding-left: .1rem;
              }
              .topImg{
                  width: 20%;
                  height:100%;
                  float: left;
                  padding-right: .05rem;
                  padding-top: .05rem;
                  cursor: pointer;
                  img{
                      display: block;
                      width:.2rem;
                      height: .2rem;
                      float: right;
                  }
              }
          }
          .txtMid{
            width:100%;
            height:1rem;
            margin-top: .7rem;
            .deltxt{
              width:100%;
              height:.3rem;
              margin-bottom: .2rem;
              text-align: center;
              font-size: .2rem;
              color:#fff;
              padding: 0 .1rem;
            }
          }
      }
    }
}
</style>
