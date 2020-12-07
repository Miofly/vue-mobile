<template>
	<view :style="{backgroundImage: 'url('+ infoConfig.bg +')'}" class="full-width-height text-center padding"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">
		<view style="margin-top: 40rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" src="/static/images/banner@2x.png" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>
		<view style="height: 422rpx;background: #F5F6FC;border-radius: 12px;border: 4px solid #36CCF1;margin-top: 40rpx">

		</view>
		<view style="color: #D3D5DE;margin-top: 60rpx" class="text-18">
			共 <text style="color: #FF5555" class="text-22">123123</text>人正在挑战
		</view>
		<view style="color: #D3D5DE;margin-top: 28rpx" class="text-16">
			榜单将于每周一凌晨3:00重置
		</view>


	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	infoConfig: any = {
		bg: '/static/images/bg.png',
		clickSrc: '/static/images/click_me@2x.png',
		clickSrcTwo: '/static/images/click_me2.png',
		againSrc: '/static/images/zailai@2x.png',
	}
}
</script>

<style>

</style>
