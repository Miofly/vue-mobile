<template>
	<view style="position: relative;height: 100%">
		<!--上面搜索栏-->
		<view :class="['bg-'+bgColor]" class="cu-bar fixed">
<!--			<view v-if="avatarShow">-->
<!--				<view v-if="backSwitch" style="width: 10vw;height: 10vw" :style="[{background: 'url('+ avatarSrc +') no-repeat', backgroundSize: '100% 100%'}]" class="cu-avatar round"></view>-->
<!--				<view v-else @tap="backIndex" class="fa fa-reply text-gray" style="margin-left: 10upx;font-size: 40rpx"></view>-->
<!--			</view>-->

			<view class="search-form radius">
				<view class="fa fa-search"></view>
				<!-- @blur="InputBlur" ['text', 'number', 'idcard', 'digit'][0]"-->
				<input :adjust-position="false" :placeholder="placeholder" :disabled="false"
					   @focus="inputFocus" :password="false" maxlength="-1" :focus="false"
					   @input="realTimeInput(keyword)" confirm-type="done"
					   type="text" v-model="keyword"
				>
				<!--删除文字图标-->
				<view @tap="deleteVal" class="fa fa-close padding-right-sm"></view>
			</view>

			<view class="action">
				<m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
						  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][2]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][1]"
						  @click="doSearch(keyword)" class="text-white fulls-width" style="height: 60rpx">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					搜索
				</m-button>
			</view>
		</view>

		<!--<view style="height: 10%"></view>-->

		<view v-if="indexShow">
			<slot name="content"></slot>
		</view>
		<!--历史热门搜索-->
		<scroll-view class="keyword-box" scroll-y="true" style="height: 100%;position: fixed;top: 6.5%;"
					 v-show="searchListShow">
			<!--历史搜索-->
			<view class="keyword-block" v-if="oldKeywordList.length>0">
				<view class="keyword-list-header">
					<view>历史搜索</view>
					<view>
						<image @tap="oldDelete" src="/static/images/common/delete.png"></image>
					</view>
				</view>
				<view class="keyword">
					<view :key="index" @tap="doSearch(keyword)" v-for="(keyword,index) in oldKeywordList">
						{{keyword}}
					</view>
				</view>
			</view>

			<!--热门搜索-->
			<view class="keyword-block" v-if="hotStatus">
				<view class="keyword-list-header">
					<view>热门搜索</view>
					<view>
						<!--<image :src="'/static/images/common/attention'+forbid+'.png'" @tap="hotToggle"></image>-->
					</view>
				</view>
				<view class="keyword" v-if="forbid==''">
					<view :key="index" @tap="doSearch(keyword)" v-for="(keyword,index) in hotKeywordList">
						{{keyword}}
					</view>
				</view>
				<view class="hide-hot-tis" v-else>
					<view>当前搜热门搜索已隐藏</view>
				</view>
			</view>

			<view class="margin-top-xl text-center" v-if="oldKeywordList.length == 0">
				请在输入框输入要搜索的内容
			</view>

			<!--#ifdef MP-WEIXIN-->
			<ad v-if="ggkz" :unit-id="zsspgg" ad-type="video" ad-theme="white"></ad>
			<ad v-if="ggkz" :unit-id="zsptgg" ad-intervals="30"></ad>
			<!--#endif-->
		</scroll-view>

		<view style="height: 100%" v-if="!searchListShow && !indexShow">
			<slot name="detail"></slot>
		</view>
	</view>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
    import { debounce, throttle } from 'uJs/toolUtils'

    @Component({})
    export default class NewSearch extends Vue {
        @Prop({ default: true, type: Boolean }) avatarShow?: boolean // 是否显示头像
        @Prop({ default: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg', type: String }) avatarSrc?: string // 头像资源
        @Prop({ default: 'white', type: String }) bgColor?: string // 背景颜色
        @Prop({ default: 'blue', type: String }) btnColor?: string // 按钮颜色
        @Prop({ default: '请输入要搜索的内容', type: String }) placeholder?: string // 输入提示
        @Prop({ default () { return ['周杰伦', '陈奕迅', '华晨宇', '许嵩'] }, type: Array }) hotKeywordList?: any [] // 热门搜索信息

        @Prop({ default: 'hisKeys', type: String }) hisKeys?: string // 历史搜索的key值
        @Prop({ default: true, type: Boolean }) hotStatus?: boolean // 热门搜索是否显示
        @Prop({ default: false, type: Boolean }) ssBackIndex?: boolean // 搜索完是否回到首页

        backSwitch: boolean = true // 头像与返回按钮显示切换
        indexShow: boolean = true // 显示热门历史搜索模块
        searchListShow: boolean = false // 显示热门历史搜索模块
        oldKeywordList: any = [] // 历史搜索信息
        keyword: string = '' // 搜索关键字
        forbid: string = '' // 热门搜索开关

		ggkz: string = this.$store.state.root.ggkz
        zsspgg: string = this.$store.state.root.zsspgg
        zsptgg: string = this.$store.state.root.zsptgg

        doSearch = throttle(this.doSearchOne) // eslint-disable-line

        @Emit('question')
		doSearchOne (key): void {
            if (this.ssBackIndex) {
                this.indexShow = true
                if (this.keyword !== key.trim() && key.trim() != '') { // eslint-disable-line
                    this.keyword = key.trim()
                    this.saveKeyword(this.keyword)
                    this.searchListShow = false
                } else {
                    this.searchListShow = false
                    console.log('搜索内容为空或者与上次一致')
                }
            } else {
                this.indexShow = false
                if (this.keyword !== key.trim() && key.trim() != '') { // eslint-disable-line
                    this.keyword = key.trim()
                    this.saveKeyword(this.keyword)
                    this.searchListShow = false
                } else {
                    this.searchListShow = false
                    console.log('搜索内容为空或者与上次一致')
                }
            }
		}

        realTimeInput = debounce(this.realTimeInputOne) // eslint-disable-line

        @Emit('question')
        realTimeInputOne (key): void {

            if (this.ssBackIndex) {
                this.indexShow = true
                if (key.trim() != '') { // eslint-disable-line
                    this.saveKeyword(key.trim())
                    this.searchListShow = false
                }
            } else {
                this.indexShow = false
                console.log(this.keyword.trim())
                if (this.keyword.trim() != '') { // eslint-disable-line
                    this.saveKeyword(this.keyword.trim())
                    this.searchListShow = false
                }
            }
		}

        backIndex () { // 返回首页
            this.searchListShow = false
            this.backSwitch = true
            this.indexShow = true
        }

        init () { // 初始化
            this.loadOldKeyword()
        }

        // 加载历史搜索,自动读取本地Storage
        loadOldKeyword () {
            uni.getStorage({
                key: this.hisKeys,
                success: (res) => {
                    const hisKeysData = JSON.parse(res.data)
                    this.oldKeywordList = hisKeysData
                }
            })
        }

        inputFocus () { // 搜索框聚焦事件
            this.indexShow = false
            this.searchListShow = true
            this.backSwitch = false
        }

        // 清除输入框内容
        deleteVal () {
            this.keyword = ''
            this.searchListShow = true
        }

        // 清除历史搜索
        oldDelete () {
            uni.showModal({
                content: '确定清除历史搜索记录？',
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        this.oldKeywordList = []
                        uni.removeStorage({
                            key: this.hisKeys
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

        // 热门搜索开关
        hotToggle () {
            this.forbid = this.forbid ? '' : '_forbid'
        }

        // 保存关键字到历史记录
        saveKeyword (keyword) {
            uni.getStorage({
                key: this.hisKeys,
                success: (res) => {
                    console.log(res.data)
                    const songKeys = JSON.parse(res.data)
                    const findIndex = songKeys.indexOf(keyword)
                    if (findIndex === -1) {
                        songKeys.unshift(keyword)
                    } else {
                        songKeys.splice(findIndex, 1)
                        songKeys.unshift(keyword)
                    }
                    // 最多10个纪录
                    songKeys.length > 10 && songKeys.pop()
                    uni.setStorage({
                        key: this.hisKeys,
                        data: JSON.stringify(songKeys)
                    })
                    this.oldKeywordList = songKeys // 更新历史搜索
                },
                fail: (e) => {
                    const songKeys = [keyword]
                    uni.setStorage({
                        key: this.hisKeys,
                        data: JSON.stringify(songKeys)
                    })
                    this.oldKeywordList = songKeys // 更新历史搜索
                }
            })
        }
    }
</script>

<style>
	.keyword-box {
		width: 100%;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10rpx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 98%;
		padding: 10rpx 1%;
		font-size: 27rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40rpx;
		height: 40rpx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword > view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60rpx;
		padding: 0 20rpx;
		margin: 10rpx 20rpx 10rpx 0;
		height: 60rpx;
		font-size: 28rpx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
