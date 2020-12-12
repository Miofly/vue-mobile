import ajax from './ajax'
const defaultUrl = process.env.VUE_APP_BASE_API

const commonPost = (url, data = {}, showLoading = true) => ajax({
	url: defaultUrl + url,
	method: 'POST',
	data,
	showLoading
})

const commonOtherPost = (url, data = {}, showLoading = true) => ajax({
	url,
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
