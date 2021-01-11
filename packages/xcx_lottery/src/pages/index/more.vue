<template>
    <mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
                  @emptyclick="emptyClick" @init="mescrollInit"
                  @up="upCallback" ref="mescrollRef" top="0" style="background: #ff5125!important;width: 100vw">
        <!--中奖晒单-->
        <view style="border-radius: 16rpx" class="text-white" v-for="(item, index) in dataLists" :key="index">
            <view class="flex justify-between fulls-width" style="border-radius: 8px;padding: 30rpx 30rpx 10rpx 30rpx;">
                <view class="width: 70vw">
                    <!--头像-->
                    <text class="cu-avatar" :class="[false ? 'radius' : 'round']"
                          :style="{backgroundImage: 'url('+ item.headimgurl +')'}"
                          style="width: 64rpx;height: 64rpx;position: relative">
                        <view style="color: rgba(73, 54, 43, 1);position: absolute;left: 75rpx;top: 0" class="text-14 text-white text-bold">{{item.nickname}}</view>
                        <view style="position: absolute;left: 75rpx;top: 22rpx">
                            <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                                   src="/static/images/dingweei.png" style="width: 16rpx"></image>
                            <text class="text-12" style="color: rgba(255, 255, 255, 0.8);margin-left: 8rpx">{{ item.location }}</text>
                        </view>
                    </text>
                </view>
                <!--时间-->
                <view style="color: rgba(255, 255, 255, 0.8);">
                    {{ item.create_at }}
                </view>
            </view>
            <!--文字描述-->
            <view class="text-14" style="letter-spacing: 0px;color: rgba(255, 255, 255, 0.8);padding: 0 30rpx">
                {{item.content}}
            </view>
            <!--图片信息-->
            <!--                <view v-if="item.pic.length !== 2" class="flex justify-between" style="width: 628rpx;position: absolute;top: 340rpx;left: 32rpx">-->
            <!--                    <view v-for="(item, index) in 3" :key="index">-->
            <!--                        <m-image duration="0" :showLoading="false" :borderRadius="0" bgColorError="rgba(0, 0, 0, 1)"-->
            <!--                                 style="width: 194rpx;height: 140rpx"-->
            <!--                        		:shape="['square', 'circle'][0]" :src="baseConfig.baseSrc" bgColor="rgba(0, 0, 0, 1)">-->
            <!--                        	<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
            <!--                        </m-image>-->
            <!--                    </view>-->
            <!--                </view>-->
            <!--                <view v-else class="flex justify-start" style="width: 628rpx;position: absolute;top: 340rpx;left: 32rpx">-->
            <!--                    <view v-for="(item, index) in item.pic" :key="index" :style="{marginLeft: index==1 ? 24 + 'rpx' : 0}">-->
            <!--                        <m-image duration="0" :showLoading="false" :borderRadius="0" bgColorError="rgba(0, 0, 0, 1)"-->
            <!--                                 style="width: 194rpx;height: 140rpx"-->
            <!--                                 :shape="['square', 'circle'][0]" :src="baseConfig.baseSrc" bgColor="rgba(0, 0, 0, 1)">-->
            <!--                            <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
            <!--                        </m-image>-->
            <!--                    </view>-->
            <!--                </view>-->
            <!--查看更多-->
            <view style="width: 92%;margin-left: 4%;height: 1px;background: rgba(254, 65, 17, 0);margin-top: 24rpx"></view>
        </view>
    </mescroll-uni>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { commonGet } from '@/api'
import newData from 'json/zsQuestion.json'

// #ifdef MP-WEIXIN
// @ts-ignore
import scrollMixins from '@/components/mescroll-uni/scroll-mixin' // eslint-disable-line
// #endif
// #ifdef H5
// @ts-ignore
import scrollMixins from 'zj/mescroll-uni/scroll-mixin' // eslint-disable-line
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
        textNoMore: '',
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
        const pageNum = page.num // 页码
        const pageSize = page.size // 页长

        const { data } = await commonGet(`comment.html?uuid=63&page=${pageNum}&number=${pageSize}`) // 获取的数据
        const curPageData = data.list // 当前页数据列表
        const curPageLen = curPageData.length // 当前页数据长度
        const totalSize = data.count // 总数据条数

        if (page.num == 1) { // 第一页需手动置空列表
            this.dataLists = []
        }
        this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
        setTimeout(() => { // 接口请求太快，展示数据样式延迟500ms,要不太丑
            this.mescroll.endByPage(curPageLen, totalSize) // 接口返回的是否有下一页 总页数/总数据量/是否有下一页
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
