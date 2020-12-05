<template>
	<view>
		<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
				:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				:shape="['square', 'circle'][0]" src="https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg" bgColor="rgba(0, 0, 0, 1)">
			<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
		</m-image>

		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
				  @click="saveImg" class="text-white" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			保存图片
		</m-button>
	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	created () {

	}

	saveImg () {
		console.log(1)
		wx.authorize({
			scope: 'scope.writePhotosAlbum',
			success () {
				uni.saveImageToPhotosAlbum({
					filePath: '/static/images/beijng2@2x.png',
					success () {
						console.log('save success')
					},
					fail () {

					}
				})
			},
			fail () {
				wx.getSetting({
					success: res => {
						const { authSetting } = res
						if (!authSetting['scope.writePhotosAlbum']) {
							wx.showModal({
								title: '提示',
								content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
								success (data) {
									wx.openSetting({})
								},
							})
						}
					}
				})
			}
		})
	}
}
</script>

<style>

</style>
