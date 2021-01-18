// @ts-ignore
import h5Copy from 'uJs/plugin/junyi-h5-copy'
// @ts-ignore
import test from 'uJs/test'
let flag, timer
let timeout = null
const roots = {
	// 信息提示
	showToast (title: string = '操作成功', icon: string | boolean = 'none', duration: number = 1300, mask: boolean = false): void {
		// @ts-ignore
		uni.showToast({ title, icon, duration, mask })
	},
	// loading设置
	showLoading (title: string = '正在加载', mask: boolean = true): void {
		uni.showLoading({
			title,
			mask // 防止触摸穿透
		})
	},
	getSpecialDays (y) { // 判断是否是余年
		if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
			return 29
		}
		return 28
	},
	getShengXiao (birth) { // 生肖计算
		birth = String(birth)
		const len = birth.length
		if (len < 4 && len != 2) {
			return ''
		}
		if (len == 2) {
			birth - 0 > 30 ? birth = `19${birth}` : birth = `20${birth}`
		}
		const year = (new Date(birth)).getFullYear()
		const arr = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊']
		return (/^\d{4}$/).test(String(year)) ? arr[year % 12] : ''
	},
	getAstro (m, d) { // 星座计算 getAstro(parseInt('09'), 26)
		// @ts-ignore
		return '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(m * 2 - (d < '102223444433'.charAt(m - 1) - -19) * 2, 2)
	},
	getAge (strBirthday) { // 根据出生日期算出年龄 getAge('1995-09-26')
		let returnAge
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
					const dayDiff = nowDay - birthDay// 日之差
					if (dayDiff < 0) {
						returnAge = ageDiff - 1
					} else {
						returnAge = ageDiff
					}
				} else {
					const monthDiff = nowMonth - birthMonth// 月之差
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
	},
	// 字符串过长截取+省略号
	strEllipsis (str: any, length: number): string {
		return String(str).length > length ? `${str.slice(0, length)}...` : str
	},

	// 复制文本
	copyText (data: string, callback = (res) => {
		if (res) {
			roots.showToast('复制成功')
		} else {
			roots.showToast('复制失败')
		}
	}): void {
		// #ifdef APP-PLUS || MP
		uni.setClipboardData({
			data,
			// @ts-ignore
			success (res) {
				uni.getClipboardData({
					success () {
						(typeof callback === 'function') && callback(true)
					},
					fail () {
						(typeof callback === 'function') && callback(false)
					}
				})
			},
			// @ts-ignore
			fail (res) {
				(typeof callback === 'function') && callback(false)
			}
		})
		// #endif
		// #ifdef H5
		const result = h5Copy(data)
		if (result === false) {
			callback(false) // eslint-disable-line
		} else {
			callback(true) // eslint-disable-line
		}
		// #endif
	},
	sha1 (s) { // 字符串加密成 hex 字符串 shal加密
		const data = new Uint8Array(this.encodeUTF8(s))
		var i, j, t // eslint-disable-line
		const l = ((data.length + 8) >>> 6 << 4) + 16
		// @ts-ignore
		var s = new Uint8Array(l << 2) // eslint-disable-line
		s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer) // eslint-disable-line
		for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2) // eslint-disable-line
		s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8)
		s[l - 1] = data.length << 3
		const w = []
		const f = [
			function () { // eslint-disable-line
				return m[1] & m[2] | ~m[1] & m[3]
			},
			function () { // eslint-disable-line
				return m[1] ^ m[2] ^ m[3]
			},
			function () { // eslint-disable-line
				return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]
			},
			function () { // eslint-disable-line
				return m[1] ^ m[2] ^ m[3]
			}
		]
		const rol = function (n, c) { // eslint-disable-line
			return n << c | n >>> (32 - c)
		}
		const k = [1518500249, 1859775393, -1894007588, -899497514]
		var m = [1732584193, -271733879, null, null, -1009589776]
		m[2] = ~m[0], m[3] = ~m[1] // eslint-disable-line
		// @ts-ignore
		for (i = 0; i < s.length; i += 16) { // eslint-disable-line
			const o = m.slice(0)
			for (j = 0; j < 80; j++) {
				w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),  // eslint-disable-line
					t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
					m[1] = rol(m[1], 30), m.pop(), m.unshift(t)
			}
			for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0
		}
		t = new DataView(new Uint32Array(m).buffer)
		// @ts-ignore
		for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2) // eslint-disable-line

		const hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), (e) => (e < 16 ? '0' : '') + e.toString(16)).join('')
		return hex
	},
	encodeUTF8 (s) {
		let i
		const r = []
		let c
		let x
		for (i = 0; i < s.length; i++) {
			if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
			else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F))
			else {
				if ((x = c ^ 0xD800) >> 10 == 0) { // 对四字节UTF-16转换为Unicode
					c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
						r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F))
				} else r.push(0xE0 + (c >> 12 & 0xF))
				r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F))
			}
		}
		return r
	},
	sortBy (attr, rev) { // 第二个参数没有传递 默认升序排列 true表示升序排列，false降序排序
		if (rev == undefined) {
			rev = 1
		} else {
			rev = (rev) ? 1 : -1
		}

		return function (a, b) {
			a = a[attr]
			b = b[attr]
			if (a < b) {
				return rev * -1
			}
			if (a > b) {
				return Number(rev)
			}
			return 0
		}
	},
	// 图片展示
	showImg (url: number): void {
		console.log(url)
		// @ts-ignore
		uni.previewImage({ urls: [url], current: 0 })
	},

	// 普通路由跳转
	push (url: string): void {
		uni.navigateTo({ url })
	},

	// 路由替换跳转
	replace (url: string): void {
		uni.redirectTo({ url })
	},

	// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。路径后不能带参数
	switchTab (url: string): void {
		uni.switchTab({ url })
	},

	// 关闭所有页面，打开到应用内的某个页面。
	reLaunch (url: string): void {
		uni.reLaunch({ url })
	},

	// 返回
	back () {
		window.history.back()
	},

	addUnit (value = 'auto', unit = 'rpx') {
		value = String(value)
		// 用uView内置验证规则中的number判断是否为数值
		return test.number(value) ? `${value}${unit}` : value
	},

	// 去除空格
	trim (str, pos = 'both') {
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
	},

	// 格式化对象
	gsh (str: any): void {
		return JSON.parse(JSON.stringify(str))
	},

	// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
	// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
	// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
	// 值(默认为undefined)，就是查找最顶层的$parent
	$parent (name: any = undefined) { // eslint-disable-line
		let parent = this.$parent
		// 通过while历遍，这里主要是为了H5需要多层解析的问题
		while (parent) {
			// 父组件
			if (parent.$options && parent.$options.name !== name) {
				// 如果组件的name不相等，继续上一级寻找
				parent = parent.$parent
			} else {
				return parent
			}
		}
		return false
	},

	// 得到 localStorage 数据
	getLocalData (str): any {
		return localStorage.getItem(str)
	},

	emptyPaading (str, sign): any {
		return str || sign
	},

	jumpWX () {
		window.location.replace('weixin://')
	},

	route (options = {}, params = false) { // 路由跳转 注意:本方法没有对跳转的回调函数进行封装
		let config = {
			type: 'navigateTo',
			url: '',
			delta: 1, // navigateBack页面后退时,回退的层数
			params: {}, // 传递的参数
			animationType: 'pop-in', // 窗口动画,只在APP有效
			animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
		}
		config = Object.assign(config, options)
		// 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
		if (config.url[0] != '/') config.url = `/${config.url}`
		// 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
		if (Object.keys(config.params).length && config.type != 'switchTab') {
			// 判断用户传递的url中，是否带有参数
			// 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
			// 如果有url中有get参数，转换后无需带上"?"
			let query = ''
			if ((/.*\/.*\?.*=.*/).test(config.url)) {
				// object对象转为get类型的参数
				query = this.queryParams(config.params, false)
				// 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
				config.url += `&${query}`
			} else {
				query = this.queryParams(config.params)
				config.url += query
			}
		}
		// 简写形式，把url和参数拼接起来
		if (typeof options === 'string' && typeof params == 'object') {
			let query = ''
			if ((/.*\/.*\?.*=.*/).test(<string>options)) { // eslint-disable-line
				// object对象转为get类型的参数
				query = this.queryParams(params, false)
				// 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
				options += `&${query}`
			} else {
				query = this.queryParams(params)
				options += query
			}
		}
		// 判断是否一个字符串，如果是，直接跳转(简写法)
		// 如果是中情形，默认第二个参数为对象形式的参数
		if (typeof options === 'string') {
			if (options[0] != '/') options = `/${options}`
			// @ts-ignore
			return uni.navigateTo({ url: options }) // eslint-disable-line
		}
		// navigateTo类型的跳转
		if (config.type == 'navigateTo' || config.type == 'to') {
			return uni.navigateTo({
				url: config.url,
				// @ts-ignore
				animationType: config.animationType,
				animationDuration: config.animationDuration,
			})
		}
		if (config.type == 'redirectTo' || config.type == 'redirect') {
			return uni.redirectTo({
				url: config.url,
			})
		}
		if (config.type == 'switchTab' || config.type == 'tab') {
			return uni.switchTab({
				url: config.url,
			})
		}
		if (config.type == 'reLaunch') {
			return uni.reLaunch({
				url: config.url
			})
		}
		if (config.type == 'navigateBack' || config.type == 'back') {
			return uni.navigateBack({
				delta: parseInt(config.delta ? config.delta : this.delta) // eslint-disable-line
			})
		}
	},

	// 对象转url参数 isPrefix,是否自动加上"?"
	queryParams (data = {}, isPrefix = true, arrayFormat = 'brackets') {
		const prefix = isPrefix ? '?' : ''
		const _result = [] // eslint-disable-line
		if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets'
		for (const key in data) { // eslint-disable-line
			const value = data[key]
			// 去掉为空的参数
			if (['', undefined, null].indexOf(value) >= 0) {
				continue // eslint-disable-line
			}
			// 如果值为数组，另行处理
			if (value.constructor === Array) {
				// e.g. {ids: [1, 2, 3]}
				switch (arrayFormat) {
				case 'indices':
					// 结果: ids[0]=1&ids[1]=2&ids[2]=3
					for (let i = 0; i < value.length; i++) {
						_result.push(`${key}[${i}]=${value[i]}`)
					}
					break
				case 'brackets':
					// 结果: ids[]=1&ids[]=2&ids[]=3
					value.forEach(_value => {
						_result.push(`${key}[]=${_value}`)
					})
					break
				case 'repeat':
					// 结果: ids=1&ids=2&ids=3
					value.forEach(_value => {
						_result.push(`${key}=${_value}`)
					})
					break
				case 'comma':
					// 结果: ids=1,2,3
					let commaStr = '' // eslint-disable-line
					value.forEach(_value => {
						commaStr += (commaStr ? ',' : '') + _value
					})
					_result.push(`${key}=${commaStr}`)
					break
				default:
					value.forEach(_value => {
						_result.push(`${key}[]=${_value}`)
					})
				}
			} else {
				_result.push(`${key}=${value}`)
			}
		}
		return _result.length ? prefix + _result.join('&') : ''
	},

	/**
	 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
	 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
	 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
	 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
	 * v-for的时候,推荐使用后端返回的id而不是循环的index
	 * @param {Number} len uuid的长度
	 * @param {Boolean} firstU 将返回的首字母置为"u"
	 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
	 */
	guid (len = 32, firstU = true, radix = null) {
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
		const uuid = []
		radix = radix || chars.length

		if (len) {
			// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
			for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
		} else {
			let r
			// rfc4122标准要求返回的uuid中,某些位为固定的字符
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
			uuid[14] = '4'

			for (let i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
				}
			}
		}
		// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
		if (firstU) {
			uuid.shift()
			return `u${uuid.join('')}`
		}
		return uuid.join('')
	},
	// 查询节点信息
	getRect (selector, all) {
		return new Promise(resolve => {
			uni.createSelectorQuery()
				.in(this)[all ? 'selectAll' : 'select'](selector)
				.boundingClientRect(rect => {
					if (all && Array.isArray(rect) && rect.length) {
						resolve(rect)
					}
					if (!all && rect) {
						resolve(rect)
					}
				})
				.exec()
		})
	},
	// 颜色处理
	rgbToHex (r, g, b) {
		return `#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)}`
	},
	toHex (n) {
		n = parseInt(n, 10)
		if (isNaN(n)) return '00'
		n = Math.max(0, Math.min(n, 255))
		return '0123456789ABCDEF'.charAt((n - n % 16) / 16) +
			'0123456789ABCDEF'.charAt(n % 16)
	},
	hexToRgb (hex) {
		const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex)
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null
	},
	setStorage (key: string, data: any) {
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
	},
	getStorage (key: string) {
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
	},
	getStorageSync (key: string) {
		return uni.getStorageSync(key)
	},
	randomNum (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	},
	makeRandomArr (arrList, num) {
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
	},
	/**
	 * 节流原理：在一定时间内，只能触发一次 动作发生后一段时间后触发事件，在这段时间内，如果动作又发生，则无视该动作，直到事件执行完后，才能重新触发。
	 * 滚动条 点击搜索按钮
	 * @param {Function} func 要执行的回调函数
	 * @param {Number} wait 延时的时间
	 * @param {Boolean} immediate 是否立即执行
	 * @return null
	 */
	throttle (func, wait = 500, immediate = true) {
		if (immediate) {
			if (!flag) {
				flag = true
				// 如果是立即执行，则在wait毫秒内开始时执行
				typeof func === 'function' && func()
				timer = setTimeout(() => {
					flag = false
				}, wait)
			}
		} else if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func()
			}, wait)
		}
	},
	/**
	 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数 动作发生后一定时间后触发事件，在这段时间内，如果该动作又发生，则重新等待一定时间再触发事件
	 * 实时搜索
	 * @param {Function} func 要执行的回调函数
	 * @param {Number} wait 延时的时间
	 * @param {Boolean} immediate 是否立即执行
	 * @return null
	 */
	debounce (func, wait = 500, immediate = false) {
		// 清除定时器
		if (timeout !== null) clearTimeout(timeout)
		// 立即执行，此类情况一般用不到
		if (immediate) {
			const callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if (callNow) typeof func === 'function' && func()
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			timeout = setTimeout(() => {
				typeof func === 'function' && func()
			}, wait)
		}
	},
	conver (limit) {
		let size = ''
		if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
			size = `${limit.toFixed(2)}B`
		} else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
			size = `${(limit / 1024).toFixed(2)}KB`
		} else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
			size = `${(limit / (1024 * 1024)).toFixed(2)}MB`
		} else { // 其他转化成GB
			size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`
		}
		
		const sizestr = `${size}`
		const len = sizestr.indexOf('.')
		const dec = sizestr.substr(len + 1, 2)
		if (dec == '00') { // 当小数点后为00时 去掉小数部分
			return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
		}
		return sizestr
	},
	timeCompute (allTime: number) {
		// @ts-ignore
		const day = parseInt((allTime / (1000 * 60 * 60 * 24)))
		// @ts-ignore
		let hour = parseInt((allTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		// @ts-ignore
		let minutes = parseInt((allTime % (1000 * 60 * 60)) / (1000 * 60))
		// @ts-ignore
		let seconds = parseInt((allTime % (1000 * 60)) / 1000)
		// @ts-ignore
		hour = hour < 10 ? (`0${hour}`) : hour
		// @ts-ignore
		minutes = minutes < 10 ? (`0${minutes}`) : minutes
		// @ts-ignore
		seconds = seconds < 10 ? (`0${seconds}`) : seconds
		const newDay = day == 0 ? '' : `${day}天`
		return `${newDay}${hour}:${minutes}:${seconds}`
	},
	isEmpty (str) {
		if (str == '' || str == undefined || str == null) return true
	},
	setCookie (cname: string, cvalue: any, days?: number) {
		let expires = ''
		// @ts-ignore
		if (days == 0 || days == '') {
			expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT'
		} else {
			const d = new Date()
			d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
			expires = `expires=${d.toUTCString()}`
		}
		document.cookie = `${cname}=${cvalue};${expires};path=/`
	},
	getCookie (cname) {
		const name = `${cname}=`
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
	},
	delCookie (name) {
		const date = new Date()
		date.setTime(date.getTime() - 10000)
		const cval = this.getCookie(name)
		if (cval != null) document.cookie = `${name}=; expire=${date.toUTCString()}; path=/`
	}
}

export default roots
