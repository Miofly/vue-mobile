import store from '@/store'

declare module 'vue/types/vue' {
    interface Vue {
        $mio: any // 这表示this下有这个东西
        $store: typeof store
        $newRouter: any
    }
}
