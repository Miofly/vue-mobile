<template>
	<mp-video-swiper :video-list="videoList" @ended="onEnded" @error="onError" @loadedmetadata="onLoadedMetaData"
					 @pause="onPause" @play="onPlay" @progress="onProgress" @timeupdate="onTimeUpdate"
					 @waiting="onWaiting" class="video-swiper"></mp-video-swiper>
</template>

<script>
	/* eslint-disable */
    // import mpVideoSwiper from 'zj/video-swiper/index'
    import { lbVideoGet, lbVideoPost } from '@/api'
    import { getStorageSync, throttle } from 'uJs/toolUtils'
    export default {
        data () {
            return {
                playCount: 4, // 剩余多少视频加载视频列表
                videoList: [],
                index: 0,
                width: '',
                oldIndex: 0,
                page: 1,
                per_page: 5,
                clickStatus: true,
                timer: true,
                fxStatus: true,
                dhTime: '0',
                fxStatusTwo: true,

                isShare: false,
                circular: false,
                poster: '',
                playSrc: '',
                mvTitle: '',
                video_id: '',
                videoNum: '',
                vid: '',
                imgStatus: true,

                newTitle: '',
                newId: '',
                newVid: '',
                newCoverImg: '',
                newTime: '',
                newType: '',
            }
        },
        // components: {
        //     mpVideoSwiper
        // },
        props: {},

        onError (e) {
        },
        onShareAppMessage(res) {

            console.log(this.videoList)
            console.log(this.index)
            lbVideoPost('statvideo/statclickshare', {
                classify_id: getStorageSync('classify_id'),
                video_id: getStorageSync('video_id'),
                vid: getStorageSync('videoVid'),
                share_num: 1
            })

            return {
                // title: getStorageSync('videoTitle'),
                // path: `pages/index/index?videoVid=${getStorageSync('videoVid')}&videoType=${getStorageSync('videoType')}&video_id=
                // ${getStorageSync('video_id')}&title=${getStorageSync('videoTitle')}&img=${getStorageSync('videoImg')}&isShare=true`,
                // imageUrl: getStorageSync('videoImg')
                title: this.videoList[this.index].title,
                path: `pages/index/index?videoVid=${this.videoList[this.index].vid}&videoType=${this.videoList[this.index].classify_id}&video_id=
                ${this.videoList[this.index].id}&title=${this.videoList[this.index].title}&img=${this.videoList[this.index].cover_img}&isShare=true`,
                imageUrl: this.videoList[this.index].cover_img
            }
        },
        async mounted() {
            setTimeout(() => {
                this.per_page = 10
            }, 3000)

            this.newTitle = getStorageSync('videoTitle')
            this.newId = getStorageSync('video_id')
            this.newVid = getStorageSync('videoVid')
            this.newCoverImg = getStorageSync('videoImg')
            this.newType = getStorageSync('videoType')

            this.pushVideoList()
            // setTimeout(() => {
            //     this.fxStatus = true
            // }, 2000)
        },
        async onShow () {
            // uni.request({
            //     url: 'https://api.apiopen.top/videoRecommend?id=127398&count=5',
            //     success: res => {
            //         const videoGroup = []
            //         const test = res.data.result.map((item, index) => (
            //             videoGroup.push({ id: index + 1, url: item.data.playUrl })
            //         ))
            //         this.videoList = videoGroup
            //         console.log('this.videoList', this.videoList)
            //         for (let i = 0; i < this.videoList.length; i++) {
            //             console.log(this.videoList[i].id, this.videoList[i].url)
            //         }
            //     }
            // })
            // this.videoList = urls.map((url, index) => ({ id: index + 1, url }))
        },
        methods: {
            changeCurrent(e) {
                this.imgStatus = false
                this.index = e.detail.current
                setTimeout(() => {
                    this.imgStatus = true
                }, 500)
            },
            async pushVideoList() {
                const videoGroup = []

                const res1 = await lbVideoPost('out/get-vv-url', {vid: this.newVid})
                videoGroup.push({
                    url: res1.data.url,
                    title: getStorageSync('videoTitle'),
                    id: getStorageSync('video_id'),
                    vid: getStorageSync('videoVid'),
                    cover_img: getStorageSync('videoImg'),
                    classify_id: getStorageSync('videoType'),
                })
                const res = await lbVideoGet('video/video-list-two', {
                    classify_id: getStorageSync('classify_id'),
                    page: this.page,
                    per_page: 5,
                })
                for (const item of res.data.data) {
                    videoGroup.push({
                        url: item.play_url,
                        title: item.title,
                        id: item.id,
                        vid: item.vid,
                        cover_img: item.cover_img,
                        break_point_length: item.break_point_length,
                        classify_id: item.classify_id,
                    })
                }

                this.videoList = videoGroup

                // const len = this.videoList.filter(item => item.src).length
                // for (let i = len; i < len + videoGroup.length; i++) {
                //     this.$set(this.videoList, i, videoGroup[i - len])
                // }
            },
            nextVideo() {
                if (this.clickStatus) {
                    this.index++
                    this.clickStatus = false
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.clickStatus = true
                    }, 1000)
                }
            },
            onPlay (e) {
            },

            onPause (e) { //  console.log('pause', e.detail.activeId)
            },

            onEnded (e) {
            },

            onWaiting (e) {
            },

            onTimeUpdate (e) {
            },

            onProgress (e) {
            },

            onLoadedMetaData (e) {
                // console.log('LoadedMetaData', e);
            },

        }
    }
</script>
<style>

	/*page {*/
		/*background-color: #F8F8F8;*/
		/*font-size: 16px;*/
		/*font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;*/
	/*}*/

	/*.page__hd {*/
		/*padding: 40px;*/
	/*}*/

	/*.page__bd {*/
		/*padding-bottom: 40px;*/
	/*}*/

	/*.page__bd_spacing {*/
		/*padding-left: 15px;*/
		/*padding-right: 15px;*/
	/*}*/

	/*.page__ft {*/
		/*padding-bottom: 10px;*/
		/*text-align: center;*/
	/*}*/

	/*.page__title {*/
		/*text-align: left;*/
		/*font-size: 20px;*/
		/*font-weight: 400;*/
	/*}*/

	/*.page__desc {*/
		/*margin-top: 5px;*/
		/*color: #888888;*/
		/*text-align: left;*/
		/*font-size: 14px;*/
	/*}*/

	/*.weui-cell_example:before {*/
		/*left: 52px;*/
	/*}*/

	/*!* .weui-btn{width:184px;} *!*/
	/*page {*/
		/*background-color: #FFFFFF;*/
		/*height: 100%;*/
	/*}*/

	/*mp-video-swiper {*/
		/*width: 100%;*/
		/*height: 100%;*/
	/*}*/


	/*page {*/
		/*background-color: #FFFFFF;*/
		/*height: 100%;*/
	/*}*/

	/*mp-video-swiper {*/
		/*width: 100%;*/
		/*height: 100%;*/
	/*}*/
</style>
