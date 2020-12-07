<template>
	<view>

		<m-count-down :fontSize="50" :separator="['colon', 'zh'][0]" :showBorder="false"
		              :showDays="false" bg-color="rgb(250, 250, 250)" border-color="#303133"
		              :timestamp="['60', '86400', '983272', '1'][3]" :showMinutes="false"
		              class="" color="#303133" ref="uCountDown" :showHours="false"
		              separator-color="#303133" @end="end"></m-count-down>
		<text>{{millisecond < 10 ? `0${millisecond}` : millisecond}}</text>
	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	millisecond: number = 99
	millisecondTimer: any = null

	created () {
		this.millisecondTimer = setInterval(() => {
			if (this.millisecond == 0) {
				this.millisecond = 99
			}
			this.millisecond -= 1
		}, 5)
	}

	end () {
		clearInterval(this.millisecondTimer)
		const tempTimer = setInterval(() => {
			this.millisecond -= 1
			if (this.millisecond == 0) {
				this.millisecond = 0
				clearInterval(tempTimer)
			}
		}, 5)
	}

	login () {
		wx.login({
			success (res) {
				if (res.code) {
					console.log(res.code)
					// 发起网络请求
					// wx.request({
					// 	url: 'https://test.com/onLogin',
					// 	data: {
					// 		code: res.code
					// 	}
					// })
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
