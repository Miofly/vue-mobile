<template>
	<view class="full-height" style="background-color: #f5f6f7">
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view class="full-width text-center text-bold with_header">
				<view @click="testOne" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
				提现
			</view>
			<view style="height: 100rpx"></view>
			<view class="flex justify-around text-center with_tab bg-white align-center">
				<view @click="changeTab" :class="[status ? 'activeStyle' : 'inActiveStyle']">点击收益余额</view>
				<view @click="changeTab" :class="[!status ? 'activeStyle' : 'inActiveStyle']">分成收益余额</view>
			</view>

			<view class="auth_img" @tap="infoUpdate">
				<text>个人认证信息</text>
				<image :src="auth_src"></image>
			</view>
			
			<view class="flex justify-between money bg-white">
				<view class="money_one">
					<view style="font-size: 14px" class="text-bold money_balance">账户余额（元）</view>
					<view style="font-size: 38px;color: #F30A30;font-weight: bolder" class="">{{ balance }}</view>
				</view>
				<view @tap="goRecord" class="margin-right-xl record">
					提现记录
				</view>
			</view>

			<view class="money_set">
				<view class="flex text-center flex-wrap justify-around">
					<view v-for="(item, index) in allow_money" :key="index" class="text-center">
						<view @tap="chooseMoney(index)" :style="{color: moneyIndex==index? 'black' : 'black', background: moneyIndex==index? '#FACA36' : '#F5F6F7'}" class="item text-bold">
							{{ item.label.replace('元', '') }}
							<text style="font-size: 18px;font-weight: normal" class="margin-left">元</text>
						</view>
					</view>
				</view>

				<view class="fulls-width with_method">
					<text style="font-size: 16px;" class="text-left text-bold">提现方式</text>

					<view style="margin-top: 26rpx" class="account">
						<view v-if="alipay_account==null||alipay_account==''" class="flex justify-around align-center">
							<view style="height: 60rpx;line-height: 60rpx;width: 200rpx" class="margin-right-ten">
								<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
								       src="/static/images/lz/zhifubao@2x.png"
								       style="width: 60rpx"></image>
								<text style="vertical-align: top;" class="margin-left-xxl">未绑定</text>
							</view>
							<view @tap="modalStatusThree=true" style="background: #FACA36;text-align: center;color: black;border-radius: 4px;width: 180rpx;height: 56rpx;line-height: 56rpx">绑定账号</view>
						</view>
						<view v-else style="position: relative">
							<view class="zfb">
								<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									src="/static/images/lz/zhifubao@2x.png" style="width: 60rpx"></image>
							</view>
							<text style="" class="">{{ $mio.mioRoot.getLocalData('realName') }} {{alipay_account}}</text>
							<view class="btn" @tap="modalStatusThree=true" style="">更改账号</view>
						</view>
					</view>
				</view>
			</view>

			<view class="" style="margin-top: 20rpx;height: auto;background-color: white;padding: 30rpx">
				<view style="color: #666666;font-size: 16px;font-weight: bolder">注意事项:</view>
				<view style="color: #666666;font-size: 14px;margin-top: 28rpx" class="">
					1.每人每天提现{{frequency}}次，审核工作日时间{{timeSection}}
				</view>
				<view style="color: #666666;font-size: 14px" class="margin-top-sm">
					2.提现到账可能会有延迟，请等待
				</view>
				<view style="color: #666666;font-size: 14px" class="margin-top-sm">
					3.提现成功后可在支付宝-我的-账单查看到账详情
				</view>

				<view class="flex justify-between align-center" style="margin-top: 48rpx">
					<view style="font-size: 16px;color: #FFB400;" class="">客服微信：{{ wechat }}</view>
					<view @tap="goWeixin" style="width: 219rpx;height: 56rpx;border-radius: 16px;border: 1px solid #FFB400;text-align: center;line-height: 56rpx;color: #FFB400" class="margin-right-xl">
						复制打开微信
					</view>
				</view>
			</view>

			<view style="height: 30vw">

			</view>

			<view style="position: fixed;bottom: 50rpx;width: 100%;left: 0;text-align: center" @tap="withdraw" class="">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				       src="/static/images/lz/lijitixian@2x.png"
				       style="width: 690rpx;height: 100rpx"></image>
			</view>
			
			<m-modal :closeShow="false" :custom="true" :status.sync="modalStatus" :showTitle="false" content="这是内容"
			         :showContent="false" title="标题" padding="0">
				<view style="height: 164rpx;line-height: 164rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">您余额不足，快去赚钱吧～</view>
				<view style="width: 100%;height: 2px;background: #eee;"></view>
				<view @tap="test" style="height: 100rpx;text-align: center;color: #E54D42;font-size: 18px;line-height: 100rpx">
					马上去赚钱
				</view>
			</m-modal>

			
			<m-modal class="mtwo" :closeShow="false" :custom="true" :status.sync="modalStatusTwo" :showTitle="false"
			         :showContent="false" content="这是内容" title="标题"
			         width="90vw" padding="20">
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
			</m-modal>

			<m-modal class="mtwo" :closeShow="false" :custom="true" :status.sync="modalStatusThree" :showTitle="false" width="90vw" padding="20"
			         :showContent="false" content="" title="">
				<view style="color: #333333;font-weight: bold;font-size: 18px;text-align: center;margin-top: 1rem">更改账户</view>
				<view style="height: 100rpx;margin-left: 1rem;" class="margin-top-xl">
					<view class="fl text-red" style="font-size: 16px;color: #333333;width: 184rpx;height: 80rpx;line-height: 80rpx;font-weight: bold">支付宝账户:</view>
					<view style="width: 402rpx;height: 80rpx;border-radius: 20px;border: 1px solid #E54D42;line-height: 80rpx;margin-left: 200rpx" class="">
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
			</m-modal>

			<m-modal :custom="true" :closeShow="false" :status.sync="modalStatusFour" :showTitle="false" :showContent="false" content="这是内容" title="确认提现？" padding="0">
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
			</m-modal>

			<m-modal id="mfive" :closeShow="false" :custom="true" :status.sync="modalStatusFive" :showTitle="false" :showContent="false" content="这是内容" title="确认提现？" padding="0">
				<view style="height: 164rpx;line-height: 164rpx;color: #333333;font-weight: bold;font-size: 18px;text-align: center">
					当前操作需跳转至
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
			</m-modal>
		</scroll-view>
	</view>
</template>

<script>
/* eslint-disable */
import {
	appletsPost
} from '@/api'

export default {
	data() {
		return {
			auth_src: '/static/images/haixing/auth.png',
			
			status: true,
			
			allow_min_money: '',
			alipay_account: '',
			allow_money: [],
			balance: 0,
			wechat: '',
			member_id: '',
			need_auth:'',
			work_time: [],
			timeSection: '',
			zfbMess: '支付宝绑定',
			new_alipay_account: '',
			alipay_account_old: '',
			alipay_account_status: '',
			contract_url: '',
			frequency: '',

			disabled: false,
			codeMess: '获取验证码',

			modalStatusTwo: false,
			modalStatus: false,
			modalStatusThree: false,
			modalStatusFour: false,
			modalStatusFive: false,
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
	created() {
		this.getClick()
	},
	methods: {
		changeTab () {
			this.status = !this.status
			if (this.status) {
			    this.getClick()
			}
		},
		async getClick () {
			this.$mio.mioRoot.showLoading('正在加载')
			const {data} = await appletsPost('/my/account_balance')
			uni.hideLoading()
			this.allow_min_money = data.allow_min_money
			this.alipay_account = data.alipay_account
			this.alipay_account_old = data.alipay_account
			this.allow_money = data.allow_money
			this.balance = data.balance
			this.frequency = data.frequency
			this.wechat = data.wechat
			this.member_id = data.member_id
			this.need_auth = data.need_auth
			this.work_time = JSON.parse(data.work_time)
			this.timeSection = `${this.work_time[0]}-${this.work_time[1]}`
		},
		infoUpdate () {
			uni.navigateTo({
				url: '/pages/appletsFront/module/with-draw-verification'
			})
		},
		async goWithDraw () {
			const {code, data} = await appletsPost('/my/apply_withdraw', {index: this.allow_money[this.moneyIndex].index})
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
			     location.href = data.contract_url
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
					// const {data} = await appletsPost('/my/fetch_alipay_account')
					// this.alipay_account_status = data.alipay_account_status
					if (this.need_auth) {
						uni.navigateTo({
							url: '/pages/appletsFront/module/with-draw-verification?isNeed=1'
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
			this.modalStatusFive = false
			uni.navigateTo({
				url: '/pages/appletsFront/module/with-draw-verification?isNeed=1'
			})
		},
		async bindAlipay () {
			this.modalStatusTwo = true
			if (this.new_alipay_account == '') {
				uni.showToast({title:`支付宝账户不能为空`, duration: 2000, icon: 'none'})
			} else {
				const {code} = await appletsPost('/my/merge_alipay_account', {alipay_account: this.new_alipay_account.trim()})
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
				const {code} = await appletsPost('/my/merge_alipay_account', {alipay_account: this.alipay_account_old.trim()})
				if (code == 200) {
					uni.showToast({title:`更新成功`, duration: 2000, icon: 'none'})
					this.alipay_account = this.alipay_account_old
				}
				this.modalStatusThree = false
			}
		},
		goRecord () {
			localStorage.setItem('withdraw_status', this.status ? 1 : 0)
			uni.navigateTo({
				url: `/pages/appletsFront/module/with-draw-record`
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
			this.$mio.mioRoot.copyText(this.wechat)
			this.$mio.mioRoot.jumpWX()
		},
		chooseMoney (index) {
			this.moneyIndex = index
			console.log(this.allow_money[index].value)
		},
		onUnLoad () {
			// this.router.replace({name: 'lz_home'})
			uni.redirectTo({
				url: '/pages/appletsFront/home'
			});
		},
		testOne () {
			uni.redirectTo({
				url: '/pages/appletsFront/home'
			});
		},
		test (e) {
			this.slogan = e.target.value
		},
		async downCallback() {
			this.dataOneList = []
			this.dataOneHour = []
			this.dataOneClick = []
			const dataOne = await appletsPost('/team/team-click-trend')
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
			const data = await appletsPost('/team/release-notice', {slogan: this.slogan})
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

<style lang="scss">
.with_header{background: rgb(251, 207, 36);height: 100rpx;line-height: 100rpx;padding: 0!important;position: fixed;top: 0;left: 0;z-index: 999999;font-size: 18px}

>>>.mio-modal-box{padding: 0!important;}
>>>.mtwo .mio-modal-box{width: 90%!important;}
>>>#mfive .mio-modal-box{width: 98%!important;}
.upwarp-tip{display: none!important;}
page{
	background: white;
}
.with_tab {
	height: 108rpx;line-height: 60rpx;
	view{width: 346rpx;height: 72rpx;font-size: 18px;color: #333;line-height: 72rpx;border-radius: 12rpx}
}

.auth_img{
	width: 100%;position: relative;height: 76rpx;
	text {position: absolute;top: 18rpx;left: 88rpx;font-size: 16px;font-weight: 500;letter-spacing: 1px;z-index: 1;color: #FFB400;}
	image{height: 76rpx;width: 100%}
}
.money{
	height: 190rpx;
	.money_balance{margin-top: 36rpx}
    .money_one{margin-left: 30rpx}
	.record{border-radius: 15px;border: 1px solid #FFB400;width: 176rpx;height: 60rpx;color: black;text-align: center;line-height: 60rpx;margin-top: 86rpx}
}

.money_set{
	margin-top: 20rpx;background-color: white;height: 462rpx;
	.item{border: 1px solid rgb(239, 239, 239);border-radius: 16rpx;height: 104rpx;width: 214rpx;line-height: 104rpx;font-size: 30px;margin-top: 24rpx}
}

.with_method {
	margin-top: 48rpx;
	text{margin-left: 30rpx}
}

.activeStyle{
	font-weight: bold;
	font-size: 18px;
	background: #FFDB18;
	color: #772E01;
}
.inActiveStyle{
	font-size: 18px;
	background-color: rgba(255, 255, 255, 0.9);
	color: #772E01;
}

.account {
    .zfb{
        position: absolute;left: 30rpx;top: 0
    }
	text{
        position: absolute;left: 90rpx;top: 6rpx;font-size: 18px;
	}
	.btn {
		position: absolute;right: 30rpx;
        ;background: #FACA36;text-align: center;color: black;border-radius: 4px;width: 180rpx;height: 56rpx;line-height: 56rpx
	}
}

</style>
