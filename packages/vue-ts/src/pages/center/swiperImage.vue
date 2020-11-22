<template>
    <view class="padding">
        <!--
        list: any = [
            { image: 'https://cdn.uviewui.com/uview/swiper/1.jpg', title: '昨夜星辰昨夜风，画楼西畔桂堂东' },
            { image: 'https://cdn.uviewui.com/uview/swiper/2.jpg', title: '身无彩凤双飞翼，心有灵犀一点通' },
            { image: 'https://cdn.uviewui.com/uview/swiper/3.jpg', title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳' }
        ]
        -->
        <m-swiper @click="() => {}" @change="() => {}" :height="250" :list="list" :title="true" :effect3d="true" :interval="3000"
                  :indicator-pos="['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottomCenter'][4]" :mode="['round', 'rect', 'number', 'none'][2]">
        </m-swiper>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class test extends Vue {
    list: any = [
        { image: 'https://cdn.uviewui.com/uview/swiper/1.jpg', title: '昨夜星辰昨夜风，画楼西畔桂堂东' },
        { image: 'https://cdn.uviewui.com/uview/swiper/2.jpg', title: '身无彩凤双飞翼，心有灵犀一点通' },
        { image: 'https://cdn.uviewui.com/uview/swiper/3.jpg', title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳' }
    ]
}
</script>

<style lang="scss" scoped>
.item {
    margin: 30rpx 0;
}
</style>
