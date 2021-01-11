<template>
    <view style="overflow-x: hidden;overflow-y: scroll;padding-bottom: 30px" class="text-center fulls-width-height" :style="{background: 'url('+ baseConfig.bg +')'}">
        <view style="height: auto;" class="text-center full-width">
            <!-- 背景 -->
<!--            <m-image :borderRadius="10" :shape="['square', 'circle'][0]"-->
<!--                     :showLoading="false" :src=""-->
<!--                     bgColor="rgba(0, 0, 0, 1)"-->
<!--                     bgColorError="rgba(0, 0, 0, 1)"-->
<!--                     duration="0" style="width: 100vw;height: 100%;position: absolute;z-index: 0;left: 0">-->
<!--                <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>-->
<!--            </m-image>-->

            <view class="margin-center" style="height: 150rpx;width: 690rpx;position: relative;top: 16rpx;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.2) 100%);
            box-shadow: 1px 1px 2px 0px rgba(255, 255, 255, 0.23);border-radius: 8px;">
                <!--头像-->
                <view class="cu-avatar" :class="[false ? 'radius' : 'round']"
                	  :style="{backgroundImage: 'url('+ user.headimgurl +')'}" style="width: 92rpx;height: 92rpx;border: 4rpx solid white;position: absolute;top: 28rpx;left: 28rpx">
                	<view v-if="false" class="cu-tag badge">999</view>
                </view>
                <!--用户信息-->
                <view class="text-14 text-white full-width">
                    <view style="position: absolute;top: 38rpx;left: 144rpx;color: rgba(255, 255, 255, 0.8)">{{user.nickname}}</view>
                    <view style="position: absolute;top: 68rpx;left: 144rpx">书币余额<span class="text-24" style="color: rgba(255, 251, 18, 1);margin-right: 4rpx;margin-left: 16rpx">{{ user.money }}</span>书币</view>
                </view>
                <!--中奖纪录按钮-->
                <view style="position: absolute;top: 0;right: 28rpx" @click="goRecord">
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
                今日剩余抽奖次数<span style="color: rgba(255, 251, 18, 1)">{{ unable }}</span>次
            </view>

            <!--转盘-->
            <view class="main" style="padding-top: 150rpx;position: relative;margin-top: 50rpx">
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
                            <view v-for="(iteml,index) in awards"
                                  :key="index"
                                  :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;">
                                <view :style="'transform:rotate('+(index )+')'"
                                      class="margin-center text-center flex align-center"
                                      style="position: relative;padding-top: 25rpx;-webkit-transform-origin: 50% 300rpx;
                                      transform-origin: 50% 300rpx;flex-direction: column;">
                                    <!--文字颜色-->
                                    <text style="font-size: 32rpx;color: rgba(255, 48, 45, 1);" class="text-bold">{{ iteml.name }}</text>
                                    <image :src="`/static/images/${iteml.icon}.png`" style="width: 92rpx;height: 92rpx;margin-top: 10rpx"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <!--抽奖按钮-->
                <view id="wx" :class="btnDisabled" @tap="playReward" style="position: absolute;left: 260rpx;top: 290rpx;z-index: 3">
                    <m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]"
                             :showLoading="false" :src="baseConfig.btn"
                              duration="0"
                             height="276">
                        <view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>
                    </m-image>
                </view>
                <view :style="{backgroundImage: 'url('+ baseConfig.zpdx +')'}" class="margin-center round"
                      style="position: absolute;width: 780rpx;height: 780rpx;background-size: cover;top: 60rpx;left: -10rpx;z-index:2">
                </view>
            </view>

            <view style="position: relative;z-index: 3;margin-top: 80rpx">
                <m-column-notice :autoplay="true" :duration="2000" :isCircular="true" :list="['恭喜用户 ***** 抽中VIP碎片', '恭喜用户 ***** 抽中50书币', '恭喜用户 ***** 抽中888书币', '恭喜用户 ***** 抽中30书币', '恭喜用户 ***** 抽中50书币', '恭喜用户 ***** 抽中888书币', '恭喜用户 ***** 抽中30书币']" :show="true"
                                 :speed="160" bgColor="transparent"
                                 borderRadius="10"
                                 color="rgba(255, 245, 150, 1)" mode="vertical">
                </m-column-notice>
            </view>

            <!--我的奖品-->
            <view style="position: relative;width: 100%;margin-top: 40rpx" class="margin-center text-center">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="336"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
                		:shape="['square', 'circle'][0]" :src="baseConfig.wdjp" bgColor="rgba(0, 0, 0, 1)">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
                <!--手机进度-->
                <view style="position: absolute;left: 112rpx;top: 280rpx">
                    <line-progress :percent="(chip.iphone_chip/30)*100" percentColor="black"
                                   borderStyle="0 solid red"
                                   percentSize="15px" :striped="true" :stripedActive="true" inactiveColor="rgba(255, 214, 180, 1)"
                                   :showPercent="true">
                    </line-progress>
                    <text style="margin-left: 8rpx;color: rgba(231, 79, 0, 1);vertical-align: top"><span style="color: rgba(231, 79, 0, 1);" class="text-14 text-bold">{{chip.iphone_chip}}</span><span style="font-size: 24rpx;transform: scale(0.8)">/30</span></text>
                </view>
                <!--vip进度-->
                <view style="position: absolute;left: 456rpx;top: 280rpx">
                    <line-progress :percent="(chip.vip_chip/10)*100" percentColor="black"
                                   borderStyle="0 solid red"
                                   percentSize="15px" :striped="true" :stripedActive="true" inactiveColor="rgba(255, 214, 180, 1)"
                                   :showPercent="true">
                    </line-progress>
                    <text style="margin-left: 8rpx;color: rgba(231, 79, 0, 1);vertical-align: top"><span style="" class="text-14 text-bold">{{chip.vip_chip}}</span><span style="font-size: 24rpx;transform: scale(0.8);color: rgba(231, 79, 0, 1);">/10</span></text>
                </view>
            </view>

            <!--中奖晒单-->
            <view style="background: rgba(255, 243, 237, 1);width: 690rpx;height: 578rpx;margin-top: 56rpx;position: relative;
            padding-bottom: 32rpx;border-radius: 16rpx"
                  class="text-center margin-center">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="80"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="position: absolute;top: -16rpx;left: 106rpx"
                		:shape="['square', 'circle'][0]" :src="baseConfig.zjsd" bgColor="rgba(0, 0, 0, 1)">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
                <view class="margin-center" style="height: 150rpx;width: 690rpx;position: relative;top: 96rpx;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.2) 100%);
            box-shadow: 1px 1px 2px 0px rgba(255, 255, 255, 0.23);border-radius: 8px;">
                    <!--头像-->
                    <view class="cu-avatar" :class="[false ? 'radius' : 'round']"
                          :style="{backgroundImage: 'url('+ comment.headimgurl +')'}" style="width: 68rpx;height: 68rpx;position: absolute;top: 28rpx;left: 32rpx">
                        <view v-if="false" class="cu-tag badge">999</view>
                    </view>
                    <!--中奖用户信息-->
                    <view class=" full-width" style="color: rgba(73, 54, 43, 1)">
                        <view style="position: absolute;top: 20rpx;left: 124rpx;color: rgba(73, 54, 43, 1)" class="text-16 text-bold">{{comment.nickname}}</view>
                        <view style="position: absolute;top: 68rpx;left: 124rpx">

                            <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                            	:src="baseConfig.dingwei" style="width: 18rpx"></image>
                            <text class="text-12" style="color: rgba(73, 54, 43, 0.5);margin-left: 8rpx">{{ comment.location }}</text>
                        </view>
                    </view>
                    <!--时间-->
                    <view style="position: absolute;top: 24rpx;right: 32rpx;color: rgba(73, 54, 43, 0.5)">
                        {{ comment.create_at }}
                    </view>
                </view>
                <!--文字描述-->
                <view class="text-16 line-two" style="letter-spacing: 0px;width: 628rpx;text-align: left;
                color: rgba(73, 54, 43, 1);line-height: 48rpx;position: absolute;top: 220rpx;left: 32rpx">
                    {{comment.content}}
                </view>
                <!--图片信息-->
<!--                <view v-if="comment.pic.length !== 2" class="flex justify-between" style="width: 628rpx;position: absolute;top: 340rpx;left: 32rpx">-->
<!--                    <view v-for="(item, index) in 3" :key="index">-->
<!--                        <m-image duration="0" :showLoading="false" :borderRadius="0" bgColorError="rgba(0, 0, 0, 1)"-->
<!--                                 style="width: 194rpx;height: 140rpx"-->
<!--                        		:shape="['square', 'circle'][0]" :src="baseConfig.baseSrc" bgColor="rgba(0, 0, 0, 1)">-->
<!--                        	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--                        </m-image>-->
<!--                    </view>-->
<!--                </view>-->
<!--                <view v-else class="flex justify-start" style="width: 628rpx;position: absolute;top: 340rpx;left: 32rpx">-->
<!--                    <view v-for="(item, index) in 2" :key="index" :style="{marginLeft: index==1 ? 24 + 'rpx' : 0}">-->
<!--                        <m-image duration="0" :showLoading="false" :borderRadius="0" bgColorError="rgba(0, 0, 0, 1)"-->
<!--                                 style="width: 194rpx;height: 140rpx"-->
<!--                                 :shape="['square', 'circle'][0]" :src="baseConfig.baseSrc" bgColor="rgba(0, 0, 0, 1)">-->
<!--                            <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--                        </m-image>-->
<!--                    </view>-->
<!--                </view>-->
                <!--查看更多-->
                <view @click="goMore">
                    <text style="position: absolute;top: 510rpx;left: 35%"></text>
                    <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="30"
                    		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="position: absolute;top: 515rpx;left: 270rpx"
                    		:shape="['square', 'circle'][0]" :src="baseConfig.open" bgColor="rgba(0, 0, 0, 1)">
                    	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                    </m-image>
                </view>
            </view>

            <!--规则-->
            <view style="background: rgba(255, 243, 237, 1);width: 690rpx;height: auto;margin-top: 56rpx;position: relative;padding-bottom: 32rpx;border-radius: 16rpx"
                  class="text-center margin-center">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="80"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" style="position: absolute;top: -16rpx;left: 106rpx;"
                         :shape="['square', 'circle'][0]" :src="baseConfig.wfsm" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
                <view style="margin-top: 86rpx;padding: 86rpx 32rpx 32rpx 32rpx">
                    1、活动时间：2021.01.21-2022.09.09
                    2、1元=100书币，书币属于虚拟商品，一经购买不得退换
                    3、充值赠送的书币存在有效期
                    4、充值获得的书币仅在本公司书城使用
                </view>
            </view>
        </view>

        <m-modal :closeShow="false" bgColor="transparent" :closeSize="40" :descSize="30" padding="0" radius="30rpx" :maskClosable="false"
                 :status.sync="modalStatus" :showTitle="false" title="" desc="" modalTop="300rpx" :titleSize="40"
                 :showContent="false" descColor="#999d9c" titleColor="black" width="660rpx">
            <view style="position: relative;left: 0;top: -150rpx;z-index: 889;">
<!--                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="660"-->
<!--                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"-->
<!--                         style=""-->
<!--                         :shape="['square', 'circle'][0]" src="/static/images/gyxz.png" bgColor="rgba(0, 0, 0, 1)">-->
<!--                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--                </m-image>-->
                <image src="/static/images/gyxz.png" style="width: 660rpx;height: 660rpx;animation: rotate 4s linear 0s infinite;"></image>
            </view>

        	<view style="position: relative;margin-top: -550rpx;z-index: 900;display: block">
        		<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
        		         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style=""
        		         :shape="['square', 'circle'][0]" :src="baseConfig.cjbj" bgColor="rgba(0, 0, 0, 1)">
        			<view slot="error" style="font-size: 24rpx;position: absolute;top: 0;left: 0" class="text-white">加载失败</view>
        		</m-image>

                <view style="position: absolute;top: 160rpx;text-align: center;width: 100%;color: #B24A09;font-weight: bold" class="text-30">
                    21213
                </view>


                <m-image @click="getAward" duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="196"
                		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
                		:shape="['square', 'circle'][0]" :src="baseConfig.jlOne"
                         style="position: absolute;top: 260rpx;left: 10%;width: 80%;height: 196rpx;">
                	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>

                <view @click="getAward" style="position: absolute;bottom: 30rpx;text-align: center;width: 100%;text-decoration: underline;color: rgba(178, 74, 9, 1)">
                    直接领取
                </view>
        	</view>
        	<view style="background-color: transparent!important;position: relative">
        		<image @click="statusTwo=false" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
        		       :src="baseConfig.closeImg" style="width: 76rpx;margin-top: 100rpx"></image>
        	</view>
        </m-modal>

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import mColumnNotice from '../../components/m-column-notice/m-column-notice.vue'
import mImage from '../../components/m-image/m-image.vue'
import mModal from '../../components/m-modal/m-modal.vue'
import lineProgress from '../../components/progress/line-progress.vue'
import {
    commonGet, commonPost
} from '@/api'
@Component({
    components: {
        // #ifdef H5
        mColumnNotice,
        lineProgress,
        mImage,
        mModal
        // #endif
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
        dingwei: '/static/images/dingweei.png',
        open: '/static/images/open.png',
        zpdx: '/static/images/zpdx.gif',
        gdx: '/static/images/gdx.gif',
        cjbj: '/static/images/gxbj.png',
        jlOne: '/static/images/jlOne.png',
        jlTwo: '/static/images/jlTwo.png',

        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
        bg: '/static/images/bg.png',
        lotteryBg: '/static/images/zpbg.png',
        lotteryBtn: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
    }

    chip: any = {}
    comment: any = {}
    awards: any = {}
    user: any = {}
    unable: number = 0
    winningIndex: number = 0

    modalStatus: boolean = false
    width: number = 0
    runDeg: number = 0
    animationData: any = {}
    btnDisabled: string = ''

    async created () {
        const data = await commonGet('/wmain.html?uuid=63&page=1&number=1')
        if (data.code == 200) {
            const { awards, chip, comment, unable, user } = data.data
            this.chip = chip
            this.comment = comment
            this.awards = awards
            this.unable = unable
            this.user = user
            // 获取奖品列表
            this.width = 360 / this.awards.length
        }

        setTimeout(async () => {
            const newData = await commonGet('/fetchRecord.html?uuid=63')
            this.winningIndex = newData.data
        }, 1000)

    }

    goRecord () {
    	this.$mio.mioRoot.push('/pages/index/record')
    }

    goMore () {
        this.$mio.mioRoot.push('/pages/index/more')
    }

    animation (index, duration) {
        // var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
        const runNum = 4 // 旋转8周

        // 旋转角度
        this.runDeg = this.runDeg || 0
        this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - index * (360 / this.awards.length)) + 1
        // 创建动画
        const animationRun = uni.createAnimation({
            duration: '2000',
            timingFunction: 'ease'
        })
        animationRun.rotate(this.runDeg).step()
        this.animationData = animationRun.export()
        this.btnDisabled = 'notClick'
    }

    // 发起抽奖
    playReward () {
        const duration = 2000 // 动画时间
        this.animation(this.winningIndex, duration)

        setTimeout(() => {
            // 抽奖结束
            this.modalStatus = true
            this.btnDisabled = ''
        }, duration)
    }
}
</script>

<style>
@keyframes rotate {
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(359deg)
    }
}

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
