function judgeType (obj) { // 判断数据类型
    const class2type = {}
    'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[`[object ${e}]`] = e.toLowerCase())
    if (obj === null) return String(obj)
    return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

function gsh (str) { // 格式化数据
    return JSON.parse(JSON.stringify(str))
}

function randomNum (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNumDecimal (min, max) {
    return ((Math.random() * (max - min + 1))+min).toFixed(2)
}

function isIos () {
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // eslint-disable-line
}

// 是否是安卓
function isAndroid (){
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
}

function makeRandomArr(arrList, num) { // 随机取出数组元素
    if (num > arrList.length) {
        num = arrList.length // eslint-disable-line
    }
    var tempArr = arrList.slice(0)
    var newArrList = []
    for (var i = 0; i < num; i++) {
        var random = Math.floor(Math.random() * (tempArr.length))
        var arr = tempArr[random]
        tempArr.splice(random, 1)
        newArrList.push(arr)
    }
    return newArrList
}

function getAge(strBirthday) { // 根据出生日期算出年龄 getAge('1995-09-26')
    var returnAge = null
    var strBirthdayArr = strBirthday.split('-')
    var birthYear = strBirthdayArr[0] // eslint-disable-line
    var birthMonth = strBirthdayArr[1] // eslint-disable-line
    var birthDay = strBirthdayArr[2] // eslint-disable-line

    var d = new Date()
    var nowYear = d.getFullYear()
    var nowMonth = d.getMonth() + 1
    var nowDay = d.getDate()

    if (nowYear == birthYear) {
        returnAge = 0// 同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear // 年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                const dayDiff = nowDay - birthDay// 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            } else {
                var monthDiff = nowMonth - birthMonth// 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            }
        } else {
            returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge// 返回周岁年龄
}

// 设置cookie
function setCookie(cname, cvalue, days) {
    var expires = ''
    if (days == 0) {
        expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT'
    } else {
        var d = new Date()
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `expires=${d.toUTCString()}`
    }
    document.cookie = `${cname}=${cvalue};${expires};path=/`
}

// 得到cookie
function getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

// 删除cookie
function delCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=v; expire=" + date.toGMTString() + "; path=/";
}


function getParam(name, url) { // 获取地址栏参数
    if (typeof name !== 'string') return false
    if (!url) url = window.location.href
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function loadAsyncScript(src, callback) { // 同步加载js
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', src)
    script.setAttribute('async', true)
    script.setAttribute('defer', true)
    head.appendChild(script)

    if (script.readyState) { // ie
        script.onreadystatechange = function () {
            var state = this.readyState
            if (state === 'loaded' || state === 'complete') {
                callback()
            }
        }
    } else {
        script.onload = function () {
            callback()
        }
    }
}

function loadJS (src) {
    const s = document.createElement('script')
    s.setAttribute('src', src)
    s.setAttribute('charset', 'utf-8')
    document.body.appendChild(s)
}

function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
