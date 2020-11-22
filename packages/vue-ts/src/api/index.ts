import ajax from './ajax'

const dbJsonData = (type, index = 0, count = 3): any => ajax({
    url: `/db/j/search_subjects?type=movie&tag=${type}&sort=time&page_limit=${count}&page_start=${index * count}`, // eslint-disable-line
    getHeader: {
        'Content-Type': 'json'
    }
})

const lbVideoPost = (url, data, showLoading = true): any => ajax({
    url: `https://api-xcx.idoujia.cn/api/${url}`,
    method: 'POST',
    data: data == 'undefined' ? { xcx_id: 1 } : Object.assign(data, { xcx_id: 1 }),
    showLoading
})

const lbVideoGet = (url, params, showLoading = true): any => ajax({
    url: `https://api-xcx.idoujia.cn/api/${url}`,
    params: params == 'undefined' ? { xcx_id: 1 } : Object.assign(params, { xcx_id: 1 }),
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

const commonPost = (url, data = {}, showLoading = true) => ajax({
    url,
    method: 'POST',
    data,
    showLoading
})

const commonGet = (url, showLoading = true) => ajax({
    url,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

const goodGirlData: any = (type = 'Android', pageNum: number, pageSize: number) => ajax({
    url: `https://gank.io/api/v2/data/category/GanHuo/type/${type}/page/${pageNum}/count/${pageSize}`,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading: false
})


const appletsPost = (url, data = {}, showLoading = true): any => ajax({
    // url: `http://new-lz-test.52eja.com:443/api/${url}`,
    // url: `http://api.xiyouzhuan2020.com/api/${url}`,
    url: `http://api.lezhuan2020.cn/api/${url}`,
    method: 'POST',
    data,
    showLoading
})

const appletsGet = (url, params, showLoading = true): any => ajax({
    // url: `http://new-lz-test.52eja.com:443/api/${url}`,
    // url: `http://api.xiyouzhuan2020.com/api/${url}`,
    url: `http://api.lezhuan2020.cn/api/${url}`,
    params,
    getHeader: {
        'Content-Type': 'json'
    },
    showLoading
})

export {
    appletsGet,
    appletsPost,
    dbJsonData,
    goodGirlData,
    lbVideoPost,
    lbVideoGet,
    commonPost,
    commonGet
}
