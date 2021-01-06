/**
 * Ad对象 仅用于竞价广告
 */
var ee = new EventEmitter();
var trueIndex = 0;
var Ad = {
    clickCallback: function() {},
    /**
     * 请求广告数据
     * data 要传的数据 默认已经穿了ua 这里一般只传pid即可
     * callback 获取数据回调 callback(err,res)
     * 注意：此方法只获取数据，渲染方法需与该方法解耦
     */
    fetchAd: function(data, callback, complete) {
        var ua = navigator.userAgent;
        var data = data || {};

        $.ajax({
            type: 'get',
            headers: {
                'User-Agent': ua
            },
            url: 'http://ssp.1rtb.com/client/req_ad',
            data: $.extend(
                {
                    device_ua: ua,
                    type: 'api'
                },
                data
            ),
            dataType: 'jsonp', //jsonp格式访问
            success: function(res) {
                callback && callback(null, res);
            },
            error: function(err) {
                callback && callback(err);
            },
            complete: function() {
                complete && complete();
            }
        });
    },

    /**
     * 反弹
     * @param {*} backUrl
     * @returns
     */
    back: function(backUrl) {
        if (!backUrl) {
            return false;
        }
        var fn = arguments.callee;
        if (fn.hasInit) {
            return false;
        }
        fn.hasInit = true;
        setTimeout(function() {
            history.pushState(
                history.length + 1,
                'back',
                location.href + '#' + new Date().getTime()
            );
        }, 100);
        window.onhashchange = function() {
            location.href = backUrl;
        };
    },

    /**
     * 广告被点击时
     * clickUrl 点击率接口
     * dUrl 广告落地页url
     */
    // adClick: function(clickUrl, dUrl, pid,type,user_id, page) {
    //     event.currentTarget.className = 'news_active'
    //     var ua = navigator.userAgent;
    //     // commonPost('/adClickStat', {
    //     //     ua: ua,
    //     //     pid:pid,
    //     //     type:type,
    //     //     page:page,
    //     //     user_id:user_id,
    //     //     sign:'bFwbxLAzwd5F4DOPS2hO',
    //     // }, function (res) {
    //     //     console.log(res)
    //     //     if (res.code == 200) {
    //     //
    //     //     }
    //     // }, {'ACT-USER-ID': getParam('user_id')})
    //
    //     Ad.clickCallback(pid);
    //
    //     clickUrl.forEach(function(url) {
    //         Ad.send(url);
    //     });
    //
    //     setTimeout(function () {
    //         var e = document.createElement("a");
    //         (e.href = dUrl[0]),
    //             (e.rel = "noreferrer"),
    //             document.body.appendChild(e),
    //             e.click();
    //     }, 0);
    // },
    adClick: function(clickUrl, dUrl, pid,type,user_id, page) {
        ws.send(JSON.stringify({pid:pid, event: 'adClick'}));
        event.currentTarget.className = 'news_active'
        var ua = navigator.userAgent;
        commonPost('/adClickStat', {
            ua: ua,
            pid:pid,
            type:type,
            user_id:user_id,
            oa_id:getParam('oa_id'),
            page:page,
            sign:'bFwbxLAzwd5F4DOPS2hO',
        }, function (res) {
            if (res.code == 200) {

            }
        }, {'ACT-USER-ID': getParam('user_id')})

        Ad.clickCallback(pid);

        clickUrl.forEach(function(url) {
            Ad.send(url);
        });

        if (dUrl) {
            setTimeout(() => {
                location.href = dUrl[0];
            }, 300);
        }
    },

    /**
     * 获取年月日
     */
    getDate: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        month = month < 10 ? '0' + month : month;
        strDate = strDate < 10 ? '0' + strDate : strDate;
        return year + '-' + month + '-' + strDate;
    },

    /**
     * 获取范围随机数
     */
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * 判断元素是否在可视区
     * 用于广告曝光率
     */
    isElementInViewport: function(el) {
        if (typeof jQuery === 'function' && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * 监测曝光率
     * div 广告dom
     * monitorUrl 广告曝光接口
     */
    checkMonitor: function(div, monitorUrl) {
        var isInViewport = Ad.isElementInViewport(div);
        if (isInViewport) {
            monitorUrl.forEach(function(url) {
                Ad.send(url);
            });
            return;
        }

        var checkFun = Ad.throttle(function() {
            if (Ad.isElementInViewport(div)) {
                window.removeEventListener('scroll', checkFun, true);
                monitorUrl.forEach(function(url) {
                    Ad.send(url);
                });
            }
        }, 200);

        window.addEventListener('scroll', checkFun, true);
    },

    /**
     * 节流
     */
    throttle: function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            // 计算剩余时间
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },

    /**
     * 发送请求
     */
    send: function(url) {
        var img = document.createElement('img');
        img.src = url;
        img.style.display = 'none';
        document.body.appendChild(img);
    },

    /**
     * pid 广告位id
     * templateId 模板script的id
     * wrapDomId 插入广告模板的父级id
     * adWrapClass 广告wrap的class 用于寻找被插入的广告
     * data 拓展的数据
     * @param {*} params
     */
    singleAd: function(params, callback) {
        var pid = params.pid,
            templateId = params.adWrapClass,
            adWrapClass = params.adWrapClass,
            data = params.data || {};

        Ad.fetchAd($.extend({ pid: pid }, data), function(err, res) {
            callback && callback(res);
            if (err) return;
            //获取模板生成的html
            var html = template(
                templateId,
                $.extend(res, {
                    date: Ad.getDate(), //日期
                    page: params.page, //日期
                    readNum: Ad.random(100000, 500000) //阅读数
                })
            );
            $('#dataList').append(html)
            // 查询被插入的广告 用于曝光监测
            var currAd = $('#dataList' + ' .' + adWrapClass + ':last')[0];
            //启动广告曝光监测
            Ad.checkMonitor(currAd, res.monitorUrl);
        });
    }
};



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

function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;
    return year + '-' + month + '-' + strDate;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
