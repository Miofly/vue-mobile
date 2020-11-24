<template>
	<view :class="[value == true ? 'u-switch--on' : '', disabled ? 'u-switch--disabled' : '']" :style="[switchStyle]" @tap="onClick" class="u-switch">
		<view :style="{ width: $mio.mioRoot.addUnit(size), height: $mio.mioRoot.addUnit(size)}" class="u-switch__node node-class"></view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class mSwitchIndex extends Vue {
        @Prop({ default: false, type: Boolean }) loading?: boolean // 是否为加载中状态
        @Prop({ default: false, type: Boolean }) disabled?: boolean // 是否为禁用装填
        @Prop({ default: false, type: Boolean }) value?: boolean // 通过v-model双向绑定的值
        @Prop({ default: false, type: Boolean }) vibrateShort?: boolean // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)

        @Prop({ default: 50, type: [Number, String] }) size?: number | string // 开关尺寸，单位rpx
        @Prop({ default: true, type: [Number, String, Boolean] }) activeValue?: number | string | boolean // 打开选择器时的值
        @Prop({ default: false, type: [Number, String, Boolean] }) inactiveValue?: number | string | boolean // 关闭选择器时的值

        @Prop({ default: '#2979ff', type: String }) activeColor?: string // 打开时的背景颜色
        @Prop({ default: '#ffffff', type: String }) inactiveColor?: string // 关闭时的背景颜色

        get switchStyle () {
            const style: any = {}
            style.fontSize = `${this.size}rpx`
            style.backgroundColor = this.value ? this.activeColor : this.inactiveColor
            return style
        }

        get loadingColor () {
            return this.value ? this.activeColor : null
        }

        onClick () {
            if (!this.disabled && !this.loading) {
                // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
				// @ts-ignore
                if (this.vibrateShort) uni.vibrateShort() // eslint-disable-line
                this.$emit('input', !this.value)
                // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
                this.$nextTick(() => {
                    this.$emit('change', this.value ? this.activeValue : this.inactiveValue)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
	.u-switch {
		position: relative;
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		box-sizing: initial;
		width: 2em;
		height: 1em;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1em;
		transition: background-color 0.3s;
		font-size: 50 rpx;
	}

	.u-switch__node {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 100%;
		z-index: 1;
		background-color: #fff;
		background-color: #fff;
		box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
		box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05), -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05)
	}

	.u-switch__loading {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.u-switch--on {
		background-color: #1989fa;
	}

	.u-switch--on .u-switch__node {
		transform: translateX(100%);
	}

	.u-switch--disabled {
		opacity: 0.4;
	}
</style>
