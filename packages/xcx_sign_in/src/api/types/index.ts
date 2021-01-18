export interface AxiosRequestConfig {
    sourceAxios?: any, // 配置多源默认接口，可传axios的实例instanceOne，或者直接传axios
    url?: string, // url
    data?: any, // Get请求传的参数
    params?: any, // Post请求传的参数
    method?: string, // 请求方法
    cancelBefore?: boolean, // 是否强制取消上一个没完成的请求
    errHandle?: boolean, // 单独提示错误信息设置，为true全局提示无效
        headers?: any, // get请求默认请求头
    showLoading?: boolean,
}
