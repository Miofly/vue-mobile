<template>
	<view class="">
		<navbar title="这是标题" backText="" :backIcon="true" @pBack="$mio.mioRoot.back"
		        :iconTextStyle="{ color: 'white', fontSize: '30px' }"
				:titleTextStyle="{ color: 'white', fontSize: '18px' }"
				:backTextStyle="{ color: 'white', fontSize: '16px' }"
				:background="{ background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }">
		</navbar>

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
