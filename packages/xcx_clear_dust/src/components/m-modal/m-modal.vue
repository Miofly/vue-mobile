<template>
	<view @touchmove.stop.prevent>
		<view :class="[(fadein || show)?'mio-modal-normal':'mio-modal-scale',show?'mio-modal-show':'']"
		      :style="{width:width,padding:padding,borderRadius:radius, marginTop: modalTop, background: bgColor}"
		      class="mio-modal-box">
			<view>
				<view :style="{fontSize: closeSize + 'rpx'}" @tap="show = false" class="fa fa-times-circle-o"
				      style="position: absolute; top:20px;right: 20px" v-if="closeShow"></view>
				<view :style="{fontSize: titleSize + 'rpx', color: titleColor}" class="mio-modal-title" v-if="showTitle">
					{{title}}
				</view>
				<view v-if="showContent" :style="{color:descColor,fontSize:descSize+'rpx'}"
				      class="mio-modal-content margin-top">{{desc}}
				</view>
			</view>
			<view>
				<slot></slot>
			</view>
		</view>
		<view :class="[show?'mio-mask-show':'']" @tap="handleClickCancel" class="mio-modal-mask"></view>
	</view>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component({})
export default class modal extends Vue {
	@PropSync('status', { type: Boolean }) show!: boolean; // 用来实现组件的双向绑定,子组件可以更改父组件穿过来的
	@Prop({ default: true, type: Boolean }) fadein?: boolean // 显示动画
	@Prop({ default: '90vw', type: String }) width?: string // modal 宽度
	@Prop({ default: '40rpx 64rpx', type: String }) padding?: string // modal padding值
	@Prop({ default: '24rpx', type: String }) radius?: string // modal 圆角
	@Prop({ default: 'white', type: String }) bgColor?: string // 背景颜色
	@Prop({ default: false, type: Boolean }) maskClosable?: boolean // 点击蒙板是否可以关闭modal框
	@Prop({ default: 0, type: [Number, String] }) modalTop?: number | string //

	@Prop({ default: true, type: Boolean }) closeShow?: boolean // 是否显示关闭按钮
	@Prop({ default: true, type: Boolean }) showContent?: boolean // 是否显示内容
	@Prop({ default: false, type: Boolean }) showTitle?: boolean // 是否显示标题
	@Prop({ default: 40, type: Number }) closeSize?: number // 关闭按钮大小

	@Prop({ default: '这是标题', type: String }) title?: string // 标题
	@Prop({ default: 40, type: Number }) titleSize?: number // 标题大小
	@Prop({ default: 'black', type: String }) titleColor?: string // 标题颜色
	@Prop({ default: '这是描述', type: String }) desc?: string // 描述
	@Prop({ default: 30, type: Number }) descSize?: number // 描述大小
	@Prop({ default: '#999', type: String }) descColor?: string // 描述颜色

	handleClickCancel (): void {
		if (!this.maskClosable) return
		this.show = false
	}
}
</script>

<style lang="scss">
@import 'ys/module/modal';
</style>
