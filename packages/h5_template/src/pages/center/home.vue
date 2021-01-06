<template>
	<scroll-view scroll-y @scroll="scroll1" style="height: 1000px">
        <scroll-view scroll-y @scroll="scroll1" style="height: 1000px">
            111111111
        </scroll-view>
	</scroll-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class home extends Vue {
    created () {
    	this.$mio.mioRoot.throttle()
    }

    scroll1 (e) {
    	console.log(e)
    }
}
</script>

<style>
page {
    width: 100%;
    height: 100%;
}
</style>
