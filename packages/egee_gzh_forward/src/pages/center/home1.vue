<template>
	<view>
		<lottie :height="70" :options="defaultOptions" :width="70" @animCreated="handleAnimation" />

	</view>
</template>

<script>
import * as animationData from 'test.json' // 引入data.json
animationData.assets.forEach((item) => {
	item.u = ''
	if (item.w && item.h) {
		item.p = require(`@/assets/images/robot/images/${item.p}`)
	}
}) // 获取静态资源
export default {
	name: 'RobotLottie',
	data () {
		return {
			defaultOptions: { animationData: animationData.default }, // 动画数据：注意是 .default
		}
	},
	props: [],
	computed: {},
	methods: {
		handleAnimation (anim) {
			this.anim = anim
		},

		mounted () {}
	}
}
</script>

<style lang="scss" scoped>
.robot-lottie {
}
</style>
