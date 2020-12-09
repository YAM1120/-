import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import analysis from '@/views/dashboard/analysis'
import monitoring from '@/views/dashboard/monitoring'
import personal from '@/views/personal/personal'
import login from '@/views/login/login'
// import personalSetting from '@/views/personal/personalSetting'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: login
        },
        {
            path: '/index',
            name: 'Index',
            component: index,
            children: [{
                    path: '/analysis', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
                    name: 'analysis',
                    meta: {
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    },
                    // component: analysis,
                    component: () =>
                        import ( /* webpackChunkName: "demo" */ '@/views/dashboard/analysis.vue') //按需加载

                },
                {
                    path: '/monitoring',
                    name: 'monitoring',
                    meta: {
                        requireAuth: true
                    },
                    // component: monitoring
                    component: () =>
                        import ( /* webpackChunkName: "demo" */ '@/views/dashboard/monitoring.vue')
                },
                {
                    path: '/personal',
                    name: 'personal',
                    meta: {
                        requireAuth: true
                    },
                    // component: personal
                    component: () =>
                        import ( /* webpackChunkName: "demo" */ '@/views/personal/personal.vue')
                },
                // {
                //     path: '/personalSetting',
                //     name: 'personalSetting',
                //     component: personalSetting
                // }
            ]
        }
    ]
})