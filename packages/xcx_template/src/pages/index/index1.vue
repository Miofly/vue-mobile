<template>
    <view class="bg-black text-center padding-bottom-ten box full-width-height">
        <poster id="poster" :config="{{}}" @success="onPosterSuccess">
            <button>点击生成海报</button>
        </poster>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class index extends Vue {
    posterConfig: any = {}

    onPosterSuccess (res1) {
    	console.log(res1)
    }
}
</script>
