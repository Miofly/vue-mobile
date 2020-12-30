<template>
	<view class="full-width-height bg"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">
		<view class="full-width text-center">
			<!--倒计时-->
			<view class="text-22" style="padding-top: 120rpx;color: #FF5555">
				<text>倒计时：</text>
				<m-count-down v-show="gameStatus" ref="count_down" :autoplay="autoPlay" :fontSize="44"
				              :separator="['colon', 'zh'][0]" :showBorder="false" :showDays="false" :showHours="false"
				              :showMinutes="false" :timestamp="['60', '86400', '983272', '2'][3]"
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
			<view style="width: 100%;margin-top: 134rpx;text-align: center;">
                <view style="z-index: 10">
                    <canvas @click="addNum" id="canvas" style="display: inline-block;" type="2d"></canvas>
<!--                    <canvas id="canvasTwo" style="display: inline-block;" type="2d"></canvas>-->
                </view>
			</view>
            <view v-if="chanceNum > 0" class="text-18" style="color: #D3D5DE;">还有{{ chanceNum }}次机会</view>
            <view v-else class="text-18" style="color: #D3D5DE;">机会用完了，点击按钮观看视频可增加次数</view>

            <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 28rpx;position: fixed;bottom: 0"></ad>
		</view>

        <m-modal :closeShow="true" closeColor="black" bgColor="white" :closeSize="40" :descSize="30" :maskClosable="true" :status="status"
        	   title="这是标题" desc="这是描述" modalTop="0rpx" :titleSize="40" descColor="#999d9c" titleColor="black"
        	   width="90vw" padding="20" radius="30rpx" :showTitle="false" :showContent="true">
        	<view class="text-center margin-top-xxl">
        		<view>
        			再来一次
        		</view>
        	</view>
        </m-modal>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
    commonPost
} from '@/api'
import lottie from 'lottie-miniprogram'
import { State } from 'vuex-class'

let lottieInstance: any = ''
// let lottieInstanceTwo: any = ''

@Component({})
export default class extends Vue {
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg

	infoConfig: any = {
		bg: '/static/images/bg.png',
		clickSrc: '/static/images/click_me@2x.png',
		clickSrcTwo: '/static/images/click_me2.png',
		againSrc: '/static/images/zailai@2x.png',
	}

	status: boolean = false
	millisecond: number = 0
	num: number = 0
	chanceNum: number | string = this.$mio.mioRoot.getStorageSync('chance_num')
	millisecondTimer: any = null
	autoPlay: boolean = false
	gameStatus: boolean = false
	gameOut: boolean = false
	promptText: string = '点我'
	firstNum: string = '0'
	endNum: string = '0'
	imgChange: boolean = true
	tempStatus: boolean = false
    interstitialAd: any = null
    rewardedVideoAd: any = null

    sumCount: number = 0

    created () {
	    this.interstitialAd = null
	    if (wx.createInterstitialAd) {
	    	this.interstitialAd = wx.createInterstitialAd({
	    		adUnitId: this.$store.state.root.cpgg
	    	})
	    	this.interstitialAd.onLoad(() => {
	    		console.log('插屏广告加载成功')
	    	})
	    	this.interstitialAd.onError((err) => {
	    		console.log('插屏广告加载出错', err)
	    	})
	    	this.interstitialAd.onClose(() => {
	    		console.log('插屏广告关闭')
	    	})
	    }
	    this.rewardedVideoAd = null
	    if (wx.createInterstitialAd) {
	    	this.rewardedVideoAd = wx.createRewardedVideoAd({
	    		adUnitId: this.$store.state.root.jlgg
	    	})
	    	this.rewardedVideoAd.onLoad(() => {
	    		console.log('激励广告加载成功')
	    	})
	    	this.rewardedVideoAd.onError((err) => {
	    		console.log('激励广告出错', err)
	    	})
	    	this.rewardedVideoAd.onClose((res) => {
	    		console.log(res, '用户关闭广告')
	    		// 用户点击了【关闭广告】按钮
	    		if (res && res.isEnded) {
                    this.chanceNum++
                    this.$mio.mioRoot.setStorage('chance_num', this.chanceNum)
	    		    // 正常播放结束，可以下发游戏奖励
	    		} else {
	    		    this.$mio.mioRoot.showToast('未观看完成')
	    			// 播放中途退出，不下发游戏奖励
	    		}
	    	})
	    }

        lottieInstance = wx.createSelectorQuery().select('#canvas').node(res => {
            const canvas = res.node
            canvas.width = 300 // 设置宽高，也可以放到wxml中的canvas标签的style中
            canvas.hight = 300
            const context = canvas.getContext('2d')
            lottie.setup(canvas)
            lottieInstance = lottie.loadAnimation({ // 微信小程序给的接口，调用就完事了，原理不太懂
                loop: false, // 是否循环播放（选填）
                autoplay: false, // 是否自动播放（选填）
                animationData: require('./test.json'),
                // path: './test.json', // lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
                rendererSettings: { context }
            })
            lottieInstance.setSpeed(1)
            lottieInstance.setDirection(1)
        }).exec()

        // lottieInstanceTwo = wx.createSelectorQuery().select('#canvasTwo').node(res => {
        //     const canvas = res.node
        //     canvas.width = 300 // 设置宽高，也可以放到wxml中的canvas标签的style中
        //     canvas.hight = 300
        //     const context = canvas.getContext('2d')
        //     lottie.setup(canvas)
        //     lottieInstanceTwo = lottie.loadAnimation({ // 微信小程序给的接口，调用就完事了，原理不太懂
        //         loop: false, // 是否循环播放（选填）
        //         autoplay: true, // 是否自动播放（选填）
        //         // animationData: require('./test.json'),
        //         path: 'https://assets3.lottiefiles.com/packages/lf20_o5mv33b8.json', // lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
        //         rendererSettings: { context }
        //     })
        //     lottieInstanceTwo.setSpeed(1)
        //     lottieInstanceTwo.setDirection(1)
        // }).exec()
    }

	addNum () {
	    this.goGame()
	}

	goGame () {
        if (this.chanceNum > 0) {
            if (this.tempStatus) {
                this.tempStatus = false
                this.gameOut = false
                this.num = -1
                this.firstNum = '0'
                this.endNum = '0'
            }
            console.log('点击了嘛')
            lottieInstance.play()
            setTimeout(() => {
                lottieInstance.stop()
            }, 100)
            this.gameStatus = true
            if (this.num == 0) {
                this.startCountDown()
            }
            this.sumCount++
            if (!this.gameOut) {
                this.num++
                if (this.num < 10) {
                    this.firstNum = '0'
                    this.endNum = String(this.num)
                } else {
                    this.firstNum = String(this.num).slice(0, 1)
                    this.endNum = String(this.num).slice(1, 2)
                }
            }
        } else {
            this.rewardedVideoAd.show().catch(() => {
            	// 失败重试
            	this.rewardedVideoAd.load()
            		.then(() => this.rewardedVideoAd.show())
            		.catch(err => {
            			console.log(err)
            		})
            })
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
        this.interstitialAd.show().catch(() => {
            // 失败重试
            this.interstitialAd.load()
                .then(() => this.interstitialAd.show())
                .catch(err => {
                    this.status = true
                })
        })
		clearInterval(this.millisecondTimer)

        if (this.chanceNum > 0) {
            this.chanceNum--
            this.$mio.mioRoot.setStorage('chance_num', this.chanceNum)
        } else {
            this.chanceNum = '机会用完了，点击按钮观看视频可增加次数'
        }
		const tempTimer = setInterval(() => {
			this.millisecond -= 1
			if (this.millisecond < 5) {
				this.millisecond = 0
				clearInterval(tempTimer)
				this.gameOut = true
				this.tempStatus = true
                if (this.chanceNum > 0) {
                    this.$mio.mioRoot.showToast('游戏结束，可再来一次')
                } else {

                }
                this.putScore({ type: this.$store.state.center.type, openGid: this.$store.state.center.openGid, score: this.num, openId: this.$store.state.center.firend_openId })
			}
		}, 10)
	}

	async putScore ({ openId, openGid, score, type }) {
	    console.log(openId, openGid, score, type)
		const data = await commonPost('/api/user_achievement/record', { openId, openGid, score, type }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
        console.log(data, '游戏结束返回了多少数据')
	}
}
</script>

<style>
.bg {
	background-image:url('data:image/png;base64,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');
}
</style>
