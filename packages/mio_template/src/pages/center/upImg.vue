<template>
	<view class="bg-white">

		<view class="cu-form-group" @tap="ChooseImage">
			<view class="grid col-4 grid-square flex-sub">
				<view :data-url="imgList" class="bg-img" v-show="imgList">
					<image :src="imgList" mode="aspectFill"></image>
					<view @tap.stop="status = true" class="cu-tag bg-red">
						<text class="fa fa-close"></text>
					</view>
				</view>
				<view class="solids text-center">
					<input class="fa fa-camera margin-top-forty text-grey text-center" style="font-size: 0.8rem;margin-left: 0.7rem;outline: none;" type="file" />
				</view>
			</view>
		</view>

		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
				  @tap="submit" class="text-white" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			上传
		</m-button>

		<modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="status"
			   title="确认删除图片？" desc="" modalTop="0rpx" :titleSize="40" descColor="#999d9c" titleColor="black" width="90vw">
			<view class="text-center margin-top-xxl">
				<view class="flex justify-around margin-top-xl">
					<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
							  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style=""
							  @tap="confirmDel" class="text-white" :customStyle="{fontSize: '14px'}">
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
		</modal>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class upImg extends Vue {
        file: string = ''
        title: string = ''
        desc: string = ''
        imgList: string = ''
		status: boolean = false

		ChooseImage (data) {
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'][1], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 从相册选择
				success: (res) => {
					// 要用formData上传的信息
					this.file = res.tempFilePaths[0] // eslint-disable-line
					console.log(res.tempFilePaths)
					console.log(this.file)
					// 要显示的图片资源
					this.imgList = res.tempFilePaths[0] // eslint-disable-line
				}
			})
		}

		confirmDel (): void {
			this.file = ''
			this.imgList = ''
			this.status = false
		}

        submit (): void {
			const token = localStorage.getItem('TOKEN_KEY')

			this.$mio.mioRoot.showLoading('正在上传...')
			uni.uploadFile({
				url: 'http://api.hxz2020.com/api/title/add-team-title1', // 仅为示例，非真实的接口地址
				filePath: this.file,
				header: { Authorization: `${token}` },
				name: 'pic',
				formData: { // HTTP 请求中其他额外的 form data
					desc: this.desc
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res.data)
					if (JSON.parse(res.data).code == 200) {
						this.$mio.mioRoot.showToast('上传成功')
						this.imgList = ''
						this.file = ''
					} else {

					}
				},
				fail: (err) => {
					this.$mio.mioRoot.showToast('上传失败，请重新上传')
					uni.hideLoading()
					console.log(err)
				}
			})
        }
    }
</script>

<style>
	.cu-form-group {
		background-color: #ffffff;
		padding: 1rpx 30rpx;
		display: flex;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
	}

	.cu-form-group + .cu-form-group {
		border-top: 1rpx solid #eee;
	}

	.cu-form-group .title {
		text-align: justify;
		padding-right: 30rpx;
		font-size: 30rpx;
		position: relative;
		height: 60rpx;
		line-height: 60rpx;
	}

	.cu-form-group input {
		flex: 1;
		font-size: 30rpx;
		color: #555;
		padding-right: 20rpx;
	}

	.cu-form-group > text[class*="fa-"] {
		font-size: 36rpx;
		padding: 0;
		box-sizing: border-box;
	}

	.cu-form-group textarea {
		margin: 32rpx 0 30rpx;
		height: 4.6em;
		width: 100%;
		line-height: 1.2em;
		flex: 1;
		font-size: 28rpx;
		padding: 0;
	}

	.cu-form-group.align-start .title {
		height: 1em;
		margin-top: 32rpx;
		line-height: 1em;
	}


	.cu-form-group textarea[disabled],
	.cu-form-group textarea[disabled] .placeholder {
		color: transparent;
	}

	.solids {
		position: relative;
	}

	.solids::after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
	}


	.solids::after {
		border: 8rpx solid #eee;
	}

</style>
