<template>
	<view class="">
		<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
				 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="z-index: 1;position: fixed;top: 0;left: 0"
				 :shape="['square', 'circle'][0]" src="/static/images/haixing/hxbg2.png" bgColor="rgba(0, 0, 0, 1)">
			<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
		</m-image>

		<view class="flex justify-center" style="z-index: 9!important;position: fixed;top: 30%;left: 5%;opacity: 0.9">
			<view class="width-ninety border-radius bg-white padding-xl">
				<m-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				    <m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="address-book" :right-icon="['clipboard', ''][1]" :rightIconStyle="{color: '#888', fontSize: '32rpx'}"
				    			 label-width="160" :label-position="['left', 'top'][0]" label="手机号" prop="mobile">
				    	<m-input :clearable="true" :focus="true" maxlength="240" :border="false" placeholder="请输入手机号" v-model="model.mobile"
				    			 placeholderStyle="color: rgb(192, 196, 204)" iconColor="#c0c4cc" :type="['text', 'number', 'textarea', 'idcard', 'digit'][0]">
				    	</m-input>
				    </m-form-item>

					<m-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '26rpx'}" left-icon="lock"
								 label-width="160" :label-position="['left', 'top'][0]" label="密码" prop="password">
						<m-input :password-icon="true" :border="false" type="password" v-model="model.password" placeholder="请输入密码"></m-input>
					</m-form-item>
				</m-form>

				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]" :disabled="false"
						  @tap="submit" class="text-white fulls-width margin-top-xl" style="height: 60rpx;background: linear-gradient(154deg, #69ABFE 0%, #3274FE 100%);"
				>
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					登录
				</m-button>

				<view class="flex justify-between margin-top-xl padding-left-right-sm">
					<text class="text-blue" @tap="$mio.mioRoot.push('/pages/moduleOne/user/forget')">忘记密码</text>
					<text class="text-blue" @tap="$mio.mioRoot.push('/pages/moduleOne/user/reg')">注册账号</text>
				</view>
			</view>
		</view>
 	</view>
</template>

<script lang="ts">
	import {
        appletsPost
	} from '@/api'
    import { Component, Vue } from 'vue-property-decorator'
    @Component({})
    export default class test extends Vue {
        model: any = {
            mobile: localStorage.getItem('lz_mobile') ? localStorage.getItem('lz_mobile') : '',
			password: localStorage.getItem('lz_password') ? localStorage.getItem('lz_password') : '',
			rePassword: ''
		}

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
                {
                    // 正则不能含有两边的引号
                    // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
                    // message: '需同时含有字母和数字，长度在6-12之间',
                    // trigger: ['change', 'blur'],
                }
            ],
		}

        onReady () {
            (this.$refs.uForm as any).setRules(this.rules)
        }

        submit () {
            (this.$refs.uForm as any).validate(async valid => {
                if (valid) {
                    this.$mio.mioRoot.showLoading('正在登录...请稍后...')

                    const data = await appletsPost('auth/login', { mobile: this.model.mobile, password: this.model.password })

                    const res = await appletsPost('my/click-info')

                    localStorage.setItem('realName', res.data.true_name)
                    localStorage.setItem('monthClick', res.data.monthClick)
                    localStorage.setItem('own_invite_code', res.data.own_invite_code)
                    localStorage.setItem('todayClick', res.data.todayClick)
                    localStorage.setItem('yesterdayClick', res.data.yesterdayClick)
                    localStorage.setItem('lz_mobile', this.model.mobile)
                    localStorage.setItem('lz_password', this.model.password)
                    if (data.code == 200) {
                        // this.$store.state.is_team_captain = data.data.is_team_captain
                        localStorage.setItem('is_team_captain', data.data.is_team_captain)
                        localStorage.setItem('memberId', data.data.memberId)
                        localStorage.setItem('is_department_captain', data.data.is_department_captain)
                        localStorage.setItem('department_id', data.data.department_id)
                        uni.hideLoading()
                        this.$mio.mioRoot.showToast('登录成功...正在跳转至首页', 'none', 1500)
                        // console.log(localStorage.getItem('TOKEN_KEY'))
                        // setTimeout(() => {
                        // this.router.push({name: 'lz_home'})
                        this.$mio.mioRoot.replace('/pages/moduleOne/appletsFront/home')
                    } else {
                        uni.hideLoading()
                        this.$mio.mioRoot.showToast(data.message)
                    }
                } else {
                    console.log('验证失败')
                }
            })

        }
    }
</script>
