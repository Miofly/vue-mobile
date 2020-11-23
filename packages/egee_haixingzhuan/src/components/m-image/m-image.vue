<template>
	<view :style="[wrapStyle, backgroundStyle]" @tap="onClick" class="u-image">
		<image :lazy-load="lazyLoad" :mode="mode" :src="src"
			   :style="{borderRadius: shape == 'circle' ? '50%' : $mio.mioroot.addUnit(borderRadius)}"
			   @error="onErrorHandler" @load="onLoadHandler" class="u-image__image" v-if="!isError"></image>
		<view :style="{borderRadius: shape == 'circle' ? '50%' : $mio.mioroot.addUnit(borderRadius),backgroundColor: bgColor}"
			  class="u-image__loading" v-if="showLoading && loading">
			<slot name="loading" v-if="$slots.loading" />
			<view :style="{height: height, color: 'white'}" class="fa fa-spinner fa-spin fa-3x" v-else></view>
		</view>
		<view class="u-image__error" :style="{	borderRadius: shape == 'circle' ? '50%' : $mio.mioroot.addUnit(borderRadius), backgroundColor: bgColorError }" v-if="showError && isError && !loading">
			<slot name="error" v-if="$slots.error" />
			<!--<u-icon :height="height" :name="errorIcon" :width="width" v-else></u-icon>-->
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component({})
    export default class ImageIndex extends Vue {
        @Prop({ default: '', type: String }) src?: string // 图片地址
        @Prop({ default: 'aspectFill', type: String }) mode?: string // 裁剪模式
        @Prop({ default: '100%', type: String }) width?: string | number // 宽度，单位任意
        @Prop({ default: 'auto', type: String }) height?: string | number // 高度，单位任意
        @Prop({ default: 0, type: Number }) borderRadius?: string | number // 圆角，单位任意
		@Prop({ default: 500, type: [Number, String] }) duration?: number | string // 过渡时间，单位ms
        @Prop({ default: 'square', type: String }) shape?: string // 图片形状，circle-圆形，square-方形
        @Prop({ default: '#f3f4f6', type: String }) bgColor?: string //  背景颜色，用于深色页面加载图片时，为了和背景色融合
        @Prop({ default: '#f3f4f6', type: String }) bgColorError?: string //  加载失败背景颜色，用于深色页面加载图片时，为了和背景色融合
        @Prop({ default: true, type: Boolean }) lazyLoad?: boolean // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
        @Prop({ default: true, type: Boolean }) showMenuByLongpress?: boolean // 开启长按图片显示识别微信小程序码菜单
        @Prop({ default: true, type: Boolean }) showLoading?: boolean // 是否显示加载中的图标或者自定义的slot
        @Prop({ default: true, type: Boolean }) showError?: boolean // 是否显示加载错误的图标或者自定义的slot
        @Prop({ default: true, type: Boolean }) fade?: boolean // 是否需要淡入效果
        @Prop({ default: false, type: Boolean }) webp?: boolean // 只支持网络资源，只对微信小程序有效
        @Prop({ default: true, type: Boolean }) isLoading?: boolean // 普通图片


        isError: boolean = false // 图片是否加载错误，如果是，则显示错误占位图
        loading: boolean = true // 初始化组件时，默认为加载中状态
        opacity: number = 1 // 不透明度，为了实现淡入淡出的效果
        durationTime: any = this.duration // 过渡时间，因为props的值无法修改，故需要一个中间值
        backgroundStyle: any = {} // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景

        @Watch('src', { immediate: false, deep: false })
        onChangeValue (val) {
            if (!val) {
                // 如果传入null或者''，或者false，或者undefined，标记为错误状态
                this.isError = true
            } else {
                this.isError = false
            }
        }

        get wrapStyle () {
            const style: any = {}
            // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
            style.width = this.$mio.mioroot.addUnit(this.width)
            style.height = this.$mio.mioroot.addUnit(this.height)
            // 如果是配置了圆形，设置50%的圆角，否则按照默认的配置值
            style.borderRadius = this.shape == 'circle' ? '50%' : this.$mio.mioroot.addUnit(this.borderRadius)
            // 如果设置圆角，必须要有hidden，否则可能圆角无效
            style.overflow = this.borderRadius > 0 ? 'hidden' : 'visible'
            if (this.fade) {
                style.opacity = this.opacity
                style.transition = `opacity ${Number(this.durationTime) / 1000}s ease-in-out`
            }
            return style
        }

        // 点击图片
        onClick () {
            this.$emit('click')
        }

        // 图片加载失败
        onErrorHandler () {
            this.loading = false
            this.isError = true
            this.$emit('error')
        }

        // 图片加载完成，标记loading结束
        onLoadHandler () { // eslint-disable-line
            this.loading = false
            this.isError = false
            this.$emit('load')
            // 如果不需要动画效果，就不执行下方代码，同时移除加载时的背景颜色
            // 否则无需fade效果时，png图片依然能看到下方的背景色
            if (!this.fade) return this.removeBgColor()
            // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的灰色)，再改成1，是为了获得过渡效果
            this.opacity = 0
            // 这里设置为0，是为了图片展示到背景全透明这个过程时间为0，延时之后延时之后重新设置为duration，是为了获得背景透明(灰色)
            // 到图片展示的过程中的淡入效果
            this.durationTime = 0
            // 延时50ms，否则在浏览器H5，过渡效果无效
            setTimeout(() => {
                this.durationTime = this.duration
                this.opacity = 1
                setTimeout(() => {
                    this.removeBgColor()
                }, this.durationTime)
            }, 50)
        }

        // 移除图片的背景色
        removeBgColor () {
            // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
            this.backgroundStyle = {
                backgroundColor: 'transparent'
            }
        }
    }
</script>

<style scoped lang="scss">
	.u-image {
		position: relative;
		transition: opacity 0.5s ease-in-out;

		&__image {
			width: 100%;
			height: 100%;
		}

		&__loading,
		&__error {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: row;
			/* #endif */
			align-items: center;
			justify-content: center;
			background-color: #f3f4f6;
			color: #909399;
			font-size: 46 rpx;
		}
	}
</style>
