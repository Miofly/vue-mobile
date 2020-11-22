<template>
	<view class="center">
		<m-verification-code :keep-running="true" :seconds="5" @change="codeChange"
							 @end="() => { console.log('开始') }" @start="() => {console.log('结束')}"
							 changeText="X秒重新获取" endText="重新获取" ref="uCode"
							 startText="获取验证码"></m-verification-code>
		<m-button @click="getCode">{{tips}}</m-button>
	</view>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class verificationCode extends Vue {
        tips: string = ''

        codeChange (text) {
            this.tips = text
        }

        getCode () {
            if ((this.$refs.uCode as any).canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码'
                })
                setTimeout(() => {
                    uni.hideLoading()
                    // 这里此提示会被this.start()方法中的提示覆盖
                    this.$mio.mioRoot.showToast('验证码已发送')
                    // 通知验证码组件内部开始倒计时
                    ;(this.$refs.uCode as any).start()
                }, 2000)
            } else {
                this.$mio.mioRoot.showToast('倒计时结束后再发送')
            }
        }
    }
</script>
