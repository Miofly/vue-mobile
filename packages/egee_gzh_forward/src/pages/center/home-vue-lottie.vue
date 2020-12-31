<template>
	<view>
		<lottie :height="200" :options="defaultOptions" :width="200" @animCreated="handleAnimation" />

	</view>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import lottie from 'vue-lottie'
import Anim from './test.json'

@Component({
	components: {
		lottie
	},
})
export default class home extends Vue {
	defaultOptions: any = {
		animationData: Anim, // 要使用的json数据
		render: 'svg', // 要渲染的形式
		loop: true, // 是否重复
		autoplay: true // 是否自动启动
	}

	animationSpeed: any = 1
	anim: any = {}

	handleAnimation (anim) {
		this.anim = anim
		console.log(anim) // 这里可以看到 lottie 对象的全部属性
	}
}
</script>
