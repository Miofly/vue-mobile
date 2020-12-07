<template>
	<view>
		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]" open-type="getUserInfo"
				  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
				  @getuserinfo="getUserInfo" class="text-white" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			登录
		</m-button>

	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import {
    commonPost
} from '@/api'
@Component({})
export default class extends Vue {
	userInfos: any = {}

	created () {
		wx.getUserInfo({
			success: (res) => {
				console.log(res.userInfo)
			}
		})
	}

	getUserInfo (e) {
		this.userInfos = e.detail.userInfo
	}

}
</script>

<style>

</style>
