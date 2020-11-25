<template>
	<!--width: '20vw',-->
	<view :style="{width: fullWidth, backgroundColor: mainColor}" style="position: relative" class="">
		<view class="full-width">
			<!--

			this.isLeftNew = `${this.isLeft + index * 124}` // 设置下划线位置
					@Prop({ default: 14, type: Number }) isLeft?: number // tab栏高度

			-->

			<scroll-view :scroll-left="tabLeft" scroll-with-animation scroll-x="true" style="white-space: nowrap;display: flex;text-align: center"
						 :style="{height: (tabHeight) + 'rpx'}">
				<view :data-index="index" :id="'id'+index" :key="index" :style="[customStyle, {
						color: index===myTab ? activeColor : color,
						backgroundColor: index===myTab ? activeBgColor : bgColor,
						width: '20%',
						fontSize: index===myTab ? activeSize : textSize,
					  	height: (tabHeight-20) + 'rpx', lineHeight: (tabHeight-20) + 'rpx',
					  	fontWeight: isBold ? 'bolder' : ''}]"
					  @click="longClick(index)" class="inline-block text-center" v-for="(item,index) in tabListsNew"
					  style="margin-left: 4%"
				>
					<view style="position: relative">{{item.name}}
						<view v-if="tagStatus && item.num != 0" class="cu-tag badge"
							  :style="{top: tagTop + 'rpx', right: item.name.length == 2 ? tagRight + 'rpx' : item.name.length == 3 ?
							  (tagRight - 25) + 'rpx' : item.name.length == 4 ? (tagRight - 45) + 'rpx' : ''
							  , background: tagBg}">{{item.num}}</view>
					</view>
				</view>
				<!--下划线-->
				<view v-if="lineStatus"
					  :style="{transform: `translateX(${isLeft}px)`, width: '20%', height: underLineHeight + 'rpx'}"
					  class="underlineBox">
					<view :style="{background: lineColor, width: underLineWidth, borderRadius: lineRadius}" class="underline"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script lang="ts">
    import { Component, Prop, Vue, Emit, PropSync } from 'vue-property-decorator'

    @Component({})
    export default class swiperTabUpt extends Vue {
        // tab栏相关
        @Prop({ default: '94vw', type: String }) fullWidth?: string // tab栏宽度
        @Prop({ default: 90, type: Number }) tabHeight?: number // tab栏高度
        @Prop({ default: 0, type: Number }) tabClick?: number // 当前被点击的导航
        @PropSync('tabLists', { type: Array }) tabListsNew!: any; // 用来实现组件的双向绑定,子组件可以更改父组件穿过来的值
		@Prop({ default () { return { borderRadius: '0px' } } }) customStyle?: any //
        @Prop({ default: '#fff', type: String }) mainColor?: string // 背景颜色
		// @Prop({ default: 13, type: Number }) isLeft?: number // tab栏高度

        // tab栏字体相关
        @Prop({ default: false, type: Boolean }) isBold?: boolean // tab字体是否加粗
        @Prop({ default: '#5698FE', type: String }) activeBgColor?: string // 选中tab的背景颜色
        @Prop({ default: '#fff', type: String }) bgColor?: string // 背景颜色
        @Prop({ default: 'red', type: String }) activeColor?: string // 选中tab的颜色
        @Prop({ default: '#666', type: String }) color?: string // 选中tab的颜色
        @Prop({ default: '20px', type: String }) activeSize?: string // 选中tab文字的大小
        @Prop({ default: '16px', type: String }) textSize?: string // tab栏字体大小
        // 下划线相关
        @Prop({ default: '10px', type: String }) lineRadius?: string // 下划线圆角
        @Prop({ default: 6, type: Number }) underLineHeight?: number // 下划线高度
        @Prop({ default: '20%', type: String }) underLineWidth?: string // 下划线宽度
        @Prop({ default: 'green', type: String }) lineColor?: string // 下划线颜色
		@Prop({ default: false, type: Boolean }) lineStatus?: boolean //
		// 标签相关
		@Prop({ default: true, type: Boolean }) tagStatus?: boolean // 是否显示标签
        @Prop({ default: 0, type: Number }) tagTop?: number // 标签左侧位置
        @Prop({ default: 0, type: Number }) tagRight?: number // 标签右侧位置
        @Prop({ default: '#dd514c', type: String }) tagBg?: string // 标签颜色

		isLeft: any = 0 // 导航栏下划线位置
		isWidth: number = 0 // 每个导航栏占位
		tabLeft: any = 0 //
		myTab: number = 0 // 当前选中的tab

        created () : void {
            this.myTab = this.tabClick

            uni.getSystemInfo({ // 获取设备宽度控制每个tab栏的宽度
                success: e => { // eslint-disable-line
                    if (this.tabListsNew.length <= 5) {
                        // 如果tab栏宽度不需要100%，则根据自己所需百分比控制
                        this.isWidth = (e.windowWidth * (parseFloat(this.fullWidth) / 100)) / this.tabListsNew.length // 宽度除以导航标题个数=一个导航所占宽度
                    } else {
                        this.isWidth = e.windowWidth / 4
                        // this.isWidth = e.windowWidth / 5.5
                    }
                }
            })
        }



        @Emit('input') // v-model 直接接收到index的值
        longClick (index : number) : number { // 导航栏被点击事件
            this.tabListsNew[index].num = 0 // 用于清除标签数字提示
            this.tabListsNew[0].num = 0 // 用于清除标签数字提示
            if (this.tabListsNew.length > 5) {
                this.tabLeft = (index - 2) * this.isWidth // 设置下划线位置
				console.log(this.tabLeft)
            }
            this.myTab = index // 设置导航点击了哪一个
			this.isLeft = index * this.isWidth // 设置下划线位置
			return index
        }
    }
</script>

<style>
	.underlineBox {
		display: flex;
		align-content: center;
		justify-content: center;
		transition: .5s;
	}

	/*>>> .uni-scroll-view{*/
		/*overflow: revert!important;*/
	/*}*/
</style>
