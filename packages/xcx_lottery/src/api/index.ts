import ajax from './ajax'
// #ifdef H5
// @ts-ignore
const defaultUrl = '/dzp' // eslint-disable-line
// #endif
// #ifdef MP-WEIXIN
// @ts-ignore
const defaultUrl = 'https://88umr.cn/api/wheel' // eslint-disable-line
// #endif
const commonPost = (url, data = {}, showLoading = true) => ajax({
    url: defaultUrl + url,
    method: 'POST',
    data,
    showLoading
})

const commonGet = (url, showLoading = true) => ajax({
    url: defaultUrl + url,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

const commonGetOther = (url, showLoading = true) => ajax({
    url: `https://88umr.cn/api${url}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})


export {
    commonGetOther,
    commonPost,
    commonGet
}
