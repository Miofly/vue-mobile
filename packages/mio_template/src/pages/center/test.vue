<template>
	<view class="" style="height: 100%">
		<!--.vsearch>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
		<m-searchUpdate class="vsearch" @parentFun="questionListFn" placeholder="请输要搜索的内容" hisKeys="phoneKey"
		:hotStatus="false" :hotKeywordList="['周杰伦', '陈奕迅', '华晨宇', '许嵩']" :ssBackIndex="true" style="height: 100%;">
			<template v-slot:content>
				<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
					<view v-for="(item, index) in
						[{name: '列表一', icon: 'video-camera'},
						{name: '列表一', icon: 'user'},
						{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
								<text class="margin-left">{{ item.name }}</text>
							</view>
						</view>
						<view v-show="false" class="action">
							<button :class="['cu-btn', 'bg-blue', 'shadow']">
								操作
							</button>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
				</view>
			</template>
			<template v-slot:detail>
				<scroll-view style="height: 85%" scroll-y="true">
					<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
						<view v-for="(item, index) in
							[{name: '列表11一', icon: 'video-camera'},
							{name: '列表一', icon: 'user'},
							{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
							<view class="content padding-tb-sm">
								<view>
									<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
									<text class="margin-left">{{ item.name }}</text>
								</view>
							</view>
							<view v-show="false" class="action">
								<button :class="['cu-btn', 'bg-blue', 'shadow']">
									操作
								</button>
							</view>
							<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
						</view>
					</view>
					<!--<loadMore :status="loadStatus = 1"></loadMore>-->
				</scroll-view>
			</template>
		</m-searchUpdate>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MescrollItem from './mescroll-swiper-vertical.vue'

@Component({
	components: {
		MescrollItem
	},
})
export default class test extends Vue {

}
</script>

<style>

.active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff!important;
}

.active:before {
	content: '';
	position: absolute;
	border-left: 8rpx solid #e41f19!important;
	height: 30rpx;
	left: 0;
}
</style>
