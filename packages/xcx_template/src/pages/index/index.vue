<template>
    <view :style="{backgroundImage: 'url('+ baseConfig.bg +')'}" class="text-center xcx_bg" style="">

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { commonPost, commonGet } from '@/api'

@Component({})
export default class index extends Vue {
    baseConfig: any = {
        baseSrc: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
        bg: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg'
    }

    created () {
        console.log('初始化 created:')

    }
}
</script>

<style>
.xcx_bg {
    background-size: 100% 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 30px;
    background-repeat: no-repeat
}
</style>
