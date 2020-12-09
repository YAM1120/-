// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from 'vuex'
import App from "./App";
import router from "./router";
// import store from "./store/index.js";
import axios from "axios";
import ElementUI from "element-ui"; //element-ui的全部组件
import "element-ui/lib/theme-chalk/index.css"; //element-ui的css
import api from "./request/api.js"; // 导入api接口
import LuckDraw from 'vue-luck-draw';
Vue.use(LuckDraw);
Vue.use(ElementUI); //使用elementUI
// Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.$apiList = api; // api列表全局变量
/* eslint-disable no-new */

//路由拦截器 路由跳转前的操作 验证
router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem('coded')
        // 离开页面后清除其他请求
    console.log(window.axiosCancel, "window.axiosCancel");
    let axiosCancel = window.axiosCancel || [];
    axiosCancel.forEach((ele, index) => {
        ele.cancel('取消路由')
        delete window.axiosCancel[index]
    })
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 判断该路由是否需要登录权限
        if (token) {
            // if (appRouters) {
            //   // router.options.routes = [...loginRunter, ...appRouters]
            //   router.addRoutes(appRouters)
            //   next()
            // }
            // 通过vuex state获取当前的token是否存在
            next()
        } else {
            console.log('该页面需要登陆')
            next({
                path: '/'
                    // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})

new Vue({
    el: "#app",
    router,
    axios,
    // store,
    components: {
        App,
    },
    template: "<App/>",
});