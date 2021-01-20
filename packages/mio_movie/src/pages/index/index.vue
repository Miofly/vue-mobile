<template>
	<view class="u-skeleton container" v-if="ggkz">
		正常页面
		<!--骨架屏-->
		<m-skeleton :animation="true" :border-radius="10" :loading="loading" bg-color="rgb(250, 250, 250)"
		            el-color="#e5e5e5"></m-skeleton>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonGet } from '@/api'
import { State } from 'vuex-class'

@Component({})
export default class extends Vue {
	@State('spgg', { namespace: 'root' }) spgg
	@State('ptgg', { namespace: 'root' }) ptgg
	@State('cpgg', { namespace: 'root' }) cpgg
	@State('jlgg', { namespace: 'root' }) jlgg
	@State('ggkz', { namespace: 'root' }) ggkz
	@State('footabs', { namespace: 'center' }) footabs
	
	baseConfig: any = {
		baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
		bg: '/static/images/bg.png',
		avatar: '/static/images/avatar.png',
	}
	
	loading: boolean = true
	rewardedVideoAd: any = null
	interstitialAd: any = null
	
	pageCur: string = this.footabs[2].type
	
	created () {
		if (wx.createInterstitialAd) {
			this.rewardedVideoAd = wx.createRewardedVideoAd({
				adUnitId: this.$store.state.root.jlgg
			})
			this.rewardedVideoAd.onLoad(() => {
				console.log('激励广告加载成功')
			})
			this.rewardedVideoAd.onError((err) => {
				console.log('激励广告出错', err)
			})
			this.rewardedVideoAd.onClose((res) => {
				console.log(res, '用户关闭广告')
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束，可以下发游戏奖励
				} else {
					this.$mio.mioRoot.showToast('视频未观看完成')
					// 播放中途退出，不下发游戏奖励
				}
			})
			
			this.interstitialAd = wx.createInterstitialAd({
				adUnitId: this.$store.state.root.cpgg
			})
			this.interstitialAd.onLoad(() => {
				console.log('插屏广告加载成功')
			})
			this.interstitialAd.onError((err) => {
				console.log('插屏广告加载出错', err)
			})
			this.interstitialAd.onClose(() => {
				console.log('插屏广告关闭')
			})
		}
		
		this.getData()
	}
	
	navChange (num: number): void {
		this.pageCur = this.footabs[num].type
	}
	
	// 获取初始数据
	async getData () {
		const { data, code } = await commonGet(`/getSignInData?uuid=${ this.$store.state.root.uuid }`)
		console.log('初始数据：', data)
		if (code == 200) {
			this.loading = false
			
		}
	}
	
	goRecord () {
		this.$mio.mioRoot.throttle(() => {
			this.$mio.mioRoot.push('/pages/index/record')
		})
	}
}
</script>

<style lang="scss">

</style>
