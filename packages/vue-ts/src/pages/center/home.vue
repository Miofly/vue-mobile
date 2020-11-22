<template>
	<view>
		<view class="nav-list margin-bottom-ten">
			<view @tap="goPage(item.url)" v-for="(item,index) in elements" :key="index" :to="'{name:'+item.url+'}'"
						 class="nav-li" :class="'bg-'+item.color" :style="{background: item.bgColor}" :navType="item.isTab ? 'pushTab' : 'push'">
				<view class="nav-title">{{ item.title }}</view>
				<view class="nav-name">{{ item.name }}</view>
				<text class="fa" :class="'fa-'+item.icon"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component({})
	export default class home extends Vue {
		bgColor: string = 'transparent'

        elements: any[] = [
            { title: '测试模块', name: 'test', icon: 'user', color: 'loveRedOne', url: 'test' },

            { title: '底部弹窗', name: 'action-sheet', icon: 'user', color: 'loveRedTwo', url: 'action-sheet' },
            { title: '添加小程序', name: 'addApplets', icon: 'user', color: 'blueSix', url: 'addApplets' },
            { title: '头像', name: 'avatar', icon: 'user', color: 'loveTwoOne', url: 'avatar' },
            { title: '按钮', name: 'button', icon: 'user', color: 'loveOneSeven', url: 'button' },
            { title: '日历', name: 'calendar', icon: 'user', color: 'yellowTwo', url: 'calendar' },
            { title: '复选框单个', name: 'checkbox', icon: 'user', color: 'yellowTwo', url: 'checkbox' },
            { title: '复选框', name: 'checkGroup', icon: 'user', color: 'lovePurpleSeven', url: 'checkGroup' },
            { title: '颜色', name: 'color', icon: 'user', color: 'loveOneFive', url: 'color' },
            { title: '同意协议', name: 'copyRight', icon: 'user', color: 'gradual-blue', url: 'copyRight' },
            { title: '数字滚动', name: 'count_to', icon: 'user', color: 'lovePurpleSeven', url: 'count_to' },
            { title: '倒计时', name: 'count_down', icon: 'user', color: 'loveRedTwo', url: 'count_down' },
            { title: '日期选择', name: 'datePick', icon: 'user', color: 'otherThree', url: 'datePick' },
            { title: 'dplayer', name: 'dplayer', icon: 'user', color: 'loveOneFive', url: 'dplayer', bgColor: 'linear-gradient(to right, #434343 0%, black 100%)!important' },
            { title: '悬浮按钮', name: 'fab', icon: 'user', color: 'loveOneThree', url: 'fab' },
            { title: '渐变色', name: 'gradient', icon: 'user', color: 'loveRedThree', url: 'gradient' },
            { title: '图片', name: 'image', icon: 'user', color: 'loveRedThree', url: 'image', bgColor: 'linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%) !important' },
            { title: '输入框', name: 'input', icon: 'user', color: 'loveOneTwo', url: 'input' },
            { title: '进度条', name: 'line-progress', icon: 'user', color: 'loveTen', url: 'line-progress' },
            { title: '列表', name: 'list', icon: 'user', color: 'loveSeven', url: 'list' },
            { title: '列表模板', name: 'listTemplate', icon: 'user', color: 'lovePinkOne', url: 'listTemplate' },
            { title: '抽奖', name: 'luckDraw', icon: 'user', color: 'otherThree', url: 'luckDraw' },
            { title: '多列选择', name: 'manyPicker', icon: 'user', color: 'otherThree', url: 'manyPicker' },
            { title: '蒙板', name: 'mask', icon: 'user', color: 'otherThree', url: 'mask', bgColor: 'linear-gradient(60deg, #96deda 0%, #50c9c3 100%) !important' },
            { title: '消息提示', name: 'messTip', icon: 'user', color: 'yellowTwo', url: 'messTip' },
            { title: '模态框', name: 'modal', icon: 'user', color: 'lovePurpleSeven', url: 'modal' },
            { title: '分享', name: 'nativeShare', icon: 'user', color: 'blackOne', url: 'nativeShare' },
            { title: '头部栏', name: 'navbar', icon: 'user', color: 'loveRedThree', url: 'navbar' },
            { title: '手机', name: 'phone', icon: 'user', color: 'loveRedTwo', url: 'phone' },
            { title: '选择', name: 'picker', icon: 'user', color: 'loveRedThree', url: 'picker' },
            { title: '单选择', name: 'pickSingle', icon: 'user', color: 'loveRedThree', url: 'pickSingle' },
            { title: '弹出层', name: 'popup', icon: 'user', color: 'loveRedTwo', url: 'popup', bgColor: 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%) !important' },
            { title: '小程序分享', name: 'programmerShare', icon: 'user', color: 'otherFive', url: 'programmerShare' },
            { title: '二维码', name: 'qrcode', icon: 'user', color: 'lovePinkOne', url: 'qrcode' },
            { title: '单选框', name: 'radio', icon: 'user', color: 'loveRedTwo', url: 'radio', bgColor: 'linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%) !important' },
            { title: '消息滚动', name: 'scrollMessage', icon: 'user', color: 'blueSix', url: 'scrollMessage' },
            { title: '搜索', name: 'search', icon: 'user', color: 'blueSix', url: 'search', bgColor: 'linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%) !important' },
            { title: '搜索列表', name: 'searchList', icon: 'user', color: 'blueSix', url: 'searchList', bgColor: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%) !important' },
            { title: '滑动Tab', name: 'swiperTab', icon: 'user', color: 'gradual-blue', url: 'swiperTab' },
            { title: '滑动Tab加列表', name: 'swiperTabList', icon: 'user', color: 'lovePinkOne', url: 'swiperTabList' },
            { title: '开关', name: 'switch', icon: 'user', color: 'gradual-red', url: 'switch' },
            { title: '时间选择', name: 'switch', icon: 'user', color: 'gradual-red', url: 'switch' },
            { title: '上传图片', name: 'upImg', icon: 'user', color: 'gradual-red', url: 'upImg' },
            { title: '验证码', name: 'verificationCode', icon: 'user', color: 'gradual-red', url: 'verificationCode' },
            { title: 'webview', name: 'webview', icon: 'user', color: 'loveRedThree', url: 'webview' }

        ]

		goPage (url: string): void {
			this.$mio.mioRoot.push(`/pages/center/${url}`)
		}
	}
</script>
