<template>
    <div>
        <my-header></my-header>
        <my-navu></my-navu>
        <router-view></router-view>
    </div>
</template>

<script>
import MyHeader from './head'
import MyNavu from './navu'
export default {
  name: 'yhgl',
  components: {
    MyHeader,
    MyNavu
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

</style>
