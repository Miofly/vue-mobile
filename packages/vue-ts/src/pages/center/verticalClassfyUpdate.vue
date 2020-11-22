<template>
	<view>
		<view v-if="topHeight!==0" class="fulls-width">
			1
		</view>
		<scroll-view :scroll-into-view="scrollView_leftId" :scroll-with-animation="isTap" scroll-anchoring scroll-y
			:style="{ height: height + 'px', top: top + 'px' }" style="width: 200rpx;position: fixed;left: 0;z-index: 10;">
			<view v-for="(item, index) in tabLists" :id="`left_${index}`" :key="index"
			      :data-current="index" @tap.stop="swichNav($event, item.type)"
			      class="flex align-center justify-center text-14 fulls-width"
			      style="height: 110rpx;background: #f6f6f6;color: #444;"
			      :class="[currentTab == index ? 'active' : '']">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>
		<scroll-view :scroll-into-view="scrollView_rightId" class="right-box" scroll-anchoring
			:style="{ height: height + 'px', top: top + 'px' }" scroll-with-animation scroll-y @scroll="scroll">
			<view v-for="(item, index) in tabLists" :key="index">
				<m-linkage :distanceTop="distanceTop" :index="index" :recalc="1" :scrollTop="scrollTop"
				           @linkage="linkage">
					<view :id="`right_${index}`" class="page-view">
						<view class="class-name">{{ item.name }}</view>
					</view>
				</m-linkage>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import { goodGirlData } from '@/api'

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

	scrollView_leftId: string = 'left_0'
	scrollView_rightId: string = 'right_0'
	scrollTop: number = 0
	distanceTop: number = uni.upx2px(92)
	isScroll: boolean = true
	isTap: boolean = true

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

	// 点击标题切换当前页时改变样式
	async swichNav (e, type) {
		const cur = e.currentTarget.dataset.current
		if (this.currentTab == cur) {
			return false
		}
		this.currentTab = cur
		this.checkCor(false) // eslint-disable-line
		if (this.tabLists[cur].data == undefined) {
			const data = await goodGirlData(type, 1, 10)
			this.tabLists[cur].data = data.data
			this.$forceUpdate()
		}
	}

	// 判断当前滚动超过一屏时，设置tab标题滚动条。
	checkCor (isScroll) {
		if (!isScroll) {
			this.isScroll = false
			this.isTap = true
			if (this.currentTab > 6) {
				this.scrollView_leftId = `left_${this.currentTab - 2}`
			} else {
				this.scrollView_leftId = 'left_0'
			}
			this.scrollView_rightId = `right_${this.currentTab}`
		} else {
			this.scrollView_leftId = `left_${this.currentTab}`
		}
	}

	scroll (e) {
		// 动画时长固定300ms
		if (!this.isScroll) {
			setTimeout(() => {
				this.isScroll = true
			}, 150)
		} else {
			this.scrollTop = e.detail.scrollTop
		}
	}

	linkage (e) {
		if (e.isLinkage && e.index != this.currentTab) {
			this.isTap = false
			this.currentTab = e.index
			this.checkCor(true)
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
	background: white!important;
}

.active::before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19;
	height: 30rpx;
	left: 0;
}

.right-box {
	width: 100%;
	position: fixed;
	padding-left: 220rpx;
	box-sizing: border-box;
	left: 0;
}

</style>
