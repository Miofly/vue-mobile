<template>
	<view class="">
		<navbar title="new标题" :titleTextStyle="{ color: 'white', fontSize: '18px' }"
				background="linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
				:backTextStyle="{ color: 'white', fontSize: '14px' }"
				backText=""
		></navbar>

		<view v-for="(item, index) in 111" :key="index">
			<view>{{item}}</view>
		</view>
	</view>
</template>

<script>
	/* eslint-disable */
    export default {
        data () {
            return {
                title: '新闻',
                backText: '返回',
                backIconName: 'nav-back',
                right: false,
                showAction: false,
                rightSlot: false,
                useSlot: false,
                background: {
                    'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
                },
                isBack: true,
                search: false,
                custom: false,
                isFixed: true,
                keyword: '',
                // #ifdef MP
                slotRight: false,
                // #endif
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>

