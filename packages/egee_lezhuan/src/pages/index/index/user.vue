<template>
	<view class="full-width-height">
		<view class="bg-red padding text-center margin-center">
			<view class="cu-avatar margin-bottom-sm"
				  :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2], ]"
				  style="background-image:url(/static/images/lz/lz_new.png);">
				<view v-show="false" class="cu-tag badge">999</view>
			</view>
			<view class="text-xl text-bold ">{{name}}</view>
			<view class="text-df margin-top-sm">手机号：{{mobile}}</view>
		</view>
		<mescroll-uni ref="mescrollRef" height="100vh" bottom="0"
					  :down="downOption"
					  @init="mescrollInit"
					  @down="downCallback">
			<view class="cu-list grid" :class="['col-' + 1, true?'':'no-border']">
				<view class="cu-item">
					<view class="text-bold text-red text-xxl">{{ totalProfit }}</view>
					<text style="color: black">累计收入</text>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + 3, true?'':'no-border']" style="margin-top: 0!important;">
				<view class="cu-item" v-for="(item, index) in jfLists" :key="index">
					<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<view class="text-bold text-red text-xxl">{{item.frequency}}</view>
					<text style="color: black">{{item.name}}</text>
				</view>
			</view>
			<view v-if="is_team_captain" class="cu-list grid" :class="['col-' + 3, true?'':'no-border']">
				<view class="cu-item" @tap="listFn(item.name)" v-for="(item, index) in menuList" :key="index">
					<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view v-else class="cu-list grid" :class="['col-' + 3, true?'':'no-border']">
				<view class="cu-item" @tap="listFn(item.name)" v-for="(item, index) in menuLists" :key="index">
					<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</mescroll-uni>

		<modal title="提示" content="退出登录后将无法继续转发赚钱哦~" @click="handClick"
				   :show="modalStatus" :custom="false" @cancel="hide">
		</modal>


	</view>

</template>

<script>
	import {
	    commonPost
	} from '@/api'
    import MescrollMixin from '../../../components/mescroll-uni/mescroll-mixins.js'

    export default {
        mixins: [MescrollMixin],
        async mounted () {
            let test = localStorage.getItem('is_team_captain')

            if (test == 1) {
                test = true
                this.is_team_captain = test
            }
            if (test == 0) {
                test = false
                this.is_team_captain = test
            }
            setTimeout(() => {
                this.is_team_captain = test
            }, 0)
			this.userInfo()

	        const dataOne = await commonPost('/my/get_show_type', {})
	        localStorage.setItem('isMoney', dataOne.data.click_to_money)
		},

        data () {
            return {
                is_team_captain: '',
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                },
                name: '',
                alipay_account: '',
                mobile: '',
                monthClick: '',
                todayClick: '',
                yesterdayClick: '',
	            balance: '',
	            todayProfit: '',
	            totalProfit: '',
                yesterdayProfit: '',

                modalStatus: false,
                menuList: [
	                { icon: 'credit-card-alt', color: 'red', badge: 0, name: '余额提现' },
	                { icon: 'navicon', color: 'red', badge: 0, name: '点击明细' },
                    { icon: 'lock', color: 'red', badge: 0, name: '修改密码' },
                    { icon: 'address-card', color: 'red', badge: 0, name: '个人资料' },
                    { icon: 'commenting', color: 'red', badge: 0, name: '联系客服' },
                    { icon: 'power-off', color: 'red', badge: 0, name: '退出登录' },
                    { icon: 'user-plus', color: 'red', badge: 0, name: '团队管理' },
                ],
                menuLists: [
	                { icon: 'credit-card-alt', color: 'red', badge: 0, name: '余额提现' },
	                { icon: 'navicon', color: 'red', badge: 0, name: '点击明细' },
                    { icon: 'lock', color: 'red', badge: 0, name: '修改密码' },
                    { icon: 'address-card', color: 'red', badge: 0, name: '个人资料' },
                    { icon: 'commenting', color: 'red', badge: 0, name: '联系客服' },
                    { icon: 'power-off', color: 'red', badge: 0, name: '退出登录' },
                ]
            }
        },
		computed: {
            jfLists () {
                return [
                    { frequency: this.todayProfit, color: 'red', badge: 0, name: '今日收入' },
                    { frequency: this.yesterdayProfit, color: 'red', badge: 0, name: '昨日收入' },
                    { frequency: this.balance, color: 'red', badge: 0, name: '账户余额' }
                ]
            }
		},
		methods: {
            downCallback () { // 下拉刷新的回调
                const data = true
                this.userInfo(data)
            },
	        async userInfo (params) {
                const res = await commonPost('/my/click-info')
                const { data } = res
				if (res.code == 200 && params) {
                    this.mescroll.endDownScroll()
					this.ui.showToast('刷新成功')
                }
                this.monthClick = data.monthClick
                this.todayClick = data.todayClick
                this.yesterdayClick = data.yesterdayClick
                this.mobile = data.mobile
                this.alipay_account = data.alipay_account
                this.name = data.true_name

		        this.balance = data.balance
			    this.todayProfit = data.todayProfit
			    this.totalProfit = data.totalProfit
			    this.yesterdayProfit = data.yesterdayProfit
		        localStorage.setItem('realName', data.true_name)
	        },
            async handClick (e) {
                // console.log(e)
				if (e.index == 0) {
                    this.hide()
				} else {
					const data = await commonPost('/auth/log-out')
					localStorage.removeItem('TOKEN_KEY')
					if (data.code == 200) {
					    this.ui.showToast('退出成功')
                        setTimeout(() => {
                            // this.router.replaceAll({name: 'login', params: {id: true}})
                            localStorage.removeItem('PageCur')
                            uni.reLaunch({
                                url: '/pages/index/login/login'
                            })
                        }, 2000)
					}
				}
                this.hide()
            },
            hide () {
                this.modalStatus = false
            },
            async listFn (name) {
				if (name == '点击明细') {
					// this.router.push({name: 'personCharts'})
                    uni.navigateTo({
                        url: '/pages/index/module/personCharts'
                    })
				}
                if (name == '联系客服') {
                    // this.router.push({name: 'config'})
                    uni.navigateTo({
                        url: '/pages/index/module/config'
                    })
                }
                if (name == '个人资料') {
                    // this.router.push({name: 'personInfos'})
                    uni.navigateTo({
                        url: '/pages/index/module/personInfos'
                    })
                }
                if (name == '修改密码') {
                    // this.router.push({name: 'forgetOne'})
                    uni.navigateTo({
                        url: '/pages/index/module/forgetOne'
                    })
                }
                if (name == '退出登录') {
                    this.modalStatus = true
                }
                if (name == '团队管理') {
                    // this.router.push({name: 'teamManage'})
                    uni.navigateTo({
                        url: '/pages/index/module/teamManage'
                    })
                }
	            if (name == '余额提现') {
		            // this.router.push({name: 'teamManage'})
		            uni.navigateTo({
			            url: '/pages/index/module/with-draw'
		            })
	            }
            },
		},
    }
</script>

<style>

</style>
