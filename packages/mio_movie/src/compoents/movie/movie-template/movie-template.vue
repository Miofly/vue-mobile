<template>
	<view style="background: rgb(30, 40, 40);">
		<scroll-view style="background: rgb(30, 40, 40);">
			<!--当月最热电影-->
			<view style="border-bottom:2px solid #2c2c36;background: rgb(30, 40, 40);" class="padding-bottom">
				<view class="cu-list grid bg-black" :class="['col-' + 3,false?'':'no-border']"
					  style="background: rgb(30, 40, 40);">
					<view v-for="(item, index) in appyys" :key="index" @click="mvDetail(item.v_id)"
						  class="padding-left-right-sm">
						<view style="position: relative">
							<imgLoad style="height: 180px" :scroll-top="scrollTop" :image-src="item.img"
									 loading-mode="spin-circle"></imgLoad>

							<text style="position: absolute;bottom:60rpx;right: 10rpx;font-size: 12px;">
								{{item.tname}} {{item.v_lang}} {{item.update_info}}
							</text>
							<view style="color: #ccc;font-size: 14px;" class="padding-top-bottom-lg">{{item.title.length
								> 7
								?
								item.title.slice(0, 7) + '...' : item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="full-width text-center margin-top margin-bottom">
				<button @tap="backIndex" class="cu-btn" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					首页
				</button>
				<button @tap="beforePgae" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					上一页
				</button>
				<button class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					{{page}} / {{num}}
				</button>
				<button @tap="nextPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					下一页
				</button>
				<button @tap="lastPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					尾页
				</button>
			</view>
			<movie-footer style="background: rgb(30, 40, 40);"></movie-footer>
		</scroll-view>
	</view>
</template>

<script>
	/* eslint-disable */
    import {
        publicGet
    } from '@/api'

    export default {
        props: { // String Number Boolean Array Object Function || validator (value) {}
            mvType: { //
                type: Number,
                default: 1,
                required: false
            },

        },
        data() {
            return {
                appyys: [],
                num: 1,
                page: 1,
                scrollTop: 0
            }
        },
        onPageScroll({scrollTop}) {
            console.log(scrollTop)
            // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
            this.scrollTop = scrollTop
        },
        methods: {
            // beforePgae: tu.throttle(function () {
            //     if (this.page !== 1) {
            //         this.page = this.page - 1
            //         this.ssData()
            //     }
            // }, 1500),
            // nextPage: tu.throttle(function () {
            //     if (this.page !== this.num) {
            //         this.page = this.page + 1
            //         this.ssData()
            //     }
            // }, 1500),
            // lastPage: tu.throttle(function () {
            //     if (this.page !== this.num) {
            //         this.page = this.num
            //         this.ssData()
            //     }
            // }, 1500),
            // backIndex: tu.throttle(function () {
            //     if (this.page !== 1) {
            //         this.page = 1
            //         this.ssData()
            //     }
            // }, 1500),
            async ssData() {
                this.appyys = []
                // #ifdef H5
                // this.ui.showLoading()
                const data = await publicGet(`getHomeInfo.php?type=${this.mvType}&page=${this.page}`)
                uni.hideLoading()
                this.appyys = data.list
                // #endif
            },
            mvDetail(url) {
                // #ifdef H5
                localStorage.setItem('ssUrl', `getPlayInfo.php?v_id=${url}`)
                // #endif
                this.router.push({name: 'movieDetail'})
            },
        },
        async mounted() {
            // #ifdef H5
            // this.ui.showLoading()
            const data = await publicGet(`getHomeInfo.php?type=${this.mvType}&page=1`)
            uni.hideLoading()

            this.appyys = data.list

            this.num = Math.ceil(Number(data.pageInfo.pageTotal) / 12)
            console.log(this.num)
            // #endif
        },
    }
</script>

<style>
	page {
		background: rgb(30, 40, 40);
	}
</style>
