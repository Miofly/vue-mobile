import mioCfg from './config'
import mioRoot from './root'
import mioTime from './timeUtils'
import mioTest from './test'
import mioEle from './element'

const $mio = {
    mioCfg,
    mioRoot,
    mioTime,
	mioEle,
    mioTest,
}

const install = Vue => {
    Vue.prototype.$mio = $mio
}

export default {
    install
}
