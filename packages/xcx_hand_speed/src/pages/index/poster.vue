<template>
    <view class="content">

        <view style="position: relative;">
            <view :class="qrShow?'show':''" class="flex_row_c_c" style="position: absolute;width: 100%;left: 0;top: 50rpx;text-align: center;z-index: 999">
                <image style="border-radius: 10px" :src="poster.finalPath || ''" class="posterImage" show-menu-by-longpress="true"></image>
            </view>
            <view v-if="!qrShow" style="visibility: hidden;position: absolute;width: 100%;left: 20%;text-align: center;top: 50rpx;">
                <canvas class="hideCanvas" :style="{width: 528 + 'px', height: 900 + 'px'}" canvas-id="default_PosterCanvasId"></canvas>
            </view>
        </view>
        <view class="flex justify-around" style="position: relative;top: 1000rpx;width: 100%;z-index: 99">
            <button style="height: 100rpx;width: 334rpx" class="fl" open-type="share">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.shareSrc" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </button>
            <button style="height: 100rpx;width: 334rpx" class="fr" @click="saveImg(poster.finalPath)">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.saverSrc" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </button>

        </view>
        <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="position: relative;top: 1050rpx;"></ad>

    </view>
</template>

<script lang="ts">
/* eslint-disable */
import _app from 'uJs/plugin/sharePoster/app.js'
import {getSharePoster} from 'uJs/plugin/sharePoster/QS-SharePoster.js'

import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import {State} from "vuex-class";

@Component({})
export default class extends Vue {
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    poster: any = {}
    qrShow: boolean = false
    canvasId: string ='default_PosterCanvasId'
    count: number = 0
    baseConfig: any = {
        posterSrc: '/static/images/haibao@2x.png',
        shareSrc: '/static/images/fenxiang@2x.png',
        saverSrc: '/static/images/save.png',
    }

    created () {
    	this.shareFc()
    }

    saveImg (imgSrc) {
        console.log(imgSrc)
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

    async shareFc() {
        const _this = this
        try {
            this.count++
            const d = await getSharePoster({
                _this, // 若在组件中使用 必传
                type: 'testShareType',
                formData: {},
                posterCanvasId: _this.canvasId, // canvasId
                delayTimeScale: 20, // 延时系数
                setCanvasWH({bgObj}) {
                    _this.poster = bgObj
                },
                drawArray({
                              bgObj,
                              type,
                              bgScale,
                              setBgObj,
                              getBgObj
                          }) {
                    return [
                        {
                            type: 'image',
                            id: 'productImage',
                            url: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/hb.png',
                            dx: 0,
                            dy: 0,
                            serialNum: 0,
                            infoCallBack(imageInfo) {

                                console.log(imageInfo.width/2)

                                let width = 528
                                let height = 900

                                setBgObj({
                                    width,
                                    height: height
                                })
                                return {
                                    dWidth: width,
                                    dHeight: height
                                }
                            }
                        },
                        {
                            type: 'text',
                            id: 'productName',
                            size: 40,
                            text: _this.$store.state.center.score + '次',
                            color: 'red',
                            serialNum: 1,
                            allInfoCallback({drawArray}) {
                                const productImage = drawArray.find(item => item.id === 'productImage')
                                const addHeight = getBgObj().height - productImage.dHeight
                                return {
                                    size: drawArray[1].text.length == 2 ? 55 : drawArray[1].text.length == 3 ? 45 : 40,
                                    dx: drawArray[1].text.length == 2 ? getBgObj().width * 0.42 : drawArray[1].text.length == 3 ? getBgObj().width * 0.41 : getBgObj().width * 0.40,
                                    dy: getBgObj().height / 2 + 18
                                }
                            }
                        },
                        {
                            type: 'text',
                            id: 'productName',
                            size: 40,
                            text: _this.$store.state.center.name,
                            color: 'black',
                            serialNum: 1,
                            allInfoCallback({drawArray}) {
                                const productImage = drawArray.find(item => item.id === 'productImage')
                                const addHeight = getBgObj().height - productImage.dHeight
                                return {
                                    dx: (getBgObj().width - drawArray[2].textLength)/2,
                                    dy: getBgObj().height / 2 - 80
                                }
                            }
                        },
                    ]
                }
            })
            // _app.log(`海报生成成功, 时间:${new Date()}， 临时路径: ${d.poster.tempFilePath}`)
            _this.poster.finalPath = d.poster.tempFilePath
            _this.qrShow = true
        } catch (e) {
            _app.hideLoading()
            _app.showToast(JSON.stringify(e))
            console.log(JSON.stringify(e))
        }
    }
}
</script>

<style>
.hideCanvasView {
    position: relative;
}

.hideCanvas {
    position: fixed;
    top: -99999upx;
    left: -99999upx;
    z-index: -99999;
}

.flex_row_c_c {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.posterImage {
    width: 264px;
    height: 449px;
}

button {
    border: 0 !important;padding: 0!important;background-color: rgba(241, 241, 241, 1)!important;line-height: 0!important;
}
button:after {
    border: 0 !important;padding: 0!important;
}
</style>
