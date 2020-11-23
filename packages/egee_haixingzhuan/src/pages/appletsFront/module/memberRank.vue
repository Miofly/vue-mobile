<template>
	<view class="full-height bg-white">
		<!--当tabList没有数据时展示的内容-->
		<view class="flex justify-center align-center full-width-height" v-if="tabLists == 0">
			<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
		</view>
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height">
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx'}"
					  class="fixed-top text-center full-width"
					  v-if="headerFixCon" style="background: white">
					<view :style="{height: headerHeight + 'rpx'}">
						<view class="full-width hxbg text-xl text-center"
							  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
							<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left"
								  style="line-height: 100rpx"></view>
							<view>{{$mio.mioRoot.getLocalData('teamName')}}成员排行</view>
						</view>
					</view>
				</view>
				<scroll-view :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0"
							 v-if="showTab">
					<view class="flex justify-around bg-white">
						<!--tab左侧需要的内容-->
						<view v-if="leftCon">
							<image src="/static/images/lbVideo/paihangbang.png" style="width: 72rpx;height: 100rpx">
							</image>
						</view>
						<swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
								   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists"
								   :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
								   :underLineWidth="50 + '%'" activeColor="black" activeSize="16px"
								   defaultColor="#666"
								   lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
								   lineRadius="10px"
								   ref="swiperTab" tagBg="red" textSize="12px"
								   v-model="tabClick" style="">
						</swiperTab>
						<!--tab栏右侧需要的内容-->
						<view v-if="rightCon">
							<image src="/static/images/lbVideo/paihangbang.png"
								   style="width: 72rpx;height: 100rpx"></image>
						</view>
					</view>
				</scroll-view>
				<!--固定设置高度-->
				<view :style="{height: fixCon? (allHeight) + 'rpx' : (tabHeight + headerHeight - 10) + 'rpx'}"
					  v-if="showTab"></view>
				<!--滚动时固定内容-->
				<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
					  style="position: fixed;z-index: 9999;"
					  v-if="fixCon">
					这是滚动的固定内容
				</view>
				<!--滚动的每一栏内容-->
				<swiper :current="tabClick" style="margin-top: 20rpx"
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
    import {
        appletsPost
    } from '@/api'
    import MescrollItem from './memberRank-swiper.vue'
    import { Component, Vue } from 'vue-property-decorator'
    import swiperTab from 'zj/swiperTab/swiperTab.vue'

    @Component({
        components: {
            MescrollItem,
            swiperTab
        }
    })
    export default class test extends Vue {
        is_team_captain: string = ''
        status: boolean = true
        headerInfos: any = {
            teamName: '',
            teamSlogan: '',
            teamLeader: '',
            avatar: '',
            memberNums: '',
        }

        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        showTab: boolean = true; // 是否需要swiperTab
        tabHeight: number = this.showTab ? 80 : 0; // tab栏的高度
        fixHeight: number = 80; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
        tabLists: any[] = [
            { name: '今日', type: 'zdy', num: 0 },
            { name: '昨日', type: 'frontend', num: 0 },
            { name: '本周', type: 'backend', num: 0 },
            { name: '本月', type: 'Android', num: 0 },
        ]

        swiperChange (e: any): void { // 轮播菜单
            this.tabClick = e.detail.current
            this.$store.state.xcx.phIndex = e.detail.current
            ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }

        async mounted () {
            const data = await appletsPost('team/team-info')
            this.headerInfos.teamName = data.data.name
            console.log(this.headerInfos.teamName)
            this.headerInfos.teamSlogan = data.data.slogan
            this.headerInfos.teamLeader = data.data.team_captain_name
            this.headerInfos.avatar = data.data.team_avatar
            this.headerInfos.memberNums = data.data.member_nums

        }

        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 100 : 0
        }
    }
</script>

<style>
	.new_border {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-bottom: 5px solid #333
	}
</style>
