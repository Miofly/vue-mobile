import ajax from './ajax'

const commonPost = (url, data?, headers?) => ajax({
    url,
    data,
    headers,
    method: 'post',
})

const commonGet = (url, headers?) => ajax({
    url,
    headers
})

export {
    commonPost,
    commonGet
}
