import mioCfg from './config'
import mioRoot from './root'
import mioTime from './timeUtils'
import mioTest from './test'

const $mio = {
    mioCfg,
    mioRoot,
    mioTime,
    mioTest,
}

const install = Vue => {
    Vue.prototype.$mio = $mio
}

export default {
    install
}
