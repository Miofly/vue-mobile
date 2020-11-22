<template>
	<view class="">
		<m-modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="status"
			   title="这是标题" desc="这是描述" modalTop="0rpx" :titleSize="40" descColor="#999d9c" titleColor="black" width="90vw">
			<view class="text-center margin-top-xxl">
				<view>
					<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
							:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
							:shape="['square', 'circle'][0]" src="https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg" bgColor="rgba(0, 0, 0, 1)">
						<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
					</m-image>
				</view>
				<view class="flex justify-around margin-top-xl">
					<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
							  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style=""
							  @tap="status = false" class="text-white" :customStyle="{fontSize: '14px'}">
						<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
						确认
					</m-button>
					<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
							  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
							  @tap="status = false" class="text-white" :customStyle="{fontSize: '14px'}">
						<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
						取消
					</m-button>
				</view>
			</view>
		</m-modal>

		<view class="center" v-if="!status" @tap="status = !status">
			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
					  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
					  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
					  @tap="status = true" class="text-white fulls-width margin-top-xxl" style="height: 60rpx">
				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
				显示
			</m-button>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        status: boolean = true
    }
</script>
<style>
</style>
