import Vue from 'vue'
import App from './App'

import store from './store' // 引入vuex
// import {RouterMount} from 'uni-simple-router' // 类似vue-router的组件
// import Router from '@/router'
// 两个公用js
import {ui} from '@/common/js/uniapp'

Vue.prototype.ui = ui
// Vue.prototype.router = Router

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})

app.$mount() // 为了兼容小程序及app端必须这样写才有效果
