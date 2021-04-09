<template>
    <div class="navtCon">
        <router-link :to="{path:toList[i],a:{name:'zhang'}}" tag="div" v-for="(item,i) in testList" :key="i" class="navtList" :class="{select:i==isSelect}" @click.native="dian(i,item)">{{item}}</router-link>
        <!-- a:{name:'zhang'}测试router-link传递数据 -->
    </div>
</template>

<script>
export default {
  name: 'testnav',
  data () {
    return {
      isSelect: false,
      testList:['试卷设置'],
      toList: ['/testSet'],
      txList:{}
    }
  },
  props: ["resArr"],
  watch:{
    resArr: function (val) {
        this.testList = ['试卷设置']
        this.txList = val // 接收父组件的值
        console.log(this.txList)
        for(var i in this.txList){
          this.testList.push(i)
        }
        console.log(this.testList)
        var count = this.testList.length - 1
        for(let j = 0; j < count; j++){
          this.toList.push('/titleDisplay')
        }
        this.isSelect = sessionStorage.getItem('isSelectMin')
      }
  },
  methods: {
    dian (index,item) {
      this.isSelect = index // 传回当前点击元素的下标
      sessionStorage.setItem('isSelectMin',this.isSelect) //存储状态 解决页面刷新消失
      if(index != 0){
        sessionStorage.setItem('txName',item)
        sessionStorage.setItem('txId',index)
      }
    }
  },
   mounted () {
     
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
