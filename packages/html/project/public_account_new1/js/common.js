function getParam(name, url) { // 获取地址栏参数
    if (typeof name !== 'string') return false
    if (!url) url = window.location.href
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return ''
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function commonPost(url, data, success, headers, fail) {
    $.ajax({
        type: 'POST',
        url: 'http://api.17code.net/h5' + url,
        // url: 'http://api.17code.net/h5' + url,
        // url: 'http://lb-manage-api.52xiaoshuo.cn/api/' + url,
        data: data,
        success: success,
        fail: fail,
        headers: headers
    })
}

function commonGet(url, success, headers,fail) {
    $.ajax({
        type: 'GET',
        url: 'http://api.17code.net/h5' + url,
        // url: 'http://api.17code.net/h5' + url,
        success: success,
        fail: fail,
        headers: headers
    })
}

function countDown(time) {
    var hour = parseInt(time / 60 / 60);
    var minute = parseInt(time / 60) % 60;
    var second = parseInt(time % 60);
    // 对时间进行处理，1-9号在前面添加一个“0”
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    // console.log(hour + ":" + minute + ":" + second);
    $("#Countdown").html(hour + ":" + minute + ":" + second);
}

function startcountDown(time) {
    var set = setInterval(function () {
        time--;
        if (time === 0) {
            clearInterval(set);
        }
        countDown(time);
    }, 1000);
}

function randomNumDecimal (min, max) {
    return ((Math.random() * (max - min + 1))+min).toFixed(2)
}
