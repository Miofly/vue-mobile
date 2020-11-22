<template>
    <view>
        <!--横向等分-->
        <view v-for="(item, index) in lists.slice(0,10)" :key="index">
            <view class="flex text-center margin-top bg-white of-hide">
                <view class="item flex align-center flex-wrap justify-center" style="color: blue;">
                    <view class="title" style="">{{ item.title }}</view>
                    <view class="">{{ item.author }}</view>
                </view>
                <view class="item margin-top" style="color: #26882f">
                    <view>{{ item.author }}</view>
                    <view class="flex">
                        <view class="item" style="height: 50px">
                            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                                     :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]" style="height: 50px"
                                     :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
                                <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                            </m-image>
                            <view>
                                qq
                            </view>
                        </view>
                        <view class="item" style="height: 50px">
                            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                                     :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]" style="height: 50px"
                                     :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
                                <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                            </m-image>
                            <view>
                                uc
                            </view>
                        </view>
                        <view class="item" style="height: 50px">
                            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                                     :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]" style="height: 50px"
                                     :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
                                <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                            </m-image>
                            <view>
                                baidu
                            </view>
                        </view>
                    </view>
                </view>
                <view class="item">
                        <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="height: 100px"
                                 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"
                                 :shape="['square', 'circle'][0]" :src="item.images[0]" bgColor="rgba(0, 0, 0, 1)">
                            <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                        </m-image>
                        <view class="titleTwo">
                            {{item.url}}
                        </view>
                </view>

            </view>
        </view>

        <!--一侧固定宽度-->
<!--        <view v-for="(item, index1) in lists.slice(3,6)" :key="index1">-->
<!--            <view style="display: flex;height: 50px;margin-top: 10px;overflow: hidden;background: white">-->
<!--                <view style="flex: 0 0 70%;color: blue">{{ item.title }}</view>-->
<!--                <view style="color: red">{{ item.desc }}</view>-->
<!--            </view>-->
<!--        </view>-->

<!--        <view v-for="(item, index2) in lists.slice(6,9)" :key="index2">-->
<!--            <view style="display: flex;margin-top: 10px;overflow: hidden;background: white">-->
<!--                <view style="flex: 0 0 70%;color: blue">-->
<!--                    <view>{{ item.title }}</view>-->
<!--                    <view style="color: red;display: flex;">-->
<!--                        <view style="flex: 1">{{ item.author }}</view>-->
<!--                        <view style="flex: 1">{{ item.category }}</view>-->
<!--                        <view style="flex: 1">{{ item.views }}</view>-->
<!--                    </view>-->
<!--                </view>-->
<!--                <view style="color: red">{{ item.author }}</view>-->
<!--            </view>-->
<!--        </view>-->

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { goodGirlData } from '@/api'

@Component({})
export default class listTemplate extends Vue {
    lists: any = []

    async created () {
        const data = await goodGirlData('Android', 1, 50) // 获取的数据
        this.lists = data.data
        console.log(this.$mio.mioRoot.gsh(this.lists))
    }
}
</script>

<style lang="scss">
.item {
    flex: 1;
    border-right: 1px solid red;
}
.title {
    color: #000;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.titleTwo {
    color: #000;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>
