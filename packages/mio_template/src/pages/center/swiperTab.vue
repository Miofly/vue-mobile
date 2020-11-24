<template>
	<view class="full-height">
		<m-swiperTab :fullWidth="leftCon == false && rightCon == false ? '100vw' : '70vw'" :isBold="true"
				   :tabHeight="tabHeight - 12" :tabLists.sync="tabLists" :tagRight="20" :tagStatus="true" :tagTop="0" :underLineHeight="10"
				   activeColor="white" mainColor="transparent"
				    ref="swiperTab" tagBg="red" :lineStatus="false"
				   activeSize="16px" textSize="14px" :customStyle="{borderRadius: '20px'}"
				   v-model="tabClick">
		</m-swiperTab>
	</view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({})
    export default class SwiperTab extends Vue {
        leftCon: boolean = false; // 左侧展示内容
        rightCon: boolean = false; // 右侧展示内容
        tabHeight: number = 96; // tab栏的高度
        fixHeight: number = 100; // 固定内容的高度
        fixCon: boolean = false; // 是否需要固定布局
        headerFixCon: boolean = true; // 是否需要头部固定布局
        tabClick: number = 0; // 当前tab的下标
        tabLists: any[] = [
            { name: '应用程序', type: 'app', num: 30 },

            { name: '前端人', type: 'frontend', num: 10 },
            { name: 'Flutter', type: 'Flutter', num: 200 },

            { name: '后端', type: 'backend', num: 1 },
            { name: '安卓', type: 'Android', num: 2 },
            { name: '苹果', type: 'iOS', num: 99 },
        ];
    }
</script>
