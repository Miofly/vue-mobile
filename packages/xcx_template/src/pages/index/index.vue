<template>
    <view>
        <scroll-view @scroll="scroll" scroll-y style="width: 100vw;position: fixed;left: 0;z-index: 10;height: 1000px">
           <view v-for="(item, index) in 100" :key="index">
               {{ index }}
           </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'
import { goodGirlData } from '@/api'
import { throttle } from 'uJs/toolUtils'
@Component({})
export default class test extends Vue {

}
</script>

