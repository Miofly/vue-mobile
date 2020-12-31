
<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<scroll-view style="background: rgb(30, 40, 40);" class="padding-bottom-ten-five">
			<!--最新电影-->
			<view :key="i" class="padding-bottom" style="border-bottom:2px solid #2c2c36;"
			      v-for="(k, i) in classifys">
				<view class="padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">{{k.title}}</view>
				</view>
				<view :class="['col-' + 3,false?'':'no-border']" class="cu-list grid bg-black">
					<view :key="index" @click="mvDetail(item.id)" class="padding-left-right-sm"
					      v-for="(item, index) in appyys.slice(i * 12, (i + 1) * 12)">
						<view style="position: relative;height: 100%">
							<m-image :borderRadius="10" :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]" :shape="['square', 'circle'][0]"
							         :src="item.img" bgColor="rgba(0, 0, 0, 1)" bgColorError="rgba(0, 0, 0, 1)" height="300">
								<view class="text-white" slot="error" style="font-size: 24rpx;">加载失败</view>
							</m-image>

							<view class="padding-top-bottom-lg" style="color: #ccc;font-size: 14px;">
								{{$mio.mioRoot.strEllipsis(item.name, 7)}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
import { commonGet } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import mImage from 'zj/m-image/m-image.vue'

const cheerio = require('cheerio')

@Component({
	components: {
		// #ifdef H5
		mImage
		// #endif
	}
})
export default class mvIndex extends Vue {
	classifys: any = [
		{ title: '最新电影' },
		{ title: '最新电视剧' },
		{ title: '最新综艺' },
		{ title: '最新动漫' }
	]

	// #ifdef H5
	appyys: any = [ // app影院首页
		{
			name: '我和我的家乡电影幕后纪实节目',
			url: '/index.php/vod/detail/id/303634.html',
			id: '303634',
			remark: '04',
			img: 'https://img.kwstr.com/upload/vod/2020-09-19/16005265711.jpg'
		}, {
			name: '新封神姜子牙',
			url: '/index.php/vod/detail/id/273267.html',
			id: '273267',
			remark: 'HD',
			img: 'http://qnoss3.lanlanlife.com/4af51b4e0e8a54dc3bd8c6570d65105c_236x180.jpg'
		}, {
			name: '坛之浦夜枕合战记',
			url: '/index.php/vod/detail/id/304446.html',
			id: '304446',
			remark: '高清',
			img: 'https://img.kwstr.com/upload/vod/2020-10-01/202010011601513844.png'
		}, {
			name: '我和我的家乡',
			url: '/index.php/vod/detail/id/304821.html',
			id: '304821',
			remark: 'TC',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-10/1602003757.jpg'
		}, {
			name: '夺冠',
			url: '/index.php/vod/detail/id/304225.html',
			id: '304225',
			remark: 'TC',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-29/202009291601366192.jpg'
		}, {
			name: '急先锋',
			url: '/index.php/vod/detail/id/304469.html',
			id: '304469',
			remark: '粤语TC',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-10/1601615859.jpg'
		}, {
			name: '鬼吹灯之湘西密藏',
			url: '/index.php/vod/detail/id/304292.html',
			id: '304292',
			remark: 'HD',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-26/202009261601081438.jpg'
		}, {
			name: '八佰',
			url: '/index.php/vod/detail/id/301251.html',
			id: '301251',
			remark: 'HD1280高清国语中字版',
			img: 'http://qnoss3.lanlanlife.com/001fa58e7464e37f40ed0cb30c7f533c_389x267.jpg'
		}, {
			name: '急先锋·独家纪录片',
			url: '/index.php/vod/detail/id/304336.html',
			id: '304336',
			remark: 'HD',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-9/202093016382723879.png'
		}, {
			name: '蛇王',
			url: '/index.php/vod/detail/id/304355.html',
			id: '304355',
			remark: 'HD',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1601479666.jpg'
		}, {
			name: '花木兰',
			url: '/index.php/vod/detail/id/302629.html',
			id: '302629',
			remark: '720p中英字幕',
			img: 'https://img.kwstr.com/upload/vod/2020-09-04/15992207630.jpg'
		}, {
			name: '新封神姜子牙/新封神之姜子牙',
			url: '/index.php/vod/detail/id/273271.html',
			id: '273271',
			remark: 'HD1080P中字',
			img: 'http://qnoss3.lanlanlife.com/4af51b4e0e8a54dc3bd8c6570d65105c_236x180.jpg'
		}, {
			name: '我，喜欢你',
			url: '/index.php/vod/detail/id/303272.html',
			id: '303272',
			remark: '完结',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1600171111.jpg'
		}, {
			name: '风犬少年的天空',
			url: '/index.php/vod/detail/id/303865.html',
			id: '303865',
			remark: '第13集',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1600955419.jpg'
		}, {
			name: '重启之极海听雷第二季',
			url: '/index.php/vod/detail/id/303159.html',
			id: '303159',
			remark: '完结',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1599998381.jpg'
		}, {
			name: '半是蜜糖半是伤',
			url: '/index.php/vod/detail/id/304047.html',
			id: '304047',
			remark: '第24集',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1601208291.jpg'
		}, {
			name: '约定期间爱上你',
			url: '/index.php/vod/detail/id/303854.html',
			id: '303854',
			remark: '完结',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-24/202009241600941021.jpg'
		}, {
			name: '长安诺',
			url: '/index.php/vod/detail/id/302946.html',
			id: '302946',
			remark: '第42集',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-9/p2545552940.jpg'
		}, {
			name: '在一起2020',
			url: '/index.php/vod/detail/id/304271.html',
			id: '304271',
			remark: '完结',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-9/p2606155671.jpg'
		}, {
			name: '完美先生和差不多小姐',
			url: '/index.php/vod/detail/id/304145.html',
			id: '304145',
			remark: '第22集',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1601296888.jpg'
		}, {
			name: '亲爱的自己',
			url: '/index.php/vod/detail/id/302793.html',
			id: '302793',
			remark: '48集全',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-07/202009071599478179.jpg'
		}, {
			name: '琉璃',
			url: '/index.php/vod/detail/id/300132.html',
			id: '300132',
			remark: '完结',
			img: 'http://qnoss2.lanlanlife.com/db6f1f8e27dd3f8384ca320bbb2ec3c9_378x270.jpg'
		}, {
			name: '凤唳九天',
			url: '/index.php/vod/detail/id/303751.html',
			id: '303751',
			remark: '第32集',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-22/202009221600746926.jpg'
		}, {
			name: '沉默的真相',
			url: '/index.php/vod/detail/id/303337.html',
			id: '303337',
			remark: '12集全',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1600256393.jpg'
		}, {
			name: '想想办法吧！爸爸',
			url: '/index.php/vod/detail/id/304363.html',
			id: '304363',
			remark: '12期全',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-9/p2528646605.jpg'
		}, {
			name: '演员请就位第二季',
			url: '/index.php/vod/detail/id/303671.html',
			id: '303671',
			remark: '更新至20201010',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1600676551.jpg'
		}, {
			name: '德云斗笑社',
			url: '/index.php/vod/detail/id/301930.html',
			id: '301930',
			remark: '更新至20201008',
			img: 'http://qnoss3.lanlanlife.com/7ed7bdf03aee7c41fab015f0d1c5b097_405x270.jpg'
		}, {
			name: '脱口秀大会第三季',
			url: '/index.php/vod/detail/id/299072.html',
			id: '299072',
			remark: '更新至20200923',
			img: 'http://qnoss.lanlanlife.com/03fdfed952088048f9530191eaf773f1_405x270.jpg'
		}, {
			name: '中国好声音2020',
			url: '/index.php/vod/detail/id/301481.html',
			id: '301481',
			remark: '更新至20201008',
			img: 'http://qnoss2.lanlanlife.com/248d8e31848d526d2c03a739621ac155_270x270.jpg'
		}, {
			name: '中餐厅第四季',
			url: '/index.php/vod/detail/id/299675.html',
			id: '299675',
			remark: '更新至20201009',
			img: 'http://qnoss1.lanlanlife.com/1b610cff48712baad8796197d4456f15_216x270.jpg'
		}, {
			name: '元气满满的哥哥',
			url: '/index.php/vod/detail/id/299676.html',
			id: '299676',
			remark: '更新至20200930',
			img: 'http://qnoss2.lanlanlife.com/d1f322a2311e81ad2a44e99cad69afa0_405x270.jpg'
		}, {
			name: '做家务的男人第二季',
			url: '/index.php/vod/detail/id/299732.html',
			id: '299732',
			remark: '更新至20201009',
			img: 'http://qnoss1.lanlanlife.com/4aa61ec3004777174f37f4295b0e4852_405x270.jpg'
		}, {
			name: '快乐大本营',
			url: '/index.php/vod/detail/id/207422.html',
			id: '207422',
			remark: '更新至20201010',
			img: 'http://qnoss.lanlanlife.com/b5be350427a2ac72a71312a4098995ab_364x270.jpg'
		}, {
			name: '这！就是街舞第三季',
			url: '/index.php/vod/detail/id/298777.html',
			id: '298777',
			remark: '更新至20201003',
			img: 'http://qnoss2.lanlanlife.com/9eae7654c1289929601fe5020ddb8eae_405x270.jpg'
		}, {
			name: '心动的信号第三季',
			url: '/index.php/vod/detail/id/302862.html',
			id: '302862',
			remark: '第20201013期',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-09-08/202009081599567443.jpg'
		}, {
			name: '嗨唱转起来第二季',
			url: '/index.php/vod/detail/id/304542.html',
			id: '304542',
			remark: '第20201002期',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-10/p2621205026.jpg'
		}, {
			name: '姜子牙',
			url: '/index.php/vod/detail/id/304553.html',
			id: '304553',
			remark: 'TC清晰版',
			img: 'https://tu.tianzuida.com/pic/upload/vod/2020-10-03/202010031601689009.jpg'
		}, {
			name: '斗罗大陆第1季',
			url: '/index.php/vod/detail/id/230599.html',
			id: '230599',
			remark: '更新至125集',
			img: 'http://qnoss1.lanlanlife.com/9486b30a834092d0abb31d4af1018bb6_580x420.jpg'
		}, {
			name: '全职高手第二季',
			url: '/index.php/vod/detail/id/303888.html',
			id: '303888',
			remark: '第04集',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1601007251.jpg'
		}, {
			name: '秦时明月之沧海横流',
			url: '/index.php/vod/detail/id/162417.html',
			id: '162417',
			remark: '更新至04集',
			img: 'http://qnoss3.lanlanlife.com/02330bd6f3344f382f6c15b9d17a4b2a_672x448.jpg'
		}, {
			name: '穿书自救指南',
			url: '/index.php/vod/detail/id/302940.html',
			id: '302940',
			remark: '第10集',
			img: 'https://img.kuyun88.com/pic/uploadimg/2020-9/202091010552970020.png'
		}, {
			name: '灵笼',
			url: '/index.php/vod/detail/id/255689.html',
			id: '255689',
			remark: '更新至12集',
			img: 'http://qnoss1.lanlanlife.com/37e9cf4941abe64c8868432f9ed02d46_360x270.jpg'
		}, {
			name: '穿书自救指南',
			url: '/index.php/vod/detail/id/302936.html',
			id: '302936',
			remark: '10集全',
			img: 'https://images.cnblogsc.com/pic/upload/vod/2020-09/1599706122.jpg'
		}, {
			name: '元龙',
			url: '/index.php/vod/detail/id/298129.html',
			id: '298129',
			remark: '完结',
			img: 'http://qnoss3.lanlanlife.com/6bde1b7a707cf9b29cf36f3acd1ca0d2_378x270.jpg'
		}, {
			name: '海贼王',
			url: '/index.php/vod/detail/id/140051.html',
			id: '140051',
			remark: '更新至945集',
			img: 'http://qnoss.lanlanlife.com/704718bca969487317ba72d9a2772f5d_350x250.jpg'
		}, {
			name: '甜蜜惩罚～我是看守专用宠物',
			url: '/index.php/vod/detail/id/254625.html',
			id: '254625',
			remark: '第12集',
			img: 'http://qnoss1.lanlanlife.com/a16f4bc98a3176d9703951393790f48e_711x503.jpg'
		}, {
			name: '斗罗大陆 第1季',
			url: '/index.php/vod/detail/id/176392.html',
			id: '176392',
			remark: '更新到125集',
			img: 'http://qnoss2.lanlanlife.com/19609bdb2d2eae30fd28e2f090724f00_1080x770.jpg'
		}, {
			name: '武庚纪第三季',
			url: '/index.php/vod/detail/id/277458.html',
			id: '277458',
			remark: '更新至42集',
			img: 'http://qnoss2.lanlanlife.com/791e59bd4877bd48f9d5faf1545ac630_379x270.jpg'
		}
	]
	// #endif

	// #ifdef MP-WEIXIN
	// @ts-ignore
	appyys: any = []
	// #endif

	mvUrl: string = ''
	dtTitle: string = ''
	dtType: string = ''
	dtActor: string = ''
	dtLang: string = ''
	videoTitle: string = ''
	posterImg: string = ''
	mvDetailData: any = []
	mvDetailDataMU: any = []

	created () {
		this.loadAppMovieInfos(273267)
		this.loadAppMovieInfos(303634)
	}

	async loadOkSearch () { // ok资源网搜索
		const okIndex = await commonGet('https://www.okzyw.com/index.php?m=vod-search&wd=2020&submit=search')
		const $ = cheerio.load(okIndex)
		const data = []
		for (let i = 0; i < $('.xing_vb4 a').length; i++) {
			data.push({ name: $('.xing_vb4 a').eq(i).text(), url: $('.xing_vb4 a').eq(i).attr('href') })
		}
		const pageCount = $('.pages').text().split('当前:')[1].split('首页')[0].split('/')[1].replace(/页/g, '')

		console.log(data)
		console.log(pageCount)
	}

	async loadOkInfos () { // ok资源网视频详情
		const okInfos = await commonGet('https://www.okzyw.com/?m=vod-detail-id-65704.html')
		const $ = cheerio.load(okInfos)
		this.dtTitle = $('.vodh h2').text()
		this.videoTitle = $('.vodh h2').text()
		this.dtType = $('.vodinfobox ul li').eq(3).addBack('span').text()
		this.dtActor = $('.vodinfobox ul li').eq(2).addBack('span').text()
		this.dtLang = $('.vodinfobox ul li').eq(5).addBack('span').text()
		this.posterImg = $('.lazy').attr('src')


		for (let i = 0; i < $('#1 ul li').length; i++) {
			if ($('#1 ul li').eq(i).text().indexOf('.m3u8') === -1) {
				this.mvDetailData.push({
					name: $('#1 ul li').eq(i).text().split('$')[0],
					url: $('#1 ul li').eq(i).text().split('$')[1]
				})
			} else {
				this.mvDetailDataMU.push({
					name: $('#1 ul li').eq(i).text().split('$')[0],
					url: $('#1 ul li').eq(i).text().split('$')[1]
				})
			}
		}

		for (let i = 0; i < $('#2 ul li').length; i++) {
			if ($('#2 ul li').eq(i).text().indexOf('.m3u8') === -1) {
				this.mvDetailData.push({
					name: $('#2 ul li').eq(i).text().split('$')[0],
					url: $('#2 ul li').eq(i).text().split('$')[1]
				})
			} else {
				this.mvDetailDataMU.push({
					name: $('#2 ul li').eq(i).text().split('$')[0],
					url: $('#2 ul li').eq(i).text().split('$')[1]
				})
			}
		}

		console.log(this.dtTitle)
		console.log(this.videoTitle)
		console.log(this.dtType)
		console.log(this.dtActor)
		console.log(this.dtLang)
		console.log(this.posterImg)
		console.log(this.mvDetailDataMU)
		console.log(this.mvDetailData)
	}

	async loadAppIndex () { // appMovie 首页
		const indexData = await commonGet('https://app.movie/')
		const $ = cheerio.load(indexData, { _useHtmlParser2: true })
		for (let i = 0; i < $('.stui-vodlist li').length; i++) {
			this.appyys.push({
				name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
				url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
				id: $('.stui-vodlist li').eq(i).children('a').attr('href').trim().split('id\/')[1].replace(/.html/g, ''),
				remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
				img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim()
			})
		}
		console.log(this.appyys)
	}

	async loadAppMovieInfos (id) {
		const indexData = await commonGet(`https://app.movie/index.php/vod/detail/id/${id}/.html`)
		const $ = cheerio.load(indexData, { _useHtmlParser2: true })

		console.log('剧名', $('.stui-content__detail .title').text())
		console.log('简介', $('.stui-content__desc').text())
		console.log('导演', $('.stui-content__detail').children('p').eq(2).text())
	}
}
</script>

<style>

</style>
