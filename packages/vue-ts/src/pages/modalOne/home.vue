<template>
	<view>
		<view class="nav-list">
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
            { title: '裂变视频', name: 'video', icon: 'user', color: 'gradual-blue', url: 'pddVideo/index' },
            { title: '招商答题', name: 'zsQuestion', icon: 'user', color: 'gradual-red', url: 'zsQuestion/home' },
            { title: '电影', name: 'movie', icon: 'user', color: 'gradual-purple', url: 'movie/mvHome' },
            { title: '签到', name: 'signIn', icon: 'user', color: 'gradual-pink', url: 'signIn/home' },
            { title: '小程序转', name: 'miniProgramTransfer', icon: 'user', color: 'gradual-green', url: 'appletsFront/home' },
            { title: '书城', name: 'bookCity', icon: 'user', color: 'gradual-purple', url: 'bookCity/home' }
        ]

        goPage (url: string): void {
            this.$mio.mioRoot.push(`/pages/modalOne/${url}`)
        }
    }
</script>
