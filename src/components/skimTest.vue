<template>
    <div>
        <my-navt :resArr='searchVal'></my-navt>
        <router-view @getMessage="showMsg"></router-view>
        <!-- @getMessage="showMsg" 接受子组件传来的内容   :resArr="searchVal" 传给子组件-->
    </div>
</template>

<script>
import MyNavt from './testnav'
export default {
  name: 'skimTest',
  components: {
    MyNavt
  },
  data () {
    return {
      searchVal:''
    }
  },
  methods:{
    showMsg (val) {   // val即为子组件传过来的值
      console.log('子组件传来的值',val)
      this.searchVal = val;
    }
  },
  watch:{
    searchVal :function () {
        console.log('this.searchVal:',this.searchVal)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
