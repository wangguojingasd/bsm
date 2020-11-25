<template>
    <div class="navtCon">
        <!-- <div :to="{path:'/testSet'}" class="navtList" @click.native="dian(i)">试卷设置</div> -->
        <router-link v-bind:to="toList[i]" tag="div" v-for="(item,i) in list" :key="item" class="navtList" :class="{select:i==isSelect}" @click.native="dian(i)">{{item}}</router-link>
    </div>
</template>

<script>
export default {
  name: 'testnav',
  data () {
    return {
      isSelect: false,
      list: [ '试卷设置', '单项选择题', '填空题', '简答题' ],
      toList: ['/testSet', '/titleDisplay', '/titleDisplay', '/titleDisplay']
    }
  },
  methods: {
    dian (index) {
      this.isSelect = index // 传回当前点击元素的下标
    }
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
