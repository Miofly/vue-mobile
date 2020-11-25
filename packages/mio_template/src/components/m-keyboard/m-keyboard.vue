<template>
	<m-popup :mask="mask" :maskCloseAble="maskCloseAble" :popup="false" :safeAreaInsetBottom="safeAreaInsetBottom"
			 :zIndex="uZIndex" @close="popupClose" length="auto" mode="bottom" v-model="value">
		<slot />
		<view class="u-tooltip" v-if="tooltip">
			<view @tap="onCancel" class="u-tooltip-item u-tooltip-cancel" hover-class="u-tooltip-cancel-hover">
				{{cancelBtn ? cancelText : ''}}
			</view>
			<view class="u-tooltip-item u-tooltip-tips" v-if="showTips">
				{{tips ? tips : mode == 'number' ? '数字键盘' : mode == 'card' ? '身份证键盘' : '车牌号键盘'}}
			</view>
			<view @tap="onConfirm" class="u-tooltip-item u-tooltips-submit" hover-class="u-tooltips-submit-hover"
				  v-if="confirmBtn">
				{{confirmBtn ? confirmText : ''}}
			</view>
		</view>
		<block v-if="mode == 'number' || mode == 'card'">
			<m-number-keyboard :dotEnabled="dotEnabled" :mode="mode" :textColor="textColor" :random="random" @backspace="backspace"
							   @change="change"></m-number-keyboard>
		</block>
		<block v-else>
			<m-car-keyboard :random="random" @backspace="backspace" @change="change"></m-car-keyboard>
		</block>
	</m-popup>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

    @Component({})
    export default class keyboardIndex extends Vue {
        // 键盘设置
        @Prop({ default: '#333', type: String }) textColor?: string // 键盘文字颜色
        @Prop({ default: 'number', type: String }) mode?: string // 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
        @Prop({ default: true, type: Boolean }) dotEnabled?: boolean // 是否显示键盘的"."符号
        @Prop({ default: false, type: Boolean }) random?: boolean // 是否打乱键盘按键的顺序
        // 键盘工具条
        @Prop({ default: true, type: Boolean }) showTips?: boolean // 是否显示工具条中间的提示
        @Prop({ default: true, type: Boolean }) tooltip?: boolean // 是否显示顶部工具条
        @Prop({ default: true, type: Boolean }) cancelBtn?: boolean // 是否显示工具条左边的"取消"按钮
        @Prop({ default: true, type: Boolean }) confirmBtn?: boolean // 是否显示工具条右边的"完成"按钮
        @Prop({ default: '取消', type: String }) cancelText?: string // 取消按钮的文字
        @Prop({ default: '确认', type: String }) confirmText?: string // 确认按钮的文字
        @Prop({ default: '', type: String }) tips?: string // 工具条中间的提示文字
        // 遮罩
        @Prop({ default: true, type: Boolean }) maskCloseAble?: boolean // 是否允许通过点击遮罩关闭键盘
        @Prop({ default: false, type: Boolean }) mask?: boolean // 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
        @Prop({ default: false, type: Boolean }) safeAreaInsetBottom?: boolean // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距

        @Prop({ default: '', type: String }) zIndex?: string // z-index值
        @Prop({ default: false, type: Boolean }) value?: boolean // 通过双向绑定控制键盘的弹出与收起

        get uZIndex () {
            return this.zIndex ? this.zIndex : this.$mio.mioCfg.popup
        }

        @Emit()
        change (e) {
            return e
        }

        // 键盘关闭
		@Emit('input')
        popupClose () {
            // 通过发送input这个特殊的事件名，可以修改父组件传给props的value的变量，也即双向绑定
            return false
        }

        // 输入完成
        @Emit('confirm')
        onConfirm () {
            this.popupClose()
        }

        // 取消输入
        @Emit('cancel')
        onCancel () {
            this.popupClose()
        }

        // 退格键
        @Emit()
        backspace () {

		}

        // 关闭键盘
        // close() {
        // 	this.show = false;
        // },
        // // 打开键盘
        // open() {
        // 	this.show = true;
        // }
    }
</script>

<style lang="scss" scoped>

	.u-keyboard {
		position: relative;
		z-index: 1003;
	}

	.u-tooltip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		justify-content: space-between;
	}

	.u-tooltip-item {
		color: #333333;
		flex: 0 0 33.333333%;
		text-align: center;
		padding: 20rpx 10rpx;
		font-size: 28rpx;
	}

	.u-tooltips-submit {
		text-align: right;
		flex-grow: 1;
		flex-wrap: 0;
		padding-right: 40rpx;
		color: #2979ff;
	}

	.u-tooltip-cancel {
		text-align: left;
		flex-grow: 1;
		flex-wrap: 0;
		padding-left: 40rpx;
		color: #888888;
	}

	.u-tooltips-submit-hover {
		color: #19be6b;
	}

	.u-tooltip-cancel-hover {
		color: #333333;
	}
</style>
