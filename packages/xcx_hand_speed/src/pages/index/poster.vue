<template>
    <view v-show="canvasShow" class="canvas-content">
        <!-- 遮罩层 -->
        <view class="canvas-mask"></view>
        <canvas canvas-id="myCanvas" class="canvas"></canvas><!-- 海报 -->
        <view class="flex justify-around" style="position: fixed;bottom: 50rpx;width: 100%;z-index: 99">
            <button class="fl" style="width: 48%;" open-type="share">
                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                         :shape="['square', 'circle'][0]" :src="baseConfig.shareSrc" bgColor="rgba(0, 0, 0, 1)">
                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                </m-image>
            </button>

            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
                     :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" @click="handleSaveCanvasImage"
                     :shape="['square', 'circle'][0]" :src="baseConfig.saverSrc" bgColor="rgba(0, 0, 0, 1)">
                <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
            </m-image>
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
            canvasShow: false,
            attrs: { // 主板版海报
                marginLR: 40,
                marginTB: 40,
                radius: 0.03,
                fillColor: '#ffffff',
                innerLR: 20,
                innerTB: 20,
                posterRatio: 1.3,
                title: "今日上新水果，牛奶草莓，颗粒饱满，每盒 200g",
                titleFontSize: 16,
                titleLineHeight: 25,
                posterCodeUrl: "https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/xcx.jpg",
                codeWidth: 0.15,
                codeRatio: 1,
                codeRadius: 0.5,
                codeMT: 180,
                posterBgUrl: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/haibao@2x.png',
                codeML: -100,
                desTextMT: 70,
                desTextML: 240,
            },
            posterBgFlag: true,
            simpleFlag: false
        }
    },
    mounted() {
        this.system = this.getSystem()
        this.posterShow()
    },
    methods: {
        // 展示海报
        posterShow() {
            this.canvasShow = true
            this.attrs = {
                marginLR: this.attrs.marginLR * this.systemScale,
                marginTB: this.attrs.marginTB * this.systemScale,
                innerLR: this.attrs.innerLR * this.systemScale,
                innerTB: this.attrs.innerTB * this.systemScale,
                radius: this.attrs.radius,
                fillColor: this.attrs.fillColor,
                posterRatio: this.attrs.posterRatio,
                posterImgUrl: this.attrs.posterImgUrl,
                title: this.attrs.title,
                titleFontSize: this.attrs.titleFontSize * this.systemScale,
                titleLineHeight: this.attrs.titleLineHeight * this.systemScale,
                posterCodeUrl: this.attrs.posterCodeUrl,
                codeWidth: this.attrs.codeWidth * this.systemScale,
                codeRatio: this.attrs.codeRatio,
                codeRadius: this.attrs.codeRadius,
                codeMT: this.attrs.codeMT * this.systemScale,
                codeName: this.attrs.codeName,
                codeNameMT: this.attrs.codeNameMT * this.systemScale,
                tips: this.attrs.tips,
                posterBgUrl: this.attrs.posterBgUrl,
                codeML: this.attrs.codeML * this.systemScale,
                desTextMT: this.attrs.desTextMT * this.systemScale,
                desTextML: this.attrs.desTextML * this.systemScale,
            }
            this.creatPoster(this.attrs)
        },
        async creatPoster(canvasAttr) {
            wx.showLoading({
                title: "生成海报中..."
            })
            const ctx = wx.createCanvasContext("myCanvas", this)
            ctx.draw()//清空之前的海报
            // 根据设备屏幕大小和距离屏幕上下左右距离，及圆角绘制背景
            this.roundRect(ctx, canvasAttr.marginLR, canvasAttr.marginTB, this.system.w - 2.1 * canvasAttr.marginLR, (this.scale * this.system.w) - 2.1 * canvasAttr.marginTB - 100, (this.system.w - 2.1 * canvasAttr.marginLR) * canvasAttr.radius, canvasAttr.fillColor);
            if (this.posterBgFlag) {
                await this.creatBgImg(ctx, canvasAttr)
            }
            this.creatTitleTwo(ctx, canvasAttr)
            let textY = this.creatTitle(ctx, canvasAttr)
            this.creatCode(ctx, canvasAttr, textY)
            wx.hideLoading()
        },
        roundRect(ctx, x, y, w, h, r, fillColor = '#ffffff') {
            ctx.save()
            ctx.beginPath()
            // 绘制左上角圆弧
            ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
            // 绘制border-top
            // 画一条线 x终点、y终点
            ctx.lineTo(x + w - r, y)
            // 绘制右上角圆弧
            ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
            // 绘制border-right
            ctx.lineTo(x + w, y + h - r)
            // 绘制右下角圆弧
            ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
            // 绘制左下角圆弧
            ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
            // 绘制border-left
            ctx.lineTo(x, y + r)
            // 填充颜色
            ctx.setFillStyle('#ffffff')
            ctx.fill()
            // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore 这个很重要 不然没办法保存
            ctx.clip()
        },
        // 获取设备信息
        getSystem() {
            let system = wx.getSystemInfoSync()
            this.scale = 667 / 375 //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
            this.systemScale = system.windowWidth / 375 //按照苹果留 375*667比例 其他型号手机等比例缩放 显示
            return {w: system.windowWidth, h: system.windowHeight}
        },
        // 生成海报背景图
        creatBgImg(ctx, canvasAttr) {
            let _this = this
            return new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: canvasAttr.posterBgUrl,
                    success(res) {
                        const imgAttr = res//海报背景展示图片信息
                        let scale = res.width / (_this.system.w - 2 * canvasAttr.marginLR)
                        ctx.drawImage(res.path, canvasAttr.marginLR, canvasAttr.marginTB, _this.system.w - 2 * canvasAttr.marginLR, (_this.scale * _this.system.w) - 2 * canvasAttr.marginTB - 100)
                        ctx.restore()
                        ctx.draw(true)
                        resolve()
                    },
                    fail(res) {
                        console.log("fail -> res", res)
                        uni.showToast({
                            title: "海报背景图下载异常",
                            duration: 2000,
                            icon: "none"
                        })
                    }
                })
            })
        },

        // 生成横向文本标题
        creatTitle(ctx, canvasAttr) {
            const title = this.$store.state.center.score + '次'
            ctx.restore() //恢复之前保存的绘图上下文
            ctx.save()
            ctx.fillStyle= "rgba(255, 52, 52, 1)";
            let metrics = ctx.measureText(title);
            let testWidth = metrics.width;
            ctx.setFontSize(40)
            let textY = this.drawText(ctx, title, (this.system.w - testWidth) / 2, (this.system.w - 2 * canvasAttr.marginLR - 2 * canvasAttr.innerLR) / canvasAttr.posterRatio + 2 * canvasAttr.innerLR + canvasAttr.marginTB, this.system.w - 2 * canvasAttr.marginLR - 2 * canvasAttr.innerLR, canvasAttr.titleLineHeight)
            ctx.draw(true)
            return textY
        },
        creatTitleTwo(ctx, canvasAttr) {
            const title = this.$store.state.center.name
            ctx.restore() //恢复之前保存的绘图上下文
            ctx.save()
            ctx.fillStyle= "rgba(0,0,0,1)";
            let metrics = ctx.measureText(title);
            let testWidth = metrics.width;
            ctx.setFontSize(26)
            let textY = this.drawText(ctx, title, (this.system.w - testWidth) / 2, (this.system.w - 2 * canvasAttr.marginLR - 2 * canvasAttr.innerLR - 50) / canvasAttr.posterRatio + 2 * canvasAttr.innerLR + canvasAttr.marginTB, this.system.w - 2 * canvasAttr.marginLR - 2 * canvasAttr.innerLR, canvasAttr.titleLineHeight)
            ctx.draw(true)
            return textY
        },
        // 生成纵向文本标题
        creatVerticalTitle(ctx, canvasAttr) {
            ctx.restore() //恢复之前保存的绘图上下文
            ctx.save()
            ctx.setFontSize(canvasAttr.titleFontSize)

            canvasAttr.title.forEach((element, i) => {
                this.drawText(ctx, element, canvasAttr.marginTB + canvasAttr.desTextML + i * 20, canvasAttr.marginLR + canvasAttr.desTextMT, 15, canvasAttr.titleLineHeight)
            });
            ctx.draw(true)
        },
        /**
         * @param {Object} ctx canvas上下文
         * @param {String} text 需要输入的文本
         * @param {Number} x X轴起始位置
         * @param {Number} y Y轴起始位置
         * @param {Number} maxWidth 单行最大宽度
         * @param {Number} lineHeight 行高
         */
        drawText(ctx, text, x, y, maxWidth = 375, lineHeight = 30) {
            let canvas = ctx.canvas;
            let arrText = text.split('');
            let line = '';
            for (let n = 0; n < arrText.length; n++) {
                let testLine = line + arrText[n];
                let metrics = ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, x, y);
                    line = arrText[n];
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
            return y
        },
        // 生成居中文本
        creatCodeText(ctx, canvasAttr, text, textY, fontSize = 14, fillStyle = "#2f1709") {
            ctx.setFontSize(fontSize)
            ctx.setFillStyle(fillStyle) //文字颜色：默认黑色
            let metrics = ctx.measureText(text);
            let testWidth = metrics.width;
            ctx.fillText(text, (this.system.w - testWidth) / 2, textY + canvasAttr.codeMT + this.system.w * canvasAttr.codeWidth + canvasAttr.codeNameMT + 10)
            // 小程序的名称end
        },
        // 小程序码
        creatCode(ctx, canvasAttr, textY) {
            const _this = this
            wx.getImageInfo({
                src: canvasAttr.posterCodeUrl,
                success(res) {
                    ctx.restore()
                    ctx.draw(true)
                    _this.roundRect(ctx, (_this.system.w - _this.system.w * canvasAttr.codeWidth) / 2 - 90, textY + canvasAttr.codeMT, _this.system.w * canvasAttr.codeWidth,
                        _this.system.w * canvasAttr.codeWidth * canvasAttr.codeRatio, (_this.system.w * canvasAttr.codeWidth * canvasAttr.codeRatio) * canvasAttr.codeRadius);
                    ctx.drawImage(res.path, (_this.system.w - _this.system.w * canvasAttr.codeWidth) / 2  - 90,
                        textY + canvasAttr.codeMT,
                        _this.system.w * canvasAttr.codeWidth,
                        _this.system.w * canvasAttr.codeWidth * canvasAttr.codeRatio)
                    ctx.restore()
                    ctx.draw(true)
                },
                fail(err) {
                    console.log(err)
                    uni.showToast({title: "海报生成失败", duration: 2000, icon: "none"})
                }
            })
        },
        // 保存到系统相册
        handleSaveCanvasImage() {

            const canvasAttr = this.attrs
            wx.showLoading({
                title: "保存中..."
            })
            let _this = this
            // 把画布转化成临时文件
            uni.canvasToTempFilePath({
                x: canvasAttr.marginLR,
                y: canvasAttr.marginTB,
                width: this.system.w - 2 * canvasAttr.marginLR, // 画布的宽
                height: (this.scale * this.system.w) - 2 * canvasAttr.marginTB - 100, // 画布的高
                destWidth: (this.system.w - 2 * canvasAttr.marginLR) * 5,
                destHeight: ((this.scale * this.system.w) - 2 * canvasAttr.marginTB - 100) * 5,
                canvasId: "myCanvas",
                success(res) {
                    //保存图片至相册
                    uni.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            wx.hideLoading()
                            uni.showToast({
                                title: "图片保存成功，可以去分享啦~",
                                duration: 2000,
                                icon: "none"
                            })
                            _this.handleCanvasCancel()
                        },
                        fail() {
                            uni.showToast({
                                title: "保存失败，稍后再试",
                                duration: 2000,
                                icon: "none"
                            })
                            wx.hideLoading()
                        }
                    })
                },
                fail(res) {
                    console.log("fail -> res", res)
                    uni.showToast({
                        title: "保存失败，稍后再试",
                        duration: 2000,
                        icon: "none"
                    })
                    wx.hideLoading()
                }
            }, this)
        },
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
    border: 0 !important;padding: 0!important;background-color: transparent!important;line-height: 0!important;
}
</style>
