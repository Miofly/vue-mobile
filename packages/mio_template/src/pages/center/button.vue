<template>
	<view class="center">
		<m-button :hairLine="true" :loading="false" :plain="false"
				  :ripple="true" :shape="['square', 'circle'][1]"
				  :size="['default', 'medium', 'mini'][0]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
				  class="bg-loveFive text-white !important" style="width: 90vw;">
			<view class="fa text-xxl fa-android margin-right" style="height: 50rpx" v-if="false"></view>
			这是测试按钮
		</m-button>
	</view>
</template>
