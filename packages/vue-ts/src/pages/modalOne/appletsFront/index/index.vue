<template>
	<view class="full-height">
		<!--当tabList没有数据时展示的内容-->
		<scroll-view class="full-height" scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view class="height-eighty-five">
				<!--固定在顶部的内容-->
				<view :style="{height: headerHeight + 'rpx'}"
					  class="fixed-top text-center full-width"
					  v-if="headerFixCon" style="">
					<view :style="{height: headerHeight + 'rpx'}">
						<view style="background: linear-gradient(154deg, #69ABFE 0%, #3274FE 100%);">
							<view class="flex justify-between text-center" style="padding-bottom: 100rpx">
								<view class="margin-top-xl margin-left-sm-lower" style="font-size: 14px;color: white;width: 50vw">
									<view :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2]]" class="cu-avatar"
										  style="background-image:url('static/images/haixing/hxlogo1.png');">
										<view class="cu-tag badge" v-if="false">999</view>
									</view>
									<text class="margin-left-ten text-white" style="vertical-align: sub;width: 30vw;color: #333333;font-size: 16px;">{{$mio.mioRoot.getLocalData('realName')}}</text>
								</view>
								<view class="margin-top-xxl flex flex-wrap justify-center margin-right" @tap="$mio.mioRoot.push('/pages/modalOne/appletsFront/module/addItem')"
									  style="width: 20vw"
									  v-if="$mio.mioRoot.getLocalData('is_department_captain') == 1 || $mio.mioRoot.getLocalData('is_team_captain') == 1">
									<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
											:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" style="width: 72rpx;height: 72rpx"
											:shape="['square', 'circle'][0]" src="/static/images/haixing/tianjia@2x.png" bgColor="rgba(0, 0, 0, 1)">
										<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
									</m-image>
									<view style="width: 20vw" class="text-white">添加标题</view>
								</view>
							</view>

							<view class="flex justify-around text-center bg-white"
								  style="width: 90%;background: white;height: 15vw;border-radius: 1rem;text-align: center;
								  box-shadow: 0 2px 4px 0 #D3D1C9;border: 1px solid white;position: fixed;top: 230rpx;left: 5%">
								<view :class="[status? 'active' : 'inactive']" @tap="teamSwitch" class="padding padding-top-lg"
									  style="width: 40%;font-size: 18px;padding-bottom: 0!important;">团队标题
									<view v-if="status" style="border-bottom: 4px solid #333;margin-top: 9%;width: 50%;text-align: center;margin-left: 25%;border-radius: 30px"></view>
								</view>
								<view style="height: 30px;background: #eee;width: 2px;margin-top: 4%"></view>

								<view :class="[!status? 'active' : 'inactive']" @tap="personSwitch" class="padding padding-top-lg"
									  style="width: 40%;font-size: 18px">公用标题
									<view v-if="!status" style="border-bottom: 4px solid #333;margin-top: 9%;width: 50%;text-align: center;margin-left: 25%;border-radius: 30px"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!--固定设置高度-->
				<view v-if="showTab" :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
				<!--滚动时固定内容-->
				<view :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}" class="full-width"
					  style="position: fixed;z-index: 9999;"
					  v-if="fixCon">
					这是滚动的固定内容
				</view>
				<!--滚动的每一栏内容-->
				<swiper v-if="status" :current="0"
						:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						@change="swiperChange">
					<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
						<MescrollItem :i="index" :index="0" :tabLists="tabLists"></MescrollItem>
					</swiper-item>
				</swiper>

				<swiper v-else :current="0"
						:style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						@change="swiperChange">
					<swiper-item :id="`si${index}`" :key="index" v-for="(item, index) in tabLists">
						<MescrollItemTwo :i="index" :index="0" :tabLists="tabLists"></MescrollItemTwo>
					</swiper-item>
				</swiper>
			</view>

			<view @tap="getShortChain" class="text-center margin-center"
				  style="position: fixed;bottom: 60px;z-index: 999999999;width: 70vw;margin-left: 15vw">
				<m-button @tap="getShortChain" :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][0]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]" style="width: 70vw;height: 100rpx;background: linear-gradient(180deg, #69ABFE 0%, #3173FE 100%);border-radius: 24px;box-shadow: 0px 0px 7px 0px rgba(55, 124, 246, 0.54);"
						  class="text-white" :customStyle="{fontSize: '16px'}">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					批量获取链接
				</m-button>
			</view>

			<modal :closeShow="true" :closeSize="40" :descSize="30" :maskClosable="true" :status.sync="modalStatusTwo"
				   :titleSize="40" desc="" descColor="#999d9c" title="批量获取链接" titleColor="black" width="90vw" modalTop="40rpx">
				<view class="text-center margin-top">
					<view class="text-center padding" style="border: 1px solid rgba(0, 0, 0, 0.7);border-radius: 10px">
						<view v-if="tempVar">
							正在加载...
						</view>
						<view :key="index" v-else v-for="(url_list, index) in url_lists">
							<view>{{url_list == null ? url_list : url_list.length > 30 ? url_list.slice(0, 30) + '...' :
								url_list}}
							</view>
						</view>
					</view>
					<view class="flex justify-around margin-top">
						<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
								  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
								  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
								  @tap="replace" class="text-white" :customStyle="{fontSize: '14px', background: 'linear-gradient(180deg, #69ABFE 0%, #3173FE 100%)'}">
							<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
							换一批
						</m-button>
						<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
								  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
								  :type="['default', 'primary', 'error', 'warning', 'success'][2]"
								  @tap="modalWx" class="text-white" :customStyle="{fontSize: '14px', background: 'linear-gradient(180deg, #69ABFE 0%, #3173FE 100%)'}">
							<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
							复制并打开微信
						</m-button>
					</view>
				</view>
			</modal>

		</scroll-view>
	</view>
</template>

<script lang="ts">
    import MescrollItem from './index-swiper.vue'
    import MescrollItemTwo from './index-swiper-two.vue'
    import { Component, Vue, Ref } from 'vue-property-decorator'
    import swiperTab from 'zj/swiperTab/swiperTab.vue'
    import modal from 'zj/modal/modal.vue'
    import mImage from 'zj/m-image/m-image.vue'
    import mButton from 'zj/m-button/m-button.vue'

	import {
        appletsPost
	} from '@/api'
    @Component({
        components: {
            // #ifdef H5
	        mImage,
	        modal,
	        mButton,
            // #endif
            MescrollItem,
            MescrollItemTwo
        }
    })
    export default class Index extends Vue {


        status: boolean = true

        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        showTab: boolean = true; // 是否需要swiperTab
        tabHeight: number = this.showTab ? 96 : 0; // tab栏的高度
        fixHeight: number = 100; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
        tabLists: any[] = [{}]
        modalStatusTwo: boolean = false
        url_lists: any = []
        tempVar: boolean = true
        trans_product_id: number = 38
        group_code: string|number = ''

        modalWx () {
            const str = this.url_lists.join(',')
            const test = str.replace(/,/g, '\n')
            this.modalStatusTwo = false
            this.$mio.mioRoot.copyText(test)
            this.$mio.mioRoot.jumpWX()
        }

        created (): void {
            document.body.addEventListener('touchmove', (evt) => { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, { passive: false })
        }

        async replace () {
            this.tempVar = true
            this.url_lists = []
            const data = await appletsPost('title/title-share-batch', {
                url_type: 0,
                trans_product_id: this.trans_product_id,
                group_code: this.group_code
            })
            this.url_lists = data.data
            this.tempVar = false
        }

        async getShortChain () {
            this.modalStatusTwo = true
            this.tempVar = true
            const data = await appletsPost('title/title-share-batch', {
                url_type: 0,
                trans_product_id: this.trans_product_id,
                group_code: this.group_code
            })
            this.tempVar = false
            this.url_lists = data.data
        }

        teamSwitch () { // 团队
            this.tabClick = 0
            this.status = !this.status
        }

        personSwitch () { // 部门
            this.tabClick = 0
            this.status = !this.status
        }

        swiperChange (e: any): void { // 轮播菜单
            this.tabClick = e.detail.current
            ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }

        get allHeight (): number {
            return this.tabHeight + this.fixHeight + this.headerHeight
        }

        get headerHeight (): number { // 头部固定高度
            return this.headerFixCon ? 260 : 0
        }
    }
</script>

<style>
	.new_border {
		border-bottom: 5px solid #333;
	}

	.active {
		color: black;
		font-weight: bold;
	}

	.inactive {
		color: #666666;
		font-weight: normal;
	}


</style>
