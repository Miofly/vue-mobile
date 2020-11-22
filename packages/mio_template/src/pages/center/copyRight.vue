<template>
	<view class="center full-width text-center">
		<view class="flex align-center justify-center bg-white">
			<m-checkbox :disabled="false" :shape="['square', 'circle'][0]"
			            @change="checkboxChange" v-model="checked"></m-checkbox>
			<view style="color: #909399" @tap="checked=!checked">
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
