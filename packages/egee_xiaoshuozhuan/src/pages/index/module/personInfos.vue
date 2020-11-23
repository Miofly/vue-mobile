<template>
	<view>
		<view class="full-width text-bg-new text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<view >个人资料</view>
		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view  v-for="(item, index) in lists" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-left text-red">{{ item.name }}：</text>
					</view>
				</view>

				<view class="action">
					{{item.info}}
				</view>

			</view>
		</view>

		<!--<view  v-else class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">-->
			<!--<view v-for="(item, index) in listTwos" :key="index" class="cu-item">-->
				<!--<view class="content padding-tb-sm">-->
					<!--<view>-->
						<!--<text class="margin-left text-red">{{ item.name }}：</text>-->
					<!--</view>-->
				<!--</view>-->
				<!--<view class="action">-->
					<!--{{item.info.length < 5 || item.name == '邀请码' ? item.info : '****' + item.info.slice(4)}}-->
				<!--</view>-->

			<!--</view>-->
		<!--</view>-->

	</view>
</template>

<script>
    import {
        commonPost
    } from '@/api'

    export default {
        data() {
            return {
                // alipay_account: '',
                mobile: '',
                true_name: '',
                own_invite_code: '',
                is_team_captain: 1,
            }
        },
		computed: {
            lists: function () {
                return [{name: '名称', icon: 'video-camera', info: this.true_name},
                    {name: '手机号码', icon: 'phone', info: this.mobile},
                    {name: '邀请码', icon: 'phone', info: this.own_invite_code}
                ]
            },
            // listTwos: function () {
            //     return [{name: '名称', icon: 'video-camera', info: this.true_name},
            //         {name: '支付宝账号', icon: 'user', info: this.alipay_account},
            //         {name: '手机号码', icon: 'phone', info: this.mobile},
            //     ]
            // }
		},
        async mounted() {
            this.ui.showLoading()
            const data = await commonPost('/my/click-info')
			uni.hideLoading()
            // this.is_team_captain = data.data.is_team_captain
            // this.alipay_account = data.data.alipay_account
            this.mobile = data.data.mobile
            this.true_name = data.data.true_name
			if (data.data.own_invite_code == null) {
                this.own_invite_code = ''
			} else {
                this.own_invite_code = data.data.own_invite_code
			}
        }
    }
</script>

<style>

</style>
