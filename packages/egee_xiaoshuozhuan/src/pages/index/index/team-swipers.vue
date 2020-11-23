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
		<!--团队长-->
		<view v-if="is_team_captain" class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view @click.native="tzMemRank(item.id, item.name)" v-for="(item, index) in dataLists" :key="index" class="cu-item">
				<view class="content">
					<view class="fl">{{index + 1}}</view>
					<view class="fl margin-left">{{item.name}}</view>
					<view class="fr text-red">总计费次数：{{item.total_click}}</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<view v-else class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view @click.native="department_id == item.id ? tzMemRank(item.id, item.name) : ''" v-for="(item, index) in dataLists" :key="index" class="cu-item">
				<view class="content">
					<view class="fl">{{index + 1}}</view>
					<view class="fl margin-left">{{item.name}}</view>
					<view class="fr text-red">总计费次数：{{department_id == item.id ? item.total_click : '*'}}</view>
				</view>
				<view v-show="department_id == item.id" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<!--&lt;!&ndash;普通人&ndash;&gt;-->
		<!--<view v-if="is_department_captain == false && is_team_captain == fasle" class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">-->
			<!--<view @click.native="tzMemRank(item.id, item.name)" v-for="(item, index) in dataLists" :key="index" class="cu-item">-->
				<!--<view class="content">-->
					<!--<view class="fl">{{index + 1}}</view>-->
					<!--<view class="fl margin-left">{{item.name}}</view>-->
					<!--<view class="fr text-red">总计费次数：{{item.total_click}}</view>-->
				<!--</view>-->
				<!--<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>-->
			<!--</view>-->
		<!--</view>-->
	</mescroll-uni>
</template>

<script>
    import {mapState} from 'vuex'
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from 'zj/mescroll-uni/mixins/mescroll-more-item.js'
    import {
        commonPost
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array, // tab菜单,此处用于取关键词
        },
        mounted() {
            if (localStorage.getItem('is_team_captain') == 0) {
                this.is_team_captain = false
            }
            if (localStorage.getItem('is_team_captain') == 1) {
                this.is_team_captain = true
            }
            if (localStorage.getItem('is_department_captain') == 0) {
                this.is_department_captain = false
            }
            if (localStorage.getItem('is_department_captain') == 1) {
                this.is_department_captain = true
            }
			this.department_id = localStorage.getItem('department_id')
        },
        data() {
            return {
                department_id: '',
                is_department_captain: '',
                url: '/team/department-list',
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                },
                // 上拉加载的常用配置
                upOption: {
                    use: true, // 是否启用上拉加载; 默认true
                    auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    empty: {
                        tip: '暂无相关数据'
                    },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...',
                    toTop: {
                        bottom: 200
                    },
                },
                dataLists: [],
                is_team_captain: ''
            }
        },
        methods: {
            tzMemRank(id, name) {
                // console.log(id)
                // this.router.push({name: 'memberRank', params: {department_id: id, name: name}})
                localStorage.setItem('teamId', id)
                localStorage.setItem('teamName', name)
                uni.navigateTo({
                    // url: `/pages/index/module/chart?id=${id}&name=${name}`
                    url: `/pages/index/module/memberRank`
                });
                // uni.navigateTo({
                //     url: `/pages/index/module/chart?department_id=${id}&name=${name}`
                // });
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
                setTimeout(async () => {
                    const data = await commonPost(this.url, {date_type: this.i + 1}) // 默认数据
					//
                    // const dataOne = await commonPost('/team/team-list', {date_type: this.i + 1}) // 默认数据

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


                    const curPageData = data.data.list
                    // console.log(curPageData, 'curPageData')
                    // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
                    const curPageLen = curPageData.length

                    if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                    this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                    // 请求成功,隐藏加载状态
                    // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    this.mescroll.endByPage(curPageLen, 1)
                    // 方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                    // this.mescroll.endBySize(curPageLen, totalSize);
                    // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                    // this.mescroll.endSuccess(curPageLen, hasNext);
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
