<template>
	<view>
		<view class="center">
			<m-button @click="showAction">唤起ActionSheet</m-button>
		</view>

		<!--
			show: boolean = false
			lists: any = [{ text: '最是' }, { text: '朱颜', disabled: true }, { text: '正是', subText: '春' }]
			click (index) {
    			console.log(this.$mio.mioRoot.gsh(this.lists[index]))
			}
		-->
		<m-action-sheet v-model="show" borderRadius="20" :safe-area-inset-bottom="true" :mask-close-able="true"
						@click="click" :cancel-btn="false" :list="lists" :tips="{ text: '', color: 'red', fontSize: '40' }">
		</m-action-sheet>


	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class test extends Vue {
        show: boolean = false
		lists: any = [{ text: '最是' }, { text: '朱颜', disabled: true }, { text: '正是', subText: '春' }]

        showAction () {
            this.show = true
        }

        click (index) {
			console.log(this.$mio.mioRoot.gsh(this.lists[index]))
        }
    }
</script>

<style lang="scss" scoped>

</style>
