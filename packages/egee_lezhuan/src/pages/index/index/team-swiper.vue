<template>
	<!--
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度;
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,
	只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni ref="mescrollRef" height="90%" top="0" bottom="100" :down="downOption"
				  :up="upOption" @init="mescrollInit"
				  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表 -->
		<view v-if="is_team_captain" class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']" >
			<view v-for="(item, index) in dataLists" :key="index" class="cu-item" style="line-height: 50px">
				<view @click="tzChart(item.uid, item.true_name)" class="content">
					<view class="fl" style="line-height: 50px;">{{index + 1}}</view>
					<view class="fl margin-left">{{item.true_name}}<br> <span style="font-size: 14px">{{item.department_name}}</span></view>
					<view class="fr text-red" style="line-height: 50px;">{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}：{{item.effective_click_total}}</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<view v-else class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']" >
			<view @click="item.uid == memberId ? tzChart(item.uid, item.true_name) : ''" v-for="(item, index) in dataLists" :key="index"
				  class="cu-item">
				<view class="content">
					<view class="fl" style="line-height: 50px;">{{index + 1}}</view>
					<view class="fl margin-left">{{item.true_name}}<br> <span style="font-size: 14px">{{item.department_name}}</span></view>
					<view class="fr text-red" style="line-height: 50px;">{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}：{{item.uid == memberId ? item.effective_click_total : '*'}}</view>
				</view>
				<view v-show="item.uid == memberId" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import {mapState} from 'vuex'
    import MescrollMixin from '../../../components/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from '../../../components/mescroll-uni/mixins/mescroll-more-item.js'
    import {
        commonPost
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array, // tab菜单,此处用于取关键词
        },
        async created () {
            if (localStorage.getItem('is_team_captain') == 0) {
                this.is_team_captain = false
            }
            if (localStorage.getItem('is_team_captain') == 1) {
                this.is_team_captain = true
            }
			console.log(localStorage.getItem('is_team_captain'))

            this.memberId = localStorage.getItem('memberId')
        },
        data() {
            return {
                memberId: '',
                url: '/team/team-list',
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
					// bgColor: 'white'
                },
                is_team_captain: '',
                // 上拉加载的常用配置
                upOption: {
                    // bgColor: 'white',
                    use: true, // 是否启用上拉加载; 默认true
                    auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    empty: {
                        tip: '暂无相关数据'
                    },
                    page: {
                        num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                        size: 20 // 每页数据的数量,默认10
                    },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...',
                    toTop: {
                        bottom: 200
                    },
                },

                dataLists: [],
                total_click: 0,
            }
        },
        methods: {
            async tzChart(id, name) {
                // this.router.push({name: 'chart', params: {id: id, name: name}})
                localStorage.setItem('chartId', id)
                localStorage.setItem('chartName', name)
                uni.navigateTo({
                    // url: `/pages/index/module/chart?id=${id}&name=${name}`
                    url: `/pages/index/module/chart`
                });
                // uni.navigateTo({
                //     url: `/pages/index/module/chart?id=${id}&name=${name}`
                // });

                // const data = await commonPost('/my/member-click-trend', {id: id})
				console.log(id)
            },
            /* 下拉刷新的回调 */
            downCallback() {
                // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
                // loadSwiper();
                // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                this.mescroll.resetUpScroll()
            },
            /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
            async upCallback(page) {
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条
                // 联网加载数据
				setTimeout(async () => {
                    const data = await commonPost(this.url, {date_type: this.i + 1, page: pageNum, per_page: pageSize}) // 默认数据
                    const curPageData = data.data.data
					if (this.i == 0) {
					    this.$store.state.teamClickOne = data.data.total_click
					}
                    if (this.i == 1) {
                        this.$store.state.teamClickTwo = data.data.total_click
                    }
                    if (this.i == 2) {
                        this.$store.state.teamClickThree = data.data.total_click
                    }
                    if (this.i == 3) {
                        this.$store.state.teamClickFour = data.data.total_click
                    }

                    this.$store.state.teamClick = data.data.total_click

                    const last_page = data.data.last_page
                    // 接口返回的当前页数据列表 (数组)
                    const curPageLen = curPageData.length
                    if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                    this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                    // 请求成功,隐藏加载状态
                    // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    this.mescroll.endByPage(curPageLen, last_page)
                }, 500)
            },
            // 点击空布局按钮的回调
            emptyClick() {
                uni.showToast({
                    title: '点击了按钮,具体逻辑自行实现'
                })
            }
        },
		computed: {
		    ...mapState(['teamControl', 'teamClickOne', 'teamClickTwo', 'teamClickThree', 'teamClickFour']),
		},
    }
</script>

<style>
	>>> .mescroll-uni-content{padding-bottom: 250px}
</style>
