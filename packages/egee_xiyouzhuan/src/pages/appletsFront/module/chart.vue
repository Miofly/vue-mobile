<template>
	<view class="full-width-height bg-white">
		<view class="full-width text-xl text-center"
			  style="background: rgb(251, 207, 36);height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			<view>{{$mio.mioRoot.getLocalData('chartName')}}点击明细</view>
		</view>

		<view class="padding" style="border: 1px solid #eee">
			<view>今日视频总收益：{{total_clickOne}}</view>
			<scroll-view scroll-x>
				<m-lineChart :xData="dataOneHour" :yData="dataOneClick"></m-lineChart>
			</scroll-view>
		</view>
		<view class="padding" style="border: 1px solid #eee">
			<view>
				{{mytime}}总收益:{{total_clickTwo}}
				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][2]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
						  @tap="onShowDatePicker('range')" class="text-white fr" :customStyle="{fontSize: '14px', background: 'rgb(251, 207, 36)!important'}">
					<view class="fa text-xl fa-calendar-o margin-right-xxl " style="height: 50rpx" v-if="false"></view>
					选择日期范围
				</m-button>
			</view>
			<scroll-view scroll-x>
				<m-lineChart v-if="lineStatus" :width="lineWidth" :xData="dataTwoHour" :yData="dataTwoClick"></m-lineChart>
			</scroll-view>
		</view>

		<m-calendar v-model="showPicker" ref="calendar" @change="change" :mode="['date', 'range'][1]"
					start-text="开始" end-text="结束" range-color="#2979ff" active-bg-color="#2979ff"
					:minDate="''"
					:maxDate="$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })"
					range-bg-color="rgba(41,121,255,0.13)" btn-type="primary">
		</m-calendar>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
    import {
        appletsPost
    } from '@/api'

    @Component({})
    export default class personChart extends Vue {
        mytime: string = '七日'
        showPicker: boolean = false
        value: string = ''
        dataOneList: any = []
        dataTwoList: any = []
        dataOneHour: any = []
        dataOneClick: any = []
        dataTwoHour: any = []
        dataTwoClick: any = []
        total_clickOne: number = 0
        total_clickTwo: number|string = 0
        lineStatus: boolean = true
        lineWidth: string = '2300rpx'

        async mounted () {
            this.$mio.mioRoot.showLoading()
            const dataOne = await appletsPost('my/member-click-trend', { id: localStorage.getItem('chartId') })
            const dataTwo = await appletsPost('my/member-seven-click-trend', { id: localStorage.getItem('chartId') })
            uni.hideLoading()
            this.dataOneList = dataOne.data.list
            this.total_clickOne = dataOne.data.total_click
            this.dataTwoList = dataTwo.data.list
            this.total_clickTwo = dataTwo.data.total_click

            for (let i = 0; i < this.dataOneList.length; i++) {
                this.dataOneHour.push(this.dataOneList[i].trans_hour)
                this.dataOneClick.push(this.dataOneList[i].effective_click_total)
            }

            for (let i = 0; i < this.dataTwoList.length; i++) {
                this.dataTwoHour.push(this.dataTwoList[i].stat_date)
                this.dataTwoClick.push(parseInt(this.dataTwoList[i].effective_click_total)) // eslint-disable-line
            }
        }

        onShowDatePicker () {
            this.showPicker = true
        }

        async change (e) { // eslint-disable-line
            this.lineStatus = false
            this.total_clickTwo = ''
            this.dataTwoHour = []
            this.dataTwoClick = []


            this.showPicker = false
            this.$mio.mioRoot.showLoading()
            this.mytime = `${e.startDate.slice(5)}至${e.endDate.slice(5)}`


            const data = await appletsPost('my/member-days-click-trend', {
                startDate: e.startDate,
                endDate: e.endDate,
                id: localStorage.getItem('chartId')
            })
            uni.hideLoading()
            const dataListTwo = data.data.list
            this.lineStatus = true

            if (dataListTwo.length <= 7) {
                this.lineWidth = '2300rpx'
            } else {
                this.lineWidth = `${dataListTwo.length * 50}px`
            }

            this.total_clickTwo = data.data.total_click

            for (let i = 0; i < dataListTwo.length; i++) {
                this.dataTwoHour.push(dataListTwo[i].stat_date.slice(5))
                this.dataTwoClick.push(parseInt(dataListTwo[i].effective_click_total)) // eslint-disable-line
            }
        }
    }
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

</style>
