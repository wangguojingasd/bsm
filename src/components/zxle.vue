<template>
    <div class="learnMain">
        <my-header></my-header>
        <div class="learnTop">
            <div class="topCon">
                <div class="inputCon">
                    <label for="">选择题型：</label>
                    <select name="" id="">
                        <option v-bind:key="index" v-for="(item,index) in txList" value="">{{item.txname}}</option>
                    </select>
                    <label for="">选择章节：</label>
                    <select name="" id="">
                        <option v-bind:key="index" v-for="(item,index) in txList" value="">{{item.zjname}}</option>
                    </select>
                    <label for="">选择难度：</label>
                    <select name="" id="">
                        <option v-bind:key="index" v-for="(item,index) in levList" value="">{{item}}</option>
                    </select>
                </div>
                <div class="tjBtn" @click="lesubmit()">提交</div>
            </div>
        </div>
        <div class="learnCon">
          <div class="tList" v-bind:key="index" v-for="(item,index) in stList">
            <div class="tQues">{{item.ques}}</div>
            <div class="tBtn" @click="look(index)">查看答案</div>
            <div class="tjx" v-show="index == isShow">
              <div class="ans">{{item.ans}}</div>
              <div class="jx">{{item.jx}}</div>
            </div>
          </div>
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
      txList: [
        { txname: '请选择...', zjname: '请选择...', num1: '10', num2: '20', num3: '30' },
        { txname: '单项选择题', zjname: '数据库基础概述好的海的', num1: '10', num2: '20', num3: '30' },
        { txname: '填空题', zjname: 'SQL Sever环境', num1: '10', num2: '20', num3: '30' },
        { txname: '判断题', zjname: 'T-SQL语言', num1: '10', num2: '20', num3: '30' },
        { txname: '简答题', zjname: '触发器及其管理', num1: '10', num2: '20', num3: '30' },
        { txname: '综合应用题', zjname: '存储过程及其管理', num1: '10', num2: '20', num3: '30' },
        { txname: '名词解释', zjname: '管理安全性', num1: '10', num2: '20', num3: '30' }
      ],
      levList: ['请选择...', '难', '中', '易'],
      txNum: '0',
      isShow: -1,
      stList: [
        {ques: '1.数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的', ans: 'A', jx: '数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的'},
        {ques: '2.数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的', ans: 'A', jx: '数据库基础概述好的海的数据库基础概述好的海的数据库基础概述好的海的'}
      ]
    }
  },
  methods: {
    look (index) {
      this.isShow = index
    },
    lesubmit () {
      this.$axios({
      method: 'post',
      url: '/questions/test',
      data:id
      }).then((res) => {
      console.log('数据是：', res)
      }).catch((e) => {
          console.log('在线学习请求数据失败')
      })
    }
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
      height:100%;
      background: #fff;
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
    }
}
</style>
