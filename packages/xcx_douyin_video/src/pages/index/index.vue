<template>
	<view class="container">
		<swiper :circular="circular" :duration="duration" :easing-function="easingFunction"
		        @animationfinish="animationfinish" class="video-swiper"
		        current="1" vertical>
			<!-- curQueue 循环会导致video重新插入，objectFit 不可变更 -->
			<swiper-item :key="index" v-for="(item, index) in curQueue" >
				<view>{{item.id}}{{item.url}}</view>
				<video ref="myVideo" :data-id="item.id" :data-index="index" :id="'video_' + index" :loop="loop"
				       preload="metadata" :controls="controls"
				       :object-fit="item.objectFit || 'cover'" :src="`${item.url}`" class="video_item" >
				</video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			nextQueue: [],
			prevQueue: [],
			curQueue: [],
			
			circular: false,
			last: 1,
			change: -1,
			
			invalidUp: 0,
			invalidDown: 0,
			
			videoContexts: [],

			controls: true,
			duration: 500,
			easingFunction: 'default',
			loop: true,
			videoList: []
		}
	},
	watch: {
		videoList: {
			handler: function observer() {
				console.log(arguments)
				const newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				console.log('下一个视频:', this.$mio.mioRoot.gsh(newVal))
				this.videoListChangedFun1(newVal);
			},
			immediate: false,
			deep: true
		}
	},
	beforeMount () {
		this.videoContexts = [
			uni.createVideoContext('video_0', this),
			uni.createVideoContext('video_1', this),
			uni.createVideoContext('video_2', this)
		];
	},
	mounted() {
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
	},
	methods: {
		videoListChangedFun1 (newVal) {
			var _this = this;

			var data = this;
			newVal.forEach(function (item) {
				data.nextQueue.push(item);
			});
			// console.log('this.nextQueue666', _this.nextQueue)
			if (data.curQueue.length === 0) {
				_this.curQueue = _this.nextQueue.splice(0, 3)
				_this.playCurrent(1);
				// console.log('this.curQueue1', this.curQueue)
			}
			// console.log('this.nextQueue2', _this.nextQueue)
			// console.log('this.curQueue3', _this.curQueue)
		},
		animationfinish (e) {
			console.log('滑到的索引：', e.detail.current)
			console.log('last:', this.last)
			let current = e.detail.current
			let diff = current - this.last
			if (diff == 0) return
			this.last = current
			let direction = diff === 1 || diff === -2 ? 'up' : 'down';
			if (direction == 'up') {
				if (this.invalidDown === 0) {
					var change = (this.change + 1) % 3;
					var add = this.nextQueue.shift();
					var remove = this.curQueue[change];
					console.log(add)
					if (add) {
						this.prevQueue.push(remove);
						this.curQueue[change] = add;
						this.change = change;
					} else {
						this.invalidUp += 1;
					}
				} else {
					this.invalidDown -= 1;
				}
			}
			if (direction == 'down') {
			
			}
		},
		animationfinishBak (e) {
			// var _last = this._last,
			// 	_change = this._change,
			// 	curQueue = this.curQueue,
			// 	prevQueue = this.prevQueue,
			// 	nextQueue = this.nextQueue;
			//
			// var current = e.detail.current
			// console.log('当前索引 current：', e.detail.current)
			// console.log('当前索引 _last：', _last)
			//
			// var diff = current - this._last;
			// if (diff === 0) return;
			// this._last = current;
			// this.playCurrent(current); // 播放当前索引视频
			//
			// this.$emit('change', {
			// 	detail: {
			// 		activeId: curQueue[current].id
			// 	}
			// });
			// var direction = diff === 1 || diff === -2 ? 'up' : 'down';
	 
			if (direction === 'up') {
				
				for (let i = 0; i < curQueue.length; i++) {
					console.log('pre', curQueue[i].id, curQueue[i].url)
				}
				if (this._data._invalidDown === 0) {
					var change = (_change + 1) % 3;
					var add = nextQueue.shift();
					var remove = curQueue[change];
					console.log(add)
					if (add) {
						prevQueue.push(remove);
						curQueue[change] = add;
						this._data._change = change;
					} else {
						this._data._invalidUp += 1;
					}

					for (let i = 0; i < curQueue.length; i++) {
						console.log('pre222', curQueue[i].id, curQueue[i].url)
					}
					console.log('<=======================================>')
					// console.log(curQueue[0].id,curQueue[0].url)
					// console.log(curQueue[1].id,curQueue[1].url)
					// console.log(curQueue[2].id,curQueue[2].url)
					// console.log('<=======================================>')
				} else {
					this._data._invalidDown -= 1;
				}
			}

			if (direction === 'down') {
				if (this._data._invalidUp === 0) {
					var _change2 = _change;
					var _remove = curQueue[_change2];

					var _add = prevQueue.pop();

					if (_add) {
						curQueue[_change2] = _add;
						nextQueue.unshift(_remove);
						this._data._change = (_change2 - 1 + 3) % 3;
					} else {
						this._data._invalidDown += 1;
					}
				} else {
					this._data._invalidUp -= 1;
				}
			}

			var circular = true;

			if (nextQueue.length === 0 && current !== 0) {
				circular = false;
			}

			if (prevQueue.length === 0 && current !== 2) {
				circular = false;
			}

			this.curQueue = curQueue
			this.circular = circular

			console.log('end', this.curQueue[0].id, this.curQueue[0].url)
			console.log('end', this.curQueue[1].id, this.curQueue[1].url)
			console.log('end', this.curQueue[2].id, this.curQueue[2].url)
			console.log('=======================================')
		},
		playCurrent (current) { // 播放视频且暂停其他视频播放
			this.videoContexts.forEach(function (ctx, index) {
				index !== current ? ctx.pause() : ctx.play();
			});
		},
	}
};
</script>
<style>
.container{width:100%;height:100%}.video-swiper{width:100%;height:100%}.video_item{height:80%;width:100%;margin-top: 20%}
</style>
