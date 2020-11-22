<template>
    <view>
        <view class="nav-list">
            <view :class="'bg-'+item.color" :key="index" :navType="item.isTab ? 'pushTab' : 'push'" :to="'{name:'+item.url+'}'"
                  @tap="goPage(item.url)" class="nav-li-fill" v-for="(item,index) in elementGoods">
                <view class="nav-title">{{ item.title }}</view>
                <view class="nav-name">{{ item.name }}</view>
                <text :class="'fa-'+item.icon" class="fa"></text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class home extends Vue {
    elementGoods: any[] = [
        { title: '获取用户信息', name: 'userInfos', icon: 'user', color: 'gradual-blue', url: 'wechat/userInfos' },
        { title: '获取当前用户位置', name: 'getLocation', icon: 'user', color: 'gradual-red', url: 'wechat/getLocation' }
    ]

    goPage (url: string): void {
        this.$mio.mioRoot.push(`/pages/moduleOne/${url}`)
    }
}
</script>
