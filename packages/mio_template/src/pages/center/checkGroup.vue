<template>
	<view class="center bg-white full-width">
		<m-checkbox-group :activeColor="['#2979ff', '#ff9900', '#19be6b', '#fa3534', '#909399'][0]"
						  :size="['30', '40', '50'][0]"
						  :width="['50%', ''][1]" :wrap="false" @change="checkboxGroupChange"
						  max="999">
			<m-checkbox :disabled="item.disabled" :key="index"
						:name="item.name" :shape="['square', 'circle'][1]" v-for="(item, index) in list"
						v-model="item.checked">
				{{item.name}}
			</m-checkbox>
		</m-checkbox-group>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        list: any = [
			{ name: '荔枝', checked: false, disabled: false },
            { name: '香蕉', checked: false, disabled: false },
            { name: '草莓', checked: false, disabled: false }
		]

        checkboxGroupChange (e) {
            console.log(e)
        }
    }
</script>
