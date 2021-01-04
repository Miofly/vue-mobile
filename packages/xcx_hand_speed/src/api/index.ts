import ajax from './ajax'
// const defaultUrl = process.env.VUE_APP_BASE_API
const defaultUrl = 'https://xcx-click.shortl.cn'

const commonPost = (url, data = {}, showLoading?, contentType?) => ajax({
	url: defaultUrl + url,
	method: 'POST',
	data,
	showLoading,
	contentType
})

const commonOtherPost = (url, data = {}, showLoading?) => ajax({
	url,
	method: 'POST',
	data,
	showLoading
})

const commonGet = (url, showLoading?, getHeader?) => ajax({
	url: defaultUrl + url,
	showLoading,
	getHeader
})

const commonOtherGet = (url, showLoading?) => ajax({
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
