// Compile.js
/*
 分析 Compile 模块，我们需要在数据劫持后进行模块的编译，否则编译之后的视图不再依赖数据，所以 new Compile 的操作需要放到 new Observer 之后。
 在进行编译的时候我们有两个大的方向：

 需要对指令 v-xxx 进行编译
 需要对模板语法 {{ }} 进行编译

 对于这两步我们都需要获取到 vm.$el 从根元素开始遍历所有的节点，获取每一个节点中的属性和文本内容，如果需要解析则进行解析。
 知道这个主导方向之后，我们先来实现 Compile 的基本骨架，在这以前我们需要模拟一些指令和模板语法在页面中以及在 Vue.js 中使用 Compile：

 这里我们采用了文档碎片的方式将 DOM 储存起来，然后批量编译后追加回原来的容器中。这样做的好处就是避免大量的操作 DOM 引起性能力浪费，而是一次性的操作。
 之后的编译逻辑就在 compile 函数中展开了，我们需要遍历所有的节点，找出需要进行编译的节点，并且区分是编译模板还是指令：
 */

import Watcher from "./Watcher.js"

export default class Compile {
	constructor(el, vm) {
		this.el = el
		this.vm = vm
		// 将 DOM 添加到文档碎片中进行批量操作
		const fragment = this.nodeToFragment()
		// 编译文档碎片
		this.compile(fragment)
		// 将编译后的文档碎片添加回 DOM 中
		this.el.appendChild(fragment)
	}

	nodeToFragment() {
		const fragment = document.createDocumentFragment()
		while(this.el.firstChild) {
			fragment.appendChild(this.el.firstChild)
		}
		return fragment
	}

	compile(fragment) {
		// 遍历孩子节点
		Array.from(fragment.childNodes).forEach(child => {
			// 根据孩子节点的 nodeType 区分是元素节点还是文本节点
			// 从而区分需要编译指令还是模板，再调用对应的方法分开编译
			if (child.nodeType === 1) {
				// this.compileElement(child)
			} else if (child.nodeType === 3) {
				this.compileText(child)
			}
			// 递归遍历所有的子节点
			if (child.childNodes && child.childNodes.length > 0) {
				this.compile(child)
			}
		})
	}

	compileText(node) {
		const reg = /\{\{(.+?)\}\}/g
		const content = node.textContent
		if (reg.test(content)) {
			Utils.text(node, content, this.vm)
		}
	}
	// 编译元素标签
	compileElement(node) {
		// 获取所有的属性并且遍历
		const attrs = Array.from(node.attributes)
		attrs.forEach(attr => {
			// 如果含有指令属性就进行解析
			if (attr.name.startsWith('v-')) {
				const name = attr.name.split('v-')[1]
				const [directive, methodName] = name.split(':')
				const value = attr.value
				// 每一种指令对应一种解析方法
				Utils[directive](node, value, this.vm, methodName)
				// 最后标签上面丑陋的 v-xxx 属性
				const removedDirective = methodName ? `v-${directive}:${methodName}` : ('v-' + directive)
				node.removeAttribute(removedDirective)
			}
		})
	}
}

const Utils = {
	getContentValue(vm, expr) {
		const value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
			return this.getVal(args[1].trim(), vm)
		})
		return value
	},
	text(node, expr, vm) {
		const fn = this.Updater.textUpdater
		let value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
			const key = args[1].trim()
			new Watcher(vm, key, () => {
				fn(node, this.getContentValue(vm, expr))
			})
			return this.getVal(key, vm)
		})
		fn(node, value)
	},
	getVal(expr, vm) {
		return expr.split('.').reduce((data, currentVal) => {
			return data[currentVal]
		}, vm.$data)
	},
	Updater: {
		textUpdater(node, value) {
			node.textContent = value
		}
	}
}
