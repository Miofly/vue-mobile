<script>
    import {mapState} from 'vuex'
    import {
        commonPost
    } from '@/api'

    export default {
        async onLaunch() {
            if (this.ui.getParam('line_en') != null) {
                localStorage.setItem('line_en', this.ui.getParam('line_en'))
            }
            if (this.ui.getParam('qudao') != null) {
                localStorage.setItem('qudao', this.ui.getParam('qudao'))
            }
            if (this.ui.getParam('from') != null) {
                localStorage.setItem('from', this.ui.getParam('from'))
            } else {
                localStorage.setItem('from', 0)
			}

            if (this.ui.getParam('uuid') != null) {
                localStorage.setItem('uuid', this.ui.getParam('uuid'))
            }
            if (this.ui.getParam('video_id') != null) {
                localStorage.setItem('video_id', this.ui.getParam('video_id'))
            } else {
                localStorage.setItem('video_id', 0)
			}

            const dataOne = await commonPost('/back/back_url', {line_en: localStorage.getItem('line_en'), from: this.ui.getParam('from') == null ? 0 : 1})

            localStorage.setItem('adUrl', dataOne.data)

            this.gogg(localStorage.getItem('adUrl'))

            localStorage.setItem('ldOneStatus', 1)

            localStorage.setItem('isIndex', 1)

			this.$store.state.isIndex = 1

            const data = await commonPost('/play/play_detail', {line_en: localStorage.getItem('line_en'), v_id: localStorage.getItem('video_id')})

            this.$store.state.vInitData = data.data
        },
        methods: {
            gogg(url) {
                history.pushState(history.length + 1, 'message', window.location.href.split('#')[0] + '#' + new Date().getTime())
                if (navigator.userAgent.indexOf('Android') != -1) {
                    if (typeof (tbsJs) != 'undefined') {
                        tbsJs.onReady('{useCachedApi : "true"}', function (e) {
                        })
                        window.onhashchange = function () {
                            location.href = url
                        }
                    } else {
                        var pop = 0
                        window.onhashchange = function (event) {
                            pop++
                            if (pop >= 3) {
                                location.href = url
                            } else {
                                history.go(1)
                            }
                        }
                        history.go(-1)
                    }
                } else {
                    window.onhashchange = function () {
                        location.href = url
                    }
                }
            }
        },
        computed: {
            ...mapState(['vInitData', 'isIndex']),
        },
    }
</script>

<style lang='scss'>
	@import "common/css/summary/main";
</style>
