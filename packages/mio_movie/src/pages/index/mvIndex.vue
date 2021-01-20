<template>
	<view>
		<view class="full-width-height">
			<movie-header></movie-header>
			<dy v-if="pageCur==footabs[0].type"></dy>
			<lxj v-if="pageCur==footabs[1].type"></lxj>
			<mvIndex v-if="pageCur==footabs[2].type"></mvIndex>
			<zy v-if="pageCur==footabs[3].type"></zy>
			<dm v-if="pageCur==footabs[4].type"></dm>

			<view class="cu-bar tabbar bg-white foot">
				<view :key="index" @tap="navChange(index)" v-if="item.show" class="action" v-for="(item, index) in footabs"> <!--eslint-disable-line-->
					<view class="fa-cu-image">
						<view :class="[pageCur==item.type?'text-blue':'text-gray', 'fa-' + item.type]"
						      class="fa"></view>
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
	
	
	interstitialAd: any = null

	
}
</script>
