import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import analysis from '@/views/dashboard/analysis'
import monitoring from '@/views/dashboard/monitoring'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'analysis',
            component: analysis
        },
        {
            path: '/index',
            name: 'Index',
            component: index,
            children: [{
                    path: '/analysis', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
                    name: 'analysis',
                    component: analysis
                },
                {
                    path: '/monitoring',
                    name: 'monitoring',
                    component: monitoring
                }
            ]
        }
    ]
})