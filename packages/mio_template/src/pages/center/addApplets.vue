<template>
	<view>
		<m-addApplets :headerHeight="60" :headerFixCon.sync="headerFixCon" bgColor="bg-gradual-red" text="点击...添加到我的小程序，更方便哦"></m-addApplets>

	</view>
</template>

<script lang="ts">
  	import { Component, Prop, Vue } from 'vue-property-decorator'

  	@Component({})
  	export default class AddApplets extends Vue {
        headerFixCon: boolean = true
    }
</script>
