<template>
    <view style="height: 100%">
        <ad v-if="ggkz" unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>
        <web-view :src="url"></web-view>
        <ad v-if="ggkz" unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        <ad v-if="ggkz" unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>
    </view>
</template>

<script lang="ts">
	import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

	@Component({})
	export default class webview extends Vue {
        url: string = ''
        ggkz:boolean = true

        onLoad (e) {
            console.log(e)
            this.url = e.url
        }
	}
</script>

<style>

</style>
