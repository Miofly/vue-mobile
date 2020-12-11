<template>
	<view class="padding-xl full-width-height" :style="{backgroundImage: 'url('+ infoConfig.bg +')'}"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">
		<view class="full-width text-white">
			<view class="full-width" :style="{backgroundImage: 'url('+ infoConfig.bg1 +')'}"
			      style="position: relative;background-repeat:no-repeat;background-size: 87% 164rpx;height: 164rpx">
				<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="height: 124rpx;width: 124rpx;position: relative;top: 20rpx;left: 34rpx"
				:style="{backgroundImage: is_first ? 'url('+ infoConfig.defaultAvatar +')' : 'url('+ avatar +')'}"></view>
				<view class="text-20" style="position: absolute;left: 186rpx;top: 38rpx">{{is_first? '游客' : name}}</view>
				<view class="text-14" style="position: absolute;left: 186rpx;top: 98rpx;color: #D9DDFF">{{is_first? '暂无占领群' : infoConfig.occupationGroup}}</view>
				<view class="text-12" style="color: #7753FF;position: absolute;left: 410rpx;top: 48rpx">最好成绩：{{is_first? '0' : score}}下</view>
			</view>
		</view>

		<!--玩游戏-->
		<button class="margin-top" open-type="getUserInfo" @getuserinfo="getUserInfo">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" :src="infoConfig.tzImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</button>

		<view class="margin-top">
			<!--排行-->
			<button class="fl" open-type="getUserInfo" @getuserinfo="getUserInfoRank" style="width: 48%;padding-right: 1%">
				<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style=""
						:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
						:shape="['square', 'circle'][0]" :src="infoConfig.heroImg" bgColor="rgba(0, 0, 0, 1)">
					<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
				</m-image>
			</button>
			<!--群挑战-->
			<button class="fr" open-type="getUserInfo" @getuserinfo="getUserInfoGroup"  style="width: 48%;padding-left: 1%">
				<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style=""
						:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
						:shape="['square', 'circle'][0]" :src="infoConfig.groupImg" bgColor="rgba(0, 0, 0, 1)">
					<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
				</m-image>
			</button>
		</view>

		<view style="clear: both"></view>

		<view class="flex justify-between margin-top">
			<!--海报-->
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" @click="goPoster"
					:shape="['square', 'circle'][0]" :src="infoConfig.sportImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<!--客服-->
			<button open-type="getUserInfo" @getuserinfo="getUserInfoGroup"  style="width: 48%;" open-type="contact">
				<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
				         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				         :shape="['square', 'circle'][0]" :src="infoConfig.customerServiceImg" bgColor="rgba(0, 0, 0, 1)">
					<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
				</m-image>
			</button>
		</view>

		<view style="width: 100%;margin: 50rpx 0 50rpx 0">
			<ad ad-intervals="30" unit-id="adunit-60f954ce26ce0f92"></ad>
		</view>
	</view>
</template>

<script lang="ts">
import {
	commonPost, commonGet, commonOtherGet, commonOtherPost
} from '@/api'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({})
export default class extends Vue {
	is_first: boolean = true
	@State('name', { namespace: 'center' }) name
	@State('avatar', { namespace: 'center' }) avatar
	@State('score', { namespace: 'center' }) score

	infoConfig: any = {
		xcx_name: '十秒手速',
		defaultAvatar: '/static/images/touxiang@2x.png',
		occupationGroup: '',
		tzImg: '/static/images/game.png',
		heroImg: '/static/images/hero.png',
		groupImg: '/static/images/group.png',
		sportImg: '/static/images/share.png',
		customerServiceImg: '/static/images/qun.png',
		bg: '/static/images/bg.png',
		bg1: '/static/images/bg1.png',

		ptgg: 'adunit-60f954ce26ce0f92'
	}

	wx:any = {
		appid: 'wx5f036ada6b1ca382',
		secret: '683fecc3c4e99c632b25fefb46480b93',
		session_key: '',
		openid: ''
	}

	async created () {
		wx.getUserInfo({
			success: (res) => {
				console.log(res)
				this.is_first = false
				this.$store.state.center.name = res.userInfo.nickName
				this.$store.state.center.avatar = res.userInfo.avatarUrl
			},
			fail: err => {
				console.log(err)
			}
		})

		this.$store.state.center.open_id = this.$mio.mioRoot.getStorageSync('hand_open_id')
		console.log('当前用户openId：', this.$store.state.center.open_id)
		// 如果存在 open_id 代表已经登录过
		if (this.$store.state.center.open_id != '' && this.$store.state.center.open_id != null) {
			const { data } = await commonPost('/login-info', { open_id: this.$store.state.center.open_id })
			console.log('获取用户信息：', data)
			this.$store.state.center.score = data.id
			this.infoConfig.occupationGroup = data.id
		} else { // 调用微信登录
			wx.login({
				success: async (res) => {
					if (res.code) {
						const data= await commonOtherGet(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.wx.appid}&secret=${this.wx.secret}&js_code=${res.code}&grant_type=authorization_code`)
						this.wx.openid = data.openid
						this.wx.session_key = data.session_key
						this.$mio.mioRoot.setStorage('hand_open_id', data.openid)
					} else {
						console.log(`登录失败！${res.errMsg}`)
					}
				}
			})
		}
	}

	async getTrueUserInfo () {
		const { data } = await commonPost('/login-info', { open_id: this.$store.state.center.open_id })
		console.log('获取用户信息：', data)
		this.infoConfig.best_score = data.id
		this.infoConfig.best_score = data.id
	}

	getUserInfoRank (e) {
		if (e.detail.userInfo != undefined) {
			this.is_first = false
			this.$store.state.center.name = e.detail.userInfo.nickName
			this.$store.state.center.avatar = e.detail.userInfo.avatarUrl
			this.goRank()
		}
	}

	getUserInfoGroup (e) {
		if (e.detail.userInfo != undefined) {
			this.is_first = false
			this.$store.state.center.name = e.detail.userInfo.nickName
			this.$store.state.center.avatar = e.detail.userInfo.avatarUrl
			this.goGroup()
		}
	}

	getUserInfo (e) {
		if (e.detail.userInfo != undefined) {
			this.is_first = false
			this.$store.state.center.name = e.detail.userInfo.nickName
			this.$store.state.center.avatar = e.detail.userInfo.avatarUrl
		    this.goPlay()
		}
	}

	goPlay () {
		this.$mio.mioRoot.push('/pages/index/playGame')
	}

	goRank () {
		this.$mio.mioRoot.push('/pages/index/rank')
	}

	goPoster () {
		this.$mio.mioRoot.push('/pages/index/poster')
	}

	goGroup () {
		this.$mio.mioRoot.push('/pages/index/groupChallenge')
	}
}
</script>

<style>
button {
	border: 0 !important;padding: 0!important;background-color: transparent!important;line-height: 0!important;
}
</style>
