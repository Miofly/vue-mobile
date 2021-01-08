<template>
    <view style="overflow-x: hidden;overflow-y: scroll;" class="text-center full-width-height">
        <view style="min-height: 100vh;height: auto;" class="text-center full-width">
            <!-- 背景 -->
            <m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
                     :showLoading="false" :src="baseConfig.bg"
                     bgColor="rgba(0, 0, 0, 1)"
                     bgColorError="rgba(0, 0, 0, 1)" width="100vw"
                     duration="0" style="height: 100%;position: absolute;z-index: 0">
                <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
            </m-image>

            <view class="margin-center" style="height: 150rpx;width: 690rpx;position: relative;top: 16rpx;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.2) 100%);
            box-shadow: 1px 1px 2px 0px rgba(255, 255, 255, 0.23);border-radius: 8px;">
                <!--头像-->
                <view class="cu-avatar" :class="[false ? 'radius' : 'round']"
                	  :style="{backgroundImage: 'url('+ userData.avatar +')'}" style="width: 92rpx;height: 92rpx;border: 4rpx solid white;position: absolute;top: 28rpx;left: 28rpx">
                	<view v-if="false" class="cu-tag badge">999</view>
                </view>
                <!--用户信息-->
                <view class="text-14 text-white full-width">
                    <view style="position: absolute;top: 38rpx;left: 144rpx;color: rgba(255, 255, 255, 0.8)">{{userData.name}}</view>
                    <view style="position: absolute;top: 68rpx;left: 144rpx">书币余额<span class="text-24" style="color: rgba(255, 251, 18, 1);margin-right: 4rpx;margin-left: 16rpx">{{ userData.over }}</span>书币</view>
                </view>
                <!--中奖纪录按钮-->
                <view style="position: absolute;top: 0;right: 28rpx">
                    <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                    	:src="baseConfig.zjjl" style="width: 84rpx"></image>
                </view>
            </view>

            <!--书币文字图片-->
            <view style="position: relative;top: 72rpx">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="72"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
                		:shape="['square', 'circle'][0]" :src="baseConfig.bt" bgColor="rgba(0, 0, 0, 1)">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </view>

            <!--剩余抽奖次数-->
            <view style="position: relative;top: 104rpx;color: rgba(255, 255, 255, 1)" class="text-16">
                今日剩余抽奖次数<span style="color: rgba(255, 251, 18, 1)">{{ userData.num }}</span>次
            </view>

            <!--转盘-->
            <view class="main" style="padding-top: 150rpx;">
                <view :style="{backgroundImage: 'url('+ baseConfig.lotteryBg +')'}" class="margin-center round"
                      style="position: relative;width: 600rpx;height: 600rpx;background-size: cover;">
                    <view :animation="animationData" class="block"
                          style="position: absolute;left: 0;top: 0;z-index: 1;width: 600rpx;height: 600rpx;border-radius: inherit;">
<!--                        <view style="position: absolute;left: 0;top: 0;width: inherit;height: inherit;z-index: 99;">-->
<!--                            &lt;!&ndash;线条颜色&ndash;&gt;-->
<!--                            <view v-for="(item,index) in list"-->
<!--                                  :key="index" :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"-->
<!--                                  style="position: absolute;left: 300rpx;top: 0;width: 3rpx;height: 300rpx;-->
<!--                            background-color: red;overflow: hidden;-webkit-transform-origin: 50% 300rpx;transform-origin: 50% 300rpx;"></view>-->
<!--                        </view>-->
                        <view style="position: absolute;left: 0;top: 0;width: inherit;height: inherit;z-index: 9999;">
                            <view v-for="(iteml,index) in list"
                                  :key="index"
                                  :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;">
                                <view :style="'transform:rotate('+(index )+')'"
                                      class="margin-center text-center flex align-center"
                                      style="position: relative;padding-top: 46rpx;-webkit-transform-origin: 50% 300rpx;
                                      transform-origin: 50% 300rpx;flex-direction: column;">
                                    <!--文字颜色-->
                                    <text style="font-size: 32rpx;color: greenyellow;">{{ iteml.name }}</text>
                                    <image :src="baseConfig.baseSrc" style="width: 50rpx;height:50rpx"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!--抽奖按钮-->
                    <view id="wx" :class="btnDisabled" @tap="playReward">
                        <button style="position: absolute;left: 260rpx;top: 280rpx;z-index: 3">
                            <m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]"
                                     :showLoading="false" :src="baseConfig.lotteryBtn"
                                     bgColor="rgba(0, 0, 0, 1)"
                                     bgColorError="rgba(0, 0, 0, 1)" duration="0"
                                     height="50">
                                <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
                            </m-image>
                        </button>
                    </view>
                </view>


            </view>
<!--            <m-notice-bar :autoplay="true" :duration="2000" :isCircular="true" :list="[1,12321312321,213123123]" :show="true"-->
<!--                          :speed="160" :type="['success', 'error', 'primary', 'info', 'warning'][0]" bgColor=""-->
<!--                          borderRadius="10" style="position: relative;z-index: 3;"-->
<!--                          color="black" mode="vertical">-->
<!--            </m-notice-bar>-->
        </view>
        <m-modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="false" :showContent="true"
                 :showTitle="false" :status.sync="modalStatus"
                 :titleSize="40" bgColor="white" closeColor="black" desc="这是描述" descColor="#999d9c" modalTop="0rpx"
                 padding="20" radius="30rpx" title="这是标题" titleColor="black" width="90vw">
            <view class="text-center margin-top-xxl">
                <view>
                    <m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]" :showLoading="false"
                             :src="baseConfig.baseSrc"
                             bgColor="rgba(0, 0, 0, 1)"
                             bgColorError="rgba(0, 0, 0, 1)" duration="0" height="300">
                        <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
                    </m-image>
                </view>
                <view class="flex justify-around margin-top-xl">
                    <m-button :customStyle="{fontSize: '14px'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
                              :ripple="true" :shape="['square', 'circle'][1]"
                              :size="['default', 'medium', 'mini'][1]" :type="['default', 'primary', 'error', 'warning', 'success'][2]"
                              class="text-white" style="" @click="modalStatus = false">
                        <view v-if="false" class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx"></view>
                        确认
                    </m-button>
                    <m-button :customStyle="{fontSize: '14px'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
                              :ripple="true" :shape="['square', 'circle'][1]"
                              :size="['default', 'medium', 'mini'][1]" :type="['default', 'primary', 'error', 'warning', 'success'][1]"
                              class="text-white" style="" @click="modalStatus = false">
                        <view v-if="false" class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx"></view>
                        取消
                    </m-button>
                </view>
            </view>
        </m-modal>


    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonGet } from '@/api'

@Component({})
export default class extends Vue {

    baseConfig: any = {
        zjjl: '/static/images/zjjl.png',
        bt: '/static/images/bt.png',

        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
        bg: '/static/images/bg.png',
        lotteryBg: '/static/images/zpbg.png',
        lotteryBtn: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
    }

    list: any = [
        {
            name: '5折',
            value: '5',
            img: 'icondazhe text-danger',
        },
        {
            name: '6折',
            value: '6',
            img: 'icondazhe text-danger',
        },
        {
            name: '7折',
            value: '7',
            img: 'icondazhe text-danger',
        },
        {
            name: '8折',
            value: '8',
            img: 'icondazhe text-danger',
        },
        {
            name: '9折',
            value: '9',
            img: 'icondazhe text-danger',
        },
        {
            name: '感谢参与',
            value: '10',
            img: 'iconfangqi1 text-master',
        },
    ]

    userData: any = {
        avatar: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
        over: '3400',
        name: '忽而个规格',
        num: 5,
    }

    modalStatus: boolean = false
    width: number = 0
    runDeg: number = 0
    animationData: any = {}
    btnDisabled: string = ''

    async onLoad () {
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
        const duration = 2000 // 动画时间
        const index = 3 // 抽到礼物的索引
        this.animation(index, duration)

        setTimeout(() => {
            // 抽奖结束
            this.modalStatus = true
            this.btnDisabled = ''
        }, duration)
    }
}
</script>

<style>
#wx button {
    border: 0 !important;
    padding: 0 !important;
    line-height: 0 !important;
}

#wx button:after {
    border: 0 !important;
    padding: 0 !important;
    line-height: 0 !important;
}
</style>
