import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl
instanceOne.defaults.withCredentials = false // 实例的baseurl

const commonPost = (url, data) => ajax({
    // url: 'http://new-lz-test.52eja.com:443/api' + url,


    // url: 'http://api.lezhuan2020.cn/api' + url,
    url: 'http://api.xiyouzhuan2020.com/api' + url,
    // url: 'http://api.weifenxiang2020.com/api' + url,
    method: 'POST',
    data: data,
    getHeader: {
        'Content-Type': 'multipart/form-data'
    }
})

const publicGet = (url) => ajax({
    sourceAxios: instanceOne,
    url: url,
    getHeader: {
        'Content-Type': 'json'
    }
})


export {
    publicGet,
    commonPost,
}
