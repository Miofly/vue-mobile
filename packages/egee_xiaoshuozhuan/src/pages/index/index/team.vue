<template>
	<view class="full-height" id="parent" style="overflow: hidden">
		<view class="full-width text-bg-new text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			团队
		</view>
		<view class="flex justify-between full-width text-center text-lg bg-white"
			  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;">
			<view @tap="teamSwitch" class="padding" :class="[status? 'text-red bg-white new_border' : 'text-grey']"
				  style="width: 50%;">团员排行
			</view>
			<view @tap="personSwitch" class="padding" :class="[!status? 'text-red bg-white new_border' : 'text-grey']"
				  style="width: 50%;">部门排行
			</view>
		</view>
		<view class="padding">
			<view class="bg-white padding full-width height-thirty" style="border-radius: 10px">
				<image src="/static/images/lz/xiyou.jpg" mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>
				<!--<image src="http://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/wz.png" mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>-->
				<!--<image src="http://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/wfx.png" mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>-->
					<view class="text-xl text-bold">{{headerInfos.teamName}}
					<span class="text-normal text-df margin-left text">({{headerInfos.memberNums}})人</span>
				</view>
				<view class="text-df margin-top">{{headerInfos.teamSlogan ? headerInfos.teamSlogan : '该团长还未设置口号'}}
				</view>

				<view class="flex justify-between margin-top-xl">
					<view class="">{{headerInfos.teamLeader}}</view>
					<view>{{headerInfos.teamNums}}</view>
					<view v-if="tabIndex == 0">今日总计费次数：{{is_team_captain ? teamClickOne : '*'}}</view>
					<view v-if="tabIndex == 1">今日总计费次数：{{is_team_captain ? teamClickTwo : '*'}}</view>
					<view v-if="tabIndex == 2">今日总计费次数：{{is_team_captain ? teamClickThree : '*'}}</view>
					<view v-if="tabIndex == 3">今日总计费次数：{{is_team_captain ? teamClickFour : '*'}}</view>
				</view>
			</view>
		</view>

		<view v-if="status" class="padding height-seventy">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-item ref="itemOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
				<swiper-item>
					<mescroll-item ref="itemTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
				<swiper-item>
					<mescroll-item ref="itemThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
				<swiper-item>
					<mescroll-item ref="itemFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>

		<view v-if="!status" class="padding height-seventy">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-items ref="itemOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
				<swiper-item>
					<mescroll-items ref="itemTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
				<swiper-item>
					<mescroll-items ref="itemThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
				<swiper-item>
					<mescroll-items ref="itemFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
    import {
        commonPost
    } from '@/api'
    import {mapState} from 'vuex'
    import MescrollItem from './team-swiper'
    import MescrollItems from './team-swipers'
    import AppTabs from 'zj/mescroll-uni/app-tabs.vue'

    export default {
        components: {
            MescrollItem,
            MescrollItems,
            AppTabs
        },
        async mounted() {
            if (localStorage.getItem('is_team_captain') == 0) {
                this.is_team_captain = false
            }
            if (localStorage.getItem('is_team_captain') == 1) {
                this.is_team_captain = true
            }
            const data = await commonPost('/team/team-info')
            // console.log(data.data)
            // console.log(data.data)
            this.headerInfos.teamName = data.data.name
            this.headerInfos.teamSlogan = data.data.slogan
            this.headerInfos.teamLeader = data.data.team_captain_name
            this.headerInfos.avatar = data.data.team_avatar
            this.headerInfos.memberNums = data.data.member_nums

        },
        data() {
            return {
                is_team_captain: '',
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                },
                status: true,
                height: '90%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '本月'],
                tabIndex: 0, // 当前tab的下标
                headerInfos: {
                    teamName: '',
                    teamSlogan: '',
                    teamLeader: '',
                    avatar: '',
                    memberNums: '',
                }
            }
        },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
            teamSwitch() { // 团队
                this.tabIndex = 0
                this.status = !this.status
            },
            personSwitch() { // 部门
                this.tabIndex = 0
                this.status = !this.status
            },
        },
        computed: {
            ...mapState(['teamControl', 'teamClickOne', 'teamClickTwo', 'teamClickThree', 'teamClickFour']),
        },
    }
</script>

<style>
	.new_border {
		border-bottom: 1px solid red
	}

	/*#parent >>> .app-tabs .tabs-item .active{*/
	/*color: rgb(0, 129, 255);*/
	/*}*/
	/*#parent >>> .app-tabs .tabs-line{*/
	/*background: rgb(0, 129, 255);*/
	/*}*/
</style>
