<template>
	<view class="padding">
		<ad v-if="zsspgg" :unit-id="zsspgg" ad-type="video" ad-theme="white"></ad>
		<view class="bg-white padding text-center margin-top">
			<textarea v-model="content" placeholder="请输入需要提交的问题" style="height: 100rpx" auto-height></textarea>
			<button @tap="reset" class="cu-btn bg-blue margin-top-lg">重置内容</button>
		</view>
		<button @tap="addQuestion" class="margin-top cu-btn bg-blue block radius">提交问题</button>
		<ad style="margin-top: 50rpx" v-if="ggkz" :unit-id="zsptgg" ad-intervals="30"></ad>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import { debounce, yunFun } from 'uJs/toolUtils'
import { State } from 'vuex-class'

@Component({})
export default class commit extends Vue {
	content: string = ''
	interstitialAd: any = null
	@State('zsspgg', { namespace: 'root' }) zsspgg
	@State('zsptgg', { namespace: 'root' }) zsptgg
	@State('ggkz', { namespace: 'root' }) ggkz

	reset () {
		this.content = ''
	}

	created (): void {
		// #ifdef MP-WEIXIN
		this.interstitialAd = null
		if (wx.createInterstitialAd) {
			this.interstitialAd = wx.createInterstitialAd({
				adUnitId: this.$store.state.root.zscpgg
			})
			this.interstitialAd.onLoad(() => {
				console.log('插屏广告加载成功')
			})
			this.interstitialAd.onError((err) => {
				console.log('插屏广告出错', err)
			})
			this.interstitialAd.onClose(() => {
				console.log('插屏广告关闭')
			})
		}
		setInterval(() => {
			this.interstitialAd.show()
		}, 20000)
		// #endif
	}

	addQuestion = debounce(this.addQuestionOne)

	addQuestionOne () { // eslint-disable-line
		if (this.content.trim()) {
			this.interstitialAd.show()
			yunFun('insertData', {
				dbName: 'error',
				datas: {
					title: this.content
				}
			}, (res) => {
				console.log(res.result.errMsg)
				if (res.result.errMsg === 'collection.add:ok') {
					this.$mio.mioRoot.showToast('收到！待更新！请期待')
				}
			})
		} else {
			this.$mio.mioRoot.showToast('还没有输入问题~~~~')
		}
	}
}

</script>

<style>

</style>
