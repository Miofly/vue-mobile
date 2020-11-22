<template>
	<view>
		<image src="/static/images/lz/hbg.jpg" class="full-width" style="height: 18rem"></image>
		<view class="bg-white margin-center padding-xl border-radius width-ninety padding-top-xxl"
		style="position: relative;top: -250rpx;">
			<view>
				<view class="fa fa-phone fl margin-right-xl text-red" style="font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="mobile" class="fa fa-close fr margin-right-lower" @tap="delVals('mobile')"></view>
					<!--<input type="['text', 'number', 'digit'][1]" v-model="mobile" :focus="true" :password="false" placeholder="请输入手机号码" maxlength="11"-->
						   <!--confirm-type="['send', 'search', 'next', 'go', 'done'][0]" />-->
					<input :adjust-position=false type='number' v-model="mobile" :focus="true" :password="false" placeholder="请输入手机号码" maxlength="11"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-lock fl margin-right-xl text-red" style="font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="password" class="fa fa-close fr margin-right-lower" @tap="delVals('password')"></view>
					<input :adjust-position=false v-model="password" :focus="false" :password="true" placeholder="请输入密码"
						   confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-xl">
				<button @tap="login" class="cu-btn full-width" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
                    ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
					登录
				</button>
			</view>
			<view class="flex justify-between margin-top-xl">
				<!--<router-link to="{name: 'forget'}" class="text-red">忘记密码</router-link>-->
				<!--<router-link to="{name: 'reg'}" class="text-red">注册账号</router-link>-->

				<navigator url="/pages/index/login/forget" class="text-red">忘记密码</navigator>
				<navigator url="/pages/index/login/reg" class="text-red">注册账号</navigator>
			</view>

			<!--<view class="text-center margin-top-ten">-->
				<!--客服微信:-->
				<!--<text @tap="copy" class="text-red">{{wx}}</text>-->
			<!--</view>-->
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {
        commonPost
	} from '@/api'
    export default {
        data() {
            return {
                mobile: localStorage.getItem('lz_mobile') ? localStorage.getItem('lz_mobile') : '',
                password: localStorage.getItem('lz_password') ? localStorage.getItem('lz_password') : '',
                wx: 'SUNP8694',
				tempArr: false
            }
        },
		onLoad (e) {
			if (localStorage.getItem('TOKEN_KEY')) {
                uni.redirectTo({
                    url: '/pages/index/index/home'
                })
			}
		},
        methods: {
            delVals(val) {
                this[val] = ''
            },
            copy() {
                this.tu.getClipboardData(this.wx)
            },
            async login() {
                localStorage.removeItem('TOKEN_KEY')
                if (this.mobile.trim() == '') {
                    this.ui.showToast('手机号码不能为空')
                    return
                }
                if (this.password.trim() == '') {
                    this.ui.showToast('密码不能为空')
					return
                }
                if (this.mobile.length != 11) {
                    this.ui.showToast('手机号码格式不正确')

                    return
                }
                const data = await commonPost('/auth/login', {mobile: this.mobile, password: this.password})
				console.log(escape(this.mobile))
				console.log(encodeURI(this.mobile))
				console.log(encodeURIComponent(this.mobile))
				localStorage.setItem('lz_mobile', this.mobile)
				localStorage.setItem('lz_password', this.password)
                this.ui.showLoading('正在登录...请稍后...')


				if (data.code == 200) {
				    // this.$store.state.is_team_captain = data.data.is_team_captain
				    localStorage.setItem('is_team_captain', data.data.is_team_captain)
				    localStorage.setItem('memberId', data.data.memberId)
				    localStorage.setItem('is_department_captain', data.data.is_department_captain)
				    localStorage.setItem('department_id', data.data.department_id)
				    uni.hideLoading()
                    // this.ui.showToast('登录成功...正在跳转至首页', 'none', 1500)
				    // console.log(localStorage.getItem('TOKEN_KEY'))
				    // setTimeout(() => {
                        // this.router.push({name: 'lz_home'})
                        uni.redirectTo({
							url: '/pages/index/index/home'
						})
					// }, 1500)
				} else {
                    uni.hideLoading()
				    this.ui.showToast(data.message)
				}
            },
        },
		computed: {
		    ...mapState(['is_team_captain']),
		},
    }
</script>

