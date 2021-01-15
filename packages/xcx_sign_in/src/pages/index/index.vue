<template>
    <view class="u-skeleton container">
        <!--用户信息-->
        <view class="user ">
            <view class="cu-avatar u-skeleton-circle fl"
                  :style="{backgroundImage: 'url('+ baseConfig.baseSrc +')'}">
                <view v-if="false" class="cu-tag badge">999</view>
            </view>
            <view v-if="config.continuous" class="fl main_title u-skeleton-rect">
                <view class="title">
                    已连续签到<span class="title_text">{{config.sign_in_nums}}</span>天
                </view>
                <view class="sub_title">
                    有<span class="sub_title_text">{{config.reissue_nums}}</span>次补签机会
                </view>
            </view>
            <view class="fr balance u-skeleton-rect" @click="goRecord">
                <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                	:src="baseConfig.shubi1" class="img"></image>
                <text class="text">{{config.balance}}</text>
            </view>
        </view>
        <!--签到文字图片-->
        <view class="u-skeleton-rect text_img" style="width: 636rpx;height: 72rpx">
            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" width="636"
            		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
            		:shape="['square', 'circle'][0]" :src="baseConfig.text" bgColor="rgba(0, 0, 0, 1)">
            	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
            </m-image>
        </view>
        <!--签到-->
        <view class="sign_container">
            <view class="sign u-skeleton-fillet">
                <!--签到头部-->
                <view class="flex justify-between">
                    <view class="sign_left">
                        <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                        	:src="baseConfig.libao" class="sign_left_img"></image>
                        <text class="sign_left_text ">
                            连续签到送大礼
                        </text>
                    </view>
                    <view class="sign_right" @click="goRecord">
                        <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" width="144"
                        		:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                        		:shape="['square', 'circle'][0]" :src="baseConfig.qdjl" bgColor="rgba(0, 0, 0, 1)">
                        	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                        </m-image>
                    </view>
                </view>
                <!--签到列表-->
                <view class="flex justify-between flex-wrap sign_list">
                    <view @click="signIn(item.status)" v-if="index < 6" v-for="(item, index) in signInStatusLists" :key="index"
                          :style="{background: item.status != 1 ? '#f7f5f5': '#FF582E'}" class="sign_list_item ">
                        <view class="sign_list_item_name"
                              :style="{color: item.status == 0 || item.status == 2 ? '#4D1B0F': item.status == 3 ? '#FE4111' : '#FFFFFF', fontWeight: item.status == 3 ? 'bolder' : ''}">{{item.name}}</view>
                        <image class="sign_list_item_img" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                        	:src="baseConfig.shubi2" style="width: 84rpx"></image>
                        <view class="sign_list_item_coin"
                              :style="{color: item.status != 1 ? '#999': '#FFD7CD'}">{{item.coin}}书币</view>
                    </view>
                    <view v-else class="sign_list_item_other">
                        <view class="fl sign_list_item_other_text">
                            <view class="sign_list_item_other_text_one">第七天</view>
                            <view class="sign_list_item_other_text_two">50书币</view>
                        </view>

                        <image class="fr sign_list_item_other_text_three" :src="baseConfig.qiandai"></image>
                    </view>
                </view>
                <!--签到按钮-->
                <view class="sign_btn" style="width: 634rpx;height: 100rpx">
                    <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                    	:src="baseConfig.btn" class="sign_btn_img" style=""></image>
                    <view class="sign_btn_shadow"></view>
                </view>
                <!--本周签到-->
                <view class="sign_balance">
                    本期签到累计获得: 320书币
                </view>
            </view>
        </view>
        <!--签到说明-->
        <view class="sign_explain">
            <view class="sign_explain_text u-skeleton-fillet">
                <view class="sign_explain_title">签到说明</view>
                <view class="sign_explain_con">
                    1、用户每日签到免费获取书币<br>
                    2、连续签到7天，可获得更多奖励<br>
                    3、本签到为累计签到，用户若漏签可通过看视频补签，用户每个周期（7天），拥有2次补签机会<br>
                </view>
            </view>
        </view>

        <!--留白-->
        <view class="empty"></view>
        <!--骨架屏-->
        <m-skeleton bg-color="rgb(250, 250, 250)" :loading="loading" :animation="true" el-color="#e5e5e5" :border-radius="10"></m-skeleton>

        <m-modal :closeShow="false" bgColor="transparent" :closeSize="40" :descSize="30" padding="0" radius="30rpx" :maskClosable="false"
                 :status.sync="modalStatus" :showTitle="false" title="" desc="" modalTop="200rpx" :titleSize="40"
                 :showContent="false" descColor="#999d9c" titleColor="black" width="660rpx">
            <view style="position: relative;left: 0;top: -180rpx;z-index: 889;">
                <image src="https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/zhuanpan/gyxz.png" style="width: 660rpx;height: 660rpx;animation: rotate 4s linear 0s infinite;"></image>
            </view>

            <view style="position: relative;margin-top: -580rpx;z-index: 900;display: block">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.cjbj" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;position: absolute;top: 0;left: 0" class="text-white">加载失败</view>
                </m-image>

                <view style="position: absolute;top: 160rpx;text-align: center;width: 100%;color: #B24A09;" class="text-30">
                    抽中
                </view>

                <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                	:src="baseConfig.ljbq_btn" style="position: absolute;top: 260rpx;left: 15%;width: 70%;height: 196rpx;">
                </image>

                <view @click="getAward" style="position: absolute;bottom: 30rpx;text-align: center;width: 100%;text-decoration: underline;color: rgba(178, 74, 9, 1)">
                    直接领取
                </view>
<!--                <view v-else @click="giveUp" style="position: absolute;bottom: 30rpx;text-align: center;width: 100%;text-decoration: underline;color: rgba(178, 74, 9, 1)">-->
<!--                    放弃领取-->
<!--                </view>-->
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
import { commonPost, commonGet } from '@/api'

@Component({})
export default class index extends Vue {
    baseConfig: any = {
        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
        bg: '/static/images/bg.png',
        btn: '/static/images/btn.png',
        btn2: '/static/images/btn2.png',
        buqiank: '/static/images/buqiank.png',
        guang: '/static/images/guang.png',
        libao: '/static/images/libao.png',
        ljbq_btn: '/static/images/ljbq_btn.png',
        ljfb_btn: '/static/images/ljfb_btn.png',
        qiandai: '/static/images/qiandai.png',
        shubi1: '/static/images/shubi1.png',
        shubi2: '/static/images/shubi2.png',
        text: '/static/images/text.png',
        avatar: '/static/images/avatar.png',
        qdjl: '/static/images/qdjl.png',

        cjbj: '/static/images/buqiank.png',
    }

    loading: boolean = true
    modalStatus: boolean = false

    config: any = {}
    signInStatusLists: any = []

    rewardedVideoAd: any = null
    interstitialAd: any = null

    created () {
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
                    // 正常播放结束，可以下发游戏奖励
                    this.adStatus = true
                    this.getAward()
                } else {
                    this.$mio.mioRoot.showToast('视频未观看完成')
                    // 播放中途退出，不下发游戏奖励
                }
            })

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

        this.getData()
    }

    // 获取初始数据
    async getData () {
        const { data, code } = await commonGet('/getSignInData')
        console.log(data)
        if (code == 200) {
            this.loading = false
            const { config, signInStatusLists } = data
            this.config = config
            this.signInStatusLists = signInStatusLists
        }
    }

    // 签到
    signIn (state) {
    	if (state == 3) {
    	    console.log('补签')
            return
    	}
        if (state == 0) {
            console.log('签到')
        }
    }

    goRecord () {
        this.$mio.mioRoot.push('/pages/index/record')
    }
}
</script>

<style lang="scss">
.container {
    overflow-x: hidden;
    .user {
        position: relative;background: url(/static/images/bg.png);height: 824rpx;background-size: 100% 100%;padding: 26rpx 30rpx 0 30rpx;
        .cu-avatar {width: 112rpx;height: 112rpx;border: 4rpx solid white;border-radius: 50%}
        .main_title{margin-left: 28rpx;line-height: 112rpx;margin-top: 16rpx;
            .title {
                font-size: 16px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 16px;
                .title_text{
                    color: rgba(255, 251, 18, 1);margin-top: 10rpx;
                }
            }
            .sub_title{
                margin-top: 20rpx;
                font-size: 14px;
                font-weight: 400;
                color: rgba(255, 235, 230, 1);
                line-height: 14px;
                .sub_title_text{
                    color: rgba(255, 251, 18, 1);
                }
            }
        }
        .balance{
            padding: 24rpx 28rpx;
            width: auto;
            height: 96rpx;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.62);
            .img {width: 48rpx}
            .text{font-size: 20px;color: white;margin-left: 12rpx;vertical-align: super}
        }
    }
    .text_img {position: relative;left: 50%;text-align: center;width: 100%;margin-left: -318rpx;margin-top: -630rpx}
    .sign_container{
        position: relative;left: 50%;text-align: center;width: 100%;margin-left: -346rpx;margin-top: 50rpx;
        .sign {
            width: 692rpx;height: 736rpx;border-radius: 16rpx;background: #fff;padding: 32rpx 30rpx 32rpx 26rpx;
            .sign_left {
                .sign_left_img{width: 32rpx}
                .sign_left_text{margin-left: 12rpx;font-size: 16px;font-weight: bolder;color: #4D1C0F;line-height: 16px;}
            }
            .sign_right {}
            .sign_list{
                margin-top: 32rpx;
                .sign_list_item{
                    margin-bottom: 24rpx;width: 140rpx;height: 188rpx;background: #FF582E;border-radius: 12rpx;
                    .sign_list_item_name{font-size: 14px;color: white;margin-top: 20rpx}
                    .sign_list_item_img{}
                    .sign_list_item_coin{font-size: 14px;color: #FFD7CD;margin-top: -10rpx}
                }
                .sign_list_item_other{
                    width: 306rpx;height: 188rpx;background: #F7F5F5;border-radius: 12rpx;
                    .sign_list_item_other_text {
                        margin-left: 32rpx;margin-top: 20rpx;
                        .sign_list_item_other_text_one{font-size: 14px;color: #4D1B0F}
                        .sign_list_item_other_text_two{font-size: 14px;color: #808080;margin-top: 16rpx}
                    }
                    .sign_list_item_other_text_three{width: 121rpx;height: 136rpx;margin-right: 24rpx;margin-top: 32rpx}
                }
            }
            .sign_btn{
                margin-top: 10rpx;
                .sign_btn_img{width: 634rpx;z-index: 9}
                .sign_btn_shadow{margin-left: 34rpx;margin-top: -80rpx;width: 582rpx;height: 82rpx;z-index: 1;background: linear-gradient(98deg, #FE4111 0%, #FF7627 100%);border-radius: 50rpx;opacity: 0.77;filter: blur(10px);}
            }
            .sign_balance{
                margin-top: 24rpx;color: #999999;letter-spacing: 1px;
            }
        }
    }
    .sign_explain{
        position: relative;left: 50%;width: 100%;margin-left: -346rpx;text-align: left;
        .sign_explain_text{width: 692rpx;height: 370rpx;background: #fff;border-radius: 16rpx;margin-top: 28rpx;padding: 32rpx 28rpx 28rpx 28rpx}
        .sign_explain_title{font-weight: bolder;color: #4D0F0F;font-size: 16px}
        .sign_explain_con{font-size: 16px;font-weight: 400;color: #4D1B0F;line-height: 48rpx;margin-top: 28rpx}
    }
    .empty{height: 28rpx;width: 100%}
}
</style>
