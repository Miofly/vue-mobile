<template>
	<view class="">
		<!--
			show: boolean = true
        	change (e): void {
   			    	console.log(e.startDate)
   			    	console.log(e.endDate)
   			    }
			}
		-->
		<m-calendar v-model="show" ref="calendar" @change="change" :mode="['date', 'range'][1]"
					start-text="开始" end-text="结束" range-color="#2979ff" active-bg-color="#2979ff"
					:minDate="$mio.mioTime.dateShift({ time: 7, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })"
					:maxDate="$mio.mioTime.dateShift({ time: -7, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })"
					range-bg-color="rgba(41,121,255,0.13)" btn-type="primary">
		</m-calendar>

	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class test extends Vue {
        show: boolean = true

        change (e): void {
        	console.log(e.startDate)
        	console.log(e.endDate)
        }
	}
</script>

<style lang="scss" scoped>
</style>
