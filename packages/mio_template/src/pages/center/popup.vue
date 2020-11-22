<template>
	<view>
		<m-popup border-radius="10" v-model="show"
				 :mode="mode"
				 length="50%" :mask="true"
				 :closeable="true"
				 :close-icon-pos="['top-left', 'top-right', 'bottom-left', 'bottom-right'][1]">
			<view v-if="mode == 'center'" style="height: 400rpx">
				<view class="close-btn">
					<m-button @click="show = false" size="medium">关闭弹窗中间</m-button>
				</view>
			</view>
			<view class="close-btn" v-if="mode != 'center'">
				<m-button size="medium" @click="show = false">关闭弹窗非中间</m-button>
			</view>
		</m-popup>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        show: boolean = true
        mode: string = ['center', 'top', 'bottom', 'left', 'right'][1]
    }
</script>


<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}

	.close-btn {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
