<template>
	<view :style="{backgroundImage: 'url('+ infoConfig.bg +')'}" class="full-width text-center padding-bottom-ten"
	      style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;padding: 30rpx">
		<view style="margin-top: 40rpx">
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" src="/static/images/banner@2x.png" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>
		<view style="height: 422rpx;background: #F5F6FC;border-radius: 12px;border: 4px solid #36CCF1;margin-top: 40rpx" class="text-center">
			<view class="flex justify-around">
				<view style="margin-top: 136rpx">
					<view style="color: #FF5555" class="text-20 text-bold">{{infoConfig.score}}次</view>
					<view class="text-14" style="margin-top: 28rpx">最好成绩</view>
				</view>
				<view style="margin-top: 40rpx">
					<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="border: 2px solid #FFFFFF;width: 132rpx;height: 132rpx"
					      :style="{backgroundImage: 'url('+ infoConfig.defaultAvatar +')'}">
						<view v-if="false" class="cu-tag badge">999</view>
					</view>
					<view style="margin-top: 24rpx;color: #333;" class="text-18">
						{{infoConfig.name}}
					</view>
				</view>
				<view style="margin-top: 136rpx">
					<view style="color: #FF5555" class="text-20 text-bold">{{infoConfig.rank}}</view>
					<view class="text-14" style="margin-top: 28rpx">全国排名</view>
				</view>
			</view>
			<view>
				<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
						:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="width: 66%;margin-left: 17%;margin-top: 34rpx"
						:shape="['square', 'circle'][0]" :src="infoConfig.startChallenge" bgColor="rgba(0, 0, 0, 1)">
					<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
				</m-image>
			</view>
		</view>
		<view style="color: #D3D5DE;margin-top: 60rpx" class="text-18">
			共 <text style="color: #FF5555" class="text-22">{{infoConfig.sumPerson}}</text>人正在挑战
		</view>
		<view style="color: #D3D5DE;margin-top: 28rpx;" class="text-16">
			榜单将于每周一凌晨{{infoConfig.time}}重置
		</view>

		<view>
			<view style="position: relative;" class="margin-top">
				<view style="background-color: rgba(255, 252, 225, 1);width: 100%;position: absolute;top: 85rpx;border-radius: 20rpx">
					<view class="flex justify-around text-center"
					      style="width: 72%;margin-left: 14%;height: 88rpx;line-height: 88rpx;margin-top: 120rpx">
						<view @click="nationalRanking" class="border-left-radius" :class="[status ? 'activeStyle' : 'inActiveStyle']" style="width: 50%;">全国排行</view>
						<view @click="friendsRanking" class="border-right-radius" :class="[!status ? 'activeStyle' : 'inActiveStyle']" style="width: 50%;">好友排行</view>
					</view>
					<view class="cu-list menu" style="margin-top: 44rpx">
						<view class="cu-item" style="background-color: rgba(255, 252, 225, 1)!important;border-bottom: 0px solid transparent!important;">
							<view class="content">
								<view>
									<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx"
									      :style="{backgroundImage: 'url('+ infoConfig.defaultAvatar +')'}">
										<view v-if="false" class="cu-tag badge">999</view>
									</view>
									<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ infoConfig.name }}</text>
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
							<view v-for="(item, index) in rankLists" :key="index" class="cu-item" style="border-bottom: 0px solid transparent!important;background-color: rgba(255, 252, 225, 1)!important;">
								<view class="content">
									<view>
										<view class="text-18 text-bold" style="color: #333333;">{{index}}</view>
										<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 54rpx"
										      :style="{backgroundImage: 'url('+ item.imageURL +')'}">
											<view v-if="false" class="cu-tag badge">999</view>
										</view>
										<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.author }}</text>
									</view>
								</view>
								<view v-if="true" class="action">
									<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.pageviews }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 30rpx;padding: 60rpx 0;width: 100%;background-color: rgb(0, 15, 84);color: #D3D5DE;;position: absolute;line-height: 0rpx">
						榜单仅显示前100名
					</view>
				</view>

			</view>

		</view>

		<view>
			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					:shape="['square', 'circle'][0]" :src="infoConfig.rankImg" bgColor="rgba(0, 0, 0, 1)">
				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
			</m-image>
		</view>


	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import {
    commonGet
} from '@/api'
@Component({})
export default class extends Vue {
	status: boolean = true
	infoConfig: any = {
		bg: '/static/images/bg.png',
		clickSrc: '/static/images/click_me@2x.png',
		clickSrcTwo: '/static/images/click_me2.png',
		againSrc: '/static/images/zailai@2x.png',
		startChallenge: '/static/images/kaishi@2x.png',
		rankImg: '/static/images/paihang@2x.png',
		defaultAvatar: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',

		name: 'y',
		score: '11',
		rank: '未上榜',
		sumPerson: '1231321',
		time: '3:00',
	}

	rankLists: any = []

	async created () {
		const { data } = await commonGet('/mytest/articles?page=2&limit=50')
		this.rankLists = data.items
		console.log(this.rankLists)
	}

	nationalRanking () {
		console.log(1)
		this.status = !this.status
	}

	friendsRanking () {
		console.log(2)
		this.status = !this.status
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

.activeStyle{
	font-weight: bolder;
	font-size: 18px;
	background: #FFDB18;
	color: #772E01;
}
.inActiveStyle{
	font-size: 18px;
	background-color: rgba(255, 255, 255, 0.9);
	color: #772E01;
}
</style>
