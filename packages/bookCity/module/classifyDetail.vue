<template>
	<view>
		<navbar title="分类" backText="" :backIcon="true" @pBack="$mio.mioRoot.back"
		        :iconTextStyle="{ color: 'black', fontSize: '20px' }"
				:titleTextStyle="{ color: 'black', fontSize: '16px' }"
				:backTextStyle="{ color: 'black', fontSize: '16px' }"
				:background="{ background: 'white' }">
			<view slot="right" v-if="true">
				<view @tap="show=true" class="fa fa-bars margin-right" style="padding-right: 30rpx;font-size: 16px"></view>
			</view>
		</navbar>

		<view class="flex justify-around text-center margin-top"
		      style="width: 60vw;margin-left: 20vw;height: 60rpx;line-height: 60rpx">
			<view @tap="status = !status" class="border-left-radius" :class="[status ? 'activeStyle' : 'inActiveStyle']" style="width: 50%;">男生</view>
			<view @tap="status = !status" class="border-right-radius" :class="[!status ? 'activeStyle' : 'inActiveStyle']" style="width: 50%;">女生</view>
		</view>



		<view class="flex text-center flex-wrap align-center margin-top">
			<view v-for="(item, index) in lists" :key="index" style="height: 200rpx;position: relative"
			      :style="{width: '50%'}">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
				       :src="item.img" style="width: 340rpx;height: 90%" class="border-radius-sm"></image>
				<view v-if="false" :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa"
				      style="font-size: 20px"></view>
				<view style="position: absolute;top: 30%;left: 30%;" class="text-white">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class test extends Vue {
	show: boolean = false
	mode: string = ['center', 'top', 'bottom', 'left', 'right'][1]
	status: boolean = false

	lists: any = [
		{ img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg', icon: 'weixin', color: 'red', badge: 120, name: 'weixin' },
		{ img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg', icon: 'close', color: 'orange', badge: 1, name: '录像' },
		{ img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg', icon: 'weixin', color: 'yellow', badge: 0, name: '图像' },
		{ img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg', icon: 'weixin', color: 'olive', badge: 22, name: '通知' },
	]
}
</script>


<style lang="scss" scoped>
.wrap {
	padding: 24rpx;
}

.close-btn {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.activeStyle {
	background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%) !important;
	color: white
}

.inActiveStyle {
	background: white;
	color: #ff758c
}

</style>
