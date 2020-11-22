import Vue from 'vue'
import App from './App.vue'

import store from './store'

import mio from '../../modules/common'

import modalCenter from './pages/center/home.vue'
import modalOne from './pages/modalOne/home.vue'
import modalTwo from './pages/modalTwo/home.vue'

import zsIndex from './pages/modalOne/zsQuestion/index.vue'
import zsCommit from './pages/modalOne/zsQuestion/commit.vue'
import zsModule from './pages/modalOne/zsQuestion/module.vue'
import zsRecommend from './pages/modalOne/zsQuestion/recommend.vue'
import zsWebview from './pages/modalOne/zsQuestion/webview.vue'

// import dm from './pages/modalOne/movie/dm.vue'
// import dy from './pages/modalOne/movie/dy.vue'
// import mvIndex from './pages/modalOne/movie/mvIndex.vue'
// import lxj from './pages/modalOne/movie/lxj.vue'
// import zy from './pages/modalOne/movie/zy.vue'

import siIndex from './pages/modalOne/signIn/index.vue'
import siMore from './pages/modalOne/signIn/more.vue'
import siRecord from './pages/modalOne/signIn/record.vue'

import lz_index from './pages/modalOne/appletsFront/index/index.vue'
import lz_rank from './pages/modalOne/appletsFront/index/rank.vue'
import lz_team from './pages/modalOne/appletsFront/index/team.vue'
import lz_user from './pages/modalOne/appletsFront/index/user.vue'


Vue.prototype.$store = store
Vue.use(mio)

Vue.component('modalCenter', modalCenter)
Vue.component('modalOne', modalOne)
Vue.component('modalTwo', modalTwo)

Vue.component('zsIndex', zsIndex)
Vue.component('zsCommit', zsCommit)
Vue.component('zsModule', zsModule)
Vue.component('zsRecommend', zsRecommend)
Vue.component('zsWebview', zsWebview)

// Vue.component('dm', dm)
// Vue.component('dy', dy)
// Vue.component('mvIndex', mvIndex)
// Vue.component('lxj', lxj)
// Vue.component('zy', zy)

Vue.component('siIndex', siIndex)
Vue.component('siMore', siMore)
Vue.component('siRecord', siRecord)

Vue.component('lz_index', lz_index)
Vue.component('lz_team', lz_team)
Vue.component('lz_user', lz_user)
Vue.component('lz_rank', lz_rank)

Vue.config.productionTip = false

// new App().$mount()
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
