<template>
    <view class="padding bg-white text-lg">
		<view class="margin-top">签到主题：{{option.title}}</view>
		<view class="margin-top">签到开始日期：{{option.startDate}}</view>
		<view class="margin-top">签到截止日期：{{option.endDate}}</view>
		<view class="margin-top">签到时间段：
			<text v-for="(item, index) in option.timeLists" :key="index">
				<text>{{index == 0 ? '' : '、'}}{{item.startTime}}-{{item.endTime}}</text>
			</text>
		</view>
		<view class="margin-top">签到选项：
			<text v-for="(item, index) in option.opts" :key="index">
				<text>{{index == 0 ? '' : '、'}}{{item.name}}</text>
			</text>
		</view>

		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][1]"
				  @tap="sign" class="text-white margin-top" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			签到
		</m-button>
		<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
				  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
				  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
				  @tap="delSign" class="text-white margin-top" :customStyle="{fontSize: '14px'}">
			<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
			删除
		</m-button>






		<view class="cu-list grid justify-around margin-top" :class="['col-' + 2, false ? '' : 'no-border']">
			<view class="cu-item bg-blue border-radius" style="width: 45%">
				<view class="fa fa-qrcode" :class="['fa-photo', 'text-white']"></view>
				<text style="color: white!important;">生成签到码</text>
			</view>

			<view class="cu-item bg-green border-radius " style="width: 45%">
				<view class="fa" :class="['fa-cloud-download', 'text-white']"></view>
				<text style="color: white!important;">导出Excel</text>
			</view>
		</view>
    </view>
</template>

<script lang="ts">
	import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

	@Component({})
	export default class signInTemplate extends Vue {
        option: any = {}

        onLoad (e): void {
			this.option = JSON.parse(e.option)
		}

        sign (): void {

        }

        delSign (): void {

        }
	}
</script>

<style>

</style>
