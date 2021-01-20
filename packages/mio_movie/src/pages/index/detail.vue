<template>
    <view class="bg-white" v-if="ggkz">
        <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 28rpx"></ad>
        <view ref="test" class="u-skeleton container padding">
            <view>{{videoTitle}}</view>
            <view>{{dtType}}</view>
            <view>{{$mio.mioRoot.strEllipsis(dtActor, 40)}}</view>
            <view>{{dtLang}}</view>

        </view>
        <video :id="myVideoId" style="width: 100%" :src="src" enable-play-gesture="true"
               controls :custom-cache="false" :poster="posterImg" :title="videoTitle"
               show-mute-btn="true" @waiting="videoWait" @loadedmetadata="loadedmetadata">
        </video>

        <view>
            <view>此处链接直接观看</view>
            <view class="flex text-center flex-wrap align-center" >
                <view v-for="(item, index) in mvDetailDataMU" :key="index" :class="[index_new == index ? 'bg-blue' : 'bg-white']" style="height: 70rpx;border: 1px solid #eee;"
                      :style="{width: '20%'}" @click="play(item.url, index)">
                    <view class="margin-top-xxl">{{ item.name }}</view>
                </view>
            </view>
            <ad v-if="spgg" :unit-id="spgg" ad-type="video" ad-theme="white" style="margin-top: 28rpx"></ad>
            <view>此处链接可复制浏览器观看+需观看视频哦</view>
            <view class="flex text-center flex-wrap align-center">
            	<view v-for="(item, index) in mvDetailData" :key="index" :class="[index_new_two == index ? 'bg-pink' : 'bg-white']" style="height: 70rpx;border: 1px solid #eee;"
            	      :style="{width: '20%'}" @click="copy(item.url, index)">
            		<view class="margin-top-xxl">{{ item.name }}</view>
            	</view>
            </view>

        </view>
    </view>

</template>

<script lang="ts">
import { Prop, Vue, PropSync, Ref, Watch, Component } from 'vue-property-decorator'
import { commonPost, commonGet } from '@/api'
import { State } from 'vuex-class'
const cheerio = require('cheerio')

@Component({})
export default class detail extends Vue {
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    @State('cpgg', { namespace: 'root' }) cpgg
    @State('jlgg', { namespace: 'root' }) jlgg
    @State('ggkz', { namespace: 'root' }) ggkz

    baseConfig: any = {
        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
        bg: '/static/images/bg.png',
        avatar: '/static/images/avatar.png',
    }

    loading: boolean = true
    rewardedVideoAd: any = null
    interstitialAd: any = null
	
	myVideoId: string = 'video'
	
    videoContext: any = null
    index_new: number = 0
    index_new_two: number = 0

    mvUrl: string = ''
    dtTitle: string = ''
    dtType: string = ''
    dtActor: string = ''
    dtLang: string = ''
    videoTitle: string = ''
    posterImg: string = ''
    src: string = ''
    mvDetailData: any = []
    mvDetailDataMU: any = []

    onLoad (e) {
    	console.log('onLoad', e.url)
        this.loadOkInfos(decodeURIComponent(e.url))
    }

    created (e) {
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
                    this.$mio.mioRoot.showToast('视频未观看完成，无法复制')
                    this.$mio.mioRoot.copyText('', () => {
                        this.$mio.mioRoot.showToast('复制失败')
                    })
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

    }
	
	videoWait (e) {
		console.log(e)
	}
	
	loadedmetadata (e) {
		uni.hideLoading()
	}
	
    play (url, index) {
        this.index_new = index
    	this.src = url
    	this.myVideoId = `video${index}`
	    this.videoContext = uni.createVideoContext(`video${index}`)
	    this.videoContext.play()
	    this.$mio.mioRoot.showLoading('正在加载视频')
	    setTimeout(() => {
	        uni.hideLoading()
	    }, 10000)
        this.interstitialAd.show().catch(() => {
        	// 失败重试
        	this.interstitialAd.load()
        		.then(() => this.interstitialAd.show())
        		.catch(err => {
        			console.log(err)
        		})
        })
        setInterval(() => {
            this.interstitialAd.show().catch(() => {
                // 失败重试
                this.interstitialAd.load()
                    .then(() => this.interstitialAd.show())
                    .catch(err => {
                        console.log(err)
                    })
            })
        }, 900000)
    }

    copy (url, index) {
        this.index_new_two = index
        setTimeout(() => {
            this.$mio.mioRoot.copyText(url, () => {
	            this.$mio.mioRoot.showToast('复制成功')
            })
        }, 15000)
        this.rewardedVideoAd.show().catch(() => {
        	// 失败重试
        	this.rewardedVideoAd.load()
        		.then(() => this.rewardedVideoAd.show())
        		.catch(err => {
                    this.$mio.mioRoot.copyText(url)
                    this.interstitialAd.show().catch(() => {
                    	// 失败重试
                    	this.interstitialAd.load()
                    		.then(() => this.interstitialAd.show())
                    		.catch(err => {
                    			console.log(err)
                    		})
                    })
        		})
        })
    }

    async loadOkInfos (url) { // ok资源网视频详情
        this.$mio.mioRoot.showLoading('正在加载')
        const okInfos = await commonGet(url)
        uni.hideLoading()
        const $ = cheerio.load(okInfos, { _useHtmlParser2: true })
        this.dtTitle = $('.vodh h2').text()
        this.videoTitle = $('.vodh h2').text()
        this.dtType = $('.vodinfobox ul li').eq(3).addBack('span').text()
        this.dtActor = $('.vodinfobox ul li').eq(2).addBack('span').text()
        this.dtLang = $('.vodinfobox ul li').eq(5).addBack('span').text()
        this.posterImg = $('.lazy').attr('src')


        for (let i = 0; i < $('#1 ul li').length; i++) {
            if ($('#1 ul li').eq(i).text().indexOf('.m3u8') === -1) {
                this.mvDetailData.push({
                    name: $('#1 ul li').eq(i).text().split('$')[0],
                    url: $('#1 ul li').eq(i).text().split('$')[1]
                })
            } else {
                this.mvDetailDataMU.push({
                    name: $('#1 ul li').eq(i).text().split('$')[0],
                    url: $('#1 ul li').eq(i).text().split('$')[1]
                })
            }
        }

        for (let i = 0; i < $('#2 ul li').length; i++) {
            if ($('#2 ul li').eq(i).text().indexOf('.m3u8') === -1) {
                this.mvDetailData.push({
                    name: $('#2 ul li').eq(i).text().split('$')[0],
                    url: $('#2 ul li').eq(i).text().split('$')[1]
                })
            } else {
                this.mvDetailDataMU.push({
                    name: $('#2 ul li').eq(i).text().split('$')[0],
                    url: $('#2 ul li').eq(i).text().split('$')[1]
                })
            }
        }

        this.videoContext = uni.createVideoContext('video')
        this.src = this.mvDetailDataMU[0].url
	    this.$mio.mioRoot.showLoading('正在加载视频')
	    setTimeout(() => {
		    uni.hideLoading()
	    }, 10000)
        this.videoContext.play()
        console.log(this.dtTitle)
        console.log(this.videoTitle)
        console.log(this.dtType)
        console.log(this.dtActor)
        console.log(this.dtLang)
        console.log(this.posterImg)
        console.log(this.mvDetailDataMU)
        console.log(this.mvDetailData)
    }

}
</script>

<style lang="scss">

</style>
