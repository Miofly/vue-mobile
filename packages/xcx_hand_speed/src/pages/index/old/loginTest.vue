<template>
	<view>
		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
		          :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]" open-type="getUserInfo"
		          :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
		          @getuserinfo="getuserinfo" class="text-white" :customStyle="{fontSize: '14px'}">
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
	created () {

	}

	getuserinfo (infos) {
		console.log(infos)
	}

	login () {
		wx.login({
			success: async (res) => {
				if (res.code) {
					// console.log(res.code)
					const { data } = await commonPost('https://ceshiapi-xcx.idoujia.cn/api/user/save', { xcx_id: 999, code: res.code })
					console.log(data.data.openid)
				} else {
					console.log(`登录失败！${res.errMsg}`)
				}
			}
		})
	}

}
</script>

<style>

</style>
