import ajax from './ajax'
// #ifdef MP-WEIXIN
const default_url = process.env.VUE_APP_BASE_API
// #endif
const commonPost = (url, data = {}, showLoading = true) => ajax({
    // #ifdef MP-WEIXIN
    // @ts-ignore
    url: default_url + url,
    // #endif
    // #ifdef H5
    // @ts-ignore
    url,
    // #endif
    method: 'POST',
    data,
    showLoading
})

const commonGet = (url, showLoading = true) => ajax({
    // #ifdef MP-WEIXIN
    // @ts-ignore
    url: default_url + url,
    // #endif
    // #ifdef H5
    // @ts-ignore
    url,
    // #endif
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

export {
    commonPost,
    commonGet
}
