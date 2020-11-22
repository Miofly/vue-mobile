<template>
	<view>
		<view class="full-width-height">
			<siIndex v-if="pageCur==footabs[0].type"></siIndex>
			<siMore v-if="pageCur==footabs[1].type"></siMore>
			<siRecord v-if="pageCur==footabs[2].type"></siRecord>

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
        @State('footabs', { namespace: 'si' }) footabs

        pageCur: string = this.$store.state.si.footabs[0].type
        interstitialAd: any = null

        navChange (num: number): void {
            this.pageCur = this.footabs[num].type
        }
    }
</script>
