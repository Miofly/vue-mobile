<template>
    <mescroll-uni :down="downOption" :up="upOption" @down="downCallback"
                  @emptyclick="emptyClick" @init="mescrollInit"
                  @up="upCallback" ref="mescrollRef" top="0" style="background: #ff5125!important;">
        <!--中奖晒单-->
        <view style="background: #ff5125!important;" class="text-white" v-for="(item, index) in dataLists" :key="index">
            <view v-if="index == 2 || index % 2 ==0 && index > 2">
                <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style=""></ad>
            </view>
            <view>
                <view class="flex justify-between fulls-width" style="padding: 30rpx 30rpx 10rpx 30rpx;">
                    <view class="width: 70vw">
                        <!--头像-->
                        <view class="cu-avatar" :class="[false ? 'radius' : 'round']"
                              :style="{backgroundImage: 'url('+ item.headimgurl +')'}"
                              style="width: 64rpx;height: 64rpx;position: relative">
                            <view style="color: rgba(73, 54, 43, 1);position: absolute;left: 75rpx;top: 0" class="text-14 text-white text-bold">{{item.nickname}}</view>
                            <view style="position: absolute;left: 75rpx;top: 22rpx">
                                <image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                                       src="/static/images/dingweei.png" style="width: 16rpx"></image>
                                <text class="text-12" style="color: rgba(255, 255, 255, 0.8);margin-left: 8rpx">{{ item.location }}</text>
                            </view>
                        </view>
                    </view>
                    <!--时间-->
                    <view style="color: rgba(255, 255, 255, 0.8);">
                        {{ item.create_at }}
                    </view>
                </view>
                <!--文字描述-->
                <view class="text-14" style="letter-spacing: 0px;color: rgba(255, 255, 255, 0.8);padding: 10rpx 0rpx 0 0;margin-right: 30rpx;margin-left: 30rpx">
                    {{item.content}}
                </view>
                <!--图片信息-->
                <view v-if="item.pic.length !== 2" class="flex justify-between fulls-width-height"
                      style="padding: 30rpx 30rpx 10rpx 30rpx;border-radius: 4px">
                    <view v-for="(itemOne, indexs) in item.pic" :key="indexs">
                        <image @click="$mio.mioRoot.showImg(itemOne)" style="width: 194rpx;height: 140rpx;border-radius: 8rpx" :src="itemOne"></image>
                    </view>
                </view>
                <view v-else class="flex justify-start" style="padding: 30rpx 30rpx 10rpx 30rpx;">
                    <view v-for="(itemTwo, index1) in item.pic" :key="index1" :style="{marginLeft: index1==1 ? 24 + 'rpx' : 0}">
                        <image @click="$mio.mioRoot.showImg(itemTwo)" style="width: 194rpx;height: 140rpx;border-radius: 8rpx" :src="itemTwo"></image>
                    </view>
                </view>
                <!--查看更多-->
                <view style="width: 92%;margin-left: 4%;height: 1px;background: rgba(255, 255, 255, 0.2);margin-top: 24rpx"></view>
            </view>

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
import { State } from 'vuex-class'


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
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    @State('cpgg', { namespace: 'root' }) cpgg


    downOption: any = { // 下拉刷新的配置参数
        use: false, // 是否启用下拉刷新
        auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
        textInOffset: '下拉刷新',
        textOutOffset: '释放更新',
        textLoading: '正在拼命的加载中 ...',
        bgColor: '#ff5125',
        textColor: 'gray',
        downSize: '16px'
    }

    upOption: any = { // 上拉加载的常用配置
        use: true, // 是否启用下拉刷新
        auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1条才显示无更多数据
        textLoading: '正在玩命的加载...',
        textNoMore: '',
        bgColor: '#ff5125',
        textColor: 'gray',
        optSize: '16px',
        page: {
            num: 0,
            size: 20
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

        const { data } = await commonGet(`/comment.html?uuid=${this.$store.state.center.uuid}&page=${pageNum}&number=${pageSize}`) // 获取的数据
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
