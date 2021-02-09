<template>
	<view class="full-width-height">
		<view class="full-width bg-red" style="height: 240rpx;position: fixed;top: 0;left: 0;
		z-index: 9999;padding-top: 80rpx">
			<view class="bg-red flex justify-between width-fifty text-center text-lg "
				  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;">
				<view :class="[status? 'text-red bg-white' : 'text-white']" @tap="teamSwitch" class="padding"
					  style="width: 50%;border-bottom-right-radius: 0;
				;border-top-right-radius: 0">团队标题
				</view>
				<view :class="[!status? 'text-red bg-white' : 'text-white']" @tap="personSwitch" class="padding"
					  style="width: 50%;border-bottom-left-radius: 0;
				;border-top-left-radius: 0">公用标题
				</view>
			</view>
			<view class="text-right" v-if="is_department_captain || is_team_captain">
				<button :class="[['bg-white', 'line-white', 'line-white lines-white'][0],
			        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						@tap="jumpPage"
						class="cu-btn margin-right margin-top-ten-lower">
					<text :disabled="false" class="fa fa-wechat padding-right-twenty" v-show="false"></text>
					新增
				</button>
			</view>

		</view>
		<scrollMess :moreText="false ? '查看更多' : ''" :scrollable="true"
					:showClose="false" :showGetMore="false" :single="true"
					:speed="60" :text="mess" @getmore="getMore" background-color="#fffbe8"
					color="#de8c17" moreColor="#999999" showIcon="true"
					style="position: fixed;top: 240rpx;left: 0;z-index: 9999;height: 60rpx">
		</scrollMess>

		<view style="position: fixed;top: 300rpx;background: white;height: 100rpx;text-align: center;left: 0;width: 100%;z-index:999;">
		<span style="position: fixed;top: 330rpx;font-size: 18px;left: 20rpx">类型：</span>
		<radio-group @change="radioChange" style="text-align: center;display: inline-block;margin-top: 10rpx">
		<label v-for="(item, index) in items" :key="item.value"
		style="display: inline-block;margin-left: 30rpx">
		<radio :value="item.value" :checked="index === current"/>
		<view>{{item.name}}</view>
		</label>
		</radio-group>
		</view>


		<mescroll-uni :down="downOption" :up="upOption" @down="downCallback" @emptyclick="emptyClick"
					  @init="mescrollInit"
					  @up="upCallback" bottom="80"
					  height="100vh" ref="mescrollRef" top="300">
			<!--数据列表-->
			<view :class="[true?'sm-border':'', true?'card-menu margin-top':'']" class="cu-list menu"
				  style="overflow-x: hidden!important;">
				<view :key="index" class="cu-item" v-for="(item, index) in dataLists">
					<view class="content padding-tb-sm" style="overflow-x: hidden!important;">
						<view class="padding-top-bottom padding-right-xl" style="width: 100%;">
							<!--<image :src="'https://images.weserv.nl/?url=' + item.cover"-->
							<image :src="item.pic"
								   style="height: 200rpx;width: 200rpx"
							></image>
							<!--:mode="['', 'scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix'][aspectFit]"-->

							<view class="padding-left-xl " style="width: 75%;height: auto;overflow-x: hidden">
								<view style="overflow: hidden">
									{{ item.title }}
								</view>
								<view class="text-df text-grey" style="overflow: hidden">
									{{ item.desc }}
								</view>
								<view class="flex">
									<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
								        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="getLink(item.id)" class="cu-btn fl"
											style="width: 150rpx">
										<text class="fa fa-wechat" style="padding-right: 10rpx" v-show="true"></text>
										<text class="text-df" style="width: 100rpx">链接</text>
									</button>
									<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
								        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="jumpWx(item.title, item.desc, item.pic, item.id)" class="cu-btn fr"
											style="margin-left: 10px;width: 280rpx">
										<text class="fa fa-wechat" style="padding-right: 10rpx" v-show="true"></text>
										<text class="text-df">百度图文</text>
									</button>
								</view>
								<view class="margin-top">
									<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
								        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="jumpWxUc(item.title, item.desc, item.pic, item.id)" class="cu-btn fl"
											style="width: 280rpx">
										<text class="fa fa-wechat" style="padding-right: 10rpx" v-show="true"></text>
										<text class="text-df" style="">uc图文（苹果）</text>
									</button>
								</view>
							</view>
						</view>
					</view>

					<view class="action" v-show="false">
						<button :class="['cu-btn', 'bg-red', 'shadow']" @tap="detail(item.url)">
							操作
						</button>
					</view>
					<view class="fa fa-angle-right fa-2x margin-left text-gray" v-show="false"></view>
				</view>
			</view>
		</mescroll-uni>


		<view @tap="getShortChain" class="text-center margin-center full-width"
			  style="position: fixed;bottom: 12%;z-index: 999999999;">
			<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
			        ['sm', 'lg', ''][1], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
					class="cu-btn">
				<text :disabled="false" class="fa fa-wechat padding-right-twenty" v-show="false"></text>
				批量获取链接
			</button>
		</view>
		<modal :custom="true" :show="modalStatus" @cancel="hide8"
			   @click="handleClick" content="这是内容" title="标题">
			<view @tap="closeModalTwo" class="fa fa-close"
				  style="position: absolute; top:20px;right: 20px;font-size: 1.2rem"></view>
			<view class="text-lg text-center margin-center padding-top-bottom">批量获取链接</view>
			<view class="text-center padding" style="border: 1px solid rgba(0, 0, 0, 0.7);border-radius: 10px">
				<view v-if="tempVar">
					正在加载...
				</view>
				<view :key="index" v-else v-for="(url_list, index) in url_lists">
					<view>{{url_list == null ? url_list : url_list.length > 40 ? url_list.slice(0, 40) + '...' :
						url_list}}
					</view>
					<!--<view>{{url_list}}</view>-->
				</view>
			</view>
			<view class="flex justify-around margin-top">
				<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						@tap="replace" class="cu-btn">
					<text class="fa fa-wechat padding-right-twenty" v-show="false"></text>
					换一批
				</button>
				<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						@tap="modalWx" class="cu-btn">
					<text class="fa fa-wechat padding-right-twenty" v-show="false"></text>
					复制并打开微信
				</button>
				<!--<button @tap="copyVal" class="cu-btn" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],-->
				<!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
				<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
				<!--复制内容-->
				<!--</button>-->
			</view>
		</modal>

		<modal :custom="true" :show="modalStatusTwo" content="这是内容"
			   title="标题">
			<view @tap="closeModal" class="fa fa-close"
				  style="position: absolute; top:10px;right: 10px;font-size: 1.2rem"></view>
			<view class="text-center padding" style="border: 1px solid rgba(0, 0, 0, 0.7);border-radius: 10px">
				<view v-if="tempTwo">{{tipMess}}</view>
				<!--<view v-else>{{shortChain.length > 30 ? shortChain.slice(0, 30) + '...' : shortChain}}</view>-->
				<view v-else>{{shortChain}}</view>
			</view>
			<view class="flex justify-around margin-top">
				<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						@tap="modalWxTwo" class="cu-btn">
					<text class="fa fa-wechat padding-right-twenty" v-show="false"></text>
					复制并打开微信
				</button>
				<button :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
						@tap="copyTwo" class="cu-btn">
					<text class="fa fa-wechat padding-right-twenty" v-show="false"></text>
					复制链接
				</button>
			</view>
		</modal>
	</view>
</template>

<script>
    import { commonPost, publicGet } from '@/api'
    import MescrollMixin from '../../../components/mescroll-uni/mescroll-mixins.js'
    import NativeShare from 'nativeshare'
    import { mapState } from 'vuex'

    export default {
        mixins: [MescrollMixin],
        data () {
            return {
                current: 0,
                items: [
                    {
                        value: '26',
                        name: '裂变'
                    },
                    {
                        value: '34',
                        name: '美女视频'
                    },
                    {
                        value: '1',
                        name: 'w.url'
                    },
                    {
                        value: '5',
                        name: 'w.url2'
                    },
                    {
                        value: '4',
                        name: 'sohu'
                    },
                    {
                        value: '2',
                        name: 'suo.im'
                    }
                ],
                tipMess: '正在加载...',
                modalStatusTwo: false,
                tempVar: true,
                url_lists: [],
                mess: '',
                status: true,
                bgSrc: '/static/images/lz_lz_bg.png',
                screenHeight: '',
                screenWidth: '',
                modalStatus: false,
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...'
                },
                upOption: { // 上拉加载的常用配置
                    use: true, // 是否启用上拉加载; 默认true
                    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    // page: {
                    //     num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    //     size: 3 // 每页数据的数量,默认10
                    // },
                    empty: {
                        tip: '暂无相关数据'
                    },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...'
                },
                dataLists: [],
                nativeShare: new NativeShare(),
                is_department_captain: '',
                is_team_captain: '',
                shortChain: '',
                tempTwo: true,
                radioVal: '26'
            }
        },
        onUnload () {
            // this.route.push({name: 'login'})
            uni.redirectTo({
                url: '/pages/index/login/login'
            })
        },
        async mounted () {
            let test = localStorage.getItem('is_department_captain')
            let test1 = localStorage.getItem('is_team_captain')

            if (test == 1) {
                test = true
                this.is_department_captain = test
            }
            if (test == 0) {
                test = false
                this.is_department_captain = test
            }
            setTimeout(() => {
                this.is_department_captain = test
            }, 0)

            if (test1 == 1) {
                test1 = true
                this.is_team_captain = test1
            }
            if (test1 == 0) {
                test1 = false
                this.is_team_captain = test1
            }
            setTimeout(() => {
                this.is_team_captain = test1
            }, 0)

            const data = await commonPost('/my/system-info')
            this.mess = data.data.notice
        },
        methods: {
            closeModalTwo () {
                this.tipMess = '正在加载...'
                this.modalStatus = false
                this.url_lists = []
                this.tempVar = true
            },
            radioChange (evt) {
                console.log(evt.detail.value)
                this.radioVal = evt.detail.value
            },
            closeModal () {
                this.tipMess = '正在加载...'
                this.tipMessTwo = '正在加载...'
                this.modalStatusTwo = false
                this.shortChain = ''
                this.tempTwo = true
            },
            modalWxTwo () {
                this.tu.getClipboardData(this.shortChain)
                this.tu.jumpWX()
                this.shortChain = ''
                this.modalStatusTwo = false
                this.tempTwo = true
            },
            copyTwo () {
                this.tu.getClipboardData(this.shortChain)
                this.modalStatusTwo = false
                this.ui.showToast('复制成功')
                this.shortChain = ''
                this.tempTwo = true
            },
            modalWx () {
                const str = this.url_lists.join(',')
                const test = str.replace(/,/g, '\n')
                this.tu.getClipboardData(test)
                this.tu.jumpWX()
            },
            copyVal () {
                const str = this.url_lists.join(',')
                const test = str.replace(/,/g, '\n')

                this.tu.getClipboardData(test)
                this.modalStatus = false
                this.ui.showToast('复制成功')
            },
            async replace () {
                this.tempVar = true
                this.url_lists = []
                const data = await commonPost('/title/title-share-batch', {
                    url_type: 0,
                    trans_product_id: this.radioVal
                })
                this.url_lists = data.data
                this.tempVar = false
            },
            async getShortChain () {
                this.modalStatus = true
                const data = await commonPost('/title/title-share-batch', {
                    url_type: 0,
                    trans_product_id: this.radioVal
                })
                this.tempVar = false
                this.url_lists = data.data
            },
            async getLink (id) {
                this.modalStatusTwo = true
                const data = await commonPost('/title/title-share', {
                    id,
                    url_type: 0,
                    trans_product_id: this.radioVal
                })
                console.log(data.data)
                if (data.data == null) {
                    this.tempTwo = true
                    this.tipMess = '获取失败，请重新获取'
                } else if (data.data.substring(0, data.data.length - 1) == '') {
                    this.tempTwo = true
                    this.tipMess = '获取失败，请重新获取'
                } else {
                    this.shortChain = data.data.substring(0, data.data.length - 1)
                    this.tempTwo = false
                }

            },
            async jumpWxUc (title, desc, pic, id) {
                this.ui.showLoading()
                const data = await commonPost('/title/title-share', {
                    id,
                    url_type: 0,
                    trans_product_id: this.radioVal
                })
                let url = data.data
                uni.hideLoading()
                if (data.data == null) {
                    this.ui.showToast('获取失败，请重新获取')
                } else if (data.data.substring(0, data.data.length - 1) == '') {
                    this.ui.showToast('获取失败，请重新获取')
                } else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
                        this.ui.showToast('图文分享请打开百度APP（安卓）或者UC浏览器（苹果）')
                        location.href = 'ucbrowser://http://web.lezhuan2020.cn'
                    } else {
                        try {
                            if (url.charAt(url.length - 1) == '?') {
                                url = url.substring(0, url.length - 1)
                            }
							this.nativeShare.setShareData({
								link: 'https://dongtianzoule.kuaizhan.com/1793045959?fc5=132',
								title: '美艳老师给我暧的浇欲',
								desc: ' ',
								icon: 'http://cp4lb.oss-cn-shanghai.aliyuncs.com/dj-60/doujia/static/img/rnjvk.jpg',
							})
                            this.nativeShare.call('wechatFriend')
                        } catch (err) {
                            this.ui.showToast('图文分享请打开百度APP（安卓）或者UC浏览器（苹果）')
                            location.href = 'ucbrowser://http://web.lezhuan2020.cn'
                        }
                    }
            },
            async jumpWx (title, desc, pic, id) {
                this.tu.getClipboardData('http://web.lezhuan2020.cn')
                this.ui.showLoading()
                const data = await commonPost('/title/title-share', {
                    id,
                    url_type: 0,
                    trans_product_id: this.radioVal
                })
                let url = data.data
                uni.hideLoading()
                if (data.data == null) {
                    this.ui.showToast('获取失败，请重新获取')
                } else if (data.data.substring(0, data.data.length - 1) == '') {
                    this.ui.showToast('获取失败，请重新获取')
                } else if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
                        this.ui.showToast('图文分享请打开百度APP（安卓）或者UC浏览器（苹果）')
                        location.href = 'baiduboxapp://url=http://web.lezhuan2020.cn'
                    } else {
                        try {
                            if (url.charAt(url.length - 1) == '?') {
                                url = url.substring(0, url.length - 1)
                            }
                            // let ua = navigator.userAgent
                            // var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                            this.nativeShare.setShareData({
                                link: url,
                                title: title == '' || title == null ? ' ' : title,
                                desc: desc == '' || desc == null ? ' ' : desc,
                                icon: pic,
                            })
                            this.nativeShare.call('wechatFriend')
                        } catch (err) {
                            this.ui.showToast('图文分享请打开百度APP（安卓）或者UC浏览器（苹果）')
                            location.href = 'baiduboxapp://url=http://web.lezhuan2020.cn'
                            // location.href = 'baiduboxapp://s=http://web.lezhuan2020.cn'
                        }
                    }
            },
            jumpPage () {
                // console.log(31212)
                // console.log(this.router)
                // this.router.push({name: 'addItem'})
                uni.navigateTo({
                    url: '/pages/index/module/addItem'
                })
            },
            personSwitch () {
                if (this.status == true) {
                    this.ui.showLoading()
                    this.dataLists = []
                    this.status = false
                    this.upCallback({ num: 1, size: 15 }, 1)
                }
            },
            teamSwitch () {
                if (this.status == false) {
                    this.ui.showLoading()
                    this.dataLists = []
                    this.upCallback({ num: 1, size: 15 }, 0)
                    this.status = true
                }
            },
            downCallback () { // 下拉刷新的回调
                if (this.status == false) {
                    this.upCallback({ num: 1, size: 15 }, 1)
                }
                if (this.status == true) {
                    this.upCallback({ num: 1, size: 15 }, 0)
                }
                // this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                // 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
            },
            async upCallback (page, common = 0) { // 上拉加载的回调
                console.log(page)
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条
                const data = await commonPost('/title/title-list', { common, page: pageNum, per_page: pageSize })
                uni.hideLoading()
                // 接口返回的当前页数据列表 (数组)
                const curPageData = data.data.list.data
                // for (let i = 0; i < curPageData.length; i++) {
                //     this.idArr.push(curPageData[i].id)
                // }

                const last_page = data.data.list.last_page
                // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
                const curPageLen = curPageData.length
                // 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
                // const totalPage = data.xxx
                // // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
                // const totalSize = data.xxx
                // // 接口返回的是否有下一页 (true/false)
                // const hasNext = data.xxx
                // 设置列表数据
                if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                // 请求成功,隐藏加载状态
                // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
                this.mescroll.endByPage(curPageLen, last_page)
            }
        },
        computed: {
            ...mapState(['indexControl']),
        },
    }
</script>
