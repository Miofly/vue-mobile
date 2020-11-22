<template>
	<view class="center">
		<m-search :clearabled="true" :input-align="['left', 'center', 'right'][0]" :shape="['round', 'square'][1]" :show-action="true"
				  @search="search" bgColor="white" v-model="value" style="width: 80vw">
		</m-search>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
	export default class test extends Vue {
        value: string = ''

        search (val): void {
        	console.log(val)
        }
	}
</script>

<style lang="scss" scoped>
</style>
