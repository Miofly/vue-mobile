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
            { title: 'H5图表', name: 'chart', icon: 'user', color: 'gradual-blue', url: 'chart/chartHome' },
            { title: '登录、注册、忘记密码', name: 'chart', icon: 'user', color: 'gradual-red', url: 'user/login' }
        ]

        goPage (url: string): void {
            this.$mio.mioRoot.push(`/pages/modalTwo/${url}`)
        }
    }
</script>
