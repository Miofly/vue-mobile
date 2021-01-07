<template>
    <view class="bg-black text-center padding-bottom-ten box full-width-height">

    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
    commonPost
} from '@/api'
@Component({})
export default class index extends Vue {
    posterConfig: any = {}

    async created () {
    	const data = await commonPost('http://xcx-yyhb.shortl.cn/api/back/login', { login: 'admin', password: '123456' })
    }
}
</script>
