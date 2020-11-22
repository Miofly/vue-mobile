<template>
	<view class="">
		<view class="center">
				<view class="text-center">{{ input ? input : 'Picker值' }}</view>
				<m-button :customStyle="{fontSize: '14px'}" :disabled="false" :hairLine="true" :loading="false" :plain="false"
						  :ripple="true" :shape="['square', 'circle'][1]"
						  :size="['default', 'medium', 'mini'][1]"
						  :type="['default', 'primary', 'error', 'warning', 'success'][2]" @tap="show=true" class="text-white">
					<view class="fa text-xl fa-android margin-right-xxl" style="height: 50rpx" v-if="false"></view>
					单列
				</m-button>
		</view>
		<m-picker :defaultSelector="[0, 1]" :range="[['亚洲', '欧洲'], ['中国', '日本']]"
		          v-model="show" mode="multiSelector" @confirm="confirm">
		</m-picker>
	</view>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                mode: ['selector', 'multiSelector', 'time', 'region'][0],
                range: [['一', '片', '冰', '心', '在', '玉', '壶'], [['亚洲', '欧洲'], ['中国', '日本'], ['北京', '上海', '广州']]][0],
                show: false,
                params: {
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
               console.log(e)
            },
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
