import roots from './root'

// 判断是否是数组
const isArrayFn = (value) => {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(value)
	}
	return Object.prototype.toString.call(value) === '[object Array]'

}

// 去除空数组
const arrDelBlank = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '' || arr[i] === null || typeof (arr[i]) === 'undefined') {
			arr.splice(i, 1)
			i -= 1
		}
	}
	return arr
}

// 为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
const insertStr = (soure, start, newStr) => soure.substring(0, start) + newStr + soure.substring(start)

// 检测字符串是否全为数字
const isNumStr = (str: string) => {
	let n = 0
	for (let i = 0; i < str.length; i++) {
		n = str.charCodeAt(i)
		if (n < 48 || n > 57) {
			return false
		}
	}
	return true
}

// 删除指定位置字符(字符串从0开始数， index代表删除的位置)
const delSpecifiedLocation = (str, index) => str.substr(0, index) + str.substr(index + 1)

// 跳转微信
const jumpWX = () => {
	window.location.replace('weixin://')
}

// 异步加载js
const loadJS = (src) => {
	const s = document.createElement('script')
	s.setAttribute('src', src)
	s.setAttribute('charset', 'utf-8')
	document.body.appendChild(s)
}

// 文件大小转换
const conver = (limit) => {
	let size = ''
	if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
		size = `${ limit.toFixed(2) }B`
	} else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
		size = `${ (limit / 1024).toFixed(2) }KB`
	} else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
		size = `${ (limit / (1024 * 1024)).toFixed(2) }MB`
	} else { // 其他转化成GB
		size = `${ (limit / (1024 * 1024 * 1024)).toFixed(2) }GB`
	}

	const sizestr = `${ size }`
	const len = sizestr.indexOf('.')
	const dec = sizestr.substr(len + 1, 2)
	if (dec == '00') { // 当小数点后为00时 去掉小数部分
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
	}
	return sizestr
}

// 数组去重
const arrDelDuplicate = (arr) => [...new Set(arr)] // eslint-disable-line

// 获取地址栏参数
const getParam = (name, url) => {
	// if (typeof name !== 'string') return false
	// if (!url) url = window.location.href
	// // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
	// name = name.replace(/[\[\]]/g, '\\$&')
	// const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
	// const results = regex.exec(url)
	// if (!results) return null
	// if (!results[2]) return ''
	// return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// 判断是否是对象
const isObj = (obj) => {
	if (typeof obj !== 'object' && obj !== null) throw Error('传入的不是对象')
}

// 模拟实现new方法
const copyNew = (constructorFn, ...args) => {
	if (typeof constructorFn !== 'function') throw Error('传入的不是构造函数')
	const obj = Object.create(constructorFn.prototype) // 将obj的隐式原型指向构造函数的显式原型
	const res = constructorFn.apply(obj, args) // 将构造函数的this绑定到obj上
	// 构造函数可能返回一个对象
	const isObj = typeof res === 'object' && res !== 'null' // eslint-disable-line
	const isFn = typeof res === 'function'
	return isObj || isFn ? res : obj
}

// 获取一个对象自身的不可枚举属性数组
const getNotEnumerable = (obj) => {
	const target = obj
	const enum_and_nonenum = Object.getOwnPropertyNames(target) // 获取一个对象的所有自身属性的属性名（包括不可枚举属性）的数组
	const enum_only = Object.keys(target) // 获取一个对象的所有自身可枚举属性的属性名的数组
	return enum_and_nonenum.filter((key) => {
		const indexInEnum = enum_only.indexOf(key)
		return indexInEnum === -1
	})
}

// 深冻结对象
const deepFreeze = (obj) => {
	// // 取回定义在obj上的属性名
	// const propNames = Object.getOwnPropertyNames(obj)
	//
	// for (const item of propNames) {
	//     const prop = obj[item]
	//     // 如果prop是个对象，冻结它
	//     if (typeof prop === 'object' && prop !== null) {
	//         this.deepFreeze(prop)
	//     }
	// }
	// // 冻结自身
	// return Object.freeze(obj)
}

const judgeType = (obj) => { // 判断数据类型
	const class2type = {}
	'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[`[object ${ e }]`] = e.toLowerCase())
	if (obj === null) return String(obj)
	return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

const arrChange = (a, b): any => { // 两个数组相减，大数组中去除小数组含有的项
	for (let i = 0; i < b.length; i++) {
		for (let j = 0; j < a.length; j++) {
			if (a[j] === b[i]) { // 如果是id相同的，那么a[ j ].id === b[ i ].id
				a.splice(j, 1)
				j -= 1
			}
		}
	}
	return a
}

// 随机生成32位字符串
const randomString = (len = 32): string => {
	const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
	const maxPos = $chars.length
	let pwd = ''
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return pwd
}

// 打电话
const call = (phone: string): void => {
	uni.makePhoneCall({
		phoneNumber: phone
	})
}

// 两个数组相减，大数组中去除小数组含有的项
const arrReduce = (a: Array<any>, b: Array<any>): Array<any> => {
	for (let i = 0; i < b.length; i++) {
		for (let j = 0; j < a.length; j++) {
			if (a[j] === b[i]) { // 如果是id相同的，那么a[ j ].id === b[ i ].id
				a.splice(j, 1)
				j -= 1
			}
		}
	}
	return a
}

// 判断是否闰年 闰年判定方法：能被400整除。或者能被4整除但不能被100整除
const getRemainYear = (y = Number(new Date().getFullYear())): boolean => y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)

// 是否是ios
const isIos = (): boolean => {
	const u = navigator.userAgent
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // eslint-disable-line
}

// 是否是安卓
const isAndroid = (): boolean => {
	const u = navigator.userAgent
	return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
}

// 生肖计算
const getShengXiao = (year) => {
	const arr = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊']
	return (/^\d{4}$/).test(year) ? arr[year % 12] : ''
}

const getAge = (strBirthday) => { // 根据出生日期算出年龄 getAge('1995-09-26')/getAge('1995-9-26')/
	let returnAge = null
	const strBirthdayArr = strBirthday.split('-')
	const birthYear = strBirthdayArr[0] // eslint-disable-line
	const birthMonth = strBirthdayArr[1] // eslint-disable-line
	const birthDay = strBirthdayArr[2] // eslint-disable-line

	const d = new Date()
	const nowYear = d.getFullYear()
	const nowMonth = d.getMonth() + 1
	const nowDay = d.getDate()

	if (nowYear == birthYear) {
		returnAge = 0// 同年 则为0岁
	} else {
		const ageDiff = nowYear - birthYear // 年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				const dayDiff = nowDay - birthDay // 日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1
				} else {
					returnAge = ageDiff
				}
			} else {
				const monthDiff = nowMonth - birthMonth // 月之差
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

// 得到纯数字
const getNum = (text) => text.replace(/[^0-9]/ig, '')

// 随机取出数组元素
const makeRandomArr = (arrList, num) => {
	if (num > arrList.length) {
		num = arrList.length // eslint-disable-line
	}
	const tempArr = arrList.slice(0)
	const newArrList = []
	for (let i = 0; i < num; i++) {
		const random = Math.floor(Math.random() * (tempArr.length))
		const arr = tempArr[random]
		tempArr.splice(random, 1)
		newArrList.push(arr)
	}
	return newArrList
}

// 设置cookie
const setCookie = (cname: string, cvalue: any, days: number): void => {
	let expires = ''
	if (days == 0) {
		expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT'
	} else {
		const d = new Date()
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
		expires = `expires=${ d.toUTCString() }`
	}
	document.cookie = `${ cname }=${ cvalue };${ expires };path=/`
}

// 得到cookie
const getCookie = (cname): string => {
	const name = `${ cname }=`
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}

const delCookie = (name): void => {
	// const date = new Date()
	// date.setTime(date.getTime() - 10000)
	// const cval = getCookie(name)
	// if (cval != null) document.cookie = `${name}=v; expire=${date.toGMTString()}; path=/`
}


const setStorage = (key: string, data: any): any => {
	uni.setStorage({
		key,
		data,
		success () {
			console.log('存储成功', data)
		},
		fail (err) {
			console.log(err)
		}
	})
}

const storageSync = (key: string, data: any): any => {
	uni.setStorageSync(key, data)
}

const getStorage = (key: string): any => {
	uni.getStorage({
		key,
		success (res) {
			console.log('获取成功', res.data)
			return res.data
		},
		fail (err) {
			console.log(err)
		}
	})
}

const getStorageSync = (key: string): any => uni.getStorageSync(key)

const debounce = (fn: any, delay: number = 1000): any => { // 防抖 实时搜索
	// 记录上一次的延时器
	let timer = null
	return function () { // eslint-disable-line
		const args = arguments // eslint-disable-line
		const that = this // eslint-disable-line
		// 清除上一次延时器
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(that, args)
		}, delay)
	}
}

const throttle = (fn: any, wait: number = 1000): any => { // 节流 滚动条 点击搜索按钮
	let last = null
	let timer = null
	const interval = wait

	console.log(this)

	return function () { // eslint-disable-line
		const th = this // eslint-disable-line
		const args = arguments // eslint-disable-line
		const now = Number(new Date())

		if (last && now - last < interval) {
			clearTimeout(timer)
			timer = setTimeout(() => { // eslint-disable-line
				last = now
				fn.apply(th, args)
			}, interval)
		} else {
			last = now
			fn.apply(th, args)
		}
	}
}

// 生成随机数 min<=num<=max
const randomNum = (min, max): number => Math.floor(Math.random() * (max - min + 1)) + min

// 生成随机数加小数
const randomNumDecimal = (min, max): number => ((Math.random() * (max - min + 1)) + min).toFixed(2)

// 云函数
const yunFun = (name, params, success, showToast = true, message = '正在玩命的加载中') => {
	if (showToast) {
		roots.showLoading(message) // 加载loading
	}
	wx.cloud.callFunction({
		name, // 云函数名称
		data: params
	}).then(res => { // 调用成功
		uni.hideLoading()
		success(res)
	}).catch(err => { // eslint-disable-line
		// console.log(err)
		// fail(err)
	})
}

// 数组排序
const arrSort = (prop, type, desc = 'down') => { // eslint-disable-line
	if (type == 'date' && desc == 'down') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return Date.parse(val1) - Date.parse(val2)
		}
	}

	if (type == 'date' && desc == 'up') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return Date.parse(val2) - Date.parse(val1)
		}
	}

	if (type == 'num' && desc == 'down') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return val1 - val2
		}
	}

	if (type == 'num' && desc == 'up') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return val2 - val1
		}
	}

	if (type == 'yw' && desc == 'down') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop].toLowerCase()
			const val2 = obj2[prop].toLowerCase()
			if (val1 < val2) {
				return -1
			}
			if (val1 > val2) {
				return 1
			}
			return 0
		}
	}

	if (type == 'yw' && desc == 'up') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop].toLowerCase()
			const val2 = obj2[prop].toLowerCase()
			if (val1 < val2) {
				return 1
			}
			if (val1 > val2) {
				return -1
			}
			return 0
		}
	}

	if (type == 'zw' && desc == 'down') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return val2.localeCompare(val1)
		}
	}

	if (type == 'zw' && desc == 'up') {
		return function (obj1, obj2) { // eslint-disable-line
			const val1 = obj1[prop]
			const val2 = obj2[prop]
			return val1.localeCompare(val2)
		}
	}
}

// 数组乱序 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
const randomArray = (array = []): any[] => array.sort(() => Math.random() - 0.5)

// 字符串去除空格
const trim = (str, pos = 'both') => {
	if (pos == 'both') {
		return str.replace(/^\s+|\s+$/g, '')
	} else if (pos == 'left') {
		return str.replace(/^\s*/, '')
	} else if (pos == 'right') {
		return str.replace(/(\s*$)/g, '')
	} else if (pos == 'all') {
		return str.replace(/\s+/g, '')
	}
	return str
}

const getYourIP = () => {
	// @ts-ignore
	const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
	// @ts-ignore
	if (RTCPeerConnection) {
		(function () { // eslint-disable-line
			const rtc = new RTCPeerConnection({ iceServers: [] })
			// @ts-ignore
			if (1 || window.mozRTCPeerConnection) { // eslint-disable-line
				rtc.createDataChannel('', { reliable: false })
			}

			rtc.onicecandidate = function (evt) { // eslint-disable-line
				if (evt.candidate) grepSDP(`a=${ evt.candidate.candidate }`)
			}
			rtc.createOffer((offerDesc) => {
				grepSDP(offerDesc.sdp)
				rtc.setLocalDescription(offerDesc)
			}, (e) => { console.warn('offer failed', e) })


			const addrs = Object.create(null)
			addrs['0.0.0.0'] = false

			function updateDisplay (newAddr) {
				if (newAddr in addrs) return
				addrs[newAddr] = true
				const displayAddrs = Object.keys(addrs).filter((k) => addrs[k])
				for (let i = 0; i < displayAddrs.length; i++) {
					if (displayAddrs[i].length > 16) {
						displayAddrs.splice(i, 1)
						i--
					}
				}
				console.log(`ip${ displayAddrs[0] }`)
			}

			function grepSDP (sdp) {
				const hosts = []
				sdp.split('\r\n').forEach((line, index, arr) => {
					if (~line.indexOf('a=candidate')) { // eslint-disable-line
						var parts = line.split(' ') // eslint-disable-line
						var addr = parts[4] // eslint-disable-line
						const type = parts[7] // eslint-disable-line
						if (type === 'host') updateDisplay(addr) // eslint-disable-line
					} else if (~line.indexOf('c=')) { // eslint-disable-line
						var parts = line.split(' ') // eslint-disable-line
						var addr = parts[2] // eslint-disable-line
						updateDisplay(addr) // eslint-disable-line
					}
				})
			}
		})()
	}
}

export {
	randomNumDecimal,
	trim,
	randomArray,
	arrSort,
	yunFun,
	randomNum,
	throttle,
	debounce,
	getAge,
	getNum,
	setStorage,
	storageSync,
	getStorage,
	getStorageSync,
	setCookie,
	getCookie,
	delCookie,
	getShengXiao,
	judgeType,
	isIos,
	isAndroid,
	arrReduce,
	getRemainYear,
	randomString,
	call,
	isArrayFn,
	arrDelBlank,
	insertStr,
	isNumStr,
	delSpecifiedLocation,
	jumpWX,
	loadJS,
	conver,
	arrDelDuplicate,
	getParam,
	copyNew,
	isObj,
	getNotEnumerable,
	deepFreeze,
	arrChange
}
