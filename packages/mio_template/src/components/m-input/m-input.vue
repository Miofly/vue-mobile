<template>
	<view :class="{	'u-input--border': border, 'u-input--error': validateState }"
			:style="{ padding: `0 ${border ? 20 : 0}rpx`, borderColor: borderColor, textAlign: inputAlign }"
			@tap.stop="inputClick" class="u-input">
		<textarea :autoHeight="autoHeight" :cursor-spacing="getCursorSpacing" :disabled="disabled"
				:fixed="fixed" :focus="focus" :maxlength="inputMaxlength" :placeholder="placeholder"
				:placeholderStyle="placeholderStyle" :selection-end="uSelectionEnd" :selection-start="uSelectionStart"
				:show-confirm-bar="showConfirmbar" :style="[getStyle]" :value="defaultValue"
				@blur="handleBlur" @confirm="onConfirm" @focus="onFocus" @input="handleInput"
				class="u-input__input u-input__textarea" v-if="type == 'textarea'" />
		<input :confirmType="confirmType" :cursor-spacing="getCursorSpacing" :disabled="disabled || type === 'select'"
				:focus="focus" :maxlength="inputMaxlength" :password="type == 'password' && !showPassword"
				:placeholder="placeholder" :placeholderStyle="placeholderStyle" :selection-end="uSelectionEnd"
				:selection-start="uSelectionStart" :show-confirm-bar="showConfirmbar"
				:style="[getStyle]" :type="type == 'password' ? 'text' : type" :value="defaultValue"
				@blur="handleBlur" @confirm="onConfirm" @focus="onFocus" @input="handleInput"
			   class="u-input__input" v-else />
		<view class="u-input__right-icon u-flex">
			<text class="u-input__right-icon__clear u-input__right-icon__item" @tap="onClear" v-if="clearable && value != '' && focused">
				<text class="fa fa-times-circle-o" :style="{color: iconColor}"></text>
			</text>
			<text class="u-input__right-icon__clear u-input__right-icon__item" v-if="passwordIcon && type == 'password'">
				<text class="fa" :class="[!showPassword ? 'fa-eye-slash' : 'fa-eye']" @click="showPassword = !showPassword" :style="{color: iconColor}"></text>
			</text>
			<view class="u-input__right-icon--select u-input__right-icon__item" v-if="type == 'select'"
				  :class="{'u-input__right-icon--select--reverse': selectOpen}">
				<view class="fa fa-chevron-down" :style="{color: iconColor}"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component({})
    export default class inputIndex extends Vue {
        @Prop({ default: '', type: [Number, String] }) value?: number | string //
        @Prop({ default: 140, type: [Number, String] }) maxlength?: number | string //
        @Prop({ default: '', type: [Number, String] }) height?: number | string // 高度，单位rpx
        @Prop({ default: 0, type: [Number, String] }) cursorSpacing?: number | string // 指定光标与键盘的距离，单位 px
        @Prop({ default: -1, type: [Number, String] }) selectionStart?: number | string // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
        @Prop({ default: -1, type: [Number, String] }) selectionEnd?: number | string // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
        @Prop({ default: 'text', type: String }) type?: string // 输入框的类型，textarea，text，number
        @Prop({ default: 'left', type: String }) inputAlign?: string //
        @Prop({ default: '#c0c4cc', type: String }) iconColor?: string //
        @Prop({ default: '请输入内容', type: String }) placeholder?: string //
        @Prop({ default: 'color: #c0c4cc;', type: String }) placeholderStyle?: string //
        @Prop({ default: 'done', type: String }) confirmType?: string //
        @Prop({ default: '#dcdfe6', type: String }) borderColor?: string // 输入框的边框颜色
        @Prop({ default: false, type: Boolean }) disabled?: boolean //
        @Prop({ default: false, type: Boolean }) fixed?: boolean // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
        @Prop({ default: false, type: Boolean }) focus?: boolean // 是否自动获得焦点
        @Prop({ default: true, type: Boolean }) passwordIcon?: boolean // 密码类型时，是否显示右侧的密码图标
        @Prop({ default: true, type: Boolean }) border?: boolean // input|textarea是否显示边框
        @Prop({ default: true, type: Boolean }) autoHeight?: boolean // input|textarea是否显示边框
        @Prop({ default: true, type: Boolean }) clearable?: boolean // 是否可清空
        @Prop({ default: false, type: Boolean }) selectOpen?: boolean // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态 open-打开，close-关闭
        @Prop({ default: true, type: Boolean }) trim?: boolean // 是否自动去除两端的空格
        @Prop({ default: true, type: Boolean }) showConfirmbar?: boolean // 是否显示键盘上方带有”完成“按钮那一栏
        @Prop({ default () { return {} } }) customStyle?: any // 输入框的自定义样式

        defaultValue: any = this.value
        inputHeight: number = 70 // input的高度
        textareaHeight: number = 100 // textarea的高度
        validateState: boolean = false // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: boolean = false // 当前是否处于获得焦点的状态
        showPassword: boolean = false // 是否预览密码
        lastValue: string = '' // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间

        @Watch('value', { immediate: false, deep: false })
        onChangeValue (nVal, oVal) {
            this.defaultValue = nVal
            // 当值发生变化，且为select类型时(此时input被设置为disabled，不会触发@input事件)，模拟触发@input事件
            if (nVal != oVal && this.type == 'select') {
                this.handleInput({
                    detail: {
                        value: nVal
                    }
                })
            }
        }

        // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
        get inputMaxlength () {
            return Number(this.maxlength)
        }

        get getStyle () {
            let style: any = {}
            // 如果没有自定义高度，就根据type为input还是textare来分配一个默认的高度
            style.minHeight = this.height ? `${this.height}rpx` : this.type == 'textarea' // eslint-disable-line
                ? `${this.textareaHeight}rpx` : `${this.inputHeight}rpx`
            style = Object.assign(style, this.customStyle)
            return style
        }

        //
        get getCursorSpacing () {
            return Number(this.cursorSpacing)
        }

        // 光标起始位置
        get uSelectionStart () {
            return String(this.selectionStart)
        }

        // 光标结束位置
        get uSelectionEnd () {
            return String(this.selectionEnd)
        }

        created () {
            // 监听u-form-item发出的错误事件，将输入框边框变红色
            this.$on('on-form-item-error', this.onFormItemError)
        }

        /**
         * change 事件
         * @param event
         */
        handleInput (event) {
            let { value } = event.detail
            // 判断是否去除空格
            if (this.trim) value = this.$mio.mioRoot.trim(value)
            // vue 原生的方法 return 出去
            this.$emit('input', value)
            // 当前model 赋值
            this.defaultValue = value
            // 过一个生命周期再发送事件给u-form-item，否则this.$emit('input')更新了父组件的值，但是微信小程序上
            // 尚未更新到u-form-item，导致获取的值为空，从而校验混论
            // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
            setTimeout(() => {
                // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
                // #ifdef MP-TOUTIAO
                if (this.$mio.mioRoot.trim(value) == this.lastValue) return
                this.lastValue = value
                // #endif
                // 将当前的值发送到 u-form-item 进行校验
                this.dispatch('m-form-item', 'on-form-change', value)
            }, 40)
        }

        /**
         * blur 事件
         * @param event
         */
        handleBlur (event) {
            // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
            // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
            setTimeout(() => {
                this.focused = false
            }, 100)
            // vue 原生的方法 return 出去
            this.$emit('blur', event.detail.value)
            const { value } = event.detail
            setTimeout(() => {
                // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
                // #ifdef MP-TOUTIAO
                if (this.$mio.mioRoot.trim(value) == this.lastValue) return
                this.lastValue = value
                // #endif
                // 将当前的值发送到 u-form-item 进行校验
                this.dispatch('m-form-item', 'on-form-blur', event.detail.value)
            }, 40)
        }

        /**
         * 派发 (向上查找) (一个)
         * @param componentName // 需要找的组件的名称
         * @param eventName // 事件名称
         * @param params // 需要传递的参数
         */
        dispatch (componentName, eventName, params) {
            let parent = this.$parent || this.$root// $parent 找到最近的父节点 $root 根节点
            let { name } = parent.$options // 获取当前组件实例的name
            // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
            // 循环出当前名称的一样的组件实例
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.name // eslint-disable-line
                }
            }
            // 有节点表示当前找到了name一样的实例
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params)) // eslint-disable-line
            }
        }

        onFormItemError (status) {
            this.validateState = status
        }

        onFocus (event) {
            this.focused = true
            this.$emit('focus')
        }

        onConfirm (e) {
            this.$emit('confirm', e.detail.value)
        }

        onClear (event) {
            this.$emit('input', '')
        }

        inputClick () {
            this.$emit('click')
        }
    }
</script>

<style lang="scss" scoped>
	.u-input {
		position: relative;
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */

		&__input {
			//height: 70rpx;
			font-size: 28rpx;
			color: #303133;
			flex: 1;
		}

		&__textarea {
			width: auto;
			font-size: 28rpx;
			color: #303133;
			padding: 10rpx 0;
			line-height: normal;
			flex: 1;
		}

		&--border {
			border-radius: 6rpx;
			border: 1px solid #dcdfe6;
		}

		&--error {
			border-color: #fa3534 !important;
		}

		&__right-icon {

			&__item {
				margin-left: 10rpx;
			}

			&--select {
				transition: transform .4s;

				&--reverse {
					transform: rotate(-180deg);
				}
			}
		}
	}
</style>
