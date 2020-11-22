<template>
	<view class="content">
		<button @tap="shareEvn" class="share-btn">生成主海报</button>
		<button @tap="shareEvn('simple')" class="share-btn">生成简单版海报</button>
		<!-- 分享弹窗-->
		<view class="share-pro">
			<view class="share-pro-mask" v-if="deliveryFlag"></view>
			<view :class="deliveryFlag?'open':'close'" class="share-pro-dialog">
				<view @tap="closeShareEvn" class="close-btn">
					<span class="font_family">&#xe81d;</span>
				</view>
				<view class="share-pro-title">分享</view>
				<view class="share-pro-body">
					<view class="share-item">
						<button open-type="share">
							<view class="font_family share-icon">&#xe786;</view>
							<view>分享给好友</view>
						</button>
					</view>
					<view @tap="handleShowPoster" class="share-item">
						<view class="font_family share-icon">&#xe600;</view>
						<view>生成分享图片</view>
					</view>
				</view>

			</view>
		</view>
		<hchPoster :canvasAttr.sync="posterObj" :posterBgFlag="true" :simpleFlag="simpleFlag"
				   @cancel="canvasCancel"
				   ref="hchPoster" />
	</view>
</template>

<script>
    /* eslint-disable */
    import hchPoster from "@/components/hch-poster/hch-poster.vue"

    export default {
        components: {
            hchPoster
        },
        data() {
            return {
                deliveryFlag: false,
                simpleFlag: false,//是否展示简单版海报
                // canvasFlag: true,//是否隐藏海报
                posterData: {//主板版海报
                    marginLR: 40,
                    marginTB: 40,
                    radius: 0.03,
                    innerLR: 20,
                    innerTB: 20,
                    posterRatio: 1.3,
                    posterImgUrl: "https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg",
                    title: "今日上新水果，牛奶草莓，颗粒饱满，每盒 200g",
                    titleFontSize: 16,
                    titleLineHeight: 25,
                    posterCodeUrl:  'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/temp/1024.png',
                    codeWidth: 0.3,
                    codeRatio: 1,
                    codeRadius: 0.5,
                    codeMT: 20,
                    codeName: "记忆之王",
                    codeNameMT: 20,
                    tips: "长按/扫描识别查看商品",
                    posterBgUrl: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg'
                },
                posterSimpleData: {//简单版的海报
                    marginLR: 40,
                    marginTB: 40,
                    radius: 0.05,
                    title: ["夏天的风", "带着这清香的果橙味"],
                    titleFontSize: 16,
                    titleLineHeight: 25,
                    posterCodeUrl: "https://huangchunhongzz.gitee.io/imgs/poster/code.png",
                    codeWidth: 0.2,
                    codeRatio: 1,
                    codeRadius: 0.5,
                    codeMT: 50,
                    posterBgUrl: 'https://huangchunhongzz.gitee.io/imgs/poster/poster_bg_3.png',
                    codeML: 140,
                    desTextMT: 70,
                    desTextML: 240,
                },
                posterObj: {}
            }
        },
        methods: {
            // 生成海报
            handleShowPoster() {
                // this.canvasFlag = false
                this.$refs.hchPoster.posterShow()
                this.deliveryFlag = false
            },
            // 分享弹窗
            shareEvn(type) {
                if (type === 'simple') {
                    this.simpleFlag = true
                    this.posterObj = this.posterSimpleData
                } else {
                    this.simpleFlag = false
                    this.posterObj = this.posterData
                }
                this.deliveryFlag = true
            },
            //关闭分享弹窗
            closeShareEvn() {
                this.deliveryFlag = false
            },
            //取消海报
            canvasCancel(val) {
                // this.canvasFlag = val
            }
        },
		onLoad () {
            wx.getImageInfo({
                src: '/static/images/common/empty.jpg',
                success(res) {
                    console.log(res, 1111111111)
                },
                fail(err) {
                    console.log(2222222, err)
                    uni.showToast({title: "海报生成失败", duration: 2000, icon: "none"})
                }
            })
            // wx.getImageInfo({
            //     src: '',
            //     success(res) {
            //        console.log(res)
            //     },
            //     fail(err) {
            //         console.log(111, err)
            //         uni.showToast({title: "海报生成失败", duration: 2000, icon: "none"})
            //     }
            // })
		}
    }
</script>

<style lang="scss">
	/* eslint-disable */
	/*每个页面公共css 放app.vue页面的 */
	@font-face {
		font-family: 'font_family';  /* project id 1991769 */
		src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot');
		src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff') format('woff'),
		url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.svg#iconfont') format('svg');
	}

	.font_family {
		font-family: "font_family" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	/* 按钮去掉边框 */
	button::after {
		border: none;
	}

	button {
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
		line-height: 1;
		color: #1c1c1c;
		font-size: 28rpx;
		background: none;
	}

	.button-hover {
		color: #1c1c1c;
		background: none;
	}

	.poster-img {
		width: 40%;
	}

	/*每个页面公共css */
	.content {
		text-align: center;
		height: 100%;
	}

	.share-btn {
		padding: 30rpx 60rpx;
		background-color: #007aff;
		color: #fff
	}

	.share-pro {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		z-index: 5;
		line-height: 1;
		box-sizing: border-box;

		.share-pro-mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
		}

		.share-pro-dialog {
			width: 750rpx;
			height: 310rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 24rpx 24rpx 0px 0px;
			position: relative;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;

			.close-btn {
				padding: 20rpx 15rpx;
				position: absolute;
				top: 0rpx;
				right: 29rpx;
			}

			.share-pro-title {
				font-size: 28rpx;
				color: #1c1c1c;
				padding: 28rpx 41rpx;
				background-color: #f7f7f7;
			}

			.share-pro-body {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-size: 28rpx;
				color: #1c1c1c;

				.share-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					justify-content: space-around;

					.share-icon {
						text-align: center;
						font-size: 70rpx;
						margin-top: 39rpx;
						margin-bottom: 16rpx;
						color: #42ae3c;
					}

					&:nth-child(2) {
						.share-icon {
							color: #ff5f33;
						}
					}
				}
			}
		}

		/* 显示或关闭内容时动画 */

		.open {
			transition: all 0.3s ease-out;
			transform: translateY(0);
		}

		.close {
			transition: all 0.3s ease-out;
			transform: translateY(310rpx);
		}
	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 10;
	}
</style>
