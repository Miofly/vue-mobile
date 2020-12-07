<template>
	<view>
		<text>{{ num }}</text>
		<view @click="sbw" class="flex justify-center align-center" style="height: 400rpx;width: 100%;background-color: black">
<!--			<m-image duration="0" :showLoading="false" :borderRadius="10" bgColorError="rgba(0, 0, 0, 1)" height="300" width="300"-->
<!--					:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][3]"-->
<!--					:shape="['square', 'circle'][0]" src="https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg" bgColor="rgba(0, 0, 0, 1)">-->
<!--				<view slot="error" style="font-size: 24rpx;" class="text-white">加载失败</view>-->
<!--			</m-image>-->
<!--			<view class="c-ripple js-ripple" :class="[waterRippleStatus? 'is-active' : '']">-->
			<view class="c-ripple js-ripple" :class="[waterRippleStatus? 'is-active' : '', waterRippleStatusTwo? 'is-active1' : '']">
				<view class="c-ripple__circle"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
	num: number = 0
	millisecondTimer: any = null
	waterRippleStatus: boolean = false
	waterRippleStatusTwo: boolean = false


	addNum () {
		this.num += 1
	}

	sbw (e) {
		this.num++
		console.log(this.num)
		if (this.num % 2 == 0) {
			this.waterRippleStatus = true
			this.waterRippleStatusTwo = false

			// if (this.waterRippleStatus) {
				// this.waterRippleStatus = false
			// }

		} else {
			this.waterRippleStatusTwo = true
			this.waterRippleStatus = false
			// this.waterRippleStatusTwo = !this.waterRippleStatusTwo
		}
	}
}
</script>

<style>
.c-ripple {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: transparent;
	border-radius: 6px;
}

.c-ripple__circle {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	opacity: 0;
	width: 0;
	height: 0;
	border-radius: 50%;
	background: rgba(255, 0, 0, 0.3);
}
.is-active .c-ripple__circle {
	animation: a-ripple 0.5s ease-in;
}
.is-active1 .c-ripple__circle {
	animation: a-ripple 0.5s ease-in;
}
@keyframes a-ripple {
	0% {
		opacity: 0;
	}
	25% {
		opacity: 1;
	}
	100% {
		width: 200%;
		padding-bottom: 200%;
		opacity: 0;
	}
}
</style>
