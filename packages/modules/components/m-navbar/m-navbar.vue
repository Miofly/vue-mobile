<template>
	<view class="">
		<view :class="{ 'u-navbar-fixed': isFixed, 'u-border-bottom': borderBottom }" :style="[navbarStyle]"
			  class="u-navbar">
			<view :style="{ height: statusBarHeight + 'px' }" class="u-status-bar"></view>
			<view :style="[navbarInnerStyle]" class="u-navbar-inner">
				<view class="flex align-center margin-left" @tap="back">
					<view v-if="backIcon" class="fa fa-angle-left " :style="[iconTextStyle]"></view>
					<view :style="[backTextStyle]" class="margin-left-ten-five width-ten-five" v-if="backText">
						{{backText}}
					</view>
				</view>
				<view :style="[titleStyle]" class="u-navbar-content-title" v-if="title">
					<view :style="[titleTextStyle]" class="u-title u-line-1">
						{{ title }}
					</view>
				</view>
				<view class="u-slot-right">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }"
			  class="u-navbar-placeholder"
			  v-if="isFixed && !immersive"></view>
	</view>
</template>

<script lang="ts">
    // 获取系统状态栏的高度
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

    const systemInfo = uni.getSystemInfoSync() // eslint-disable-line

    let menuButtonInfo: any = {}
    // 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
    // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
    menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // #endif
    @Component({})
    export default class Navbar extends Vue {
        @Prop({ default: '导航栏标题', type: String }) title?: string // 导航栏标题
        @Prop({ default () { return { color: 'white', fontSize: '18px' } } }) titleTextStyle?: any // 导航栏标题样式
        @Prop({ default () { return { background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' } } }) background?: any // 导航栏背景颜色

        @Prop({ default: '返回', type: String }) backText?: string // 返回的文字提示
        @Prop({ default () { return { color: 'white', fontSize: '40px' } } }) iconTextStyle?: any // 返回图标的样式
		@Prop({ default () { return { color: 'white', fontSize: '14px' } } }) backTextStyle?: any // 返回的文字的样式

        @Prop({ default: 0, type: Number }) height?: number // 导航栏高度，单位px，非rpx
        @Prop({ default: true, type: Boolean }) isFixed?: boolean // 导航栏是否固定在顶部
        @Prop({ default: true, type: Boolean }) backIcon?: boolean // 是否显示返回图标
        @Prop({ default: 250, type: Number }) titleWidth?: number // 标题的宽度，如果需要自定义右侧内容，且右侧内容很多时，可能需要减少这个宽度，单位rpx

        @Prop({ default: false, type: Boolean }) immersive?: boolean // 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效
        @Prop({ default: true, type: Boolean }) borderBottom?: boolean // 是否显示导航栏的下边框
        @Prop({ default: '', type: String }) zIndex?: string //

        menuButtonInfo: any = menuButtonInfo
        statusBarHeight: any = systemInfo.statusBarHeight

        @Emit('pBack')
        back (): void {
        	// 子组件可以不做处理
        }

        // 导航栏内部盒子的样式
        get navbarInnerStyle (): any {
            const style: any = {}
            // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
            style.height = `${this.navbarHeight}px`
            // // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
            // #ifdef MP
            const rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
            style.marginRight = `${rightButtonWidth}px`
            // #endif
            return style
        }

        // 整个导航栏的样式
        get navbarStyle (): any {
            const style: any = {}
            style.zIndex = this.zIndex ? this.zIndex : 980
            // 合并用户传递的背景色对象
            Object.assign(style, this.background)
            return style
        }

        // 导航中间的标题的样式
        get titleStyle (): any {
            const style: any = {}
            // #ifndef MP
            style.left = `${(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2}px`
            style.right = `${(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2}px`
            // #endif
            // #ifdef MP
            // 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
            const rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
            style.left = `${(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2}px`
            style.right = `${rightButtonWidth - (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + rightButtonWidth}px`
            // #endif
            style.width = `${uni.upx2px(this.titleWidth)}px`
            return style
        }

        // 转换字符数值为真正的数值
        get navbarHeight (): any {
            // #ifdef APP-PLUS || H5
            return this.height ? this.height : 44
            // #endif
            // #ifdef MP
            // 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
            // 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
            // return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
            // @ts-ignore
            return this.height ? this.height : systemInfo.platform == 'ios' ? 44 : 48 // eslint-disable-line
            // #endif
        }

    }
</script>

<style scoped lang="scss">
	.u-navbar {
		width: 100%;
	}

	.u-navbar-fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 991;
	}

	.u-status-bar {
		width: 100%;
	}

	.u-navbar-inner {
		display: flex;
		justify-content: space-between;
		position: relative;
		align-items: center;
	}

	.u-navbar-content-title {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		position: absolute;
		left: 0;
		right: 0;
		height: 60rpx;
		text-align: center;
		flex-shrink: 0;
	}

	.u-navbar-centent-slot {
		flex: 1;
	}

	.u-title {
		line-height: 60rpx;
		font-size: 32rpx;
		flex: 1;
	}

	.u-navbar-right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.u-slot-content {
		flex: 1;
		display: flex;
		align-items: center;
	}
</style>
