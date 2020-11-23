<template>
	<view class="full-width-height">
		<view style="height: 100%" v-if="JSON.stringify(this.$store.state.vInitData) != '{}'">
			<view v-if="vInitData.baseInfo.is_slide_advert"
				  style="height: 100%;width: 20rpx;background: transparent;position: fixed;left: 0,;top: 0;z-index: 9999999999"
				  @touchstart="goUrl" @tap="goUrl"></view>
			<view v-show="myId >= 1" class="bg-white">
				<view style="position: relative">
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh">
						<image :src="cover_img" style="width: 100%;height: 100%">
						</image>
					</view>
					<view id="mod_player" style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh"></view>

					<view style="position: absolute;top: 0;z-index: 99999999999999!important;">
						<view style="position: absolute;top: 30rpx;left: 20rpx;">
							<image src="/static/images/lbVideo/jiantou.png" @tap="backHome"
								   style="width: 60rpx;height: 60rpx">
							</image>
						</view>
						<line-progress style="width: 90vw;position: absolute;top: 30rpx;left: 40px;"
									   :percent="percent" active-color="rgba(253, 164, 126, 0.7)" height="60"
									   percentColor="white" borderStyle="0px solid red"
									   percentSize="15px" :striped="true" :stripedActive="false"
									   inactiveColor="transparent"
									   :showPercent="false">
						</line-progress>
					</view>
				</view>
				<view style="height: 70vh"></view>

				<view style="text-align: center" class="flex justify-around margin-top">
					<button @tap="backHome" class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
							style="width: 324rpx;height: 106rpx;background: linear-gradient(360deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%);;
					border-radius: 20px;font-size: 50rpx;color: white">
						返回首页
					</button>
					<button @tap="nextVideo" class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
							style="width: 324rpx;height: 106rpx;background: linear-gradient(180deg,rgba(76,230,201,1) 0%,rgba(9,168,196,1) 100%);;
					border-radius: 20px;font-size: 50rpx;color: white">
						下一条视频
					</button>
				</view>

				<!--广告位-->
				<view v-if="vInitData.baseInfo.is_suspension" class="margin-top padding-left-right" @tap="goUrl">
					<image :src="vInitData.baseInfo.suspension_img" :class="[false?'cu-avatar':'', false?'round': '']"
						   style="width: 100%;height: 300rpx">
					</image>
				</view>

				<view class="margin-top padding-left-right">
					<image src="/static/images/lbVideo/cnxh.png" style="width: 680rpx;height: 50rpx"></image>
				</view>

				<view v-for="(item, index) in videoLists" :key="index"
					  class="flex justify-between padding-left-right padding-top-bottom"

					  style="border-bottom: 1px solid #eee;"
					  @tap="changeVideo(item.vid, item.break_point_length, item.channel_id, item.cover_img, item.id, item.group_id)">
					<view style="width: 280rpx;height: 80px;overflow: hidden">
						<!--<image :src="" :class="[false?'cu-avatar':'', false?'round': '']" @tap="ui.showImg()"-->
						<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">-->
						<!--</image>-->
						<image style="width: 380rpx!important;" :src="item.cover_img" mode="widthFix"
							   class="border-radius"></image>
					</view>
					<view class="margin-left" style="position: relative">
						<view class="text-bold text-xl">{{item.title.length > 22 ? item.title.slice(0, 22) + '...' :
							item.title}}
						</view>
						<view style="margin-top: 40rpx" class="text-red text-xl">播放量：{{item.num}}</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else class="flex align-center justify-center  full-width-height">
			<image src="/static/images/common/loading1.gif" style="width: 800rpx"
				   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">
			</image>
		</view>

		<!--test (e) {if (e.index == 0) {console.log('点击了第一个按钮')}if (e.index == 1) {console.log('点击了第二个按钮')}}-->
		<modal title="标题111" content="这是内容" @click="test" color="#999" :size="32" :maskClosable="true"
			   :show="modalStatus" :custom="true" style="background: black!important;text-align: center">
			<image @tap="goNext" src="/static/images/lbVideo/tanchuang.png"
				   :class="[false?'cu-avatar':'', false?'round': '']"
				   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]">
			</image>
			<image @tap="modalStatus = false" src="/static/images/lbVideo/guanbi.png"
				   style="width: 80rpx;height: 80rpx;margin-top: 50rpx">
			</image>
		</modal>
	</view>
</template>

<script>
    import {
        commonPost
    } from '@/api'
    import tvp from 'mioJs/utils/tvp'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                modalStatus: false,
                videoLists: [],
                myVideo: '',
                myPlayer: '',
                timer: null,
                percent: 0,
                myId: 0,
                myState: true,
                tzStatus: true,
                cover_img: '',
                is_play: 0,
                is_to_land_two: 0,
                play_length: 0,
                browse_length: 0,
                line_id: '',
                channel_id: '',
                video_id: '',
                group_id: '',
                break_point_length: '',
                myindexStatus: false,
                mytime: 1500
            }
        },
        onLoad() {
            console.log('执行了吗onload')

            uni.navigateTo({url: `/pages/lbVideo/videoPlay?${new Date().getTime()}`})
            setInterval(() => {
                this.browse_length = this.browse_length + 1
            }, 1000)
        },
        onShow() {
            this.myId = this.myId + 1
            console.log(this.myId)

            if (this.myId > 2) {
                this.goUrl()
            }
            console.log('show111')
            setInterval(() => {
                if (this.myState) {
                    if (JSON.stringify(this.$store.state.vInitData) != '{}') {
                        this.myState = false
                        if (Boolean(Number(localStorage.getItem('ldOneStatus')))) {
                            this.cover_img = this.$store.state.vInitData.videoInfo.cover_img
                            this.break_point_length = this.$store.state.vInitData.videoInfo.break_point_length
                            localStorage.setItem('line_id', this.$store.state.vInitData.videoInfo.line_id)
                            localStorage.setItem('channel_id', this.$store.state.vInitData.videoInfo.channel_id)
                            localStorage.setItem('group_id', this.$store.state.vInitData.videoInfo.group_id)
                            localStorage.setItem('video_id', this.$store.state.vInitData.videoInfo.id)
                            this.getVideo(this.$store.state.vInitData.videoInfo.cover_img, this.$store.state.vInitData.videoInfo.vid)
                        } else {
                            this.break_point_length = localStorage.getItem('break_point_length')
                            this.getVideo(localStorage.getItem('cover_img'), localStorage.getItem('video_vid'))
                        }


                        setTimeout(async () => {
                            const data = await commonPost('like/like_list', {
                                line_en: localStorage.getItem('line_en'),
                                v_id: localStorage.getItem('video_id'),
                                page: 1,
                                page_size: 3
                            })
                            this.videoLists = data.data.data
                        }, 1500)
                    }
                }
            }, 1)
        },
        methods: {
            async nextVideo() {
                const data = await commonPost('next/next_video', {line_en: localStorage.getItem('line_en'), v_id: localStorage.getItem('video_id')})

				this.changeVideo(data.data.vid, data.data.break_point_length, data.data.channel_id, data.data.cover_img, data.data.id, data.data.group_id)
            },
            async goNext() {
                const data = await commonPost('/share/share_domain', {line_en: localStorage.getItem('line_en')})
                const url = data.data + `?line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`
                console.log('跳转地址：', url)
                this.is_to_land_two = 1
                location.href = url
                this.tongJi()
            },
            kuaijin() {
                this.mytime = 0
            },
            changeVideo(vid, break_point_length, channel_id, cover_img, id, group_id) {
                this.tongJi()

                this.browse_length = 0
                this.is_play = 0
                this.play_length = 0

                localStorage.setItem('ldOneStatus', 0)
                localStorage.setItem('video_vid', vid)
                localStorage.setItem('break_point_length', break_point_length)
                localStorage.setItem('channel_id', channel_id)
                localStorage.setItem('cover_img', cover_img)
                localStorage.setItem('video_id', id)
                localStorage.setItem('group_id', group_id)

                this.cover_img = cover_img
                this.getVideo(cover_img, vid)
                clearInterval(this.timer)

                this.percent = 0
                this.timer = setInterval(() => {
                    this.percent = this.percent + 10 / break_point_length
                    if (this.percent == 100) {
                        clearInterval(this.timer)
                    }
                }, 100)

                setInterval(() => {
                    this.browse_length = this.browse_length + 1
                }, 1000)
            },
            goUrl() {
                location.href = localStorage.getItem('adUrl')
                this.tongJi()
            },
            backHome() {
                uni.reLaunch({url: '/pages/lbVideo/index'})
                this.tongJi()
            },
            async getVideo(img, vid) {
                console.log(img)
                this.myVideo = new tvp.VideoInfo()
                this.myVideo.setVid(vid)
                var myPlayer = new tvp.Player()
                console.log(myPlayer)
                myPlayer.create({
                    width: '100%',
                    video: this.myVideo,
                    modId: 'mod_player',
                    // autoplay: true,
                    pic: img
                })
                var that = this

                myPlayer.onplay = function () {
                    console.log(that.myVideo)
                    that.myVideo.setHistoryStart(3)
                }
                myPlayer.onplaying = function () {
                    that.myVideo.setHistoryStart(3)
                    that.timer = setInterval(() => {
                        that.percent = that.percent + 10 / that.break_point_length
                        if (that.percent == 100) {
                            clearInterval(that.timer)
                        }
                    }, 100)
                    console.log('已经播放了')
                    that.is_play = 1
                }

                myPlayer.ontimeupdate = async function (e) {

                    // console.log('当期播放时间', myPlayer.getPlaytime())
                    that.play_length = myPlayer.getPlaytime()
                    if (myPlayer.getPlaytime() > that.break_point_length) {

                        myPlayer.pause()
                        that.modalStatus = true
                        that.tzStatus = false
                        // that.tongJi()

                        // const data = await commonPost('/share/share_domain', {line_en: localStorage.getItem('line_en')})
                        //
                        // console.log('跳转地址：', data.data + `?line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`)
                        //
                        // localStorage.setItem('nextUrl', data.data + `?line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`)

                        // setTimeout(() => {
                        //     location.href = data.data + `?line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`
                        // }, that.mytime)
                    }
                }
                myPlayer.onended = function () {
                    console.log('播放结束')
                    that.goUrl()
                }
            },
            async tongJi() {
                await commonPost('/stat/one-pv', {
                    line_id: localStorage.getItem('line_id'),
                    channel_id: localStorage.getItem('channel_id'),
                    video_id: localStorage.getItem('video_id'),
                    click_num: 1,
                    browse_length: parseInt(this.browse_length),
                    play_length: parseInt(this.play_length),
                    is_play: this.is_play,
                    is_to_land_two: this.is_to_land_two
                })
            },
        },
        onUnload() {
            console.log('页面卸载')
            clearInterval(this.timer)
        },
        computed: {
            ...mapState(['indexStatus', 'vInitData', 'ldOneStatus']),
        },
    }
</script>

<style>
	page {
		background: white;
	}

	>>> .tvp_poster_img {
		background-size: 100% 100% !important;
	}

	>>> .tvp_overlay_content {
		display: none !important;
	}

	>>> .tvp_app_badge {
		display: none !important;
	}
</style>
