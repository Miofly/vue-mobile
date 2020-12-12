<template>
	<div ref="lavContainer" :style="style"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import lottie from 'lottie-web'

@Component({})
export default class extends Vue {
	@Prop({ default: 0, type: Number }) height?: number //
	@Prop({ default: 0, type: Number }) width?: number //
	@Prop({ default: 1, type: Number }) speed?: number //
	@Prop({ default: 1, type: Number }) direction?: number //
	@Prop({ default: true, type: Boolean }) loop?: number //
	@Prop({ default: true, type: Boolean }) autoplay?: number //
	@Prop({ default: '', type: String }) path?: string //

	style: any = {
		width: this.width ? `${this.width}px` : '100%',
		height: this.height ? `${this.height}px` : '100%',
		overflow: 'hidden',
		margin: '0 auto'
	}

	anim: any = {}

	mounted () {
		this.anim = lottie.loadAnimation({
			container: this.$refs.lavContainer,
			renderer: 'svg',
			loop: this.loop !== false,
			path: this.path,
			autoplay: this.autoplay !== false,
			rendererSettings: ['svg', 'canvas', 'html'][0]
		})
		this.onSpeedChange()
		this.onDirectionChange()
	}

	stop () {
		return this.anim.stop()
	}

	play () {
		this.anim.play()
	}

	pause () {
		this.anim.pause()
	}

	onSpeedChange () {
		this.anim.setSpeed(this.speed)
	}

	onDirectionChange () {
		this.anim.setDirection(this.direction)
	}
}
</script>
