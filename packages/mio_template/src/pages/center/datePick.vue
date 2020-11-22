<template>
	<view class="">
		<view class="center">
			<view class="text-center">{{ input ? input : 'Picker值' }}</view>
			<m-button :customStyle="{fontSize: '14px'}" :disabled="false" :hairLine="true" :loading="false"
			          :plain="false"
			          :ripple="true" :shape="['square', 'circle'][1]"
			          :size="['default', 'medium', 'mini'][1]"
			          :type="['default', 'primary', 'error', 'warning', 'success'][2]" @tap="show=true"
			          class="text-white">
				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
				单列
			</m-button>
			<!--单列选择-->
			<!-- show: boolean = false
				 input: string = ''
				 defaultTime: string = this.$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })
				 confirm (e) {
					 console.log(`${e.year}年${e.month}月${e.day}日`)
					 this.input = `${e.year}年${e.month}月${e.day}日`
					 this.defaultTime = `${e.year}-${e.month}-${e.day}`
				 }
			-->
		</view>
		<m-picker :defaultTime="defaultTime" :params="{ year: true, month: true, day: true, hour: false, minute: false, second: false }" @confirm="confirm" end-year="2099" mode="time"
		          v-model="show"></m-picker>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class test extends Vue {
	show: boolean = false
	input: string = ''
	defaultTime: string = this.$mio.mioTime.dateShift({
		time: 0,
		showDate: true,
		showTime: false,
		noSign: false,
		noSpace: false,
		monthNum: 'no',
		showYear: true,
		china: false
	})

	confirm (e) {
		console.log(`${e.year}年${e.month}月${e.day}日`)
		this.input = `${e.year}年${e.month}月${e.day}日`
		this.defaultTime = `${e.year}-${e.month}-${e.day}`
	}
}
</script>

<style lang="scss" scoped>
.input {
	border: 1px solid #c0c4cc;
	border-radius: 4px;
	margin-bottom: 20px;
	height: 30px;
	font-size: 26 rpx;
	flex: 1;
}

.input-wrap {
	display: flex;
}
</style>
