<template>
	<view class="center bg-white full-width">
		<!--
			checked: boolean = false
			checkboxChange (e): void {
			    console.log(e.value)
			}
		-->
		<m-checkbox :disabled="false" :name="''" :shape="['square', 'circle'][0]" @change="checkboxChange" v-model="checked"></m-checkbox>

	</view>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        checked: boolean = false

        checkboxChange (e): void {
            console.log(e.value)
        }
    }
</script>

<style scoped lang="scss">


	.u-demo {
	}
</style>
