<template>
	<view class="bg-white">
		<view class="full-width text-xl text-center text-bold text-white"
		      style="height: 100rpx;line-height: 100rpx;padding: 0!important;position: fixed;top: 0;left: 0;z-index: 999999;background: red">
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left text-white"
			      style="line-height: 100rpx"></view>
			提现信息验证
		</view>
		<view style="height: 100rpx"></view>

		<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>真实姓名</text>
				</view>
				<view v-if="true" class="action">
					<input class="margin-top text-right" v-model="name" placeholder="请输入真实姓名" :focus="false" :password=false  maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>手机号</text>
				</view>
				<view v-if="true" class="action">
					<input class="margin-top text-right" v-model="mobile" placeholder="请输入手机号" :focus="false" :password=false  maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>身份证号码</text>
				</view>
				<view v-if="true" class="action">
					<input class="margin-top text-right" v-model="license" placeholder="请输入身份证号码" :focus="false" :password=false  maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="">银行卡号</text>
				</view>
				<view v-if="true" class="action">
					<input class="margin-top text-right" v-model="bank" placeholder="请输入银行卡号" :focus="false" :password=false  maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
		</view>

		<view class="margin-top-xxl margin-left">
			<view style="color: #666666;font-size: 14px">注意事项</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				1.请输入正确的个人信息，否则提现可能失败
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">

			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
<!--				3.提现成功后可在支付宝/微信-我的-账单查看到账详情-->
			</view>
		</view>

		<view @tap="checkInfo" class="flex justify-center margin-top-bottom-ten">
			<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
			       src="/static/images/lz/submit.png"
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
			name: '',
			mobile: '',
			license: '',
			bank: '',
		}
	},
	async created() {
		const {data} = await commonPost('/my/assets_auth')
		this.name = data.name
		this.mobile = data.mobile
		this.license = data.license
		this.bank = data.bank
	},
	methods: {
		async checkInfo () {
			if (this.name == '') {
				uni.showToast({title:`真实姓名不能为空`, duration: 2000, icon: 'none'})
				return
			}
			if (!/^[\u4e00-\u9fa5]+$/gi.test(this.name)) {
				uni.showToast({title:`姓名必须为中文`, duration: 2000, icon: 'none'})
				return
			}
			if (this.name.length < 2 || this.name.length > 5) {
				uni.showToast({title:`真实姓名格式不正确`, duration: 2000, icon: 'none'})
				return
			}
			if (this.mobile == '') {
				uni.showToast({title:`手机号不能为空`, duration: 2000, icon: 'none'})
				return
			}
			if (this.mobile.length != 11) {
				uni.showToast({title:`手机号格式不正确`, duration: 2000, icon: 'none'})
				return
			}
			if (this.license == '') {
				uni.showToast({title:`身份证号不能为空`, duration: 2000, icon: 'none'})
				return
			}
			if (!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.license)) {
				uni.showToast({title:`身份证号格式不正确`, duration: 2000, icon: 'none'})
				return
			}
			if (this.license == '') {
				uni.showToast({title:`身份证号不能为空`, duration: 2000, icon: 'none'})
				return
			}

			const data = await commonPost('/my/handle_assets_auth',{name:this.name, mobile: this.mobile, license: this.license, bank: this.bank})
			console.log(data)
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
