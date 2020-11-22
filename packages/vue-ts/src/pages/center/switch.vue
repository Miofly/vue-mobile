<template>
	<view class="center">
		<m-switch :activeValue="true" :disabled="false"
				  :inactiveValue="false" :loading="false"
				  :size="['40', '60', '80'][2]" @change="change"
				  active-color="#2979ff" v-model="checked">
		</m-switch>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class SwitchIndex extends Vue {
        checked: boolean = false

        change (val): void {
            console.log(val)
        }
    }
</script>
