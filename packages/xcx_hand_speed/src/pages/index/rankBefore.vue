<template>
    <view :style="{backgroundImage: 'url('+ infoConfig.bg +')'}" class="full-width text-center padding-bottom-ten"
          style="background-repeat:no-repeat;background-size: 100vw 100vh;background-position:bottom left;padding: 30rpx">
        <view style="height: 96rpx;background: #F5F6FC;border-radius: 12px;border: 4px solid #36CCF1;margin-top: 40rpx;line-height: 84rpx" class="text-center">
            <open-data style="color: #333333;" class="text-20 text-bold" type="groupName" :open-gid="openGid == '' ? '未知' : openGid"></open-data>
        </view>
        <view style="height: 422rpx;background: #F5F6FC;border-radius: 12px;border: 4px solid #36CCF1;margin-top: 40rpx" class="text-center">
            <view class="flex justify-around">
                <view style="margin-top: 136rpx">
                    <view style="color: #FF5555" class="text-20 text-bold">{{ person.score == '' || person.score == undefined ? '未上榜' : person.score }}次</view>
                    <view class="text-14" style="margin-top: 28rpx">群内成绩</view>
                </view>
                <view style="margin-top: 40rpx">
                    <view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="border: 2px solid #FFFFFF;width: 132rpx;height: 132rpx"
                          :style="{backgroundImage: avatar == '' || avatar == undefined ? 'url('+ infoConfig.defaultAvatar +')' : 'url('+ avatar +')'}">
                        <view v-if="false" class="cu-tag badge">999</view>
                    </view>
                    <view style="margin-top: 24rpx;color: #333;" class="text-18">
                        {{name == '' || name == undefined ? '未知' : name}}
                    </view>
                </view>
                <view style="margin-top: 136rpx">
                    <view style="color: #FF5555" class="text-20 text-bold">{{ person.level == '' || person.level == undefined ? '999+' : person.level }}</view>
                    <view class="text-14" style="margin-top: 28rpx">群内排名</view>
                </view>
            </view>

            <view class="margin-top">
                <!--排行-->
                <button @click="goGame" class="fl" style="width: 43%;margin-left: 5%">
                    <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style=""
                             :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                             :shape="['square', 'circle'][0]" :src="infoConfig.jxqtz" bgColor="rgba(0, 0, 0, 1)">
                        <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                    </m-image>
                </button>
                <!--群挑战-->
                <button open-type="share" class="fr" style="width: 43%;margin-right: 5%">
                    <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" style=""
                             :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                             :shape="['square', 'circle'][0]" :src="infoConfig.fx" bgColor="rgba(0, 0, 0, 1)">
                        <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
                    </m-image>
                </button>
            </view>
        </view>

        <ad v-if="spgg" :unit-id="spgg" ad-type="video" ad-theme="white" style="margin-top: 28rpx"></ad>

        <view style="color: #D3D5DE;margin-top: 60rpx" class="text-18">
            共 <text style="color: #FF5555" class="text-22">{{infoConfig.sumPerson}}</text>人正在挑战
        </view>
        <view style="color: #D3D5DE;margin-top: 28rpx;" class="text-16">
            榜单将于每周一凌晨{{infoConfig.time}}重置
        </view>

        <view>
            <view style="position: relative;" class="margin-top">
                <view style="background-color: rgba(255, 252, 225, 1);width: 100%;position: absolute;top: 85rpx;border-radius: 20rpx">
                    <view class="" style="width: 72%;margin-left: 14%;height: 88rpx;line-height: 88rpx;margin-top: 120rpx">
                        <view @click="nationalRanking" class="border-radius" :class="[status ? 'activeStyle' : 'inActiveStyle']"
                              style="width: 100%;">群内排行</view>
                    </view>
                    <view class="cu-list menu" style="margin-top: 44rpx">
                        <view class="cu-item" style="background-color: rgba(255, 252, 225, 1)!important;border-bottom: 0px solid transparent!important;">
                            <view class="content">
                                <view>
                                    <view class="text-18 text-bold" style="color: #333333;width: 80rpx">{{ person.level == '' || person.level == undefined ? '999+' : person.level }}</view>
                                    <view class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"
                                          :style="{backgroundImage: person.avatar == '' || person.avatar == undefined ? 'url('+ avatar +')' : 'url('+ person.avatar +')'}">
                                        <view v-if="false" class="cu-tag badge">999</view>
                                    </view>
                                    <text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ person.nickName == '' || person.nickName == undefined ? name : person.nickName }}</text>
                                </view>
                            </view>
                            <view v-if="true" class="action">
                                <text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ person.score == '' || person.score == undefined ? '未上榜' : person.score }}</text>
                            </view>
                        </view>
                    </view>
                    <view style="height: 8rpx;background: #FEE5CE;width: 94%;margin: 16rpx 0 16rpx 3%"></view>
                    <view>
                        <view class="cu-list menu" :class="[false ? 'card-menu' : '']">
                            <view v-for="(item, index) in rankLists" :key="index" class="cu-item" style="border-bottom: 0px solid transparent!important;background-color: rgba(255, 252, 225, 1)!important;">
                                <view class="content">
                                    <view>
                                        <view class="text-18 text-bold" style="color: #333333;width: 80rpx">{{item.level == '' || item.level == undefined ? '999+' : item.level}}</view>
                                        <view v-if="item.avatar == '' || item.avatar == undefined" class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"
                                              :style="{backgroundImage: 'url('+ infoConfig.defaultAvatar +')'}">
                                            <view v-if="false" class="cu-tag badge">999</view>
                                        </view>
                                        <view v-else class="cu-avatar" :class="[false ? 'radius' : 'round']" style="width: 80rpx;height: 80rpx;margin-left: 15rpx"
                                              :style="{backgroundImage: 'url('+ item.avatar +')'}">
                                            <view v-if="false" class="cu-tag badge">999</view>
                                        </view>
                                        <text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.nickName == '' || item.nickName == undefined ? name : item.nickName }}</text>
                                    </view>
                                </view>
                                <view v-if="true" class="action">
                                    <text style="margin-left: 40rpx;color: #772E01;" class="text-16 text-bold">{{ item.score == '' || item.score == undefined ? '0' : item.score }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view style="height: 30rpx;padding: 60rpx 0;width: 100%;background-color: rgb(0, 15, 84);color: #D3D5DE;;position: absolute;line-height: 0rpx">
                        榜单仅显示前100名
                    </view>

                </view>

            </view>

        </view>

        <view>
            <m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)"
                     :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"
                     :shape="['square', 'circle'][0]" :src="infoConfig.rankImg" bgColor="rgba(0, 0, 0, 1)">
                <view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>
            </m-image>
        </view>



    </view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import {
    commonGet,
    commonPost
} from '@/api'
import { State } from 'vuex-class'
@Component({})
export default class extends Vue {
    @State('name', { namespace: 'center' }) name
    @State('avatar', { namespace: 'center' }) avatar
    @State('score', { namespace: 'center' }) score
    @State('level', { namespace: 'center' }) level
    @State('spgg', { namespace: 'root' }) spgg
    @State('ptgg', { namespace: 'root' }) ptgg
    @State('openGid', { namespace: 'center' }) openGid

    onShow () {
        this.getTrueUserInfo()
    }

    status: boolean = true
    person: any = {}
    infoConfig: any = {
        fx: '/static/images/fx.png',
        jxqtz: '/static/images/jxqtz.png',

        bg: '/static/images/bg.png',
        clickSrc: '/static/images/click_me@2x.png',
        clickSrcTwo: '/static/images/click_me2.png',
        againSrc: '/static/images/zailai@2x.png',
        startChallenge: '/static/images/kaishi@2x.png',
        rankImg: '/static/images/paihang@2x.png',
        defaultAvatar: 'https://e-static.oss-cn-shanghai.aliyuncs.com/img/wfd/touxiang@2x.png',
        rank: '未上榜',
        sumPerson: this.$mio.mioRoot.randomNum(100000, 30),
        time: '3:00',
        captureImg: '/static/images/capture.png',
    }

    async getTrueUserInfo () {
        const { data, code } = await commonGet('/api/user/user_info', false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
        if (code == 200) {
            this.$store.state.center.score = data.score
            this.$store.state.center.name = data.nickname
            this.$store.state.center.avatar = data.avatar
            this.$store.state.center.level = data.level
        }
    }

    rankLists: any = []

    // async created () {
    //     // #ifdef H5
    //     // @ts-ignore
    //     // const { data } = await commonGet('/mytest/articles?page=2&limit=50')
    //     // #endif
    //
    //
    // }

    async onShow () {
        // #ifdef MP-WEIXIN
        const { data } = await commonPost('/api/user_achievement/group_top', { openGid: this.$store.state.center.openGid }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
        // const { data } = await commonPost('/api/user_achievement/group_top', { openGid: 'GBfQr48D1dQF4o80zSxpX_-98G94' }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
        // #endif
        this.rankLists = data.list
        this.person = data.mine
    }

    goGame () {
        this.$mio.mioRoot.push('/pages/index/playGame')
    }

    async nationalRanking () {
        if (!this.status) {
            this.$mio.mioRoot.showLoading('正在加载')
            this.status = !this.status
            // this.rankLists = []
            const { data } = await commonPost('/api/user_achievement/group_top', { openGid: this.$store.state.center.openGid }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
            uni.hideLoading()
            this.rankLists = data.list
            const personIndex = this.rankLists.findIndex(item => {
                return item.nickName == this.$store.state.center.name
            })
            console.log(personIndex)
            this.person = this.rankLists[personIndex]
        }
    }

    async friendsRanking () {
        if (this.status) {
            this.$mio.mioRoot.showLoading('正在加载')
            this.status = !this.status
            // this.rankLists = []
            const { data } = await commonPost('/api/user_achievement/top', { type: 2 }, false, { 'AUTH-TOKEN': this.$store.state.center.open_id })
            uni.hideLoading()
            this.rankLists = data.list == undefined ? [] : data.list
            this.person = data.mine
        }
    }
}
</script>

<style>
page {
    background-color: rgba(0, 15, 84, 1);
}

.cu-list:last-child {
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx
}

.activeStyle{
    font-weight: bolder;
    font-size: 18px;
    background: #FFDB18;
    color: #772E01;
}
.inActiveStyle{
    font-weight: bolder;
    font-size: 18px;
    background-color: rgba(255, 255, 255, 0.9);
    color: #772E01;
}

button {
    border: 0 !important;padding: 0!important;background-color: rgba(241, 241, 241, 1)!important;line-height: 0!important;
}
button:after {
    border: 0 !important;padding: 0!important;
}
</style>
