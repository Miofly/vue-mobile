<template>
	<view class="full-height" style="height: 100%!important;">
		<!--当tabList没加载处理空布局-->
		<view v-if="tabLists.length == 0"></view>
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;height: 100%!important;" v-else>
			<view class="full-height" style="height: 100%!important;">
				<!--固定在顶部的内容-->
				<view v-if="headerFixCon" class="bg-gradual-orange"
					  style="position: fixed;top: 0;left: 0;width: 100vw;border-bottom: 1px solid #eee;display: inline-block"
					  :style="{height: headerHeight + 'rpx'}">
					<view>

					</view>
					<view style="margin-right: 90rpx">
						<span style="float: left;margin-top: 12rpx;margin-left: 20rpx">添加到我的小程序，更多精彩！</span>
						<image src="/static/images/video/shouzhi.png" style="animation: scale-up 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
						<image src="/static/images/video/shouzhi.png" style="animation: scale-up 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
						<image src="/static/images/video/shouzhi.png" style="animation: scale-up 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
					</view>

				</view>
				<scroll-view scroll-x style="position: fixed;left: 0;z-index: 99999" :style="{top: headerHeight + 'rpx'}">
					<swiper-tab ref="swiperTab" v-model="tabClick" :tabLists="tabLists" :lineHeight="10"
								tabColor="red" :tabHeight="tabHeight - 6" textSize="18px" fullWidth="100vw">
					</swiper-tab>
				</scroll-view>
				<!--固定设置高度-->
				<view :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
				<!--固定内容-->
				<view v-if="fixCon" style="position: fixed;z-index: 9999;border-bottom: 1px solid #eee;border-top: 1px solid #eee;padding-top: 30rpx;padding-bottom: 30rpx"
					  class="bg-white full-width flex justify-around align-center"
					  :style="{height: fixHeight + 'rpx', top: tabHeight + 4 + headerHeight + 'rpx'}">
					<img src="/static/images/video/xingzhuang.png" style="width: 180rpx;height: 18rpx">
					<view class="text-center">
						<view class="text-bold text-red" style="font-size: 52rpx">{{lunarTime}}</view>
						<br>
						<view style="font-size: 42rpx">{{todayTime}}</view>
					</view>
					<img src="/static/images/video/xingz.png" style="width: 180rpx;height: 18rpx">
				</view>

				<swiper :style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						:current="tabClick" @change="swiperChange">
					<swiper-item v-for="(item, index) in tabLists" :key="index">
						<mescroll-item :i="index" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>

<script>
    import {dateUtils} from 'mioJs/dateUtils'
    import {mapState} from 'vuex'
    import MescrollItem from './scroll-item'
	import {
        publicPost
	} from '@/api'

    export default {
        onShareAppMessage() {
            return {
                path: 'pages/index/index',
            }
        },
        components: {
            MescrollItem,
        },
        data() {
            return {
                tabHeight: 96, // tab栏的高度
                fixHeight: 158, // 固定内容的高度
                fixCon: true, // 是否需要固定布局
                headerFixCon: true, // 是否需要头部固定布局

                todayTime: dateUtils.cnDateTime(),
                lunarTime: '',
                tabClick: 0, // 当前tab的下标
                cpgg: '',
                interstitialAd: null,
				mytimer: null
            }
        },
        methods: {
            swiperChange(e) { // 轮播菜单
                this.tabClick = e.detail.current
                this.$refs.swiperTab.longClick(e.detail.current)
            },
        },
        computed: {
            allHeight: function () {
                return this.tabHeight + this.fixHeight + this.headerHeight
            },
            headerHeight: function () { // 头部固定高度
                return this.headerFixCon ? 60 : 0
            },
			...mapState(['tabLists', 'shLists']),
        },
        async onLoad(e) {
            console.log('首页的参数', e)

            uni.removeStorageSync('firstGo')
            const str = dateUtils.solar2lunar().isLeapMonth ? '闰' : ''
            this.lunarTime = dateUtils.solar2lunar().gzYear + '年' + str + dateUtils.solar2lunar().fullLunarMonthString
            if (this.$store.state.tabLists.length == 0) {
                this.ui.showLoading()
            } else {
                uni.hideLoading()
            }

            if (e.isShare) {
                console.log('从分享进入的1')
                await publicPost('statvideo/statclickshare', {
                    classify_id: e.videoType,
                    video_id: e.video_id,
                    vid: e.videoVid,
                    click_num: 1,
                })

                uni.navigateTo({url: '/pages/index/video'})

                this.ui.setStorage('videoVid', e.videoVid)
                this.ui.setStorage('video_id', e.video_id)
                this.ui.setStorage('videoType', e.videoType)
                this.ui.setStorage('videoTitle', e.title)
                this.ui.setStorage('videoImg', e.img)
                this.ui.setStorage('time', e.time)
                this.ui.setStorage('isShare', true)
			}

            this.interstitialAd = null
            if (wx.createInterstitialAd) {
                if (this.$store.state.ggkz == 'pf') {
                    this.cpgg = this.$store.state.pfcpggId
                }
                if (this.$store.state.ggkz == 'ag') {
                    this.cpgg = this.$store.state.agcpggId
                }
                if (this.$store.state.ggkz == 'lg') {
                    this.cpgg = this.$store.state.lgcpggId
                }
                if (this.$store.state.ggkz == 'dd') {
                    this.cpgg = this.$store.state.ddcpggId
                }
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: this.cpgg
                })
                this.interstitialAd.onLoad(() => {
                    console.log('插屏广告加载成功')
                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
                })
                this.interstitialAd.onClose(() => {
                    console.log('插屏广告关闭')
                })
            }
        },
		async onShow () {
            console.log('执行清除')
            const data = await publicPost('xcx/conf', undefined, false)
            this.$store.state.shLists = data.data
            uni.removeStorageSync('firstGo')

            this.mytimer = setTimeout(() => {
                this.interstitialAd.show().catch((err) => {
                    console.error(err)
                })
            }, this.tu.randomNum(10000, 30000))

            this.mytimer = setTimeout(() => {
                this.interstitialAd.show().catch((err) => {
                    console.error(err)
                })
            }, this.tu.randomNum(30000, 60000))
		},
		onUnload () {
            console.log('执行清除')
            uni.removeStorageSync('firstGo')
			clearTimeout(this.mytimer)
		},
		onHide () {
            clearTimeout(this.mytimer)
		},
    }
</script>

<style>
	>>> .upwarp-nodata {
		font-size: 42rpx !important;
	}

	>>> .upwarp-tip, .downwarp-tip, .empty-tip {
		font-size: 42rpx !important;
	}

	@keyframes scale-up {
		0% {
			transform: scale(1)
		}
		100% {
			transform: scale(1.2)
		}
	}
</style>
