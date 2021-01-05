创建一个新`Date`对象

    let now = 
new Date();

语法

    
new Date()

new Date(value)

new Date(dateString)

new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);

*   year：表示年份的整数值。 0到99会被映射至1900年至1999年，其它值代表实际年份。
*   monthIndex：是从“0”开始计算的，这就意味着一月份为“0”，十二月份为“11”
*   当Date作为构造函数调用并传入多个参数时，如果数值大于合理范围时（如月份为 13 或者分钟数为 70），相邻的数值会被调整。比如 
new Date(2013, 13, 1)等于
new Date(2014, 1, 1)，它们都表示日期2014-02-01（注意月份是从0开始的）
*   如果提供了至少两个参数，day默认是1
*   以一个函数的形式来调用 Date 对象（即不使用 new 操作符）会返回一个代表当前日期和时间的字符串。
*       Date()"Sat Nov 23 2019 10:15:03 GMT+0800 (中国标准时间)" === 
new Date()Sat Nov 23 2019 10:15:09 GMT+0800 (中国标准时间)
    

`**Date.UTC(year, monthIndex, day, hours, minutes, seconds, milliseconds)**` 方法接受的参数同日期构造函数接受最多参数时一样，返回从1970-1-1 00:00:00 UTC到指定日期的的毫秒数。

**`Date.now()`** 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。

`**Date.parse()**` 方法解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为NaN。

    ​Date.UTC(1970, 0, 1, 0, 0, 3) // 3000​Date.now() // 1574475446412Date.parse("Aug 9, 1995")

**以下是Date.prototype原型中的方法**

*   **getFullYear()：** 根据本地时间，返回指定日期的年份，此方法替代 getYear() 。
*   **getMonth：** 根据本地时间，返回一个指定的日期对象的月份，为基于0的值（0表示一年中的第一月）。
*   **getDate()：** 根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）。 
*   **getHours()：** 根据本地时间，返回一个指定的日期对象的小时。
*   **getMinutes()：** 根据本地时间，返回一个指定的日期对象的分钟数。
*   **getSeconds()：** 根据本地时间，返回一个指定的日期对象的秒数。
*   **getMilliseconds() :** 根据本地时间，返回一个指定的日期对象的毫秒数，返回一个0 到 999的整数。
*   **getDay()：** 根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。
*   **getTime：** 的返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数。
*   **getTimezoneOffset()：** 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。如果本地时区晚于协调世界时，则该差值为正值，如果早于协调世界时则为负值。例如你所在时区为 UTC+10（澳大利亚东部标准时间），将会返回 -600

    
new Date().getFullYear() // 2019
new Date('Sat Nov 23 2019 12:20:08 GMT+0800 (中国标准时间)').getMonth() // 10
new Date('Sat Nov 23 2019').getDate() // 23
new Date('10 17, 03:16:00').getHours() // 3
new Date('0, 03:12').getMinutes() // 12
new Date('011111, 03:12:1').getSeconds() // 1
new Date().getMilliseconds() // 202
new Date('August 19, 1975 23:15:30').getDay() // 2
new Date('Thu Jan 01 1970 00:00:00 GMT+0000').getTime() // 0
new Date().getTimezoneOffset() // -480

**getTime测量代码执行时间**

    var end, start, i; start = 
new Date();for (i = 0; i < 1000; i++) {  Math.sqrt(i);}end = 
new Date(); console.log("Operation took " + (end.getTime() - start.getTime()) + " msec");

*   setFullYear(yearValue, monthValue, dayValue)方法根据本地时间为一个日期对象设置年份。
*   setMonth(monthValue, dayValue)方法根据本地时间为一个设置年份的日期对象设置月份。
*   setDate(dayValue)方法根据本地时间来指定一个日期对象的天数。一个整数，表示该月的第几天。如果为 `dayValue` 指定0，那么日期就会被设置为上个月的最后一天。
*   setHours(hoursValue, minutesValue, secondsValue, msValue)方法根据本地时间为一个日期对象设置小时数，返回从1970-01-01 00:00:00 UTC 到更新后的日期对象实例所表示时间的毫秒数。  
    如果dayValue被设置为负数，日期会设置为上个月最后一天往前数这个负数绝对值天数后的日期。-1会设置为上月最后一天的前一天(例如当前为4月，如果setDate(-2),则为3月29日）
*   setMinutes(minutesValue, secondsValue, msValue)方法根据本地时间为一个日期对象设置分钟数。
*   setSeconds(secondsValue, msValue)方法根据本地时间设置一个日期对象的秒数。
*   setMilliseconds(msValue)方法会根据本地时间设置一个日期对象的豪秒数。
*   setTime()方法以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为Date对象设置时间。  
     
*   monthValue:一个0到11之间的整数值，表示从一月到十二月。
*   dayValue:一个1到31之间的整数值，表示月份中的第几天。
*   msValue:一个 0 到 999 的数字，表示微秒数
*   如果有一个参数超出了合理范围，setHours 会相应地更新日期对象中的日期信息。例如，如果为 secondsValue 指定了 100，则分钟会加 1，然后秒数使用 40。

    var date = 
new Date('August 22, 2019 23:15:30')// date 的值 Thu Aug 22 2019 23:15:30 GMT+0800 (中国标准时间)date.setFullYear(2020) // date 的值 Sat Aug 22 2020 23:15:30 GMT+0800 (中国标准时间)date.setFullYear(2020, 14, 3) // date 的值 Wed Mar 03 2021 23:15:30 GMT+0800 (中国标准时间)date.setMonth(-1) // Thu Dec 03 2020 23:15:30 GMT+0800 (中国标准时间) ===== theBigDay = 
new Date("July 1, 1999");sameAsBigDay = 
new Date();sameAsBigDay.setTime(theBigDay.getTime());// sameAsBigDay => Thu Jul 01 1999 00:00:00 GMT+0800 (中国标准时间)

*   toLocaleString() 方法返回该日期对象的字符串
*   toLocaleDateString() 方法返回该日期对象日期部分的字符串
*   toLocaleTimeString() 方法返回该日期对象时间部分的字符串
*   toString 方法总是返回一个美式英语日期格式的字符串。
*   toDateString() 方法以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。
*   toTimeString() 方法以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。
*   toUTCString() 方法把一个日期转换为一个字符串，使用UTC时区。
*   toISOString() 方法返回一个 ISO格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是UTC（协调世界时），加一个后缀“Z”标识。
*   toJSON() 方法返回 Date 对象的字符串形式。
*   valueOf() 方法返回以数值格式表示的一个 Date 对象的原始值，从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期对象所代表时间的毫秒数。

    
new Date(1993, 6, 28, 14, 39, 7).toLocaleString() // "1993-7-28 14:39:07"
new Date(1993, 6, 28, 14, 39, 7).toLocaleDateString() // "1993-7-28"
new Date(1993, 6, 28, 14, 39, 7).toLocaleTimeString() // "14:39:07"
new Date(1993, 6, 28, 14, 39, 7).toString() // "Wed Jul 28 1993 14:39:07 GMT+0800 (中国标准时间)"
new Date(1993, 6, 28, 14, 39, 7).toDateString() // "Wed Jul 28 1993"
new Date(1993, 6, 28, 14, 39, 7).toTimeString() // "14:39:07 GMT+0800 (中国标准时间)"
new Date(1993, 6, 28, 14, 39, 7).toUTCString() // "Wed, 28 Jul 1993 06:39:07 GMT"
new Date(1993, 6, 28, 14, 39, 7).toISOString() // "1993-07-28T06:39:07.000Z"
new Date(1993, 6, 28, 14, 39, 7).toJSON() // "1993-07-28T06:39:07.000Z"
new Date().valueOf() // 1574486342597
