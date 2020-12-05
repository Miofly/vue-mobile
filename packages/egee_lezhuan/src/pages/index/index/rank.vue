<template>
	<view class="full-height" id="parent">
		<view class="full-width bg-red text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			排行
		</view>
		<view class="flex justify-between full-width text-center text-lg bg-white"
			  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;">
			<view @tap="teamSwitch" class="padding" :class="[status? 'text-red bg-white new_border' : 'text-grey']"
				  style="width: 50%;">团队排行
			</view>
			<view @tap="personSwitch" class="padding" :class="[!status? 'text-red bg-white new_border' : 'text-grey']"
				  style="width: 50%;">个人排行
			</view>
		</view>
		<view v-if="status" class="full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-item ref="stOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>

		<view v-else class="full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-items ref="stOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
    import MescrollItem from './rank-swiper'
    import MescrollItems from './rank-swipers'
	import {
		commonPost
	} from '@/api'
    import AppTabs from '../../../components/mescroll-uni/app-tabs.vue'
    export default {
        components: {
            MescrollItem,
            MescrollItems,
            AppTabs
        },
        data () {
            return {
                status: true,
                height: '90%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '本月'],
                tabIndex: 0, // 当前tab的下标
            }
        },
	    async mounted() {
		    const dataOne = await commonPost('/my/get_show_type', {})
		    localStorage.setItem('isMoney', dataOne.data.click_to_money)
	    },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
            teamSwitch () { // 团队
                this.tabIndex = 0
                this.status = !this.status
            },
            personSwitch () { // 部门
                this.tabIndex = 0
                this.status = !this.status
            },
        }
    }
</script>

<style>

</style>
