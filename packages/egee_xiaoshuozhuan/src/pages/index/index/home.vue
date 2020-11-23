<template>
	<view class="full-width-height">
		<!--<keep-alive>-->
			<lz_index v-if="PageCur===pageOptions[0]"></lz_index>
		<!--</keep-alive>-->
		<!--<keep-alive>-->
			<lz_team v-if="PageCur===pageOptions[1]"></lz_team>
		<!--</keep-alive>-->
		<!--<keep-alive>-->
			<lz_rank  v-if="PageCur===pageOptions[2]"></lz_rank>
		<!--</keep-alive>-->
		<!--<keep-alive>-->
			<lz_user v-if="PageCur===pageOptions[3]"></lz_user>
		<!--</keep-alive>-->
		<view class="cu-bar tabbar bg-white foot">
			<view @click="NavChange" class="action" :data-cur=pageOptions[0]>
				<view class="fa fa-home" :class="PageCur==pageOptions[0]?'text-xyz':'text-gray'"></view>
				<view :class="PageCur==pageOptions[0]?'text-xyz':'text-gray'">{{indexData[0]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[1]>
				<view class="fa fa-users" :class="PageCur==pageOptions[1]?'text-xyz':'text-gray'"></view>
				<view :class="PageCur==pageOptions[1]?'text-xyz':'text-gray'">{{indexData[1]}}</view>
			</view>
			<view v-if="is_team_captain" @click="NavChange" class="action" :data-cur=pageOptions[2]>
				<view class="fa fa-gift" :class="PageCur==pageOptions[2]?'text-xyz':'text-gray'"></view>
				<view :class="PageCur==pageOptions[2]?'text-xyz':'text-gray'">{{indexData[2]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[3]>
				<view class="fa fa-user" :class="PageCur==pageOptions[3]?'text-xyz':'text-gray'"></view>
				<view :class="PageCur==pageOptions[3]?'text-xyz':'text-gray'">{{indexData[3]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
            return {
                PageCur: localStorage.getItem('PageCur') ? localStorage.getItem('PageCur') : 'lz_index',
                indexData: ['首页', '团队', '排行', '我的'],
				pageOptions: ['lz_index', 'lz_team', 'lz_rank', 'lz_user'],
                is_team_captain: 1,
            }
        },
        onLoad () {
			let test = localStorage.getItem('is_team_captain')
			if (test == 1) {
                test = true
                this.is_team_captain = test
			}
            if (test == 0) {
                test = false
                this.is_team_captain = test
            }
            setTimeout(() => {
                this.is_team_captain = test
            }, 0)
            document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, {passive: false})
        },
		onShow () {
            let test = localStorage.getItem('is_team_captain')
            if (test == 1) {
                test = true
                this.is_team_captain = test
            }
            if (test == 0) {
                test = false
                this.is_team_captain = test
            }
            setTimeout(() => {
                this.is_team_captain = test
            }, 0)
        },
        onUnload () {
            // this.route.push({name: 'login'})
            uni.redirectTo({
                url: '/pages/index/login/login'
            })
        },
		onResize () {
		    console.log('onResize')
		},
		beforeCreate () {
		    console.log('beforeCreate')
		},
		created () {
		    console.log('created')
		},
		beforeMount () {
		    console.log('beforeMount')
		},
		mounted () {
			console.log('mounted')
		},
		beforeUpdate () {
		    console.log('beforeUpdate')
		},
		updated () {
		    console.log('updated')
		},
		beforeDestroy () {
		    console.log('beforeDestroy')
		},
		destroyed () {
		    console.log('destroyed')
		},
        methods: {
            NavChange (e) {
                localStorage.setItem('PageCur', e.currentTarget.dataset.cur)
                this.PageCur = e.currentTarget.dataset.cur
            }
        },
    }
</script>
