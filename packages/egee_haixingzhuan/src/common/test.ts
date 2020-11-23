/*
i	执行对大小写不敏感的匹配。   m	执行多行匹配。
g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

[abc]	查找方括号之间的任何字符。          [a-z]  查找任何从小写 a 到小写 z 的字符。
[^abc]	查找任何不在方括号之间的字符。       [A-Z]  查找任何从大写 A 到大写 Z 的字符。
[0-9]	查找任何从 0 至 9 的数字。          [A-z]  查找任何从大写 A 到小写 z 的字符。
[adgk]	查找给定集合内的任何字符。           [^adgk]  查找给定集合外的任何字符。
(red|blue|green)	查找任何指定的选项。

.	查找单个字符，除了换行和行结束符。
\w	查找单词字符。(a-z、A-Z、0-9，以及下划线, 包含 _ (下划线) 字符。)
\W	查找非单词字符。
\0	查找 NULL 字符。    \n	查找换行符。
\d	查找数字。          \f	查找换页符。
\D	查找非数字字符。     \r	查找回车符。
\s	查找空白字符。       \t	查找制表符。
\S	查找非空白字符。     \v	查找垂直制表符。
\b	匹配单词边界。       \B	匹配非单词边界。
\xxx	查找以八进制数 xxx 规定的字符。   \xdd	查找以十六进制数 dd 规定的字符。
\uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。

n+  匹配任何包含至少一个 n 的字符串。   n*  匹配任何包含零个或多个 n 的字符串。
n?  匹配任何包含零个或一个 n 的字符串。
n{X}   匹配包含 X 个 n 的序列的字符串。 n{X,}  X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。
n{X,Y} X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。
n$	匹配任何结尾为 n 的字符串。     ^n	 匹配任何开头为 n 的字符串。
?=n	匹配任何其后紧接指定字符串 n 的字符串。   ?!n	匹配任何其后没有紧接指定字符串 n 的字符串。
*/


/**
 * 验证电子邮箱格式
 */
function email (value) {
    return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(value)
}

/**
 * 验证手机格式
 */
function mobile (value) {
    return (/^1[23456789]\d{9}$/).test(value)
}

/**
 * 验证URL格式
 */
function url (value) {
    return (/^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/)
        .test(value)
}

/**
 * 验证日期格式
 */
function date (value) {
    return !(/Invalid|NaN/).test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO (value) {
    return (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/).test(value)
}

/**
 * 验证十进制数字
 */
function number (value) {
    return (/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/).test(value)
}

/**
 * 验证整数
 */
function digits (value) {
    return (/^\d+$/).test(value)
}

/**
 * 验证身份证号码
 */
function idCard (value) {
    return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(value)
}

/**
 * 是否车牌号
 */
function carNo (value) {
    // 新能源车牌
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    // 旧车牌
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    if (value.length === 7) {
        return creg.test(value)
    } else if (value.length === 8) {
        return xreg.test(value)
    }
    return false

}

/**
 * 金额,只允许2位小数
 */
function amount (value) {
    // 金额，只允许保留两位小数
    return (/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/).test(value)
}

/**
 * 中文
 */
function chinese (value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi
    return reg.test(value)
}

/**
 * 只能输入字母
 */
function letter (value) {
    return (/^[a-zA-Z]*$/).test(value)
}

/**
 * 只能是字母或者数字
 */
function enOrNum (value) {
    // 英文或者数字
    const reg = /^[0-9a-zA-Z]*$/g
    return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
function contains (value, param) {
    return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
function range (value, param) {
    return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength (value, param) {
    return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定电话
 */
function landline (value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
    return reg.test(value)
}

/**
 * 判断是否为空
 */
function empty (value) {
    switch (typeof value) { // eslint-disable-line
        case 'undefined':
            return true
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
            break
        case 'boolean':
            if (!value) return true
            break
        case 'number':
            if (value === 0 || isNaN(value)) return true
            break
        case 'object':
            if (value === null || value.length === 0) return true
            for (const i in value) {  // eslint-disable-line
                return false
            }
            return true
    }
    return false
}

/**
 * 是否json字符串
 */
function jsonString (value) {
    if (typeof value == 'string') {
        try {
            const obj = JSON.parse(value)
            if (typeof obj == 'object' && obj) {
                return true
            }
            return false

        } catch (e) {
            return false
        }
    }
    return false
}


/**
 * 是否数组
 */
function array (value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'

}

/**
 * 是否对象
 */
function object (value) {
    return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否短信验证码
 */
function code (value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value)
}


export default {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code
}
