<template>
	<view class="full-height">
		<modalOne v-if="pageCur==footabs[0].type"></modalOne>
		<modalCenter v-if="pageCur==footabs[1].type"></modalCenter>
		<modalTwo v-if="pageCur==footabs[2].type"></modalTwo>

		<view class="cu-bar tabbar bg-white foot">
			<view @tap="navChange(index)" class="action" :data-cur="item.type" v-for="(item, index) in footabs" :key="index">
				<view class="fa-cu-image">
					<image :src="'/static/tabbar/module' + [pageCur==item.type?'_blue_cur':''] + '.png'"></image>
				</view>
				<view :class="pageCur==item.type?'text-blue':'text-gray'">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	interface footArr {
        name: string,
        type: string,
	}

	@Component({})
	export default class index extends Vue {

		pageCur: string = 'center'
		footabs: footArr[] = [
		    { name: 'one', type: 'moduleOne' },
			{ name: 'center', type: 'center' },
			{ name: 'two', type: 'moduleTwo' }
		]

		navChange (num: number): void {
            this.pageCur = this.footabs[num].type
		}
	}
</script>
