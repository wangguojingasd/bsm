<template>
    <div class="headCon">
        <router-link :to="{path:'/bsmMain'}" tag="div" class="headTxt">学习管理系统</router-link>
        <router-link :to="{path:'/'}" tag="div" class="headExit">
            <img src="../assets/exit.png" alt="">
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'bsmhead',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.headCon{
    width:100%;
    height: .6rem;
    background: #fff;
    z-index: 111;
    .headTxt{
        width:30%;
        height: 100%;
        float: left;
        padding-left: .1rem;
        font-size: .2rem;
        color:#333;
        line-height: .6rem;
        cursor: pointer;
    }
    .headExit{
        width:3%;
        height: 100%;
        float: right;
        padding-top: .21rem;
        cursor: pointer;
        img{
            display: block;
            width:.18rem;
            height:.18rem;
        }
    }
}
</style>
