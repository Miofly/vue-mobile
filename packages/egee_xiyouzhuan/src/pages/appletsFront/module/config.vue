<template>
	<view class="bg-white full-width-height">
		<view class="full-width text-xl text-center" style="background: rgb(251, 207, 36);height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			联系客服
		</view>
		<view class="text-center margin-top text-xl margin-bottom-xxl">客服二维码</view>
		<image :src="customer_wechat" class="full-width margin-bottom-xxl" mode="aspectFit"
			   :class="[false?'cu-avatar':'', false?'round': '']"></image>
	</view>
</template>

<script lang="ts">

	import {
	    appletsPost
	} from '@/api'
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class config extends Vue {
        customer_wechat: string = ''

        async mounted () {
            this.$mio.mioRoot.showLoading()
            const data = await appletsPost('my/system-info')
            uni.hideLoading()
            // console.log(data.data)
            this.customer_wechat = data.data.customer_wechat
        }
	}

</script>

<style>

</style>
