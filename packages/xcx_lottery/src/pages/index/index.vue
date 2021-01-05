<template>
    <view style="width: 750rpx;height: 100vh;overflow-x: hidden;overflow-y: scroll;">
        <view style="width: 750rpx;min-height: 100vh;height: auto;position: relative;">
            <!-- 背景 -->
            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
            		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="height: 100%;position: absolute;z-index: 0"
            		:shape="['square', 'circle'][0]" :src="baseConfig.bg" bgColor="rgba(0, 0, 0, 1)">
            	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
            </m-image>
            <view class="main" style="padding-top: 50rpx;">
                <view :style="{backgroundImage: 'url('+ baseConfig.lotteryBg +')'}" class="margin-center round"
                      style="position: relative;width: 600rpx;height: 600rpx;background-size: cover;">
                    <view :animation="animationData" class="block" style="position: absolute;left: 0;top: 0;z-index: 1;width: 600rpx;height: 600rpx;border-radius: inherit;">
                        <view style="position: absolute;left: 0;top: 0;width: inherit;height: inherit;z-index: 99;">
                            <view style="position: absolute;left: 300rpx;top: 0;width: 3rpx;height: 300rpx;background-color: rgba(228, 55, 14, 0.4);overflow: hidden;-webkit-transform-origin: 50% 300rpx;transform-origin: 50% 300rpx;" v-for="(item,index) in list" :key="index" :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"></view>
                        </view>
                        <view style="position: absolute;left: 0;top: 0;width: inherit;height: inherit;z-index: 9999;">
                            <view style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;color: #e4370e;"
                                  :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml,index) in list" :key="index">
                                <view class="margin-center text-center flex align-center" style="position: relative;padding-top: 46rpx;-webkit-transform-origin: 50% 300rpx;transform-origin: 50% 300rpx;flex-direction: column;color: #FB778B;" :style="'transform:rotate('+(index )+')'">
                                    <text style="font-size: 32rpx;">{{iteml.name}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!--抽奖按钮-->
                    <m-image @tap="playReward" :class="btnDisabled" duration="0" :showLoading="false" :borderRadius="10"
                             bgColorError="rgba(0, 0, 0, 1)" height="50" style=" position: absolute;left: 260rpx;top: 280rpx;z-index: 9999"
                    		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
                    		:shape="['square', 'circle'][0]" src="https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg" bgColor="rgba(0, 0, 0, 1)">
                    	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                    </m-image>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {

    baseConfig: any = {
        bg: '/static/images/bg.png',
        lotteryBg: '/static/images/circle.png'
    }

    list: any = [
        {
            name: '5折',
            value: '5',
            icon: 'icondazhe text-danger',
        },
        {
            name: '5折',
            value: '5',
            icon: 'icondazhe text-danger',
        },
        {
            name: '5折',
            value: '5',
            icon: 'icondazhe text-danger',
        },
        {
            name: '6折',
            value: '6',
            icon: 'icondazhe text-danger',
        },
        {
            name: '7折',
            value: '7',
            icon: 'icondazhe text-danger',
        },
        {
            name: '8折',
            value: '8',
            icon: 'icondazhe text-danger',
        },
        {
            name: '9折',
            value: '9',
            icon: 'icondazhe text-danger',
        },
        {
            name: '感谢参与',
            value: '10',
            icon: 'iconfangqi1 text-master',
            isNoPrize: true, // 是否未中奖
        },
    ]

    width: number = 0
    animationData: any = {}
    btnDisabled: string = ''

    onLoad () {
        // 获取奖品列表
        this.width = 360 / this.list.length
    }

    animation (index, duration) {
        // 中奖index
        const { list } = this
        // var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
        const runNum = 4 // 旋转8周

        // 旋转角度
        this.runDeg = this.runDeg || 0
        this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - index * (360 / list.length)) + 1
        // 创建动画
        const animationRun = uni.createAnimation({
            duration,
            timingFunction: 'ease'
        })
        animationRun.rotate(this.runDeg).step()
        this.animationData = animationRun.export()
        this.btnDisabled = 'notClick'
    }

    // 发起抽奖
    playReward () {
        const duration = 1000 // 动画时间
        const index = 3 // 抽到礼物的索引
        this.animation(index, duration)

        setTimeout(() => {
            uni.showModal({ content: this.list[index].isNoPrize ? '抱歉，您未中奖' : '恭喜，中奖' })
            this.btnDisabled = ''
        }, duration)
    }
}
</script>
