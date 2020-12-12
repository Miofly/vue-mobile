<template>
    <view class="bg-black text-center padding-bottom-ten box full-width-height">
        <canvas id="canvas" style="width: 300px;height: 150px" type="2d"></canvas>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import lottie from 'lottie-miniprogram'

let lottieInstance: any = ''
@Component({})
export default class index extends Vue {
    baseConfig: any = {
        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg'
    }

    onLoad () {
        lottieInstance = wx.createSelectorQuery().select('#canvas').node(res => {
            const canvas = res.node
            const context = canvas.getContext('2d')
            lottie.setup(canvas)
            lottieInstance = lottie.loadAnimation({ // 微信小程序给的接口，调用就完事了，原理不太懂
                loop: true, // 是否循环播放（选填）
                autoplay: true, // 是否自动播放（选填）
                path: 'https://assets10.lottiefiles.com/packages/lf20_1gagcis2/data.json', // lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
                rendererSettings: { context }
            })
            lottieInstance.setSpeed(1)
            lottieInstance.setDirection(1)
        }).exec()
    }
}
</script>
