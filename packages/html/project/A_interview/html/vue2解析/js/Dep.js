
/*
 在Observer.js我们已经将数据变成了 getter 和 setter 的形式，我们需要知道：
 在访问对象的属性时会调用 getter 方法，例如：访问 vm.name
 在设置对象的属性时会调用 setter 方法，例如：设置 vm.name = 'juejin'
 我们将数据变成这种形式的目的就是为了获取使用了数据的地方以及拦截修改数据的操作。 我们称前者获取使用了数据的地方为依赖收集，后者拦截修改数据的操作为数据劫持。

 依赖收集的目的：
 我们将页面中使用了数据的地方进行收集，等待拦截到数据修改的操作后我们通知这些使用了数据的地方更新数据，这就是响应式原理的核心。



 */


// Dep.js
export default class Dep {
    constructor() {
        // 使用数据储存所有的依赖
        this.deps = []
    }

    // 向数组中添加依赖的方法
    addDep(dep) {
        this.deps.push(dep)
    }

    // 通知所有依赖，让依赖触发它们的更新方法
    notify() {
        this.deps.forEach(w => w.update())
    }
}
