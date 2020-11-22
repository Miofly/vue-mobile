<template>
	<view class="full-width flex justify-around align-center" style="height: 100rpx;background: black">
		<view class="">
			<view class="text-lg text-white">{{name}}</view>
		</view>
		<view style="width: 70vw">
			<m-search :clearabled="true" :input-align="['left', 'center', 'right'][0]" :shape="['round', 'square'][1]" :show-action="true"
					  @search="search" bgColor="white" borderColor="none" placeholder="请输入片名或演员" v-model="value">
			</m-search>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
	import {
        commonGet
	} from '@/api'
    const cheerio = require('cheerio')

	@Component({})
	export default class movieHeader extends Vue {
        value: string = ''
        name: string = '影视助手'
        placeholder: string = '请输入影片名称'
        keyword: string = ''
        timer: any = null

		appSearchData: any = []
        async search (val) {
        	console.log(val)
            const indexData = await commonGet(`https://app.movie/index.php/vod/search.html?wd=${val}&submit=`)
            const $ = cheerio.load(indexData, { _useHtmlParser2: true })

            for (let i = 0; i < $('.stui-vodlist li').length; i++) {
                this.appSearchData.push({
                    name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim() + $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                    url: `https://app.movie/index.php/vod/play/id/${
                        $('.stui-vodlist li').eq(i).children('a').attr('href').split('detail/id/')[1].replace('html', '')
                        }/sid/1/nid/1.html`
                })
            }
            console.log(this.appSearchData)
        }
	}
</script>

<style>

</style>
