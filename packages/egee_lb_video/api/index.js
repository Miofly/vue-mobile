import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = 'http://xx2-new-lb.52xiaoshuo.cn/api/' // 实例的baseurl
// instanceOne.defaults.baseURL = 'http://lb-manage-api.52xiaoshuo.cn/api/' // 实例的baseurl
instanceOne.defaults.withCredentials = false // 实例的baseurl

const commonPost = (url, data) => ajax({
    sourceAxios: instanceOne,
    url: url,
    method: 'POST',
    data: data,
    getHeader: {
        'Content-Type': 'multipart/form-data'
    },
    showLoading: false
})

const commonGet = (url) => ajax({
    url: '/wx' + url,
    getHeader: {
        'Content-Type': 'json'
    }
})

const goodGirlData = (type = 'Android', pageNum, pageSize) => ajax({
    sourceAxios: instanceOne,
    url: `https://gank.io/api/v2/data/category/GanHuo/type/${type}/page/${pageNum}/count/${pageSize}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: false
})


export {
    goodGirlData,
    commonGet,
    commonPost,
}
