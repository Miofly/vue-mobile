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
    adClick: function(clickUrl, dUrl, pid,ad_type,uuid) {
        event.currentTarget.className = 'news_active'
        ad_type = ad_type || 0;
        uuid = uuid || '';
        var ua = navigator.userAgent;
        var data = data || {};
        // if(uuid != ''){
        //     $.ajax({
        //         type: 'post',
        //         headers: {
        //             'User-Agent': ua
        //         },
        //         url: 'http://start_up.qd2020.cn/api/monitor-advert',
        //         data: $.extend(
        //             {
        //                 user_agent:ua,
        //                 uuid:uuid,
        //                 ad_pid:pid,
        //                 ad_type:ad_type,
        //                 is_click:1,
        //             },
        //             data
        //         ),
        //         dataType: 'json', //jsonp格式访问
        //         success: function(res) {
        //         },
        //         error: function(err) {
        //         },
        //         complete: function() {
        //         }
        //     });
        // }

        Ad.clickCallback(pid);

        clickUrl.forEach(function(url) {
            Ad.send(url);
        });

        if (dUrl) {
            setTimeout(() => {
                location.href = dUrl[0];
            }, 0);
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
            // wrapDomId = params.wrapDomId,
            adWrapClass = params.adWrapClass,
            data = params.data || {};

        Ad.fetchAd($.extend({ pid: pid }, data), function(err, res) {
            callback && callback(res);
            if (err) return;
            //获取模板生成的html
            // console.log(templateId)
            var html = template(
                templateId,
                $.extend(res, {
                    date: Ad.getDate(), //日期
                    readNum: Ad.random(100000, 500000) //阅读数
                })
            );

            $('#adIndex' + trueIndex*2 + '').append(html)
            // 查询被插入的广告 用于曝光监测
            // var currAd = $('.'+ adWrapClass);
            var currAd = $('#dataList' + trueIndex*2 + ' .' + adWrapClass + ':last')[0];
            console.log()
            //启动广告曝光监测
            if (currAd != undefined) {
                Ad.checkMonitor(currAd, res.monitorUrl);
            }
        });
    }
};

var mescroll = new MeScroll("mescroll", {
    down: {
        use: false
    },
    up: {
        auto: true,
        page: {num:0, size:10},//每次加载1条数据,模拟loadFull
        callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        clearEmptyId: "dataList", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
        toTop: { //配置回到顶部按钮
            // src: "../res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
            //offset : 1000
        },
        htmlNodata: '<p class="upwarp-nodata" style="font-size: 14px;color: #CCCCCC;">———————  我已经 到底了  ———————</p>'
    }
});

function setListData(curPageData, page) {
    var listDom = document.getElementById("dataList");
    for (var i = 0; i < curPageData.length; i++) {
        var pd = curPageData[i];
        var str = '<div id="news'+ i +'" style="display: flex;justify-content: space-around;height: 2.05rem;padding-top: 0.24rem" onclick="goInfo(' + pd.id + ', ' + i + ')">\n' +
            '            <div style="width: 65%;padding-left: 0.06rem;">\n' +
            '                <div style="font-size: 16px;color: #333333;font-weight: bolder;line-height: 0.44rem;" class="line-two">' + pd.title + '</div>\n' +
            '                <div style="display: flex;justify-content: space-between;margin-top: 0.28rem">\n' +
            '                    <span style="color: rgba(255, 66, 55, 1);font-size: 14px;"><img src="./img/xhb.png" style="margin-top: -0.08rem;margin-right: 0.12rem;width: 0.28rem;height: 0.28rem"><span>分享好友得1元红包</span></span>\n' +
            '                    <img src="./img/fxzq.png" style="height: 0.34rem;">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div style="width: 2rem;height: 1.6rem;padding-right: 0.00rem;line-height: 1.4rem">\n' +
            '                <img src="'+ pd.cover[0].path +'" style="height: 1.6rem;object-fit: cover;width: 2rem;border-radius: 4px;object-position: center">\n' +
            '            </div>\n' +
            '        </div><div style="height: 1px;background: #EEEEEE;width: 94vw;margin-left: 3vw"></div>';
        var liDom = document.createElement("div");
        liDom.setAttribute('id', 'adIndex'+ (i+1 + (page.num - 1)*page.size) +'')
        liDom.innerHTML = str;
        listDom.appendChild(liDom);
    }

}

function goInfo (id, newId) {
    console.log($('#news' + newId))
    $('#news' + newId).addClass('news_active')
	location.href = 'news_info.html'+ location.search +'&article_id='+ id +''
}

// $(function () {

// })
/*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
var adListIndex = 0;
var adList = [];
var deny_cids = []; // 被禁止的创意广告id
var tempIndex = 0
var newTempIndex = 0

function getListData(page) {
    tempIndex++
    adListIndex = 0;
    adList = [];
    commonGet('/adverts?page=' + page.num + '&per_page=' + page.size/2 + '', function (res) {
            if (res.code == 200) {
                adList = res.data
                for (var i = 0; i < adList.length; i++) {
                    adList[i].data = {app_id: 103164, deny_cids: deny_cids.join(',')}
                }
                // console.log(adList)
                commonGet('/articles?page=' + page.num + '&per_page=' + page.size + '',
                    function (res) {
                        var data = res.data
                        var total = res.meta.total
                        mescroll.endSuccess(data.length, total);


                        setListData(data, page);
                        getAdData()
                    }, {'ACT-USER-ID': getParam('user_id')})
            }
        }, {'ACT-USER-ID': getParam('user_id')}
    )
}

function getAdData () {
    ee.addListener('fetch-jj-ad', function() {

        // console.log('newTempIndex', newTempIndex)
        var curData = adList[0];
        adList.shift()
        if (curData != undefined) {
            newTempIndex++
        }
        // console.log('newTempIndex', newTempIndex)
        // console.log('adList.length', adList.length)
        // console.log('curData', curData)
        //请求并渲染广告
        if (curData != undefined && adList.length >= 0) {
            Ad.singleAd(curData,
                function(res) {
                    // console.log('adList', adList)
                    if (res!=undefined) {
                        trueIndex++
                    }
                    // if (adListIndex === adList.length - 1) return;
                    if (res && deny_cids.indexOf(res.cid) == -1) {
                        /* 当前广告请求完毕后 将广告的cid(创意id)插入 deny_cids 用于防止广告重复 */
                        deny_cids.push(res.cid); //插入创意id 用于广告位被重复广告占用
                    }
                    adListIndex++;
                    /* 请求下个广告 */
                    ee.emitEvent('fetch-jj-ad');
                }
            );
        }

    })
    ee.emitEvent('fetch-jj-ad');
}

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
