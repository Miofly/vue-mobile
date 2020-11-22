<template>
	<view class="container bg-white">
		<!--#ifdef H5-->
		<view class="cu-list menu" :class="[false ? 'card-menu' : '']">
			<view v-for="(item, index) in [{ name: '列表一', icon: 'navicon' },
		    { name: '列表1一', icon: 'address-card' },
		    { name: '列表2一', icon: 'power-off' },
		    { name: '列表3一', icon: 'user-plus' },
		    { name: '列表4一', icon: 'commenting' }]" :key="index" class="cu-item">
				<view class="content">
					<view>
						<!--<image :src="`/static/images/haixing/${item.icon}.png`" style="width: 40rpx;height: 40rpx"></image>-->
						<text class="fa text-blue width-lg" style="line-height: 80rpx" :class="['fa-' + item.icon]"></text>
						<text class="margin-left">{{ item.name }}</text>
					</view>
				</view>
				<view v-if="false" class="action">
					<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
							  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][2]"
							  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
							  @tap="$mio.mioRoot.copyText(item.name)" class="text-white" :customStyle="{fontSize: '14px'}">
						<view class="fa text-xl fa-android margin-right-xxl" style="height: 30rpx" v-if="false"></view>
						复制
					</m-button>
				</view>
				<view v-if="true" class="fa fa-angle-right margin-left text-gray text-26"></view>
			</view>
		</view>

		<view :class="['col-' + 5, true?'':'no-border']" class="cu-list grid">
			<view :key="index" class="cu-item" v-for="(item, index) in [
                    {icon: 'weixin', color: 'red', badge: 120, name: 'weixin'},
                    {icon: 'close', color: 'orange', badge: 1, name: '录像'},
                    {icon: 'weixin', color: 'yellow', badge: 0, name: '图像'},
                    {icon: 'weixin', color: 'olive', badge: 22, name: '通知'},
                    {icon: 'weibo', color: 'cyan', badge: 0, name: '排行榜'},
                    {icon: 'qq', color: 'blue', badge: 0, name: '皮肤'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '发现'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '帮助'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '问答'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '版权'}
                    ]">
				<view :class="['fa-' + item.icon,'text-' + item.color]" class="fa">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!--九格宫列表-->
		<view :class="['col-' + gridCol,gridBorder?'':'no-border']" class="cu-list grid">
			<view :key="index" class="cu-item" v-for="(item,index) in listData">
				<view :class="['fa-' + item.icon,'text-' + item.color]" class="fa">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!--#endif-->
	</view>
</template>

<script lang="ts">
    import listJson from 'json/listJson.json'

    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class list extends Vue {
        listData: any = []
        gridCol: number = 4
        gridBorder: boolean = true
        keywordLists: any = [
            { name: 1 },
            { name: 11 },
            { name: 112 },
            { name: 1123 },
            { name: 11234 },
            { name: 112345 }
        ]

        onLoad () {
            this.listData = listJson
        }
    }


</script>
