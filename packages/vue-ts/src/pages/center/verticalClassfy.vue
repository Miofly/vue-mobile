
<template>
	<view class="container">
		<view v-if="topHeight!==0" class="fulls-width">
			1
		</view>
		<scroll-view :scroll-into-view="scrollViewId" :style="{ height: height + 'px', top: top + 'px' }"
		             scroll-with-animation scroll-y style="width: 200rpx;position: fixed;left: 0;z-index: 10;">
			<view v-for="(item, index) in tabLists" :id="`id_${index}`" :key="index" :data-current="index"
			      class="flex align-center justify-center text-14 fulls-width"
			      :class="[currentTab == index ? 'active' : '']"
			      style="height: 120rpx;background: #f6f6f6;color: #444;"
			      @tap.stop="swichNav($event, item.type)">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>

		<view v-for="(item, index) in tabLists" :key="index" class="">
			<scroll-view v-if="currentTab == index" :style="{ height: height + 'px', top: top + 'px' }"
			             class="bg-white fulls-width" scroll-y style="position: fixed;padding-left: 220rpx;left: 0;">
				<m-swiper @click="() => {}" @change="() => {}" :height="250" :list="list" :title="true" :effect3d="true" :interval="3000"
				          :indicator-pos="['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottomCenter'][4]" :mode="['round', 'rect', 'number', 'none'][2]">
				</m-swiper>
				<scroll-view style="position: relative;" scroll-x="" class="margin-top">
					<view class="flex align-start text-center">
						<view @tap="$mio.mioRoot.push(`/pages/modalOne/bookCity/${item.url}`)"
						      style="width: 250rpx;margin-right: 20rpx;" v-for="(subItem, subIndex) in item.data" :key="subIndex">
							<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
							       :src="subItem.images[0]" class="border-radius-sm"
							       style="width: 150rpx;height: 150rpx;"></image>
							<view :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa" style="font-size: 20px"
							      v-if="false"></view>
							<view class="margin-top-xxl line-one">{{ subItem.title }}</view>
						</view>
					</view>
				</scroll-view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
	goodGirlData
} from '@/api'
@Component({})
export default class test extends Vue {
	list: any = [
		{ image: 'https://cdn.uviewui.com/uview/swiper/1.jpg', title: '昨夜星辰昨夜风，画楼西畔桂堂东' },
		{ image: 'https://cdn.uviewui.com/uview/swiper/2.jpg', title: '身无彩凤双飞翼，心有灵犀一点通' },
		{ image: 'https://cdn.uviewui.com/uview/swiper/3.jpg', title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳' }
	]

	tabLists: any = [
		{ name: '前端', type: 'frontend', num: 0 },
		{ name: '后端', type: 'backend', num: 1 },
		{ name: '安卓', type: 'Android', num: 2 },
		{ name: '苹果', type: 'iOS', num: 99 },
		{ name: 'Flutter', type: 'Flutter', num: 200 },
		{ name: '应用程序', type: 'app', num: 30 },
		{ name: '前端', type: 'frontend', num: 0 },
		{ name: '后端', type: 'backend', num: 1 },
		{ name: '安卓', type: 'Android', num: 2 },
		{ name: '苹果', type: 'iOS', num: 99 },
		{ name: 'Flutter', type: 'Flutter', num: 200 },
		{ name: '应用程序', type: 'app', num: 30 },
		{ name: '前端', type: 'frontend', num: 0 },
		{ name: '后端', type: 'backend', num: 1 },
		{ name: '安卓', type: 'Android', num: 2 },
		{ name: '苹果', type: 'iOS', num: 99 },
		{ name: 'Flutter', type: 'Flutter', num: 200 },
		{ name: '应用程序', type: 'app', num: 30 },
	]

	topHeight: number = 0
	height: number = 0
	top: number = 0
	currentTab: number = 0 // 预设当前项的值
	scrollViewId: string = 'id_0'

	async onLoad (options) {
		const data = await goodGirlData(this.tabLists[0].type, 1, 10)
		this.tabLists[0].data = data.data
		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					const top = 0
					this.height = res.windowHeight - uni.upx2px(this.topHeight)
					this.top = top + uni.upx2px(this.topHeight)
				}
			})
		}, 50)
	}

	// 点击标题切换当前页时改变样式
	async swichNav (e, type) {
		console.log(e)
		const cur = e.currentTarget.dataset.current
		if (this.currentTab == cur) {
			return false
		}
		this.currentTab = cur
		this.checkCor()
		console.log(this.tabLists[cur].data)
		if (this.tabLists[cur].data == undefined) {
			const data = await goodGirlData(type, 1, 10)
			this.tabLists[cur].data = data.data
			this.$forceUpdate()
		}
	}

	// 判断当前滚动超过一屏时，设置tab标题滚动条。
	checkCor () {
		if (this.currentTab > 6) {
			this.scrollViewId = `id_${this.currentTab - 2}`
		} else {
			this.scrollViewId = 'id_0'
		}
	}
}
</script>

<style>

.active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff !important;
}

.active:before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19;
	height: 30rpx;
	left: 0;
}
</style>
