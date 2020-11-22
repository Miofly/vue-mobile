<template>
	<view class="bg-white ">
		<view class="flex justify-center padding">
			<canvas id="color-palette" canvas-id="color-palette" :style="{width:222+'px',height:100+'px'}" style="border-radius: 20px"></canvas>
		</view>

		<view v-if="colors.length>0" class="flex justify-around margin text-white">
			<view v-for="(item,index) in colors" :key="index" class="padding" :style="{backgroundColor:item}" @tap="$mio.mioRoot.copyText(item)" :data-color="item">{{ item }}</view>
		</view>

		<view style="width:94%" class="flex justify-between margin text-white padding-bottom" v-if="rbgColors.length>0">
			<view v-for="(item,index) in rbgColors" :key="index" class="padding" :style="{backgroundColor:`rgb(${item})`}" @tap="$mio.mioRoot.copyText(item)" :data-color="`rgb(${item})`">
				<view>RGB</view>
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import ColorAnalysis from 'uJs/plugin/color-analysis'
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class test extends Vue {
	colorAnalysis: any = null
	colors: any = []
	rbgColors: any = []
	winWidth: number = 375
	canvasWidth: number = 200
	canvasHeight: number = 200
	photoSrc: string = '/static/images/common/nzbg.jpg'

	onLoad () {
		this.colorAnalysis = new ColorAnalysis('color-palette')
		this.winWidth = uni.getSystemInfoSync().windowWidth
		console.log(this.colorAnalysis)
		uni.getImageInfo({
			src: this.photoSrc,
			success: imgInfo => {
				const { width, height } = imgInfo
				const scale = (0.6 * this.winWidth) / Math.max(width, height)
				const canvasWidth = Math.floor(scale * width)
				const canvasHeight = Math.floor(scale * height)
				this.canvasWidth = canvasWidth
				this.canvasHeight = canvasHeight
				this.colorAnalysis.getPalette(
					{
						width: canvasWidth,
						height: canvasHeight,
						imgPath: this.photoSrc,
						maxColors: 4,
						step: 1
					},
					colorArr => {
						console.log(colorArr)
						if (colorArr) {
							const rbgColors = []
							colorArr = colorArr.map(color => {
								rbgColors.push(`${color[0]},${color[1]},${color[2]}`)
								return this.$mio.mioRoot.rgbToHex(color[0], color[1], color[2])
							})
							console.log(colorArr, rbgColors)
							this.colors = colorArr
							this.rbgColors = rbgColors
						}
					}
				)
			}
		})
	}
}

</script>

<style>

</style>
