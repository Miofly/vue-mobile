<template>
	<view class="full-width-height">
		<view class="text-center margin-top-xl">
			<view class="margin-left">
				<view class="cu-avatar" style="width: 260rpx;height: 260rpx"
					  :class="[false ? 'radius' : 'round']"
					  :style="{backgroundImage: 'url('+ avatar +')'}">
				</view>
			</view>
			<view class="margin-left">
				<view class=" text-lg margin-top" style="font-size: 42rpx">
					{{nowName}}的视频列表
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in dataLists" :key="index" class="cu-item"
				  style="background: white!important;border-bottom: 1px solid #eee"
				  @tap="playVideo(item.vid, item.title, item.cover_img, item.classify_id, item.id)">
				<view class="content padding-top">

					<view v-if="index == 1">
						<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
					</view>
					<view v-if="index > 1 && index % 3 == 0">
						<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
						<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
					</view>

					<view id="test" ref="menuList" class="padding-top-bottom-lg" style="width: 100%!important">
						<!--:style="{opacity: tempStatus ? 1 : 0}">-->
						<!--
							scrollTop: 0 || newscroll(e) {this.scrollTop = e.detail.scrollTop}
							>>> .spin-circle {background: url('@/static/images/common/loading1.gif') no-repeat center !important;}
							>>> .easy-loadimage{width: 100%;}  >>> .origin-img{border-radius: 20rpx;}
						-->
						<view style="width: 100%;height: 500rpx;position: relative;">
							<image :src="item.cover_img"
								   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][1]"
								   style="border-radius: 20rpx;height: 100%;width: 100%;">
							</image>
							<img src="/static/images/video/bofang@2x.png"
								 style="position: absolute;width: 160rpx;height: 160rpx;left: 40%;top: 30%;z-index: 9999999!important;">
							<view style="position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, 0.3);
								width: 100%;color: white;z-index: 999;border-bottom-left-radius: 20rpx;
								border-bottom-right-radius: 20rpx;padding-bottom: 20rpx">
								<view class="margin-left-lg margin-top text-bold" style="font-size: 46rpx;">
									{{item.title.length > 40 ? item.title.slice(0 , 40) + '...' : item.title}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view style="position: fixed; bottom: 200rpx;right: 10px;height: 115rpx;width: 115rpx" @tap="changVideo">
				<image src="/static/images/video/change.png" @tap="ui.showImg()"
					   style="height: 115rpx;width: 115rpx;opacity: 0.7"
					   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"
					   :class="[false?'cu-avatar':'', false?'round': '']">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
    import {
        publicPost,
        getDataSjs,
        publicGet
    } from '@/api'
	import {mapState} from 'vuex'

    export default {
        onShareAppMessage() {

        },
        async onLoad() {
            this.avatar = this.ui.getStorageSync('videoAvatar')
            this.nowName = this.ui.getStorageSync('videoNowName')
            const data = await getDataSjs()
            this.dataLists = data.data

            this.interstitialAd = null
            if (wx.createInterstitialAd) {
                if (this.$store.state.ggkz == 'pf') {
                    this.cpgg = this.$store.state.pfcpggId
                }
                if (this.$store.state.ggkz == 'dd') {
                    this.cpgg = this.$store.state.ddcpggId
                }
                if (this.$store.state.ggkz == 'ag') {
                    this.cpgg = this.$store.state.agcpggId
                }
                if (this.$store.state.ggkz == 'lg') {
                    this.cpgg = this.$store.state.lgcpggId
                }
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: this.cpgg
                })
                this.interstitialAd.onLoad(() => {
                    console.log('插屏广告加载成功')
                    if (this.interstitialAd) {
                        setTimeout(() => {
                            this.interstitialAd.show().catch((err) => {
                                console.error(err)
                            })
                        }, this.tu.randomNum(20000, 20000))
                    }
                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
                })
                this.interstitialAd.onClose(() => {
                    console.log('插屏广告关闭')
                })
            }
        },
        methods: {
            async changVideo() {
                this.dataLists = []
                const data = await await getDataSjs() // 获取的数据
                console.log(data)
                this.dataLists = data.data
            },
            async playVideo(vid, title, img, classify_id, id) {
                this.ui.setStorage('videoVid', vid)
                this.ui.setStorage('videoType', classify_id)
                this.ui.setStorage('videoTitle', title)
                this.ui.setStorage('videoImg', img)
                this.ui.setStorage('classify_id', classify_id)
                this.ui.setStorage('video_id', id)
                // this.$Router.push({name: 'video', query: {vid: vid, type: this.nowType}})
                uni.navigateTo({url: '/pages/index/videoNew'})

                const data = await publicPost('statvideo/statclickshare', {
                    classify_id: classify_id,
                    video_id: id,
                    vid: vid,
                    click_num: 1,
                })
                console.log(data)
            },
        },
        data() {
            return {
                cpgg: '',
                interstitialAd: null,
                scrollTop: 0,
                dataLists: [],
                avatar: '',
                nowName: '',
                nowType: '',
                interstitialAd: ''
            }
        },
        computed: {
            ...mapState(['ddptggId', 'ddjlspId', 'ddcpggId', 'ddspggId', 'ddsptpId', 'shLists', 'tabLists', 'pfptggId', 'pfjlspId', 'pfcpggId', 'pfspggId', 'pfsptpId', 'agptggId', 'agjlspId', 'agcpggId', 'agspggId', 'agsptpId', 'lgptggId', 'lgjlspId', 'lgcpggId', 'lgspggId', 'lgsptpId', 'ggkz']),
        },
    }
</script>


<style>
	page {
		background: white;
	}

	.active {
		animation: fade 1s linear 0s forwards;
	}

	>>> .mescroll-empty {
		background: white;
	}

	>>> .origin-img {
		border-radius: 20rpx;
	}

	>>> .easy-loadimage {
		width: 100%;
	}

	>>> .loadfail-img {
		height: 300rpx !important;
	}


</style>
