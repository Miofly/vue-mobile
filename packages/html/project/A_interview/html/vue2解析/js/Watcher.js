// Watcher.js
// 导入 Dep ，为了往 Dep 类上挂载静态属性
import Dep from "./Dep.js"
/*
 可以看到 Watcher 类中有一个惊人的操作，就是在 getValue 方法中。
 每当我们 new Watcher 的时候，会自动调用这个方法，并且给 Dep 添加静态属性 target 指向实例对象本身，获取之后将其移除。

 可能你看到这里后觉得这并没有什么稀奇的，还会觉得多此一举。如果是这样，我来提醒你一点，你忽略了中间的取值操作：this.vm[key]。
 这是在取值，取值不就会触发 getter 方法吗，那在取值的这一步操作中就刚好可以获取到 Dep.target 的值了，并且取值后它就不存在了，这是为了防止同一依赖被收集多次，造成重复的更新。
 顺着这个思路我们就应该回到 `Observer` 类中来使用依赖收集器来添加依赖了。我们需要在 `getter` 中收集依赖，在 `setter` 中通知依赖更新。

 */
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
