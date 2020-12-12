<template>
	<view class="full-width-height text-center" :style="{backgroundImage: 'url('+ baseConfig.bg +')'}"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;">

		<view style="padding-top: 80rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
			         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
			         height="86" style=""
			         :shape="['square', 'circle'][0]" :src="baseConfig.textImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<view class="flex justify-around text-white" style="margin-top: 62rpx">
				<view style="margin-top: 128rpx">
					<view style="color: #FF5555" class="text-20 text-bold">{{score}}次</view>
					<view class="text-14" style="margin-top: 28rpx">最好成绩</view>
				</view>
				<view style="">
					<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="border: 4px solid #FFEB7E;;width: 164rpx;height: 164rpx"
					      :style="{backgroundImage: avatar == '' ? 'url('+ infoConfig.defaultAvatar +')' : 'url('+ avatar +')'}">
						<view v-if="false" class="cu-tag badge">999</view>
					</view>
					<view style="margin-top: 24rpx;" class="text-18">
						{{name}}
					</view>
				</view>
				<view style="margin-top: 128rpx">
					<view style="color: #FF5555" class="text-20 text-bold">{{baseConfig.rank}}</view>
					<view class="text-14" style="margin-top: 28rpx">全国排名</view>
				</view>
			</view>
		</view>

		<view style="position: relative;margin-top: 80rpx" class="full-width text-center">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
			         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="width: 100vw;margin-top: 80rpx"
			         :shape="['square', 'circle'][0]" :src="baseConfig.introduceImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					 style="position: absolute;bottom: 50rpx;left: 20%;width: 60%"
					:shape="['square', 'circle'][0]" :src="baseConfig.captureImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>


		<view v-if="rankLists.length == 0" style="position: relative;margin-top: 40rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="678"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"
					:shape="['square', 'circle'][0]" :src="baseConfig.emptyImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<view style="height: 20rpx;padding: 30rpx 0;width: 100%;background-color: rgb(0, 15, 84);color: #D3D5DE;;position: absolute;line-height: 0rpx"></view>
		</view>

		<view v-else style="position: relative;margin-top: 40rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="120"
			         style="width: 97vw;position: absolute;left: 1.5vw"
			         :shape="['square', 'circle'][0]" :src="baseConfig.newTextImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
			<view style="background-color: rgba(255, 252, 225, 1);position: absolute;top: 105rpx;width: 92vw;margin-left: 4vw;border-bottom-right-radius: 20rpx;border-bottom-left-radius: 20rpx">
				<view class="cu-list menu" style="margin-top: 44rpx">
					<view class="cu-item" style="background-color: rgba(255, 252, 225, 1)!important;border-bottom: 0px solid transparent!important;">
						<view class="content">
							<view>
								<view class="text-18 text-bold" style="color: #333333;width: 80rpx">66</view>
								<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"
								      :style="{backgroundImage: 'url('+ baseConfig.defaultAvatar +')'}">
									<view v-if="false" class="cu-tag badge">999</view>
								</view>
								<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ baseConfig.name }}</text>
							</view>
						</view>
						<view v-if="true" class="action">
							<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">888</text>
						</view>
					</view>
				</view>
				<view style="height: 8rpx;background: #FEE5CE;width: 94%;margin: 16rpx 0 16rpx 3%"></view>
				<view>
					<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
						<view v-for="(item, index) in rankLists" :key="index" class="cu-item" style="border-radius: 20px;border-bottom: 0px solid transparent!important;background-color: rgba(255, 252, 225, 1)!important;">
							<view class="content">
								<view>
									<view class="text-18 text-bold" style="color: #333333;width: 80rpx">{{index}}</view>
									<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"
									      :style="{backgroundImage: 'url('+ item.imageURL +')'}">
										<view v-if="false" class="cu-tag badge">999</view>
									</view>
									<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ $mio.mioRoot.strEllipsis(item.author, 15) }}</text>
								</view>
							</view>
							<view v-if="true" class="action">
								<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.pageviews }}</text>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 20rpx;padding: 30rpx 0;width: 100%;background-color: rgb(0, 15, 84);color: #D3D5DE;;position: absolute;line-height: 0rpx"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { commonGet } from '@/api'
import { State } from 'vuex-class'

@Component({})
export default class extends Vue {
	@State('name', { namespace: 'center' }) name
	@State('avatar', { namespace: 'center' }) avatar
	@State('score', { namespace: 'center' }) score

	baseConfig: any = {
		bg: '/static/images/bg.png',
		introduceImg: '/static/images/jieshaobeijing@2x.png',
		captureImg: '/static/images/capture.png',
		textImg: '/static/images/qunnei@2x.png',
		newTextImg: '/static/images/biaoti@2x.png',
		emptyImg: '/static/images/tupian@2x.png',
		defaultAvatar: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',

		name: 'y',
		score: '11',
		rank: '未上榜',
		sumPerson: '1231321',
		time: '3:00',
	}

	rankLists: any = []

	async created () {
		// #ifdef H5
		// @ts-ignore
		const { data } = await commonGet('/mytest/articles?page=2&limit=50') // eslint-disable-line
		// #endif

		// #ifdef MP-WEIXIN
		// @ts-ignore
		const { data } = await commonGet('/articles?page=2&limit=50') // eslint-disable-line
		// #endif
		// this.rankLists = data.items
		this.rankLists = data.items
	}
}
</script>

<style>
page {
	background-color: rgba(0, 15, 84, 1);
}

.cu-list:last-child {
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx
}

</style>
