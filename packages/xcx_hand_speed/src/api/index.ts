import ajax from './ajax'

const defaultUrl = 'http://127.0.0.1:8686/mock-api/v1'

const commonPost = (url, data = {}, showLoading = true) => ajax({
	url: defaultUrl + url,
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

export {
	commonPost,
	commonGet
}
