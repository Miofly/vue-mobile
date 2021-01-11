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
