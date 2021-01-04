/**
 * Ad对象 仅用于竞价广告
 */

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
        ad_type = ad_type || 0;
        uuid = uuid || '';
        var ua = navigator.userAgent;
        var data = data || {};
        if(uuid != ''){
            $.ajax({
                type: 'post',
                headers: {
                    'User-Agent': ua
                },
                url: 'http://start_up.qd2020.cn/api/monitor-advert',
                data: $.extend(
                    {
                        user_agent:ua,
                        uuid:uuid,
                        ad_pid:pid,
                        ad_type:ad_type,
                        is_click:1,
                    },
                    data
                ),
                dataType: 'json', //jsonp格式访问
                success: function(res) {
                },
                error: function(err) {
                },
                complete: function() {
                }
            });
        }

        //Ad.clickCallback(pid);

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
            type= params.type,
            templateId = params.templateId,
            wrapDomId = params.wrapDomId,
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
                    readNum: Ad.random(100000, 500000) //阅读数
                })
            );
            //插入模板生成的html
            console.log(type)
            if (type != 'float') {
                $('#' + wrapDomId).append(html +
                    '<div class="xiaoshuo"><a class="ad-template-info ad-wrap-single"><div class="item-left">' +
                    '<div class="title" style="letter-spacing: 3px;color: rgba(0, 200, 0, 1);font-size: 18px!important;"></div>' +
                    '<div class="item-extra"></div></div>' +
                    '<div class="videoImg"><img class="video-imgnew" style="border-radius: 5px" src="" alt=""></div></a></div>' +

                    '<div class="dingyue"><a class="ad-template-info ad-wrap-single"><div class="item-left">' +
                    '<div class="title" style="letter-spacing: 3px;color: rgba(255, 0, 0, 0.7);font-size: 18px!important;"></div>' +
                    '<div class="item-extra"></div></div>' +
                    '<div class="videoImg"><img class="video-imgnew" style="border-radius: 5px" src="" alt=""></div></a></div>');
                var xiaoshuo = [{"id":12,"title":"\u201c\u7f8e\u5973\uff0c\u4f60\u786e\u5b9a\u4e0d\u7528\u6234\u5957\u5417\uff1f\u201d  \u201c\u4e0d\u7528\u3002\u201d  \u201c\u6211\u770b\u8fd8\u662f\u6234\u4e00\u4e0b\u6bd4\u8f83\u597d\uff0c\u8fd9\u6837\u76f4\u63a5\u8fdb\u53bb\u6709\u70b9\u4e0d\u592a\u597d\u3002\u201d  \u201c\u5570\u55e6\u4ec0\u4e48\uff0c\u5feb\u70b9\u8fdb\u6765\uff01\u201d","url":"http:\/\/youai.h5.novel.hxbookmall.cn\/outread?type=2&book_id=5925&number=3&spread_type=1&spread_id=1419205&push_id=0","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/B08DB7F1-A8D3-C5BC-E1C4-B5F9797A5F05.jpeg"},{"id":13,"title":"\u554a~~\u55ef~~\u5979\u4eab\u53d7\u7740\u540e\u5165\u7684\u5feb\u611f\u2026\u2026","url":"http:\/\/nanyan.h5.novel.hxbookmall.cn\/outread?type=2&book_id=5979&number=3&spread_type=1&spread_id=1419211&push_id=0","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/CC0E7EE3-FE1A-2AF7-BB3E-1F9B509FA52C.jpeg"},{"id":8,"title":"\u5170\u5b50\u5bb3\u7f9e\u7684\u629a\u6478\u7740\u4ed6\u7684\u575a\u786c\uff0c\u611f\u89c9\u5230\u4ed6\u7684\u5174\u594b~\u626d\u52a8\u7740\u81ea\u5df1\u7684\u7fd8\u81c0~","url":"http:\/\/zwyd.h5.novel.hxbookmall.cn\/outread?type=2&book_id=5979&number=3&spread_type=1&spread_id=1418441&push_id=0","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/7A3F9A40-5425-43A5-9A1E-CD6B3A199B6C.jpeg"}];
                for (let i = 0; i < $('.xiaoshuo').length; i++) {
                    if (xiaoshuo[i] != undefined) {
                        $('.xiaoshuo').eq(i).find('.title').html('【小说推荐】' + xiaoshuo[i].title)
                        $('.xiaoshuo').eq(i).find('.liulan').html(random(100000, 500000) + '浏览量')
                        $('.xiaoshuo').eq(i).find('.video-imgnew').attr('src', xiaoshuo[i].imgSrc)
                        $('.xiaoshuo').eq(i).find('.date').html(getDate())
                        $('.xiaoshuo').eq(i).click(function () {

                            var ua = navigator.userAgent;
                            $.ajax({
                                type: 'post',
                                headers: {
                                    'User-Agent': ua
                                },
                                url: 'http://xyz-api.qd2020.cn/api/monitor-advert',
                                data:
                                    {
                                        user_agent:ua,
                                        uuid:getParam('uuid'),
                                        ad_pid:xiaoshuo[i].id,
                                        ad_type:2,
                                        is_click:1,
                                    },
                                dataType: 'json', //jsonp格式访问
                                success: function(res) {
                                    location.href = xiaoshuo[i].url
                                },
                                error: function(err) {
                                    location.href = xiaoshuo[i].url
                                },
                                complete: function() {
                                    location.href = xiaoshuo[i].url
                                }
                            });

                        })
                    } else {
                        $('.xiaoshuo').eq(i).css('display', 'none')
                    }
                }
                var dingyue = [{"id":7,"title":"\u8eab\u6750\u8d85\u597d\u7684\u767d\u7699\u59b9\u59b9\u4ed4\u5e8a\u4e0a\u62cd\u5199\u771f\uff0c\u5b8c\u4e8b\u4e4b\u540e\u4e4b\u540e\u6444\u5f71\u5e08\u53d7\u4e0d\u4e86\u4e86","url":"http:\/\/mp.weixin.qq.com\/s?__biz=Mzg2ODUyMjQ1OA==&mid=100000005&idx=1&sn=b9b54010ba5420bfc4cb1319867363ed&chksm=4eaa41b079ddc8a667eb84b0bdd18407ada7b0620b56f7207afc9edf7f2cd90eb6aac0f95b5c#rd","bd_script":"var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https:\/\/hm.baidu.com\/hm.js?ee75f8fe22c8b9e7af908f48c8b2b541\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/86960D9A-CBCD-F14D-26FA-B05E5FC0B92F.jpeg"},{"id":8,"title":"\u6781\u54c1\u841d\u8389\u9753\u59b9\u300e\u5927\u4e8c\u5b66\u59b9\u300f\u767d\u5929\u82b6\u54d2\u964c\u751f\u4eba\u56de\u5bb6\u6fc0\u60c5paipai\u518d\u73b0\u901f\u88f9\u7edd\u6280...","url":"http:\/\/mp.weixin.qq.com\/s?__biz=MzIxOTAzNDE4Nw==&mid=100000274&idx=1&sn=d11e69166f05faa0fa080646a705a5c1&chksm=17e025362097ac20ef587b548fd8c8d48ca92b677fb394bb11190ac5a7b2bf5306f267fe2435#rd","bd_script":"var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https:\/\/hm.baidu.com\/hm.js?0d0e34d296a2c5b1075b5295d70ea607\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/089686D1-3464-0503-8330-EF80CC913D42.jpeg"},{"id":9,"title":"\u7f51\u7ea2\u5c11\u5987\u8ddf\u7537\u53cb\u6fc0\u60c5\u505a\u6e38\u620f","url":"http:\/\/mp.weixin.qq.com\/s?__biz=MzkxOTE3MzczMA==&mid=100000013&idx=1&sn=25077caa740aba97a06f94f4dd34bfb9&chksm=41a76e0076d0e716761a23bdcef004807584af1a509eeffbffca961a8edf54905340423b3f9f#rd","bd_script":"var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https:\/\/hm.baidu.com\/hm.js?e9ca1ed8b92c0d814d30213045723e97\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/C5DAE3C9-581A-7876-C669-9BC26BD74129.png"},{"id":10,"title":"\u7f8e\u5973\u8eab\u7a7f\u9ed1\u8272\u4e1d\u889c\u548c\u7537\u53cb\u5728\u5e8a\u4e0a\u73a9\u523a\u6fc0....","url":"http:\/\/mp.weixin.qq.com\/s?__biz=MzkwNTE3NDMyMA==&mid=100000011&idx=1&sn=47f1e3d30ebe76754c0fd23f64a8fa6d&chksm=40fa8d54778d0442ade0922c6c704d14cc22c36f894fd3dc4d22f73fd45ddd5308c4244e5283#rd","bd_script":"var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https:\/\/hm.baidu.com\/hm.js?a0961668f21a03c43955fd7c5e142c0c\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();","imgSrc":"http:\/\/new-lz.oss-cn-shanghai.aliyuncs.com\/00D529AA-3080-3A1C-3189-5348193D7636.jpeg"}];
                for (let i = 0; i < $('.dingyue').length; i++) {
                    if (dingyue[i] != undefined) {
                        var tjArr = ['私密链接', '快点进来', '精彩推荐', '极品少妇', '丝袜女郎', '网址推荐', '野战', '制服诱惑', '日韩泄漏', '主播热舞', '韩国女支持', '黑丝诱惑', '办公室', '校园春色', '屌丝逆袭', '学生教师']
                        $('.dingyue').eq(i).find('.title').html('【' + makeRandomArr(tjArr, 1) + '】' + dingyue[i].title)
                        $('.dingyue').eq(i).find('.liulan').html(random(100000, 500000) + '浏览量')
                        $('.dingyue').eq(i).find('.video-imgnew').attr('src', dingyue[i].imgSrc)
                        $('.dingyue').eq(i).find('.date').html(getDate())
                        $('.dingyue').eq(i).click(function () {
                            var ua = navigator.userAgent;
                            new Function(dingyue[i].bd_script)()
                            $.ajax({
                                type: 'post',
                                headers: {
                                    'User-Agent': ua
                                },
                                url: 'http://xyz-api.qd2020.cn/api/monitor-advert',
                                data:
                                    {
                                        user_agent:ua,
                                        uuid:getParam('uuid'),
                                        ad_pid:dingyue[i].id,
                                        ad_type:3,
                                        is_click:1,
                                    },
                                dataType: 'json', //jsonp格式访问
                                success: function(res) {
                                    location.href = dingyue[i].url
                                },
                                error: function(err) {
                                    location.href = dingyue[i].url
                                },
                                complete: function() {
                                    location.href = dingyue[i].url
                                }
                            });
                        })
                    } else {
                        $('.dingyue').eq(i).css('display', 'none')
                    }
                }
            } else {
                $('#' + wrapDomId).append(html)
            }
            // 查询被插入的广告 用于曝光监测
            var currAd = $('#' + wrapDomId + ' .' + adWrapClass + ':last')[0];
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
