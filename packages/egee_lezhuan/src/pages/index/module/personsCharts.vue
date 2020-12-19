<template>
	<view class="full-width-height bg-white">
		<view class="full-width bg-red text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<!--<view @click="router.replace({name: 'personCharts'})" class="fa fa-angle-left fa-2x fl margin-left"-->
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			<view>点击明细</view>
		</view>

		<view class="padding" style="border: 1px solid #eee">
			<view>今日视频{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}：{{total_clickOne}}</view>
			<scroll-view scroll-x>
				<lineChart :xData="dataOneHour" :yData="dataOneClick"></lineChart>
			</scroll-view>
		</view>
		<view class="padding" style="border: 1px solid #eee">
			<view>
				{{mytime}}{{tu.getLocalData('isMoney') == 1 ? '总收入' : '总计费次数'}}:{{total_clickTwo}}
				<button @tap="onShowDatePicker('range')" class="cu-btn fr" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						style="width:250rpx">

					<text class="fa fa-calendar-o padding-right" :disabled=false></text>
					<span class="">选择日期范围</span>

				</button>

			</view>
			<scroll-view scroll-x>
				<lineChart  v-if="lineStatus" :width="lineWidth" :xData="dataTwoHour" :yData="dataTwoClick"></lineChart>
			</scroll-view>
		</view>

		<datepicker :show="showPicker" type="range" :value="value" :show-tips="false" :begin-text="'开始'"
					:end-text="'结束'"
					:show-seconds="false" @confirm="saveTimeRange" @cancel="showPicker = false"/>
	</view>
</template>

<script>
    import {
        commonPost,
    } from '@/api'
    import {dateUtils} from '../../../common/js/dateUtils'
    export default {
        async mounted() {
            this.ui.showLoading()
            const dataOne = await commonPost('/my/member-click-trend')
            const dataTwo = await commonPost('/my/member-seven-click-trend')
			uni.hideLoading()
            this.dataOneList = dataOne.data.list
            this.total_clickOne = dataOne.data.total_click
            this.dataTwoList = dataTwo.data.list
            this.total_clickTwo = dataTwo.data.total_click

            for (let i = 0; i < this.dataOneList.length; i++) {
                this.dataOneHour.push(this.dataOneList[i].trans_hour)
                this.dataOneClick.push(Number(this.dataOneList[i].effective_click_total))
            }

            for (let i = 0; i < this.dataTwoList.length; i++) {
                this.dataTwoHour.push(this.dataTwoList[i].stat_date)
                this.dataTwoClick.push(Number(this.dataTwoList[i].effective_click_total))
            }
			// console.log(this.dataTwoHour)
			// console.log(this.dataTwoClick)
        },
        data() {
            return {
                mytime: '七日',
                showPicker: false,
                value: '',

                dataOneList: [],
                dataTwoList: [],
                dataOneHour: [],
                dataOneClick: [],
                dataTwoHour: [],
                dataTwoClick: [],
                total_clickOne: 0,
                total_clickTwo: 0,
                lineStatus: true,
                lineWidth: '2300rpx'
            }
        },
		methods: {
            onShowDatePicker () {
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
                this.dataTwoHour = []
                this.dataTwoClick = []

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
                    endDate: endTime
                })
                uni.hideLoading()
                const dataListTwo = data.data.list
                this.lineStatus = true

                if (dataListTwo.length <= 7 ) {
                    this.lineWidth = '2300rpx'
                } else {
                    this.lineWidth = dataListTwo.length * 50 + 'px'
                }

                this.total_clickTwo = data.data.total_click

                for (let i = 0; i < dataListTwo.length; i++) {
                    this.dataTwoHour.push(dataListTwo[i].stat_date.slice(5))
                    this.dataTwoClick.push(parseInt(dataListTwo[i].effective_click_total))
                }
            },
		},
    }
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

</style>
