<template>
	<view class="bg-white">
		<view class="full-width hxbg text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioroot.back()" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			团队管理
		</view>

		<view class="padding">
			<image src="/static/images/haixing/hxlogo.png" mode="scaleToFill" class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>
			<view class="text-xl text-bold">{{teamName}}
				<span class="text-normal text-df margin-left text">(共{{member_nums}}人)</span>
			</view>
			<view class="margin-top">
				<span class="text-normal text-df text">{{team_captain_name}}</span>
			</view>
			<view class="margin-top">
				<span class="text-normal text-df text">{{inviter_code}} <a class="text-blue margin-left" @tap="tu.getClipboardData(inviter_code)">复制</a></span>
			</view>
			<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
				<input class="margin-top" :value="slogan" @input="test" :focus="false" :password="false"
					   placeholder="请输入公告"
					   maxlength="-1" confirm-type="完成" />
			</view>

			<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
					  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
					  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style="background: #ef560e;"
					  @tap="giveSlogan" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
				<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
				发布
			</m-button>
		</view>

		<view class="margin-bottom margin-left" style="overflow: hidden!important;">
			团队今日视频总计费次数：{{total_clickOne}}
		</view>
		<scroll-view scroll-x>
			<lineChart :xData="dataOneHour" :yData="dataOneClick"></lineChart>
		</scroll-view>

	</view>
</template>

<script lang="ts">


    import {
        appletsPost
    } from '@/api'

	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class teamManage extends Vue {
        slogan: string = '该团长还未设置口号'
        teamName: string = ''
        inviter_code: string = ''
        member_nums: string = ''
        team_captain_name: string = ''
        dataOneList: any = []
        dataOneHour: any = []
        dataOneClick: any = []
        total_clickOne: number = 0

        async created () {
            this.$mio.mioroot.showLoading()
            const dataOne = await appletsPost('team/team-click-trend')
            uni.hideLoading()
            this.dataOneList = dataOne.data.list
            this.total_clickOne = dataOne.data.total_click
            for (let i = 0; i < this.dataOneList.length; i++) {
                this.dataOneHour.push(this.dataOneList[i].trans_hour)
                this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total)) // eslint-disable-line
            }

            const newData = await appletsPost('team/team-info')
            // console.log(newData.data.slogan)
            // console.log(newData.data.slogan == '')
            if (newData.data.slogan == '' || newData.data.slogan == null) { // eslint-disable-line
                this.slogan = '该团长还未设置口号'
            } else {
                this.slogan = newData.data.slogan
            }

            this.teamName = newData.data.name
            this.inviter_code = newData.data.inviter_code
            this.member_nums = newData.data.member_nums
            this.team_captain_name = newData.data.team_captain_name
        }

        test (e) {
            this.slogan = e.target.value
        }

        async downCallback () {
            this.dataOneList = []
            this.dataOneHour = []
            this.dataOneClick = []
            const dataOne = await appletsPost('team/team-click-trend')
            this.dataOneList = dataOne.data.list
            this.total_clickOne = dataOne.data.total_click
            for (let i = 0; i < this.dataOneList.length; i++) {
                this.dataOneHour.push(this.dataOneList[i].trans_hour)
                this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total)) // eslint-disable-line
            }
            this.$mio.mioroot.showToast('刷新成功')
        }

        async giveSlogan () {
            const data = await appletsPost('team/release-notice', { slogan: this.slogan })
            // console.log(data)
            if (data.code == 200) {
                this.$mio.mioroot.showToast('发布成功')
            } else {
                this.$mio.mioroot.showToast(data.message)
            }
        }
	}


</script>

<style>
	.upwarp-tip{display: none!important;}
</style>
