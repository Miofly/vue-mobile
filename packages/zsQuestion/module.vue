<template>
	<view>

		222
		<!--<ad v-if="ggkz" unit-id="adunit-0401c255cc4b89d3" ad-type="video" style="transform: scale(0.6)" ad-theme="black"></ad>-->
		<!--<view class="cu-list grid" :class="['col-' + 3, true ? '' : 'no-border']">-->
			<!--<view @tap="tz(item.url, item.isOut)" class="cu-item" v-for="(item, index) in lists" :key="index">-->
				<!--<view class="fa" :class="['fa-' + item.icon, 'text-' + item.color]">-->
					<!--<view class="cu-tag badge" v-if="item.badge != 0">-->
						<!--<block v-if="item.badge != 1">{{item.badge > 99 ? '99+' : item.badge}}</block>-->
					<!--</view>-->
				<!--</view>-->
				<!--<text>{{item.name}}</text>-->
			<!--</view>-->
		<!--</view>-->
		<!--<ad v-if="ggkz" unit-id="adunit-e814017b8fa8a63a" ad-intervals="30"></ad>-->
	</view>

</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class module extends Vue {

	}
	/* eslint-disable */
    // export default {
    //     data () {
    //         return {
    //             lists: [
    //                 // {url: 'wxArticle', icon: 'cny', color: 'red', badge: 0, name: '微信文章封面提取'},
    //                 // {url: 'heightAndWeight', icon: 'dollar', color: 'orange', badge: 0, name: '身体质量指数'},
    //                 // {url: 'idCard', icon: 'btc', color: 'yellow', badge: 0, name: '身份信息查询'},
    //                 { url: 'phone', icon: 'money', color: 'olive', badge: 0, name: '手机归属地查询' },
    //                 { url: 'wx161b6221791a7340', icon: 'krw', color: 'blue', badge: 0, name: '免费VIP影视', isOut: true },
    //                 { url: 'phoneInformation', icon: 'won', color: 'cyan', badge: 0, name: '手机完整信息' }
    //                 // {url: 'wx2de5f627b0461a70', icon: 'gg', color: 'purple', badge: 0, name: 'AI智能识别', isOut: true},
    //             ]
    //         }
    //     },
    //     methods: {
    //         tz (url, isOut) {
    //             if (isOut) {
    //                 wx.navigateToMiniProgram({
    //                     appId: url,
    //                     success (res) {
    //                         // 打开成功
    //                         console.log(res)
    //                     }
    //                 })
    //             } else {
    //                 this.router.push({ name: url })
    //             }
    //         }
    //     },
    // }
</script>
