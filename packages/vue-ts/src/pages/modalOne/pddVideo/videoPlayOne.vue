<template>
	<view class="full-width-height solid-black">
		<swiper :current="index" :vertical="true" @change="changeCurrent" :circular="circular" class="full-width-height" duration="500">
			<swiper-item :key="idx" class="swiper-item" v-for="(item, idx) in videoList">
				<!-- 视频渲染数预加载数影响性能 -->
				<view class="video-box" v-if="Math.abs(index-idx)<=1">
					<text class="fixed-top padding-top-sm padding-left-sm text-white" style="font-size: 22px">
						{{item.title}}
					</text>
					<block class="" v-if="item.src">
						<videoModule :gDuration="item.duration" :initialTime="item.initialTime"
									 :objectFit="item.objectFit" :src="item.src"
									 class="video" v-if="Math.abs(index-idx)<=1"
						>
						</videoModule>
					</block>
				</view>

				<view class="text-center"
					  style="animation: scale-lbfx 6s linear 0s;animation-fill-mode: forwards;position: fixed;bottom: 18vh;width: 100vw;height: 120rpx;background: transparent">
					<image src="/static/images/video/weixinqun@2x.png" style="width: 70vw;height: 120rpx"></image>
				</view>
				<view class="text-center"
					  style="animation: scale-lbfx 12s linear 0s infinite;position: fixed;bottom: 18vh;width: 100vw;height: 120rpx;background: transparent">
					<image src="/static/images/video/weixinqun@2x.png" style="width: 70vw;height: 120rpx"></image>
				</view>
				<view class="text-center solid-black"
					  style="animation: scale-lbUpOne 1s linear 0s infinite alternate;position: fixed;bottom: 10vh;width: 100vw;height: 120rpx;">
					<button open-type="share" class="cu-btn text-white text-xxl"
							style="width: 70vw;background: rgb(0, 189, 0);border-radius: 30px;height: 100rpx">
						<text :disabled="false" class="fa fa-wechat padding-right"></text>
						分享到微信群
					</button>
				</view>
				<view @tap="nextVideo"
					  class="text-center flex justify-between"
					  style="position: fixed;bottom: 0;left: 5vw;width: 90vw;height: 8vh;line-height: 8vh;background: rgb(34, 33, 36);border-radius: 6px">
					<image :src="videoList[index + 1].cover_img" class="margin-left"
						   style="width: 230rpx;height: 8vh;border-radius: 6px">
					</image>
					<view class="margin-right-xl" style="color: rgb(255, 99, 176);width: 20vw">
						<text class="margin-right">上滑播放</text>
						<text class="fa fa-angle-double-up text-xxl margin-top" style="animation: fingerUp 0.3s linear 0s infinite alternate;"></text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
    import { lbVideoGet, lbVideoPost } from '@/api'
    import { getStorageSync, throttle } from 'uJs/toolUtils'
    /*eslint-disable*/
    import videoModule from '@/components/videoModule/videoModule'

    export default {
        components: {
            videoModule
        },
        onShareAppMessage(res) {

            console.log(this.videoList)
            console.log(this.index)
            lbVideoPost('statvideo/statclickshare', {
                classify_id: getStorageSync('classify_id'),
                video_id: getStorageSync('video_id'),
                vid: getStorageSync('videoVid'),
                share_num: 1
            })

            return {

                // title: getStorageSync('videoTitle'),
                // path: `pages/index/index?videoVid=${getStorageSync('videoVid')}&videoType=${getStorageSync('videoType')}&video_id=
                // ${getStorageSync('video_id')}&title=${getStorageSync('videoTitle')}&img=${getStorageSync('videoImg')}&isShare=true`,
                // imageUrl: getStorageSync('videoImg')


                title: this.videoList[this.index].title,
                path: `pages/index/index?videoVid=${this.videoList[this.index].vid}&videoType=${this.videoList[this.index].classify_id}&video_id=
                ${this.videoList[this.index].id}&title=${this.videoList[this.index].title}&img=${this.videoList[this.index].cover_img}&isShare=true`,
                imageUrl: this.videoList[this.index].cover_img
            }
        },
        data() {
            return {
                playCount: 4, // 剩余多少视频加载视频列表
                videoList: [],
                index: 0,
                width: '',
                oldIndex: 0,
                page: 1,
                per_page: 5,
                clickStatus: true,
                timer: true,
                fxStatus: true,
                dhTime: '0',
                fxStatusTwo: true,

                isShare: false,
                circular: false,
                poster: '',
                playSrc: '',
                mvTitle: '',
                video_id: '',
                videoNum: '',
                vid: '',
                imgStatus: true,

				newTitle: '',
				newId: '',
				newVid: '',
				newCoverImg: '',
				newTime: '',
				newType: '',

            }
        },
        async mounted() {
			setTimeout(() => {
			    this.per_page = 10
			}, 3000)

            this.newTitle = getStorageSync('videoTitle')
            this.newId = getStorageSync('video_id')
            this.newVid = getStorageSync('videoVid')
            this.newCoverImg = getStorageSync('videoImg')
            this.newType = getStorageSync('videoType')

            this.pushVideoList()
            // setTimeout(() => {
            //     this.fxStatus = true
            // }, 2000)
        },
        methods: {
            changeCurrent(e) {
                this.imgStatus = false
                this.index = e.detail.current
				setTimeout(() => {
                    this.imgStatus = true
				}, 500)
            },
            async pushVideoList() {
                const videoGroup = []

                const res1 = await lbVideoPost('out/get-vv-url', {vid: this.newVid})
				videoGroup.push({
					src: res1.data.url,
                    title: getStorageSync('videoTitle'),
                    id: getStorageSync('video_id'),
                    vid: getStorageSync('videoVid'),
                    cover_img: getStorageSync('videoImg'),
                    classify_id: getStorageSync('videoType'),
				})
                const res = await lbVideoGet('video/video-list-two', {
                    classify_id: getStorageSync('classify_id'),
                    page: this.page,
                    per_page: 5,
                })
                for (const item of res.data.data) {
                    videoGroup.push({
                        src: item.play_url,
                        title: item.title,
                        id: item.id,
                        vid: item.vid,
                        cover_img: item.cover_img,
                        break_point_length: item.break_point_length,
                        classify_id: item.classify_id,
                    })
                }
                const len = this.videoList.filter(item => item.src).length
                for (let i = len; i < len + videoGroup.length; i++) {
                    this.$set(this.videoList, i, videoGroup[i - len])
                }

            },
            nextVideo() {
                if (this.clickStatus) {
                    this.index++
                    this.clickStatus = false
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.clickStatus = true
                    }, 1000)
                }

            }
        },
        watch: {
            index() {
                const len = this.videoList.filter(item => item.src).length
                console.log('len', len)
                console.log('this.index', this.index)
                console.log('this.page', this.page)
                // 加载视频
                if (len - this.index - 1 <= this.playCount) {
                    console.log('开始调用')
                    this.page++
					if (this.page < 6) {
                        this.pushVideoList()
					} else {
					    this.circular = true
					}
                }
            }
        }
    }
</script>

<style scoped>

</style>
