import Vue from 'vue'
import App from './App'

import lz_index from './pages/index/index/index'
import lz_team from './pages/index/index/team'
import lz_user from './pages/index/index/user'
import lz_rank from './pages/index/index/rank'

import '@/common/css/module/font-awesome.css' // font-awesome图标
import store from './store' // 引入vuex
// import {RouterMount} from 'uni-simple-router'
import {ui} from '@/common/js/uniapp'
import {tu} from '@/common/js/toolUtils'
import axios from 'axios'
import MescrollBody from 'zj/mescroll-uni/mescroll-body.vue'
import MescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.prototype.ui = ui
Vue.prototype.tu = tu

Vue.component('lz_index', lz_index)
Vue.component('lz_team', lz_team)
Vue.component('lz_user', lz_user)
Vue.component('lz_rank', lz_rank)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})


axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('TOKEN_KEY')
        config.headers.Authorization = `${token}`

        return config
    }, error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log(response)
        if (response.data.code !== 200) {
            if (response.data.code == 403) {
                ui.showToast('登录已过期...正在跳转至登录界面...')
                localStorage.removeItem('TOKEN_KEY')
                setTimeout(() => {
                    uni.reLaunch({
                        url:'/pages/index/login/login'
                    })
                    console.log('执行了吗')
                    // Router.replaceAll({name: 'login'})
                }, 2000)

            } else {
                ui.showToast(response.data.message)
            }
        }
        response.data.data.token && localStorage.setItem('TOKEN_KEY', response.data.data.token)
        return response
    }, (error) => {
        console.log('第一个响应拦截器执行fail')
        console.log(error)
        ui.showToast('请求出错')
        // setTimeout(() => {
        //     // Router.replaceAll({name: 'login'})
        //     uni.reLaunch({
        //         url:'/pages/index/login/login'
        //     })
        // }, 2000)
    }
)


app.$mount() // 为了兼容小程序及app端必须这样写才有效果
