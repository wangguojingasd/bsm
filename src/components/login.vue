<template>
    <div class="bsm">
        <div class="tit">沈阳理工大学 信息科学与工程学院</div>
        <div class="loginMain">
            <div class="logTit logTit1">数据库原理与应用课程</div>
            <div class="logTit logTit2">通用学习与测试平台</div>
            <div class="logIn">
                <div class="inTit">
                    <div class="inTitLeft">欢迎使用</div>
                    <div class="inTitRight">通用学习测试平台</div>
                </div>
                <div class="loInput">
                    <img class="oneImg" src="../assets/user.png" alt="">
                    <img class="twoImg" src="../assets/pass.png" alt="">
                    <input type="text" placeholder="请输入用户名" id="name" v-model="formMess.account">
                    <input type="text" placeholder="请输入密码" id="pass" v-model="formMess.pwd">
                    <router-link :to="{path:'/bsmMain'}" class="inputBtn" tag="div" @click.native="onSubmit()">登录</router-link>
                    <!-- <div class="inputBtn" @click="onSubmit()">登录</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      formMess: {
        'account': '',
        'pwd': ''
      },
      loginStatus: false
    }
  },
  methods: {
    login () {
    //   CommonKit.login.status(projectPath).then(json => {
    //       // 判断登录状态
    //       if (json.status) {
    //         this.loginStatus = true
    //       } else {
    //         this.loginStatus = false
    //       }
    //   }
      this.loginStatus = true
    //   if (this.loginStatus) {
    //     console.log('11111')
    //     window.location.href = '/bsmMain'
    //   }
    },
    onSubmit () {
      let formData = new FormData()
      formData.append('username', this.formMess.account)
      formData.append('password', this.formMess.pwd)
      this.$axios({
        method: 'post',
        url: '/users/login',
        data:formData
      }).then((res) => {
        console.log('数据是：', res)
      }).catch((e) => {
          console.log('数据获取失败')
        })
    },
    mounted () {
      // this.login()
    }
  }
}
</script>

<style scoped lang='scss'>
    .bsm{
        width:100%;
        height: 100%;
        background: url('../assets/bg.jpg') no-repeat center;
        overflow: hidden;//解决子元素margin带来的影响
        .tit{
            width:50%;
            height: .3rem;
            overflow: hidden;
            font-size: .16rem;
            color: #fff;
            text-align: left;
            margin-top: .1rem;
            margin-left: .1rem;
        }
        .loginMain{
            width:3.27rem;
            height:4.5rem;
            margin: 0 auto;
            margin-top:10%;
            overflow: hidden;
            .logTit{
                width:100%;
                height: .36rem;
                overflow: hidden;
                text-align: center;
                font-size: .3rem;
                color:#fff;
                margin-bottom: .1rem;
            }
            .logIn{
                width:100%;
                overflow: hidden;
                background: #fff;
                border:.01rem solid #e6e6e6;
                box-sizing: border-box;//边框计算在div宽度内
                padding:.5rem .2rem;
                .inTit{
                    width: 100%;
                    height:.75rem;
                    .inTitLeft{
                        width:37%;
                        height:100%;
                        float: left;
                        color:#7177f3;
                        font-size: .26rem;
                        // display: inline; //块元素转换成行元素
                    }
                    .inTitRight{
                        width:55%;
                        height:100%;
                        float: right;
                        color:#333;
                        font-size: .18rem;
                        padding-top: .1rem;
                    }
                }
                .loInput{
                    width:100%;
                    height:1.7rem;
                    position: relative;
                    font-size: 0;//解决input上方出现的空隙问题
                    .oneImg,.twoImg{
                        width:.18rem;
                        height:.18rem;
                        position: absolute;
                        top:5%;
                        left:2%;
                    }
                    .twoImg{
                        top:37.6%;
                    }
                    input{
                        width: 2.84rem;
                        height: .35rem;
                        padding-left: .3rem;
                        box-sizing: border-box;
                        background: 0 0;
                        line-height: .35rem;
                        font-size: 16px;
                        color: #333;
                        border: 1px solid #ddd;
                        margin-bottom: .2rem;
                    }
                    .inputBtn{
                        width: 2.84rem;
                        height: .35rem;
                        background: #6e75f2;
                        text-align: center;
                        font-size: .18rem;
                        color:#fff;
                        line-height: .35rem;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
