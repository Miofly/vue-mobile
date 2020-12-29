<template>
	<view class="padding bg-white">
		<!--头部栏-->
		<view style="width: 70vw;position: fixed;top: 0;right: 0;height: 60rpx;z-index: 88888888">
			<m-search :clearabled="true" :input-align="['left', 'center', 'right'][0]" :shape="['round', 'square'][1]"
			          :show-action="true"
			          @search="search" bgColor="white" v-model="value">
			</m-search>
		</view>
		<!--预留高度-->
		<view style="height: 60rpx"></view>
		<!--清除浮动-->
		<view class="qcfd"></view>
		、
		<!--轮播图-->
		<m-swiper :effect3d="true" :height="250"
		          :indicator-pos="['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottomCenter'][3]"
		          :interval="3000"
		          :list="imgLists" :mode="['round', 'rect', 'number', 'none'][0]" :title="true"
		          @change="() => {}"
		          @click="() => {}"
		          class="margin-top">
		</m-swiper>
		<!--分类-->
		<view class="margin-top">
			<view class="flex text-center flex-wrap align-center">
				<view :key="index"
				      @tap="$mio.mioRoot.push(`/pages/modalOne/bookCity/${item.url}`)" style="width: 20%;height: 140rpx" v-for="(item, index) in moduleLists">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
					       :src="item.img" class="border-radius-sm" style="width: 120rpx"></image>
					<view :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa" style="font-size: 20px"
					      v-if="false"></view>
					<view class="margin-top-xxl">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!--滚动栏-->
		<scroll-view scroll-x style="position: relative;">
			<view class="flex align-start text-center">
				<view :key="index" @tap="$mio.mioRoot.push(`/pages/modalOne/bookCity/${item.url}`)"
				      style="width: 250rpx;margin-right: 20rpx;" v-for="(item, index) in testLists">
					<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
					       :src="item.img" class="border-radius-sm"
					       style="width: 150rpx;height: 150rpx;"></image>
					<view :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa" style="font-size: 20px"
					      v-if="false"></view>
					<view class="margin-top-xxl line-one">{{ item.name }}</view>
				</view>
			</view>
		</scroll-view>
		<!--推荐-->
		<view class="margin-top">
			<view class="padding border-radius" style="box-shadow: 0 0 10px 3px rgba(0,0,0,0.1)">
				<view class="flex justify-between padding-left-right-sm">
					<view>
						<text>热门推荐</text>
					</view>
					<view>
						<text>更多</text>
					</view>
				</view>
				<view class="margin-top">
					<view class="flex text-center flex-wrap align-center">
						<view :key="index" :style="{width: recommendLists.length == 3 ? '33.3%' :
						      recommendLists.length == 4 ? '25%' : recommendLists.length >= 5 ? '20%' : '100%' }" style="height: 340rpx;"
						      v-for="(item, index) in recommendLists">
							<image :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
							       :src="item.img" class="border-radius-sm" style="width: 150rpx;height: 80%"></image>
							<view :class="['fa-' + item.icon]" :style="{color: item.color}" class="fa" style="font-size: 20px"
							      v-if="false"></view>
							<view class="margin-top-xxl">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="border-radius box-shadow margin-top padding">
			<view class="flex justify-between padding-left-right-sm">
				<view>
					<text>热门推荐</text>
				</view>
				<view>
					<text>更多</text>
				</view>
			</view>
			<view :key="index" class="flex align-center margin-top" style="height: 300rpx"
			      v-for="(item, index) in testLists">
				<view style="height: 100%">
					<m-image :borderRadius="10"
					         :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]"
					         :shape="['square', 'circle'][0]" :showLoading="false"
					         :src="item.img"
					         bgColor="rgba(0, 0, 0, 1)"
					         bgColorError="rgba(0, 0, 0, 1)" duration="0" style="height: 80%;width: 160rpx">
						<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
					</m-image>
				</view>
				<view class="margin-left-xl">
					<view>
						<text>{{ item.name }}</text>
						<view class="line-three">{{ item.desc }}</view>
					</view>
					<view class="fr">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>

		<!--回到顶部-->
		<m-back-top :bottom="100" :imgStatus="true"
		            :imgStyle="{ width: '60rpx' }" :mode="['circle', 'square'][0]" :right="40" :scrollTop="scrollTop"
		            :top="0" imgSrc="/static/images/common/totop.png">
		</m-back-top>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class home extends Vue {
	value: string = ''
	isSticky: boolean = true

	scrollTop: number = 0

	socket: any = ''
	path: any = 'ws://api.lc918.cn/socket/'

	created () {
		this.socket = new WebSocket(this.path)
		// 监听socket连接
		this.socket.onopen = this.socketOpen
		// 监听socket错误信息
		this.socket.onerror = this.socketError
		// 监听socket消息
		this.socket.onmessage = this.socketMessage
	}

	socketOpen () {
		console.log('socket连接成功')
		this.socket.send('params')
	}

	socketError () {
		console.log('连接错误')
	}

	socketMessage (msg) {
		console.log(msg.data)
	}

	socketClose () {
		console.log('socket已经关闭')
	}

	imgLists: any = [
		{ image: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg', title: '昨夜星辰昨夜风，画楼西畔桂堂东' },
		{ image: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg', title: '身无彩凤双飞翼，心有灵犀一点通' },
		{
			image: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg',
			title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
		}
	]

	moduleLists: any = [
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
			icon: 'weixin',
			color: 'red',
			badge: 120,
			name: 'weixin',
			url: 'module/classifyDetail'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
			icon: 'close',
			color: 'orange',
			badge: 1,
			name: '录像'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg',
			icon: 'weixin',
			color: 'yellow',
			badge: 0,
			name: '图像'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg',
			icon: 'weixin',
			color: 'olive',
			badge: 22,
			name: '通知'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/5.jpg',
			icon: 'weibo',
			color: 'cyan',
			badge: 0,
			name: '排行榜'
		}
	]

	recommendLists: any = [
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
			icon: 'weixin',
			color: 'red',
			badge: 120,
			name: 'weixin'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
			icon: 'close',
			color: 'orange',
			badge: 1,
			name: '录像'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg',
			icon: 'weixin',
			color: 'yellow',
			badge: 0,
			name: '图像'
		},
		{
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg',
			icon: 'weixin',
			color: 'olive',
			badge: 22,
			name: '通知'
		},
	]

	testLists: any = [
		{
			desc: '如果人家不想长大，么能年上如还必数国心在逼走都种没么们。不过也许走都种没么们已经长大了？反正我上如还有',
			title: '摇还是不摇，这是一个问题',
			icon: 'weixin',
			color: 'red',
			badge: 120,
			name: 'Uzi',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg',
		},
		{
			desc: '这几个世纪以来，我一直在残杀你的同类!投降吧，我的凯旋是必然的，这个世界在冰雪中诞生，也将在冰雪中结束，闭上你的眼睛，让寒冷将你带走，死在我手下的皇后，多得连我自己都数不清了，跪倒在我面前吧!我将会释放你的能量，你真的选错阵营了。',
			title: '是时候表演真正的技术了！',
			icon: 'close',
			color: 'orange',
			badge: 1,
			name: '慎',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/2.jpg',
		},
		{
			desc: '想要再来一发么。想要再来一发么?我可不会留下任何悬念。一个狙击手最重要的工具就是精准(枪坏了)还有一把好武器。你们喜欢好警察呢?还是坏警察呢?',
			title: '生与死轮回不止，我们生他们死',
			icon: 'address-book',
			color: 'yellow',
			badge: 0,
			name: '武器大师',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/3.jpg'
		},
		{
			desc: '人类，瓦斯塔亚。我们都是艾欧尼亚人，面对着共同的威胁。一日为艾欧尼亚人，终生为艾欧尼亚人。你永远都不可能融入他们。父亲，母亲，泽洛斯，奶奶，乌恩，凯耶，小璐……他们全都没有活下来。我将在你的坟墓上起舞。',
			title: '你们快点逃跑把，不然人家就享受不到追杀的乐趣了!',
			icon: 'refresh',
			color: 'olive',
			badge: 22,
			name: '辛德拉',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/4.jpg'
		},
		{
			desc: '德莱厄斯，到一旁郁闷去吧，呵呵呵呵呵~~德玛西亚的荣光，永远不会消失!放马过来吧!你会死的很光荣的!你敢伸出诺克萨斯之手，我就敢剁掉他!德莱厄斯，你是个屠夫，不是个将军!',
			title: '点一下就够了，蠢货。那些活着的东西都被过分的高估了！',
			icon: 'clipboard',
			color: 'red',
			badge: 120,
			name: '德玛西亚皇子',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/5.jpg',
		},
		{
			desc: '我们的表演，即将开始。舞台已经搭建完成。我必须做这个儿庸俗的设置。我曾经驾驭不了这样的舞台，但是我升华了。我将为他们带来死亡的话剧。我为你精心制作了一份计划。终结你，将成为我最杰出的工作之一。',
			title: '生命，不过只是一场骗局，从你开始呼吸的那一刻起，你就已经在慢慢死亡了！',
			icon: 'male',
			color: 'orange',
			badge: 1,
			name: '卢锡安',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/6.jpg',
		},
		{
			desc: '你们的技术太烂了!你们想学的辛苦一些，我懂的。如果你们够厉害的话，我还是会正眼相待的。猴子，让我看看你学了哪些本事。别再耍猴戏了!',
			title: '倘若你迷失在黑暗之中，除了前行别无他法。',
			icon: 'lock',
			color: 'yellow',
			badge: 0,
			name: '剑圣',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/7.jpg'
		},
		{
			desc: '你们知道最强的武器是什么 没错就是补丁!哼 一个能打的都没有!没想到吧 我又回来啦!还有谁!',
			title: '我于杀戮之中盛放，亦如黎明中的花朵。',
			icon: 'qrcode',
			color: 'olive',
			badge: 22,
			name: 'RNG',
			img: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/8.jpg'
		},
	]

	onPageScroll (e) {
		this.scrollTop = e.scrollTop
	}
}
</script>

<style>
</style>
