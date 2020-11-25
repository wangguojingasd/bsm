<template>
    <div class="bsmIndex">
        <div class="binTit">数据库通用学习与测试平台</div>
        <div class="biMain">
            <div class="mainCon">
                <router-link :to="{path:'/xtgl'}" tag="div" class="mainList">
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
                <router-link :to="{path:'/yhgl'}" tag="div" class="mainList">
                    <img src="../assets/i4.png" alt="">
                    <div class="listTxt">用户管理</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'bsmMain',
  data () {
    return {

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
}
</style>
