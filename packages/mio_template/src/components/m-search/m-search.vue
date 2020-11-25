<template>
	<view :style="{margin: margin}" @tap="clickHandler" class="u-search">
		<view :style="{	backgroundColor: bgColor,borderRadius: shape == 'round' ? '100rpx' : '10rpx',border: borderStyle,height: height + 'rpx'}" class="u-content">
			<view class="u-icon-wrap">
				<view class="u-clear-icon fa fa-search"></view>
			</view>
			<input :disabled="disabled" :focus="focus" :maxlength="maxlength"
					:placeholder="placeholder" :placeholder-style="`color: ${placeholderColor}`"
					:style="[{ textAlign: inputAlign, color: color, backgroundColor: bgColor, }, inputStyle]" :value="value"
					@blur="blur" @confirm="search" @focus="getFocus" @input="inputChange" class="u-input" confirm-type="search" placeholder-class="u-placeholder-class" type="text" />
			<view @tap="clear" class="u-close-wrap" v-if="keyword && clearabled && focused">
				<view class="fa fa-times-circle"></view>
			</view>
		</view>
		<view>
			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
					  :shape="['square', 'circle'][0]" :size="['default', 'medium', 'mini'][2]"
					  :type="['default', 'primary', 'error', 'warning', 'success'][1]" :customStyle="{width: '60px', height: '64rpx', fontSize: '14px'}"
					  @click="custom" class="text-white margin-left-xxl">
				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
				搜索
			</m-button>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

    @Component({})
    export default class searchIndex extends Vue {
        @Prop({ default: 'round', type: String }) shape?: string // 搜索框形状，round-圆形，square-方形
        @Prop({ default: '#f2f2f2', type: String }) bgColor?: string // 搜索框背景色，默认值#f2f2f2
        @Prop({ default: '请输入关键字', type: String }) placeholder?: string // 占位提示文字
        @Prop({ default: '搜索', type: String }) actionText?: string // 取消按钮文字
        @Prop({ default: 'left', type: String }) inputAlign?: string // 输入框内容对齐方式，可选值为 left|center|right
        @Prop({ default: 'none', type: String }) borderColor?: string // 边框颜色，只要配置了颜色，才会有边框
        @Prop({ default: '', type: String }) value?: string // 输入框的初始化内容
        @Prop({ default: '', type: String }) searchIconColor?: string // 搜索图标的颜色，默认同输入框字体颜色
        @Prop({ default: '#606266', type: String }) color?: string // 输入框字体颜色
        @Prop({ default: '#909399', type: String }) placeholderColor?: string // placeholder的颜色
        @Prop({ default: '0', type: String }) margin?: string // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法
        @Prop({ default: 'search', type: String }) searchIcon?: string // 左边输入框的图标，可以为uView图标名称或图片路径

        @Prop({ default: true, type: Boolean }) clearabled?: boolean // 是否启用清除控件
        @Prop({ default: true, type: Boolean }) showAction?: boolean // 是否在搜索框右侧显示取消按钮
        @Prop({ default: false, type: Boolean }) focus?: boolean // 是否自动聚焦
        @Prop({ default: false, type: Boolean }) disabled?: boolean // 是否启用输入框
        @Prop({ default: false, type: Boolean }) animation?: boolean // 开启showAction时，是否在input获取焦点时才显示

        @Prop({ default: 64, type: [Number, String] }) height?: number | string // 搜索框高度，单位rpx
        @Prop({ default: '-1', type: [Number, String] }) maxlength?: number | string // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)

        @Prop({
            default () {
                return {}
            }
        }) actionStyle?: any // 右边控件的样式

        @Prop({
            default () {
                return {}
            }
        }) inputStyle?: any // input输入框的样式，可以定义文字颜色，大小等，对象形式

        keyword: string = ''
        showClear: boolean = false // 是否显示右边的清除图标
        show: boolean = false
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: any = this.focus

        // 绑定输入框的值

        @Watch('keyword', { immediate: false, deep: false })
        onChangeValue (nVal) {
            // 双向绑定值，让v-model绑定的值双向变化
            this.$emit('input', nVal)
            // 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
            this.$emit('change', nVal)
        }

        @Watch('value', { immediate: true, deep: false })
        onChangeValueOne (nVal) {
            this.keyword = nVal
        }

        get showActionBtn () {
            if (!this.animation && this.showAction) return true
            return false
        }

        // 样式，根据用户传入的颜色值生成，如果不传入，默认为none
        get borderStyle () {
            if (this.borderColor) return `1px solid ${this.borderColor}`
            return 'none'
        }

        // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
        inputChange (e) {
            this.keyword = e.detail.value
        }

        // 清空输入
        // 也可以作为用户通过this.$refs形式调用清空输入框内容
        clear () {
            this.keyword = ''
            // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
            this.$nextTick(() => {
                this.$emit('clear')
            })
        }

        // 确定搜索
        @Emit('search')
        search (e) {
            this.$emit('search', e.detail.value)
            try {
                // 收起键盘
                uni.hideKeyboard()
            } catch (e) { // eslint-disable-line
            }
        }

        // 点击右边自定义按钮的事件
		@Emit('search')
        custom () {
            try {
                // 收起键盘
                uni.hideKeyboard()
            } catch (e) {
            }
            return this.keyword
        }

        // 获取焦点
        getFocus () {
            this.focused = true
            // 开启右侧搜索按钮展开的动画效果
            if (this.animation && this.showAction) this.show = true
            this.$emit('focus', this.keyword)
        }

        // 失去焦点
        blur () {
            // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
            // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
            setTimeout(() => {
                this.focused = false
            }, 100)
            this.show = false
            this.$emit('blur', this.keyword)
        }

        // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
        clickHandler () {
            if (this.disabled) this.$emit('click')
        }
    }
</script>

<style lang="scss" scoped>
	.u-search {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
		flex: 1;
	}

	.u-content {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
		padding: 0 18rpx;
		flex: 1;
	}

	.u-clear-icon {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
	}

	.u-input {
		flex: 1;
		font-size: 28rpx;
		line-height: 1;
		margin: 0 10rpx;
		color: #909399;
	}

	.u-close-wrap {
		width: 40rpx;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.u-placeholder-class {
		color: #909399;
	}

	.u-action {
		font-size: 28rpx;
		color: #303133;
		width: 0;
		overflow: hidden;
		transition: all 0.3s;
		white-space: nowrap;
		text-align: center;
	}

	.u-action-active {
		width: 80rpx;
		margin-left: 10rpx;
	}
</style>
