<template>
    <view class="full-width-height text-center" style="overflow-y: hidden">
        <!--		<view class="full-width" style="margin-top: 128rpx;">-->
        <!--			<view style="position: relative">-->
        <!--				<view-->
        <!--					style="height: 1000rpx;filter: blur(8px);width: 84%;margin-left: 8%;background: rgba(208, 208, 208, 1);position: absolute;top: 0;left: 0"></view>-->
        <!--				<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]" :showLoading="false"-->
        <!--				         :src="baseConfig.posterSrc"-->
        <!--				         bgColor="rgba(0, 0, 0, 1)"-->
        <!--				         bgColorError="rgba(0, 0, 0, 1)" duration="0" style="width: 80vw;position: absolute;left: 10vw">-->
        <!--					<view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>-->
        <!--				</m-image>-->
        <!--			</view>-->

        <!--			<view style="height: 1000rpx"></view>-->

        <!--			<view class="flex justify-around" style="margin-top: 80rpx;padding: 0 20rpx">-->
        <!--				<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]" :showLoading="false"-->
        <!--				         :src="baseConfig.shareSrc"-->
        <!--				         bgColor="rgba(0, 0, 0, 1)"-->
        <!--				         bgColorError="rgba(0, 0, 0, 1)"-->
        <!--				         duration="0" height="100" open-type="share">-->
        <!--					<view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>-->
        <!--				</m-image>-->
        <!--				<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]" :shape="['square', 'circle'][0]" :showLoading="false"-->
        <!--				         :src="baseConfig.saverSrc"-->
        <!--				         bgColor="rgba(0, 0, 0, 1)" bgColorError="rgba(0, 0, 0, 1)"-->
        <!--				         duration="0" height="100" @click="saveImg">-->
        <!--					<view slot="error" class="text-white" style="font-size: 24rpx;">加载失败</view>-->
        <!--				</m-image>-->
        <!--			</view>-->
        <!--		</view>-->
        <hchPoster ref="hchPoster" :canvasAttr.sync="posterObj" :posterBgFlag="true"
                   :simpleFlag="simpleFlag"
                   @cancel="canvasCancel"/>

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
    baseConfig: any = {
        posterSrc: '/static/images/haibao@2x.png',
        shareSrc: '/static/images/fenxiang@2x.png',
        saverSrc: '/static/images/save.png',
    }
    posterObj: any= {}
    deliveryFlag: boolean = false
    simpleFlag: boolean = false//是否展示简单版海报

    created () {
        setTimeout(() => {
            this.handleShowPoster()
        }, 2000)
    }

    handleShowPoster () {
        // this.canvasFlag = false
        this.$refs.hchPoster.posterShow()
    }


    saveImg (imgSrc) {
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
                uni.saveImageToPhotosAlbum({
                    filePath: imgSrc,
                    success: res => {
                        console.log(res)
                        this.$mio.mioRoot.showToast('保存成功')
                    },
                    fail: err => {
                        console.log(err)
                        this.$mio.mioRoot.showToast('保存失败')
                    }
                })
            },
            fail: () => {
                wx.getSetting({
                    success: res => {
                        const { authSetting } = res
                        if (!authSetting['scope.writePhotosAlbum']) {
                            wx.showModal({
                                title: '提示',
                                content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                                success (data) {
                                    wx.openSetting({})
                                },
                            })
                        }
                    }
                })
            }
        })
    }
}
</script>

<style>

</style>
