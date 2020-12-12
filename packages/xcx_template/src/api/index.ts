import ajax from './ajax'

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


export {
    goodGirlData,
    commonPost,
    commonGet
}
