// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css' //element-ui的css
import api from './request/api.js' // 导入api接口
Vue.use(ElementUI) //使用elementUI
Vue.config.productionTip = false
Vue.prototype.$apiList = api // api列表全局变量
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    axios,
    components: {
        App
    },
    template: '<App/>'
})