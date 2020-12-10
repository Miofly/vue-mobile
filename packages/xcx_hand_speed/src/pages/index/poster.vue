<template>
	<view class="full-width-height text-center">
		<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="898"
				:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="margin-top: 128rpx"
				:shape="['square', 'circle'][0]" :src="baseConfig.posterSrc" bgColor="rgba(0, 0, 0, 1)">
			<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
		</m-image>
		<view class="flex justify-around" style="margin-top: 80rpx;padding: 0 20rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="100"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" open-type="share"
					:shape="['square', 'circle'][0]" :src="baseConfig.shareSrc" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="100"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" @click="saveImg"
					:shape="['square', 'circle'][0]" :src="baseConfig.saverSrc" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	baseConfig: any = {
		posterSrc: '/static/images/haibao@2x.png',
		shareSrc: '/static/images/fenxiang@2x.png',
		saverSrc: '/static/images/save.png',
	}

	saveImg (imgSrc) {
		wx.authorize({
			scope: 'scope.writePhotosAlbum',
			success: () => {
				uni.saveImageToPhotosAlbum({
					filePath: imgSrc,
					success: res => {
						console.log(res)
						this.$mio.mioRoot.showToast('保存成功')
					},
					fail: err => {
						console.log(err)
						this.$mio.mioRoot.showToast('保存失败')
					}
				})
			},
			fail: () => {
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
