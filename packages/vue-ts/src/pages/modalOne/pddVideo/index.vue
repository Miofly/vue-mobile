<template>
	<view class="full-height">
		<!--当tabList没有数据时展示的内容-->
		<view class="flex justify-center align-center full-width-height" v-if="tabLists == 0">
			<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx">
			</image>
		</view>
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height">
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx', lineHeight: headerHeight + 'rpx'}" class="fixed-top text-center full-width"
					  open-type="share"
					  v-if="headerFixCon">
					<m-addApplets :headerFixCon.sync="headerFixCon" :headerHeight="headerHeight" bgColor="bg-gradual-blue"
								text="点击...添加到我的小程序，更方便哦"></m-addApplets>
				</view>
				<scroll-view :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0">
					<view class="flex justify-around bg-white">
						<!--tab左侧需要的内容-->
						<view v-if="leftCon">
							<image src="/static/images/lbVideo/paihangbang.png" style="width: 72rpx;height: 100rpx">
							</image>
						</view>
						<swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
								   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists"
								   :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
								   :underLineWidth="50 + '%'" activeColor="black" activeSize="24px"
								   defaultColor="#666"
								   lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
								   lineRadius="10px"
								   ref="swiperTab" tagBg="red" textSize="20px"
								   v-model="tabClick">
						</swiperTab>
						<!--tab栏右侧需要的内容-->
						<view v-if="rightCon">
							<image src="/static/images/lbVideo/paihangbang.png"
								   style="width: 72rpx;height: 100rpx"></image>
						</view>
					</view>
				</scroll-view>
				<!--固定设置高度-->
				<view :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
				<!--滚动时固定内容-->
				<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
					  style="position: fixed;z-index: 9999;"
					  v-if="fixCon">
					这是滚动的固定内容
				</view>
				<!--滚动的每一栏内容-->
				<swiper :current="tabClick"
						:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						@change="swiperChange">
					<swiper-item :id="`mui${index}`" :key="index" v-for="(item, index) in tabLists">
						<mescroll-item :i="index" :index="tabClick" :tabLists="tabLists"></mescroll-item>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	/* eslint-disable */
    import MescrollItem from './meList.vue'
    // import swiperTab from 'zj/swiper-tab/swiper-tab'
    import { Component, Vue, Ref } from 'vue-property-decorator'
    import { lbVideoGet, lbVideoPost } from '@/api'
    import { setStorage, getStorage } from 'uJs/toolUtils'
    import swiperTab from "zj/swiperTab/swiperTab.vue";

    @Component({
        components: {
            MescrollItem,
        }
    })
    export default class Index extends Vue {
		// @Ref('swiperTab') swiperTab?: any //
        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        tabHeight: number = 96; // tab栏的高度
        fixHeight: number = 100; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
        tabLists: any[] =[
            { name: '前端', type: 'frontend', num: 0 },
            { name: '后端', type: 'backend', num: 1 },
            { name: '安卓', type: 'Android', num: 2 },
            { name: '苹果', type: 'iOS', num: 99 },
            { name: 'Flutter', type: 'Flutter', num: 200 },
            { name: '应用程序', type: 'app', num: 30 }
        ]

        interstitialAd: any[] = null

        async mounted (e) {
            const xcxData: any = await lbVideoPost('xcx/conf', {}) // 小程序配置
            // this.$cjs.showLoading('正在加载')
            const xcxTab: any = await lbVideoGet('classify/classify-list', {}) // tab栏
            uni.hideLoading()
            console.log('获得的tab栏数据', xcxTab)
            xcxTab.data.push()
            // this.tabLists = xcxTab.data


        }

        onShareAppMessage (res) {

            console.log(res)
            lbVideoPost('statvideo/statclickshare', {
                classify_id: res.target.dataset.classify_id,
                video_id: res.target.dataset.video_id,
                vid: res.target.dataset.vid,
                share_num: 1
            })
            uni.removeStorage({
                key: 'isShare',
                success (res) {
                    console.log('success')
                }
            })
            return {
                title: res.target.dataset.title,
                path: `pages/modalOne/pddVideo/index?videoVid=${res.target.dataset.vid}&videoType=${res.target.dataset.classify_id}&video_id=
            ${res.target.dataset.video_id}&title=${res.target.dataset.title}&img=${res.target.dataset.cover_img}&isShare=true`,
                imageUrl: res.target.dataset.cover_img
            }

        }

        swiperChange (e: any): void { // 轮播菜单
            console.log(1)
            this.tabClick = e.detail.current
            console.log(this.$store.state.center.fnn)
            // this.swiperTab.longClick(e.detail.current)
            ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }

        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 60 : 0
        }
    }
</script>

<style>
	#mui1 {
		background: black !important;
	}
</style>
