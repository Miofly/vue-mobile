import ajax from './ajax'
import axios from 'axios'
import {tu} from 'mioJs/toolUtils'
const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl
instanceOne.defaults.withCredentials = false // 实例的baseurl


const xcxId = 1


const getData = (type, pageNum, pageSize) => ajax({
    url: `https://api-xcx.idoujia.cn/api/video/video-list?page=${pageNum}&per_page=${pageSize}&classify_id=${type}&xcx_id=${xcxId}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: false
})

const getDataTj = (vid, type) => ajax({
    url: `https://api-xcx.idoujia.cn/api/video/video-detail?vid=${vid}&classify_id=${type}&xcx_id=${xcxId}&per_page=9&page=1`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: false
})



const getDataSjs = (vid, type) => ajax({
    url: `https://api-xcx.idoujia.cn/api/video/video-rand?num=${tu.randomNum(5, 15)}&xcx_id=${xcxId}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: false
})

const publicPost = (url, data, showLoading = true) => ajax({
    url: 'https://api-xcx.idoujia.cn/api/' + url,
    method: 'POST',
    data: data == undefined ? {xcx_id: xcxId} : Object.assign(data, {xcx_id: xcxId}),
    showLoading: showLoading
})

const commonPost = (url, data, showLoading = true) => ajax({
    url: url,
    method: 'POST',
    data: data,
    showLoading: showLoading
})

const publicGet = (url, showLoading = true) => ajax({
    url: `https://api-xcx.idoujia.cn/api/${url}?xcx_id=${xcxId}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: showLoading
})


export {
    getDataSjs,
    getDataTj,
    getData,
    commonPost,
    publicGet,
    publicPost,
}
