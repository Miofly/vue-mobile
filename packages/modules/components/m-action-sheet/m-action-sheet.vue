<template>
	<m-popup mode="bottom" :border-radius="borderRadius" :popup="false" v-model="value" :maskCloseAble="maskCloseAble"
			 length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="popupClose" :z-index="uZIndex">
		<view class="u-tips u-border-bottom" v-if="tips.text" :style="[tipsStyle]">
			{{tips.text}}
		</view>
		<block v-for="(item, index) in list" :key="index">
			<view
					@touchmove.stop.prevent
					@tap="itemClick(index)"
					:style="[itemStyle(index)]"
					class="u-action-sheet-item u-line-1"
					:class="[index < list.length - 1 ? 'u-border-bottom' : '']"
					:hover-stay-time="150"
			>
				<text>{{item.text}}</text>
				<text class="u-action-sheet-item__subtext u-line-1" v-if="item.subText">{{item.subText}}</text>
			</view>
		</block>
		<view class="u-gab" v-if="cancelBtn">
		</view>
		<view @touchmove.stop.prevent class="u-actionsheet-cancel u-action-sheet-item" hover-class="u-hover-class"
			  :hover-stay-time="150" v-if="cancelBtn" @tap="close">{{cancelText}}</view>
	</m-popup>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class mActionSheet extends Vue {
        name: 'u-action-sheet'

        @Prop({ default: '取消', type: String }) cancelText?: string // 取消按钮的文字提示
        @Prop({ default () { return [] }, type: Array }) list?: any [] // 按钮的文字数组，可以自定义颜色和字体大小，字体单位为rpx
        @Prop({ default: 0, type: [Number, String] }) borderRadius?: number | string // 弹出的顶部圆角值
        @Prop({ default: 0, type: [Number, String] }) zIndex?: number | string // 弹出的z-index值
        @Prop({ default: true, type: Boolean }) maskCloseAble?: boolean // 点击遮罩是否可以关闭actionsheet
        @Prop({ default: true, type: Boolean }) cancelBtn?: boolean // 底部的取消按钮
        @Prop({ default: false, type: Boolean }) safeAreaInsetBottom?: boolean // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
        @Prop({ default: false, type: Boolean }) value?: boolean // 通过双向绑定控制组件的弹出与收起

        @Prop({ default () { return { text: '', color: '', fontSize: '26' } } }) tips?: any // 顶部的提示文字


        // 顶部提示的样式
        get tipsStyle () {
            const style: any = {}
            if (this.tips.color) style.color = this.tips.color
            if (this.tips.fontSize) style.fontSize = `${this.tips.fontSize}rpx`
            return style
        }

        // 操作项目的样式
        get itemStyle () {
            return (index) => {
                const style: any = {}
                if (this.list[index].color) style.color = this.list[index].color
                if (this.list[index].fontSize) style.fontSize = `${this.list[index].fontSize}rpx`
                // 选项被禁用的样式
                if (this.list[index].disabled) style.color = '#c0c4cc'
                return style
            }
        }

        get uZIndex () {
            // 如果用户有传递z-index值，优先使用
            return this.zIndex ? this.zIndex : this.$mio.mioCfg.popup
        }

        // 点击取消按钮
        close () {
            // 发送input事件，并不会作用于父组件，而是要设置组件内部通过props传递的value参数
            // 这是一个vue发送事件的特殊用法
            this.popupClose()
            this.$emit('close')
        }

        // 弹窗关闭
        popupClose () {
            this.$emit('input', false)
        }

        // 点击某一个item
        itemClick (index) {
            // disabled的项禁止点击
            if (this.list[index].disabled) return
            this.$emit('click', index)
            this.$emit('input', false)
        }
    }
</script>

<style lang="scss" scoped>
	.u-tips {
		font-size: 26rpx;
		text-align: center;
		padding: 34rpx 0;
		line-height: 1;
		color: #909399;
	}

	.u-action-sheet-item {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		line-height: 1;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		padding: 34rpx 0;
		flex-direction: column;
	}

	.u-action-sheet-item__subtext {
		font-size: 24rpx;
		color: #909399;
		margin-top: 20rpx;
	}

	.u-gab {
		height: 12rpx;
		background-color: rgb(234, 234, 236);
	}

	.u-actionsheet-cancel {
		color: #303133;
	}
</style>
