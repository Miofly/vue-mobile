import Vue from 'vue'
import App from './App.vue'
import mio from '../../modules/common'
import store from './store'

/*
* <dy v-if="pageCur==footabs[0].type"></dy>
 <lxj v-if="pageCur==footabs[1].type"></lxj>
 <mvIndex v-if="pageCur==footabs[2].type"></mvIndex>
 <zy v-if="pageCur==footabs[3].type"></zy>
 <dm v-if="pageCur==footabs[4].type"></dm>
*
* */

import modalCenter from './pages/movie/mvIndex.vue'
import moduleOne from './pages/movie/home.vue'
import moduleTwo from './pages/movie/home.vue'

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
