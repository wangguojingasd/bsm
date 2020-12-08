<template>
    <div class="navtCon">
        <router-link v-bind:to="toList[i]" tag="div" v-for="(item,i) in testList" :key="i" class="navtList" :class="{select:i==isSelect}" @click.native="dian(i)">{{item}}</router-link>
    </div>
</template>

<script>
export default {
  name: 'testnav',
  data () {
    return {
      isSelect: false,
      testList:['试卷设置'],
      toList: ['/testSet']
    }
  },
  methods: {
    dian (index) {
      this.isSelect = index // 传回当前点击元素的下标
      sessionStorage.setItem('isSelectMin',this.isSelect) //存储状态 解决页面刷新消失
      if(index != 0){
        sessionStorage.setItem('txId',index)
      }
    },
    dataGet(){
      var selList = JSON.parse(sessionStorage.getItem('seltxList'))
      this.isSelect = sessionStorage.getItem('isSelectMin')
      for (let i = 0; i < selList.length; i++) {
        this.testList.push(selList[i].name)
      }
      for(let j = 0; j < selList.length; j++){
        this.toList.push('/titleDisplay')
      }
    }
  },
   mounted () {
    this.dataGet()
  }
}
</script>

<style scoped lang="scss">
.navtCon{
    width:2rem;
    height:100%;
    background: #7d8ef7;
    float: left;
    .navtList{
        width:100%;
        height:.4rem;
        line-height: .4rem;
        color:#fff;
        font-size: .18rem;
        padding-left: .3rem;
        cursor: pointer;
    }
    .navtList:hover{
        background:#6c72f3;
    }
    .select{
        background:#6c72f3;
    }
}
</style>
