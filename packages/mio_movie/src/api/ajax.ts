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
const Qs = require('qs')

// axios 默认配置
axios.defaults.baseURL = process.env.VUE_APP_BASE_API // 优先级比axios实例要低
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = false // 允许axios请求携带cookie等凭证

// 创建一个 axios 实例 ==> instanceOne
const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl

axios.interceptors.request.use(
    config =>
        // #ifdef H5
        // const token = localStorage.getItem('TOKEN_KEY')
        // config.headers.Authorization = `${token}`
        // #endif
	    // eslint-disable-next-line implicit-arrow-linebreak
        config
    , error => Promise.reject(error)
)

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
                // Router.replaceAll({name: 'login'})
            }, 2000)
        } else {
            console.log(response.data.message)
            root.showToast(response.data.message)
        }
    }
    // response.data.data.token && localStorage.setItem('TOKEN_KEY', response.data.data.token)
    // #endif
    return response
}, (error) => {
    const error_message = error.response
    if (error.response) {
        const { status, data, config, request } = error_message
        console.log(`报错接口信息URL：${request.responseURL}`)
        console.log(`报错接口信息请求头：${JSON.stringify(config.headers)}`)
        console.log(`报错接口信息参数：${config.data}`)
        console.log(`报错接口信息返回信息：${JSON.stringify(data)}`)
        console.log(`报错接口信息请求方式：${config.method}`)
        console.log(`报错接口信息状态：${status}`)
        root.showToast('网络错误！请稍后再试...')
    }
    return Promise.reject(error.response)
})

function ajax (config: AxiosRequestConfig): any {
    const {
        sourceAxios = axios, url = '', data = null, params = null, method = 'get', headers
    } = config
    let promise: any = null
    return new Promise((resolve, reject) => {
        // 执行异步ajax请求
        if (method.toUpperCase() === 'GET') {
            // 发送get请求
            promise = sourceAxios({ method: 'GET', url, headers })
        } else {
            // 发送post请求
            if (headers['content-type'] == 'application/x-www-form-urlencoded') { // eslint-disable-line
                promise = sourceAxios({ method: 'POST', url, data: Qs.stringify(data), headers })
            } else {
                promise = sourceAxios({ method: 'POST', url, data, headers })
            }
        }

        promise.then((response) => {
            uni.hideLoading()
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
            reject(err)
        })
    })
}

export default ajax
