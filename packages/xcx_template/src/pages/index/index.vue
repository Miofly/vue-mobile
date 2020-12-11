<template>
	<view class="bg-black text-center padding-bottom-ten box full-width-height">
<!--		<lottie :options="defaultOptions" :height="200" :width="200" @animCreated="handleAnimation" />-->
		<canvas id="canvas" type="2d" style="width: 300px;height: 150px"></canvas>

	</view>
</template>

<script lang="ts">
import * as animationData from './test.json'
import { Component, Vue } from 'vue-property-decorator'
import lottie from 'lottie-miniprogram'

@Component({})
export default class index extends Vue {
	baseConfig: any ={
		baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg'
	}

	onLoad () {
		wx.showShareMenu({
			// 只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		})
	}

	onReady () {
		wx.createSelectorQuery().select('#canvas').node(res => {
			const canvas = res.node
			const context = canvas.getContext('2d')
			lottie.setup(canvas)
			lottie.loadAnimation({ // 微信小程序给的接口，调用就完事了，原理不太懂
				loop: true, // 是否循环播放（选填）
				autoplay: true, // 是否自动播放（选填）
				path: 'https://assets1.lottiefiles.com/packages/lf20_ysjldspv/data.json', // lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
				rendererSettings: {
					context// es6语法：等同于context:context（必填）
				}
			})
		}).exec()
	}

	defaultOptions: any = { animationData }
	animationSpeed: any = 1
	anim: any = {}

	handleAnimation (anim) {
		this.anim = anim
		console.log(anim) // 这里可以看到 lottie 对象的全部属性
	}

	onShareAppMessage (res) {
		console.log(res)
		return {
			title: '测试分享',
			path: '/pages/index/index',
			complete: (resNew) => {
				console.log(resNew)
				if (res.errMsg == 'shareAppMessage:ok') {
					// 分享为按钮转发
					// if (_this.data.shareBtn) {
					// 	// 判断是否分享到群
					// 	if (res.hasOwnProperty('shareTickets')) {
					// 		console.log(res.shareTickets[0])
					// 		// 分享到群
					// 		// _this.data.isshare = 1;
					// 	} else {
					// 		// 分享到个人
					// 		// _this.data.isshare = 0;
					// 	}
					// }
				} else {
					wx.showToast({
						title: '分享失败',
					})
					// _this.data.isshare = 0;
				}
			},
			success: (res1) => {
				console.log(res1)
				if (res1.errMsg == 'shareAppMessage:ok') {
					if (res1.hasOwnProperty('shareTickets')) {
						console.log(res.shareTickets[0])
						// 分享到群
						// that.data.qunshare = 1
						// that.data.geshare = 1
					} else {
						// 分享到个人
						// that.data.geshare = 1
					}
					wx.showToast({
						title: '分享成功',
						icon: 'success',
						duration: 500
					})
					// console.log(`${'shareAppMessage:ok' + 'qun'}${that.data.qunshare}geren${that.data.geshare}`)
				}
			},
			fail: (err) => {
				console.log(err)
				// if (res.errMsg == 'shareAppMessage:fail cancel') {
				// 	wx.showToast({
				// 		title: '分享失败',
				// 		icon: 'loading',
				// 		duration: 500
				// 	})
				// }
				// console.log('shareAppMessage:err')
			}
		}
	}
}
</script>
