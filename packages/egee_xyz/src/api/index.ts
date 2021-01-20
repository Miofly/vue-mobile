import ajax from './ajax'

const appletsPost = (url, data = {}, showLoading = true): any => ajax({
    // url: `http://new-lz-test.52eja.com:443/api/${url}`,
    // url: `http://api.xiyouzhuan2020.com/api/${url}`,
    url: `http://api.xiyouzhuan2020.com/api/${url}`,
    method: 'POST',
    data,
    showLoading
})

const appletsGet = (url, params, showLoading = true): any => ajax({
    // url: `http://new-lz-test.52eja.com:443/api/${url}`,
    // url: `http://api.xiyouzhuan2020.com/api/${url}`,
    url: `http://api.xiyouzhuan2020.com/api/${url}`,
    params,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

export {
    appletsGet,
    appletsPost,
}
