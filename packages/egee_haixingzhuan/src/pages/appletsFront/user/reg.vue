<template>
	<view class="">
		<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]" :showLoading="false"
				 bgColor="rgba(0, 0, 0, 1)"
				 bgColorError="rgba(0, 0, 0, 1)"
				 duration="0" src="/static/images/haixing/hxbg2.png" style="z-index: 1;position: fixed;top: 0;left: 0">
			<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
		</m-image>

		<view class="flex justify-center" style="z-index: 2!important;position: fixed;top: 10%;left: 5%;opacity: 0.9">
			<view class="width-ninety border-radius bg-white padding-xl">
				<m-form :errorType="errorType" :model="model" :rules="rules" ref="uForm">
					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}"
								 :required="true" :right-icon="['clipboard', ''][1]"
								 :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="手机号" label-width="160" left-icon="address-book" prop="mobile">
						<m-input :border="false" :clearable="true" :focus="true" :type="['text', 'number', 'textarea', 'idcard', 'digit'][1]" iconColor="#c0c4cc"
								 maxlength="240"
								 placeholder="请输入手机号" placeholderStyle="color: rgb(192, 196, 204)"
								 v-model="model.mobile">
						</m-input>
					</m-form-item>

					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}"
								 :required="true" :right-icon="['clipboard', ''][1]"
								 :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="验证码" label-width="160" left-icon="pencil-square" prop="msgCode">
						<m-input :border="false" :clearable="true" :focus="true" :type="['text', 'number', 'textarea', 'idcard', 'digit'][1]" iconColor="#c0c4cc"
								 maxlength="240"
								 placeholder="请输入验证码" placeholderStyle="color: rgb(192, 196, 204)"
								 v-model="model.msgCode"></m-input>
						<m-button :customStyle="{fontSize: '12px'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
								  :ripple="true"
								  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][2]"
								  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style="background: #ef560e;"
								  @tap="getCode" class="text-white" slot="right">
							<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx;"
								  v-if="false"></view>
							{{tips}}
						</m-button>
					</m-form-item>

					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
								 label="密码" label-width="160" left-icon="lock" prop="password">
						<m-input :border="false" :password-icon="true" placeholder="请输入密码" type="password"
								 v-model="model.password"></m-input>
					</m-form-item>

					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
								 label="确认密码" label-width="160" left-icon="lock" prop="repassword">
						<m-input :border="false" :password-icon="true" placeholder="请确认密码" type="password"
								 v-model="model.repassword"></m-input>
					</m-form-item>

					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" :required="true"
								 :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="真实姓名" label-width="160" left-icon="user" prop="realName">
						<m-input :border="false" :clearable="true" :focus="true" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]" iconColor="#c0c4cc"
								 maxlength="240"
								 placeholder="请输入真实姓名" placeholderStyle="color: rgb(192, 196, 204)"
								 v-model="model.realName">
						</m-input>
					</m-form-item>

					<m-form-item :label-position="['left', 'top'][0]" :leftIconStyle="{color: '#888', fontSize: '26rpx'}"
								 :required="true" :right-icon="['clipboard', ''][1]"
								 :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
								 label="邀请码" label-width="160" left-icon="hand-o-right" prop="inviteCode">
						<m-input :border="false" :clearable="true" :focus="true" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]" iconColor="#c0c4cc"
								 maxlength="240"
								 placeholder="请输入邀请码" placeholderStyle="color: rgb(192, 196, 204)"
								 v-model="model.inviteCode">
						</m-input>
					</m-form-item>
				</m-form>

				<view class="flex align-center margin-top-xl" v-if="false">
					<m-checkbox :activeColor="['#2979ff', '#ff9900', '#19be6b', '#fa3534', '#909399'][3]"
								:disabled="false"
								:shape="['square', 'circle'][0]" @change="checkboxChange"
								v-model="checked"></m-checkbox>
					<view @click="checkboxChangeTwo" style="color: #909399">
						勾选代表同意西游转的版权协议
					</view>
				</view>

				<m-button :disabled="false" :hairLine="true" :loading="false" :plain="false"
						  :ripple="true" :shape="['square', 'circle'][1]"
						  :size="['default', 'medium', 'mini'][1]" :type="['default', 'primary', 'error', 'warning', 'success'][2]"
						  @tap="submit" class="text-white fulls-width margin-top-xl" style="height: 60rpx;background: #FB5B55;">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					注册
				</m-button>

				<m-verification-code :keep-running="true" :seconds="60" @change="codeChange"
									 @end="() => { console.log('开始') }" @start="() => {console.log('结束')}"
									 changeText="X秒重新获取" endText="再次获取" ref="uCode"
									 startText="获取验证码"></m-verification-code>

				<view class="flex justify-end margin-top-xl padding-left-right-sm">
					<text @tap="$mio.mioroot.push('/pages/appletsFront/user/login')" class="textNew-red">
						已有账号，立即登录
					</text>
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
            msgCode: '',
            password: '',
            repassword: '',
            realName: '',
            inviteCode: '',
          	type: 1001
        }

        checked: boolean = false

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
                    validator: (rule, value, callback) => this.$mio.miotest.mobile(value)
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
            realName: [
                {
                    required: true,
                    message: '请输入真实姓名',
                },
                {
                    required: true,
                    min: 2,
                    max: 5,
                    message: '不得小于2个字符，不得超过5个字符',
                    trigger: ['change', 'blur'],
                },
				{
				    required: true,
				    min: 3,
				    max: 5,
				    message: '必须是中文',
				    trigger: ['change', 'blur'],
				    validator: (rule, value, callback) => this.$mio.miotest.chinese(value)
				},
            ],
            inviteCode: [
                {
                    required: true,
                    message: '请输入邀请码',
                    trigger: ['change', 'blur'],
                },
                {
                    min: 5,
                    max: 5,
                    message: '邀请码必须5位数字',
                    trigger: ['change', 'blur'],
                }
            ],
        }

        codeChange (text) {
            this.tips = text
        }

        checkboxChange (e): void {
            this.checked = e.value
        }

        checkboxChangeTwo (): void {
            this.checked = !this.checked
        }

        async getCode () {
            if (this.model.mobile.trim() == '') {
                this.$mio.mioroot.showToast('手机号不能为空')
                return
            }
            if ((this.$refs.uCode as any).canGetCode) {
                // 模拟向后端请求验证码
                const data = await appletsPost('bus/send', this.model)

                uni.showLoading({
                    title: '正在获取验证码'
                })

                if (data.code == 200) {
                    uni.hideLoading()
                    // 这里此提示会被this.start()方法中的提示覆盖
                    this.$mio.mioroot.showToast('验证码已发送')
                    // 通知验证码组件内部开始倒计时
                    ;(this.$refs.uCode as any).start()
                } else {
                    uni.hideLoading()
                    this.$mio.mioroot.showToast(data.message)
                }

            } else {
                this.$mio.mioroot.showToast('倒计时结束后再发送')
            }
        }

        onReady () {
            (this.$refs.uForm as any).setRules(this.rules)
        }

        submit () {
            (this.$refs.uForm as any).validate(async valid => {
                if (valid) {
                    const data = await appletsPost('auth/register', this.model)

                    this.$mio.mioroot.showToast(data.message)

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
