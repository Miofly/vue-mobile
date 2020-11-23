import Vue from 'vue'
import App from './App'


import '@/common/css/module/font-awesome.css' // font-awesome图标
import store from './store' // 引入vuex
// import {RouterMount} from 'uni-simple-router'
// import routerLink from '../node_modules/uni-simple-router/component/router-link.vue'
import {ui} from '@/common/js/uniapp'
import {tu} from '@/common/js/toolUtils'
// import Router from '@/router'

import MescrollBody from 'zj/mescroll-uni/mescroll-body.vue'
import MescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// require('mioJs/utils/mtj-wx-sdk.js')
Vue.prototype.ui = ui
Vue.prototype.tu = tu
// Vue.prototype.router = Router
// Vue.component('router-link', routerLink)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})


app.$mount() // 为了兼容小程序及app端必须这样写才有效果
