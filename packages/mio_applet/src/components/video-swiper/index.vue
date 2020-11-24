<template>
	<view class="container">
		<swiper :circular="circular" :duration="duration" :easing-function="easingFunction"
				@animationfinish="animationfinish" class="video-swiper"
				current="1" vertical>
			<!-- curQueue 循环会导致video重新插入，objectFit 不可变更 -->
			<swiper-item :key="index" v-for="(item, index) in curQueue">
				<view>{{index}}{{item.url}}</view>
				<view>{{item.id}}</view>
				<video :data-id="item.id" :data-index="index" :id="'video_' + index" :loop="loop"
					   :object-fit="item.objectFit || 'cover'" :src="item.url" @ended="onEnded" @error="onError"
					   @loadedmetadata="onLoadedMetaData" @pause="onPause" @play="onPlay" @progress="onProgress"
					   @timeupdate="onTimeUpdate" @waiting="onWaiting" class="video_item" controls="false"
					   enable-play-gesture enable-progress-gesture show-center-play-btn="false">
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
                _last: 1,
                _change: -1,
                _invalidUp: 0,
                _invalidDown: 0,
                _videoContexts: []
            };
        },

        components: {},
        props: {
            duration: {
                type: Number,
                default: 500
            },
            easingFunction: {
                type: String,
                default: 'default'
            },
            loop: {
                type: Boolean,
                default: true
            },
            videoList: {
                type: Array,
                default: []
            }
        },
        watch: {
            videoList: {
                handler: function observer() {
                    console.log(arguments)
                    var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    // this.videoListChangedFun(newVal);
                    this.videoListChangedFun1(newVal);
                },
                immediate: false,
                deep: true
            }
        },
        beforeMount: function attached() {
            this._videoContexts = [uni.createVideoContext('video_0', this), uni.createVideoContext('video_1', this), uni.createVideoContext('video_2', this)];
        },
        methods: {
            videoListChangedFun1: function _videoListChanged1(newVal) {
                console.log(newVal, '121212121212')
                var _this = this;

                var data = this;
                newVal.forEach(function (item) {
                    data.nextQueue.push(item);
                });
                console.log('this.nextQueue666', _this.nextQueue)
                if (data.curQueue.length === 0) {
                    // console.log(data.nextQueue)
                    // this.setData({
                    _this.curQueue = _this.nextQueue.splice(0, 3)
                    // }, function () {
                    _this.playCurrent(1);
                    // });
                    console.log('this.curQueue1', this.curQueue)
                }
                console.log('this.nextQueue2', _this.nextQueue)
                console.log('this.curQueue3', _this.curQueue)
            },
            animationfinish: function animationfinish(e) {
                var _data = this._data,
                    _last = _data._last,
                    _change = _data._change,
                    curQueue = _data.curQueue,
                    prevQueue = _data.prevQueue,
                    nextQueue = _data.nextQueue;

                var current = e.detail.current;

                console.log('_last', _last)
                console.log('current', current)

                var diff = current - _last;
                if (diff === 0) return;
                this._data._last = current;
                this.playCurrent(current);
                console.log('activeId1111111111', curQueue[current].id)
                this.$emit('change', {
                    detail: {
                        activeId: curQueue[current].id
                    }
                });
                var direction = diff === 1 || diff === -2 ? 'up' : 'down';
                console.log(direction, 'direction')
                console.log(this._data._invalidDown, 'this._data._invalidDown')
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
            playCurrent: function playCurrent(current) {
                console.log('currentcurrentcurrent', current)
                console.log('this._videoContexts', this._videoContexts)
                this._videoContexts.forEach(function (ctx, index) {
                    index !== current ? ctx.pause() : ctx.play();
                });
            },
            onPlay: function onPlay(e) {
                // this.trigger(e, 'play');
            },
            onPause: function onPause(e) {
                // this.trigger(e, 'pause');
            },
            onEnded: function onEnded(e) {
                // this.trigger(e, 'ended');
            },
            onError: function onError(e) {
                // this.trigger(e, 'error');
            },
            onTimeUpdate: function onTimeUpdate(e) {
                // this.trigger(e, 'timeupdate');
            },
            onWaiting: function onWaiting(e) {
                // this.trigger(e, 'wait');
            },
            onProgress: function onProgress(e) {
                // this.trigger(e, 'progress');
            },
            onLoadedMetaData: function onLoadedMetaData(e) {
                // this.trigger(e, 'loadedmetadata');
            },
            trigger: function trigger(e, type) {
                // var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                // var detail = e.detail;
                // var activeId = e.target.dataset.id;
                // if (type == 'play') {
                //     console.log('这是啥玩意', e.target.dataset.id)
                //     console.log('activeId', activeId)
                // }
                // this.$emit(type, {
                //     detail: Object.assign(Object.assign(Object.assign({}, detail), {
                //         activeId: activeId
                //     }), ext)
                // });
            }
        }
    };
</script>
<style>
	@import "./index.css";
</style>
