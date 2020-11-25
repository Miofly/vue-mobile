<template>
	<mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
				  @emptyclick="emptyClick" @init="mescrollInit"
				  @up="upCallback" ref="mescrollRef" top="0">

		<view class="padding" v-if="i==0">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						{{item.id}}-{{item.question}}
					</view>
				</view>
			</view>
			<view style="position: fixed; bottom: 200rpx;right: 10px;z-index: 9;">
				<image src="/static/images/video/change.png"
					   style="height: 115rpx;width: 115rpx;opacity: 0.7;z-index:99999"></image>
			</view>
		</view>

		<view class="padding" v-else-if="i==1">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						<view class="fulls-width" style="position: absolute;left: 0;top: 0;background: rgba(0, 0, 0, 0.3);
							z-index: 999;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;padding-bottom: 20rpx">
							<view class="margin-left-lg margin-top text-bold padding-right-sm text-white"
								  style="font-size: 36rpx;">
								<view class="text-white border-radius-xxxl text-center fl margin-right"
									  style="background: rgb(244, 57, 62);width: 90rpx;height: 55rpx;font-size: 14px;line-height: 55rpx"
									  v-if="(index == 0) || (index == 1)">
									热门
								</view>
								{{$mio.mioRoot.strEllipsis(item.title, 15)}}
							</view>
						</view>
						<!--#ifdef H5-->
						<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300" @tap="$mio.mioRoot.showImg(item.images[0])"
								 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
								 :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
							<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
						</m-image>
						<!--#endif-->
						<!--#ifdef MP-WEIXIN-->
						<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300" @tap="$mio.mioRoot.showImg(item.$orig.images[0])"
								 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
								 :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
							<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
						</m-image>
						<!--#endif-->
					</view>
					<button :data-break_point_length="item.break_point_length" :data-classify_id="item.classify_id"
							:data-cover_img="item.cover_img" :data-title="item.title"
							:data-vid="item.vid" :data-video_id="item.id"
							class="flex justify-between tm text-normal text-black fulls-width"
							open-type="share">
						<view class="text-left" style="flex: 1">
							<image :src="item.images[0]" class="round" style="width: 60rpx;height: 60rpx;"></image>
							<text class="padding-left-xxl"
								  style="line-height: 60rpx;height: 60rpx;vertical-align: text-bottom">
								{{$mio.mioRoot.strEllipsis(item.author, 8)}}的分享
							</text>
						</view>
						<view class="text-right" style="flex: 1.3;">
							<text>
								<text class="fa fa-eye"></text>
								<text class="margin-left-sm">{{String(item.views).slice(0, 2)}}万人看过</text>
							</text>
							<text class="margin-left">
								<text class="fa fa-weixin text-white text-center" style="background: rgb(0, 189, 0);border-radius: 50%;
								width: 50rpx;height: 50rpx;line-height: 50rpx"></text>
								<text class="margin-left-sm">{{String(item.likeCounts).slice(0, 2)}}万人转发</text>
							</text>
						</view>
					</button>
				</view>
			</view>
		</view>

		<view class="padding" v-else-if="i==2">
			<view class="u-waterfall"
				  style="display: flex;flex-direction: row;align-items: flex-start;margin-top: 10px">
				<view class="u-column" id="u-left-column" style="width: 50vw">
					<view :key="index" class="demo-warter" v-for="(item, index) in leftList">
						<view>
							<!--<image :src="item.images[0]" mode="widthFix" style="width: 100%"></image>-->
							<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
									 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									 :shape="['square', 'circle'][0]" :src="item.images[0] == undefined ? 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg' : item.images[0]" bgColor="rgba(0, 0, 0, 1)">
								<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
							</m-image>
						</view>
					</view>
				</view>
				<view class="u-column" id="u-right-column" style="width: 50vw">
					<view :key="index" class="demo-warter" v-for="(item, index) in rightList">
						<view>
							<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
									 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									 :shape="['square', 'circle'][0]" :src="item.images[0] == undefined ? 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg' : item.images[0]" bgColor="rgba(0, 0, 0, 1)">
								<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
							</m-image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="padding" v-else-if="i==3">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						<view class="fulls-width" style="position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, 0.3);
							z-index: 999;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;padding-bottom: 20rpx">
							<view class="margin-left-lg margin-top text-bold padding-right-sm text-white"
								  style="font-size: 36rpx;">
								<view class="text-white border-radius-xxxl text-center fl margin-right"
									  style="background: rgb(244, 57, 62);width: 90rpx;height: 55rpx;font-size: 14px;line-height: 55rpx"
									  v-if="(index == 0 && i==0) || (index == 1 && i==0)">
									热门
								</view>
								{{$mio.mioRoot.strEllipsis(item.title, 15)}}
							</view>
						</view>
						<view>
							<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
									 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									 :shape="['square', 'circle'][0]" :src="item.images[0] == undefined ? 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg' : item.images[0]" bgColor="rgba(0, 0, 0, 1)">
								<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
							</m-image>
							<image src="resources/images/video/bofang.png"
								   style="position: absolute;top: 50%; left: 50%; transform:translate(-50%,-50%);width: 130rpx;height: 130rpx;"></image>
						</view>
					</view>
					<button :data-break_point_length="item.break_point_length" :data-classify_id="item.classify_id"
							:data-cover_img="item.cover_img" :data-title="item.title"
							:data-vid="item.vid" :data-video_id="item.id"
							class="flex justify-between tm text-normal text-black fulls-width"
							open-type="share">
						<view class="text-left" style="flex: 1">
							<image :src="item.images[0]" class="round" style="width: 60rpx;height: 60rpx;"></image>
							<text class="padding-left-xxl"
								  style="line-height: 60rpx;height: 60rpx;vertical-align: text-bottom">
								{{$mio.mioRoot.strEllipsis(item.author, 8)}}的分享
							</text>
						</view>
						<view class="text-right" style="flex: 1.3;">
							<text>
								<text class="fa fa-eye"></text>
								<text class="margin-left-sm">{{String(item.views).slice(0, 2)}}万人看过</text>
							</text>
							<text class="margin-left">
								<text class="fa fa-weixin text-white text-center" style="background: rgb(0, 189, 0);border-radius: 50%;
								width: 50rpx;height: 50rpx;line-height: 50rpx"></text>
								<text class="margin-left-sm">{{String(item.likeCounts).slice(0, 2)}}万人转发</text>
							</text>
						</view>
					</button>
				</view>
			</view>
		</view>

		<view class="padding" v-else-if="i==4">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						<view class="fulls-width" style="position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, 0.3);
							z-index: 999;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;padding-bottom: 20rpx">
							<view class="margin-left-lg margin-top text-bold padding-right-sm text-white"
								  style="font-size: 36rpx;">
								<view class="text-white border-radius-xxxl text-center fl margin-right"
									  style="background: rgb(244, 57, 62);width: 90rpx;height: 55rpx;font-size: 14px;line-height: 55rpx"
									  v-if="(index == 0 && i==0) || (index == 1 && i==0)">
									热门
								</view>
								{{$mio.mioRoot.strEllipsis(item.title, 15)}}
							</view>
						</view>
						<view>
							<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
									 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									 :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
								<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
							</m-image>
							<image src="resources/images/video/bofang.png"
								   style="position: absolute;top: 50%; left: 50%; transform:translate(-50%,-50%);width: 130rpx;height: 130rpx;"></image>
						</view>
					</view>
					<button :data-break_point_length="item.break_point_length" :data-classify_id="item.classify_id"
							:data-cover_img="item.cover_img" :data-title="item.title"
							:data-vid="item.vid" :data-video_id="item.id"
							class="flex justify-between tm text-normal text-black fulls-width"
							open-type="share">
						<view class="text-left" style="flex: 1">
							<image :src="item.images[0]" class="round" style="width: 60rpx;height: 60rpx;"></image>
							<text class="padding-left-xxl"
								  style="line-height: 60rpx;height: 60rpx;vertical-align: text-bottom">
								{{$mio.mioRoot.strEllipsis(item.author, 8)}}的分享
							</text>
						</view>
						<view class="text-right" style="flex: 1.3;">
							<text>
								<text class="fa fa-eye"></text>
								<text class="margin-left-sm">{{String(item.views).slice(0, 2)}}万人看过</text>
							</text>
							<text class="margin-left">
								<text class="fa fa-weixin text-white text-center" style="background: rgb(0, 189, 0);border-radius: 50%;
								width: 50rpx;height: 50rpx;line-height: 50rpx"></text>
								<text class="margin-left-sm">{{String(item.likeCounts).slice(0, 2)}}万人转发</text>
							</text>
						</view>
					</button>
				</view>
			</view>

			<view style="position: fixed; bottom: 200rpx;right: 10px;z-index: 9;">
				<image src="/static/images/video/change.png"
					   style="height: 115rpx;width: 115rpx;opacity: 0.7;z-index:99999"></image>
			</view>
		</view>

		<view class="padding" v-else-if="i==7">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						<view class="fulls-width" style="position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, 0.3);
							z-index: 999;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;padding-bottom: 20rpx">
							<view class="margin-left-lg margin-top text-bold padding-right-sm text-white"
								  style="font-size: 36rpx;">
								<view class="text-white border-radius-xxxl text-center fl margin-right"
									  style="background: rgb(244, 57, 62);width: 90rpx;height: 55rpx;font-size: 14px;line-height: 55rpx"
									  v-if="(index == 0 && i==0) || (index == 1 && i==0)">
									热门
								</view>
								{{$mio.mioRoot.strEllipsis(item.title, 15)}}
							</view>
						</view>
						<view>
							<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
									 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
									 :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
								<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
							</m-image>
							<image src="resources/images/video/bofang.png"
								   style="position: absolute;top: 50%; left: 50%; transform:translate(-50%,-50%);width: 130rpx;height: 130rpx;"></image>
						</view>
					</view>
					<button :data-break_point_length="item.break_point_length" :data-classify_id="item.classify_id"
							:data-cover_img="item.cover_img" :data-title="item.title"
							:data-vid="item.vid" :data-video_id="item.id"
							class="flex justify-between tm text-normal text-black fulls-width"
							open-type="share">
						<view class="text-left" style="flex: 1">
							<image :src="item.images[0]" class="round" style="width: 60rpx;height: 60rpx;"></image>
							<text class="padding-left-xxl"
								  style="line-height: 60rpx;height: 60rpx;vertical-align: text-bottom">
								{{$mio.mioRoot.strEllipsis(item.author, 8)}}的分享
							</text>
						</view>
						<view class="text-right" style="flex: 1.3;">
							<text>
								<text class="fa fa-eye"></text>
								<text class="margin-left-sm">{{String(item.views).slice(0, 2)}}万人看过</text>
							</text>
							<text class="margin-left">
								<text class="fa fa-weixin text-white text-center" style="background: rgb(0, 189, 0);border-radius: 50%;
								width: 50rpx;height: 50rpx;line-height: 50rpx"></text>
								<text class="margin-left-sm">{{String(item.likeCounts).slice(0, 2)}}万人转发</text>
							</text>
						</view>
					</button>
				</view>
			</view>

			<view style="position: fixed; bottom: 200rpx;right: 10px;z-index: 9;">
				<image src="/static/images/video/change.png"
					   style="height: 115rpx;width: 115rpx;opacity: 0.7;z-index:99999"></image>
			</view>
		</view>

		<view class="padding" v-else>
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start"
				  v-for="(item, index) in dataLists">
				<view class="u-column margin-top">
					<view class="demo-warter margin-top-bottom" style="position: relative">
						<view class="fulls-width" style="position: absolute;left: 0;top: 0;background: rgba(0, 0, 0, 0.3);
							z-index: 999;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;padding-bottom: 20rpx">
							<view class="margin-left-lg margin-top text-bold padding-right-sm text-white"
								  style="font-size: 36rpx;">
								<view class="text-white border-radius-xxxl text-center fl margin-right"
									  style="background: rgb(244, 57, 62);width: 90rpx;height: 55rpx;font-size: 14px;line-height: 55rpx"
									  v-if="(index == 0) || (index == 1)">
									热门
								</view>
								{{$mio.mioRoot.strEllipsis(item.title, 15)}}
							</view>
						</view>

						<m-image :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300"
								 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
								 :shape="['square', 'circle'][0]" :src="item.images[0] == undefined ? 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg' : item.images[0]" bgColor="rgba(0, 0, 0, 1)">
							<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
						</m-image>

						<view>
							<image src="resources/images/video/bofang.png"
								   style="position: absolute;top: 50%; left: 50%; transform:translate(-50%,-50%);width: 130rpx;height: 130rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script lang="ts">
    import Component, { mixins } from 'vue-class-component'
    import { goodGirlData } from '@/api'
	import newData from 'json/zsQuestion.json'

    // #ifdef MP-WEIXIN
    // @ts-ignore
    import scrollMixins from '@/components/mescroll-uni/scroll-mixin'
	// #endif
	// #ifdef H5
	// @ts-ignore
    import scrollMixins from 'zj/mescroll-uni/scroll-mixin'
	import mescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
	// #endif
    import mImage from 'zj/m-image/m-image.vue'
    import mButton from 'zj/m-button/m-button.vue'


    @Component({
	    components: {
		    // #ifdef H5
		    mescrollUni,
		    mImage,
		    mButton
		    // #endif
	    }
    })
    export default class mescrollSwiper extends mixins(scrollMixins) {
        downOption: any = { // 下拉刷新的配置参数
            use: true, // 是否启用下拉刷新
            auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
            textInOffset: '下拉刷新',
            textOutOffset: '释放更新',
            textLoading: '正在拼命的加载中 ...',
            bgColor: 'transparent',
            textColor: 'gray',
            downSize: '16px'
        }

        upOption: any = { // 上拉加载的常用配置
            use: true, // 是否启用下拉刷新
            auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
            noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1条才显示无更多数据
            textLoading: '正在玩命的加载...',
            textNoMore: '我也是有底线的...',
            bgColor: 'transparent',
            textColor: 'gray',
            optSize: '16px',
            page: {
                num: 0,
                size: 10
            },
            toTop: {
                src: '/static/images/common/totop.png',
                offset: 1000,
                duration: 100
            },
            empty: {
                use: true,
                icon: '/static/images/common/empty.jpg',
                tip: '暂无相关数据',
                btnText: ''
            }
        }

        dataLists: any = [] // 数据列表
        rightList: any = [] // 数据列表
        leftList: any = [] // 数据列表
        nowType: string = '' // 当前tab的类型,
        scrollTop: number = 0 // 用于懒加载图片使用

        async upCallback (page) {
            this.nowType = this.tabLists[this.i].type // 获取当前点击的tab的类型
            const pageNum = page.num // 页码
            const pageSize = page.size // 页长
            console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)

            if (this.nowType == 'zdy') {
                const newSize = 30
                console.log(newData)
                const curPageData = page.num == 1 ? newData.slice(0, newSize) : newData.slice((page.num - 1) * newSize, page.num * newSize)
                const curPageLen = curPageData.length // 当前页数据长度
				const totalPage = Math.ceil(newData.length / newSize)
				console.log('总页数：', totalPage)
				console.log('当前页：', page.num)
                if (page.num == 1) { // 第一页需手动置空列表
                    this.dataLists = []
                }
                this.dataLists = this.dataLists.concat(curPageData) // 追加新数据

                setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
                    // this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
                    this.mescroll.endByPage(curPageLen, totalPage)

                }, 500)
            } else {
                const data = await goodGirlData(this.nowType, pageNum, pageSize) // 获取的数据

                const curPageData = data.data // 当前页数据列表
                const curPageLen = curPageData.length // 当前页数据长度
                const totalSize = data.total_counts // 总数据条数

                if (page.num == 1) { // 第一页需手动置空列表
                    this.dataLists = []
                    this.rightList = []
                    this.leftList = []
                }
                this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                for (let i = 0; i < curPageData.length; i++) {
                    if (i % 2 == 1) {
                        this.rightList = this.rightList.concat(curPageData[i])
                    } else {
                        this.leftList = this.leftList.concat(curPageData[i])
                    }
                }
                setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
                    this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
                }, 500)
			}
        }
    }
</script>

<style lang="scss" scoped>
	.u-column {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: auto;
	}

	button::after {
		border: 0 !important;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
	}

	/*>>> .easy-loadimage{width: 100%;}*/
	/*>>> .origin-img{border-radius: 20rpx;}*/
	/*>>> .loadfail-img, >>>.loading-img{height: 500rpx;}*/
</style>
