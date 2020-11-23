import h5Copy from 'uJs/plugin/junyi-h5-copy'
import test from 'uJs/test.ts'

const roots = {
    // 信息提示
    showToast (title: string = '操作成功', icon: string = 'none', duration: number = 1300, mask: boolean = false): void {
        // @ts-ignore
        uni.showToast({ title, icon, duration, mask })
    },

    // loading设置
    showLoading (title: string = '正在加载', mask: boolean = true): void {
        uni.showLoading({
            title,
            mask // 防止触摸穿透
        })
    },

    // 字符串过长截取+省略号
    strEllipsis (str: any, length: number): string {
        return String(str).length > length ? `${str.slice(0, length)}...` : str
    },

    // 复制文本
    copyText (data: string, callback = (res) => {
        if (res) {
            roots.showToast('复制成功')
        } else {
            roots.showToast('复制失败')
        }
    }): void {
        // #ifdef APP-PLUS || MP
        uni.setClipboardData({
            data,
            success (res) {
                uni.getClipboardData({
                    success () {
                        (typeof callback === 'function') && callback(true)
                    },
                    fail () {
                        (typeof callback === 'function') && callback(false)
                    }
                })
            },
            fail (res) {
                (typeof callback === 'function') && callback(false)
            }
        })
        // #endif
        // #ifdef H5
        const result = h5Copy(data)
        if (result === false) {
            callback(false) // eslint-disable-line
        } else {
            callback(true) // eslint-disable-line
        }
        // #endif
    },

    // 图片展示
    showImg (url: number): void {
        console.log(url)
        // @ts-ignore
        uni.previewImage({ urls: [url], current: 0 })
    },

    // 普通路由跳转
    push (url: string): void {
        uni.navigateTo({ url })
    },

    // 路由替换跳转
    replace (url: string): void {
        uni.redirectTo({ url })
    },

    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。路径后不能带参数
    switchTab (url: string): void {
        uni.switchTab({ url })
    },

    // 关闭所有页面，打开到应用内的某个页面。
    reLaunch (url: string): void {
        uni.reLaunch({ url })
    },

    // 返回
    back () {
        window.history.back()
    },

    addUnit (value = 'auto', unit = 'rpx') {
        value = String(value)
        // 用uView内置验证规则中的number判断是否为数值
        return test.number(value) ? `${value}${unit}` : value
    },

    // 去除空格
    trim (str, pos = 'both') {
        if (pos == 'both') {
            return str.replace(/^\s+|\s+$/g, '')
        } else if (pos == 'left') {
            return str.replace(/^\s*/, '')
        } else if (pos == 'right') {
            return str.replace(/(\s*$)/g, '')
        } else if (pos == 'all') {
            return str.replace(/\s+/g, '')
        }
        return str
    },

    // 格式化对象
    gsh (str: any): void {
    	return JSON.parse(JSON.stringify(str))
    },

    // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
    // this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
    // 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
    // 值(默认为undefined)，就是查找最顶层的$parent
    $parent (name: any = undefined) { // eslint-disable-line
        let parent = this.$parent
        // 通过while历遍，这里主要是为了H5需要多层解析的问题
        while (parent) {
            // 父组件
            if (parent.$options && parent.$options.name !== name) {
                // 如果组件的name不相等，继续上一级寻找
                parent = parent.$parent
            } else {
                return parent
            }
        }
        return false
    },

    // 得到 localStorage 数据
    getLocalData (str): any {
        return localStorage.getItem(str)
    },

    emptyPaading (str, sign): any {
        return str || sign
    },

    jumpWX () {
        window.location.replace('weixin://')
    },
}

export default roots
