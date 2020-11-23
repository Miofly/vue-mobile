<template>
	<view class="full-width-height" style="width: 100vw;height: 100%">
		<view v-for="(item, index) in videoLists" :key="index"
			  class="padding-left-right padding-top-bottom"
			  style="width: 100vw;height: 270rpx;overflow: hidden;border-bottom: 1px solid #eee;position: relative;"
			  @tap="changeVideo(item.vid, item.break_point_length, item.channel_id, item.cover_img, item.id, item.group_id)">
			<view style="width: 300rpx;border-radius: 5px;height: 230rpx;overflow: hidden">
				<!--<image :src="" :class="[false?'cu-avatar':'', false?'round': '']" @tap="ui.showImg()"-->
				<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">-->
				<!--</image>-->
				<image :src="item.cover_img" mode="widthFix" class="border-radius"></image>
			</view>
			<view class="margin-left" style="position: absolute;top: 20%;left: 320rpx">
				<view class="text-bold text-xl">{{item.title.length > 16 ? item.title.slice(0, 16) + '...' :
					item.title}}
				</view>
				<view style="margin-top: 40rpx" class="text-red text-xl">播放量：{{item.views}}次
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'
    export default {
        data () {
            return {
                videoLists: []
            }
        },
		async onShow () {
            const data = await commonPost('like/like_list', {
                line_en: localStorage.getItem('line_en'),
                v_id: localStorage.getItem('video_id'),
                page: 1,
                page_size: 3
            })
			setTimeout(() => {
                this.videoLists = data.data.data
			}, 2000)
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
</style>
