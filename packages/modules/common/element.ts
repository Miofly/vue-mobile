// @ts-ignore
import { Message } from 'element-ui'

const elm = {
	showSuccess (message = '操作成功') {
		Message({ showClose: false, message, type: 'success', duration: 2000, center: true })
	},
	showError (message = '操作失败') {
		Message({ showClose: false, message, type: 'error', duration: 2000, center: true })
	}
}

export default elm
