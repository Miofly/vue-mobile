<template>
	<mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
				  @emptyclick="emptyClick" @init="mescrollInit" @scroll="scrollOne"
				  @up="upCallback" ref="mescrollRef" top="0">
		<view :class="[false?'sm-border':'', false?'card-menu margin-top':'']" class="cu-list menu"
			  style="border-top: 0px" >
			<view v-for="(item, index) in dataLists" :key="index" class="cu-item" style="line-height: 50px">
				<view class="content">
					<view class="fl" style="line-height: 50px;">{{index + 1}}</view>
					<view class="fl margin-left">{{item.member_name}}<br> <span style="font-size: 14px">{{item.team_name}}</span></view>
					<view class="fr " style="line-height: 50px;color:#F41032">总收益：{{item.effective_click_total}}</view>
				</view>
				<view v-show="false" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script lang="ts">
    import { appletsPost } from '@/api'
    import { State } from 'vuex-class'
    import Component, { mixins } from 'vue-class-component'
    import scrollMixins from 'zj/mescroll-uni/scroll-mixin'
    // #ifdef H5
    import mescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
    // #endif
    import mImage from 'zj/m-image/m-image.vue'

    @Component({
        components: {
            // #ifdef H5
            mescrollUni,
            // #endif
            mImage
        }
    })
    export default class mescrollSwiper extends mixins(scrollMixins) {
        @State('jfcs', { namespace: 'xcx' }) jfcs

        downOption: any = { // 下拉刷新的配置参数
            use: true, // 是否启用下拉刷新
            auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
            textInOffset: '下拉刷新',
            textOutOffset: '释放更新',
            textLoading: '正在拼命的加载中 ...',
            bgColor: 'transparent',
            textColor: 'gray',
            downSize: '12px'
        }

        upOption: any = { // 上拉加载的常用配置
            use: true, // 是否启用下拉刷新
            auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
            noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1条才显示无更多数据
            textLoading: '正在玩命的加载...',
            textNoMore: '我也是有底线的...',
            bgColor: 'transparent',
            textColor: 'gray',
            optSize: '12px',
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

        mounted () {
            // console.log(getAge('1995-09-26'))
        }

        scrollOne (e) { // 用于懒加载图片使用
            this.scrollTop = this.mescroll.scrollTop
        }

        tzMemRank (id, name) {
            localStorage.setItem('teamId', id)
            localStorage.setItem('teamName', name)
            uni.navigateTo({
                url: '/pages/appletsFront/module/memberRank'
            })
        }


        async upCallback (page) {
            this.nowType = this.tabLists[this.i].type // 获取当前点击的tab的类型
            const pageNum = page.num // 页码
            const pageSize = page.size // 页长
            console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)

            const data = await appletsPost('team/member-ranking', { date_type: this.i + 1, page: pageNum, per_page: pageSize }) // 默认数据

            const curPageData = data.data.list // 当前页数据列表
            const curPageLen = curPageData.length // 当前页数据长度
            const totalSize = data.total // 总数据条数
            this.$store.state.xcx.jfcs = data.data.total_click


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
                this.mescroll.endByPage(curPageLen, 1) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
            }, 500)
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
