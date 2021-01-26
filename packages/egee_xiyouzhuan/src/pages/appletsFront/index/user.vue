<template>
    <view style="position: relative" class="bg-white full-width-height ">
		<view>
			<m-image duration="0" :showLoading="false"  bgColorError="rgba(0, 0, 0, 1)" width="100vw"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" src="/static/images/haixing/beijing2@2x.png" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>

		<view class="" style="position: absolute;top: 50rpx;left: 30rpx">
			<view class="flex justify-center ">
				<view class="margin-left" style="width: 20vw">
					<view class="cu-avatar" :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2]]"
						  style="background-image:url('static/images/haixing/hxlogo1.png');">
						<view v-if="false" class="cu-tag badge">999</view>
					</view>
				</view>
				<view style="width: 50vw" class="margin-top-lg margin-left">
					<view class="text-lg text-solid-black">{{$mio.mioRoot.getLocalData('realName')}}</view>
					<view class="text-df margin-top text-solid-black">手机号：{{$mio.mioRoot.getLocalData('lz_mobile')}}</view>
				</view>
			</view>
		</view>

		<view v-if="$mio.mioRoot.getLocalData('is_team_captain') == 0" style="width: 206rpx;position: absolute;right: 0;top: 50rpx;background: white;
				color: black;height: 58rpx;line-height: 58rpx;border-bottom-left-radius: 20px;border-top-left-radius: 20px"
			  class="text-center">
			<view style="color: rgb(239, 86, 14);font-size: 12px">邀请码：{{$mio.mioRoot.getLocalData('own_invite_code')}}</view>
		</view>

		<view style="background: white;box-shadow: 0 2px 4px 0 #D3D1C9;width: 90%;height: auto;margin-left: 5%;border-radius: 12px;position: absolute;top: 230rpx" class="text-center">
			<view class="">
				<view style="font-size: 34px;color: #EE8700;font-weight: bold;">{{$mio.mioRoot.getLocalData('todayClick')}}</view>
				<view style="font-size: 14px;color: #333;font-weight: bold">累计收益</view>
			</view>
			<view class="flex justify-around" style="margin-top: 10rpx;border-bottom: 1px solid #eee;padding-bottom: 24rpx">
				<view class="text-14" style="color: #333"><text>点击</text><text style="margin-left: 4px;color: #EE8700">2131231</text></view>
				<view class="text-14" style="color: #333"><text>分成</text><text style="margin-left: 4px;color: #EE8700">2131231</text></view>
			</view>
			<view class="flex justify-around text-center" style="margin-top: 10rpx;padding-bottom: 15rpx">
				<view>
					<view style="font-size: 26px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('yesterdayClick')}}</view>
					<view style="font-size: 14px;color: #000;font-weight: bold">今日收益</view>
					<view class="flex justify-between" style="margin-top: 10rpx">
						<view class="text-14" style="color: #333"><view style="margin-left: 4px;color: #EE8700">2131231</view><view>点击</view></view>
						<view class="text-14" style="color: #333"><view style="margin-left: 4px;color: #EE8700">2131231</view><view>分成</view></view>
					</view>
				</view>
				<view style="height: 50px;background: #eee;width: 1px;margin-top: 50rpx"></view>
				<view>
					<view style="font-size: 26px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('monthClick')}}</view>
					<view style="font-size: 14px;color: #000;font-weight: bold">可提现余额</view>
					<view class="flex justify-between" style="margin-top: 10rpx">
						<view class="text-14" style="color: #333"><view style="margin-left: 4px;color: #EE8700">2131231</view><view>点击</view></view>
						<view class="text-14" style="color: #333"><view style="margin-left: 4px;color: #EE8700">2131231</view><view>分成</view></view>
					</view>
				</view>
			</view>
		</view>


	    <scroll-view scroll-y style="height: 100vw;margin-top: 260rpx" class="padding-bottom-forty">
		    <view class="cu-list menu  padding-bottom-thirty" :class="[false?'sm-border':'']">
			    <view @tap="listFn(item.name)" v-for="(item, index) in ($mio.mioRoot.getLocalData('is_team_captain') == 1 ? menuList : menuLists)" :key="index" class="cu-item">
				    <view class="content padding-tb-sm">
					    <view>
						    <image :src="`/static/images/haixing/${item.icon}.png`" style="width: 50rpx;height: 50rpx"></image>
						    <text class="margin-left">{{ item.name }}</text>
					    </view>
				    </view>
				    <view v-show="true" class="fa fa-angle-right margin-left" style="color: #999999;font-size: 20px"></view>
			    </view>
		    </view>
	    </scroll-view>


	    <m-modal :closeShow="true" closeColor="black" bgColor="white" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="status"
	    	   title="退出后将无法继续转发赚钱" desc="确定退出吗？" modalTop="0rpx" :titleSize="40" descColor="#999d9c" titleColor="black"
	    	   width="90vw" padding="20" radius="30rpx" :showTitle="true" :showContent="true">
	    	<view class="text-center">
	    		<view class="flex justify-around  padding-bottom">
	    			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
	    					  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
	    					  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style=""
	    					  @click="handClick" class="text-white" :customStyle="{fontSize: '14px'}">
	    				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
	    				确认
	    			</m-button>
	    			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
	    					  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
	    					  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
	    					  @click="status = false" class="text-white" :customStyle="{fontSize: '14px'}">
	    				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
	    				取消
	    			</m-button>
	    		</view>
	    	</view>
	    </m-modal>
    </view>
</template>

<script lang="ts">
	import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
    import mImage from 'zj/m-image/m-image.vue'
    import mButton from 'zj/m-button/m-button.vue'
    import modal from 'zj/m-modal/m-modal.vue'
	import {
	    appletsPost
	} from '@/api'

	@Component({
		components: {
            mImage,
            modal,
            mButton
		},
	})
	export default class user extends Vue {
        status: boolean = false

        menuList: any = [
	        { icon: 'money', color: 'xyz', badge: 0, name: '余额提现' },
	
	        { icon: 'navicon', color: 'xyz', badge: 0, name: '点击明细' },
            { icon: 'lock', color: 'xyz', badge: 0, name: '修改密码' },
            { icon: 'commenting', color: 'xyz', badge: 0, name: '联系客服' },
            { icon: 'power-off', color: 'xyz', badge: 0, name: '退出登录' },
            { icon: 'user-plus', color: 'xyz', badge: 0, name: '团队管理' },
          { icon: 'address-card', color: 'xyz', badge: 0, name: '个人资料' },
        ]

        menuLists: any = [
	        { icon: 'money', color: 'red', badge: 0, name: '余额提现' },
	        { icon: 'navicon', color: 'red', badge: 0, name: '点击明细' },
            { icon: 'lock', color: 'red', badge: 0, name: '修改密码' },
            { icon: 'commenting', color: 'red', badge: 0, name: '联系客服' },
            { icon: 'power-off', color: 'red', badge: 0, name: '退出登录' },
          	{ icon: 'address-card', color: 'red', badge: 0, name: '个人资料' },
        ]

        created (): void {
            document.body.addEventListener('touchmove', (evt) => { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, { passive: false })
        }

        async handClick (e) {
            const data = await appletsPost('auth/log-out')
            localStorage.removeItem('TOKEN_KEY')
            if (data.code == 200) {
                this.$mio.mioRoot.showToast('退出成功')
                setTimeout(() => {
                    // this.router.replaceAll({name: 'login', params: {id: true}})
                    localStorage.removeItem('PageCur')
                    uni.reLaunch({
                        url: '/pages/appletsFront/user/login'
                    })
                }, 1000)
            }
            this.hide()
        }

        hide () {
            this.status = false
        }

        listFn (name) {
            console.log(name)
            if (name == '点击明细') {
                // this.router.push({name: 'personCharts'})
                uni.navigateTo({
                    url: '/pages/appletsFront/module/personChart'
                })
            }
            if (name == '联系客服') {
                // this.router.push({name: 'config'})
                uni.navigateTo({
                    url: '/pages/appletsFront/module/config'
                })
            }
            if (name == '个人资料') {
                // this.router.push({name: 'personInfos'})
                uni.navigateTo({
                    url: '/pages/appletsFront/module/personInfo'
                })
            }
            if (name == '修改密码') {
                // this.router.push({name: 'forgetOne'})
                uni.navigateTo({
                    url: '/pages/appletsFront/module/forgetTwo'
                })
            }
            if (name == '退出登录') {
                this.status = true
            }
            if (name == '团队管理') {
                // this.router.push({name: 'teamManage'})
                uni.navigateTo({
                    url: '/pages/appletsFront/module/teamManage'
                })
            }
	        if (name == '余额提现') {
		        // this.router.push({name: 'teamManage'})
		        uni.navigateTo({
			        url: '/pages/appletsFront/module/with-draw'
		        })
	        }
        }
	}
</script>

<style>

</style>
