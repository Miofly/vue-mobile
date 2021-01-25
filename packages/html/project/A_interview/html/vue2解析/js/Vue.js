// Vue.js
import Observer from './Observer.js'
import Compile from './Compile.js'


export default class Vue {
    constructor(options) {
        this.$options = options
        this.$el = typeof options.el === 'string'
            ? document.querySelector(options.el)
            : options.el
        this.$data = typeof options.data === 'function'
            ? options.data()
            : options.data

        // 数据代理
        this.proxyData()

        // 数据观测 数据劫持
        // 在我们 new Vue() 传入 data 数据的时候，会默认自动的进行 new Observer 操作，此时会直接对 data 数据进行深层次的响应式转化，会很浪费性能。
        // 当我们的初始化 data 数据是一个嵌套层次很深的对象类型的数据时，默认一上来就会进行递归操作讲所有的 key 都变成 getter 和 setter 形式，这会造成性能的浪费。
        // 但是这是不可避免的。但是在 Vue3.0 中由于没有使用 Object.defineProperty 这一特性，所以初始化数据的时候没有进行递归操作，性能得到了大幅度提升。

        // 除了对初始化数据时的性能不好的分析外，我们还应该分析到对于对象类型的数据来说，新增和删除属性时，是不能被侦测到的。
        // 知道了原理后，这也很好解释，因为 for ... in ... 循环遍历不到新添加的属性，
        // Object.defineProperty 也不能监测到删除的操作。所以对于对象类型的数据来说，新增和删除属性是不能被监测到的。
        // 虽然因为 Object.defineProperty 这一 API 的缺点我们无法侦测对象数据的新增属性和删除属性的操作，但是 Vue2.x 中为我们实现好了 $set 方法来弥补这一缺失。
        // 知道了这些原理后，我们在以后的开发中遇到为对象新增删除属性的操作时就要使用 `$set` 来实现。
        new Observer(this.$data)

		// 模板编译
		new Compile(this.$el, this)
    }
    // 我们在实现响应式之前先来实现 Vue 中的数据代理，我们在使用 Vue 的时候，或者 data 中的数据直接是 this.name 或者 this.info，
    // 并不会使用 this.$data.name 尽管这样是可行的，但是会让我们的每次取值都变得很麻烦。所以在 Vue 中为我们实现了数据的代理。我们来看一下内部的实现：
    // 实现了数据代理，this.$data 中的数据可以直接使用 this 来获取和修改。
    proxyData() {
        // 循环遍历 this.$data 上的属性
        for (const key in this.$data) {
            // 使用 Object.defineProperty Api 给 this 上扩展这些属性
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: false,
                // 取值时取 this.$data 中对应的值
                get() {
                    return this.$data[key]
                },
                // 设置值时直接设置 this.$data 中的值
                set(newValue) {
                    if (newValue !== this.$data[key]) {
                        this.$data[key] = newValue
                    }
                }
            })
        }
    }
}
