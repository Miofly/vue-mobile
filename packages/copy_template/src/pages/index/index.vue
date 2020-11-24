<template>
	<view class="full-height">
		<moduleOne v-if="pageCur==footabs[0].type"></moduleOne>
		<modalCenter v-if="pageCur==footabs[1].type"></modalCenter>
		<moduleOne v-if="pageCur==footabs[2].type"></moduleOne>

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
	import { State } from 'vuex-class'

	@Component({})
	export default class index extends Vue {
		@State('footabs', { namespace: 'center' }) footabs

		pageCur: string = this.$store.state.center.footabs[1].type
		interstitialAd: any = null

		navChange (num: number): void {
            this.pageCur = this.footabs[num].type
		}
	}
</script>
