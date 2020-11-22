<template>
	<view class="bg-white padding">
		<!--顶部消息-->
		<messTip ref="toast" v-if="index==0"></messTip>
		<!--居中消息-->
		<messTip position="center" ref="toast" v-if="index==1"></messTip>
		<!--底部消息-->
		<messTip position="bottom" ref="toast" v-if="index==2"></messTip>

		<view class="mio-subsection">
			<view :class="[index==0?'mio-active':'']" @tap="switchTabs" data-index="0">顶部提示</view>
			<view :class="[index==1?'mio-active':'']" @tap="switchTabs" data-index="1">居中提示</view>
			<view :class="[index==2?'mio-active':'']" @tap="switchTabs" data-index="2">底部提示</view>
		</view>

		<view class="flex flex-direction">
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="0">一般提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="1">成功提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="2">警告提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="3">错误提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="4">其他提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="5">长文字消息提示</button>
			<button @tap="showTips" class="cu-btn line-black margin-top round" data-index="6">自定义时间消息提示</button>
		</view>

	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class messTip extends Vue {
        basicData: any = [
            {
                type: 'translucent',
                msg: '一般消息提示~'
            }, {
                type: 'green',
                msg: '成功消息提示~'
            }, {
                type: 'warning',
                msg: '警告消息提示~'
            }, {
                type: 'danger',
                msg: '错误消息提示~'
            }, {
                type: 'primary',
                msg: '其他消息提示~'
            }, {
                type: 'primary',
                msg: '长文字消息提示，看不完信息？可自定义设置显示时间，建议提示信息不要过长'
            }, {
                type: 'translucent',
                msg: '4S后关闭提示框',
                duration: 4000
            }
        ]

        index: number = 0

        showTips (e) {
            const { index } = e.currentTarget.dataset
            const options = {
                msg: this.basicData[index].msg,
                duration: this.basicData[index].duration || 2000,
                type: this.basicData[index].type
            }
            ;(this.$refs.toast as any).showTips(options)
            // this.$refs.toast.showTips(options) // eslint-disable-line
        }

        switchTabs (e) {
            this.index = e.currentTarget.dataset.index
        }
    }
</script>

<style>
	.mio-subsection {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20rpx 0 80rpx 0;
		border-radius: 10rpx;
		overflow: hidden;
		border: 0;
		position: relative;
	}

	.mio-subsection::after {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		border: 1px solid #5677fc;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 20rpx;
		z-index: -1;
	}

	.mio-subsection view {
		flex: 1;
		font-size: 28rpx;
		text-align: center;
		padding: 10rpx 30rpx;
		color: #5677fc;
		position: relative;
	}

	.mio-subsection view::after {
		content: "";
		position: absolute;
		height: 100%;
		width: 1px;
		border-right: 1px solid #5677fc;
		-webkit-transform-origin: 100% 0;
		transform-origin: 100% 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
		right: 0;
		top: 0;
	}

	.mio-subsection view:last-child::after {
		border-right: 0;
	}

	.mio-subsection view.mio-active {
		background: #5677fc;
		color: #fff;
	}
</style>
