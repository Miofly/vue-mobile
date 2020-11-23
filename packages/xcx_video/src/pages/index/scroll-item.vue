<template>
	<view>
		<view v-if="nowType==1"
			  style="position: fixed; bottom: 200rpx;right: 10px;height: 115rpx;width: 115rpx;z-index: 9;"
			  @tap="changVideo">
			<image src="/static/images/video/change.png" style="height: 115rpx;width: 115rpx;opacity: 0.7;z-index:99999"
				   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">
			</image>
		</view>
		<mescroll-uni ref="mescrollRef" top="0" :down="downOption"
					  :up="upOption" @init="mescrollInit" @scroll="scroll"
					  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
			<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
				<view v-for="(item, index) in dataLists" :key="index" class="cu-item"
					  style="background: white!important;border-bottom: 1px solid #eee" @tap="playVideo(item.vid, item.title, item.cover_img,
					  item.classify_id, item.id, item.break_point_length)">

					<view v-if="index == 4 && shLists.is_before_play_guide" @tap.stop="tz"
						  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 200rpx;right: 0">
					</view>
					<view v-if="index == 12 && shLists.is_before_play_guide" @tap.stop="tz"
						  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 200rpx;right: 0">
					</view>

					<view v-if="index == 36 && shLists.is_before_play_guide" @tap.stop="tz"
						  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 200rpx;right: 0">
					</view>

					<view v-if="index == 48 && shLists.is_before_play_guide" @tap.stop="tz"
						  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 200rpx;right: 0">
					</view>

					<view v-if="index == 60" @tap.stop="tz"
						  style="position: absolute;top: 0;z-index: 9999999999999999;width: 100%!important;background: transparent;height: 200rpx;right: 0">
					</view>

					<view class="content">
						<view v-if="index == 1" class="padding-bottom-lg padding-top-lg"
							  style="border-bottom: 1px solid #eee;padding-bottom: 4%">
							<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
						</view>

						<view v-if="index > 1 && index % 4 == 0" class="padding-top-lg"
							  style="border-bottom: 1px solid #eee;padding-bottom: 4%">
							<ad v-if="ggkz == 'pf'" :unit-id="pfspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'dd'" :unit-id="ddspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'ag'" :unit-id="agspggId" ad-type="video" ad-theme="black"></ad>
							<ad v-if="ggkz == 'lg'" :unit-id="lgspggId" ad-type="video" ad-theme="black"></ad>
						</view>


						<view id="test" ref="menuList" class="padding-top-bottom-lg"
							  style="width: 100%!important;opacity: 0" :class="[tempStatus ? 'active' :'']">
							<!--:style="{opacity: tempStatus ? 1 : 0}">-->
							<!--
								scrollTop: 0 || newscroll(e) {this.scrollTop = e.detail.scrollTop}
								>>> .spin-circle {background: url('@/static/images/common/loading1.gif') no-repeat center !important;}
								>>> .easy-loadimage{width: 100%;}  >>> .origin-img{border-radius: 20rpx;}
							-->
							<view style="width: 100%;height: 470rpx;position: relative;">
								<!--<imgLoad :scroll-top="scrollTop" mode="aspectFill" style="height: 100%;width: 100%;"-->
								<!--:image-src="item.cover_img"-->
								<!--:loading-mode="['spin-circle', 'skeleton-1', 'skeleton-2', 'looming-gray'][0]">-->
								<!--</imgLoad>-->
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
			</view>
		</mescroll-uni>


	</view>
</template>

<script>
    import {mapState} from 'vuex'
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from 'zj/mescroll-uni/mixins/mescroll-more-item.js'
    import {
        getData,
        publicGet,
        publicPost
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array, // tab菜单,此处用于取关键词,
        },
        data() {
            return {
                downOption: { // 下拉刷新的配置参数
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                    bgColor: 'white',
                    textColor: 'gray',
                },
                upOption: { // 上拉加载的常用配置
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5条才显示无更多数据
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...',
                    bgColor: 'white',
                    textColor: 'gray',
                    page: {
                        num: 0,
                        size: 5
                    },
                    toTop: {
                        // src: 'http://img.htmlsucai.com/huyoucss/gotop.gif',
                        offset: 1000,
                        duration: 100,
                    },
                    empty: {
                        use: true,
                        icon: '/static/images/common/empty.jpg',
                        // tip: '暂无相关数据111',
                        // btnText: '这是按钮文字'
                    },
                    onScroll: true // 是否监听滚动事件
                },
                dataLists: [],
                scrollTop: 0,
                tempStatus: false,
                nowType: 1,
            }
        },
        methods: {
            tz() {
                wx.navigateToMiniProgram({
                    appId: 'wx1fcf825366c41614',
                    success(res) {
                        // 打开成功
                        console.log(res)
                    }
                })
            },
            async changVideo() {
                this.dataLists = []
                const data = await publicGet(`video/video-rand`) // 获取的数据
                console.log(data)
                this.dataLists = data.data
                this.mescroll.endDownScroll()
                this.mescroll.endByPage(data.data.length, 1)
            },
            scroll(e) {
                this.scrollTop = this.mescroll.scrollTop
            },
            /* 下拉刷新的回调 */
            downCallback() {
                // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
                // loadSwiper();
                // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                this.mescroll.resetUpScroll()
            },
            /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
            async upCallback(page) {
                console.log('this.time', this.time)
                this.nowType = this.tabs[this.i].id
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条

                console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)
                const data = await getData(this.nowType, pageNum, pageSize) // 获取的数据

                const curPageData = data.data.data // 返回的当前页数据列表
                const curPageLen = curPageData.length // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)

                if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                var mydata = this.dataLists.concat(curPageData) // 追加新数据
                this.dataLists = mydata

                setTimeout(() => { // 延迟500毫秒获取数据
                    setTimeout(() => {
                        this.tempStatus = true
                    }, 300)
                    this.mescroll.endDownScroll()
                    this.mescroll.endByPage(curPageLen, data.data.last_page)
                }, 500)
            },
            // 点击空布局按钮的回调
            emptyClick() {
                uni.showToast({
                    title: '点击了按钮,具体逻辑自行实现'
                })
            },
            async playVideo(vid, title, img, classify_id, id, break_point_length) {
                this.ui.setStorage('videoVid', vid)
                this.ui.setStorage('videoType', this.nowType)
                this.ui.setStorage('videoTitle', title)
                this.ui.setStorage('videoImg', img)
                this.ui.setStorage('classify_id', classify_id)
                this.ui.setStorage('video_id', id)
                this.ui.setStorage('break_point_length', break_point_length)
                this.ui.setStorage('isShare', false)
                if (this.$store.state.shLists.is_version_change == 0) {
                    uni.navigateTo({url: '/pages/index/videoNew'})
                } else if (this.$store.state.shLists.is_version_change == 1) {
                    uni.navigateTo({url: '/pages/index/video'})
                } else {
                    uni.navigateTo({url: '/pages/index/videoNew'})
                }

                await publicPost('statvideo/statclickshare', {
                    classify_id: classify_id,
                    video_id: id,
                    vid: vid,
                    click_num: 1,
                })
            },
        },
        computed: {
            ...mapState(['ddptggId', 'ddjlspId', 'ddcpggId', 'ddspggId', 'ddsptpId', 'pfptggId', 'pfjlspId', 'pfcpggId', 'pfspggId', 'pfsptpId', 'agptggId', 'agjlspId', 'agcpggId', 'agspggId', 'agsptpId', 'lgptggId', 'lgjlspId', 'lgcpggId', 'lgspggId', 'lgsptpId', 'ggkz', 'shLists']),
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
