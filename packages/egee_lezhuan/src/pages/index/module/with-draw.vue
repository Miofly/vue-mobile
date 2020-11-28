<template>
	<view class="full-height bg-white">
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view>

			</view>
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
				<view @tap="goRecord" style="border-radius: 15px;border: 1px solid #E54D42;width: 176rpx;height: 60rpx;color: #E54D42;
				text-align: center;line-height: 60rpx"
				      class="margin-right-xl margin-bottom">
					提现记录
				</view>
			</view>

			<view v-if="need_auth!=1" style="width: 100%;text-align: center;margin-left: 40rpx" class="">
				<view @tap="infoUpdate" style="color: #E54D42;border-radius: 15px;border: 1px solid #E54D42;width: 266rpx;height: 60rpx;text-align: center;line-height: 60rpx"
				      class="margin-right-xl margin-bottom">
					个人认证信息修改
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

			<view class="margin-top-xl">
				<view v-if="alipay_account==null||alipay_account==''" class="flex justify-around align-center margin-top-xl">
					<view style="height: 60rpx;line-height: 60rpx;width: 200rpx" class="margin-right-ten">
						<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
						       src="/static/images/lz/zhifubao@2x.png"
						       style="width: 60rpx"></image>
						<text style="vertical-align: top;" class="margin-left-xxl">未绑定</text>
					</view>
					<view style="background: #E54D42;text-align: center;color: white;border-radius: 16px;width: 218rpx;height: 56rpx;line-height: 56rpx">绑定账号</view>
				</view>
				<view v-else class="flex justify-around align-center margin-top-xl">
					<view style="height: 60rpx;line-height: 60rpx;width: 400rpx" class="">
						<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
						       src="/static/images/lz/zhifubao@2x.png"
						       style="width: 60rpx"></image>
						<text style="vertical-align: top;" class="margin-left-xxl">{{ tu.getLocalData('realName') }} {{alipay_account}}</text>
					</view>
					<view @tap="modalStatusThree=true" style="background: #E54D42;text-align: center;color: white;border-radius: 16px;width: 218rpx;height: 56rpx;line-height: 56rpx">更改账号</view>
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
				<view style="font-size: 14px;color: #E54D42;" class="margin-left">客服微信：{{ introduce_content }}</view>
				<view @tap="goWeixin" style="width: 219rpx;height: 56rpx;border-radius: 16px;border: 1px solid #E54D42;text-align: center;line-height: 56rpx;color: #E54D42" class="margin-right-xl">
					复制打开微信
				</view>
			</view>

			<view @tap="withdraw" class="flex justify-center margin-top-bottom-ten padding-bottom">
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

			<modal class="mtwo" :custom="true" :show="modalStatusTwo" content="这是内容" title="标题" style="padding: 0px!important;position: relative">
				<view style="height: 164rpx;line-height: 192rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">绑定账户</view>
				<view style="height: 100rpx" class="margin-top-xl">
					<view class="fl text-red" style="font-size: 16px;color: #333333;width: 184rpx;height: 80rpx;line-height: 80rpx;margin-left: 36rpx;font-weight: bold">支付宝账户:</view>
					<view style="width: 402rpx;height: 80rpx;border-radius: 20px;border: 1px solid #E54D42;line-height: 80rpx;margin-left: 230rpx" class="">
						<view v-show="new_alipay_account" class="fa fa-close fr margin-right-xxl"
						      @tap="delVals('new_alipay_account')" style="line-height: 80rpx"></view>
						<input :adjust-position="false" style="height: 80rpx;line-height: 80rpx;text-indent: 20px;font-size: 14px"
						       v-model="new_alipay_account" :focus="false" :password="false" placeholder="请输入支付宝账户"
						       maxlength="-1" confirm-type="完成" />
					</view>
				</view>
				<view @click="bindAlipay" class="text-center margin-top-xxl padding-bottom-ten">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/qued@2x.png"
					       style="width: 430rpx;height: 92rpx"></image>
					<view style="color: #F30A30;font-size: 12px" class="margin-top">注：为您提现成功，请填写正确支付宝账户</view>
				</view>

				<view @click="modalStatusTwo=false" style="position: absolute;width: 100%;left: 0;text-align: center" class="margin-top-xxl">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/closelive_but@2x.png"
					       style="width: 98rpx;height: 98rpx"></image>
				</view>
			</modal>

			<modal class="mtwo" :custom="true" :show="modalStatusThree" content="这是内容" title="标题" style="padding: 0px!important;position: relative">
				<view style="height: 164rpx;line-height: 192rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">更改账户</view>
				<view style="height: 100rpx" class="margin-top-xl">
					<view class="fl text-red" style="font-size: 16px;color: #333333;width: 184rpx;height: 80rpx;line-height: 80rpx;margin-left: 36rpx;font-weight: bold">支付宝账户:</view>
					<view style="width: 402rpx;height: 80rpx;border-radius: 20px;border: 1px solid #E54D42;line-height: 80rpx;margin-left: 230rpx" class="">
						<view v-show="alipay_account_old" class="fa fa-close fr margin-right-xxl"
						      @tap="delVals('alipay_account_old')" style="line-height: 80rpx"></view>
						<input :adjust-position="false" style="height: 80rpx;line-height: 80rpx;text-indent: 20px;font-size: 14px"
						       v-model="alipay_account_old" :focus="false" :password="false" placeholder="请输入支付宝账户"
						       maxlength="-1" confirm-type="完成" />
					</view>
				</view>
				<view @click="changeAlipay" class="text-center margin-top-xxl padding-bottom-ten">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/qued@2x.png"
					       style="width: 430rpx;height: 92rpx"></image>
					<view style="color: #F30A30;font-size: 12px" class="margin-top">注：为您提现成功，请填写正确支付宝账户</view>
				</view>

				<view @click="cancelThree" style="position: absolute;width: 100%;left: 0;text-align: center" class="margin-top-xxl">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       src="/static/images/lz/closelive_but@2x.png"
					       style="width: 98rpx;height: 98rpx"></image>
				</view>
			</modal>

			<modal :custom="true" :show="modalStatusFour" content="这是内容" title="确认提现？" style="padding: 0!important;">
				<view style="height: 164rpx;line-height: 164rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">确认提现？</view>
				<view style="width: 100%;height: 1px;background: #eee;"></view>
				<view class="flex" style="height: 100rpx;text-align: center;color: #E54D42;font-size: 18px;line-height: 100rpx">
					<view style="width: 50%;border-right: 1px solid #eee;color: black" @tap="modalStatusFour=false">
						取消
					</view>
					<view style="width: 50%" @click="goWithDraw">
						确认
					</view>
				</view>
			</modal>

			<modal id="mfive" :custom="true" :show="modalStatusFive" content="这是内容" title="确认提现？" style="padding: 0!important;">
				<view style="height: 164rpx;line-height: 164rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">
					提现总额超过500需跳转至
					<text>电子合同签署页面</text>
				</view>
				<view style="width: 100%;height: 1px;background: #eee;"></view>
				<view class="flex" style="height: 100rpx;text-align: center;color: #E54D42;font-size: 18px;line-height: 100rpx">
					<view style="width: 50%;border-right: 1px solid #eee;color: black" @tap="modalStatusFive=false">
						放弃提现
					</view>
					<view style="width: 50%" @click="goSigned">
						确认跳转
					</view>
				</view>
			</modal>
		</scroll-view>
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

			allow_min_money: '',
			alipay_account: '',
			allow_money: [],
			balance: 0,
			introduce_content: '',
			member_id: '',
			need_auth:'',
			work_time: [],
			timeSection: '',
			zfbMess: '支付宝绑定',
			new_alipay_account: '',
			alipay_account_old: '',
			alipay_account_status: '',
			contract_url: '',

			disabled: false,
			codeMess: '获取验证码',

			modalStatusTwo: false,
			modalStatus: false,
			modalStatusThree: false,
			modalStatusFour: false,
			modalStatusFive: false,
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
		// document.body.removeEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
		// 	evt.preventDefault()
		// }, {passive: false})
		const {data} = await commonPost('/my/account_balance')
		this.allow_min_money = data.allow_min_money
		this.alipay_account = data.alipay_account
		this.alipay_account_old = data.alipay_account
		this.allow_money = data.allow_money
		this.balance = data.balance
		this.introduce_content = data.introduce_content
		this.member_id = data.member_id
		this.need_auth = data.need_auth
		this.work_time = data.work_time
		this.timeSection = `${this.work_time[0]}-${this.work_time[1]}`
	},
	methods: {
		infoUpdate () {
			uni.navigateTo({
				url: '/pages/index/module/with-draw-verification'
			})
		},
		async goWithDraw () {
			const {code, data} = await commonPost('/my/apply_withdraw', {index: this.moneyIndex})
			if (code == 200) {
				uni.showToast({title:`提现成功`, duration: 2000, icon: 'none'})
				this.balance = this.balance - this.allow_money[this.moneyIndex].value
				this.balance = this.balance.toFixed(2)
				this.modalStatusFour = false
				return
			}
			if (code == 414) {
				 this.modalStatusFour = false
				 this.modalStatusFive = true
			     this.contract_url = data.contract_url
			}
		},
		async withdraw () {
			const startTime = this.work_time[0].replace(':', '')+'00'
			const endTime = this.work_time[1].replace(':', '')+'00'
			const nowDate = new Date().toTimeString().slice(0, 8).replace(/:/g, '')
			if (this.balance < this.allow_money[this.moneyIndex].value) {
				this.modalStatus = true
				return
			}

			if(startTime <= nowDate <= endTime) {
				if (this.alipay_account == '' || this.alipay_account == null) {
					uni.showToast({title:`请绑定支付宝账户`, duration: 2000, icon: 'none'})
					this.modalStatusTwo = true
				} else {
					// const {data} = await commonPost('/my/fetch_alipay_account')
					// this.alipay_account_status = data.alipay_account_status
					if (this.need_auth == 1) {
						uni.navigateTo({
							url: '/pages/index/module/with-draw-verification'
						})
					} else {
						this.modalStatusFour = true
					}
				}
			} else {
				uni.showToast({title:`审核工作时间为${this.timeSection}`, duration: 2000, icon: 'none'})
			}
		},
		goSigned () {
			location.href = this.contract_url
		},
		async bindAlipay () {
			this.modalStatusTwo = true
			if (this.new_alipay_account == '') {
				uni.showToast({title:`支付宝账户不能为空`, duration: 2000, icon: 'none'})
			} else {
				const {code} = await commonPost('/my/merge_alipay_account', {alipay_account: this.new_alipay_account.trim()})
				if (code == 200) {
					uni.showToast({title:`绑定成功`, duration: 2000, icon: 'none'})
					this.alipay_account = this.alipay_account_old
				}
				this.modalStatusTwo = false
			}

		},
		async changeAlipay () {
			if (this.alipay_account_old == '') {
				uni.showToast({title:`支付宝账户不能为空`, duration: 2000, icon: 'none'})
			} else {
				const {code} = await commonPost('/my/merge_alipay_account', {alipay_account: this.alipay_account_old.trim()})
				if (code == 200) {
					uni.showToast({title:`更新成功`, duration: 2000, icon: 'none'})
					this.alipay_account = this.alipay_account_old
				}
				this.modalStatusThree = false
			}
		},
		goRecord () {
			uni.navigateTo({
				url: '/pages/index/module/with-draw-record'
			})
		},
		cancelThree () {
			this.modalStatusThree = false
			this.alipay_account_old = this.alipay_account
		},
		delVals(val) {
			this[val] = ''
		},
		goWeixin () {
			this.tu.getClipboardData(this.introduce_content)
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
>>>.mtwo .mio-modal-box{width: 90%!important;}
>>>#mfive .mio-modal-box{width: 98%!important;}
.upwarp-tip{display: none!important;}
page{
	background: white;
}
</style>
