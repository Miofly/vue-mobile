<template>
	<view>
		<view class="full-width-height">
			<zsIndex v-if="pageCur==footabs[0].type"></zsIndex>
			<zsCommit v-if="pageCur==footabs[1].type"></zsCommit>
			<zsModule v-if="pageCur==footabs[2].type"></zsModule>
			<zsRecommend v-if="pageCur==footabs[3].type"></zsRecommend>
			<zsWebview v-if="pageCur==footabs[4].type"></zsWebview>

			<view class="cu-bar tabbar bg-white foot">
				<view :key="index" @tap="navChange(index)" v-if="item.show" class="action" v-for="(item, index) in footabs"> <!--eslint-disable-line-->
					<view class="fa-cu-image">
						<view :class="[pageCur==item.type?'text-blue':'text-gray', 'fa-' + item.type]"
							  class="fa"></view>
					</view>
					<view :class="pageCur==item.type?'text-blue':'text-gray'">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
	import { State } from 'vuex-class'

    @Component
    export default class index extends Vue {
        interstitialAd: any = null
		@State('footabs', { namespace: 'zs' }) footabs
        pageCur: string = this.$store.state.zs.footabs[0].type

        onShow (): void {
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
            setTimeout(() => {
                this.interstitialAd.show()
            }, 23000)
            // #endif
        }

        navChange (num: number): void {
            this.pageCur = this.footabs[num].type
        }
    }
</script>
