
<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		
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
		this.loadOkSearch()
		// this.loadOkInfos()
	}

	async loadOkSearch () { // ok资源网搜索
		const okIndex = await commonGet('https://www.okzyw.com/index.php?m=vod-search-pg-3-wd-2020.html')
		const $ = cheerio.load(okIndex, { _useHtmlParser2: true })
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
		const $ = cheerio.load(okInfos, { _useHtmlParser2: true })
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
}
</script>

<style>

</style>
