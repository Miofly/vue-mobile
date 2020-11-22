<template>
	<view class="" style="height: 100%">
		<view class="fulls-width" v-if="topHeight!==0">
			1
		</view>
		<scroll-view :scroll-into-view="scrollViewId" :style="{ height: height + 'px', top: top + 'px' }"
		             scroll-with-animation scroll-y style="width: 200rpx;position: fixed;left: 0;z-index: 10;">
			<view :class="[currentTab == index ? 'active' : '']" :data-current="index" :id="`id_${index}`" :key="index"
			      @tap.stop="swichNav($event, item.type)"
			      class="flex align-center justify-center text-14 fulls-width"
			      style="height: 120rpx;background: #f6f6f6;color: #444;"
			      v-for="(item, index) in tabLists">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>

		<view :style="{ height: height + 'px', top: top + 'px' }"
		class="bg-white fulls-width" scroll-y
		      style="position: fixed;padding-left: 220rpx;left: 0;">>
			<m-swiper :effect3d="true" :height="250"
			          :indicator-pos="['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottomCenter'][4]"
			          :interval="3000" :list="list" :mode="['round', 'rect', 'number', 'none'][2]"
			          :title="true"
			          @change="() => {}"
			          @click="() => {}">
			</m-swiper>
			<swiper :current="currentTab" @change="swiperChange" vertical="true" disable-touch="true"
			        style="height: 100%">
				<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
					<MescrollItem :i="index" :index="currentTab"
					              :tabLists.sync="tabLists"></MescrollItem>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MescrollItem from './mescroll-swiper-vertical.vue'

@Component({
	components: {
		MescrollItem
	},
})
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

	onLoad (options) {
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

	swiperChange (e: any): void { // 轮播菜单
		// this.tabClick = e.detail.current
		// ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
	}

	// 点击标题切换当前页时改变样式
	swichNav (e, type) {
		const cur = e.currentTarget.dataset.current
		if (this.currentTab == cur) {
			return false
		}
		this.currentTab = Number(cur)
		console.log(this.currentTab)

		this.checkCor()
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
	background: #fff!important;
}

.active:before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19!important;
	height: 30rpx;
	left: 0;
}
</style>
