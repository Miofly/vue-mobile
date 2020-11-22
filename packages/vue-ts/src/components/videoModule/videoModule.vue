<template>
	<view>
		<video :controls="controls" :enable-progress-gesture="progressBtn"
			   :page-gesture="pageGesture" :show-fullscreen-btn="fullscreenbtn"
			    :src="src" :show-play-btn="playBtn" :show-center-play-btn="centerPlayBtn"
			   :show-mute-btn="muteBtn" :title="title" :play-btn-position="playBtnPosition"
			   :style="{height: vHeight + 'vh', width: vWidth + 'vw'}"
			   :enable-play-gesture="playGesture"
			   :autoplay="autoplay" :loop="loop" class="video" objectFit="contain" ref="`video_${src}`"

		>
		</video>
		<!--@ended="playEnd" @play="continuePlay" @timeupdate="timeupdate" @pause="pause" :initial-time="startTime" -->
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class ChunleiVideo extends Vue {
        @Prop({ default: '', type: String }) src?: string // 视频源
        @Prop({ default: 999, type: Number }) gDuration?: number //

        @Prop({ default: 80, type: Number }) vHeight?: number | string // 视频高度
        @Prop({ default: 100, type: Number }) vWidth?: number | string // 视频宽度
        @Prop({ default: '', type: String }) poster?: string // 视频封面

        @Prop({ default: true, type: Boolean }) autoplay?: boolean // 自动播放
        @Prop({ default: false, type: Boolean }) loop?: boolean // 循环播放
        @Prop({ default: 0, type: Number }) initialTime?: number // 初始时间
        @Prop({ default: true, type: Boolean }) controls?: boolean // 播放控件
        @Prop({ default: false, type: Boolean }) pageGesture?: boolean // 在非全屏模式下，是否开启亮度与音量调节手势
        @Prop({ default: false, type: Boolean }) fullscreenbtn?: boolean // 是否显示全屏按钮
        @Prop({ default: true, type: Boolean }) playBtn?: boolean // 是否显示视频底部控制栏的播放按钮
        @Prop({ default: true, type: Boolean }) centerPlayBtn?: boolean // 是否显示视频中间的播放按钮
        @Prop({ default: false, type: Boolean }) progressBtn?: boolean // 是否开启控制进度的手势
        @Prop({ default: false, type: Boolean }) muteBtn?: boolean // 是否显示静音按钮
        @Prop({ default: true, type: Boolean }) playGesture?: boolean // 是否开启播放手势，即双击切换播放/暂停
        @Prop({ default: '', type: String }) title?: string // 视频的标题，全屏时在顶部展示
        @Prop({ default: 'center', type: String }) playBtnPosition?: string // 视频的标题，全屏时在顶部展示
        @Prop({ default: false, type: Boolean }) play?: boolean //

        time: number = 0
        duration: number = 0
        playFirst: boolean = false
        load: boolean = false
        timer: any = null
        videoCtx: any = null

        // mounted (): void {
        //     this.videoCtx = uni.createVideoContext(`video_${this.src}`, this)
        // }

        // continuePlay (): void {
        //     if (!this.load) {
        //         setTimeout(() => {
        //             this.load = true
        //             if (this.timer) clearTimeout(this.timer)
        //             this.timer = setTimeout(() => {
        //                 if (this.play) {
        //                     this.videoCtx.play()
        //                     this.playFirst = false
        //                 } else {
        //                     this.videoCtx.pause()
        //                 }
        //             }, 300)
        //         }, 1000)
        //     }
        // }

        // pause (): void {
        // 	console.log('视频暂停')
        // }

        // playEnd (): void {
        //     this.$emit('playEnd')
        // }

        // timeupdate (event): void {
        //     this.duration = event.detail.duration
        //     if (this.time >= event.detail.duration) this.time = 0
        //     this.time = event.detail.currentTime
        //     this.$emit('timeupdate', this.time)
        // }

        // videoPlay (): void {
        //     if (this.timer) clearTimeout(this.timer)
        //     this.timer = setTimeout(() => {
        //         if (this.play) {
        //             this.videoCtx.play()
        //             this.playFirst = false
        //         } else {
        //             this.videoCtx.pause()
        //             this.$emit('pause', this.time)
        //         }
        //     }, 300)
        // }

        // get startTime (): number {
        //     return this.initialTime
        // }

        // watch:{
        // 	//防抖 防止视频播放暂停太快
        // 	play: function (newVal,oldVal){
        // 		if(this.load) this.videoPlay()
        // 	},
        // 	startTime:{
        // 		immediate: true,
        // 		handler(newVal,oldVal){
        //
        // 			this.time = newVal
        // 		}
        // 	},
        // 	gDuration:{
        // 		immediate: true,
        // 		handler(newVal,oldVal){
        //
        // 			this.duration = newVal
        // 		}
        // 	}
        // },

    }
</script>
