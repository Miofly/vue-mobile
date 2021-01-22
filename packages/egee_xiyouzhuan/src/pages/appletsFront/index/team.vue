<template>
	<view class="full-height bg-white">
		<!--当tabList没有数据时展示的内容-->
		<view class="flex justify-center align-center full-width-height" v-if="tabLists == 0">
			<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
		</view>
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="height-ninety">
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx'}"
					  class="fixed-top  full-width"
					  v-if="headerFixCon" style="background: white">
					<view :style="{height: headerHeight + 'rpx'}">
						<view style="background: rgb(251, 207, 36);padding-bottom: 12%">

							<view class="padding-top-xxl padding-left-xl">
								<view class="fl">
									<view class="cu-avatar round"
										  style="background-image:url('static/images/haixing/hxlogo1.png');width: 120rpx;height: 120rpx">
										<view class="cu-tag badge" v-if="false">999</view>
									</view>
								</view>
								<view class="margin-top-sm" style="font-size: 16px;font-weight: bolder;color: white;width: 600rpx">
									<text style="margin-left: 40rpx">{{$mio.mioRoot.emptyPaading(headerInfos.teamName, '团队')}}</text>
									<text class="margin-left-lg inline-block text-center" style="font-size: 12px;color: black;width: 120rpx;
									height: 42rpx;line-height: 42rpx;background: white;border-radius: 14px;">
										{{$mio.mioRoot.getLocalData('realName')}}
									</text>
								</view>
								<view class="qzfd"></view>
								<view class="padding-top-bottom" style="border-radius: 10px;
								color:white;display: inline-block;margin-left: 42rpx;">
									{{headerInfos.teamSlogan.length < 7 ? '团队口号：' + headerInfos.teamSlogan : $mio.mioRoot.strEllipsis(headerInfos.teamSlogan, 18)}}
								</view>
							</view>

							<view style="box-shadow: 0 2px 4px 0 #D3D1C9;width: 90%;background: white;margin-left: 5%;border-radius: 12px;position: fixed;top: 165rpx;"
								  class="flex justify-around padding margin-top-xl text-center">
								<view>
									<view style="font-size: 18px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.emptyPaading(headerInfos.memberNums, 0)}}</view>
									<view style="font-size: 14px;color: #000;font-weight: bold">团队人数</view>
								</view>
								<view>
									<view style="font-size: 18px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('is_team_captain') == 1 ? this.$store.state.xcx.jfcs : '*'}}</view>
									<view style="font-size: 14px;color: #000;font-weight: bold">
										{{this.$store.state.xcx.phIndex == 0 ? '今日':
										this.$store.state.xcx.phIndex == 1 ? '昨日' : this.$store.state.xcx.phIndex == 2 ?
										'本周' : this.$store.state.xcx.phIndex == 3 ? '本月' : ''}}计费次数
									</view>
								</view>
							</view>

							<view class="flex justify-around full-width text-center text-lg bg-white"
								  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;position: fixed;top: 350rpx;">
								<view :class="[status? 'active' : 'inactive']" @tap="teamSwitch" class="padding text-bold"
									  style="width: 30%;font-size: 18px">团员排行
									<view v-if="status" class="new_border margin-top-xxl" style="width: 60%;text-align: center;margin-left: 20%;border-radius: 30px"></view>
								</view>
								<view :class="[!status? 'active' : 'inactive']" @tap="personSwitch"
									  class="padding text-bold"
									  style="width: 30%;font-size: 18px">部门排行
									<view v-if="!status" class="new_border margin-top-xxl" style="width: 60%;text-align: center;margin-left: 20%;border-radius: 30px"></view>
								</view>
							</view>
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
				<swiper v-if="status" :current="tabClick" style="margin-top: 20rpx"
						:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						@change="swiperChange">
					<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
						<MescrollItem :i="index" :index="tabClick" :tabLists="tabLists"></MescrollItem>
					</swiper-item>
				</swiper>

				<swiper v-else :current="tabClick" style="margin-top: 20rpx"
						:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						@change="swiperChange">
					<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
						<MescrollItemTwo :i="index" :index="tabClick" :tabLists="tabLists"></MescrollItemTwo>
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
    import MescrollItem from './team-swiper.vue'
    import MescrollItemTwo from './team-swiper-two.vue'
    import { Component, Vue } from 'vue-property-decorator'
    import swiperTab from './teamSwiperTab.vue'
    import { State } from 'vuex-class'

    @Component({
        components: {
            MescrollItem,
            MescrollItemTwo,
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

        teamSwitch () { // 团队
            this.tabClick = 0
            this.status = !this.status
        }

        personSwitch () { // 部门
            this.tabClick = 0
            this.status = !this.status
        }


        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 480 : 0
        }
    }
</script>

<style>
	.new_border {
		border-bottom: 4px solid #333;
	}

	.active {
		color: black;
		font-weight: bold;
	}

	.inactive {
		color: #666666;
		font-weight: normal;
	}
</style>
