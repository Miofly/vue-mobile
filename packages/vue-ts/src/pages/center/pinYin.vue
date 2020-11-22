<template>
	<view class="container">
	</view>
</template>

<script lang="ts">
import ZhToPinYin from 'uJs/plugin/zh-pinyin.js'

import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class test extends Vue {
	onLoad () {
		// new ZhToPinYin(true/false 首字母大/小写)
		// getPinYin('', true/false 加空格/不加空格)
		console.log(new ZhToPinYin(false).getPinYin('魏飞斗', true))
		// getInitials('魏飞斗', true/false 大写/小写)
		console.log(new ZhToPinYin().getInitials('魏飞斗', true))
	}
}

</script>

<style>
.container {
	padding: 20rpx 0 120rpx 0;
	box-sizing: border-box;
}

.header {
	padding: 80rpx 90rpx 60rpx 90rpx;
	box-sizing: border-box;
}

.title {
	font-size: 34rpx;
	color: #333;
	font-weight: 500;
}

.sub-title {
	font-size: 24rpx;
	color: #7a7a7a;
	padding-top: 18rpx;
}

.tui-title {
	padding: 30rpx;
	font-size: 32rpx;
	color: #333;
	font-weight: bold;
	box-sizing: border-box;
}

.tui-content {
	padding: 30rpx;
	font-size: 30rpx;
	color: #333;
	box-sizing: border-box;
	background-color: #fff;
	word-break: break-all;
}

.tui-btn-box {
	padding: 30rpx 40rpx;
	box-sizing: border-box;
	margin-top: 40rpx;
}
</style>
