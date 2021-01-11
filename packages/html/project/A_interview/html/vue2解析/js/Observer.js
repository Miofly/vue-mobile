// Observer.js

// 在 Observer 类中我们要对 data 数据进行观测，也就是将它简称响应式的数据，逻辑封装在 observe 函数中。
export default class Observer {
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        // 循环遍历数据
        for (const key in data) {
            const value = data[key]
            defineReactive(data, key, value)
        }
    }
}

function defineReactive(obj, key, value) {
    // 深度检测，如果该属性值还是一个对象，也要将其变成响应式的
    if (value && typeof value === 'object') {
        new Observer(value)
    }
    // 将数据的每一个属性都变成 getter 和 setter 的形式，实现侦测
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                value = newValue
                // 该属性被赋予的新值也要对其进行变化侦测
                if (value && typeof value === 'object') {
                    new Observer(value)
                }
            }
        }
    })
}
