// Observer.js

// 在 Observer 类中我们要对 data 数据进行观测，也就是将它简称响应式的数据，逻辑封装在 observe 函数中。
// Observer.js
import Dep from "./Dep.js"

export default class Observer {
	constructor(data) {
		this.observe(data)
	}

	observe(data) {
		for (const key in data) {
			const value = data[key]
			defineReactive(data, key, value)
		}
	}
}

function defineReactive(obj, key, value) {
	if (value && typeof value === 'object') {
		new Observer(value)
	}
	// 创建依赖收集器
	const dep = new Dep()
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			// 收集依赖
			Dep.target && dep.addDep(Dep.target)
			return value
		},
		set(newValue) {
			if (newValue !== value) {
				value = newValue
				// 通知依赖
				dep.notify()
				if (value && typeof value === 'object') {
					new Observer(value)
				}
			}
		}
	})
}
