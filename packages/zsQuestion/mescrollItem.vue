<template>
	<mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
				  @emptyclick="emptyClick" @init="mescrollInit" @scroll="scrollOne"
				  @up="upCallback" ref="mescrollRef" top="120">
		<view class="padding" v-if="i==0">
			<view :key="index" style="display: flex;flex-direction: row;align-items: flex-start;"
				  v-for="(item, index) in dataLists">
				<view class="u-column">
					<view class="demo-warter" style="position: relative">
						<view>问：{{item.question}}</view>
						<view class="bg-blueOne radius" style="height: 3px"></view>
						<view class="text-red">答：{{item.answer}}</view>
					</view>
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script lang="ts">
    import Component, { mixins } from 'vue-class-component'
    import scrollMixins from 'zj/mescroll-uni/scroll-mixin'
    import newData from 'json/zsQuestion.json'

    	// #ifdef MP-WEIXIN
	// @ts-ignore
	import mescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
	// #endif
	// #ifdef H5
	// @ts-ignore
	import mescrollUni from 'zj/mescroll-uni/mescroll-uni.vue'
	// #endif
    import mImage from 'zj/m-image/m-image.vue'
    @Component({
	    components: {
		    mescrollUni,
		    // #ifdef H5
		    mImage
		    // #endif
	    }
    })
    export default class mescrollSwiper extends mixins(scrollMixins) {
        downOption: any = { // 下拉刷新的配置参数
            use: false, // 是否启用下拉刷新
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
                btnText: '这是按钮文字'
            }
        }

        dataLists: any = [] // 数据列表
        rightList: any = [] // 数据列表
        leftList: any = [] // 数据列表
        nowType: string = '' // 当前tab的类型,
        scrollTop: number = 0 // 用于懒加载图片使用

        scrollOne (e) { // 用于懒加载图片使用
            this.scrollTop = this.mescroll.scrollTop
        }

        upCallback (page) {
            this.nowType = this.tabLists[this.i].type // 获取当前点击的tab的类型
            const pageNum = page.num // 页码
            const pageSize = page.size // 页长
            console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)

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

            // this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
            this.mescroll.endByPage(curPageLen, totalPage)

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
