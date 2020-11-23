<template>
	<view :style="{borderTop: borderTop, borderBottom: borderBottom}" class="u-field">
		<view :class="[type == 'textarea' ? 'u-textarea-inner' : '', 'u-label-postion-' + labelPosition]"
			  class="u-field-inner">
			<view :class="[required ? 'u-required' : '']"
				  :style="{ justifyContent: justifyContent, flex: labelPosition == 'left' ? `0 0 ${labelWidth}rpx` : '1'}"
				  class="u-label">
				<!--图标-->
				<view class="u-icon-wrap margin-left-right-xl" v-if="icon">
					<view :class="['fa-' + icon]" class="fa"></view>
				</view>
				<text :class="[this.$slots.icon || icon ? 'u-label-left-gap' : '']" class="u-label-text">{{ label }}
				</text>
			</view>
			<view class="fild-body">
				<view :style="[inputWrapStyle]" class="u-flex-1 u-flex">
					<textarea :autoHeight="autoHeight" :disabled="disabled" :fixed="fixed"
							  :focus="focus"
							  :maxlength="inputMaxlength" :placeholder="placeholder"
							  :placeholderStyle="placeholderStyle"
							  :style="[fieldStyle]"
							  :value="value" @blur="onBlur" @confirm="onConfirm" @focus="onFocus" @input="onInput"
							  @tap="fieldClick" class="u-flex-1 u-textarea-class"
							  v-if="type == 'textarea'" />
					<input :confirmType="confirmType" :disabled="disabled"
						   :focus="focus" :maxlength="inputMaxlength" :password="password || type === 'password'"
						   :placeholder="placeholder" :placeholderStyle="placeholderStyle" :style="[fieldStyle]"
						   :type="type" :value="value" @blur="onBlur"
						   @confirm="onConfirm" @focus="onFocus" @input="onInput" @tap="fieldClick"
						   class="u-flex-1 u-field__input-wrap"
						   v-else />
				</view>
				<view :class="['fa-' + 'times-circle']" @click.stop="onClear" class="fa u-clear-icon"
					  v-if="clearable && value != '' && focused"></view>
				<view class="u-button-wrap">
					<slot name="right" />
				</view>
			</view>
		</view>
		<view :style="{
			paddingLeft: labelWidth + 'rpx'
		}" class="u-error-message" v-if="errorMessage !== false && errorMessage != ''">{{ errorMessage }}
		</view>

	</view>
</template>

<script lang="ts">
    import { trim } from 'uJs/toolUtils'
    import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class MfieldIndex extends Vue {
        // 输入框设置
        @Prop({ default: '', type: String }) label?: string // 输入框左边的文字提示
        @Prop({ default: 'hand-grab-o', type: String }) icon?: string // label左边的图标
        @Prop({ default: false, type: Boolean }) required?: boolean // 是否必选
        @Prop({ default: '', type: String }) placeholder?: string // 占位符文字
        @Prop({ default: '', type: String }) placeholderStyle?: string // 占位符样式
        @Prop({ default: false, type: Boolean }) disabled?: boolean // 是否禁用
        @Prop({ default: 'right', type: String }) labelPosition?: string // lable的位置，可选为 left-左边，top-上边
        @Prop({ default: 130, type: [Number, String] }) labelWidth?: string | number // 左边标题的宽度单位rpx
        @Prop({ default: false, type: Boolean }) password?: boolean // 是否为密码框
        @Prop({ default: true, type: Boolean }) clearable?: boolean // 是否显示清楚按钮
        @Prop({ default: 'left', type: String }) inputAlign?: string // 输入光标的位置 left|center|right
        @Prop({ default: 'left', type: String }) labelAlign?: string // 对齐方式，left|center|right
        @Prop({ default: true, type: Boolean }) focus?: boolean // 是否自动聚焦
        @Prop({ default: 'done', type: String }) confirmType?: string // 设置键盘右下角按钮的文字，仅在 type="text" 时生效。	 send	右下角按钮为“发送” search	右下角按钮为“搜索” next	右下角按钮为“下一个”	 go	右下角按钮为“前往” done	右下角按钮为“完成”
        @Prop({ default: 'text', type: String }) type?: string // 输入框类型
        @Prop({ default: '', type: String }) value?: string // 输入框的值
        @Prop({ default: 140, type: [Number, String] }) maxlength?: string | number // 输入框输入字符的最大长度
        // textarea设置
        @Prop({ default: true, type: Boolean }) autoHeight?: boolean //
        @Prop({ default: true, type: Boolean }) fixed?: boolean //
        // 其他设置
        @Prop({ default: '1px solid #eee', type: String }) borderTop?: string // 是否显示上边框
        @Prop({ default: '1px solid #eee', type: String }) borderBottom?: string // 是否显示下边框
        @Prop({
            default () {
                return {}
            }
        }) fieldStyle?: any // 输入框的自定义样式

        @Prop({ default: true, type: Boolean }) trim?: boolean // 是否自动去除两端的空格
        @Prop({ default: '', type: String }) errorMessage?: string // 提示错误信息


		@Prop({ default: '', type: String }) rightIcon?: string //

        focused: boolean = false
        itemIndex: number = 0

        get inputWrapStyle () {
            const style: any = {}
            style.textAlign = this.inputAlign
            // 判断lable的位置，如果是left的话，让input左边两边有间隙
            if (this.labelPosition == 'left') {
                style.margin = '0 8rpx'
            } else {
                // 如果lable是top的，input的左边就没必要有间隙了
                style.marginRight = '8rpx'
            }
            return style
        }

        get labelStyle () {
            const style: any = {}
            if (this.labelAlign == 'left') style.justifyContent = 'flext-start'
            if (this.labelAlign == 'center') style.justifyContent = 'center'
            if (this.labelAlign == 'right') style.justifyContent = 'flext-end'
            return style
        }

        // uni不支持在computed中写style.justifyContent = 'center'的形式，故用此方法
        get justifyContent(): string { // eslint-disable-line
            if (this.labelAlign == 'left') return 'flex-start'
            if (this.labelAlign == 'center') return 'center'
            if (this.labelAlign == 'right') return 'flex-end'
        }

        // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
        get inputMaxlength () {
            return Number(this.maxlength)
        }

        // label的位置
        get fieldInnerStyle () {
            const style: any = {}
            if (this.labelPosition == 'left') {
                style.flexDirection = 'row'
            } else {
                style.flexDirection = 'column'
            }
            return style
        }

        @Emit('input')
        onInput (event) {
            let { value } = event.detail
            // 判断是否去除空格
            if (this.trim) value = trim(value)
            return value
        }

        @Emit('focus')
        onFocus (event) {
            this.focused = true
            return event
        }

        @Emit('blur')
        onBlur (event) {
            // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
            // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
            setTimeout(() => {
                this.focused = false
            }, 100)
            return event
        }

        @Emit('confirm')
        onConfirm (e) {
            return e.detail.value
        }

        @Emit('input')
        onClear (event) {
            return ''
        }

        @Emit('click')
        fieldClick () {
            return ''
        }
    }
</script>

<style lang="scss" scoped>
	@import "~@/styles/module/field";
</style>
