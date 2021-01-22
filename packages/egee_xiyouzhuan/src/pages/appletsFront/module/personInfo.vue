<template>
	<view>
		<view class="full-width text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioRoot.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<view>个人资料</view>
		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in lists" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-left" >{{ item.name }}：</text>
					</view>
				</view>

				<view class="action">
					{{item.info === 'null'? '' : item.info }}
				</view>

			</view>
		</view>

	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class personInfo extends Vue {
		lists: any =[
			{ name: '名称', icon: 'bars', info: this.$mio.mioRoot.getLocalData('realName') },
            { name: '手机号码', icon: 'user', info: this.$mio.mioRoot.getLocalData('lz_mobile') },
            { name: '邀请码', icon: 'phone', info: this.$mio.mioRoot.getLocalData('own_invite_code') }
		]
	}
</script>

<style>

</style>
