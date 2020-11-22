<template>
	<view class="bg-white ">

		<view class="flex flex-direction padding">
            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
            		  :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
            		  :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
            		  @tap="change(1)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
            	<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                左侧悬浮
            </m-button>

            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
                      :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
                      :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
                      @tap="change(2)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
                <view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                右侧悬浮
            </m-button>

            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
                      :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
                      :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
                      @tap="change(3)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
                <view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                设置默认按钮背景颜色
            </m-button>

            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
                      :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
                      :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
                      @tap="change(4)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
                <view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                无拓展按钮
            </m-button>

            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
                      :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
                      :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
                      @tap="change(5)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
                <view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                设置拓展按钮
            </m-button>

            <m-button :hairLine="true" :loading="false" :plain="false" :ripple="true" :disabled="false"
                      :shape="['square', 'circle'][1]" :size="['default', 'medium', 'mini'][1]"
                      :type="['default', 'primary', 'error', 'warning', 'success'][1]" style=""
                      @tap="change(6)" class="text-white margin-top-xxl" :customStyle="{fontSize: '14px'}">
                <view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
                拓展按钮无图标展示
            </m-button>
		</view>

		<fab :bgColor="bgColor" :bottom="bottom" :btnList="btnList" :left="left" :right="right" @click="onClick"></fab>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class fabIndex extends Vue {
        left: number = 0
        right: number = 80
        bottom: number = 100
        bgColor: string = '#5677fc'
        btnList: any = []
        list: any = [
{
            bgColor: '#16C2C2',
            // 图标/图片地址
            imgUrl: '/static/images/fab/fab_about.png',
            // 图片高度 rpx
            imgHeight: 64,
            // 图片宽度 rpx
            imgWidth: 64,
            // 名称
            text: '关于',
            // 字体大小
            fontSize: 34,
            // 字体颜色
            color: '#fff'
        }, {
            bgColor: '#64B532',
            // 图标/图片地址
            imgUrl: '/static/images/fab/fab_share.png',
            // 图片高度 rpx
            imgHeight: 64,
            // 图片宽度 rpx
            imgWidth: 64,
            // 名称
            text: '分享',
            // 字体大小
            fontSize: 34,
            // 字体颜色
            color: '#fff'
        }, {
            bgColor: '#FFA000',
            // 图标/图片地址
            imgUrl: '/static/images/fab/fab_reward.png',
            // 图片高度 rpx
            imgHeight: 64,
            // 图片宽度 rpx
            imgWidth: 64,
            // 名称
            text: '赞赏',
            // 字体大小
            fontSize: 34,
            // 字体颜色
            color: '#fff'
        }
]

        list2: any = [
{
            bgColor: '#16C2C2',
            // 名称
            text: '关于',
            // 字体大小
            fontSize: 28,
            // 字体颜色
            color: '#fff'
        }, {
            bgColor: '#64B532',
            // 名称
            text: '分享',
            // 字体大小
            fontSize: 28,
            // 字体颜色
            color: '#fff'
        }, {
            bgColor: '#FFA000',
            // 名称
            text: '赞赏',
            // 字体大小
            fontSize: 28,
            // 字体颜色
            color: '#fff'
        }
]

        onLoad () {
            this.btnList = [...this.list]
        }

        change (type) {
            switch (type) {
                case 1:
                    this.left = 80
                    this.right = 0
                    break
                case 2:
                    this.left = 0
                    this.right = 80
                    break
                case 3:
                    this.bgColor = '#FF0000'
                    break
                case 4:
                    this.btnList = []
                    break
                case 5:
                    this.btnList = [...this.list]
                    break
                case 6:
                    this.btnList = [...this.list2]
                    break
                default:
                    break
            }
            this.$mio.mioRoot.showToast('切换成功，点击查看效果')
        }

        onClick (e) {
            const { index } = e

            switch (index) {
                case -1:
                    this.$mio.mioRoot.showToast('您点击了悬浮按钮')
                    break
                case 0:
                    this.$mio.mioRoot.showToast('点击了关于')
                    break
                case 1:
                    this.$mio.mioRoot.copyText('复制了文字')
                    break
                case 2:
                    this.$mio.mioRoot.showToast('点击了赞赏')
                    break
                default:
                    break
            }
        }
    }
</script>
