<template>
	<view class="padding-xl full-width-height" :style="{backgroundImage: 'url('+ infoConfig.bg +')'}"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">
		<view class="full-width text-white">
			<view class="full-width" :style="{backgroundImage: 'url('+ infoConfig.bg1 +')'}"
			      style="position: relative;background-repeat:no-repeat;background-size: 87% 164rpx;height: 164rpx">
				<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="height: 124rpx;width: 124rpx;position: relative;top: 20rpx;left: 34rpx"
				:style="{backgroundImage: is_first ? 'url('+ infoConfig.defaultAvatar +')' : 'url('+ infoConfig.avatar +')'}"></view>
				<view class="text-20" style="position: absolute;left: 186rpx;top: 38rpx">{{is_first? '游客' : infoConfig.name}}</view>
				<view class="text-14" style="position: absolute;left: 186rpx;top: 98rpx;color: #D9DDFF">{{is_first? '暂无占领群' : infoConfig.occupationGroup}}</view>
				<view class="text-12" style="color: #7753FF;position: absolute;left: 420rpx;top: 48rpx">最好成绩：{{is_first? '0' : infoConfig.best_score}}下</view>
			</view>
		</view>

		<!--玩游戏-->
		<button class="margin-top" @click="goPlay" open-type="getUserInfo" @getuserinfo="getUserInfo">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" :src="infoConfig.tzImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</button>

		<view class="flex justify-between margin-top">
			<!--排行-->
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" @click="goRank"
					:shape="['square', 'circle'][0]" :src="infoConfig.heroImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<!--群挑战-->
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" @click="goGroup"
					:shape="['square', 'circle'][0]" :src="infoConfig.groupImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>

		<view class="flex justify-between margin-top">
			<!--海报-->
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" @click="goPoster"
					:shape="['square', 'circle'][0]" :src="infoConfig.sportImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<!--客服-->
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style="width: 48%"
			         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
			         :shape="['square', 'circle'][0]" :src="infoConfig.customerServiceImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>

		<view style="width: 100%;margin: 50rpx 0 50rpx 0">
			<ad ad-intervals="30" unit-id="adunit-60f954ce26ce0f92"></ad>
		</view>
	</view>
</template>

<script lang="ts">
import {
	commonPost, commonGet
} from '@/api'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import faker from 'faker'

@Component({})
export default class extends Vue {
	is_first: boolean = true

	infoConfig: any = {
		xcx_name: '十秒手速',
		defaultAvatar: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
		occupationGroup: '',
		best_score: 100,
		tzImg: '/static/images/game.png',
		heroImg: '/static/images/hero.png',
		groupImg: '/static/images/group.png',
		sportImg: '/static/images/share.png',
		customerServiceImg: '/static/images/qun.png',
		bg: '/static/images/bg.png',
		bg1: '/static/images/bg1.png',

		name: 'y',
		avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',

		ptgg: 'adunit-60f954ce26ce0f92'
	}

	ptgg: string = 'adunit-60f954ce26ce0f92'

	async created () {
		console.log(faker)
		console.log(faker.random.arrayElement(['1', '3']))
		const data = await commonGet('/mytest/articles?page=2&limit=50')

		wx.getUserInfo({
			success: (res) => {
				console.log(res.userInfo)
			},
			fail: err => {
				console.log(err)
			}
		})
	}

	getUserInfo (e) {
		console.log(e)
		console.log(e.detail.userInfo)
	}

	goPlay () {
		this.$mio.mioRoot.push('/pages/index/playGame')
	}

	goRank () {
		this.$mio.mioRoot.push('/pages/index/rank')
	}

	goPoster () {
		this.$mio.mioRoot.push('/pages/index/poster')
	}

	goGroup () {
		this.$mio.mioRoot.push('/pages/index/poster')
	}
}
</script>

<style>
button {
	border: 0 !important;padding: 0!important;background-color: transparent!important;line-height: 0!important;
}
</style>
