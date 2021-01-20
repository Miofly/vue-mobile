<template>
	<view>
		<view class="full-width-height">
			<view v-if="$mio.mioRoot.getLocalData('is_team_captain') == 1 || $mio.mioRoot.getLocalData('is_department_captain') == 1">
				<lz_index v-if="pageCur==newFootabs[0].type"></lz_index>
				<lz_team v-if="pageCur==newFootabs[1].type"></lz_team>
				<lz_rank v-if="pageCur==newFootabs[2].type"></lz_rank>
				<lz_user v-if="pageCur==newFootabs[3].type"></lz_user>
			</view>

			<view v-else>
				<lz_index v-if="pageCur==newFootabs[0].type"></lz_index>
				<lz_team v-if="pageCur==newFootabs[1].type"></lz_team>
				<lz_user v-if="pageCur==newFootabs[2].type"></lz_user>
			</view>

			<view class="cu-bar tabbar bg-white foot">
				<view :key="index" @tap="navChange(index)" v-if="item.show" class="action" v-for="(item, index) in newFootabs"> <!--eslint-disable-line-->
					<view class="fa-cu-image">
						<image :src="pageCur==item.type ? `/static/images/haixing/${item.type}.png` : `/static/images/haixing/${item.type}_grey.png`"></image>
					</view>
					<view :class="pageCur==item.type?'text-blue':'text-gray'">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class index extends Vue {
	@State('footabs', { namespace: 'xcx' }) footabs
	@State('footabsTwo', { namespace: 'xcx' }) footabsTwo
	
	newFootabs: any = this.$mio.mioRoot.getLocalData('is_team_captain') == 1 || this.$mio.mioRoot.getLocalData('is_department_captain') == 1 ? this.$store.state.xcx.footabs : this.$store.state.xcx.footabsTwo
	
	pageCur: string = localStorage.getItem('PageCur') ? localStorage.getItem('PageCur') : this.newFootabs[0].type
	interstitialAd: any = null
	
	navChange (num: number): void {
		console.log(this.newFootabs)
		localStorage.setItem('PageCur', this.newFootabs[num].type)
		document.body.removeEventListener('touchmove', (event) => {
			event.preventDefault()
		}, false)
		this.pageCur = this.newFootabs[num].type
	}
}
</script>
