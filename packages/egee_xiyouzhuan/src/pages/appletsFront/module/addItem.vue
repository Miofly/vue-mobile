<template>
	<view class="bg-white">
		<view class="full-width text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			<view>新增标题</view>
		</view>
		<view class="cu-form-group align-start padding" style="border-bottom: 1px solid #eee">
			<view class="text-xl">描述</view>
			<textarea @input="textareaAInput" maxlength="-1" placeholder="请输入描述" v-model="desc"></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view :data-url="imgList" @tap="ViewImage" class="bg-img"
					  v-show="imgList">
					<image :src="imgList" mode="aspectFill"></image>
					<view @tap.stop="delImg" class="cu-tag bg-red">
						<text class="fa fa-close"></text>
					</view>
				</view>

				<view class="solids text-center">
					<input @tap="ChooseImage" class="fa fa-camera margin-top-forty text-grey text-center" style="font-size: 1.2rem;margin-left: 0.7rem"
						   type="file" />
				</view>
			</view>
		</view>
		<modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="status"
			   :titleSize="40" desc="" descColor="#999d9c" title="确认要删除图片吗？" titleColor="black" width="90vw">
			<view class="text-center flex justify-between">
				<m-button :disabled="false" :hairLine="true" :loading="false" :plain="false" :ripple="true"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
						  @tap="status = false" class="text-white fulls-width margin-top-xxl"
						  style="height: 60rpx;background: #FB5B55;">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					取消
				</m-button>
				<m-button :disabled="false" :hairLine="true" :loading="false" :plain="false" :ripple="true"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
						  @tap="handleClick" class="text-white fulls-width margin-top-xxl margin-left-xxl"
						  style="height: 60rpx">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					确认
				</m-button>
			</view>
		</modal>

		<view class="padding">
			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
					  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
					  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style="background: #ef560e;"
					  @tap="submit" class="text-white" :customStyle="{fontSize: '14px'}">
				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
				提交
			</m-button>
		</view>

	</view>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                title: '',
                desc: '',
                imgList: '',
                file: '',
                status: false,
            }
        },
        methods: {
            handleClick(e) {
                this.file = ''
                this.imgList = ''
                this.status = false
            },
            textareaAInput(e) {
                this.textareaAValue = e.detail.value
            },
            delImg(e) {
                this.status = true
            },
            ChooseImage(data) {
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'][1], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 从相册选择
                    success: (res) => {
                        this.file = res.tempFilePaths[0] // 要用formData上传的信息
                        console.log(res.tempFilePaths)
                        console.log(this.file)
                        this.imgList = res.tempFilePaths[0] // 要显示的图片资源
                    }
                })
            },
            async submit() {
                if (this.desc.trim() == '') {
                    this.$mio.mioRoot.showToast('描述不能为空')
                    return
                }
                if (this.file.trim() == '') {
                    this.$mio.mioRoot.showToast('请上传图片')
                    return
                }
                const formData = new FormData()
                formData.append('title', this.title)
                formData.append('desc', this.desc)
                console.log(this.file)
                formData.append('pic', this.file)
                const token = localStorage.getItem('TOKEN_KEY')

                this.$mio.mioRoot.showLoading('正在上传...')
                uni.uploadFile({
                    url: 'http://api.xiyouzhuan2020.com/api/title/add-team-title', // 仅为示例，非真实的接口地址
                    filePath: this.file,
                    header: {Authorization: `${token}`},
                    name: 'pic',
                    formData: {
                        // title: this.title,
                        desc: this.desc
                    },
                    success: (res) => {
                        uni.hideLoading()
                        console.log(res.data)
                        if (JSON.parse(res.data).code == 200) {
                            this.$mio.mioRoot.showToast('上传成功')
                            this.title = ''
                            this.desc = ''
                            this.imgList = ''
                            this.file = ''
                        } else {
                            this.$mio.mioRoot.showToast(JSON.parse(res.data).message)
                            if (JSON.parse(res.data).code == 403) {
                                this.$mio.mioRoot.showToast('登录已过期...正在跳转至登录界面...')
                                setTimeout(() => {
                                    // this.router.replaceAll({name: 'login'})
                                    uni.reLaunch({
                                        url: '/pages/index/login/login'
                                    })
                                }, 2000)
                            }
                        }
                    },
                    error: (err) => {
                        this.$mio.mioRoot.showToast('上传失败，请重新上传')
                        uni.hideLoading()
                        console.log(err)
                    }
                })
            },
        },
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
