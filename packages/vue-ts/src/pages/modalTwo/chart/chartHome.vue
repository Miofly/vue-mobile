<template>
	<view>
		<view class="nav-list">
			<view :class="'bg-'+item.color" :key="index" :navType="item.isTab ? 'pushTab' : 'push'"
				  :to="'{name:'+item.url+'}'"
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
            { title: 'chartIndex', name: 'chartIndex~', icon: 'user', color: 'gradual-blue', url: 'chartIndex' },
            { title: 'chartBar', name: 'chartBar~', icon: 'user', color: 'loveRedOne', url: 'chartBar' },
            { title: 'chartColumn', name: 'chartColumn~', icon: 'user', color: 'blueSix', url: 'chartColumn' },
            { title: 'chartColumns', name: 'chartColumns~', icon: 'user', color: 'lovePurpleSeven', url: 'chartColumns' },
            { title: 'chartLine', name: 'chartLine~', icon: 'user', color: 'gradual-purple', url: 'chartLine' },
            { title: 'chartPie', name: 'chartPie~', icon: 'user', color: 'gradual-pink', url: 'chartPie' }
        ]

        goPage (url: string): void {
            this.$mio.mioRoot.push(`/pages/modalTwo/chart/${url}`)
        }
    }
</script>
