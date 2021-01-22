<template>
	<view class="container">
		<swiper :circular="circular" :duration="duration" :easing-function="easingFunction"
		        @animationfinish="animationfinish" class="video-swiper"
		        :current="current" vertical>
			<!-- curQueue 循环会导致video重新插入，objectFit 不可变更 -->
			<swiper-item :key="index" v-for="(item, index) in curQueue" >
<!--				<view>{{item.id}}</view>-->
<!--				<view>{{item.title}}</view>-->
<!--				<video :data-id="item.id" :data-index="index" :id="'video_' + index" :loop="loop" :controls="controls" autoplay-->
<!--				       object-fit="cover" :src="`${JSON.parse(item.drama_series)[0]}`" class="video_item" :poster="item.cover_img">-->
<!--				</video>-->

				<view>{{item.id}}{{item.url}}</view>
				<video :ref="`myVideo${index}`" :data-id="item.id" :data-index="index" :id="'video_' + index" :loop="loop"
				       preload="metadata" :controls="controls" autoplay :muted="muted" @play="videoPlay" :page-gesture="false"
				       :show-center-play-btn="false" :enable-play-gesture="true"
				       :object-fit="item.objectFit || 'cover'" :src="`${item.url}`" class="video_item" >
				</video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import {
    commonOtherGet
} from '@/api'
const jweixin = require('jweixin-module')

@Component({})
export default class extends Vue {
	nextQueue: any = []
	prevQueue: any = []
	curQueue: any = []
	circular: boolean = false
	last: number = 1
	change: number = -1
	invalidUp: number = 0
	invalidDown: number = 0
	videoContexts: any= []
	controls: boolean = true
	duration: number = 500
	easingFunction: string = 'default'
	loop: boolean = true
	videoList: any = []
	current: number = 0
	page: number = 1
	per_page: number = 10
	muted: boolean = true
	
	@Watch('videoList', { immediate: false, deep: false })
	onChangeValue () {
		const newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
		console.log('视频列表', this.$mio.mioRoot.gsh(newVal))
		this.videoListChange(newVal)
	}
	
	beforeMount () {
		this.videoContexts = [
			uni.createVideoContext('video_0', this),
			uni.createVideoContext('video_1', this),
			uni.createVideoContext('video_2', this)
		]
	}
	
	mounted () {
		// this.getVideoData()
		this.videoList = [
			{ url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg', id: 1 },
			{ url: 'https://txmov2.a.yximgs.com/upic/2020/11/26/17/BMjAyMDExMjYxNzM5MThfOTA1MjAyNTU5XzM5ODE4NzAzODkwXzFfMw==_b_B2d8216aabed7d01b5179dc53c8d05380.mp4?clientCacheKey=3xgmx743cr4yyic_b.mp4&tt=b&di=31ea48b0&bp=13380%22', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg', id: 2 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319125415785691.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg', id: 3 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg', id: 4 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/5.jpg', id: 5 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/6.jpg', id: 6 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/13/mp4/190313094901111138.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/7.jpg', id: 7 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/12/mp4/190312143927981075.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/8.jpg', id: 8 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/12/mp4/190312083533415853.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/9.jpg', id: 9 },
			{ url: 'http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4', img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/10jpg', id: 10 }
		]
		
		
	}
	
	async getVideoData () {
		const { data, code } = await commonOtherGet(`https://api-xcx.idoujia.cn/api/short-play/choice-list?type=1&classify_id=0&gesture=up&page=${this.page}&per_page=${this.per_page}&xcx_id=42`)
		this.videoList = data.data
	}
	
	videoListChange (newVal) {
		newVal.forEach((item) => {
			this.nextQueue.push(item)
		})
		if (this.curQueue.length === 0) {
			this.curQueue = this.nextQueue.splice(0, 3)
			for (const item of this.curQueue) {
				console.log('curQueue', item.id)
			}
			this.playCurrent(1)
		}
	}
	
	videoPlay () {
		console.log(this.$refs)
		console.log(this.$refs.myVideo1)
		setTimeout(() => {
			this.muted = false
			
			
		}, 1000)
	}
	
	animationfinish (e) {
		this.current = e.detail.current
		console.log('last:', this.last)
		const { current } = e.detail
		const diff = current - this.last
		if (diff == 0) return
		this.last = current
		this.playCurrent(current)
		const direction = diff === 1 || diff === -2 ? 'up' : 'down'
		if (direction == 'up') {
			if (this.invalidDown === 0) {
				const change = (this.change + 1) % 3
				const add = this.nextQueue.shift()
				const remove = this.curQueue[change]
				console.log('add', this.$mio.mioRoot.gsh(add))
				if (add) {
					this.prevQueue.push(remove)
					this.curQueue[change] = add
					this.change = change
				} else {
					this.invalidUp += 1
				}
			} else {
				this.invalidDown -= 1
			}
		}
		if (direction == 'down') {
			if (this.invalidUp === 0) {
				const change2 = this.change
				const remove = this.curQueue[change2]
				const add = this.prevQueue.pop()
				if (add) {
					this.curQueue[change2] = add
					this.nextQueue.unshift(remove)
					this.change = (change2 - 1 + 3) % 3
				} else {
					this.invalidDown += 1
				}
			} else {
				this.invalidUp -= 1
			}
		}
		let circular = true
		if (this.nextQueue.length === 0 && current !== 0) {
			circular = false
		}
		if (this.prevQueue.length === 0 && current !== 2) {
			circular = false
		}
		this.circular = circular
		console.log(this.$mio.mioRoot.gsh(this.curQueue))
	}
	
	playCurrent (current) { // 播放视频且暂停其他视频播放
		this.videoContexts.forEach((ctx, index) => {
			this.muted = true
			index !== current ? ctx.pause() : ctx.play()
		})
	}
	
}
</script>
<style>
.container{width:100%;height:100%}.video-swiper{width:100%;height:100%}.video_item{height:80%;width:100%;}
</style>
