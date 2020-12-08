<template>
    <div class="navtCon">
        <router-link v-bind:to="toList[i]" tag="div" v-for="(item,i) in list" :key="item" class="navtList" :class="{select:i==isSelect}" @click.native="dian(i)">{{item}}</router-link>
    </div>
</template>

<script>
export default {
  name: 'navt',
  data () {
    return {
      isSelect: false,
      list: [ '用户管理', '新增用户' ],
      toList: ['/userMan', 'addUser']
    }
  },
  methods: {
    dian (index) {
      this.isSelect = index // 传回当前点击元素的下标
      sessionStorage.setItem('isSelect',this.isSelect) //存储状态 解决页面刷新消失
    }
  },
  mounted(){
    this.isSelect = sessionStorage.getItem('isSelect')
  }
}
</script>

<style scoped lang="scss">
.navtCon{
    width:2.5rem;
    height:91%;
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
