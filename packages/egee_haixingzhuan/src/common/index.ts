import miocfg from './config'
import mioroot from './root'
import miotime from './timeUtils'
import miotest from './test'

const $mio = {
    miocfg,
    mioroot,
    miotime,
    miotest
}

const install = Vue => {
    Vue.prototype.$mio = $mio
}

export default {
    install
}
