import Vue from 'vue'
import App from './App.vue'
import store from './store'
import mio from '../../modules/common'
import modalCenter from './pages/center/home.vue'
import moduleOne from './pages/moduleOne/home.vue'
import moduleTwo from './pages/moduleTwo/home.vue'

Vue.use(mio)
Vue.component('modalCenter', modalCenter)
Vue.component('moduleOne', moduleOne)
Vue.component('moduleTwo', moduleTwo)

Vue.config.productionTip = false

// new App().$mount()
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
