<template>
    <view class="u-skeleton container" v-if="ggkz">
        <!--用户信息-->
        <view class="user ">
            <view class="cu-avatar u-skeleton-circle fl"
                  :style="{backgroundImage: 'url('+ config.headimgurl +')'}">
                <view v-if="false" class="cu-tag badge">999</view>
            </view>
            <view class="fl main_title u-skeleton-rect">
                <view class="title">
                    共签到<span class="title_text">{{config.checkin_days}}</span>天
                </view>
                <view class="sub_title">
                    有<span class="sub_title_text">{{config.repair}}</span>次补签机会
                </view>
            </view>
            <view class="fr balance u-skeleton-rect" @click="goRecord">
                <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                	:src="baseConfig.shubi1" class="img"></image>
                <text class="text">{{config.money}}</text>
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
                    <view @click="signIn(item.model, item.day)" v-if="index < 6" v-for="(item, index) in signInStatusLists" :key="index"
                          :style="{background: item.model == 3 ? '#FF582E': '#f7f5f5'}" class="sign_list_item ">
                        <view v-if="item.model == 0 && item.day <= config.current_day" style="color: #4D1B0F" class="sign_list_item_name">
                            待签到
                        </view>
                        <view v-if="item.day > config.current_day" style="color: #4D1B0F" class="sign_list_item_name">
                            第{{ item.day }}天
                        </view>
                        <view v-if="item.model == 1" style="color: #4D1B0F" class="sign_list_item_name">
                            已错过
                        </view>
                        <view v-if="item.model == 2" style="color: #FE4111" class="sign_list_item_name text-bold">
                            点我补签
                        </view>
                        <view v-if="item.model == 3 && item.is_repair == 0" style="color: white" class="sign_list_item_name">
                            已签到
                        </view>
                        <image class="sign_list_item_img" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                        	:src="baseConfig.shubi2" style="width: 84rpx"></image>
                        <view class="sign_list_item_coin"
                              :style="{color: item.model == 3 ? '#FFD7CD': '#999'}">{{item.coin}}书币</view>
                    </view>
                    <view :style="{background: item.model == 3 ? '#FF582E': '#f7f5f5'}" @click="signIn(signInStatusLists[6].model, signInStatusLists[6].day)" v-else class="sign_list_item_other">
                        <view class="fl sign_list_item_other_text">
                            <view v-if="config.current_day != 7" class="sign_list_item_other_text_one">第7天</view>
                            <view v-else-if="config.current_day == 7 && signInStatusLists[6].model == 0" class="sign_list_item_other_text_one">待签到</view>
                            <view v-else-if="config.current_day == 7 && signInStatusLists[6].model == 3" style="color: white" class="sign_list_item_other_text_one">已签到</view>
                            <view :style="{color: item.model == 3 ? '#FFD7CD': '#999'}" class="sign_list_item_other_text_two">{{ signInStatusLists[6].coin }}书币</view>
                        </view>
                        <image class="fr sign_list_item_other_text_three" :src="baseConfig.qiandai"></image>
                    </view>
                </view>
                <!--签到按钮-->
                <view @click="sing_in_btn" class="sign_btn" style="width: 634rpx;height: 100rpx">
                    <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                    	:src="config.allow_option == 0 ? baseConfig.btn2 : baseConfig.btn" class="sign_btn_img" style=""></image>
                    <view :class="[config.allow_option == 0 ? 'sign_btn_shadow1' : 'sign_btn_shadow']"></view>
                </view>
                <!--本周签到-->
                <view class="sign_balance">
                    本期签到累计获得: {{ config.current_stage_coin }}书币
                </view>
            </view>
        </view>

        <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 28rpx"></ad>

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
        <!--动效-->
        <view class="dxyy"></view>
        <image @click="getGiftBefore" class="dx" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="width: 160rpx" :src="baseConfig.dx"></image>

        <m-modal :closeShow="false" bgColor="transparent" :closeSize="40" :descSize="30" padding="0" radius="30rpx" :maskClosable="false"
                 :status.sync="modalStatus" :showTitle="false" title="" desc="" modalTop="0" :titleSize="40"
                 :showContent="false" descColor="#999d9c" titleColor="black" width="660rpx">
            <view style="position: relative;left: 0;top: -180rpx;z-index: 889;">
                <image src="https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/zhuanpan/gyxz.png" style="width: 660rpx;height: 660rpx;animation: rotate 4s linear 0s infinite;"></image>
            </view>

            <view style="position: relative;margin-top: -580rpx;z-index: 900;display: block">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.zck" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;position: absolute;top: 0;left: 0" class="text-white">加载失败</view>
                </m-image>

<!--                <view style="position: absolute;top: 160rpx;text-align: center;width: 100%;color: #B24A09;" class="text-30">-->
<!--                    抽中-->
<!--                </view>-->

                <image @click="getVideo(0)" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                	:src="baseConfig.ljfb_btn" style="position: absolute;top: 300rpx;left: 15%;width: 70%;height: 196rpx;">
                </image>

                <view @click="signInFn(0)" style="position: absolute;bottom: 30rpx;text-align: center;width: 100%;text-decoration: underline;color: rgba(178, 74, 9, 1)">
                    放弃翻倍，直接领取
                </view>
<!--                <view v-else @click="giveUp" style="position: absolute;bottom: 30rpx;text-align: center;width: 100%;text-decoration: underline;color: rgba(178, 74, 9, 1)">-->
<!--                    放弃领取-->
<!--                </view>-->
            </view>
        </m-modal>

        <m-modal :closeShow="false" bgColor="transparent" :closeSize="40" :descSize="30" padding="0" radius="30rpx" :maskClosable="true"
                 :status.sync="modalStatusTwo" :showTitle="false" title="" desc="" modalTop="0" :titleSize="40"
                 :showContent="false" descColor="#999d9c" titleColor="black" width="660rpx">
            <view style="position: relative;left: 0;top: -180rpx;z-index: 889;" @click="modalStatusTwo = false">
                <image src="https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/zhuanpan/gyxz.png" style="width: 660rpx;height: 660rpx;animation: rotate 4s linear 0s infinite;"></image>
            </view>

            <view style="position: relative;margin-top: -580rpx;z-index: 900;display: block">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.bqs" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;position: absolute;top: 0;left: 0" class="text-white">加载失败</view>
                </m-image>

                <image @click="getVideo(1)" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                       :src="baseConfig.ljbq_btn" style="position: absolute;top: 300rpx;left: 15%;width: 70%;height: 196rpx;">
                </image>
            </view>
        </m-modal>

        <m-modal :closeShow="false" bgColor="transparent" :closeSize="40" :descSize="30" padding="0" radius="30rpx" :maskClosable="true"
                 :status.sync="modalStatusThree" :showTitle="false" title="" desc="" modalTop="0" :titleSize="40"
                 :showContent="false" descColor="#999d9c" titleColor="black" width="660rpx">
            <view style="position: relative;left: 0;top: -180rpx;z-index: 889;" @click="modalStatusTwo = false">
                <image src="https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/zhuanpan/gyxz.png" style="width: 660rpx;height: 660rpx;animation: rotate 4s linear 0s infinite;"></image>
            </view>

            <view style="position: relative;margin-top: -580rpx;z-index: 900;display: block">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.qtk" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;position: absolute;top: 0;left: 0" class="text-white">加载失败</view>
                </m-image>

                <image @click="getVideo(2)" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                       :src="baseConfig.ljlq" style="position: absolute;top: 300rpx;left: 15%;width: 70%;height: 196rpx;">
                </image>
            </view>
        </m-modal>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonPost, commonGet } from '@/api'
import { State } from 'vuex-class'

@Component({})
export default class index extends Vue {
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    @State('cpgg', { namespace: 'root' }) cpgg
    @State('jlgg', { namespace: 'root' }) jlgg
    @State('ggkz', { namespace: 'root' }) ggkz

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
        ljlq: '/static/images/ljlq.png',
        qiandai: '/static/images/qiandai.png',
        shubi1: '/static/images/shubi1.png',
        shubi2: '/static/images/shubi2.png',
        text: '/static/images/text.png',
        avatar: '/static/images/avatar.png',
        qdjl: '/static/images/qdjl.png',
        dx: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/sign1.gif',
        jxnlk: '/static/images/jxnlk.png',
        zck: '/static/images/zck.png',
        qtk: '/static/images/qtk.png',
        bqs: '/static/images/bqs.png',
    }

    loading: boolean = true
    modalStatus: boolean = false
    modalStatusTwo: boolean = false
    modalStatusThree: boolean = false

    config: any = {}
    signInStatusLists: any = []

    videoStatus: number = 0
    tempNum: number = 0

    rewardedVideoAd: any = null
    interstitialAd: any = null

    created () {
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
                    if (this.videoStatus == 0) {
                        this.signInFn(1)
                    }
                    if (this.videoStatus == 1) {
                        this.signInPatchFn()
                    }
                    if (this.videoStatus == 2) {
                        this.getGift()
                    }
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
        const { data, code } = await commonGet(`/checkin/cmain.html?uuid=${this.$store.state.center.uuid}`)
        console.log(data)
        if (code == 200) {
            this.loading = false
            const { user, table } = data
            this.config = user

            if (this.tempNum != 0 && this.config.gift == 1) {
                this.modalStatusThree = true
            }

            const arr = []
            for (const item of Object.keys(table)) {
                arr.push(table[item])
            }
            console.log(arr)
            this.signInStatusLists = arr
            this.tempNum = 1
        }
    }

    sing_in_btn () {

        this.$mio.mioRoot.throttle(() => {
            if (this.config.allow_option == 0) {
                this.$mio.mioRoot.showToast('今日已无签到/补签次数')
                return
            }
            console.log('出发了吗')
            this.signIn(this.config.allow_option == 1 ? 0 : 2, this.config.current_day, 1)
        }, 2000)
    }

    // 签到
    signIn (state, day, temp?) {
        // this.$mio.mioRoot.throttle(() => {
            console.log(`当前周期：${this.config.current_day} || 签到天：${day}`)
            if (this.config.current_day >= day) {
                if (state == 0 && this.config.current_day == day) { // 待签到逻辑
                    this.modalStatus = true
                    console.log('待签到')
                    return
                }
                if (state == 1) {
                    console.log('已错过')
                }
                if (state == 2) {
                    if (temp == 1) {
                        this.baseConfig.bqs = '/static/images/buqiank.png'
                    } else {
                        this.baseConfig.bqs = '/static/images/bqs.png'
                    }
                    this.modalStatusTwo = true
                    console.log('待补签')
                }
                if (state == 3) {
                    console.log('已签到')
                }
            } else {
                console.log('不可签到')
            }
        // })
    }

    getVideo (state) {
        this.$mio.mioRoot.throttle(() => {
            this.videoStatus = state
            this.rewardedVideoAd.show().catch(() => {
                // 失败重试
                this.rewardedVideoAd.load()
                    .then(() => this.rewardedVideoAd.show())
                    .catch(err => {
                        console.log(err)
                        this.$mio.mioRoot.showToast('当前无视频拉取请直接领取')
                    })
            })
        })
    }

    // 正常签到
    signInFn (duplicated?) {
        this.$mio.mioRoot.throttle(async () => {
            const { data, code } = await commonPost(`/checkin/done.html?uuid=${this.$store.state.center.uuid}`, { option: 1, duplicated }, { 'content-type': 'application/x-www-form-urlencoded' })
            if (code == 200) {
                this.modalStatus = false
                this.getData()
                this.$mio.mioRoot.showToast('领取成功')
            }
            this.interstitialAd.show().catch(() => {
            	// 失败重试
            	this.interstitialAd.load()
            		.then(() => this.interstitialAd.show())
            		.catch(err => {
            			console.log(err)
            		})
            })
        })
    }

    // 补签
    signInPatchFn () {
        this.$mio.mioRoot.throttle(async () => {
            const { data, code } = await commonPost(`/checkin/done.html?uuid=${this.$store.state.center.uuid}`, { option: 2, duplicated: 0 }, { 'content-type': 'application/x-www-form-urlencoded' })
            if (code == 200) {
                this.modalStatusTwo = false
                this.getData()
                this.$mio.mioRoot.showToast('补签成功')
            }
        })
    }

    getGiftBefore () {
    	if (this.config.gift == 0 && this.config.current_day < 7) {
    	    this.$mio.mioRoot.showToast('连续签到满7天才可以领取哟！')
            return
    	}
        if (this.config.gift == 0 && this.config.current_day == 7) {
            this.$mio.mioRoot.showToast('已经领取过大礼包了！')
            return
        }
        if (this.config.gift == 1) {
            this.modalStatusThree = true
        }
    }

    // 大礼包
    async getGift () {
        const { data, code } = await commonGet(`/checkin/catchGift.html?uuid=${this.$store.state.center.uuid}`)
        if (code == 200) {
            this.modalStatusThree = false
            this.getData()
            this.$mio.mioRoot.showToast('大礼包领取成功')
        }
    }

    goRecord () {
        this.$mio.mioRoot.throttle(() => {
            this.$mio.mioRoot.push('/pages/index/record')
        })
    }
}
</script>

<style lang="scss">
.container {
    overflow-x: hidden;
    .user {
        position: relative;background: url(https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/sign_bg.png);height: 824rpx;background-size: 100% 100%;padding: 26rpx 30rpx 0 30rpx;
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
                        .sign_list_item_other_text_one{font-size: 14px;color: #4D1B0F;text-align: left;}
                        .sign_list_item_other_text_two{font-size: 14px;color: #808080;margin-top: 16rpx}
                    }
                    .sign_list_item_other_text_three{width: 121rpx;height: 136rpx;margin-right: 24rpx;margin-top: 32rpx}
                }
            }
            .sign_btn{
                margin-top: 10rpx;
                .sign_btn_img{width: 634rpx;z-index: 9;position: relative}
                .sign_btn_shadow{margin-left: 34rpx;position: relative;top: -100rpx;width: 582rpx;height: 82rpx;
                    z-index: 1;background: linear-gradient(98deg, #FE4111 0%, #FF7627 100%);border-radius: 50rpx;opacity: 0.77;filter: blur(10px);}
                .sign_btn_shadow1{margin-left: 34rpx;width: 582rpx;height: 100rpx;z-index: 1;position: relative;top: -100rpx;
                    background: linear-gradient(98deg, #FE4111 0%, #FF7627 100%);border-radius: 50rpx;opacity: 0.385;filter: blur(10px);}
            }
            .sign_balance{
                margin-top: 30rpx;color: #999999;letter-spacing: 1px;
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
    .dx{position: fixed;bottom: 100rpx;right: 54rpx;}
    .dxyy{position: fixed;bottom: 120rpx;right: 54rpx;width: 160rpx;
        height: 160rpx;
        background: #FFAE00;
        opacity: 0.29;
        filter: blur(14px);}
}
</style>
