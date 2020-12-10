<template>
	<view class="tetx-black text-center padding-bottom-ten box full-width-height">
		测试
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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
