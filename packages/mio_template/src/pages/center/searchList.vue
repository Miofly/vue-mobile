<template>
	<scroll-view scroll-y class="full-height">
		<!--.test>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
		<search class="test" @question="questionListFn" :hotStatus="true" :hotKeywordList="['信用报告', '银行卡', '征信', '股票']"
				:ssBackIndex="false" hisKeys="phoneKey" placeholder="请输入要搜索的内容" style="height: 100%;">
			<!--默认展示的内容无需搜索展示的-->
			<template v-slot:content>
				<view class="full-height">
					<!--当tabList没有数据时展示的内容-->
					<view class="flex justify-center align-center full-width-height" v-if="tabLists.length == 0">
						<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
					</view>
					<scroll-view class="full-height" scroll-y style="" v-else>
						<view class="full-height">
							<!--固定在顶部的内容-->
							<view :style="{height: headerHeight + 'rpx', lineHeight: headerHeight + 'rpx'}"
								  class="fixed-top text-center full-width"
								  v-if="headerFixCon">
							</view>
							<scroll-view v-if="showTab" :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0">
								<view class="flex justify-around bg-white">
									<!--tab左侧需要的内容-->
									<view v-if="leftCon">
										<image src="/static/images/lbVideo/paihangbang.png" style="width: 72rpx;height: 100rpx">
										</image>
									</view>
									<m-swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
											   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists"
											   :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
											   :underLineWidth="50 + '%'" activeColor="black" activeSize="24px"
											   defaultColor="#666"
											   lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
											   lineRadius="10px"
											   ref="swiperTab" tagBg="red" textSize="20px"
											   v-model="tabClick">
									</m-swiperTab>
									<!--tab栏右侧需要的内容-->
									<view v-if="rightCon">
										<image src="/static/images/lbVideo/paihangbang.png"
											   style="width: 72rpx;height: 100rpx"></image>
									</view>
								</view>
							</scroll-view>
							<!--固定设置高度-->
							<view v-if="showTab" :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
							<!--滚动时固定内容-->
							<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
								  style="position: fixed;z-index: 9999;"
								  v-if="fixCon">
								这是滚动的固定内容
							</view>
							<!--滚动的每一栏内容-->
							<swiper :current="tabClick"
									:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
									@change="swiperChange">
								<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
									<MescrollItem :i="index" :index="tabClick" :tabLists="tabLists"></MescrollItem>
								</swiper-item>
							</swiper>
						</view>
					</scroll-view>
				</view>
			</template>
			<template v-slot:detail>
				<view class="full-height">
					<!--当tabList没有数据时展示的内容-->
					<view class="flex justify-center align-center full-width-height" v-if="tabLists.length == 0">
						<image src="/static/images/common/loadingOne.gif" style="width: 500rpx;height: 500rpx"></image>
					</view>
					<scroll-view class="full-height" scroll-y style="" v-else>
						<view class="full-height">
							<!--固定在顶部的内容-->
							<view :style="{height: headerHeight + 'rpx', lineHeight: headerHeight + 'rpx'}"
								  class="fixed-top text-center full-width"
								  v-if="headerFixCon">
							</view>
							<scroll-view v-if="showTab" :style="{top: headerHeight + 'rpx'}" scroll-x style="position: fixed;left: 0">
								<view class="flex justify-around bg-white">
									<!--tab左侧需要的内容-->
									<view v-if="leftCon">
										<image src="/static/images/lbVideo/paihangbang.png" style="width: 72rpx;height: 100rpx">
										</image>
									</view>
									<m-swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
											   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists"
											   :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
											   :underLineWidth="50 + '%'" activeColor="black" activeSize="24px"
											   defaultColor="#666"
											   lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
											   lineRadius="10px"
											   ref="swiperTab" tagBg="red" textSize="20px"
											   v-model="tabClick">
									</m-swiperTab>
									<!--tab栏右侧需要的内容-->
									<view v-if="rightCon">
										<image src="/static/images/lbVideo/paihangbang.png"
											   style="width: 72rpx;height: 100rpx"></image>
									</view>
								</view>
							</scroll-view>
							<!--固定设置高度-->
							<view v-if="showTab" :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
							<!--滚动时固定内容-->
							<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
								  style="position: fixed;z-index: 9999;"
								  v-if="fixCon">
								这是滚动的固定内容
							</view>
							<!--滚动的每一栏内容-->
							<swiper :current="tabClick"
									:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
									@change="swiperChange">
								<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
									<MescrollItemTwo :answerQuestion="answerQuestion" :i="index" :index="tabClick" :tabLists="tabLists"></MescrollItemTwo>
								</swiper-item>
							</swiper>
						</view>
					</scroll-view>
				</view>
			</template>
		</search>
	</scroll-view>
</template>

<script lang="ts">
    import newData from 'json/zsQuestion.json'
    import dataTwo from 'json/zsQuestionNew.json'
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
    import { State } from 'vuex-class'
    import MescrollItem from './mescrollItem.vue'
    import MescrollItemTwo from './mescrollItemTwo.vue'
    import swiperTab from 'zj/m-swiperTab/m-swiperTab.vue'
    import search from 'zj/m-searchUpdate/m-searchUpdate.vue'

    @Component({
        components: {
            search,
            MescrollItem,
            MescrollItemTwo,
            swiperTab
        }
    })
    export default class index extends Vue {
        @State('ggkz', { namespace: 'root' }) ggkz
        @State('zsspgg', { namespace: 'root' }) zsspgg
        @State('zsptgg', { namespace: 'root' }) zsptgg

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

        created (): void {
            if (this.$store.state.root.ggkzs) {
                this.questionBanks = newData
            } else {
                this.questionBanks = dataTwo
            }
            // #ifdef MP-WEIXIN
            this.interstitialAd = null
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: this.$store.state.root.zscpgg
                })
                this.interstitialAd.onLoad(() => {
                    console.log('插屏广告加载成功')
                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
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

        swiperChange (e: any): void { // 轮播菜单
            this.tabClick = e.detail.current
            ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }

        mounted (): void {
            setTimeout(() => {
                this.tabLists = [{ name: '自定义', type: 'zdy', num: 88 }]
            }, 1)
        }

        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 60 : 0
        }

        questionListFn (val) {
            this.answerQuestion = []
            this.answerQuestion = this.questionBanks.filter(item => { // eslint-disable-line
                // #ifdef MP-WEIXIN
                this.interstitialAd.show()
                // #endif
                return item.question.indexOf(val) !== -1
            })
			console.log(this.answerQuestion, 33333333)
        }
    }
</script>

<style>
	.test>view>view>view{height: 100%;}
</style>
