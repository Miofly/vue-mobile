<template>
	<view class="full-height" id="parent">
		<view class="full-width text-xl text-center"
		      style="background-color: rgb(251, 207, 36);font-size: 18px;position: fixed;top: 0;left: 0;height: 100rpx;line-height: 100rpx;padding: 0!important;z-index: 999999999">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<text v-if="$mio.mioRoot.getLocalData('withdraw_status') == 1">点击收益提现记录</text>
			<text v-else>分成收益提现记录</text>
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
		</view>
		<view class="full-height" style="margin-top: 188rpx">
			<swiper :style="{height: '100%'}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-item ref="stOne" :url="url" :parmas="parmas" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stTwo" :url="url" :parmas="parmas" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stThree" :url="url" :parmas="parmas" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import MescrollItem from './record-swiper'
import AppTabs from './app-tabs-new.vue'
export default {
	components: {
		MescrollItem,
		AppTabs
	},
	onLoad (e) {
		// const data = JSON.parse(e.query)
		this.id = localStorage.getItem('teamId')
		this.name = localStorage.getItem('teamName')
		this.parmas = { department_id: this.id }
	},
	data () {
		return {
			name: '',
			id: '',
			url: '/team/department-member-list',
			parmas: {},
			status: true,
			height: '90%', // 需要固定swiper的高度
			tabs: ['进行中', '已完成', '全部记录'],
			tabIndex: 0, // 当前tab的下标
		}
	},
	methods: {
		// 轮播菜单
		swiperChange (e) {
			this.tabIndex = e.detail.current
		},
	}
}
</script>

<style>

</style>
