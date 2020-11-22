<template>
	<view class="center">
		<m-image :shape="['square', 'circle'][0]" width="300" :borderRadius="10"
				 height="300" src="https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la/images/glnz/1.jpg"
				 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][2]">
			<view slot="error" style="font-size: 24rpx;">加载失败</view>
		</m-image>
	</view>

</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class test extends Vue {

	}
</script>
