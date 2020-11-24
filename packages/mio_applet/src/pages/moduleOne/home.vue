<template>
	<view>
		moduleOne
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
            this.$mio.mioRoot.push(`/pages/moduleOne/${url}`)
        }
    }
</script>
