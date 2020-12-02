<template>
	<scroll-view scroll-y class="full-height bg-white" :scroll-into-view="toView" style="height: 100vh"
				 scroll-with-animation="true">
		<view style="height: 100%;position: relative">

			<video v-if="ggkz == 'pf'" id="myVideo" ref="myVideo" class="full-width"
				   style="height: 60vh" controls="true" :initial-time="zdTime"
				   :poster="poster" :src="playSrc" autoplay @error="videoErrorCallback" page-gesture="true"
				   enable-play-gesture="true"
				   vslide-gesture="true" @play="playMv" @ended="playEnd" :title="mvTitle" @timeupdate="playStatus">
			</video>

			<video v-if="ggkz == 'ag'" custom-cache="false" id="myVideo" ref="myVideo" class="full-width"
				   style="height: 60vh" :initial-time=zdTime play-btn-position="center" @waiting="videoWait"
				   :poster="poster" :src="playSrc" autoplay @error="videoErrorCallback" page-gesture="true"
				   enable-play-gesture="true" show-casting-button="true" picture-in-picture-mode="true"
				   vslide-gesture="true" controls="true" @play="playMv" @ended="playEnd" :title="mvTitle"
				   @timeupdate="playStatus">
			</video>

			<video v-if="ggkz == 'lg'" id="myVideo" ref="myVideo" class="full-width"
				   style="height: 60vh" controls="true" :initial-time="zdTime"
				   :poster="poster" :src="playSrc" autoplay @error="videoErrorCallback" page-gesture="true"
				   enable-play-gesture="true"
				   vslide-gesture="true" @play="playMv" @ended="playEnd" :title="mvTitle" @timeupdate="playStatus">
			</video>

			<video v-if="ggkz == 'dd'" id="myVideo" ref="myVideo" class="full-width"
				   style="height: 60vh" controls="true"
				   :poster="poster" :src="playSrc" autoplay @error="videoErrorCallback" page-gesture="true"
				   enable-play-gesture="true"
				   vslide-gesture="true" @play="playMv" @ended="playEnd" :title="mvTitle" @timeupdate="playStatus">
			</video>

			<view id="tj" style="position: relative;top: 50%;left: 0"></view>

			<view v-if="endStatus" style="position: absolute;top: 0;left: 0;z-index: 9999;
			color: white;height: 50vh;background: rgba(0, 0, 0, 0.7);width: 100vw">
				<view style="width: 100%;height: 60rpx" class="bg-gradual-orange">
					<span style="float: left;margin-top: 12rpx;margin-left: 20rpx">添加到我的小程序，更多精彩！</span>
					<view style="margin-right: 90rpx">
						<image src="/static/images/video/shouzhi.png"
							   style="animation: scale-up2 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
						<image src="/static/images/video/shouzhi.png"
							   style="animation: scale-up2 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
						<image src="/static/images/video/shouzhi.png"
							   style="animation: scale-up2 1s linear 0s infinite alternate;width: 40rpx;height: 40rpx;margin-top: 12rpx;float: right;"></image>
					</view>
				</view>
				<view class="full-width-height text-center" style="position: absolute;left: 0;padding-top: 10%">
					<view class="">
						<button style="width: 200rpx;height: 200rpx;border-radius: 50%;background: transparent"
								open-type="share">
							<image src="/static/images/video/weixin.png" style="width: 100%;height: 100%"
								   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"
								   :class="[false?'cu-avatar':'', false?'round': '']">
							</image>
						</button>
						<view class="text-xxl">
							转发
						</view>
					</view>
					<view class="margin-top-xl" @tap="replay">
						<button style="width: 200rpx;height: 200rpx;border-radius: 50%;background: transparent">
							<image src="/static/images/video/replay.png" style="width: 100%;height: 100%"
								   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"
								   :class="[false?'cu-avatar':'', false?'round': '']">
							</image>
						</button>
						<view class="text-xxl">
							重播
						</view>
					</view>

					<!--<view style="margin-top: 10%" @tap="bindToView">-->
					<!--<view class="text-lg" style="animation: scale-up2 1s linear 0s infinite alternate;">更多视频</view>-->
					<!--<image src="/static/images/video/xz.png" @tap="ui.showImg()" style="width: 50rpx;height: 50rpx"-->
					<!--class="margin-top"-->
					<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"-->
					<!--:class="[false?'cu-avatar':'', false?'round': '']">-->
					<!--</image>-->
					<!--</view>-->
				</view>
			</view>

			<view style="height: 100%;position: absolute;top:60%;">
				<view style="height: 10%;background: #000" class="flex justify-around bg-black align-center">
					<button class="cu-btn" open-type="share"
							:class="[false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
							style="background: rgb(0, 176, 0);color: white;width:300rpx;height: 80rpx;font-size: 32rpx!important;
							animation: scale-up 1s linear 0s infinite alternate;">
						<text v-show="false" class="fa fa-wechat padding-right-ten" :disabled="false"></text>
						发送给好友
					</button>

					<button class="cu-btn" open-type="share" style="width:250rpx;height: 80rpx;font-size: 32rpx!important;
					animation: scale-up 1s linear 0s infinite alternate;"
							:class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
						<text v-show="false" class="fa fa-wechat padding-right-ten" :disabled="false"></text>
						分享到群
					</button>
				</view>
				<view style="height: 10%" class="flex justify-around align-center bg-white">
					<view @tap="goodFriend" class="margin-left">
						<view style="animation: scale-up2 1s linear 0s infinite alternate;" class="cu-avatar   "
							  :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][1], ]"
							  :style="{backgroundImage: 'url('+ avatar +')'}">
						</view>
					</view>
					<view @tap="goodFriend" class="margin-left">
						<view class="fl text-lg margin-top ">
							{{nowName}}
						</view>
						<view class="fl text-sm">
							{{videoNum}}个视频
						</view>
					</view>
					<view style="clear: both"></view>
					<view class="" style="width:280rpx;height: 80rpx;">
						<button class="cu-btn full-width-height" @tap="bindToView"
								:class="[false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
								style="background: rgb(0, 176, 0);color: white;font-size: 32rpx!important;">
							<!--<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>-->
							相关推荐
						</button>
					</view>
					<view @tap="backIndex" style="width:280rpx;height: 80rpx;" class="margin-left-right">
						<button style="font-size: 32rpx!important;" class="cu-btn full-width-height"
								:class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
							<!--<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>-->
							返回首页
						</button>
					</view>
				</view>
			</view>

			<view style="position: absolute;top: 70%;width: 100%!important;">
				<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
				<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
				<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
				<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
			</view>
			<!--<view style="position: absolute;top: 80%;width: 50%!important;background: red;height: 500rpx;right: 0">-->
			<!--</view>-->
		</view>

		<view style="margin-top: 300rpx">
			<!--<view class="margin-left-lg text-bold text-black" style="font-size: 40rpx">-->
			<!--{{title}}-->
			<!--</view>-->

			<!--<view class="padding-bottom-xxl padding-top-xxl text-center margin-center"-->
			<!--style="width: 700rpx!important;border-bottom: 1px solid #eee;padding-bottom: 10%">-->
			<!--</view>-->

			<view>
				<img src="/static/images/video/fengexian@2x.png" style="width: 100vw;height: 26rpx">
			</view>

			<view class="text-center margin-top-lg">
				<img src="/static/images/video/xinshang@2x.png" style="width: 500rpx;height: 66rpx">
			</view>

			<view class="cu-list menu" :class="[true?'sm-border':'', false?'card-menu margin-top':'']"
				  style="background: rgb(240, 242, 245)!important;">
				<view v-for="(item, index) in lists" :key="index" class="cu-item"
					  @tap="playVideo(item.vid, item.cover_img, item.title, item.classify_id, item.id)"
					  style="background: rgb(255, 255, 255)!important;padding-bottom: 3%!important;padding-top: 3%!important;">

					<view class="content">

						<view v-if="index > 1 && index % 4 == 0 && shLists.is_show_advert == 1">
							<view v-if="index == 4 && shLists.is_add_xcx" @tap.stop="tz"
								  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 500rpx;right: 0">
							</view>
							<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
						</view>

						<view v-if="index % 4 != 0">
							<view style="width: 350rpx;display: block;font-weight: bold;font-size: 40rpx!important;">
								{{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}}
							</view>

							<view style="height: 220rpx;width: 288rpx;position: relative;"
								  :style="{left: index > 1 && index % 4 == 0 ? '350rpx' : '',
								  }" class="margin-left">

								<image :src="item.cover_img"
									   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
									   style="border-radius: 20rpx;height: 100%!important;width: 100%">
								</image>
								<img src="/static/images/video/bofang@2x.png" style="position: absolute;width: 72rpx;height: 72rpx;
						left: 38%;top: 40%;z-index: 9999999!important;">
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="margin-top-xl">
				<img src="/static/images/video/daodi@2x.png" style="width: 100vw;height: 42rpx">
			</view>

			<view class="text-center margin-top-xl" @tap="backIndex">
				<button class="cu-btn" :class="[false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						style="background: rgb(0, 176, 0);color: white;font-size: 32rpx!important;width: 500rpx;height: 82rpx">
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>-->
					返回首页
				</button>
			</view>
		</view>

		<view class="height: 50rpx"></view>
	</scroll-view>
</template>

<script>
    import {
        getDataTj,
        publicPost
    } from '@/api'
    import {mapState} from 'vuex'

    export default {
        async onLoad(e) {
            this.zdTime = this.ui.getStorageSync('time')
            this.isShare = this.ui.getStorageSync('isShare')
            this.vid = this.ui.getStorageSync('videoVid')
            this.videoType = this.ui.getStorageSync('videoType')
            this.video_id = this.ui.getStorageSync('video_id')

            this.endStatus = false

            const res = await publicPost('out/get-vv-url', {vid: this.vid})
            console.log('播放的视屏：', res.data.url)
            this.playSrc = res.data.url

            this.videoNum = this.tu.randomNum(30, 100)
            this.nowName = this.tu.makeRandomArr(this.nameLists, 1)
            this.avatar = `http://xcx-liuliang.oss-cn-shanghai.aliyuncs.com/video-xcx/imgimg/${this.tu.randomNum(1, 20)}.jpg`
            this.playerid = 'pid' + this.tu.randomNum(30, 100)
            const newData = await getDataTj(this.vid, this.videoType)
            this.lists = newData.data
            this.title = this.ui.getStorageSync('videoTitle')
            this.img = this.ui.getStorageSync('videoImg')


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

                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
                })
                this.interstitialAd.onClose(() => {
                    console.log('插屏广告关闭')
                })
            }

            this.videoAd = null

			if (this.$store.state.shLists.is_add_xcx) {
                if (wx.createRewardedVideoAd) {
                    if (this.$store.state.ggkz == 'pf') {
                        this.jlgg = this.$store.state.pfjlspId
                    }
                    if (this.$store.state.ggkz == 'ag') {
                        this.jlgg = this.$store.state.agjlspId
                    }
                    if (this.$store.state.ggkz == 'lg') {
                        this.jlgg = this.$store.state.lgjlspId
                    }
                    if (this.$store.state.ggkz == 'dd') {
                        this.jlgg = this.$store.state.ddjlspId
                    }
                    this.videoAd = wx.createRewardedVideoAd({
                        adUnitId: this.jlgg
                    })
                    this.videoAd.onLoad((e) => {
                        console.log(e)
                    })
                    this.videoAd.onError((err) => {
                        console.log('插屏广告出错', err)
                    })
                    this.videoAd.onClose((res) => {
                        console.log('插屏广告关闭')
                    })
                }
			}
        },
        onShareAppMessage(res) {

            this.endShareTime = this.endShareTime + 1

            publicPost('statvideo/statclickshare', {
                classify_id: this.ui.getStorageSync('classify_id'),
                video_id: this.ui.getStorageSync('video_id'),
                vid: this.ui.getStorageSync('videoVid'),
                share_num: 1,
            })

            return {
                title: this.title,
                path: `pages/index/index?videoVid=${this.vid}&videoType=${this.videoType}&video_id=
                ${this.ui.getStorageSync('video_id')}&title=${this.title}&img=${this.img}&isShare=true`,
                imageUrl: this.img
            }
        },
        data() {
            return {
                cache: false,
                isShare: false,
                zdTime: 30,
                cpgg: '',
                jlgg: '',
                videoAd: null,
                interstitialAd: null,
                poster: '',
                playSrc: '',
                mvTitle: '',
                video_id: '',
                videoNum: '',
                endStatus: false,
                lists: [],
                vid: '',
                toView: '',
                img: '',
                title: '',
                videoType: '',
                avatar: '',
                nameLists: [
                    '菲菲公主', '沉默的熊', '风随心动', '三无先森', '删除过去', '忆似水年华', '老马与小马', '寂寞的鱼', '金色枫叶', '烟雨过客', '雪中无处寻',
                    '一世两相依', '滴水穿石', '人老心不老', '再见爱情', '树上向日葵', '闲云野鹤', '永远年轻', '墨染安然', '上善若水', '月色朦胧', '雪中无处寻', '' +
                    '花自芬芳', '倒转流年', '失她失心', '青春最珍贵', '飘雪无垠', '八枝玫瑰', '谁的主角', '暗香袭人', '残破的羽翼', '风淡云轻', '迷失未来'
                ],
                nowAvatar: '',
                nowName: '',
                txvContext: '',
                firstGo: false,
                playerid: '',

                ggStatus: '',

                endAvTime: '',
                endShareTime: 0,

                jlStatus: true
            }
        },
        onShow() {
            if (this.firstGo) {
                const newVideo = uni.createVideoContext('myVideo')
                this.video = newVideo
                newVideo.pause()
            }

            setTimeout(() => {
                this.interstitialAd.show()
            }, this.tu.randomNum(10000, 30000))

            setTimeout(() => {
                this.interstitialAd.show()
            }, this.tu.randomNum(30000, 60000))
        },
        async onUnload() {
            console.log('执行清除')
            uni.removeStorage('firstGo')
			console.log('关闭时间', this.endAvTime)
			console.log('分享次数', this.endShareTime)
			console.log('关闭时间', this.endAvTime == '')

			if (this.endAvTime == '') {
			    console.log('视频没有播放')
			} else {
                await publicPost('statvideo/visit-pv', {
                    classify_id: this.videoType,
                    video_id: this.video_id,
                    vid: this.vid,
                    play_length: parseInt(this.endAvTime),
                    share_num: this.endShareTime,
                })
			}
        },
        onHide() {
            this.firstGo = true
            this.ui.setStorage('firstGo', true)
        },
        methods: {
            videoWait(e) {

            },
            tz() {
                wx.navigateToMiniProgram({
                    appId: 'wx1fcf825366c41614',
                    success(res) {
                        // 打开成功
                        console.log(res)
                    }
                })
            },
            playEnd() {
                console.log('播放结束')
                this.endStatus = true
            },
            playMv() {
                console.log('缓冲结束')
            },
            videoErrorCallback(err) {
                console.log(err)
            },
            playStatus(e) {
                if (e.type == 'waiting') {
                    console.log('视频缓冲')
                    this.endStatus = true
                } else {
                    if (!this.isShare) {
                        if (e.detail.currentTime > 15 && this.jlStatus) {
                            this.videoAd.show()
                            this.jlStatus = false
                        }
                    }

                }
                this.endAvTime = e.detail.currentTime
            },
            replay() {
                const newVideo = uni.createVideoContext('myVideo')
                this.video = newVideo
                newVideo.play()
                this.endStatus = false
            },
            videoEnd() {
                this.endStatus = true
                console.log('播放结束')
            },
            goodFriend() {
                this.ui.setStorage('videoAvatar', this.avatar)
                this.ui.setStorage('videoNowName', this.nowName)
                uni.navigateTo({url: '/pages/index/videoList'})

                const newVideo = uni.createVideoContext('myVideo')
                this.video = newVideo
                newVideo.pause()
            },
            async playVideo(vid, img, title, classify_id, id) {
                this.ui.setStorage('videoVid', vid)
                this.ui.setStorage('isShare', false)
                this.ui.setStorage('videoTitle', title)
                this.ui.setStorage('videoImg', img)
                this.ui.setStorage('classify_id', classify_id)
                this.ui.setStorage('video_id', id)
                uni.redirectTo({url: '/pages/index/videoNew'})

                const data = await publicPost('statvideo/statclickshare', {
                    classify_id: classify_id,
                    video_id: id,
                    vid: vid,
                    click_num: 1,
                })
            },
            bindToView() {
                this.toView = 'tj'
                setTimeout(() => {
                    this.toView = ''
                }, 100)
            },
            backIndex() {
                uni.redirectTo({url: '/pages/index/index'})
            },
        },
        computed: {
            ...mapState(['ddptggId', 'ddjlspId', 'ddcpggId', 'ddspggId', 'ddsptpId', 'shLists', 'tabLists', 'pfptggId', 'pfjlspId', 'pfcpggId', 'pfspggId', 'pfsptpId', 'agptggId', 'agjlspId', 'agcpggId', 'agspggId', 'agsptpId', 'lgptggId', 'lgjlspId', 'lgcpggId', 'lgspggId', 'lgsptpId', 'ggkz']),
        },
    }
</script>

<style>
	@keyframes scale-up {
		0% {
			transform: scale(1)
		}
		100% {
			transform: scale(1.05)
		}
	}

	@keyframes scale-up2 {
		0% {
			transform: scale(1)
		}
		100% {
			transform: scale(1.2)
		}
	}
</style>
