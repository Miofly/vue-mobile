<template>
	<view class="full-height" id="parent">
		<view class="full-width bg-red text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="tu.back()" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			{{name}}成员排行
		</view>
		<view class="full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item>
					<mescroll-item ref="stOne" :url="url" :parmas="parmas" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-item ref="stTwo" :url="url" :parmas="parmas" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-item ref="stThree" :url="url" :parmas="parmas" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-item ref="stFour" :url="url" :parmas="parmas" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
    import MescrollItem from './memberRank-swiper'
    import AppTabs from '../../../components/mescroll-uni/app-tabs.vue'
    export default {
        components: {
            MescrollItem,
            AppTabs
        },
		onLoad (e) {
			// const data = JSON.parse(e.query)
			this.id = localStorage.getItem('teamId')
			this.name = localStorage.getItem('teamName')
			this.parmas = {department_id: this.id}
		},
        data () {
            return {
                name: '',
				id: '',
                url: '/team/department-member-list',
				parmas: {},
                status: true,
                height: '90%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '本月'],
                tabIndex: 0, // 当前tab的下标
            }
        },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
        }
    }
</script>

<style>

</style>
