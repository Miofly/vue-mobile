<template>
	<view class="bg-white">
		<view class="full-width bg-red text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<!--<view @click="router.replace({name: 'lz_home'})" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>-->
			<view @tap="tu.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			新增标题
		</view>
		<!--<view class="cu-form-group margin-top">-->
			<!--<view class="title">标题</view>-->
			<!--<input v-model="title" placeholder="请输入标题" name="input" />-->
		<!--</view>-->
		<view class="cu-form-group align-start" style="border-bottom: 1px solid #eee">
			<view class="title">描述</view>
			<textarea v-model="desc" maxlength="-1" @input="textareaAInput" placeholder="请输入描述"></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view v-show="imgList" class="bg-img" @tap="ViewImage"
					  :data-url="imgList">
					<image :src="imgList" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg">
						<text class="fa fa-close"></text>
					</view>
				</view>

				<view class="solids text-center">
					<input type="file" @tap="ChooseImage" class="fa fa-camera margin-top-forty text-grey text-center" style="font-size: 1.2rem;margin-left: 0.7rem" />
				</view>
			</view>
		</view>
		<modal title="提示" content="确认要删除图片吗？" @click="handleClick"
			   :show="status" :custom="false" @cancel="status = false">
			<view class="fa fa-close" style="position: absolute; top:20px;right: 20px"
				  @tap="status = false"></view>
		</modal>
		<view class="padding">
			<button class="cu-btn " @tap="submit" :class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0],
		        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
				<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
				提交
			</button>
		</view>

	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'
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
            handleClick (e) {
                if (e.index == 0) {
                    this.status = false
                } else {
                    this.file = ''
                    this.imgList = ''
                    this.status = false
                }
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
            async submit () {
                // if (this.title.trim() == '') {
                //     this.ui.showToast('标题不能为空')
				// 	return
                // }
                if (this.desc.trim() == '') {
                    this.ui.showToast('描述不能为空')
                    return
                }
                if (this.file.trim() == '') {
                    this.ui.showToast('请上传图片')
                    return
                }
                const formData = new FormData()
                formData.append('title', this.title)
                formData.append('desc', this.desc)
				console.log(this.file)
                formData.append('pic', this.file)
                const token = localStorage.getItem('TOKEN_KEY')

				this.ui.showLoading('正在上传...')
                uni.uploadFile({
                    url: 'http://api.lezhuan2020.cn/api/title/add-team-title', // 仅为示例，非真实的接口地址
                    // url: 'http://new-lz-test.52eja.com:443/api/title/add-team-titzle', // 仅为示例，非真实的接口地址
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
						    this.ui.showToast('上传成功')
							this.title = ''
							this.desc = ''
                            this.imgList = ''
                            this.file = ''
						} else {
                            this.ui.showToast(JSON.parse(res.data).message)
							if (JSON.parse(res.data).code == 403) {
                                this.ui.showToast('登录已过期...正在跳转至登录界面...')
                                setTimeout(() => {
                                    // this.router.replaceAll({name: 'login'})
                                    uni.reLaunch({
                                        url:'/pages/index/login/login'
                                    })
                                }, 2000)
							}
						}
                    },
                    error: (err) => {
                        this.ui.showToast('上传失败，请重新上传')
						uni.hideLoading()
                        console.log(err)
					}
                })
            },
        },
    }
</script>

<style>

</style>
