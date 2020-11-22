<template>
	<view class="u-demo">
		<m-mask :duration="300" :show="show" :zoom="zoom" @click="test">
			<view class="warp" v-if="content">
				<view @tap.stop class="rect"></view>
			</view>
		</m-mask>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        show: boolean = true
        zoom: boolean = true
        duration: number = 300
        content: boolean = true

		test (val): void {
            this.show = false
		}
    }
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
</style>
