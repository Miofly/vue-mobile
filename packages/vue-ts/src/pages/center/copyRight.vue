<template>
	<view class="">
		<view class="flex align-center">
			<m-checkbox :disabled="false" :shape="['square', 'circle'][0]" @change="checkboxChange" v-model="checked"></m-checkbox>
			<view style="color: #909399">
				勾选代表同意uView的版权协议
			</view>
		</view>
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
