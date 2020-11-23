<template>
	<view class="bg-white full-width-height">
		<view class="full-width text-bg-new text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			联系客服
		</view>
		<view class="text-center margin-top text-xl margin-bottom-xxl">客服二维码</view>
		<image :src="customer_wechat" class="full-width margin-bottom-xxl" mode="aspectFit"
			   :class="[false?'cu-avatar':'', false?'round': '']"></image>
		<!--<view @tap="saveImg" class="text-center margin-top-xxl margin-center">-->
			<!--<button class="cu-btn width-eighty margin-center" :class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0],-->
		        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">-->
				<!--<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>-->
				<!--保存到手机-->
			<!--</button>-->
		<!--</view>-->

	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'
    export default {
	   	data () {
	   	    return {
                customer_wechat: ''
	   	    }
	   	},
		async mounted() {
	   	    this.ui.showLoading()
		    const data = await commonPost('/my/system-info')
			uni.hideLoading()
			// console.log(data.data)
			this.customer_wechat = data.data.customer_wechat
			console.log(this.customer_wechat)
			console.log(this.customer_wechat)
        },
        methods: {
            saveImg () {

            },
        },
    }
</script>

<style>

</style>
