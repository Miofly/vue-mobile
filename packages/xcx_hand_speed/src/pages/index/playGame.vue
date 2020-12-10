<template>
	<view :style="{backgroundImage: 'url('+ infoConfig.bg +')'}`" class="full-width-height"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">
		<view class="full-width text-center">
			<!--倒计时-->
			<view class="text-22" style="padding-top: 120rpx;color: #FF5555">
				<text>倒计时：</text>
				<m-count-down v-show="gameStatus" ref="count_down" :autoplay="autoPlay" :fontSize="40"
				              :separator="['colon', 'zh'][0]" :showBorder="false" :showDays="false" :showHours="false"
				              :showMinutes="false" :timestamp="['60', '86400', '983272', '21'][3]"
				              bg-color="transparent" border-color="#303133" class="" color="#FF5555"
				              separator-color="#303133" @end="end"></m-count-down>
				<text v-show="!gameStatus">10</text>
				<text class="text-22" style="color: #FF5555">:{{ millisecond < 10 ? `0${millisecond}` : millisecond }}
				</text>
			</view>
			<!--点击次数-->
			<view style="margin-top: 114rpx">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				       :src="`/static/images/${firstNum}.png`" style="width: 120rpx"></image>
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				       :src="`/static/images/${endNum}.png`" style="width: 120rpx"></image>
			</view>
			<!--点击按钮-->
			<view style="width: 100%;margin-top: 134rpx;text-align: center">
				<m-image v-show="imgChange" :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]" :showLoading="false"
				         :src="infoConfig.clickSrc"
				         bgColor="rgba(0, 0, 0, 1)" height="186"
				         bgColorError="rgba(0, 0, 0, 1)"
				         duration="0" style="" @click="addNum">
					<view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
				</m-image>
				<m-image v-show="!imgChange" :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]" :showLoading="false"
				         :src="infoConfig.clickSrcTwo"
				         bgColor="rgba(0, 0, 0, 1)" height="186"
				         bgColorError="rgba(0, 0, 0, 1)"
				         duration="0" style="" @click="addNum">
					<view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
				</m-image>
			</view>

			<view class="text-18" style="color: #D3D5DE;margin-top: 80rpx">还有{{ chanceNum }}次机会</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	infoConfig: any = {
		bg: '/static/images/bg.png',
		clickSrc: '/static/images/click_me@2x.png',
		clickSrcTwo: '/static/images/click_me2.png',
		againSrc: '/static/images/zailai@2x.png',
	}

	millisecond: number = 0
	num: number = 0
	chanceNum: number = 0
	millisecondTimer: any = null
	autoPlay: boolean = false
	gameStatus: boolean = false
	gameOut: boolean = false
	promptText: string = '点我'
	firstNum: string = '0'
	endNum: string = '0'
	imgChange: boolean = true
	tempStatus: boolean = false


	addNum () {
		if (this.tempStatus) {
			console.log('触发了嘛')
		    this.tempStatus = false
		    this.gameOut = false
		    this.num = -1
		    this.firstNum = '0'
		    this.endNum = '0'
		}

		this.imgChange = !this.imgChange
		this.gameStatus = true
		if (this.num == 0) {
			this.startCountDown()
		}
		if (!this.gameOut) {
			this.num++
			if (this.num % 2 == 0) {
				this.infoConfig.clickSrc = '/static/images/click_me@2x.png'
			} else {
				this.infoConfig.clickSrc = '/static/images/click_me2.png'
			}
			if (this.num < 10) {
				this.firstNum = '0'
				this.endNum = String(this.num)
			} else {
				this.firstNum = String(this.num).slice(0, 1)
				this.endNum = String(this.num).slice(1, 2)
			}
		}
	}

	startCountDown () {
		(this.$refs.count_down as any).start()
		this.millisecondTimer = setInterval(() => {
			if (this.millisecond == 0) {
				this.millisecond = 99
			}
			this.millisecond -= 1
		}, 5)
	}

	end () {
		clearInterval(this.millisecondTimer)
		const tempTimer = setInterval(() => {
			this.millisecond -= 1
			if (this.millisecond < 5) {
				console.log('执行')
				this.millisecond = 0
				clearInterval(tempTimer)
				this.gameOut = true
				this.tempStatus = true
				// this.infoConfig.clickSrc = '/static/images/zailai@2x.png'
				// this.infoConfig.clickSrcTwo = '/static/images/zailai@2x.png'
			}
		}, 10)
	}
}
</script>

<style>

</style>
