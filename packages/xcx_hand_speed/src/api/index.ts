import ajax from './ajax'
// const defaultUrl = process.env.VUE_APP_BASE_API
const defaultUrl = 'http://xcx.shortl.cn:443'

const commonPost = (url, data = {}, showLoading = true, contentType) => ajax({
	url: defaultUrl + url,
	method: 'POST',
	data,
	showLoading,
	contentType
})

const commonOtherPost = (url, data = {}, showLoading = true) => ajax({
	url,
	method: 'POST',
	data,
	showLoading
})

const commonGet = (url, showLoading = true, getHeader) => ajax({
	url: defaultUrl + url,
	showLoading,
	getHeader
})

const commonOtherGet = (url, showLoading = true) => ajax({
	url,
	getHeader: {
		'Content-Type': 'json'
	},
	showLoading
})

export {
	commonOtherPost,
	commonOtherGet,
	commonPost,
	commonGet
}
