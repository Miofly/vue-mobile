<template>
    <scroll-view class="full-height" scroll-y v-if="ggkz">
        <!--.test>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
        <m-search-update :hotKeywordList="['胡歌', '战狼', '小红花', '周星驰']"
                         :hotStatus="true" :ssBackIndex="false" @question="questionListFn"
                         class="test" hisKeys="phoneKey" placeholder="请输入要搜索的内容" style="height: 100%;">
            <!--默认展示的内容无需搜索展示的-->
            <template v-slot:content>
                <view ref="test1" class="full-height margin-top-thirty">
                    <!--当tabList没有数据时展示的内容-->
                    <ad v-if="spgg" :unit-id="spgg" ad-type="video" ad-theme="white" style="margin-top: 28rpx"></ad>
                    没时间更新，来个简陋版本的，可能会请求超时，
                    需要等待，年后有时间更新个全面版本
                    <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 28rpx"></ad>
                </view>
            </template>
            <template v-slot:detail>
                <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 68rpx;width: 100vw"></ad>

                <view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
                      v-for="(item, index) in answerQuestion">
                    <view class="u-column" @click="goRecord(item.url)">
                        <view class="demo-warter flex justify-between" style="position: relative">
                            <view>{{item.name}}</view>
                            <view style="background-color: #2979ff;color: white;padding: 5px 10px;border-radius: 10px">播放</view>
                        </view>
                    </view>
                </view>
                <ad v-if="spgg" :unit-id="spgg" ad-type="video" ad-theme="white" style="margin-top: 28rpx"></ad>

            </template>
        </m-search-update>
    </scroll-view>
</template>

<script lang="ts">
import newData from 'json/zsQuestion.json'
import dataTwo from 'json/zsQuestionNew.json'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
// #ifdef H5
import mSearchUpdate from 'zj/m-searchUpdate/m-searchUpdate.vue'
// #endif
import { commonGet } from '@/api'

const cheerio = require('cheerio')

@Component({
    components: {
        // #ifdef H5
        mSearchUpdate,
        // #endif
    }
})
export default class extends Vue {
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    @State('cpgg', { namespace: 'root' }) cpgg
    @State('jlgg', { namespace: 'root' }) jlgg
    @State('ggkz', { namespace: 'root' }) ggkz

    showTab: boolean = false; // 是否需要swiperTab
    leftCon: boolean = false; // 左侧展示内容
    rightCon: boolean = false; // 右侧展示内容
    tabHeight: number = this.showTab ? 96 : 0; // tab栏的高度
    fixHeight: number = 100; // 固定内容的高度
    fixCon: boolean = false; // 是否需要固定布局
    headerFixCon: boolean = false; // 是否需要头部固定布局
    tabClick: number = 0; // 当前tab的下标
    tabLists: any[] = []

    answerQuestion: any = []
    questionBanks: any = []
    interstitialAd: any = null
    rewardedVideoAd: any = null

    get allHeight (): number {
        return this.tabHeight + this.fixHeight + this.headerHeight
    }

    get headerHeight (): number { // 头部固定高度
        return this.headerFixCon ? 60 : 0
    }

    created (): void {
        // #ifdef MP-WEIXIN
        this.interstitialAd = null
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
        setInterval(() => {
            this.interstitialAd.show()
        }, 15000)
        // #endif
    }

    questionListFn (val) {
        // #ifdef MP-WEIXIN
        this.interstitialAd.show().catch(() => {
            // 失败重试
            this.interstitialAd.load()
                .then(() => this.interstitialAd.show())
                .catch(err => {
                    console.log(err)
                })
        })
        // #endif

        this.$mio.mioRoot.throttle(() => {
            this.loadOkSearch(val)
        }, 2000)
        // this.answerQuestion = []
        // this.answerQuestion = this.questionBanks.filter(item => { // eslint-disable-line
        //     // #ifdef MP-WEIXIN
        //     this.interstitialAd.show()
        //     // #endif
        //     return item.question.indexOf(val) !== -1
        // })
        // console.log(this.answerQuestion, 33333333)
    }

    async loadOkSearch (keyword) { // ok资源网搜索
	    this.answerQuestion = []
        this.$mio.mioRoot.showLoading('正在加载')
        const okIndex = await commonGet(`/index.php?m=vod-search&wd=${keyword}&submit=search`)
        uni.hideLoading()
        const $ = cheerio.load(okIndex, { _useHtmlParser2: true })
        for (let i = 0; i < $('.xing_vb4 a').length; i++) {
            this.answerQuestion.push({ name: $('.xing_vb4 a').eq(i).text(), url: $('.xing_vb4 a').eq(i).attr('href') })
        }
        const pageCount = $('.pages').text().split('当前:')[1].split('首页')[0].split('/')[1].replace(/页/g, '')

        console.log(this.answerQuestion)
        console.log(pageCount)
    }

    goRecord (url) {
        console.log('fore', url)

        this.$mio.mioRoot.push(`/pages/index/detail?url=${encodeURIComponent(url)}`)
    }

}
</script>

<style>
.test > view > view > view {
    height: 100%;
}
.u-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: auto;
}

button::after {
    border: 0 !important;
}

.demo-warter {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    padding: 8px;
}
</style>
