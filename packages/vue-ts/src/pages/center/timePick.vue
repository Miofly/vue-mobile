<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-demo-result-line">{{ input ? input : 'Picker值' }}</view>
				<m-button :customStyle="{fontSize: '14px'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
						  :ripple="true" :shape="['square', 'circle'][1]"
						  :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]" @tap="show=true" class="text-white">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					单列
				</m-button>
				<!--单列选择-->

				<!-- show: boolean = false
					 input: string = ''
        			 defaultTime: string = this.$mio.mioTime.dateShift({ time: 0, showDate: false, showTime: true, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })
        			 confirm (e) {
					     console.log(`${e.hour}时${e.minute}分${e.second}秒`)
					     this.input = `${e.hour}时${e.minute}分${e.second}秒`
					     this.defaultTime = `${e.hour}:${e.minute}:${e.second}`
        			 }
        		-->
				<m-picker v-model="show" mode="time" :defaultTime="defaultTime" @confirm="confirm" end-year="2099"
						  :params="{ year: false, month: false, day: false, hour: true, minute: true, second: true }"></m-picker>

			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        show: boolean = false
        input: string = ''
        defaultTime: string = this.$mio.mioTime.dateShift({ time: 0, showDate: false, showTime: true, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })

        confirm (e) {
            console.log(`${e.hour}时${e.minute}分${e.second}秒`)
            this.input = `${e.hour}时${e.minute}分${e.second}秒`
            this.defaultTime = `${e.hour}:${e.minute}:${e.second}`
        }
    }
</script>

<style lang="scss" scoped>


	.input {
		border: 1px solid #c0c4cc;
		border-radius: 4px;
		margin-bottom: 20px;
		height: 30px;
		font-size: 26rpx;
		flex: 1;
	}

	.input-wrap {
		display: flex;
	}
</style>
