import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    // state 中存放的就是全局共享的数据
    state: {
        count: 0
    }
})