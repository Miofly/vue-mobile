<template>
	<view class="bg-white">
		<view class="full-width text-xl text-center text-bold"
		      style="height: 100rpx;line-height: 100rpx;padding: 0!important;position: fixed;top: 0;left: 0;z-index: 999999;background: white">
			<view @click="testOne" class="fa fa-angle-left fa-2x fl margin-left text-red"
			      style="line-height: 100rpx"></view>
			提现
		</view>
		<view style="height: 100rpx"></view>
		<view class="flex justify-between margin-top-xxl align-end">
			<view class="margin-left-xl">
				<view style="font-size: 14px" class="text-bold">账户余额（元）</view>
				<view style="font-size: 38px;color: #F30A30;font-weight: bolder" class="margin-top-xxl">{{ balance }}</view>
			</view>
			<view style="border-radius: 15px;border: 1px solid #E54D42;width: 176rpx;height: 60rpx;text-align: center;line-height: 60rpx"
			      class="margin-right-xl margin-bottom">
				提现记录
			</view>
		</view>

		<view class="flex text-center flex-wrap justify-around margin-top-ten">
			<view v-for="(item, index) in allow_money" :key="index" style="width: 200rpx;height: 180rpx" class="text-center">
				<view @tap="chooseMoney(index)" :style="{color: moneyIndex==index? 'white' : 'red', background: moneyIndex==index? '#E54D42' : 'rgb(249, 249, 249)'}"
				      style="border: 1px solid rgb(239, 239, 239);border-radius: 35px;height: 140rpx;width: 200rpx;line-height: 140rpx;font-size: 30px;"
				      class="margin-top-xxl text-bold">
					{{ item.label.replace('元', '') }}
					<text style="font-size: 19px;font-weight: normal" class="margin-left-xxl">元</text>
				</view>
			</view>
		</view>

		<view class="fulls-width text-center text-bold">
			<view style="font-size: 16px;" class="margin-bottom">提现方式</view>
			<view style="background: #E54D42;border-radius: 17px;height: 68rpx;width: 244rpx;margin: 0 auto;line-height: 68rpx" class="text-white">支付宝</view>
		</view>

		<view>
			<view v-if="alipay_account==null||alipay_account==''" class="flex justify-around align-center margin-top-xl">
				<view style="height: 60rpx;line-height: 60rpx;width: 200rpx" class="margin-right-ten">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/zhifubao@2x.png"
					       style="width: 60rpx"></image>
					<text style="vertical-align: top;" class="margin-left-xxl">未绑定</text>
				</view>
				<view style="background: #E54D42;text-align: center;color: white;border-radius: 16px;width: 218rpx;height: 56rpx;line-height: 56rpx">绑定账号</view>
			</view>
			<view v-else>
				<view style="height: 60rpx;line-height: 60rpx;width: 200rpx" class="margin-left-ten">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/zhifubao@2x.png"
					       style="width: 60rpx"></image>
					<text style="vertical-align: top;" class="margin-left-xxl">{{ tu.getLocalData('realName') }}</text>
				</view>
			</view>
		</view>

		<view class="margin-top-xxl margin-left">
			<view style="color: #666666;font-size: 14px">注意事项</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				1.每人每天提现1次，审核工作日时间{{timeSection}}
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				2.提现1分钟内到账，如遇节假日与双休日顺延
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				3.提现成功后可在支付宝/微信-我的-账单查看到账详情
			</view>
		</view>

		<view class="flex justify-between align-center margin-top-xl">
			<view style="font-size: 14px;color: #E54D42;" class="margin-left">客服微信：{{ wx }}</view>
			<view @tap="goWeixin" style="width: 219rpx;height: 56rpx;border-radius: 16px;border: 1px solid #E54D42;text-align: center;line-height: 56rpx;color: #E54D42" class="margin-right-xl">
				复制打开微信
			</view>
		</view>

		<view @tap="withdraw" class="flex justify-center margin-top-bottom-ten">
			<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				src="/static/images/lz/lijitixian@2x.png"
				style="width: 430rpx;height: 92rpx"></image>
		</view>

		<modal id="mone" :custom="true" :show="modalStatus" content="这是内容" title="标题" style="padding: 0!important;">
			<view style="height: 164rpx;line-height: 164rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">您余额不足，快去赚钱吧～</view>
			<view style="width: 100%;height: 2px;background: #eee;"></view>
			<view @tap="modalStatus=false" style="height: 100rpx;text-align: center;color: #E54D42;font-size: 18px;line-height: 100rpx">
				马上去赚钱
			</view>
		</modal>

		<modal id="mtwo" :custom="true" :show="modalStatusTwo" content="这是内容" title="标题" style="padding: 0px!important;position: relative">
			<view style="height: 164rpx;line-height: 192rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">提现短信验证</view>
			<view style="height: 100rpx" class="margin-top-xl">
				<view class="fl text-red" style="font-size: 18px;color: #333333;width: 144rpx;height: 80rpx;line-height: 80rpx;margin-left: 36rpx;font-weight: bold">手机号:</view>
				<view style="width: 462rpx;height: 80rpx;border-radius: 20px;border: 1px solid #E54D42;line-height: 80rpx;margin-left: 180rpx" class="">
					<view v-show="regInfos.mobile" class="fa fa-close fr margin-right-xxl"
					      @tap="delVals('mobile')" style="line-height: 80rpx"></view>
					<input :adjust-position="false" style="height: 80rpx;line-height: 80rpx;text-indent: 20px;font-size: 14px"
					       v-model="regInfos.mobile" :focus="false" :password="false" placeholder="请输入手机号码"
					       maxlength="11" confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-xl">
				<view class="fl text-red" style="font-size: 18px;color: #333333;width: 144rpx;height: 80rpx;line-height: 80rpx;margin-left: 36rpx;font-weight: bold">验证码:</view>
				<view style="width: 460rpx;position: relative">
					<view style="width: 282rpx;height: 80rpx;border-top-left-radius: 20px;border-bottom-left-radius: 20px;
					border: 1px solid #E54D42;line-height: 80rpx;margin-left: 180rpx;position: absolute">
						<view v-show="regInfos.msgCode" class="fa fa-close fr margin-right-xxl"
						      @tap="delVals('msgCode')" style="line-height: 80rpx"></view>
						<input :adjust-position="false" style="height: 80rpx;line-height: 80rpx;text-indent: 20px;font-size: 14px"
						       v-model="regInfos.msgCode" :focus="false" :password="false" placeholder="请输入验证码"
						       maxlength="6" confirm-type="完成" />
					</view>
					<view @tap="btnSend" style="width: 178rpx;height: 80rpx;border-top-right-radius: 20px;border-bottom-right-radius: 20px;text-align: center;
					border: 1px solid #E54D42;line-height: 80rpx;margin-left: 180rpx;border-left: none;position: absolute;left: 282rpx;color: #E54D42">
						{{ codeMess }}
					</view>
				</view>
			</view>
			<view style="clear: both"></view>
			<view class="text-center margin-top-xxl padding-bottom-ten">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					src="/static/images/lz/qued@2x.png"
					style="width: 430rpx;height: 92rpx"></image>
				<view style="color: #F30A30;font-size: 12px" class="margin-top">注：为您提现安全，请填写正确手机号</view>
			</view>

			<view @tap="modalStatusTwo=false" style="position: absolute;width: 100%;left: 0;text-align: center" class="margin-top-xxl">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					src="/static/images/lz/closelive_but@2x.png"
					style="width: 98rpx;height: 98rpx"></image>
			</view>
		</modal>

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

			allow_min_money: '',
			alipay_account: '',
			allow_money: [],
			balance: '',
			introduce_content: '',
			member_id: '',
			need_auth:'',
			work_time: [],
			timeSection: '',

			overage: 9.01,
			disabled: false,
			codeMess: '获取验证码',

			modalStatusTwo: false,
			modalStatus: false,
			wx: 'hongbao1322',
			moneyIndex: 0,

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
	async created() {
		const {data} = await commonPost('/my/account_balance')
		this.allow_min_money = data.allow_min_money
		this.alipay_account = data.alipay_account
		this.allow_money = data.allow_money
		this.balance = 2
		this.introduce_content = data.introduce_content
		this.member_id = data.member_id
		this.need_auth = data.need_auth
		this.work_time = data.work_time
		this.timeSection = `${this.work_time[0]}-${this.work_time[1]}`
	},
	methods: {
		withdraw () {
			const startTime = this.work_time[0].replace(':', '')+'00'
			const endTime = this.work_time[1].replace(':', '')+'00'
			const nowDate = new Date().toTimeString().slice(0, 8).replaceAll(':', '')

			if (this.balance < this.allow_money[this.moneyIndex].value) {
				this.modalStatus = true
				return
			}

			if(startTime <= nowDate <= endTime) {
				if (this.alipay_account == '' || this.alipay_account == null) {
					uni.showToast({title:`请绑定支付宝账户`, duration: 2000, icon: 'none'})
				} else {
					console.log(this.alipay_account)
				}
			} else {
				uni.showToast({title:`审核工作时间为${this.timeSection}`, duration: 2000, icon: 'none'})
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
			console.log(this.allow_money[index].value)
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
