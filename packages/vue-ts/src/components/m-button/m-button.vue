<template>
	<button
			:app-parameter="appParameter"
			:class="[
			'u-size-' + size,
			plain ? 'u-btn--' + type + '--plain' : '',
			loading ? 'u-loading' : '',
			shape == 'circle' ? 'u-round-circle' : '',
			hairLine ? showHairLineBorder : 'u-btn--bold-border',
			'u-btn--' + type,
			disabled ? `u-btn--${type}--disabled` : '',
		]"
			:data-name="dataName"
			:disabled="disabled"
			:form-type="formType"
			:hover-class="getHoverClass"
			:hover-start-time="Number(hoverStartTime)"
			:hover-stay-time="Number(hoverStayTime)"
			:hover-stop-propagation="hoverStopPropagation"
			:lang="lang"
			:loading="loading"
			:open-type="openType"
			:send-message-img="sendMessageImg"
			:send-message-title="sendMessageTitle"
			:session-from="sessionFrom"
			:show-message-card="showMessageCard"
			:style="[customStyle, {
			overflow: ripple ? 'hidden' : 'visible'
		}]"
			@error="error"
			@getphonenumber="getphonenumber"
			@getuserinfo="getuserinfo"
			@launchapp="launchapp"
			@opensetting="opensetting"
			@tap.stop="click($event)"
			class="u-btn u-line-1 u-fix-ios-appearance"
			id="u-wave-btn"
			send-message-path="sendMessagePath"
	>
		<slot></slot>
		<view
				:class="[waveActive ? 'u-wave-active' : '']"
				:style="{
				top: rippleTop + 'px',
				left: rippleLeft + 'px',
				width: fields.targetWidth + 'px',
				height: fields.targetWidth + 'px',
				'background-color': rippleBgColor || 'rgba(0, 0, 0, 0.15)'
			}"
				class="u-wave-ripple"
				v-if="ripple"
		></view>
	</button>
</template>

<script lang="ts">
    /**
     * button 按钮
     * @description Button 按钮
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} size 按钮的大小
     * @property {Boolean} ripple 是否开启点击水波纹效果
     * @property {String} ripple-bg-color 水波纹的背景色，ripple为true时有效
     * @property {String} type 按钮的样式类型
     * @property {Boolean} plain 按钮是否镂空，背景色透明
     * @property {Boolean} disabled 是否禁用
     * @property {Boolean} hair-line 是否显示按钮的细边框(默认true)
     * @property {Boolean} shape 按钮外观形状，见文档说明
     * @property {Boolean} loading 按钮名称前是否带 loading 图标(App-nvue 平台，在 ios 上为雪花，Android上为圆圈)
     * @property {String} form-type 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
     * @property {String} open-type 开放能力
     * @property {String} data-name 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
     * @property {String} hover-class 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果(App-nvue 平台暂不支持)
     * @property {Number} hover-start-time 按住后多久出现点击态，单位毫秒
     * @property {Number} hover-stay-time 手指松开后点击态保留时间，单位毫秒
     * @property {Object} custom-style 对按钮的自定义样式，对象形式，见文档说明
     * @event {Function} click 按钮点击
     * @event {Function} getphonenumber open-type="getPhoneNumber"时有效
     * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
     * @event {Function} error 当使用开放能力时，发生错误的回调
     * @event {Function} opensetting 在打开授权设置页并关闭后回调
     * @event {Function} launchapp 打开 APP 成功的回调
     * @example <m-button>月落</m-button>
     */
    import { Component, Prop, Vue } from 'vue-property-decorator'
    let flag = null
	let timer = null
    @Component({})
    export default class MButton extends Vue {
        @Prop({ default: true, type: Boolean }) hairLine?: boolean // 是否细边框
        @Prop({ default: false, type: Boolean }) plain?: boolean // 按钮是否镂空
        @Prop({ default: false, type: Boolean }) disabled?: boolean // 是否禁止状态
        @Prop({ default: false, type: Boolean }) loading?: boolean // 是否加载中
        @Prop({ default: false, type: Boolean }) hoverStopPropagation?: boolean // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
        @Prop({ default: false, type: Boolean }) showMessageCard?: boolean // 否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示， 用户点击后可以快速发送小程序消息，open-type="contact"时有效
        @Prop({ default: false, type: Boolean }) ripple?: boolean // 是否开启水波纹效果
        @Prop({ default: 'default', type: String }) type?: string // 按钮的预置样式，default，primary，error，warning，success
        @Prop({ default: 'default', type: String }) size?: string // 按钮尺寸，default，medium，mini
        @Prop({ default: 'square', type: String }) shape?: string // 按钮形状，circle（两边为半圆），square（带圆角）
        @Prop({ default: '', type: String }) openType?: string // 开放能力 具体请看uniapp稳定关于button组件部分说明 https://uniapp.dcloud.io/component/button
        @Prop({ default: '', type: String }) formType?: string // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 取值为submit（提交表单），reset（重置表单）
        @Prop({ default: '', type: String }) appParameter?: string // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效  只微信小程序、QQ小程序有效
        @Prop({ default: '', type: String }) sessionFrom?: string // 会话来源，open-type="contact"时有效。只微信小程序有效
        @Prop({ default: '', type: String }) sendMessageTitle?: string // 会话内消息卡片标题，open-type="contact"时有效 默认当前标题，只微信小程序有效
        @Prop({ default: '', type: String }) sendMessagePath?: string // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 默认当前分享路径，只微信小程序有效
        @Prop({ default: '', type: String }) sendMessageImg?: string // 会话内消息卡片图片，open-type="contact"时有效 默认当前页面截图，只微信小程序有效
        @Prop({ default: '', type: String }) hoverBgColor?: string // 手指按（触摸）按钮时按钮时的背景颜色
        @Prop({ default: '', type: String }) rippleBgColor?: string // 水波纹的背景颜色
        @Prop({ default: '', type: String }) hoverClass?: string // 按下的类名
        @Prop({ default: '', type: String }) dataName?: string // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
        @Prop({ default: 'en', type: String }) lang?: string // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
        @Prop({ default () { return {} } }) customStyle?: any // 自定义样式，对象形式
        @Prop({ default: 1000, type: Number }) throttleTime?: number // 节流，一定时间内只能触发一次
        @Prop({ default: 20, type: Number }) hoverStartTime?: number | string //  按住后多久出现点击态，单位毫秒
        @Prop({ default: 150, type: Number }) hoverStayTime?: number | string //  手指松开后点击态保留时间，单位毫秒

        rippleTop: any = 0 // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: any = 0 // 水波纹起点X坐标到按钮左边界的距离
        fields: any = {} // 波纹按钮节点信息
        waveActive: boolean = false // 激活水波纹

        // 当没有传bgColor变量时，按钮按下去的颜色类名
        get getHoverClass () {
            // 如果开启水波纹效果，则不启用hover-class效果
            if (this.loading || this.disabled || this.ripple || this.hoverClass) return ''
            let hoverClass = ''
            hoverClass = this.plain ? `u-${this.type}-plain-hover` : `u-${this.type}-hover`
            return hoverClass
        }

        // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
        get showHairLineBorder () {
            if (['primary', 'success', 'error', 'warning'].indexOf(this.type) >= 0 && !this.plain) {
                return ''
            }
            return 'u-hairline-border'
        }

        // 按钮点击
        click (e) {
            // 进行节流控制，每this.throttle毫秒内，只在开始处执行
            this.throttle(() => {
                // 如果按钮时disabled和loading状态，不触发水波纹效果
                if (this.loading === true || this.disabled === true) return
                // 是否开启水波纹效果
                if (this.ripple) {
                    // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
                    this.waveActive = false
                    this.$nextTick(function () { // eslint-disable-line
                        this.getWaveQuery(e)
                    })
                }
                this.$emit('click', e)
            }, this.throttleTime)
        }

        /**
         * 节流原理：在一定时间内，只能触发一次
         *
         * @param {Function} func 要执行的回调函数
         * @param {Number} wait 延时的时间
         * @param {Boolean} immediate 是否立即执行
         * @return null
         */
        throttle (func, wait = 500, immediate = true) {
            if (immediate) {
                if (!flag) {
                    flag = true
                    // 如果是立即执行，则在wait毫秒内开始时执行
                    typeof func === 'function' && func()
                    timer = setTimeout(() => {
                        flag = false
                    }, wait)
                }
            } else if (!flag) {
                    flag = true
                    // 如果是非立即执行，则在wait毫秒内的结束处执行
                    timer = setTimeout(() => {
                        flag = false
                        typeof func === 'function' && func()
                    }, wait)
                }
        }

        // 查询按钮的节点信息
        getWaveQuery (e) {
            this.getElQuery().then(res => {
                // 查询返回的是一个数组节点
                const data = res[0] // eslint-disable-line
                // 查询不到节点信息，不操作
                if (!data.width || !data.width) return
                // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
                // 最终的方形（变换后的圆形）才能覆盖整个按钮
                data.targetWidth = data.height > data.width ? data.height : data.width
                if (!data.targetWidth) return
                this.fields = data
                let touchesX: any = ''
                let touchesY: any = ''
                // #ifdef MP-BAIDU
                touchesX = e.changedTouches[0].clientX
                touchesY = e.changedTouches[0].clientY
                // #endif
                // #ifdef MP-ALIPAY
                touchesX = e.detail.clientX
                touchesY = e.detail.clientY
                // #endif
                // #ifndef MP-BAIDU || MP-ALIPAY
                touchesX = e.touches[0].clientX
                touchesY = e.touches[0].clientY
                // #endif
                // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
                // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
                // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
                this.rippleTop = touchesY - data.top - data.targetWidth / 2
                this.rippleLeft = touchesX - data.left - data.targetWidth / 2
                this.$nextTick(() => {
                    this.waveActive = true
                })
            })
        }

        // 获取节点信息
        getElQuery () {
            return new Promise(resolve => {
                let queryInfo: any = ''
                // 获取元素节点信息，请查看uniapp相关文档
                // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
                queryInfo = uni.createSelectorQuery().in(this)
                // #ifdef MP-ALIPAY
                queryInfo = uni.createSelectorQuery()
                // #endif
                queryInfo.select('.u-btn').boundingClientRect()
                queryInfo.exec(data => {
                    resolve(data)
                })
            })
        }

        // 下面为对接uniapp官方按钮开放能力事件回调的对接
        getphonenumber (res) {
            this.$emit('getphonenumber', res)
        }

        getuserinfo (res) {
            this.$emit('getuserinfo', res)
        }

        error (res) {
            this.$emit('error', res)
        }

        opensetting (res) {
            this.$emit('opensetting', res)
        }

        launchapp (res) {
            this.$emit('launchapp', res)
        }
    }
</script>

<style lang="scss">
	@import "ys/module/button.scss";
</style>
