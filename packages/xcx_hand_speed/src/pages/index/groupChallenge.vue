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
					<view style="color: #FF5555" class="text-20 text-bold">{{score == '' || score == undefined ? 0 : score}}次</view>
					<view class="text-14" style="margin-top: 28rpx">最好成绩</view>
				</view>
				<view style="">
					<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="border: 4px solid #FFEB7E;;width: 164rpx;height: 164rpx"
					      :style="{backgroundImage: avatar == '' || avatar == undefined ? 'url('+ baseConfig.defaultAvatar +')' : 'url('+ avatar +')'}">
						<view v-if="false" class="cu-tag badge">999</view>
					</view>
					<view style="margin-top: 24rpx;" class="text-18">
                        {{name == '' || name == undefined ? '未知' : name}}
					</view>
				</view>
				<view style="margin-top: 128rpx">
					<view style="color: #FF5555" class="text-20 text-bold">{{level == '' || level == undefined ? '999+' : level}}</view>
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

            <button style="width: 460rpx;height: 100rpx;background: transparent;position: absolute;bottom: 50rpx;left: 20%;"
                    open-type="share">
                <image :src="baseConfig.captureImg" style="width: 100%;height: 100%"
                       :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]">
                </image>
            </button>
<!--            <button open-type="share" style="width: 48%">-->
<!--                <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"-->
<!--                         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][4]"-->
<!--                         style="" height="50"-->
<!--                         :shape="['square', 'circle'][0]" :src="" bgColor="rgba(0, 0, 0, 1)">-->
<!--                    <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--                </m-image>-->
<!--            </button>-->
		</view>

        <ad v-if="ptgg" ad-intervals="30" :unit-id="ptgg" style="margin-top: 28rpx"></ad>

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
				<view>
					<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
						<view v-for="(item, index) in rankLists" :key="index" class="cu-item" style="border-radius: 20px;border-bottom: 0px solid transparent!important;background-color: rgba(255, 252, 225, 1)!important;">
							<view class="content">
								<view>
									<view class="text-18 text-bold" style="color: #333333;width: 80rpx">{{index + 1}}</view>
<!--									<view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"-->
<!--									      :style="{backgroundImage: 'url('+ item.imageURL +')'}">-->
<!--										<view v-if="false" class="cu-tag badge">999</view>-->
<!--									</view>-->
                                    <open-data style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold" type="groupName" :open-gid="item.openGid"></open-data>
								</view>
							</view>
							<view v-if="true" class="action">
								<text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.score == '' || item.score == undefined ? '0' : item.score }}</text>
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
import { commonPost } from '@/api'
import { State } from 'vuex-class'

@Component({})
export default class extends Vue {
	@State('name', { namespace: 'center' }) name
	@State('avatar', { namespace: 'center' }) avatar
	@State('score', { namespace: 'center' }) score
    @State('level', { namespace: 'center' }) level
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg


	baseConfig: any = {
		bg: '/static/images/bg.png',
		introduceImg: '/static/images/jieshaobeijing@2x.png',
		captureImg: '/static/images/capture.png',
		textImg: '/static/images/qunnei@2x.png',
		newTextImg: '/static/images/biaoti@2x.png',
		emptyImg: '/static/images/tupian@2x.png',
		defaultAvatar: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/touxiang@2x.png',

		name: 'y',
		score: '11',
		rank: '未上榜',
		sumPerson: '1231321',
		time: '3:00',
	}

	rankLists: any = []

	async created () {
        // this.status = !this.status
        // this.rankLists = []
        if (this.$store.state.center.type == 2) {

        } else {
            const { data } = await commonPost('/api/user_achievement/top', { type: 3 }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
            this.rankLists = data
        }
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
