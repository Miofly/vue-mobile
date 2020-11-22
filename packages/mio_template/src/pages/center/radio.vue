<template>
	<view class="u-demo">
		<radio-group @change="radioChange" style="text-align: center;display: inline-block;margin-top: 10rpx">
			<label :key="item.value" style="display: inline-block;margin-left: 30rpx"
				   v-for="(item, index) in items">
				<radio :checked="index === current" :value="item.value" class="text-blue" />
				<view>{{item.name}}</view>
			</label>
		</radio-group>
	</view>
</template>

<script lang="ts">
 	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

 	@Component({})
 	export default class test extends Vue {
        current:number = 0
        items: any = [
			{ name: '111', value: '1' },
			{ name: '222', value: '2' },
			{ name: '333', value: '3' }
		]

        radioChange (e) {
         	console.log(e.detail.value)
        }
 	}
</script>

<style scoped lang="scss">
</style>
