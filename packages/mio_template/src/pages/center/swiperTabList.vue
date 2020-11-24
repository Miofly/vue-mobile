<template>
	<view class="full-height">
		<!--当tabList没有数据时展示的内容-->
		<view class="flex justify-center align-center full-width-height" v-if="tabLists == 0">
			<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
		</view>
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height"><!--此处控制高度-->
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx'}"
					  class="fixed-top text-center full-width"
					  v-if="headerFixCon">
					<m-addApplets :headerFixCon.sync="headerFixCon" :headerHeight="headerHeight" bgColor="bg-gradual-red"
								text="点击...添加到我的小程序，更方便哦"></m-addApplets>
				</view>
				<scroll-view v-if="showTab" :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0">
					<view class="flex justify-around bg-white">
						<!--tab左侧需要的内容-->
						<view v-if="leftCon">
							<image src="/static/images/lbVideo/paihangbang.png" style="width: 72rpx;height: 100rpx">
							</image>
						</view>
						<m-swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
								   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists"
								   :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
								   :underLineWidth="50 + '%'" activeColor="black" activeSize="24px"
								   defaultColor="#666"
								   lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
								   lineRadius="10px"
								   ref="swiperTab" tagBg="red" textSize="20px"
								   v-model="tabClick">
						</m-swiperTab>
						<!--tab栏右侧需要的内容-->
						<view v-if="rightCon">
							<image src="/static/images/lbVideo/paihangbang.png"
								   style="width: 72rpx;height: 100rpx"></image>
						</view>
					</view>
				</scroll-view>
				<!--固定设置高度-->
				<view v-if="showTab" :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
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
					<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
						<MescrollItem :i="index" :index="tabClick" :tabLists="tabLists"></MescrollItem>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue, Ref } from 'vue-property-decorator'

	import MescrollItem from './mescroll-swiper-item-two.vue'
	import swiperTab from 'zj/m-swiperTab/m-swiperTab.vue'

	@Component({
		components: {
			MescrollItem,
			// #ifdef H5
			swiperTab
			// #endif
		}
	})
    export default class test extends Vue {
        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        showTab: boolean = true; // 是否需要swiperTab
        tabHeight: number = this.showTab ? 96 : 0; // tab栏的高度
        fixHeight: number = 100; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
        tabLists: any[] = []

        swiperChange (e: any): void { // 轮播菜单
            this.tabClick = e.detail.current
            ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }

        mounted (): void {
            setTimeout(() => {
                this.tabLists = [
                    { name: '自定义', type: 'zdy', num: 88 },
                    { name: '前端', type: 'frontend', num: 0 },
                    { name: '后端', type: 'backend', num: 1 },
                    { name: '安卓', type: 'Android', num: 2 },
                    { name: '苹果', type: 'iOS', num: 99 },
                    { name: 'Flutter', type: 'Flutter', num: 200 },
                    { name: '应用程序', type: 'app', num: 30 },
                    { name: '空布局', type: 'empty', num: 30 }
                ]
            }, 1)
        }

        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 60 : 0
        }
    }
</script>

