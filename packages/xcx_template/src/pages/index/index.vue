<template>
    <view :style="{backgroundImage: 'url('+ baseConfig.bg +')'}" class="text-center xcx_bg" style="">

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonPost, commonGet } from '@/api'

@Component({})
export default class index extends Vue {
    baseConfig: any = {
        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
        bg: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
        avatar: '/static/images/avatar.png',
    }

    rewardedVideoAd: any = null
    interstitialAd: any = null

    created () {
        console.log('初始化 created:')
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
}
</script>

<style>
.xcx_bg {
    background-size: 100% 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 30px;
    background-repeat: no-repeat
}
</style>
