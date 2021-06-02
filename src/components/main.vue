<template>
    <div class="bsmIndex">
        <div class="binTit">数据库通用学习与测试平台</div>
        <div class="biMain">
            <div class="mainCon">
                <router-link :to="{path:xtManAddress}" tag="div" class="mainList" @click.native="toShow()">
                    <img src="../assets/i1.png" alt="">
                    <div class="listTxt">习题管理</div>
                </router-link>
                <router-link :to="{path:'/zxle'}" tag="div" class="mainList">
                    <img src="../assets/i2.png" alt="">
                    <div class="listTxt">在线学习</div>
                </router-link>
            </div>
            <div class="mainCon">
                <router-link :to="{path:'/zxcs'}" tag="div" class="mainList">
                    <img src="../assets/i3.png" alt="">
                    <div class="listTxt">在线测试</div>
                </router-link>
                <router-link :to="{path:yhManAddress}" tag="div" class="mainList" @click.native="toShow()">
                    <img src="../assets/i4.png" alt="">
                    <div class="listTxt">用户管理</div>
                </router-link>
            </div>
        </div>
        <div class="show" v-show='manShow'>
            <div class="delCon">
                <div class="text1">提示</div>
                <div class="text">您没有权限</div>
                <div class="btn" @click="close()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'bsmMain',
  data () {
    return {
        identity:'',
        xtManAddress:'',
        yhManAddress:'',
        manShow:false
    }
  },
  methods:{
    close () {
        this.manShow = false
    },
    toShow () {
        if(this.identity == 0){
            this.xtManAddress = ''
            this.yhManAddress = ''
            this.manShow = true
        }
    }
  },
  mounted () {
        sessionStorage.setItem('isSelect',0) // 导航默认样式
        this.identity = sessionStorage.getItem('identity') // 获取用户类型 2管理员 1教师 0学生
        if(this.identity != 0){
            this.xtManAddress = '/xtgl'
            this.yhManAddress = '/yhgl'
        }
  }
}
</script>

<style lang="scss" scoped>
.bsmIndex{
    width:100%;
    height:100%;
    background:#fff;
    .binTit{
        width:100%;
        height:1.23rem;
        margin: 0 auto;
        background: #6c72f3;
        text-align: center;
        font-size: .4rem;
        color:#fff;
        line-height: 1.23rem;
        margin-bottom: 1rem;;
    }
    .biMain{
        width:12rem;
        height:67%;
        background: url('../assets/bg1.jpg');
        margin: 0 auto;
        padding:0 2.5rem;
        .mainCon{
            width:100%;
            height: 1.5rem;
            margin-bottom: .8rem;
            .mainList{
                width:2.4rem;
                height:1.5rem;
                background: #7d8ef7;
                padding-top: .28rem;
                float: left;
                cursor: pointer;
                img{
                    display: block;
                    width:.76rem;
                    height:.76rem;
                    margin: 0 auto;
                    margin-bottom: .1rem;
                }
                .listTxt{
                    width:100%;
                    overflow: hidden;
                    text-align: center;
                    font-size:.18rem;
                    color:#fff;
                }
            }
            .mainList:last-child{
                float: right;
            }
        }
    }
    .show{
        position: fixed;
        background: rgba(3,3,3,.3);// 解决子元素对父元素透明度的继承
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index: 999;
        .delCon{
            width:4.4rem;
            height: 1.4rem;
            background: #fff;
            border-radius: 5px;
            border:1px solid #c3c3c3;
            position: absolute;
            top:30%;
            left:50%;
            transform:translate(-50%,50%);
            padding:0 .2rem;
            .text1{
                width:100%;
                height:.2rem;
                font-size: .16rem;
                color: #000;
                margin-top: .16rem;
                margin-bottom: .14rem;
            }
            .text{
                width:100%;
                height:.2rem;
                font-size: .14rem;
                color: #333;
                margin-bottom: .14rem;
            }
            .btn{
                width:.7rem;
                height:.34rem;
                background: #5e76f3;
                font-size: .14rem;
                color: #fff;
                text-align: center;
                line-height: .34rem;
                border-radius: .05rem;
                float: right;
                cursor: pointer;
            }
        }
    }
}
</style>
