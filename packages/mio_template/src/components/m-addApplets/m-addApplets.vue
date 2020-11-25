<template>
	<view :style="{height: headerHeight + 'rpx', lineHeight: headerHeight + 'rpx'}" v-if="headerFixConNew"
		  class="fixed-top text-center full-width" :class="[bgColor]">
		{{text}}
		<view @tap="headerFixConNew = false" :style="{lineHeight: headerHeight + 'rpx'}" class="fa fa-close fr margin-right"></view>
		<view style="animation: fingerUp 0.5s linear 0s infinite alternate;" class="fa fa-hand-o-up fr margin-right"
			  v-for="(item, index) in 3" :key="index" :style="{lineHeight: headerHeight + 'rpx'}"></view>
	</view>
</template>

<script lang="ts">
    import { Component, Emit, Prop, Vue, Watch, PropSync } from 'vue-property-decorator'

    @Component({})
    export default class addApplets extends Vue {
		@Prop({ default: 0, type: Number }) headerHeight?: number // 高度
		@PropSync('headerFixCon', { type: Boolean }) headerFixConNew!: any // 是否展示
		@Prop({ default: 'bg-gradual-blue', type: String }) bgColor?: string // 背景颜色
		@Prop({ default: '点击...添加到我的小程序，更方便哦', type: String }) text?: string // 提示文字
    }
</script>

<style>

</style>
