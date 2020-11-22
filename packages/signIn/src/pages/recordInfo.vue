<template>
	<view class="bg-white padding-left-right-xxl padding-bottom-xxl">
		<m-form :model="model" :rules="[rules, ''][1]" ref="uForm" :errorType="errorType">

			<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
						 label-width="160" :label-position="['left', 'top'][0]" label="标题" prop="title">
				<m-input :clearable="true" :focus="true" maxlength="240" :border="false" placeholder="请输入标题" v-model="model.title"
						 placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]">
				</m-input>
			</m-form-item>


			<m-form-item :borderBottom="false" :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
						 :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
						 label="签到日期区间" label-width="240" left-icon="calendar-check-o" prop="dateInterval">
				<m-switch :activeValue="true" :disabled="false" :inactiveValue="false"
						  :loading="false" :size="['40', '60', '80'][0]"
						  @change="dateIntervalChange" active-color="#2979ff"
						  slot="right" v-model="dateIntervalChecked">
				</m-switch>
			</m-form-item>

			<view v-if="dateIntervalChecked">
				<m-form-item :borderBottom="false" :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="clock-o" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
							 label="签到开始日期" prop="startDate" label-width="240" :label-position="['left', 'top'][0]">
					<m-input v-model="model.startDate" placeholder="请选择签到开始日期" :clearable="true" :focus="true" maxlength="240" :border="false"
							 :select-open="startDateStatus" @click="startDateStatus = true" placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" type="select"></m-input>
				</m-form-item>

				<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="clock-o" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
							 label="签到结束日期" prop="endDate" label-width="240" :label-position="['left', 'top'][0]">
					<m-input v-model="model.endDate" placeholder="请选择签到结束日期" :clearable="true" :focus="true" maxlength="240" :border="false"
							 :select-open="endDateStatus" @click="endDateStatus = true" placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" type="select"></m-input>
				</m-form-item>
			</view>

			<m-form-item :borderBottom="false" :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
						 :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
						 label="签到时间区间" label-width="240" left-icon="calendar-plus-o" prop="timeInterval">
				<m-switch :activeValue="true" :disabled="false" :inactiveValue="false"
						  :loading="false" :size="['40', '60', '80'][0]"
						  @change="timeIntervalChange" active-color="#2979ff"
						  slot="right" v-model="timeIntervalChecked">
				</m-switch>
			</m-form-item>

			<view v-if="timeIntervalChecked">
				<view v-for="(item, index) in model.timeLists" :key="index">
					<view @tap="delTimeInterval(index)" class="fa text-xxl fa-minus-square-o margin-right text-red margin-top" style="vertical-align: middle" v-if="true"></view>

					<m-form-item :borderBottom="false" :required="false" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="clock-o" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="签到开始时间" prop="startTime" label-width="240" :label-position="['left', 'top'][0]">
						<m-input v-model="item.startTime" placeholder="请选择签到开始时间" :clearable="true" :focus="true" maxlength="240" :border="false"
								 :select-open="startTimeStatus" @click="openStartTime(index)" placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" type="select"></m-input>
					</m-form-item>

					<m-form-item :required="false" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="clock-o" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="签到结束时间" prop="endTime" label-width="240" :label-position="['left', 'top'][0]">
						<m-input v-model="item.endTime" placeholder="请选择签到结束时间" :clearable="true" :focus="true" maxlength="240" :border="false"
								 :select-open="endTimeStatus" @click="openEndTime(index)" placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" type="select"></m-input>
					</m-form-item>

				</view>

				<view class="padding-top-bottom-xl" @tap="addTimeInterval">
					<view class="fa text-xxl fa-plus-square-o margin-right text-blue" style="vertical-align: middle" v-if="true"></view>
					<text style="">添加签到时间段</text>
				</view>
			</view>

			<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
						 :borderBottom="false" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
						 label="签到项" label-width="200" left-icon="" prop="options">
				<m-switch :activeValue="true" :disabled="false" :inactiveValue="false"
						  :loading="false" :size="['40', '60', '80'][0]"
						  @change="optionsChange" active-color="#2979ff"
						  slot="right" v-model="optionsChecked">
				</m-switch>
			</m-form-item>

			<view v-if="optionsChecked">
				<view class="flex flex-wrap padding-bottom">
					<view style="border: 1px solid #2979ff;" class="padding-top-bottom-sm border-radius-lg padding-left-right-xl margin-top margin-left text-blue"
						  :class="[item.active ? 'active' : '']"
						  @tap="tagClick(index)" v-for="(item, index) in optionLists" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>

		</m-form>
		<m-picker v-model="startDateStatus" mode="time" :defaultTime="startDateDefault" @confirm="startDateConfirm" end-year="2099" :params="{ year: true, month: true, day: true, hour: false, minute: false, second: false }"></m-picker>
		<m-picker v-model="endDateStatus" mode="time" :defaultTime="endDateDefault" @confirm="endDateConfirm" end-year="2099" :params="{ year: true, month: true, day: true, hour: false, minute: false, second: false }"></m-picker>
		<m-picker v-model="startTimeStatus" mode="time" :defaultTime="startTimeDefault" @confirm="startTimeConfirm" end-year="2099" :params="{ year: false, month: false, day: false, hour: true, minute: true, second: false }"></m-picker>
		<m-picker v-model="endTimeStatus" mode="time" :defaultTime="endTimeDefault" @confirm="endTimeConfirm" end-year="2099" :params="{ year: false, month: false, day: false, hour: true, minute: true, second: false }"></m-picker>

		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][1]"
				  @tap="submit" class="text-white margin-top" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			创建签到
		</m-button>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        startDateStatus: boolean = false
        startDateDefault: string = this.$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })
        startDateConfirm (e) {
            console.log(`${e.year}年${e.month}月${e.day}日`)
            this.model.startDate = `${e.year}-${e.month}-${e.day} 00:00:00`
            this.startDateDefault = `${e.year}-${e.month}-${e.day}`
        }

        endDateStatus: boolean = false
        endDateDefault: string = this.$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })
        endDateConfirm (e) {
            console.log(`${e.year}年${e.month}月${e.day}日`)
            this.model.endDate = `${e.year}-${e.month}-${e.day} 23:59:59`
            this.endDateDefault = `${e.year}-${e.month}-${e.day}`
        }

        startTimeStatus: boolean = false
        startTimeDefault: string = '00:00'
        startTimeConfirm (e) {
            console.log(`${e.hour}时${e.minute}分`)
            this.model.timeLists[this.timeIndex].startTime = `${e.hour}:${e.minute}`
            // this.startTimeDefault = `${e.hour}:${e.minute}`
        }

        endTimeStatus: boolean = false
        endTimeDefault: string = '23:59'
        endTimeConfirm (e) {
            console.log(`${e.hour}时${e.minute}分`)
            this.model.timeLists[this.timeIndex].endTime = `${e.hour}:${e.minute}`
            // this.endTimeDefault = `${e.hour}:${e.minute}`
        }

        dateIntervalChecked: boolean = true
        dateIntervalChange (e) {
            console.log(e)
            this.dateIntervalChecked = e
        }

        timeIntervalChecked: boolean = true
        timeIntervalChange (e) {
            this.timeIntervalChecked = e
        }

        optionsChecked: boolean = true
        optionsChange (e) {
            this.optionsChecked = e
        }

        optionLists: any = [
            { name: '姓名', id: 1, active: true },
            { name: '手机号', id: 2, active: false },
        ]

        tagClick (index): void {
            this.optionLists[index].active = !this.optionLists[index].active
        }

        timeIndex: number = 0

        openStartTime (index): void {
            this.timeIndex = index
            this.startTimeStatus = true
        }

        openEndTime (index): void {
            this.timeIndex = index
            this.endTimeStatus = true
        }


        addTimeInterval (): void {
            this.model.timeLists.push({
                startTime: '00:00',
                endTime: '23:59',
            })
        }

        delTimeInterval (index): void {
            this.model.timeLists.splice(index, 1)
        }

        model: any = {
            title: '',
            startDate: `${this.$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })} 00:00:00`,
            endDate: `${this.$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: false, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })} 23:59:59`,
            timeLists: [
                {
                    startTime: '00:00',
                    endTime: '23:59',
                }
            ],
            options: ''
        }

        rules: any = {
            title: [
                {
                    required: true,
                    message: '请输入标题',
                    trigger: ['change', 'blur'],
                    // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
                    // validator: (rule, value, callback) => {
                    //     // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                    //     return this.$mio.mioTest.chinese(value);
                    // },
                }
            ]
        }

        errorType: any = ['message']

        onReady () {
            (this.$refs.uForm as any).setRules(this.rules)
        }

        submit () {
            (this.$refs.uForm as any).validate(valid => {
                if (valid) {
                    console.log(this.model)
                    const selectOpt = this.optionLists.filter(item => item.active == true)

					const options = Object.assign(this.model, { opts: selectOpt })

					this.$mio.mioRoot.replace(`/pages/modalOne/signIn/signInTemplate?option=${JSON.stringify(options)}`)

                } else {
                    console.log('验证失败')
                }
            })
        }

    }
</script>

<style lang="scss">
	.active {
		color: #FFFFFF!important;
		background-color: #2979ff!important;
	}
</style>
