<template>
	<view class="bg-white">
		<view class="full-width text-bg-new text-xl text-center"
			  style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="testOne" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			团队管理
		</view>
		<mescroll-uni ref="mescrollRef" height="100vh" bottom="0"
					  :down="downOption"
					  @init="mescrollInit"
					  @down="downCallback" class="margin-bottom-xxl">
			<view class="padding">
				<image src="/static/images/lz/xiyou.jpg" mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>
				<!--<image src="http://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/wz.png"  mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>-->
				<!--<image src="http://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/wfx.png" mode="scaleToFill"  class="fr" style="width: 120rpx;height: 120rpx" :class="[true?'cu-avatar':'', true?'round': '']"></image>-->
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
					<input class="margin-top" :value="slogan" @input="test" :focus="false" :password=false
						   placeholder="请输入公告"
						   maxlength="-1" confirm-type="完成"/>
				</view>
				<view @tap="giveSlogan" class="text-center margin-top-xxl margin-bottom-xl">
					<button class="cu-btn" :class="[['bg-red', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][1], false ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
						<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
						发布
					</button>
				</view>
			</view>

			<view class="margin-bottom margin-left" style="overflow: hidden!important;">
				团队今日视频总计费次数：{{total_clickOne}}
			</view>
			<scroll-view scroll-x>
				<lineChart :xData="dataOneHour" :yData="dataOneClick"></lineChart>
			</scroll-view>
		</mescroll-uni>

	</view>
</template>

<script>
    import {
        commonPost
    } from '@/api'
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'

    export default {
        mixins: [MescrollMixin],
        data() {
            return {
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                },
                slogan: '该团长还未设置口号',
                teamName: '',
                inviter_code: '',
                member_nums: '',
                team_captain_name: '',
                dataOneList: [],
                dataOneHour: [],
                dataOneClick: [],
                total_clickOne: 0,
            }
        },
        async created() {
            this.ui.showLoading()
            const dataOne = await commonPost('/team/team-click-trend')
			uni.hideLoading()
            this.dataOneList = dataOne.data.list
            this.total_clickOne = dataOne.data.total_click
            for (let i = 0; i < this.dataOneList.length; i++) {
                this.dataOneHour.push(this.dataOneList[i].trans_hour)
                this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total))
            }

            const newData = await commonPost('/team/team-info')
			// console.log(newData.data.slogan)
			// console.log(newData.data.slogan == '')
			if (newData.data.slogan == '' || newData.data.slogan == null) {
                this.slogan = '该团长还未设置口号'
            } else {
			    this.slogan = newData.data.slogan
			}

			this.teamName = newData.data.name
			this.inviter_code = newData.data.inviter_code
			this.member_nums = newData.data.member_nums
			this.team_captain_name = newData.data.team_captain_name
        },
        // async onPullDownRefresh () {
        //     this.dataOneList = []
        //     this.dataOneHour = []
        //     this.dataOneClick = []
        //     const dataOne = await commonPost('/team/team-click-trend')
        //     uni.stopPullDownRefresh()
        //     this.dataOneList = dataOne.data.list
        //     this.total_clickOne = dataOne.data.total_click
        //     for (let i = 0; i < this.dataOneList.length; i++) {
        //         this.dataOneHour.push(this.dataOneList[i].trans_hour)
        //         this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total))
        //     }
        //     this.ui.showToast('刷新成功')
        // },
        methods: {
            onUnLoad () {
                // this.router.replace({name: 'lz_home'})
                uni.redirectTo({
                    url: '/pages/index/index/home'
                });
            },
            testOne () {
                uni.redirectTo({
                    url: '/pages/index/index/home'
                });
            },
            test (e) {
                this.slogan = e.target.value
            },
            async downCallback() {
                this.dataOneList = []
                this.dataOneHour = []
                this.dataOneClick = []
                const dataOne = await commonPost('/team/team-click-trend')
                this.dataOneList = dataOne.data.list
                this.total_clickOne = dataOne.data.total_click
                for (let i = 0; i < this.dataOneList.length; i++) {
                    this.dataOneHour.push(this.dataOneList[i].trans_hour)
                    this.dataOneClick.push(parseInt(this.dataOneList[i].effective_click_total))
                }
                this.mescroll.endDownScroll()
                this.ui.showToast('刷新成功')
            },
            async giveSlogan() {
                const data = await commonPost('/team/release-notice', {slogan: this.slogan})
                // console.log(data)
                if (data.code == 200) {
                    this.ui.showToast('发布成功')
                } else {
                    this.ui.showToast(data.message)
				}
                // console.log(this.slogan)
            },
        },
    }
</script>

<style>
 .upwarp-tip{display: none!important;}
</style>
