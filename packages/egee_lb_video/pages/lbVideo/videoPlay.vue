<template>
	<scroll-view :scroll-top="scrollTop" scroll-y class="full-width-height" @scroll="scroll">

		<view v-if="isIndex" class="full-width-height">
			<view style="height: 100%" v-if="JSON.stringify(this.$store.state.vInitData) != '{}'">
				<view v-if="vInitData.baseInfo.is_slide_advert"
					  style="height: 100%;width: 20rpx;background: transparent;position: fixed;left: 0,;top: 0;z-index: 9999999999"
					  @touchstart="goUrl" @tap="goUrl"></view>
				<view class="bg-white">
					<view style="position: relative">
						<!--<view style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh">-->
						<!--<image :src="cover_img" style="width: 100%;height: 100%">-->
						<!--</image>-->
						<!--</view>-->
						<view id="mod_player" @tap="test"
							  style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh;z-index: 9999999999!important;"></view>

						<view style="position: absolute;top: 0;z-index: 99999999999999!important;">
							<view style="position: absolute;top: 30rpx;left: 20rpx;">
								<image src="/static/images/lbVideo/jiantou.png" @tap="backHome"
									   style="width: 60rpx;height: 60rpx"></image>
							</view>
							<!--<line-progress style="width: 90vw;position: absolute;top: 30rpx;left: 40px;"-->
							<!--:percent="percent" active-color="rgba(253, 164, 126, 0.7)" height="60"-->
							<!--percentColor="white" borderStyle="0px solid red"-->
							<!--percentSize="15px" :striped="true" :stripedActive="false"-->
							<!--inactiveColor="transparent"-->
							<!--:showPercent="false">-->
							<!--</line-progress>-->
						</view>
					</view>
					<view style="height: 70vh"></view>

					<view style="text-align: center;;" class="flex justify-around margin-top">
						<view style="position: relative">
							<button @tap="backHome" class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
									style="width: 324rpx;height: 106rpx;background: linear-gradient(360deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%);
					border-radius: 27px;font-size: 50rpx;color: white">
								返回首页
							</button>
							<image src="/static/images/lbVideo/shouzhi.png"
								   style="width: 70rpx;height: 70rpx;position: absolute;left: -20rpx;top: 70rpx;
							     animation: fingerHandle 2s ease infinite both">
							</image>
						</view>

						<view style="position: relative">
							<button @tap="nextVideo" class="cu-btn"
									:class="[true ? 'shadow' : '', false ? 'block' : '']"
									style="width: 324rpx;height: 106rpx;background: linear-gradient(180deg,rgba(76,230,201,1) 0%,rgba(9,168,196,1) 100%);;
					border-radius: 27px;font-size: 45rpx;color: white">
								下一个视频
							</button>
							<image src="/static/images/lbVideo/shouzhi.png"
								   style="animation: fingerHandle 2s ease infinite both;width: 70rpx;height: 70rpx;position: absolute;left: -20rpx;top: 70rpx;">
							</image>
						</view>
					</view>

					<!--广告位-->
					<view v-if="vInitData.baseInfo.is_suspension" class="margin-top padding-left-right" @tap="goUrl"
						  style="margin-top: 50rpx;">
						<image :src="vInitData.baseInfo.suspension_img"
							   :class="[false?'cu-avatar':'', false?'round': '']"
							   style="width: 100%;height: 300rpx;border-radius: 10px">
						</image>
					</view>

					<view class="margin-top-bottom-xxl flex justify-center">
						<image src="/static/images/lbVideo/cnxh.png" style="width: 680rpx;height: 50rpx"></image>
					</view>

					<view v-if="videoLists.length == 0" class="" style="margin-bottom: 30px">
						<image :src="cnxhStatusImg" style="width: 800rpx"
							   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">
						</image>
					</view>

					<view v-else v-for="(item, index) in videoLists" :key="index"
						  class="padding-left-right padding-top-bottom"
						  style="width: 100vw;height: 270rpx;overflow: hidden;border-bottom: 1px solid #eee;position: relative;"
						  @tap="changeVideo(item.vid, item.break_point_length, item.channel_id, item.cover_img, item.id, item.group_id)">
						<view style="width: 300rpx;border-radius: 5px;height: 200rpx;overflow: hidden">
							<!--<image :src="" :class="[false?'cu-avatar':'', false?'round': '']" @tap="ui.showImg()"-->
							<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">-->
							<!--</image>-->
							<image :src="item.cover_img" mode="widthFix" class="border-radius"></image>
						</view>
						<view class="margin-left" style="position: absolute;top: 20%;left: 320rpx">
							<view class="text-bold text-xl">{{item.title.length > 16 ? item.title.slice(0, 16) + '...' :
								item.title}}
							</view>
							<view style="margin-top: 40rpx" class="text-red text-xl">播放量：{{item.views}}次
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-else class="flex align-center justify-center  full-width-height">
				<image src="/static/images/common/loading1.gif" style="width: 800rpx"
					   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">
				</image>
			</view>
		</view>

		<view v-if="indexStatusTwo" class="full-width-height">
			<view class="full-width-height">
				<!--当tabList未获取到数据时加载的布局-->
				<view v-if="tabLists.length == 0"></view>
				<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
					<view class="full-height">
						<!--固定在顶部的内容-->
						<view v-if="headerFixCon" style="position: fixed;top: 0;left: 0;"
							  :style="{height: headerHeight}">
							固定在顶部的内容
						</view>
						<scroll-view scroll-x style="position: fixed;left: 0" :style="{top: headerHeight + 'rpx'}">
							<view class="flex justify-around bg-white">
								<!--tab栏左侧内容-->
								<view v-if="leftCon">
									<image src="/static/images/lbVideo/paihangbang.png"
										   style="width: 72rpx;height: 100rpx">
									</image>
								</view>
								<swiper-tab ref="swiperTab" v-model="tabClick" :tabLists="tabLists" activeColor="black"
											:tabHeight="tabHeight - 20" textSize="18px"
											:fullWidth="leftCon == false && rightCon == false ? '100vw' : '80vw'"
											defaultColor="#666"
											lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
											:underLineHeight="10" activeSize="24px" :underLineWidth="(100) + '%'">
								</swiper-tab>
								<!--tab栏右侧内容-->
								<view v-if="rightCon" @tap="tzPhb">
									<image src="/static/images/lbVideo/paihangbang.png"
										   style="width: 72rpx;height: 100rpx;margin-top: 10rpx"></image>
								</view>
							</view>
						</scroll-view>
						<!--固定设置高度-->
						<view :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
						<!--固定内容-->
						<view v-if="fixCon" style="position: fixed;z-index: 9999;" class="full-width"
							  :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}">
							这是滚动时的固定内容
						</view>
						<swiper :style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
								:current="tabClick" @change="swiperChange">
							<swiper-item v-for="(item, index) in tabLists" :key="index">
								<mescroll-item @changeVideo="changeVideo" :i="index" :index="tabClick"
											   :tabs="tabLists"></mescroll-item>
							</swiper-item>
						</swiper>
					</view>
				</scroll-view>
			</view>
		</view>

		<view v-if="rankStatus">
			<RankMenu @changeVideo="changeVideo" :i="0" :index="0" :tabs="[]"></RankMenu>
		</view>
		<!--test (e) {if (e.index == 0) {console.log('点击了第一个按钮')}if (e.index == 1) {console.log('点击了第二个按钮')}}-->
		<!--<modal title="标题111" content="这是内容" @click="test" color="#999" :size="32" :maskClosable="true"-->
		<!--:show="modalStatus" :custom="true" style="background: black!important;text-align: center">-->
		<!--<image @tap="goNext" src="/static/images/lbVideo/tanchuang.png"-->
		<!--:class="[false?'cu-avatar':'', false?'round': '']"-->
		<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]">-->
		<!--</image>-->
		<!--<image @tap="modalStatus = false" src="/static/images/lbVideo/guanbi.png"-->
		<!--style="width: 80rpx;height: 80rpx;margin-top: 50rpx">-->
		<!--</image>-->
		<!--</modal>-->
	</scroll-view>
</template>

<script>
    import {
        commonPost
    } from '@/api'
    import tvp from 'mioJs/utils/tvp'
    import {mapState} from 'vuex'
    import MescrollItem from './mescroll-swiper-item-two'
    import RankMenu from './rank-menu'

    export default {
        components: {
            MescrollItem,
            RankMenu
        },
        data() {
            return {
                scrollTop: 100,
                old: {
                    scrollTop: 0
                },
                cnxhStatusImg: '/static/images/common/loading1.gif',
                leftCon: false,
                rightCon: true,
                tabHeight: 120, // tab栏的高度
                fixHeight: 100, // 固定内容的高度
                fixCon: false, // 是否需要固定布局
                headerFixCon: false, // 是否需要头部固定布局
                tabLists: [],
                tabClick: 0, // 当前tab的下标
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
                is_back: 0,
                is_breakpoint: 0,
                mytime: 1500,
                jsTime: null,
                jsTimeTwo: null,
                newParams: ''
            }
        },
        onLoad() {
            this.jsTime = setInterval(() => {
                this.browse_length = this.browse_length + 1
            }, 1000)
        },
        mounted() {
            window.addEventListener('scroll', this.showbtn, true)
        },
        onShow() {
            setInterval(() => {
                if (this.myState) {
                    if (JSON.stringify(this.$store.state.vInitData) != '{}') {
                        this.myState = false
                        if ((Number(localStorage.getItem('ldOneStatus')))) {
                            this.cover_img = this.$store.state.vInitData.videoInfo.cover_img
                            this.break_point_length = this.$store.state.vInitData.videoInfo.break_point_length
                            localStorage.setItem('line_id', this.$store.state.vInitData.videoInfo.line_id)
                            localStorage.setItem('channel_id', this.$store.state.vInitData.videoInfo.channel_id)
                            localStorage.setItem('group_id', this.$store.state.vInitData.videoInfo.group_id)
                            localStorage.setItem('video_id', this.$store.state.vInitData.videoInfo.id)
                            localStorage.setItem('video_vid', this.$store.state.vInitData.videoInfo.vid)
                            this.getVideo(this.$store.state.vInitData.videoInfo.cover_img, this.$store.state.vInitData.videoInfo.vid)
                        } else {
                            this.break_point_length = localStorage.getItem('break_point_length')
                            this.getVideo(localStorage.getItem('cover_img'), localStorage.getItem('video_vid'))
                        }
                        setTimeout(() => {
                            this.cnxh()
                        }, 2000)
                    }
                }
            }, 1)
        },
        methods: {
            scroll: function (e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            async cnxh() {
                // this.videoLists = []
                const data = await commonPost('like/like_list', {
                    line_en: localStorage.getItem('line_en'),
                    v_id: localStorage.getItem('video_id'),
                    channel_id: localStorage.getItem('channel_id'),
                    page: 1,
                    page_size: 3
                })
                this.cnxhStatusImg = '/static/images/common/empty.jpg'
                this.videoLists = data.data.data
            },
            test() {
                console.log(111)
            },
            tzPhb() {
                this.$store.state.indexStatusTwo = false
                this.$store.state.rankStatus = true
            },
            swiperChange(e) { // 轮播菜单
                this.tabClick = e.detail.current
				this.$store.state.nowIndex = e.detail.current
                console.log(e.detail.current)
                this.$refs.swiperTab.longClick(e.detail.current)
            },
            async nextVideo() {
                const data = await commonPost('next/next_video', {
                    line_en: localStorage.getItem('line_en'),
                    v_id: localStorage.getItem('video_id')
                })

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
                // this.$store.state.nowIndex = 0
                this.scrollTop = this.old.scrollTop
                this.$nextTick(function () {
                    this.scrollTop = 0
                })

                this.tongJi()
                this.cnxh()

                console.log(vid, break_point_length, channel_id, cover_img, id, group_id)

                clearInterval(this.jsTime)
                clearInterval(this.jsTimeTwo)

                this.browse_length = 0
                this.is_play = 0
                this.play_length = 0
                this.is_breakpoint = 0
                this.is_to_land_two = 0
                this.tzStatus = true

                localStorage.setItem('ldOneStatus', 0)
                localStorage.setItem('video_vid', vid)
                localStorage.setItem('break_point_length', break_point_length)
                localStorage.setItem('channel_id', channel_id)
                localStorage.setItem('cover_img', cover_img)
                localStorage.setItem('video_id', id)
                localStorage.setItem('group_id', group_id)

                this.cover_img = cover_img
                setTimeout(() => {
                    this.getVideo(cover_img, vid)
                }, 1)
                clearInterval(this.timer)

                this.percent = 0
                this.timer = setInterval(() => {
                    this.percent = this.percent + 10 / break_point_length
                    if (this.percent == 100) {
                        clearInterval(this.timer)
                    }
                }, 100)

                this.jsTimeTwo = setInterval(() => {
                    this.browse_length = this.browse_length + 1
                }, 1000)
            },
            goUrl() {
                this.is_back = 1
                location.href = localStorage.getItem('adUrl')
                this.tongJi()
            },
            async backHome() {
                this.myVideo = null
                this.$store.state.isIndex = 0
                this.$store.state.indexStatusTwo = true
                const data = await commonPost('/channel/channel', {line_en: localStorage.getItem('line_en')})
                this.tabLists = data.data
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
                    if (myPlayer.getPlaytime() > that.break_point_length && that.tzStatus) {
                        myPlayer.pause()
                        // that.modalStatus = true
                        that.tzStatus = false
                        that.is_breakpoint = 1
                        that.is_to_land_two = 1

                        that.tongJi()

						if (localStorage.getItem('from') == 0) {
                            this.newParams = `line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`
                        } else {
                            this.newParams = `from=${localStorage.getItem('from')}&line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`
						}

                        const data = await commonPost('/share/share_domain', {line_en: localStorage.getItem('line_en'), params: this.newParams})
                        console.log('跳转地址：', data.data + `?line_en=${localStorage.getItem('line_en')}&line_id=${localStorage.getItem('line_id')}&channel_id=${localStorage.getItem('channel_id')}&video_id=${localStorage.getItem('video_id')}&qudao=${localStorage.getItem('qudao')}&uuid=${localStorage.getItem('uuid')}&group_id=${localStorage.getItem('group_id')}`)

						// if (typeof data.data == 'object') {
                        //     that.goUrl()
                        // } else {
                            location.href = data.data
						// }
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
                    is_to_land_two: this.is_to_land_two,
                    is_back: this.is_back,
                    is_breakpoint: this.is_breakpoint,
                    group_id: localStorage.getItem('group_id'),
                })
            },
        },
        onUnload() {
            console.log('页面卸载')
            clearInterval(this.timer)

            location.href = localStorage.getItem('adUrl')
        },
        computed: {
            allHeight: function () {
                return this.tabHeight + this.fixHeight + this.headerHeight
            },
            headerHeight: function () { // 头部固定高度
                return this.headerFixCon ? 60 : 0
            },
            ...mapState(['indexStatus', 'vInitData', 'ldOneStatus', 'isIndex', 'rankStatus', 'indexStatusTwo', 'nowIndex']),
        },
    }
</script>

<style>
	page {
		background: white;
	}

	>>> .tvp_poster_img {
		/*background-size: 100% 100% !important;*/
	}

	>>> .tvp_overlay_content {
		display: none !important;
	}

	>>> .tvp_app_badge {
		display: none !important;
	}

</style>
