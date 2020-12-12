<template>
	<view>
		<m-lottie :width="200" :height="200" path="https://assets8.lottiefiles.com/packages/lf20_detcd4yr/data.json" :speed="1" :direction="[1, -1][0]" ref="lottie" />
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class home extends Vue {

}
</script>
