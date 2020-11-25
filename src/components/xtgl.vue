<template>
    <div>
        <my-header></my-header>
        <my-navt></my-navt>
        <router-view></router-view>
    </div>
</template>

<script>
import MyHeader from './head'
import MyNavt from './navt'
export default {
  name: 'xtgl',
  components: {
    MyHeader,
    MyNavt
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

</style>
