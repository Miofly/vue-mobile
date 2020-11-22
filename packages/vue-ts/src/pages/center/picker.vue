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
				<m-picker cancelColor="#606266" confirmColor="#2979ff" cancelText="取消" confirmText="确认"
						  defaultRegion="defaultRegion" :defaultSelector="defaultSelector"
						  :defaultTime="$mio.mioTime.dateShift({ time: 0, showDate: true, showTime: true, noSign: false, noSpace: false, monthNum: 'no', showYear: true, china: false })" :mode="mode"
						  :params="params" :range="range"
						  :range-key="rangKey" @columnchange="columnchange" @confirm="confirm" end-year="2099"
						  v-model="show">
				</m-picker>

			</view>
		</view>
	</view>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                mode: ['selector', 'multiSelector', 'time', 'region'][2],
                range: [['一', '片', '冰', '心', '在', '玉', '壶'], [['亚洲', '欧洲'], ['中国', '日本'], ['北京', '上海', '广州']]][1],
                show: false,
                params: {
                    year: true,
                    month: true,
                    day: true,
                    hour: false,
                    minute: false,
                    second: false,
                    province: true,
                    city: true,
                    area: true,
                    timestamp: true
                },

                input: '',
                rangKey: 'name',
                defaultRegion: ['广东省', '深圳市', '宝安区'],
                defaultSelector: [0, 0, 0]
            };
        },
        methods: {
            confirm(e) {
                this.input = '';
                if (this.mode == 'time') {
                    if (this.params.year) this.input += e.year;
                    if (this.params.month) this.input += '-' + e.month;
                    if (this.params.day) this.input += '-' + e.day;
                    if (this.params.hour) this.input += ' ' + e.hour;
                    if (this.params.minute) this.input += ':' + e.minute;
                    if (this.params.second) this.input += ':' + e.second;
                } else if (this.mode == 'region') {
                    this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
                    this.defaultRegion = [e.province.label, e.city.label, e.area.label]
                } else if (this.mode == 'selector') {
                    this.input = this.range[e[0]];
                } else if (this.mode == 'multiSelector') {
                    this.input = this.range[0][e[0]] + '-' + this.range[1][e[1]] + '-' + this.range[2][e[2]];
                }
                console.log(this.input)
            },
            columnchange(e) {
                console.log(e)
                let column = e.column, index = e.index;
                this.defaultSelector[column] = index;
                switch (column) {
                    case 0:
                        switch (index) {
                            case 0:
                                this.range[1] = ['中国', '日本']
                                this.range[2] = ['北京', '上海', '广州']
                                break
                            case 1:
                                this.range[1] = ['英国', '法国']
                                this.range[2] = ['伦敦', '曼彻斯特']
                                break
                        }
                        this.defaultSelector.splice(1, 1, 0)
                        this.defaultSelector.splice(2, 1, 0)
                        break
                    case 1: //拖动第2列
                        switch (this.defaultSelector[0]) { //判断第一列是什么
                            case 0:
                                switch (this.defaultSelector[1]) {
                                    case 0:
                                        this.range[2] = ['北京', '上海', '广州']
                                        break
                                    case 1:
                                        this.range[2] = ['东京','北海道']
                                        break
                                }
                                break
                            case 1:
                                switch (this.defaultSelector[1]) {
                                    case 0:
                                        this.range[2] = ['伦敦', '曼彻斯特']
                                        break
                                    case 1:
                                        this.range[2] = ['巴黎', '马赛']
                                        break
                                }
                                break
                        }
                        this.defaultSelector.splice(2, 1, 0)
                        break
                }
            }
        }
    };
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
