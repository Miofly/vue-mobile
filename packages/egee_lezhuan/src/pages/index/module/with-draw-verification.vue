<template>
	<view class="bg-white">
		<view class="full-width text-xl text-center text-bold text-white"
		      style="height: 100rpx;line-height: 100rpx;padding: 0!important;position: fixed;top: 0;left: 0;z-index: 999999;background: red">
			<view @click="testOne" class="fa fa-angle-left fa-2x fl margin-left text-white"
			      style="line-height: 100rpx"></view>
			提现验证
		</view>
		<view style="height: 100rpx"></view>

		<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
			<view v-for="(item, index) in [{ name: '列表一', icon: 'navicon' },
		    { name: '列表1一', icon: 'address-card' },
		    { name: '列表2一', icon: 'power-off' },
		    { name: '列表3一', icon: 'user-plus' },
		    { name: '列表4一', icon: 'commenting' }]" :key="index" class="cu-item">
				<view class="content">
					<view>
						<!--<image :src="`/static/images/haixing/${item.icon}.png`" style="width: 40rpx;height: 40rpx"></image>-->
						<text class="">{{ item.name }}</text>
					</view>
				</view>
				<view v-if="true" class="action">
					<input class="margin-top text-right" :value="slogan" @input="test" :focus="false" :password=false
					       placeholder="请输入公告"
					       maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
		</view>

		<view class="margin-top-xxl margin-left">
			<view style="color: #666666;font-size: 14px">注意事项</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				1.每人每天提现1次，审核工作日时间9:00-21:00
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				2.提现1分钟内到账，如遇节假日与双休日顺延
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				3.提现成功后可在支付宝/微信-我的-账单查看到账详情
			</view>
		</view>

		<view @tap="withdraw" class="flex justify-center margin-top-bottom-ten">
			<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
			       src="/static/images/lz/lijitixian@2x.png"
			       style="width: 430rpx;height: 92rpx"></image>
		</view>
	</view>
</template>

<script>
/* eslint-disable */
import {
	commonPost
} from '@/api'

export default {
	data() {
		return {
			regInfos: {
				mobile: '',
				msgCode: '',
				type: 1001
			},

			overage: 9.01,
			disabled: false,
			codeMess: '获取验证码',

			modalStatusTwo: false,
			modalStatus: false,
			wx: 'hongbao1322',
			moneyIndex: 0,
			lists: [
				{ amount: '10' },
				{ amount: '20' },
				{ amount: '50' },
				{ amount: '100' },
				{ amount: '200' },
				{ amount: '500' },
			],
			downOption: {
				auto: false,
				textInOffset: '下拉刷新',
				textOutOffset: '释放更新',
				textLoading: '正在拼命的加载中 ...',
			},
			slogan: '该团长还未设置口号',
			teamName: '',
			inviter_code: '',
			member_nums: '',
			team_captain_name: '',
			dataOneList: [],
			dataOneHour: [],
			dataOneClick: [],
			total_clickOne: 0,
		}
	},
	// async onPullDownRefresh () {
	//     this.dataOneList = []
	//     this.dataOneHour = []
	//     this.dataOneClick = []
	//     const dataOne = await commonPost('/team/team-click-trend')
	//     uni.stopPullDownRefresh()
	//     this.dataOneList = dataOne.data.list
	//     this.total_clickOne = dataOne.data.total_click
	//     for (let i = 0; i < this.dataOneList.length; i++) {
	//         this.dataOneHour.push(this.dataOneList[i].trans_hour)
	//         this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total))
	//     }
	//     this.ui.showToast('刷新成功')
	// },
	methods: {
		withdraw () {
			if (this.overage < this.lists[this.moneyIndex].amount) {
				this.modalStatus = true
			} else {
				this.modalStatusTwo = true
			}
		},
		async btnSend() {
			if (!this.disabled) {
				if (this.regInfos.mobile.trim() == '') {
					this.ui.showToast('手机号不能为空')
					return
				}
				const data = await commonPost('/bus/send', this.regInfos)
				console.log(data)
				this.ui.showToast(data.message)

				if (data.code == 200) {
					this.disabled = true
					this.codeMess = '请稍候...'
					setTimeout(() => {
						this.doLoop(60)
					}, 500)
				}
			}
		},
		doLoop(seconds) {
			seconds = seconds || 60
			this.codeMess = seconds + 's后获取'
			const countdown = setInterval(() => {
				if (seconds > 0) {
					this.codeMess = seconds + 's后获取'
					--seconds
				} else {
					this.codeMess = '获取验证码'
					this.disabled = false
					clearInterval(countdown)
				}
			}, 1000)
		},
		delVals(val) {
			this.regInfos[val] = ''
		},
		goWeixin () {
			this.tu.getClipboardData(this.wx)
			this.tu.jumpWX()
		},
		chooseMoney (index) {
			this.moneyIndex = index
		},
		onUnLoad () {
			// this.router.replace({name: 'lz_home'})
			uni.redirectTo({
				url: '/pages/index/index/home'
			});
		},
		testOne () {
			uni.redirectTo({
				url: '/pages/index/index/home'
			});
		},
		test (e) {
			this.slogan = e.target.value
		},
		async downCallback() {
			this.dataOneList = []
			this.dataOneHour = []
			this.dataOneClick = []
			const dataOne = await commonPost('/team/team-click-trend')
			this.dataOneList = dataOne.data.list
			this.total_clickOne = dataOne.data.total_click
			for (let i = 0; i < this.dataOneList.length; i++) {
				this.dataOneHour.push(this.dataOneList[i].trans_hour)
				this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total))
			}
			this.mescroll.endDownScroll()
			this.ui.showToast('刷新成功')
		},
		async giveSlogan() {
			const data = await commonPost('/team/release-notice', {slogan: this.slogan})
			// console.log(data)
			if (data.code == 200) {
				this.ui.showToast('发布成功')
			} else {
				this.ui.showToast(data.message)
			}
			// console.log(this.slogan)
		},
	},
}
</script>

<style>
>>>.mio-modal-box{padding: 0!important;}
>>>#mtwo .mio-modal-box{width: 90%!important;}
.upwarp-tip{display: none!important;}
page{
	background: white;
}
</style>
