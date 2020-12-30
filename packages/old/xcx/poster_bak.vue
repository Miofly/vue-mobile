<template>
    <view class="content">
        <!-- 生成海报 -->
        <button type="primary" @tap="shareFc()">生成海报</button>
        <!-- 图片展示由自己实现 -->
        <view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
            <view class="flex_column">
                <view class="backgroundColor-white padding1vh border_radius_10px">
                    <image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
                </view>
                <view class="flex_row marginTop2vh">
                    <button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
                    <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
                </view>
            </view>
        </view>
        <!-- 画布 -->
        <view class="hideCanvasView">
            <canvas class="hideCanvas" canvas-id="default_PosterCanvasId"
                    :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
        </view>
    </view>
</template>

<script>
/* eslint-disable */
import _app from 'uJs/plugin/sharePoster/app.js'
import {
    getSharePoster
} from  'uJs/plugin/sharePoster/QS-SharePoster.js'
export default {
    data () {
        return {
            poster: {},
            qrShow: false,
            canvasId: 'default_PosterCanvasId',
            count: 0
        }
    },
    created() {
        this.shareFc()
    },
    methods: {
        async shareFc () {
            const _this = this
            try {
                this.count++
                const d = await getSharePoster({
                    _this, // 若在组件中使用 必传
                    type: 'testShareType',
                    formData: {},
                    posterCanvasId: _this.canvasId, // canvasId
                    delayTimeScale: 0, // 延时系数
                    // background: {
                    //     height: 10,
                    //     width: 10
                    // },
                    setCanvasWH ({
                                    bgObj
                                }) {
                        _this.poster = bgObj
                    },
                    drawArray ({
                                  bgObj,
                                  type,
                                  bgScale,
                                  setBgObj,
                                  getBgObj
                              }) {
                        return [{
                            type: 'image',
                            id: 'productImage',
                            url: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/haibao.jpg',
                            dx: 0,
                            dy: 0,
                            serialNum: 0,
                            infoCallBack (imageInfo) {
                                console.log()
                                let width = 264
                                let height = 449

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
                                text: '取舍',
                                color: '#000',
                                serialNum: 1,
                                allInfoCallback ({
                                                    drawArray
                                                }) {
                                    const productImage = drawArray.find(item => item.id === 'productImage')
                                    const addHeight = getBgObj().height - productImage.dHeight
                                    return {
                                        size: getBgObj().width * 0.05,
                                        lineFeed: {
                                            maxWidth: getBgObj().width * 0.5,
                                            lineNum: 1
                                        },
                                        dx: getBgObj().width * 0.05,
                                        dy: productImage.dHeight + addHeight * 0.25,
                                    }
                                }
                            },
                            {
                                type: 'text',
                                text: '棒棒哒~',
                                color: '#f1505c',
                                serialNum: 2,
                                allInfoCallback ({
                                                    drawArray
                                                }) {
                                    const productImage = drawArray.find(item => item.id === 'productImage')
                                    const addHeight = getBgObj().height - productImage.dHeight
                                    return {
                                        size: getBgObj().width * 0.05,
                                        lineFeed: {
                                            maxWidth: getBgObj().width * 0.5,
                                            lineNum: 1
                                        },
                                        dx: getBgObj().width * 0.05,
                                        dy: productImage.dHeight + addHeight * 0.5,
                                    }
                                }
                            },
                            {
                                type: 'text',
                                text: '无情哈拉少',
                                serialNum: 3,
                                allInfoCallback ({
                                                    drawArray
                                                }) {
                                    const productImage = drawArray.find(item => item.id === 'productImage')
                                    const addHeight = getBgObj().height - productImage.dHeight
                                    return {
                                        size: getBgObj().width * 0.05,
                                        lineFeed: {
                                            maxWidth: getBgObj().width * 0.5,
                                            lineNum: 1
                                        },
                                        dx: getBgObj().width * 0.05,
                                        dy: productImage.dHeight + addHeight * 0.75,
                                    }
                                }
                            },
                            {
                                type: 'qrcode',
                                text: '123456',
                                serialNum: 4,
                                allInfoCallback ({
                                                    drawArray
                                                }) {
                                    const productImage = drawArray.find(item => item.id === 'productImage')
                                    const addHeight = getBgObj().height - productImage.dHeight
                                    const widthSize = getBgObj().width * 0.4
                                    const heightSize = addHeight
                                    const countSize = widthSize > heightSize ? heightSize : widthSize
                                    const size = countSize * 0.9
                                    return {
                                        size,
                                        dx: getBgObj().width - countSize * 0.95,
                                        dy: getBgObj().height - countSize * 0.95
                                    }
                                }
                            }
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
        },
        saveImage () {
            // #ifndef H5
            uni.saveImageToPhotosAlbum({
                filePath: this.poster.finalPath,
                success (res) {
                    _app.showToast('保存成功')
                }
            })
            // #endif
            // #ifdef H5
            _app.showToast('保存了')
            // #endif
        },
        share () {
            // #ifdef APP-PLUS
            _app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false)
            // #endif

            // #ifndef APP-PLUS
            _app.showToast('分享了')
            // #endif
        },
        hideQr () {
            this.qrShow = false
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

.modalView {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    outline: 0;
    transform: scale(1.2);
    perspective: 2500upx;
    background: rgba(0, 0, 0, 0.6);
    transition: all .3s ease-in-out;
    pointer-events: none;
    backface-visibility: hidden;
    z-index: 999;
}

.modalView.show {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
}

.flex_column {
    display: flex;
    flex-direction: column;
}

.border_radius_10px {
    border-radius: 10px;
}

.padding1vh {
    padding: 1vh;
}

.posterImage {
    width: 264px;
    height: 449px;
}

.flex_row {
    display: flex;
    flex-direction: row;
}

.marginTop2vh {
    margin-top: 2vh;
}
</style>
