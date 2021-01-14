import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态
const state = {
    // token
    token: '',
    // 用户信息
    userInfo: {},
    // 数量
    count: 0
}
// mutations 中文意思是变化
const mutations = {
    incerment (state, value) {
      state.count += value
    }
}
// vuex 的核心 store(仓库)
const store = new Vuex.Store({
    // state: state,
    // mutations; mutations
    // 根据es6规范  键值同名 可以使用简写 如下：
    state,
    mutations
})
export default store
