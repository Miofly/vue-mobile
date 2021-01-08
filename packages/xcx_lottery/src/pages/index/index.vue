<template>
    <view style="overflow-x: hidden;overflow-y: scroll" class="text-center full-width-height">
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
            <view class="main" style="padding-top: 150rpx;position: relative">
                <!--抽奖背景-->
                <view :animation="animationData" :style="{backgroundImage: 'url('+ baseConfig.lotteryBg +')'}" class="margin-center round"
                      style="position: relative;width: 600rpx;height: 600rpx;background-size: cover;z-index: 1">
                    <view class="block"
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
                </view>
                <view id="wx" :class="btnDisabled" @tap="playReward" style="position: absolute;left: 250rpx;top: 290rpx;z-index: 3">
                    <m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]"
                             :showLoading="false" :src="baseConfig.btn"
                              duration="0"
                             height="276">
                        <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
                    </m-image>
                </view>
<!--                <view :style="{backgroundImage: 'url('+ baseConfig.lotteryBg +')'}" class="margin-center round"-->
<!--                      style="position: absolute;width: 700rpx;height: 700rpx;background-size: cover;top: 100rpx;left: 30rpx;z-index: 2">-->
<!--                </view>-->
            </view>
            <m-column-notice :autoplay="true" :duration="2000" :isCircular="true" :list="['恭喜用户 ***** 抽中VIP碎片', '恭喜用户 ***** 抽中50书币', '恭喜用户 ***** 抽中888书币', '恭喜用户 ***** 抽中30书币', '恭喜用户 ***** 抽中50书币', '恭喜用户 ***** 抽中888书币', '恭喜用户 ***** 抽中30书币']" :show="true"
                          :speed="160" bgColor="transparent"
                          borderRadius="10" style="position: relative;z-index: 3;"
                          color="rgba(255, 245, 150, 1)" mode="vertical">
            </m-column-notice>

            <!--我的奖品-->
            <view style="position: relative" class="margin-top">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="336"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
                		:shape="['square', 'circle'][0]" :src="baseConfig.wdjp" bgColor="rgba(0, 0, 0, 1)">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
                <view style="position: absolute;left: 112rpx;top: 280rpx">
                    <line-progress :percent="(userData.phoneNum/30)*100" percentColor="black"
                                   borderStyle="0 solid red"
                                   percentSize="15px" :striped="true" :stripedActive="true" inactiveColor="rgba(255, 214, 180, 1)"
                                   :showPercent="true">
                    </line-progress>
                    <text style="margin-left: 8rpx;color: rgba(231, 79, 0, 1);vertical-align: top"><span style="color: rgba(231, 79, 0, 1);" class="text-14 text-bold">{{userData.phoneNum}}</span><span style="font-size: 24rpx;transform: scale(0.8)">/30</span></text>
                </view>

                <view style="position: absolute;left: 456rpx;top: 280rpx">
                    <line-progress :percent="(userData.vipNum/10)*100" percentColor="black"
                                   borderStyle="0 solid red"
                                   percentSize="15px" :striped="true" :stripedActive="true" inactiveColor="rgba(255, 214, 180, 1)"
                                   :showPercent="true">
                    </line-progress>
                    <text style="margin-left: 8rpx;color: rgba(231, 79, 0, 1);vertical-align: top"><span style="" class="text-14 text-bold">{{userData.vipNum}}</span><span style="font-size: 24rpx;transform: scale(0.8);color: rgba(231, 79, 0, 1);">/10</span></text>
                </view>
            </view>

            <!--中奖晒单-->
            <view style="background: rgba(255, 243, 237, 1);width: 690rpx;height: 300px;margin-top: 56rpx;position: relative;padding-bottom: 32rpx;border-radius: 16rpx"
                  class="text-center margin-center">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="80"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="position: absolute;top: -16rpx"
                		:shape="['square', 'circle'][0]" :src="baseConfig.zjsd" bgColor="rgba(0, 0, 0, 1)">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
                <view class="margin-center" style="height: 150rpx;width: 690rpx;position: relative;top: 96rpx;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.2) 100%);
            box-shadow: 1px 1px 2px 0px rgba(255, 255, 255, 0.23);border-radius: 8px;">
                    <!--头像-->
                    <view class="cu-avatar" :class="[false ? 'radius' : 'round']"
                          :style="{backgroundImage: 'url('+ userData.avatar +')'}" style="width: 68rpx;height: 68rpx;position: absolute;top: 28rpx;left: 32rpx">
                        <view v-if="false" class="cu-tag badge">999</view>
                    </view>
                    <!--用户信息-->
                    <view class=" full-width" style="color: rgba(73, 54, 43, 1)">
                        <view style="position: absolute;top: 20rpx;left: 124rpx;color: rgba(73, 54, 43, 1)" class="text-16 text-bold">{{userData.name}}</view>
                        <view style="position: absolute;top: 68rpx;left: 124rpx">

                            <text class="text-12" style="color: rgba(73, 54, 43, 0.5);">合肥市包河区宝文中心</text>
                        </view>
                    </view>
                    <!--中奖纪录按钮-->
                    <view style="position: absolute;top: 0;right: 28rpx">
                        <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                               :src="baseConfig.zjjl" style="width: 84rpx"></image>
                    </view>
                </view>
            </view>
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
import mColumnNotice from '../../components/m-column-notice/m-column-notice.vue'
import lineProgress from '../../components/progress/line-progress.vue'

@Component({
    components: {
        mColumnNotice,
        lineProgress
    },
})
export default class extends Vue {

    baseConfig: any = {
        zjjl: '/static/images/zjjl.png',
        bt: '/static/images/bt.png',
        btn: '/static/images/btn.png',
        wdjp: '/static/images/wdjp.png',
        zjsd: '/static/images/zjsd.png',
        wfsm: '/static/images/wfsm.png',

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
        phoneNum: 0,
        vipNum: 0,
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
        const index = 4 // 抽到礼物的索引
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
