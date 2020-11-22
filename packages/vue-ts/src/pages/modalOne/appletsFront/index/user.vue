<template>
    <view style="position: relative" class="bg-white full-width-height ">
	    11
<!--		<view>-->
<!--			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" width="100vw"-->
<!--					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"-->
<!--					:shape="['square', 'circle'][0]" src="/static/images/haixing/beijing2@2x.png" bgColor="rgba(0, 0, 0, 1)">-->
<!--				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--			</m-image>-->
<!--		</view>-->

<!--		<view class="text-white" style="position: absolute;top: 50rpx;left: 30rpx">-->
<!--			<view class="flex justify-center ">-->
<!--				<view class="margin-left" style="width: 20vw">-->
<!--					<view class="cu-avatar" :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2]]"-->
<!--						  style="background-image:url('static/images/haixing/hxlogo1.png');">-->
<!--						<view v-if="false" class="cu-tag badge">999</view>-->
<!--					</view>-->
<!--				</view>-->
<!--				<view style="width: 50vw" class="margin-top-lg margin-left">-->
<!--					<view class="text-lg">{{$mio.mioRoot.getLocalData('realName')}}</view>-->
<!--					<view class="text-df margin-top">手机号：{{$mio.mioRoot.getLocalData('lz_mobile')}}</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->

<!--		<view v-if="$mio.mioRoot.getLocalData('is_team_captain') == 0" style="width: 206rpx;position: absolute;right: 0;top: 50rpx;background: white;-->
<!--				color: black;height: 58rpx;line-height: 58rpx;border-bottom-left-radius: 20px;border-top-left-radius: 20px"-->
<!--			  class="text-center">-->
<!--			<view style="color: #3577FE;font-size: 12px">邀请码：{{$mio.mioRoot.getLocalData('own_invite_code')}}</view>-->
<!--		</view>-->

<!--		<view style="background: white;box-shadow: 0 2px 4px 0 #D3D1C9;width: 90%;margin-left: 5%;border-radius: 12px;position: absolute;top: 230rpx"-->
<!--		class="text-center">-->
<!--			<view class="padding-top">-->
<!--				<view style="font-size: 20px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('todayClick')}}</view>-->
<!--				<view style="font-size: 14px;color: #000;font-weight: bold">今日计费次数</view>-->
<!--			</view>-->
<!--			<view class="flex justify-around padding margin-top text-center">-->
<!--				<view>-->
<!--					<view style="font-size: 20px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('yesterdayClick')}}</view>-->
<!--					<view style="font-size: 14px;color: #000;font-weight: bold">昨日计费次数</view>-->
<!--				</view>-->
<!--				<view style="height: 30px;background: #eee;width: 1px"></view>-->
<!--				<view>-->
<!--					<view style="font-size: 20px;color: #FFB400;font-weight: bold">{{$mio.mioRoot.getLocalData('monthClick')}}</view>-->
<!--					<view style="font-size: 14px;color: #000;font-weight: bold">本月计费次数</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->

<!--		<scroll-view scroll-y style="height: 100vw" class="margin-top-twenty padding-bottom-twenty">-->
<!--			<view class="cu-list menu  padding-bottom-thirty" :class="[false?'sm-border':'']">-->
<!--				<view @tap="listFn(item.name)" v-for="(item, index) in ($mio.mioRoot.getLocalData('is_team_captain') == 1 ? menuList : menuLists)" :key="index" class="cu-item">-->
<!--					<view class="content padding-tb-sm">-->
<!--						<view>-->
<!--							<image :src="`/static/images/haixing/${item.icon}.png`" style="width: 50rpx;height: 50rpx"></image>-->
<!--							<text class="margin-left">{{ item.name }}</text>-->
<!--						</view>-->
<!--					</view>-->
<!--					<view v-show="true" class="fa fa-angle-right margin-left" style="color: #999999;font-size: 20px"></view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</scroll-view>-->


<!--		<modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="status"-->
<!--			   :titleSize="40" desc="" descColor="#999d9c" title="退出后将无法继续转发赚钱" titleColor="black" width="90vw">-->
<!--			<view class="text-center margin-top-xxl flex justify-around">-->
<!--				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"-->
<!--						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"-->
<!--						  :type="['default', 'primary', 'error', 'warning', 'success'][2]"-->
<!--						  @tap="status = false" class="text-white fulls-width margin-top-xxl" style="height: 60rpx;background: linear-gradient(154deg, #69ABFE 0%, #3274FE 100%)!important;">-->
<!--					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>-->
<!--					取消-->
<!--				</m-button>-->
<!--				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"-->
<!--						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"-->
<!--						  :type="['default', 'primary', 'error', 'warning', 'success'][2]"-->
<!--						  @tap="handClick" class="text-white fulls-width margin-top-xxl margin-left-xxl" style="height: 60rpx">-->
<!--					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>-->
<!--					确认-->
<!--				</m-button>-->
<!--			</view>-->
<!--		</modal>-->
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class user extends Vue {
	test: string = '11'
}
</script>

<style>

</style>
