<template>
	<view class="full-height">
		<!--当tabList没有数据时展示的内容-->
		<view class="flex justify-center align-center full-width-height" v-if="tabLists == 0">
			<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
		</view>
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="" style="height: 40%"><!--此处控制高度-->
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx'}"
					  class="fixed-top text-center full-width"
					  v-if="headerFixCon">
					<m-search :clearabled="true" :input-align="['left', 'center', 'right'][0]" :shape="['round', 'square'][1]" :show-action="true"
					          @search="loadOkSearch(value)" bgColor="white" v-model="value">
					</m-search>
				</view>
				<scroll-view v-if="showTab" :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0">

				</scroll-view>
				<!--固定设置高度-->
				<view v-if="showTab" :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
				<!--滚动时固定内容-->
				<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
					  style="position: fixed;z-index: 9999;"
					  v-if="fixCon">
					这是滚动的固定内容
				</view>

				<MescrollItem :i="0" :index="tabClick"></MescrollItem>
			</view>
		</scroll-view>


	</view>
</template>

<script lang="ts">
import {
	commonGet
} from '@/api'
	import { Component, Vue, Ref } from 'vue-property-decorator'

	import MescrollItem from './mescroll-swiper-item-two.vue'
	// #ifdef H5
	import mSwiperTab from 'zj/m-swiperTab/m-swiperTab.vue'
	// #endif
const cheerio = require('cheerio')
	@Component({
		components: {
			MescrollItem,
			// #ifdef H5
			mSwiperTab
			// #endif
		}
	})
    export default class test extends Vue {
		value: any = ''

        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        showTab: boolean = true; // 是否需要swiperTab
        tabHeight: number = this.showTab ? 96 : 0; // tab栏的高度
        fixHeight: number = 200; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
		appyys: any = []
		mvDetailDataOne: any = []
		mvDetailDataTwo: any = []
		mvDetailDataThree: any = []
		mvDetailDataFour: any = []
        swiperChange (e: any): void { // 轮播菜单
            this.tabClick = e.detail.current
            ;(this.$refs.swiperTab as mSwiperTab).longClick(e.detail.current)
        }


        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        created () {
        	this.appPlay(306405)
        }

		async loadAppMovieInfos (id) { // app 搜索
			const indexData = await commonGet('/appmv/index.php/vod/search.html?wd=胡歌')
			const $ = cheerio.load(indexData, { _useHtmlParser2: true })
			for (let i = 0; i < $('.stui-vodlist li').length; i++) {
				this.appyys.push({
					name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
					url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
					id: $('.stui-vodlist li').eq(i).children('a').attr('href').trim().split('id\/')[1].replace(/.html/g, ''),
					remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
					img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim()
				})
			}
			console.log(this.appyys)
		}

		async appPlay (id) { // app 搜索
			const indexData = await commonGet('/appmv/index.php/vod/play/id/306405/sid/1/nid/1.html')
			const $ = cheerio.load(indexData, { _useHtmlParser2: true })
			const src = $('.pl-l .stui-player__video script').html().split('url_next')[0].split('url')[1].replace('":"', '')
			console.log(src.replace('","', '').replace(/\\/g, ''))


			for (let i = 0; i < $('.content section').eq(0).children('ul').children('li').children('a').length; i++) {
				const name = $('.content section').eq(0).children('ul').children('li').children('a').eq(i).text()
				const url = $('.content section').eq(0).children('ul').children('li').children('a').eq(i).attr('href')
				this.mvDetailDataOne.push({
					name,
					url
				})
			}
			for (let i = 0; i < $('.content section').eq(1).children('ul').children('li').children('a').length; i++) {
				const name = $('.content section').eq(1).children('ul').children('li').children('a').eq(i).text()
				const url = $('.content section').eq(1).children('ul').children('li').children('a').eq(i).attr('href')
				this.mvDetailDataTwo.push({
					name,
					url
				})
			}
			for (let i = 0; i < $('.content section').eq(2).children('ul').children('li').children('a').length; i++) {
				const name = $('.content section').eq(2).children('ul').children('li').children('a').eq(i).text()
				const url = $('.content section').eq(2).children('ul').children('li').children('a').eq(i).attr('href')
				this.mvDetailDataThree.push({
					name,
					url
				})
			}
			for (let i = 0; i < $('.content section').eq(3).children('ul').children('li').children('a').length; i++) {
				const name = $('.content section').eq(3).children('ul').children('li').children('a').eq(i).text()
				const url = $('.content section').eq(3).children('ul').children('li').children('a').eq(i).attr('href')
				this.mvDetailDataFour.push({
					name,
					url
				})
			}
			console.log(this.mvDetailDataOne)
			console.log(this.mvDetailDataTwo)
			console.log(this.mvDetailDataThree)
			console.log(this.mvDetailDataFour)

			/*

			 this.ui.yunFun('movieOne', {
			 url: 'https://app.movie/' + encodeURI(url)
			 }, (res) => {
			 console.log(res.result.body)
			 const $ = cheerio.load(res.result.body, { _useHtmlParser2: true })
			 let src = $('.pl-l .stui-player__video script').html().split('url_next')[0].split('url')[1].replace('":"', '')
			 src = src.replace('\\', '')
			 this.videoSrc = src.replace('","', '').replace(/\\/g, '')

			 console.log(this.videoSrc)
			 clearTimeout(this.timer)
			 this.videoId = id
			 console.log('当前点击的视频Id：', id)
			 const newVideo = uni.createVideoContext(id.toString())
			 this.video = newVideo
			 newVideo.play()
			 }, false, '', (err) => {
			 console.log('加载失败，云函数的报错')
			 console.log(err)
			 })
			*/
		}

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 200 : 0
        }
    }
</script>

