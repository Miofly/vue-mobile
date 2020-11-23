<template>
	<mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
				  @emptyclick="emptyClick" @init="mescrollInit" @scroll="scrollOne"
				  @up="upCallback" ref="mescrollRef" style="" top="0">


		<view :class="[true?'sm-border':'', true?'card-menu margin-top':'']" class="cu-list menu"
			  style="overflow-x: hidden!important;width: 92vw;padding-left: 0!important;
				  padding-right: 0!important;margin-left: 4vw!important;margin-right: 0!important;">
			<view :key="index" class="cu-item" style="border-radius: 20px!important;margin-bottom: 20rpx;border: 0px solid transparent!important"
				  v-for="(item, index) in dataLists">
				<view class="content padding-tb-sm padding-bottom" style="overflow-x: hidden!important;">
					<view class="flex justify-between align-center">
						<view style="width: 70vw">
							<view class="padding-left-xl margin-top-xxl"
								  style="width: 100%;height: auto;overflow-x: hidden">
								<view class="text-lg" style="overflow: hidden">
									{{ $mio.mioroot.strEllipsis(item.title, 10) }}
								</view>
								<view class="text-df text-grey" style="overflow: hidden">
									{{ $mio.mioroot.strEllipsis(item.desc, 10) }}
								</view>
							</view>
							<view class="flex justify-between">
								<view @tap="getLink(item.id)" class="text-center" style="width: 33%">
									<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
											 :showLoading="false"
											 bgColor="rgba(0, 0, 0, 1)"
											 bgColorError="rgba(0, 0, 0, 1)"
											 duration="0" src="/static/images/haixing/kianjie@2x.png">
										<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
									</m-image>
									<view style="font-size: 12px;margin-top: -20rpx">
										获取链接
									</view>
								</view>
								<view @tap="jumpWxQq(item.title, item.desc, item.pic, item.id)" class="text-center"
									  style="width: 33%">
									<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
											 :showLoading="false"
											 bgColor="rgba(0, 0, 0, 1)"
											 bgColorError="rgba(0, 0, 0, 1)" duration="0"
											 src="/static/images/haixing/qq@2x.png">
										<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
									</m-image>
									<view style="font-size: 12px;margin-top: -20rpx">
										qq图文
									</view>
								</view>
								<view @tap="jumpWx(item.title, item.desc, item.pic, item.id)" class="text-center"
									  style="width: 33%">
									<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
											 :showLoading="false"
											 bgColor="rgba(0, 0, 0, 1)"
											 bgColorError="rgba(0, 0, 0, 1)" duration="0"
											 src="/static/images/haixing/baidu@2x.png">
										<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
									</m-image>
									<view style="font-size: 12px;margin-top: -20rpx">
										百度图文
									</view>
								</view>
							</view>
						</view>

						<view class="padding-top-bottom margin-left-ten" style="width: 30vw">
							<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
									 :showLoading="false" :src="item.pic"
									 bgColor="rgba(0, 0, 0, 1)"
									 bgColorError="rgba(0, 0, 0, 1)" duration="0" width="200">
								<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
							</m-image>

						</view>
					</view>
				</view>

				<view class="action" v-show="false">
					<button :class="['cu-btn', 'bg-red', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view class="fa fa-angle-right fa-2x margin-left text-gray" v-show="false"></view>
			</view>
		</view>

		<modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="modalStatus"
			   :titleSize="40" desc="" descColor="#999d9c" modalTop="-50rpx" title="获取链接" titleColor="black"
			   width="90vw">
			<view class="text-center margin-top-xxl">
				<view class="text-center padding" style="border: 1px solid rgba(0, 0, 0, 0.7);border-radius: 10px;">
					<view v-if="tempTwo">{{tipMess}}</view>
					<view v-else>{{shortChain.length > 30 ? shortChain.slice(0, 30) + '...' : shortChain}}</view>
				</view>
				<view class="flex justify-around margin-top">
					<m-button :customStyle="{fontSize: '14px', background: '#FB5B55;'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
							  :ripple="true" :shape="['square', 'circle'][1]"
							  :size="['default', 'medium', 'mini'][1]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][2]" @tap="modalWxTwo"
							  class="text-white">
						<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
						复制并打开微信
					</m-button>
					<m-button :customStyle="{fontSize: '14px', background: '#FB5B55;'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
							  :ripple="true" :shape="['square', 'circle'][1]"
							  :size="['default', 'medium', 'mini'][1]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][2]" @tap="copyTwo"
							  class="text-white">
						<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
						复制链接
					</m-button>
				</view>
			</view>
		</modal>

	</mescroll-uni>
</template>

<script lang="ts">
	import { appletsPost } from '@/api'
	import Component, { mixins } from 'vue-class-component'
	import scrollMixins from 'zj/mescroll-uni/scroll-mixin'
	import mescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
	import modal from 'zj/modal/modal.vue'
	import mImage from 'zj/m-image/m-image.vue'
	import mButton from 'zj/m-button/m-button.vue'
	import NativeShare from 'nativeshare'

	@Component({
		components: {
			// #ifdef H5
			mescrollUni,
			// #endif
			mImage,
			modal,
			mButton
		}
	})
	export default class mescrollSwiper extends mixins(scrollMixins) {
		tipMess: string = '正在加载...'
		modalStatus: boolean = false
		tempVar: boolean = true
		url_lists: any = []
		mess: string = ''
		status: boolean = true
		bgSrc: string = '/static/images/lz_lz_bg.png'
		screenHeight: string = ''
		screenWidth: string = ''
		nativeShare: any = new NativeShare()
		is_department_captain: string = ''
		is_team_captain: string = ''
		shortChain: string = ''
		tempTwo: boolean = true

		trans_product_id: number = 37
		group_code: string | number = ''

		modalWxTwo () {
			this.$mio.mioroot.copyText(this.shortChain)
			this.$mio.mioroot.jumpWX()
			this.shortChain = ''
			this.modalStatus = false
			this.tempTwo = true
		}

		copyTwo () {
			this.$mio.mioroot.copyText(this.shortChain)
			this.modalStatus = false
			this.$mio.mioroot.showToast('复制成功')
			this.shortChain = ''
			this.tempTwo = true
		}

		async jumpWxQq (title, desc, pic, id) {
			this.$mio.mioroot.showLoading()
			const data = await appletsPost('title/title-share', {
				id,
				url_type: 0,
				trans_product_id: this.trans_product_id,
				group_code: this.group_code
			})
			let url = data.data
			uni.hideLoading()
			if (data.data === null) {
				this.$mio.mioroot.showToast('获取失败，请重新获取')
			} else if (data.data.substring(0, data.data.length - 1) == '') {
				this.$mio.mioroot.showToast('获取失败，请重新获取')
			} else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
				this.$mio.mioroot.showToast('图文分享请打开百度APP或者qq浏览器')
				location.href = 'mqqbrowser://url=http://web.xiyouzhuan2020.com'
			} else {
				try {
					if (url.charAt(url.length - 1) == '?') {
						url = url.substring(0, url.length - 1)
					}
					this.nativeShare.setShareData({
						link: url,
						title: title == '' || title === null ? ' ' : title,
						desc: desc == '' || desc === null ? ' ' : desc,
						icon: pic,
					})
					this.nativeShare.call('wechatFriend')
				} catch (err) {
					this.$mio.mioroot.showToast('图文分享请打开百度APP或者qq浏览器')
					location.href = 'mqqbrowser://url=http://web.xiyouzhuan2020.com'
				}
			}
		}

		async jumpWx (title, desc, pic, id) {
			this.$mio.mioroot.copyText('http://web.xiyouzhuan2020.com')
			this.$mio.mioroot.showLoading()
			const data = await appletsPost('title/title-share', {
				id,
				url_type: 0,
				trans_product_id: this.trans_product_id,
				group_code: this.group_code
			})
			let url = data.data
			uni.hideLoading()
			if (data.data === null) {
				this.$mio.mioroot.showToast('获取失败，请重新获取')
			} else if (data.data.substring(0, data.data.length - 1) == '') {
				this.$mio.mioroot.showToast('获取失败，请重新获取')
			} else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
				this.$mio.mioroot.showToast('图文分享请打开百度APP或者qq浏览器')
				location.href = 'baiduboxapp://url=http://web.xiyouzhuan2020.com'
			} else {
				try {
					if (url.charAt(url.length - 1) == '?') {
						url = url.substring(0, url.length - 1)
					}
					// let ua = navigator.userAgent
					// var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					this.nativeShare.setShareData({
						link: url,
						title: title == '' || title === null ? ' ' : title,
						desc: desc == '' || desc === null ? ' ' : desc,
						icon: pic,
					})
					this.nativeShare.call('wechatFriend')
				} catch (err) {
					this.$mio.mioroot.showToast('图文分享请打开百度APP或者qq浏览器')
					location.href = 'baiduboxapp://url=http://web.xiyouzhuan2020.com'
					// location.href = 'baiduboxapp://s=http://web.xiyouzhuan2020.com.com'
				}
			}
		}

		async getLink (id) {
			this.modalStatus = true
			const data = await appletsPost('title/title-share', {
				id,
				url_type: 0,
				trans_product_id: this.trans_product_id,
				group_code: this.group_code
			})
			console.log(data.data)
			if (data.data === null) {
				this.tempTwo = true
				this.tipMess = '获取失败，请重新获取'
			} else if (data.data.substring(0, data.data.length - 1) == '') {
				this.tempTwo = true
				this.tipMess = '获取失败，请重新获取'
			} else {
				this.shortChain = data.data.substring(0, data.data.length - 1)
				this.tempTwo = false
			}
		}

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
			// console.log(getAge('1995-09-26'))
		}

		scrollOne (e) { // 用于懒加载图片使用
			this.scrollTop = this.mescroll.scrollTop
		}

		async upCallback (page) {
			// this.nowType = this.tabLists[this.i].type // 获取当前点击的tab的类型
			const pageNum = page.num // 页码
			const pageSize = page.size // 页长
			console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)


			const data = await appletsPost('title/title-list', { common: 0, page: pageNum, per_page: pageSize }) // 默认数据


			const curPageData = data.data.list.data // 当前页数据列表
			const curPageLen = curPageData.length // 当前页数据长度
			const totalSize = data.total // 总数据条数

			if (page.num == 1) { // 第一页需手动置空列表
				this.dataLists = []
				this.rightList = []
				this.leftList = []
			}
			this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
			for (let i = 0; i < curPageData.length; i++) {
				if (i % 2 == 1) {
					this.rightList = this.rightList.concat(curPageData[i])
				} else {
					this.leftList = this.leftList.concat(curPageData[i])
				}
			}
			setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
				this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
			}, 500)
		}
	}
</script>

<style lang="scss" scoped>
	.u-column {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: auto;
	}

	button::after {
		border: 0 !important;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
	}


	> > > .mio-modal-box {
		top: 20% !important;
	}

	/*>>> .easy-loadimage{width: 100%;}*/
	/*>>> .origin-img{border-radius: 20rpx;}*/
	/*>>> .loadfail-img, >>>.loading-img{height: 500rpx;}*/
</style>
