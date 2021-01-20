<template>
	<view class="">
		<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
				 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="z-index: 1;position: fixed;top: 0;left: 0"
				 :shape="['square', 'circle'][0]" src="/static/images/haixing/hxbg2.png" bgColor="rgba(0, 0, 0, 1)">
			<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
		</m-image>

		<view class="flex justify-center" style="z-index: 2!important;position: fixed;top: 20%;left: 5%;opacity: 0.9">
			<view class="width-ninety border-radius bg-white padding-xl">
				<m-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="address-book" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label-width="160" :label-position="['left', 'top'][0]" label="手机号" prop="mobile">
						<m-input :clearable="true" :focus="true" maxlength="240" :border="false" placeholder="请输入手机号" v-model="model.mobile"
								 placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]">
						</m-input>
					</m-form-item>

					<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="pencil-square" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label-width="160" :label-position="['left', 'top'][0]" label="验证码" prop="msgCode">
						<m-input :clearable="true" :focus="true" maxlength="240" :border="false" placeholder="请输入验证码" v-model="model.msgCode"
								 placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]"></m-input>
						<m-button slot="right" :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
								  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][2]"
								  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style="background: #ef560e;"
								  @tap="getCode" class="text-white" :customStyle="{fontSize: '12px'}">
							<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
							{{tips}}
						</m-button>
					</m-form-item>

					<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="lock"
								 label-width="160" :label-position="['left', 'top'][0]" label="密码" prop="password">
						<m-input :password-icon="true" :border="false" type="password" v-model="model.password" placeholder="请输入密码"></m-input>
					</m-form-item>

					<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="lock"
								 label-width="160" :label-position="['left', 'top'][0]" label="确认密码" prop="repassword">
						<m-input :password-icon="true" :border="false" type="password" v-model="model.repassword" placeholder="请确认密码"></m-input>
					</m-form-item>

				</m-form>

				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]" :disabled="false"
						  @tap="submit" class="text-white fulls-width margin-top-xl" style="height: 60rpx;background: #FB5B55;">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					修改密码
				</m-button>

				<m-verification-code :keep-running="true" :seconds="60" @change="codeChange"
									 @end="() => { console.log('开始') }" @start="() => {console.log('结束')}"
									 changeText="X秒重新获取" endText="再次获取" ref="uCode"
									 startText="获取验证码"></m-verification-code>

				<view class="flex justify-between margin-top-xl padding-left-right-sm">
					<text class="textNew-red" @tap="$mio.mioRoot.push('/pages/appletsFront/user/login')">已有账号</text>
					<text class="textNew-red" @tap="$mio.mioRoot.push('/pages/appletsFront/user/reg')">注册账号</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { appletsPost } from '@/api'
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        model: any = {
            mobile: '',
            password: '',
            msgCode: '',
            repassword: '',
		  	type: 1002,
        }

        tips: string = ''

        errorType: any = ['message']
        rules: any = {
            mobile: [
                {
                    required: true,
                    message: '请输入手机号',
                    trigger: ['change', 'blur'],
                },
                {
                    trigger: ['change', 'blur'],
                    message: '手机号码不正确',
                    validator: (rule, value, callback) => this.$mio.mioTest.mobile(value)
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: ['change', 'blur'],
                },
                // {
                //     // 正则不能含有两边的引号
                //     pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
                //     message: '需同时含有字母和数字，长度在6-12之间',
                //     trigger: ['change', 'blur'],
                // }
            ],
            repassword: [
                {
                    required: true,
                    message: '请重新输入密码',
                    trigger: ['change', 'blur'],
                },
                {
                    validator: (rule, value, callback) => value === this.model.password,
                    message: '两次输入的密码不相等',
                    trigger: ['change', 'blur'],
                }
            ],
            msgCode: [
                {
                    required: true,
                    message: '请输入验证码',
                    trigger: ['change', 'blur'],
                },
                {
                    type: 'number',
                    message: '验证码只能为数字',
                    trigger: ['change', 'blur'],
                }
            ],
        }

        codeChange (text) {
            this.tips = text
        }

        async getCode () {
            if (this.model.mobile.trim() == '') {
                this.$mio.mioRoot.showToast('手机号不能为空')
                return
            }
            if ((this.$refs.uCode as any).canGetCode) {
                // 模拟向后端请求验证码
                const data = await appletsPost('bus/send', Object.assign(this.model))

                uni.showLoading({
                    title: '正在获取验证码'
                })

                if (data.code == 200) {
                    uni.hideLoading()
                    // 这里此提示会被this.start()方法中的提示覆盖
                    this.$mio.mioRoot.showToast('验证码已发送')
                    // 通知验证码组件内部开始倒计时
                    ;(this.$refs.uCode as any).start()
                } else {
                    uni.hideLoading()
                    this.$mio.mioRoot.showToast(data.message)
                }

            } else {
                this.$mio.mioRoot.showToast('倒计时结束后再发送')
            }
        }

        onReady () {
            (this.$refs.uForm as any).setRules(this.rules)
        }

        submit () {
            (this.$refs.uForm as any).validate(async valid => {
                if (valid) {
                    const data = await appletsPost('auth/forget', this.model)

                    this.$mio.mioRoot.showToast(data.message)

                    if (data.code == 200) { // 注册成功跳转登录页面
                        setTimeout(() => {
                            // this.router.push({name: 'login'})
                            uni.redirectTo({
                                url: '/pages/appletsFront/user/login'
                            })
                        }, 1000)
                    }
                    console.log('验证通过')
                } else {
                    console.log('验证失败')
                }
            })
        }
    }
</script>
