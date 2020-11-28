<template>
	<!--
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度;
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,
	只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni ref="mescrollRef" height="90%" top="0" bottom="100" :down="downOption"
				  :up="upOption" @init="mescrollInit"
				  @down="downCallback" @up="upCallback" @emptyclick="emptyClick" style="background: white">
		<!-- 数据列表 -->
		<view v-for="(item, index) in dataLists" :key="index" class="flex justify-between align-center"
		      style="height: 126rpx;border-bottom: 1px solid #eee">
			<view class="" style="width: 75%">
				<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
				       src="/static/images/lz/zhifubao@2x.png"
				       style="width: 60rpx;margin-top: 12rpx" class="fl margin-left"></image>
				<view class="fl margin-left">
					<view style="color: #333333;font-size: 16px;">支付宝提现 金额：{{ item.money }}元</view>
					<view v-if="i<3" style="font-size: 14px;color: #999999">
						{{ i==0? '待完成' : i == 1 ? '失败': '成功' }}
					</view>
					<view v-else>
						{{ item.status==0 || item.status==2 ? '待完成' : item.status==1||item.status==3 ? '失败': '成功' }}
					</view>
				</view>

			</view>
			<view class="margin-right">
				<view v-if="i<3" style="font-size: 16px;color: #333333;">
					{{ i==0? '待完成' : i == 1 ? '失败': '成功' }}
				</view>
				<view v-else>
					{{ item.status==0 || item.status==2 ? '待完成' : item.status==1||item.status==3 ? '失败': '成功' }}
				</view>
				<view style="font-size: 14px;color: #999999;width: 100%">
					{{ item.create_at.slice(5) }}
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
/* eslint-disable */
	import { mapState } from 'vuex'
    import MescrollMixin from '../../../components/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from '../../../components/mescroll-uni/mixins/mescroll-more-item.js'
    import {
        commonPost
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array, // tab菜单,此处用于取关键词
	        tabIndex: Number
        },
        mounted () {
            // if (this.$store.state.teamControl) {
			//
            // }
        },
        data () {
            return {
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
					// bgColor: 'white',

                },
                // 上拉加载的常用配置
                upOption: {
                    use: true, // 是否启用上拉加载; 默认true
                    auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    empty: {
                        tip: '暂无相关数据'
                    },
	                toTop: {
		                src: '/static/images/common/totop.png',
		                offset: 100,
		                duration: 100
	                },
	                page: {
	                    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
	                    size: 10 // 每页数据的数量,默认10
	                },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...'
                },
                dataLists: []
            }
        },
        methods: {
            /* 下拉刷新的回调 */
            downCallback () {
                // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                this.mescroll.resetUpScroll()
            },
            /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
            async upCallback (page) {
                setTimeout(async () => {
                    const data = await commonPost('/my/withdraw_list', { status: this.i, page: page.num, per_page: page.size}) // 默认数据
                    const curPageData = data.data.data
                    const curPageLen = curPageData.length
	                // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
	                const last_page = curPageData.length
                    if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                    this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                    this.mescroll.endByPage(curPageLen, last_page)
                }, 500)
            },
            // 点击空布局按钮的回调
            // emptyClick() {
            //     uni.showToast({
            //         title: '点击了按钮,具体逻辑自行实现'
            //     })
            // }
        },
		computed: {
		    ...mapState(['teamControl']),
		},
    }
</script>
