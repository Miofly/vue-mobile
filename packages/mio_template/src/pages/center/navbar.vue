<template>
	<view class="">
		<m-navbar title="这是标题" backText="" :backIcon="true" @pBack="$mio.mioRoot.back"
		        :iconTextStyle="{ color: 'black', fontSize: '30px' }"
				:titleTextStyle="{ color: 'black', fontSize: '18px' }"
				:backTextStyle="{ color: 'black', fontSize: '16px' }"
				:background="{ background: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%) !important' }">
			<view slot="right" v-if="false">
				<view class="fa fa-bars margin-right" style="padding-right: 30rpx;font-size: 16px"></view>
			</view>
		</m-navbar>

		<view v-for="(item, index) in 111" :key="index">
			<view>{{item}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class test extends Vue {
        back (): void {
        	console.log('返回事件')
        }
	}
</script>
