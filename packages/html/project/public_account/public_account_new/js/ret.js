var ee = new EventEmitter();
$(function() {
    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page) {
        commonGet('http://192.168.11.149:8686/mock-api/v1/articles?page=' + page.num + '&limit=' + page.size + '',
            function (res) {
                var data = res.data.items
                var total = res.data.total
                mescroll.endSuccess(data.length, 20);
                setListData(data, page);
            }
        )
    }
    /* 自定义事件 用于广告 deny_cids 禁用重复广告 */
    ee.addListener('fetch-jj-ad', function() {
        var curData = adList[adListIndex];
        //请求并渲染广告
        Ad.singleAd(
            $.extend(curData, {
                data: {
                    //   app_id:101918,
                    app_id: 102583,
                    deny_cids: deny_cids.join(',')
                }
            }),
            function(res) {
                if (adListIndex === adList.length - 1) return;

                if (res && deny_cids.indexOf(res.cid) == -1) {
                    /* 当前广告请求完毕后 将广告的cid(创意id)插入 deny_cids 用于防止广告重复 */
                    deny_cids.push(res.cid); //插入创意id 用于广告位被重复广告占用
                }

                adListIndex++;
                /* 请求下个广告 */
                ee.emitEvent('fetch-jj-ad');
            }
        );
    });

    ee.emitEvent('fetch-jj-ad');
});

var util = {
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
};

