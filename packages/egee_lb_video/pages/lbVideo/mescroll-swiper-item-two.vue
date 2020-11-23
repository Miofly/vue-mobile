<template>
	<mescroll-uni ref="mescrollRef" top="0" :down="downOption" :textSize="16"
				  :up="upOption" @init="mescrollInit" @scroll="scroll"
				  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
		<view v-for="(item, index) in dataLists" :key="index"
			  @click="playVideo(item.vid, item.break_point_length, item.channel_id, item.cover_img, item.id, item.group_id)"
			  :class="[index%2==0? 'fl' :'fr']" :style="{margin: index%2==0 ? '10rpx 0 0 10rpx' : '10rpx 10rpx 0 0'}"
			  style="width: 48%;position: relative;height: 480rpx;border-radius: 2px;background: #DED7D0;overflow: hidden">
			<view>
				<view>
					<image :src="item.cover_img" :class="[false?'cu-avatar':'', false?'round': '']"
						   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]">
					</image>
				</view>

				<view style="background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
				z-index: 9999!important;padding: 10rpx 10rpx 10rpx 10rpx;
				position: absolute;bottom: 0;width: 100%;font-size: 20px;color: white;">
					{{ item.title.length> 13 ? item.title.slice(0, 13) + '...' : item.title }}
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from 'zj/mescroll-uni/mixins/mescroll-more-item.js'
    import {mapState} from 'vuex'
    import {
        commonPost
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array // tab菜单,此处用于取关键词
        },
        data() {
            return {
                downOption: { // 下拉刷新的配置参数
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                    bgColor: 'transparent',
                    textColor: 'gray',
                },
                upOption: { // 上拉加载的常用配置
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1条才显示无更多数据
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...',
                    bgColor: 'transparent',
                    textColor: 'gray',
                    page: {
                        num: 0,
                        size: 10
                    },
                    toTop: {
                        src: '/static/images/common/totop.png',
                        offset: 1000,
                        duration: 100,
                    },
                    empty: {
                        use: true,
                        icon: '/static/images/common/empty.jpg',
                        tip: '暂无相关数据',
                        // btnText: '这是按钮文字'
                    },
                    onScroll: true // 是否监听滚动事件
                },
                dataLists: [], // 数据列表
                scrollTop: 0, // 用于懒加载图片使用
                nowType: 'recommend' // 当前tab的类型
            }
        },
        methods: {
            playVideo(vid, break_point_length, channel_id, cover_img, id, group_id) {
                this.$store.state.isIndex = 1
                this.$store.state.indexStatusTwo = false

                localStorage.setItem('ldOneStatus', 0)
                localStorage.setItem('video_vid', vid)
                localStorage.setItem('break_point_length', break_point_length)
                localStorage.setItem('channel_id', channel_id)
                localStorage.setItem('cover_img', cover_img)
                localStorage.setItem('video_id', id)
                localStorage.setItem('group_id', group_id)
                this.$emit('changeVideo', vid, break_point_length, channel_id, cover_img, id, group_id)
            },
            scroll(e) { // 用于懒加载图片使用
                this.scrollTop = this.mescroll.scrollTop
            },
            downCallback() { // 下拉刷新的回调 默认重置上拉加载列表为第一页 自动执行 page.num=1, 再触发upCallback方法
                this.mescroll.resetUpScroll()
            },
            async upCallback(page) { // 上拉加载的回调
                this.nowType = this.tabs[this.i].id // 获取当前点击的tab的类型
                const pageNum = page.num // 页码
                const pageSize = page.size // 页长

                console.log('数据类型：', this.nowType, '|', '页码：', pageNum, '|', '页长：', pageSize)

                const data = await commonPost('/home/home_page', {
                    line_en: localStorage.getItem('line_en'),
                    channel_id: this.nowType,
                    page: pageNum,
                    page_size: pageSize
                }) // 获取的数据

                const curPageData = data.data.videoInfo.data // 当前页数据列表
                const curPageLen = curPageData.length // 当前页数据长度
                const totalSize = data.data.videoInfo.total // 总数据条数

                console.log(curPageData)

                if (page.num == 1) this.dataLists = [] // 第一页需手动置空列表
                this.dataLists = this.dataLists.concat(curPageData) // 追加新数据

                setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
                    this.mescroll.endDownScroll()
                    this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
                }, 500)
            },
            emptyClick() { // 点击空布局按钮的回调
                uni.showToast({
                    title: '点击了按钮'
                })
            }
        },
        computed: {
            ...mapState(['ldOneStatus', 'isIndex', 'rankStatus', 'indexStatusTwo', 'entryStatus', 'nowIndex']),
        },
    }
</script>

<style>
	/*>>> .origin-img{border-radius: 20rpx;}*/
</style>
