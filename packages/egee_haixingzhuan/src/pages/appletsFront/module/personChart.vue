<template>
	<view>
		<view class="full-width hxbg text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="$mio.mioroot.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<view>点击明细
				<view @tap="tzChart" class="fr margin-right fa fa-bars" style="margin-top: 4%">

				</view>
			</view>

		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in menuList" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-left">{{ item.stat_date }}</text>
					</view>
				</view>

				<view v-show="true" class="action">
					<view>
						<text class="width-eighty">总计费 {{ item.effective_click_total }} 次</text>
					</view>
				</view>
				<!--<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>-->
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import {
        appletsPost
    } from '@/api'

	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class personChart extends Vue {
        menuList: any = []

        async mounted () {
            this.$mio.mioroot.showLoading()
            const data = await appletsPost('my/seven-click-info')
            uni.hideLoading()
            this.menuList = data.data
        }

        tzChart () {
            uni.navigateTo({
                url: '/pages/appletsFront/module/personChartTwo'
            })
        }
	}


</script>

<style>

</style>
