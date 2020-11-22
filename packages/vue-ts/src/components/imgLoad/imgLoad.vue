<template>
	<view class="easy-loadimage" :id="uid" style="width: 100%;" :style="{height: heights}">
		<image class="origin-img" :src="imageSrc" :mode="mode" @click="showClick && ui.showImg(imageSrc)"
			   v-if="loadImg&&!isLoadError" v-show="showImg"
			   :class="{'no-transition':!openTransition,'show-transition':showTransition&&openTransition}"
			   @load="handleImgLoad" @error="handleImgError">
		</image>
		<view class="loadfail-img" v-else-if="isLoadError"></view>
		<view :class="['loading-img', loadingMode]" v-show="!showImg&&!isLoadError"></view>
	</view>
</template>


<script lang="ts">
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

    function generateUUID() {// eslint-disable-line
        // eslint-disable-next-line
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0 // eslint-disable-line
            const v = c == 'x' ? r : (r & 0x3 | 0x8) // eslint-disable-line
            return v.toString(16) // eslint-disable-line
        })
    }

	@Component({})
	export default class imgLoad extends Vue {
        @Prop({ default: '300rpx', type: String }) heights?: string //
        @Prop({ default: '', type: String }) imageSrc?: string //
        @Prop({ default: '', type: String }) mode?: string //
        @Prop({ default: 'looming-gray', type: String }) loadingMode?: string //
		@Prop({ default: 0, type: Number }) scrollTop?: number //
		@Prop({ default () { return uni.getSystemInfoSync().windowHeight }, type: Number }) viewHeight?: number //
		@Prop({ default: true, type: Boolean }) openTransition?: boolean //
		@Prop({ default: true, type: Boolean }) showAll?: boolean // 加载当前获取到的所有图片

        uid: string = ''
        loadImg: boolean = false
        showImg: boolean = false
        isLoadError: boolean = false
        showTransition: boolean = false

        mounted () { // 初始化
            this.uid = `uid-${generateUUID()}`
            this.onScroll()
        }

        @Watch('scrollTop', { immediate: false, deep: false })
        onChangeValue () {
            this.onScroll()
        }

        // 图片加载事件
        handleImgLoad (e) {
            this.showImg = true
            setTimeout(() => {
                this.showTransition = true
            }, 50)
        }

        // 图片加载出错
        handleImgError (e) {
            this.isLoadError = true
        }

        onScroll () {
            // 加载ing时才执行滚动监听判断是否可加载
            if (this.loadImg || this.isLoadError) return
            const id = this.uid
            const query = uni.createSelectorQuery().in(this)
            query.select(`#${id}`).boundingClientRect(data => {
                if (this.showAll) {
                    this.loadImg = true
                } else {
                    if (!data) return
                    if (data.top - this.viewHeight < 0) {
                        this.loadImg = true
                    }
                }
            }).exec() // eslint-disable-line
        }
	}
</script>

<style scoped>
	/* 官方优化图片tips */
	image {
		will-change: transform
	}

	/* 渐变过渡效果处理 */
	image.origin-img {
		width: 100%;
		height: 100%;
		opacity: 0.3;
	}

	image.origin-img.show-transition {
		transition: opacity 1.2s;
		opacity: 1;
	}

	image.origin-img.no-transition {
		opacity: 1;
	}

	/* 加载失败、加载中的占位图样式控制 */
	.loadfail-img {
		height: 100%;
		background: url('resources/images/common/loadfail.png') no-repeat center;
		background-size: 50%;
	}

	.loading-img{
		height: 100%;
	}

	/* 转圈 */
	.spin-circle {
		background: url('https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/10.jpg') no-repeat center;
		background-size: 100rpx;
	}

	/* 动态灰色若隐若现 */
	.looming-gray {
		animation: looming-gray 1s infinite linear;
		background-color: #e3e3e3;
	}

	@keyframes looming-gray {
		0% {
			background-color: #e3e3e3aa;
		}
		50% {
			background-color: #e3e3e3;
		}
		100% {
			background-color: #e3e3e3aa;
		}
	}

	/* 骨架屏1 */
	.skeleton-1 {
		background-color: #e3e3e3;
		background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 80%);
		background-size: 100rpx 100%;
		background-repeat: repeat-y;
		background-position: 0 0;
		animation: skeleton-1 .6s infinite;
	}

	@keyframes skeleton-1 {
		to {
			background-position: 200% 0;
		}
	}

	/* 骨架屏2 */
	.skeleton-2 {
		background-image: linear-gradient(-90deg, #fefefe 0%, #e6e6e6 50%, #fefefe 100%);
		background-size: 400% 400%;
		background-position: 0 0;
		animation: skeleton-2 1.2s ease-in-out infinite;
	}

	@keyframes skeleton-2 {
		to {
			background-position: -135% 0;
		}
	}
</style>

