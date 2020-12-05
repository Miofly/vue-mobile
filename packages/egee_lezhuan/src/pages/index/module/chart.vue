<template>
	<view class="bg-white" ref="header">
		<view class="full-width bg-red text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<view>{{name}}的点击趋势</view>
		</view>
		<view class="padding-sm">
			<view>
				今日视频{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}：{{total_click}}
			</view>
			<scroll-view scroll-x style="border-radius: 10px">
				<lineChart :xData="xData" :yData="yData"></lineChart>
			</scroll-view>
		</view>

		<view style="background: #eee;height: 10rpx"></view>

		<view class="padding-sm">
			<view>
				{{mytime}}视频{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}：{{total_clickTwo}}
				<button @tap="onShowDatePicker('range')" class="cu-btn fr" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						style="width:250rpx">

					<text class="fa fa-calendar-o padding-right" :disabled=false></text>
					<span class="">选择日期范围</span>

				</button>

			</view>
			<scroll-view scroll-x style="border-radius: 10px">
				<lineChart v-if="lineStatus" :width="lineWidth" :xData="xDataTwo" :yData="yDataTwo"></lineChart>
			</scroll-view>
		</view>
		<datepicker ref="mydate" :show="showPicker" type="range" :value="value" :show-tips="false" :begin-text="'开始'"
					:end-text="'结束'"
					:show-seconds="false" @confirm="saveTimeRange" @cancel="showPicker = false"/>
	</view>
</template>

<script>
    import {dateUtils} from '../../../common/js/dateUtils'

    import {
        commonPost
    } from '@/api'

    export default {
        data() {
            return {
                mytime: '七日',
                showPicker: false,
                value: '',
                xData: [],
                yData: [],
                total_click: 0,
                xDataTwo: [],
                yDataTwo: [],
                total_clickTwo: 0,
                name: '',
                lineStatus: true,
                lineWidth: '2300rpx'
            }
        },
        async onLoad(e) {
            this.name = localStorage.getItem('chartName')
            this.ui.showLoading()
            const data = await commonPost('/my/member-click-trend', {id: localStorage.getItem('chartId')})
            const dataTwo = await commonPost('/my/member-seven-click-trend', {id: localStorage.getItem('chartId')})

            uni.hideLoading()
            const dataList = data.data.list
            this.total_click = data.data.total_click
            for (let i = 0; i < dataList.length; i++) {
                this.xData.push(dataList[i].tarns_hour)
                this.yData.push(dataList[i].effective_click_total)
            }
            console.log(dataTwo)

            const dataListTwo = dataTwo.data.list
            this.total_clickTwo = dataTwo.data.total_click
            for (let i = 0; i < dataListTwo.length; i++) {
                this.xDataTwo.push(dataListTwo[i].stat_date.slice(5))
                this.yDataTwo.push(parseInt(dataListTwo[i].effective_click_total))
            }
        },
        methods: {
            onShowDatePicker() {
                this.showPicker = true
            },
            async saveTimeRange(e) {

                var startTime = e.value[0].replace(/\//g, '-')
                var endTime = e.value[1].replace(/\//g, '-')

                if (Number(e.value[1].replace(/\//g, '')) > dateUtils.timeFun({ymr: true})) {
                    this.ui.showToast('结束时间不得超过今日')
                    return
                }

                this.lineStatus = false
                this.total_clickTwo = ''
                this.xDataTwo = []
                this.yDataTwo = []

                // var num = (new Date(e.date[1]).getTime() - new Date(e.date[0]).getTime()) / 3600 / 24 /1000
                // if (num > 60) {
                //     this.ui.showToast('时间范围不得超过60天')
                //     return
                // }

                this.mytime = startTime.slice(5) + '至' + endTime.slice(5)
                this.showPicker = false
                this.ui.showLoading()
                const data = await commonPost('/my/member-days-click-trend', {
                    startDate: startTime,
                    endDate: endTime,
                    id: localStorage.getItem('chartId')
                })
                uni.hideLoading()
                const dataListTwo = data.data.list
                this.lineStatus = true
				if (dataListTwo.length <= 7 ) {
				    this.lineWidth = '2300rpx'
				} else {
                    this.lineWidth = dataListTwo.length * 50 + 'px'
				}
                console.log(this.lineWidth)
                this.total_clickTwo = data.data.total_click
                for (let i = 0; i < dataListTwo.length; i++) {
                    this.xDataTwo.push(dataListTwo[i].stat_date.slice(5))
                    this.yDataTwo.push(parseInt(dataListTwo[i].effective_click_total))
                }
            },
        },
    }
</script>

<style>

</style>
