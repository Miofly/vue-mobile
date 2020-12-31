// #ifdef MP-WEIXIN
// @ts-ignore
import axios from 'uJs/plugin/uni-axios'
// #endif
// #ifdef H5
// @ts-ignore
import axios from 'axios' // eslint-disable-line
// #endif
import root from 'uJs/root'
import { AxiosRequestConfig } from './types'

// axios 默认配置
axios.defaults.baseURL = 'http://127.0.0.1:8686/mock-api/v1' // 优先级比axios实例要低
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true // 允许axios请求携带cookie等凭证

// 创建一个 axios 实例 ==> instanceOne
const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl


axios.interceptors.request.use(config => {
	// #ifdef H5
	const token = localStorage.getItem('TOKEN_KEY')
	config.headers.Authorization = `${token}`
	// #endif
	return config
}, error => Promise.reject(error))

// 响应拦截器
axios.interceptors.response.use(response => {
	// #ifdef H5
	if (response.data.code !== 200) {
		if (response.data.code == 403) {
			root.showToast('登录已过期...正在跳转至登录界面...')
			localStorage.removeItem('TOKEN_KEY')
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/moduleOne/appletsFront/user/login'
				})
				console.log('执行了吗')
				// Router.replaceAll({name: 'login'})
			}, 2000)

		} else {
			// root.showToast(response.data.message)
		}
	}
	response.data.data.token && localStorage.setItem('TOKEN_KEY', response.data.data.token)
	// #endif
	return response
}, (error) => {
	console.log(error)
	// root.showToast('请求出错')
})

function ajax (config: AxiosRequestConfig): any {
	const {
		sourceAxios = axios, url = '', data = null, params = null, method = 'get',
		cancelBefore = false, errHandle = false, getHeader, contentType, showLoading = true
	} = config
	let promise: any = null

	return new Promise((resolve, reject) => {
		// 执行异步ajax请求
		if (method.toUpperCase() === 'GET') {
			// 发送get请求
			promise = sourceAxios({ url, params, headers: getHeader })
		} else {
			// 发送post请求
			// @ts-ignore
			promise = sourceAxios({ method: 'POST', url, data, headers: contentType })
		}

		promise.then((response) => {
			if (showLoading) {
				uni.hideLoading()
			}
			const resMess = { // 封装返回成功的数据信息
				data: response.data,
				status: response.status,
				statusText: response.statusText
			}
			if (response.status === 200) {
				resolve(response.data)
			} else {
				console.log('请求失败', resMess)
			}
		}).catch((err) => { // 失败了调用reject()
			if (showLoading) {
				uni.hideLoading()
			}
			if (!errHandle) { // 全局错误的提示
				console.log('请求出错')
				// root.showToast('请求出错')
			}
			reject(err)
		})
	})
}

export default ajax
