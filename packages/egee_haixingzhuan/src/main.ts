import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store'
import mio from '../../modules/common'

import lz_index from '@/pages/appletsFront/index/index.vue'
import lz_rank from '@/pages/appletsFront/index/rank.vue'
import lz_team from '@/pages/appletsFront/index/team.vue'
import lz_user from '@/pages/appletsFront/index/user.vue'

Vue.prototype.$store = store
Vue.use(mio)

Vue.component('lz_index', lz_index)
Vue.component('lz_team', lz_team)
Vue.component('lz_user', lz_user)
Vue.component('lz_rank', lz_rank)

Vue.config.productionTip = false

// new App().$mount()
// @ts-ignore
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
