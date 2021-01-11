// Watcher.js
// 导入 Dep ，为了往 Dep 类上挂载静态属性
import Dep from "./Dep.js"

export default class Watcher {
    constructor(vm, expr, callback) {
        this.vm = vm
        this.expr = expr
        this.callback = callback
        // 获取老值
        this.oldValue = this.getValue()
    }

    getValue() {
        // 获取老值前给 Dep 类上添加静态属性 target 指向自身实例对象
        Dep.target = this
        const oldValue = getVal(this.expr, this.vm)
        // 取值完后删除静态属性
        Dep.target = null
        return oldValue
    }

    update() {
        // 更新时获取新值并触发回调函数
        const newValue = getVal(this.expr, this.vm)
        this.callback.call(this.vm, newValue, this.oldValue)
    }
}

// 取值的辅助函数，由于 expr 可能会传值 info.age 等，此时需要解析
function getVal(expr, vm) {
    return expr.split('.').reduce((data, currentVal) => {
        return data[currentVal]
    }, vm.$data)
}
