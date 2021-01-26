<template>
	<view class="bg-white">
		<view class="full-width text-xl text-center text-bold "
		      style="background-color: rgb(251, 207, 36);font-size: 18px;height: 100rpx;line-height: 100rpx;padding: 0!important;position: fixed;top: 0;left: 0;z-index: 999999;">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left "
			      style="line-height: 100rpx"></view>
			提现信息验证
		</view>
		<view style="height: 100rpx"></view>
		<view v-if="auth_status != 0" class="text-center fulls-width padding" style="font-size: 18px;border-bottom: 1px solid #eee">
			<view class=" text-gray" v-if="auth_status == 1">审核中</view>
			<view class=" text-red" v-if="auth_status == 2">审核失败</view>
			<view style="color: rgb(255, 180, 0)" v-if="auth_status == 3">已实名</view>
		</view>

		<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>真实姓名</text>
				</view>
				<view v-if="true" class="action">
					<input :disabled="isReadOnly" class="margin-top text-right" v-model="name" placeholder="请输入真实姓名" :focus="false" :password=false  maxlength="-1" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>手机号</text>
				</view>
				<view v-if="true" class="action">
					<input :disabled="isReadOnly" class="margin-top text-right" v-model="mobile" placeholder="请输入手机号" :focus="false" :password=false  maxlength="11" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>身份证号码</text>
				</view>
				<view v-if="true" class="action">
					<input :disabled="isReadOnly" style="width: 200px" class="margin-top text-right" v-model="license" placeholder="请输入身份证号码" :focus="false" :password=false  maxlength="18" confirm-type="完成"/>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=""><text class="text-red margin-right" style="vertical-align: text-top">*</text>银行卡号</text>
				</view>
				<view v-if="true" class="action">
					<input :disabled="isReadOnly" style="width: 270px" class="margin-top text-right" v-model="bank" placeholder="请输入银行卡号" :focus="false" :password=false  maxlength="19" confirm-type="完成"/>
				</view>
			</view>
		</view>

		<view class="margin-top-xxl margin-left">
			<view style="color: #666666;font-size: 14px">注意事项</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
				1.请输入正确的个人信息，否则提现可能失败
			</view>
			<view v-if="auth_status != 0" style="color: #666666;font-size: 14px" class="margin-top-sm">
				2.点击重新修改认证信息可编辑当前认证信息
			</view>
			<view style="color: #666666;font-size: 14px" class="margin-top-sm">
<!--				3.提现成功后可在支付宝/微信-我的-账单查看到账详情-->
			</view>
		</view>

		<view @tap="checkInfo" class="flex justify-center margin-top-ten">
			<view v-if="auth_status == 0" style="background: rgb(251, 207, 36);width: 430rpx;height: 92rpx;line-height: 92rpx;border-radius: 30px;font-size: 14px" class="text-center
			 text-white ">
				提交个人信息
			</view>

			<view v-else style="background: rgb(251, 207, 36);width: 430rpx;height: 92rpx;line-height: 92rpx;border-radius: 30px;font-size: 14px" class="text-center
			 text-white ">
				{{ showText }}
			</view>

		</view>
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
			name: '',
			mobile: '',
			license: '',
			showText: '重新修改认证信息',
			bank: '',
			isNeed: 0,
			auth_status: 0,
			isReadOnly: false,
		}
	},
	onLoad (option) {
		this.isNeed = option.isNeed
	},
	async created(option) {
		const {data} = await appletsPost('/my/assets_auth')
		this.name = data.name
		this.mobile = data.mobile
		this.license = data.license
		this.bank = data.bank
		this.auth_status = data.auth_status
		if (this.auth_status != 0) {
			this.isReadOnly = true
		}
	},
	methods: {
		async checkInfo () {
			if (this.auth_status != 0 && this.showText == '重新修改认证信息') {
				this.isReadOnly = false
				this.showText = '提交修改'
			} else {
				this.updateInfo()
			}

		},
		async updateInfo () {
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

			const {data, code} = await appletsPost('/my/handle_assets_auth',{name:this.name, mobile: this.mobile, license: this.license, bank: this.bank})
			if (code == 200) {
				if (this.isNeed == 1) {
					location.href = data.contract_url
				} else {
					uni.showToast({title:`操作成功`, duration: 2000, icon: 'none'})
				}
			} else {

			}
		}
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
