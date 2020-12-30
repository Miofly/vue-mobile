<script>
/* eslint-disable */
import {commonPost} from "@/api";

export default {
    onLaunch(e) {
        // #ifdef MP-WEIXIN
        this.autoUpdate() // 检查小程序是否更新
        // #endif
    },
    async onShow(e) {
        // #ifdef MP-WEIXIN
        this.share() // 定义微信小程序全局分享
        // #endif
        console.log(e, 'onShow：应用页面显示')
        if (this.$mio.mioRoot.getStorageSync('last_date') == new Date().toLocaleDateString()) {
            // console.log('不重置次数')
            console.log('重置次数')
            this.$mio.mioRoot.setStorage('last_date', new Date().toLocaleDateString())
            this.$mio.mioRoot.setStorage('chance_num', 3)
        } else {
            console.log('重置次数')
            this.$mio.mioRoot.setStorage('last_date', new Date().toLocaleDateString())
            this.$mio.mioRoot.setStorage('chance_num', 3)
        }
        if (e.shareTicket!=undefined) {
            this.$store.state.center.type = 3
            wx.login({
                success: async (res) => {
                    if (res.code) {
                        const {data} = await commonPost('/mina/wx_auth/login', {code: res.code})
                        console.log('登陆成功', data)
                        this.$mio.mioRoot.setStorage('hand_open_id', data.openid)
                        this.$mio.mioRoot.setStorage('hand_session_key', data.session_key)
                        wx.getShareInfo({
                            shareTicket: e.shareTicket,
                            success: async res => {
                                const dataGroup = await commonPost('/mina/wx_auth/decrypt_data',
                                    {encryptedData: res.encryptedData, iv: res.iv, sessionKey: data.session_key, type: 1})
                                console.log('解密后 openGid: ', dataGroup.data.openGid)
                                this.$store.state.center.openGid = dataGroup.data.openGid
                            },
                            fail: err => {
                                console.log(err, '获取信息失败')
                            }
                        })

                    } else {
                        console.log(`登录失败！${res.errMsg}`)
                    }
                }
            })
            return
        }
        if (e.query.open_id!=undefined) {
            console.log('进入好友分享', e.query.open_id)
            this.$store.state.center.type = 2
            wx.login({
                success: async (res) => {
                    if (res.code) {
                        const {data} = await commonPost('/mina/wx_auth/login', {code: res.code})
                        console.log('登陆成功', data)
                        this.$mio.mioRoot.setStorage('hand_open_id', data.openid)
                        this.$mio.mioRoot.setStorage('hand_session_key', data.session_key)
                        const dataGroup = await commonPost('/api/user/bind_friend', {openId: e.query.open_id}, { 'AUTH-TOKEN': data.openid })
                    } else {
                        console.log(`登录失败！${res.errMsg}`)
                    }
                }
            })
            this.$store.state.center.firend_openId = e.query.open_id
        } else {
            console.log('未进入好友分享')
            this.$store.state.center.type = 1
        }

    },
    onHide() {
        console.log('onHide：应用页面隐藏')
    },
    methods: {
        // #ifdef MP-WEIXIN
        autoUpdate: function () { // 自动更新
            var self = this
            // 获取小程序更新机制兼容
            if (wx.canIUse('getUpdateManager')) {
                const updateManager = wx.getUpdateManager()
                // 1. 检查小程序是否有新版本发布
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    if (res.hasUpdate) {
                        // 检测到新版本，需要更新，给出提示
                        wx.showModal({
                            title: '更新提示',
                            content: '检测到新版本，是否下载新版本并重启小程序？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 2. 用户确定下载更新小程序，小程序下载及更新静默进行
                                    self.downLoadAndUpdate(updateManager)
                                } else if (res.cancel) {
                                    // 用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                                    wx.showModal({
                                        title: '温馨提示~',
                                        content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                                        showCancel: false, // 隐藏取消按钮
                                        confirmText: '确定更新', // 只保留确定更新按钮
                                        success: function (res) {
                                            if (res.confirm) {
                                                // 下载新版本，并重新应用
                                                self.downLoadAndUpdate(updateManager)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            } else {
                // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })
            }
        },
        downLoadAndUpdate: function (updateManager) { // 下载小程序新版本并重启应用
            var self = this
            wx.showLoading()
            // 静默下载更新小程序新版本
            updateManager.onUpdateReady(function () {
                wx.hideLoading()
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
            })
            updateManager.onUpdateFailed(function () {
                // 新的版本下载失败
                wx.showModal({
                    title: '已经有新版本了哟~',
                    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                })
            })
        },
        share() { // 全局分享
            const that = this
            wx.onAppRoute(res => {
                const pages = getCurrentPages()
                const view = pages[pages.length - 1]
                console.log()
                wx.showShareMenu({
                    withShareTicket: true
                });
                if (view.route == 'pages/index/groupChallenge') {
                    view.onShareAppMessage = function (res) {
                        console.log(res)
                        return {
                            title: that.$mio.mioRoot.makeRandomArr(['我，10秒98次，将成为群内手速王，谁来应战？', '10秒98次，不好意思，手速快就是可以为所欲为！', '@群主，不服来战', '@所有人，在座的各位都是垃圾'], 1)[0],
                            path: `pages/index/index?open_id=${that.$store.state.center.open_id}`,
                            imageUrl: that.$mio.mioRoot.makeRandomArr(['/static/images/share1.png', '/static/images/share2.png', '/static/images/share3.png'], 1)[0],
                        }
                    }
                } else {
                    view.onShareAppMessage = function (res) {
                        console.log(res)
                        return {
                            title: that.$mio.mioRoot.makeRandomArr(['在这里，做王者只要10秒！', '10秒98次，不好意思，手速快就是可以为所欲为！', '不服来战！', '有胆就来挑战！', '真男人就来挑战！'], 1)[0],
                            path: `pages/index/index?open_id=${that.$store.state.center.open_id}`,
                            imageUrl: that.$mio.mioRoot.makeRandomArr(['/static/images/share1.png', '/static/images/share2.png', '/static/images/share3.png'], 1)[0],
                        }
                    }
                }

            })
        }
        // #endif
    },
}
</script>

<style lang='scss'>
@import "../../modules/styles/main";
@import "../../modules/styles/plugin/font-awesome.css";
</style>
