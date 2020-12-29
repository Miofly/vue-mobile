<template>
    <view>
        <!-- 遮罩层 -->
        <view class="flex justify-around" style="position: fixed;top: 1050rpx;width: 100%;z-index: 99">
            <button style="height: 100rpx;width: 334rpx" class="fl" open-type="share">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.shareSrc" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </button>
            <button style="height: 100rpx;width: 334rpx" class="fr">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         @click="handleSaveCanvasImage"
                         :shape="['square', 'circle'][0]" :src="baseConfig.saverSrc" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </button>
        </view>
    </view>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            baseConfig: {
                posterSrc: '/static/images/haibao@2x.png',
                shareSrc: '/static/images/fenxiang@2x.png',
                saverSrc: '/static/images/save.png',
            },
        }
    }
}
</script>

<style lang="scss">
.canvas {
    position: fixed !important;
    top: -20px !important;
    left: 0 !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 10;
}
button {
    border: 0 !important;padding: 0!important;background-color: rgba(241, 241, 241, 1)!important;line-height: 0!important;
}
button:after {
    border: 0 !important;padding: 0!important;
}
</style>
