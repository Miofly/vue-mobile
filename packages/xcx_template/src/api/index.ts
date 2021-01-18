import ajax from './ajax'
// #ifdef MP-WEIXIN
const default_url = process.env.VUE_APP_BASE_API_WX
// #endif
const commonPost = (url, data?, headers?) => ajax({
    // #ifdef MP-WEIXIN
    // @ts-ignore
    // eslint-disable-next-line no-dupe-keys
    url: default_url + url, // eslint-disable-next-line no-dupe-keys
    // #endif
    // #ifdef H5
    // @ts-ignore
    // eslint-disable-next-line no-dupe-keys
    url,
    // #endif
    data,
    headers,
    method: 'post',
})

const commonGet = (url, headers?) => ajax({
    // #ifdef MP-WEIXIN
    // @ts-ignore
    url: default_url + url,
    // #endif
    // #ifdef H5
    // @ts-ignore
    // eslint-disable-next-line no-dupe-keys
    url,
    // #endif
    headers
})

export {
    commonPost,
    commonGet
}
