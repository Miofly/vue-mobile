<template>
	<!--
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度;
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,
	只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni ref="mescrollRef" height="90%" top="0" bottom="100" :down="downOption"
				  :up="upOption" @init="mescrollInit"
				  @down="downCallback" @up="upCallback" @emptyclick="emptyClick" style="background: white">
		<!-- 数据列表 -->
		<view v-for="(item, index) in dataLists" :key="index" class="flex justify-between align-center"
		      style="height: 142rpx;border-bottom: 1px solid #eee">
			<view class="" style="width: 75%">
<!--				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"-->
<!--				       src="/static/images/lz/zhifubao@2x.png"-->
<!--				       style="width: 60rpx;margin-top: 12rpx" class="fl margin-left"></image>-->
				<view class="fl" style="margin-left: 28rpx">
<!--					<view style="color: #333333;font-size: 16px;">支付宝提现 金额：{{ item.money }}元</view>-->
					<view style="color: #333333;font-size: 22px;font-weight: bold">{{ item.money }}元</view>
					<view style="font-size: 14px;color: #333">
						点击收益
					</view>
					
				</view>
			</view>
			<view class="margin-right">
				<view v-if="i<3" style="font-size: 18px;color: #FFB400;" :style="{color: item.status==1||item.status==3? 'red' : '#FFB400' }">
					{{ item.status==0 || item.status==2 ? '进行中' : item.status==1||item.status==3 ? '失败': '已完成' }}
				</view>
				<view v-else :style="{color: item.status==1||item.status==3? 'red' : 'green' }">
					{{ item.status==0 || item.status==2 ? '进行中' : item.status==1||item.status==3 ? '失败': '已完成' }}
				</view>
				<view style="font-size: 14px;color: #999999;width: 130%">
					{{ item.create_at.slice(5) }}
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script lang="ts">
/* eslint-disable */
import { appletsPost } from '@/api'
import { State } from 'vuex-class'
import Component, { mixins } from 'vue-class-component'
import scrollMixins from 'zj/mescroll-uni/scroll-mixin'
// #ifdef H5
import mescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
// #endif
import mImage from 'zj/m-image/m-image.vue'

@Component({
	components: {
		// #ifdef H5
		mescrollUni,
		// #endif
		mImage
	}
})
export default class mescrollSwiper extends mixins(scrollMixins) {
	@State('jfcs', { namespace: 'xcx' }) jfcs

	downOption: any = { // 下拉刷新的配置参数
		use: true, // 是否启用下拉刷新
		auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
		textInOffset: '下拉刷新',
		textOutOffset: '释放更新',
		textLoading: '正在拼命的加载中 ...',
		bgColor: 'transparent',
		textColor: 'gray',
		downSize: '12px'
	}

	upOption: any = { // 上拉加载的常用配置
		use: true, // 是否启用下拉刷新
		auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
		noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1条才显示无更多数据
		textLoading: '正在玩命的加载...',
		textNoMore: '我也是有底线的...',
		bgColor: 'transparent',
		textColor: 'gray',
		optSize: '12px',
		page: {
			num: 0,
			size: 10
		},
		toTop: {
			src: '/static/images/common/totop.png',
			offset: 1000,
			duration: 100
		},
		empty: {
			use: true,
			icon: '/static/images/common/empty.jpg',
			tip: '暂无相关数据',
			btnText: ''
		}
	}

	dataLists: any = [] // 数据列表
	rightList: any = [] // 数据列表
	leftList: any = [] // 数据列表
	nowType: string = '' // 当前tab的类型,
	scrollTop: number = 0 // 用于懒加载图片使用

	mounted () {

	}

	scrollOne (e) { // 用于懒加载图片使用
		this.scrollTop = this.mescroll.scrollTop
	}

	tzChart (id, name) {
		localStorage.setItem('chartId', id)
		localStorage.setItem('chartName', name)
		uni.navigateTo({
			url: '/pages/appletsFront/module/chart'
		})
	}

	async upCallback (page) {
		if (localStorage.getItem('withdraw_status') == 1) {
			const pageNum = page.num // 页码
			const pageSize = page.size // 页长
			
			const data = await appletsPost('/my/withdraw_list', { status: this.i, page: page.num, per_page: page.size}) // 默认数据
			const curPageData = data.data.data
			const curPageLen = curPageData.length
			// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
			const last_page = curPageData.length
			if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
			this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
			
			setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
				this.mescroll.endByPage(curPageLen, last_page)
			}, 500)
		} else {
		
		}
		
	}
}
</script>
