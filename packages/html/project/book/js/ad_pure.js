var wm_base_url = 'https://1201025296535677.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/kylin/';
var wm_base_url_click = 'http://hycswx.com/api/';

var ee = new EventEmitter();
var trueIndex = 0;
var Ad = {
	clickCallback: function () {
	},
	fetchAd: function (data, callback, complete) {
		if (data.ad_platform == 1) {
			$.ajax({
				type: 'get',
				url: wm_base_url + 'get_ad/?ad_position_id=' + data.pid,
				success: function (res) {
					callback && callback(null, res);
				},
				error: function (err) {
					callback && callback(err);
				},
				complete: function () {
					complete && complete();
				},
			});
		} else {
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
				dataType: 'jsonp', //jsonp鏍煎紡璁块棶
				success: function (res) {
					callback && callback(null, res);
				},
				error: function (err) {
					callback && callback(err);
				},
				complete: function () {
					complete && complete();
				}
			});
		}
	},
	adClick: function (clickUrl, dUrl, pid, type, user_id, page, ad_platform,ad_material_id) {
		var ua = navigator.userAgent;
		if (ad_platform == 1) { // 鍥轰环骞垮憡閫昏緫
			$.ajax({
				type: 'post',
				url: wm_base_url_click + 'charging',
				data: { ad_material_id: ad_material_id, ad_position_id: pid },
				success: function (res) {
					location.href = clickUrl[0];
				},
				error: function (err) {
					console.log(err);
				},
			});
		} else {
			var ua = navigator.userAgent;

			clickUrl.forEach(function (url) {
				Ad.send(url);
			});

			if (dUrl) {
				setTimeout(() => {
					location.href = dUrl[0];
				}, 300);
			}
		}

	},
	isElementInViewport: function (el) {
		if (typeof jQuery === 'function' && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();
		var n = window.innerHeight || document.documentElement.clientHeight;
		return rect.top <= n && rect.top + rect.height >= 0;
	},
	checkMonitor: function (div, monitorUrl, ad_platform, positionId, materialId) {
		if (ad_platform == 1) { // 固价
			var isInViewport = Ad.isElementInViewport(div);
			if (isInViewport) {
				$.ajax({
					type: 'get',
					url:
						wm_base_url +
						'ad_show/?ad_position_id=' +
						positionId +
						'&ad_material_id=' +
						materialId,
					success: function (res) {},
					error: function (err) {
						console.log(err);
					},
				})
				return;
			}

			var checkFun = Ad.throttle(function () {
				if (Ad.isElementInViewport(div)) {
					window.removeEventListener('scroll', checkFun, true);
					$.ajax({
						type: 'get',
						url:
							wm_base_url +
							'ad_show/?ad_position_id=' +
							positionId +
							'&ad_material_id=' +
							materialId,
						success: function (res) {},
						error: function (err) {
							console.log(err);
						},
					})
				}
			}, 200);

			window.addEventListener('scroll', checkFun, true);
		} else {
			var isInViewport = Ad.isElementInViewport(div);
			if (isInViewport) {
				monitorUrl.forEach(function (url) {
					Ad.send(url);
				});
				return;
			}
			var checkFun = Ad.throttle(function () {
				if (Ad.isElementInViewport(div)) {
					window.removeEventListener('scroll', checkFun, true);
					monitorUrl.forEach(function (url) {
						Ad.send(url);
					});
				}
			}, 200);
			window.addEventListener('scroll', checkFun, true);
		}
	},
	throttle: function (func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function () {
			previous = options.leading === false ? 0 : new Date().getTime();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function () {
			var now = new Date().getTime();
			if (!previous && options.leading === false) previous = now;
			// 璁＄畻鍓╀綑鏃堕棿
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
				// options.trailing=true鏃讹紝寤舵椂鎵цfunc鍑芥暟
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	send: function (url) {
		var img = document.createElement('img');
		img.src = url;
		img.style.display = 'none';
		document.body.appendChild(img);
	},
	singleAd: function (params, callback) {
		if (params.ad_platform == 1) {
			var pid = params.pid,
				templateId = params.adWrapClass,
				adWrapClass = params.adWrapClass,
				data = params.data || {};

			Ad.fetchAd($.extend({pid: pid}, data), function (err, res) {
				callback && callback(res);
				if (err) return;

				var new_res = {
					clickUrl: [],
					dUrl: res.data.links,
					pid: params.pid,
					ad_material_id: res.data.ad_material_id,
					srcUrls: res.data.pics,
					title: res.data.title,
					ad_platform: 1
				}

				var html = template(
					templateId,
					$.extend(new_res, {
						date: getDate(),
						page: params.page,
						readNum: random(100000, 500000)
					})
				)

				$('#dataList').append(html)

				var currAd = $('#dataList'+ ' .' + adWrapClass + ':last')[0];
				Ad.checkMonitor(currAd, res.data.links, 1, params.pid, res.data.ad_material_id);
			});
		} else {
			var pid = params.pid,
				templateId = params.adWrapClass,
				adWrapClass = params.adWrapClass,
				data = params.data || {};

			Ad.fetchAd($.extend({pid: pid}, data), function (err, res) {
				callback && callback(res);
				if (err) return;
				var html = template(
					templateId,
					$.extend(res, {
						date: getDate(),
						page: params.page,
						readNum: random(100000, 500000),
						ad_platform: 0,
						ad_material_id: 0
					})
				);

				$('#dataList').append(html)

				var currAd = $('#dataList' + ' .' + adWrapClass + ':last')[0];
				Ad.checkMonitor(currAd, res.monitorUrl);
			});
		}

	}
};


function getParam(name, url) {
	if (typeof name !== 'string') return false
	if (!url) url = window.location.href
	name = name.replace(/[\[\]]/g, '\\$&')
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
	var results = regex.exec(url)
	if (!results) return null
	if (!results[2]) return ''
	return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function random (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
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

function makeRandomArr(arrList, num) {
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

function goGzh (id) {
	new Function(gzh[id].bd_script)()
	location.href = gzh[id].url
}

function goArticle (id) {

}
