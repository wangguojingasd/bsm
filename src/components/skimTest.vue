<template>
    <div>
        <my-navt></my-navt>
        <router-view></router-view>
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>
