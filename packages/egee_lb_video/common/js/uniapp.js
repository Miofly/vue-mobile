const ui = {
    // loading设置
    showLoading (title = '正在加载', mask = true) {
        uni.showLoading({
            title: title,
            mask: mask // 防止触摸穿透
        })
    },
    // 提示信息
    showToast (title = '操作成功', icon = 'none', duration = 1300, mask = false) {
        uni.showToast({
            title: title,
            icon: icon,
            duration: duration,
            mask: mask
        })
    },
    getParam(name, url) { // 获取地址栏参数
        if (typeof name !== 'string') return false
        if (!url) url = window.location.href
        // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
        name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        var results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },
    randomNum(min, max) { // 生成随机数 min<=num<=max
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
}

export {
    ui
}
