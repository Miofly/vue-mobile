<template>
	<scroll-view scroll-y class="full-height bg-white" :scroll-into-view="toView" style="height: 100vh"
				 scroll-with-animation="true">
		<view style="height: 100%;position: relative">
			<txv-video v-if="playerid" @ended="videoEnd" :vid="vid" :playerid="playerid" width="100vw" height="60vh"
					   autoplay="true" style="position: absolute;top: 0;left: 0"></txv-video>

			<!--<view v-if="endStatus" style="position: absolute;top: 0;left: 0;z-index: 9999;-->
			<!--color: white;height: 80vh;background: rgba(0, 0, 0, 0.7);width: 100vw">-->
			<!--<view class="full-width-height text-center" style="position: absolute;left: 0;padding-top: 20%">-->
			<!--&lt;!&ndash;<ad unit-id="adunit-00e1022d0ea25478"></ad>&ndash;&gt;-->
			<!--<view class="">-->


			<!--<button style="width: 200rpx;height: 200rpx;border-radius: 50%;background: transparent"-->
			<!--open-type="share">-->
			<!--<image src="/static/images/video/weixin.png" style="width: 100%;height: 100%"-->
			<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"-->
			<!--:class="[false?'cu-avatar':'', false?'round': '']">-->
			<!--</image>-->
			<!--</button>-->
			<!--<view class="text-xxl">-->
			<!--转发-->
			<!--</view>-->
			<!--</view>-->
			<!--<view class="margin-top-xl" @tap="replay">-->
			<!--<button style="width: 200rpx;height: 200rpx;border-radius: 50%;background: transparent">-->
			<!--<image src="/static/images/video/replay.png" style="width: 100%;height: 100%"-->
			<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"-->
			<!--:class="[false?'cu-avatar':'', false?'round': '']">-->
			<!--</image>-->
			<!--</button>-->
			<!--<view class="text-xxl">-->
			<!--重播-->
			<!--</view>-->
			<!--</view>-->

			<!--<view style="margin-top: 10%" @tap="bindToView">-->
			<!--<view class="text-lg" style="animation: scale-up 1s linear 0s infinite alternate;">更多视频</view>-->
			<!--<image src="/static/images/video/xz.png" @tap="ui.showImg()" style="width: 50rpx;height: 50rpx"-->
			<!--class="margin-top"-->
			<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"-->
			<!--:class="[false?'cu-avatar':'', false?'round': '']">-->
			<!--</image>-->
			<!--</view>-->
			<!--</view>-->
			<!--</view>-->

			<view id="tj" style="position: relative;top: 50%;left: 0"></view>

			<view style="height: 100%;position: absolute;top: 60%;">
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
							:class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0],
				false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
						<text v-show="false" class="fa fa-wechat padding-right-ten" :disabled="false"></text>
						分享到群
					</button>
				</view>
				<view style="height: 10%" class="flex justify-around align-center bg-white">
					<view @tap="goodFriend" class="margin-left">
						<view class="cu-avatar   "
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

			<ad v-if="ggkz == 'pf'" style="position: absolute;top: 80%;" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
			<ad v-if="ggkz == 'dd'" style="position: absolute;top: 80%;" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
			<ad v-if="ggkz == 'ag'" style="position: absolute;top: 80%;" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
			<ad v-if="ggkz == 'lg'" style="position: absolute;top: 80%;" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>

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
					  @tap="playVideo(item.vid, item.cover_img, item.title, item.classify_id, item.id, item.break_point_length)"
					  style="background: rgb(255, 255, 255)!important;padding-bottom: 3%!important;padding-top: 3%!important;">

					<view class="content">

						<view v-if="index > 1 && index % 4 == 0">
							<ad v-if="ggkz == 'pf'" style="" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'dd'" style="" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'ag'" style="" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'lg'" style="" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
						</view>

						<view v-if="index % 4 != 0">
							<!--<view class="content">-->
							<view style="width: 350rpx;display: block;font-weight: bold;font-size: 40rpx!important;">
								{{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}}
							</view>
							<!--</view>-->

							<view style="height: 220rpx;width: 288rpx;position: relative;"
								  :style="{left: index > 1 && index % 4 == 0 ? '350rpx' : '',
								  }" class="margin-left">
								<!--<imgLoad :scroll-top="0" mode="aspectFill" class="full-width-height"-->
								<!--:image-src="item.cover_img"-->
								<!--:loading-mode="['spin-circle', 'skeleton-1', 'skeleton-2', 'looming-gray'][0]">-->
								<!--</imgLoad>-->
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
        publicGet,
        publicPost,
        getDataTj,
    } from '@/api'
	import {mapState} from 'vuex'

    const TxvContext = requirePlugin('tencentvideo')

    export default {
        onShareAppMessage(res) {
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
                cpgg: '',
                interstitialAd: null,
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

				ggStatus: ''
            }
        },
        async onLoad(e) {
            this.endStatus = false
            this.videoNum = this.tu.randomNum(30, 100)
            this.nowName = this.tu.makeRandomArr(this.nameLists, 1)
            this.avatar = `http://xcx-liuliang.oss-cn-shanghai.aliyuncs.com/video-xcx/imgimg/${this.tu.randomNum(1, 20)}.jpg`
            this.playerid = 'pid' + this.tu.randomNum(30, 100)
            this.vid = this.ui.getStorageSync('videoVid')
            this.videoType = this.ui.getStorageSync('videoType')
            const newData = await getDataTj(this.vid, this.videoType)
            this.lists = newData.data
            this.title = this.ui.getStorageSync('videoTitle')
            this.img = this.ui.getStorageSync('videoImg')
        },
        onShow() {
            if (this.firstGo) {
                this.txvContext = TxvContext.getTxvContext(this.playerid) // txv1即播放器组件的playerid值
                this.txvContext.play()
            }
        },
        onUnload() {
            console.log('执行清除')
            uni.removeStorage('firstGo')
        },
        onHide() {
            this.firstGo = true
            this.ui.setStorage('firstGo', true)

            this.txvContext = TxvContext.getTxvContext(this.playerid) // txv1即播放器组件的playerid值
            this.txvContext.pause()
        },
        methods: {
            replay() {
                const TxvContext = requirePlugin('tencentvideo')
                console.log(this.playerid)
                this.txvContext = TxvContext.getTxvContext(this.playerid) // txv1即播放器组件的playerid值
                this.txvContext.replay(this.vid)
                this.endStatus = false
            },
            videoEnd() {
                this.endStatus = true
                this.txvContext = TxvContext.getTxvContext(this.playerid)
                console.log(this.txvContext)
                console.log('播放结束')
            },
            goodFriend() {
                this.ui.setStorage('videoAvatar', this.avatar)
                this.ui.setStorage('videoNowName', this.nowName)
                uni.navigateTo({url: '/pages/index/videoList'})
            },
            async playVideo(vid, img, title, classify_id, id, break_point_length) {
                this.ui.setStorage('videoVid', vid)
                this.ui.setStorage('videoTitle', title)
                this.ui.setStorage('videoImg', img)
                this.ui.setStorage('classify_id', classify_id)
                this.ui.setStorage('video_id', id)
                this.ui.setStorage('break_point_length', break_point_length)
                uni.redirectTo({url: '/pages/index/video'})

                const data = await publicPost('statvideo/statclickshare', {
                    classify_id: classify_id,
                    video_id: id,
                    vid: vid,
                    click_num: 1,
                })
                console.log(data)
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
            ...mapState(['tabLists', 'pfptggId', 'pfjlspId', 'pfcpggId', 'pfspggId', 'pfsptpId', 'agptggId', 'agjlspId', 'agcpggId', 'agspggId', 'agsptpId', 'lgptggId', 'lgjlspId', 'lgcpggId', 'lgspggId', 'lgsptpId', 'ggkz']),
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
</style>
