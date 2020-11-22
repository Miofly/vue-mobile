const DAY_TIME = 86400000 // 一天的时间

const dateShift = (time) => new Date(new Date().getTime() - time * DAY_TIME) // 控制时间在多少天前/后

const monthDayShift = (monthNum, dayNum) => new Date(new Date(new Date().setMonth(new Date().getMonth() - monthNum)).setDate(dayNum)) // 控制月/日

const today = dateShift(0) // 今天
const yesterdayTime = dateShift(1) // 昨天
const beforeYesterdayTime = dateShift(2) // 前天
const beforeSevenDays = dateShift(7) // 七天前
const beforeThirtyDays = dateShift(30) // 三十天前
const tomorrowTime = dateShift(-1) // 昨天
const afterTomorrowTime = dateShift(-2) // 前天
const afterSevenDay = dateShift(-7) // 七天前
const afterThirtyDays = dateShift(-30) // 三十天前

const beforeWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) - 6) // 上周第一天
const thisWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 1) // 本周第一天
const afterWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 8) // 下周第一天

const beforeWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7)) // 上周最后一天
const thisWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 7) // 本周最后一天
const afterWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 14) // 下周最后一天

const beforeHalfYearFirstDay = monthDayShift(6, 1) // 前半年的第一天
const beforeThirdMonthFirstDay = monthDayShift(3, 1) // 前三个月的第一天
const beforeTwoMonthFirstDay = monthDayShift(2, 1) // 前两个月的第一天
const beforeMonthFirstDay = monthDayShift(1, 1) // 上月的第一天
const thisMonthFirstDay = monthDayShift(0, 1) // 本月月的第一天
const afterMonthFirstDay = monthDayShift(-1, 1) // 下个月的第一天

const beforeHalfYearLastDay = monthDayShift(5, 0) // 半年前的最后一天
const beforeThirdMonthLastDay = monthDayShift(2, 0) // 上三个月的最后一天
const beforeTwoMonthLastDay = monthDayShift(1, 0) // 上两个月的最后一天
const beforeMonthLastDay = monthDayShift(0, 0) // 上月的最后一天
const thisMonthLastDay = monthDayShift(-1, 0) // 本月的最后一天
const afterMonthLastDay = monthDayShift(-2, 0) // 下个月的最后一天

const timeUtils = {
    // 时间转换
    dateShift ({ time = 0, showDate = true, showTime = true, showYear = true, sign = '-', noSign = false, noSpace = false, monthNum = 'no', china = false }) {
        if (monthNum != 'no') {
            const timeDate = this.monthDayShift(monthNum, time)
            let newDate = noSign ? (showYear ? timeDate.getFullYear() : '') + this.addZero(timeDate.getMonth() + 1) + this.addZero(timeDate.getDate()) : (showYear ? timeDate.getFullYear() + sign : '') + this.addZero(timeDate.getMonth() + 1) + sign + this.addZero(timeDate.getDate())
            const tempTime = timeDate.toTimeString().split(' ')[0] // eslint-disable-line
            let newTime = noSign ? tempTime.replace(/:/g, '') : tempTime // eslint-disable-line

            if (china) {
                newDate = `${(showYear ? `${timeDate.getFullYear()}年` : '') + (timeDate.getMonth() + 1)}月${timeDate.getDate()}日`
                newTime = `${tempTime.split(':')[0]}时${tempTime.split(':')[1]}分${tempTime.split(':')[2]}秒`
                if (showDate && !showTime) {
                    return newDate
                }
                if (showTime && !showDate) {
                    return newTime
                }
                return noSpace ? `${newDate}${newTime}` : `${newDate} ${newTime}`
            }
            if (showDate && !showTime) {
                return newDate
            }
            if (showTime && !showDate) {
                return newTime
            }
            return noSpace ? `${newDate}${newTime}` : `${newDate} ${newTime}`
        }
        const timeDate = new Date(new Date().getTime() - time * DAY_TIME)
        let newDate = noSign ? (showYear ? timeDate.getFullYear() : '') + this.addZero(timeDate.getMonth() + 1) + this.addZero(timeDate.getDate()) : (showYear ? timeDate.getFullYear() + sign : '') + this.addZero(timeDate.getMonth() + 1) + sign + this.addZero(timeDate.getDate())
        const tempTime = timeDate.toTimeString().split(' ')[0] // eslint-disable-line
        let newTime: any = noSign ? tempTime.replace(/:/g, '') : tempTime // eslint-disable-line

        if (china) {
            newDate = `${(showYear ? `${timeDate.getFullYear()}年` : '') + (timeDate.getMonth() + 1)}月${timeDate.getDate()}日`
            newTime = `${tempTime.split(':')[0]}时${tempTime.split(':')[1]}分${tempTime.split(':')[2]}秒`
            if (showDate && !showTime) {
                return newDate
            }
            if (showTime && !showDate) {
                return newTime
            }
            return noSpace ? `${newDate}${newTime}` : `${newDate} ${newTime}`
        }
        if (showDate && !showTime) {
            return newDate
        }
        if (showTime && !showDate) {
            return newTime
        }
        return noSpace ? `${newDate}${newTime}` : `${newDate} ${newTime}`
    },

    monthDayShift (monthNum, dayNum) {
        return new Date(new Date(new Date().setMonth(new Date().getMonth() - monthNum)).setDate(dayNum))
    },
    // 数字不满10补0
    addZero (str) {
        let num
        str >= 10 ? num = str : num = `0${str}`
        return num
    }
}

export default timeUtils
