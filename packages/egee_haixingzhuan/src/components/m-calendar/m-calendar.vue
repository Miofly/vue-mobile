<template>
	<m-popup :border-radius="borderRadius" :closeable="closeable" :maskCloseAble="maskCloseAble" :popup="false"
			 :safeAreaInsetBottom="safeAreaInsetBottom"
			 :z-index="uZIndex" @close="close" length="auto" mode="bottom"
			 v-model="value">
		<view class="u-calendar">
			<view class="u-calendar__header">
				<view class="u-calendar__header__text" v-if="!$slots['tooltip']">
					{{toolTip}}
				</view>
				<slot name="tooltip" v-else />
			</view>
			<view class="u-calendar__action u-flex u-row-center">
				<view class="u-calendar__action__icon">
					<view class="fa fa-angle-double-left" style="font-size: 40rpx;color: #909399" @click="changeYearHandler(0)" v-if="changeYear"></view>
				</view>
				<view class="u-calendar__action__icon">
					<view class="fa fa-angle-left" style="font-size: 40rpx;color: #606266" @click="changeMonthHandler(0)" v-if="changeMonth"></view>
				</view>
				<view class="u-calendar__action__text">{{ showTitle }}</view>
				<view class="u-calendar__action__icon">
					<view class="fa fa-angle-right" style="font-size: 40rpx;color: #606266" @click="changeMonthHandler(1)" v-if="changeMonth"></view>
				</view>
				<view class="u-calendar__action__icon">
					<view class="fa fa-angle-double-right" style="font-size: 40rpx;color: #909399" @click="changeYearHandler(1)" v-if="changeYear"></view>
				</view>
			</view>
			<view class="u-calendar__week-day">
				<view :key="index" class="u-calendar__week-day__text" v-for="(item, index) in weekDayZh">{{item}}</view>
			</view>
			<view class="u-calendar__content">
				<!-- 前置空白部分 -->
				<block :key="index" v-for="(item, index) in weekdayArr">
					<view class="u-calendar__content__item"></view>
				</block>
				<view :class="{
					'u-hover-class':openDisAbled(year,month,index+1),
					'u-calendar__content--start-date': (mode == 'range' && startDate==`${year}-${month}-${index+1}`) || mode== 'date',
					'u-calendar__content--end-date':(mode== 'range' && endDate==`${year}-${month}-${index+1}`) || mode == 'date'
				}" :key="index" :style="{backgroundColor: getColor(index,1)}" @tap="dateClick(index)"
					  class="u-calendar__content__item"
					  v-for="(item, index) in daysArr">
					<view :style="{color: getColor(index,2)}" class="u-calendar__content__item__inner">
						<view>{{ index + 1 }}</view>
					</view>
					<view :style="{color:activeColor}" class="u-calendar__content__item__tips"
						  v-if="mode== 'range' && startDate==`${year}-${month}-${index+1}` && startDate!=endDate">
						{{startText}}
					</view>
					<view :style="{color:activeColor}" class="u-calendar__content__item__tips"
						  v-if="mode== 'range' && endDate==`${year}-${month}-${index+1}`">{{endText}}
					</view>
				</view>
				<view class="u-calendar__content__bg-month">{{month}}</view>
			</view>
			<view class="u-calendar__bottom">
				<view class="u-calendar__bottom__choose">
					<text>{{mode == 'date' ? activeDate : startDate}}</text>
					<text v-if="endDate">至{{endDate}}</text>
				</view>
				<view class="u-calendar__bottom__btn">
					<m-button :type="btnType" @click="btnFix(false)" shape="circle" size="default">确定</m-button>
				</view>
			</view>
		</view>
	</m-popup>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component({})
    export default class calendarIndex extends Vue {
        @Prop({ default: false, type: Boolean }) safeAreaInsetBottom?: boolean //
        @Prop({ default: true, type: Boolean }) maskCloseAble?: boolean // 是否允许通过点击遮罩关闭Picker
        @Prop({ default: true, type: Boolean }) changeYear?: boolean // 是否允许切换年份
        @Prop({ default: true, type: Boolean }) changeMonth?: boolean // 是否允许切换月份
        @Prop({ default: false, type: Boolean }) value?: boolean // 通过双向绑定控制组件的弹出与收起
        @Prop({ default: false, type: Boolean }) isChange?: boolean // 切换年月是否触发事件 mode=date时生效
        @Prop({ default: true, type: Boolean }) isActiveCurrent?: boolean // 当前选中日期带选中效果
        @Prop({ default: true, type: Boolean }) closeable?: boolean // 是否显示右上角的关闭图标

        @Prop({ default: '', type: String }) date?: string // date-单个日期选择，range-开始日期+结束日期选择
        @Prop({ default: '', type: String }) mode?: string // date-单个日期选择，range-开始日期+结束日期选择
        @Prop({ default: '#606266', type: String }) monthArrowColor?: string // 月份切换按钮箭头颜色
        @Prop({ default: '#909399', type: String }) yearArrowColor?: string // 年份切换按钮箭头颜色
        @Prop({ default: '#303133', type: String }) color?: string // 默认日期字体颜色
        @Prop({ default: '#2979ff', type: String }) activeBgColor?: string // 选中|起始结束日期背景色
        @Prop({ default: '#ffffff', type: String }) activeColor?: string // 选中|起始结束日期字体颜色
        @Prop({ default: 'rgba(41,121,255,0.13)', type: String }) rangeBgColor?: string // 范围内日期背景色
        @Prop({ default: '#2979ff', type: String }) rangeColor?: string // 范围内日期字体颜色
        @Prop({ default: '开始', type: String }) startText?: string // mode=range时生效，起始日期自定义文案
        @Prop({ default: '结束', type: String }) endText?: string // mode=range时生效，结束日期自定义文案
        @Prop({ default: 'primary', type: String }) btnType?: string // 按钮样式类型
        @Prop({ default: '选择日期', type: String }) toolTip?: string // 顶部的提示文字

        @Prop({ default: 0, type: [Number, String] }) zIndex?: number | string // 弹出的z-index值
        @Prop({ default: 2050, type: [Number, String] }) maxYear?: number | string // 可切换的最大年份
        @Prop({ default: 1950, type: [Number, String] }) minYear?: number | string // 可切换的最小年份
        @Prop({ default: '1950-01-01', type: [Number, String] }) minDate?: number | string // 最小可选日期(不在范围内日期禁用不可选)
        @Prop({ default: '2050-01-01', type: [Number, String] }) maxDate?: number | string // 最大可选日期 默认最大值为今天，之后的日期不可选 2030-12-31
        @Prop({ default: 20, type: [Number, String] }) borderRadius?: number | string // 弹窗顶部左右两边的圆角值


        // 星期几,值为1-7
        weekday: number = 1
        weekdayArr: any = []
        // 当前月有多少天
        days: number = 0
        daysArr: any = []
        showTitle: string = ''
        year: number = 2020
        month: number = 0
        day: number = 0
        startYear: number = 0
        startMonth: number = 0
        startDay: number = 0
        endYear: number = 0
        endMonth: number = 0
        endDay: number = 0
        today: string = ''
        activeDate: string = ''
        startDate: string = ''
        endDate: string = ''
        isStart: boolean = true
        min: any = null
        max: any = null
        weekDayZh: any = ['日', '一', '二', '三', '四', '五', '六']

        get dataChange () {
            return `${this.mode}-${this.minDate}-${this.maxDate}`
        }

        get uZIndex () {
            // 如果用户有传递z-index值，优先使用
            return this.zIndex ? this.zIndex : this.$mio.miocfg.popup
        }

        @Watch('dataChange', { immediate: false, deep: false })
        onChangeValue (val) {
            this.init()
        }

        created () {
            this.init()
        }

        getColor (index, type) {
            let color = type == 1 ? '' : this.color
            const day = index + 1
            const date = `${this.year}-${this.month}-${day}`
            const timestamp = new Date(date.replace(/\-/g, '/')).getTime()
            const start = this.startDate.replace(/\-/g, '/')
            const end = this.endDate.replace(/\-/g, '/')
            if ((this.isActiveCurrent && this.activeDate == date) || this.startDate == date || this.endDate == date) {
                color = type == 1 ? this.activeBgColor : this.activeColor
            } else if (this.endDate && timestamp > new Date(start).getTime() && timestamp < new Date(end).getTime()) {
                color = type == 1 ? this.rangeBgColor : this.rangeColor
            }
            return color
        }

        init () {
            const now = new Date()
            this.year = now.getFullYear()
            this.month = now.getMonth() + 1
            this.day = now.getDate()
            this.today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
            this.activeDate = this.today
            this.min = this.initDate(this.minDate)
            this.max = this.initDate(this.maxDate || this.today)
            this.startDate = ''
            this.startYear = 0
            this.startMonth = 0
            this.startDay = 0
            this.endYear = 0
            this.endMonth = 0
            this.endDay = 0
            this.endDate = ''
            this.isStart = true
            this.changeData()
        }

        // 日期处理
        initDate (date) {
            const fdate = date.split('-')
            return {
                year: Number(fdate[0] || 1920),
                month: Number(fdate[1] || 1),
                day: Number(fdate[2] || 1)
            }
        }

        openDisAbled (year, month, day) {
            let bool = true
            const date = `${year}/${month}/${day}`
            // let today = this.today.replace(/\-/g, '/');
            const min = `${this.min.year}/${this.min.month}/${this.min.day}`
            const max = `${this.max.year}/${this.max.month}/${this.max.day}`
            const timestamp = new Date(date).getTime()
            if (timestamp >= new Date(min).getTime() && timestamp <= new Date(max).getTime()) {
                bool = false
            }
            return bool
        }

        generateArray (start, end) {
            return Array.from(new Array(end + 1).keys()).slice(start)
        }

        formatNum (num) {
            return num < 10 ? `0${num}` : String(num)
        }

        // 一个月有多少天
        getMonthDay (year, month) {
            const days = new Date(year, month, 0).getDate()
            return days
        }

        getWeekday (year, month) {
            const date = new Date(`${year}/${month}/01 00:00:00`)
            return date.getDay()
        }

        checkRange (year) {
            let overstep = false
            if (year < this.minYear || year > this.maxYear) {
                uni.showToast({
                    title: '日期超出范围啦~',
                    icon: 'none'
                })
                overstep = true
            }
            return overstep
        }

        changeMonthHandler (isAdd) {
            if (isAdd) {
                const month = this.month + 1
                const year = month > 12 ? this.year + 1 : this.year
                if (!this.checkRange(year)) {
                    this.month = month > 12 ? 1 : month
                    this.year = year
                    this.changeData()
                }

            } else {
                const month = this.month - 1
                const year = month < 1 ? this.year - 1 : this.year
                if (!this.checkRange(year)) {
                    this.month = month < 1 ? 12 : month
                    this.year = year
                    this.changeData()
                }
            }
        }

        changeYearHandler (isAdd) {
            const year = isAdd ? this.year + 1 : this.year - 1
            if (!this.checkRange(year)) {
                this.year = year
                this.changeData()
            }
        }

        changeData () {
            this.days = this.getMonthDay(this.year, this.month)
            this.daysArr = this.generateArray(1, this.days)
            this.weekday = this.getWeekday(this.year, this.month)
            this.weekdayArr = this.generateArray(1, this.weekday)
            this.showTitle = `${this.year}年${this.month}月`
            if (this.isChange && this.mode == 'date') {
                this.btnFix(true)
            }
        }

        dateClick (day) {
            day += 1
            if (!this.openDisAbled(this.year, this.month, day)) {
                this.day = day
                const date = `${this.year}-${this.month}-${day}`
                if (this.mode == 'date') {
                    this.activeDate = date
                } else {
                    const compare = new Date(date.replace(/\-/g, '/')).getTime() < new Date(this.startDate.replace(/\-/g, '/')).getTime()
                    if (this.isStart || compare) {
                        this.startDate = date
                        this.startYear = this.year
                        this.startMonth = this.month
                        this.startDay = this.day
                        this.endYear = 0
                        this.endMonth = 0
                        this.endDay = 0
                        this.endDate = ''
                        this.activeDate = ''
                        this.isStart = false
                    } else {
                        this.endDate = date
                        this.endYear = this.year
                        this.endMonth = this.month
                        this.endDay = this.day
                        this.isStart = true
                    }
                }
            }
        }

        close () {
            // 修改通过v-model绑定的父组件变量的值为false，从而隐藏日历弹窗
            this.$emit('input', false)
        }

        getWeekText (date) {
            date = new Date(`${date.replace(/\-/g, '/')} 00:00:00`)
            const week = date.getDay()
            return `星期${['日', '一', '二', '三', '四', '五', '六'][week]}`
        }

        btnFix (show) {
            if (!show) {
                this.close()
            }
            if (this.mode == 'date') {
                const arr = this.activeDate.split('-')
                const year = this.isChange ? this.year : Number(arr[0])
                const month = this.isChange ? this.month : Number(arr[1])
                const day = this.isChange ? this.day : Number(arr[2])
                // 当前月有多少天
                const days = this.getMonthDay(year, month)
                const result = `${year}-${this.formatNum(month)}-${this.formatNum(day)}`
                const weekText = this.getWeekText(result)
                let isToday = false
                if (`${year}-${month}-${day}` == this.today) {
                    // 今天
                    isToday = true
                }
                this.$emit('change', {
                    year,
                    month,
                    day,
                    days,
                    result,
                    week: weekText,
                    isToday
                    // switch: show //是否是切换年月操作
                })
            } else {
                if (!this.startDate || !this.endDate) return
                const startMonth = this.formatNum(this.startMonth)
                const startDay = this.formatNum(this.startDay)
                const startDate = `${this.startYear}-${startMonth}-${startDay}`
                const startWeek = this.getWeekText(startDate)

                const endMonth = this.formatNum(this.endMonth)
                const endDay = this.formatNum(this.endDay)
                const endDate = `${this.endYear}-${endMonth}-${endDay}`
                const endWeek = this.getWeekText(endDate)
                this.$emit('change', {
                    startYear: this.startYear,
                    startMonth: this.startMonth,
                    startDay: this.startDay,
                    startDate,
                    startWeek,
                    endYear: this.endYear,
                    endMonth: this.endMonth,
                    endDay: this.endDay,
                    endDate,
                    endWeek
                })
            }
        }
    }
</script>

<style scoped lang="scss">
	.u-calendar {
		color: #606266;

		&__header {
			width: 100%;
			box-sizing: border-box;
			font-size: 30rpx;
			background-color: #fff;
			color: #303133;

			&__text {
				margin-top: 30rpx;
				padding: 0 60rpx;
				/* #ifndef APP-NVUE */
				display: flex;
				flex-direction: row;
				/* #endif */
				justify-content: center;
				align-items: center;
			}
		}

		&__action {
			padding: 40rpx 0 40rpx 0;

			&__icon {
				margin: 0 16rpx;
			}

			&__text {
				padding: 0 16rpx;
				color: #303133;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bold;
			}
		}

		&__week-day {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: row;
			/* #endif */
			align-items: center;
			justify-content: center;
			padding: 6px 0;
			overflow: hidden;

			&__text {
				flex: 1;
				text-align: center;
			}
		}

		&__content {
			width: 100%;
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: row;
			/* #endif */
			flex-wrap: wrap;
			padding: 6px 0;
			box-sizing: border-box;
			background-color: #fff;
			position: relative;

			&--end-date {
				border-top-right-radius: 8rpx;
				border-bottom-right-radius: 8rpx;
			}

			&--start-date {
				border-top-left-radius: 8rpx;
				border-bottom-left-radius: 8rpx;
			}

			&__item {
				width: 14.2857%;
				/* #ifndef APP-NVUE */
				display: flex;
				flex-direction: row;
				/* #endif */
				align-items: center;
				justify-content: center;
				padding: 6px 0;
				overflow: hidden;
				position: relative;
				z-index: 2;

				&__inner {
					height: 84rpx;
					/* #ifndef APP-NVUE */
					display: flex;
					flex-direction: row;
					/* #endif */
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 32rpx;
					position: relative;
					border-radius: 50%;

					&__desc {
						width: 100%;
						font-size: 24rpx;
						line-height: 24rpx;
						transform: scale(0.75);
						transform-origin: center center;
						position: absolute;
						left: 0;
						text-align: center;
						bottom: 2rpx;
					}
				}

				&__tips {
					width: 100%;
					font-size: 24rpx;
					line-height: 24rpx;
					position: absolute;
					left: 0;
					transform: scale(0.8);
					transform-origin: center center;
					text-align: center;
					bottom: 8rpx;
					z-index: 2;
				}
			}

			&__bg-month {
				position: absolute;
				font-size: 130px;
				line-height: 130px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: #e4e7ed;
				z-index: 1;
			}
		}

		&__bottom {
			width: 100%;
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: row;
			/* #endif */
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: #fff;
			padding: 0 40rpx 30rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #909399;

			&__choose {
				height: 50rpx;
			}

			&__btn {
				width: 100%;
			}
		}
	}
</style>
