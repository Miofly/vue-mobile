<template>
	<view>
		<view class="nav-list margin-top">
			<view :class="'bg-'+item.color" :key="index" :navType="item.isTab ? 'pushTab' : 'push'" :to="'{name:'+item.url+'}'"
				  @tap="goPage(item.url)" class="nav-li-fill" v-for="(item,index) in elementGoods">
				<view class="nav-title">{{ item.title }}</view>
				<view class="nav-name">{{ item.name }}</view>
				<text :class="'fa-'+item.icon" class="fa"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class home extends Vue {
        elementGoods: any[] = [
            { title: '长期签到', name: '每日多区间签到', icon: 'user', color: 'gradual-red', url: 'signIn/recordInfo' },
            { title: '测试模块', name: 'video', icon: 'user', color: 'gradual-blue', url: 'pddVideo/index' },
        ]

        goPage (url: string): void {
            this.$mio.mioRoot.push(`/pages/modalOne/${url}`)
        }
    }
</script>
