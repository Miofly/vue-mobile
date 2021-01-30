<template>
	<view class="container">
		<swiper :circular="circular" :duration="duration" :easing-function="easingFunction"
		        @animationfinish="animationfinish" class="video-swiper" @change="test2"
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
				       :object-fit="item.objectFit || 'cover'" :src="`${item.video_url}`" class="video_item" >
				</video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import {
    commonOtherGet, commonGet
} from '@/api'
// const jweixin = require('jweixin-module')
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
	page: number = 1
	per_page: number = 10
	
	@Watch('videoList', { immediate: false, deep: false })
	onChangeValue () {
		const newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
		// console.log('视频列表', this.$mio.mioRoot.gsh(newVal))
		this.videoListChange(newVal)
	}
	
	mounted () {
		this.getVideoData()
	}
	
	async getVideoData () {
		const { data, code } = await commonGet(`/getVideoList?page=${this.page}&per_page=${this.per_page}`)
		this.videoList = data.items
	}
	
	videoListChange (newVal) {
		newVal.forEach((item) => {
			this.nextQueue.push(item)
		})
		if (this.curQueue.length === 0) {
			this.curQueue = this.nextQueue.splice(0, 3)
			for (const item of this.curQueue) {
				// console.log('curQueue', item.id)
			}
			this.playCurrent(1)
		}
	}
	
	videoPlay () {
		setTimeout(() => {
			this.muted = false
		}, 1000)
	}
	
	test2 (e) {
		this.current = e.detail.current
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
		console.log('========')
		for (let i = 0; i < this.curQueue.length; i++) {
			console.log(this.curQueue[i].id)
		}
	}
	
	test (event) {
		// console.log(event)
		// console.log(event.detail.dy)
	}
	
	animationfinish (e) {
	
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
