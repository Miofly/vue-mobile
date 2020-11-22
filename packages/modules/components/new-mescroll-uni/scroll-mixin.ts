import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import mescrollUni from 'zj/mescroll-uni/mescroll-uni'

@Component
export default class scrollMixin extends Vue {
    mounted () {
        // this.mescrollInitByRef() // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
    }

    // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    onPullDownRefresh () {
        this.mescroll && this.mescroll.onPullDownRefresh()
    }

    // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    onPageScroll (e) {
        this.mescroll && this.mescroll.onPageScroll(e)
    }

    // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    onReachBottom () {
        this.mescroll && this.mescroll.onReachBottom()
    }

    // @Ref('mescrollRef') mescrollRef?: any // 每个tab页的专属下标
    @Prop({ default: 0, type: Number }) i?: number // 每个tab页的专属下标
    @Prop({ default: 0, type: Number }) index?: number // 当前tab的下标
    @Prop({ default () { return []},type: Array }) tabLists?: any [] //

    mescroll: any = '' // mescroll实例对象
    isInit: boolean = false // 当前tab是否已初始化

    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
        setTimeout(() => {
            this.mescroll = (this.$refs.mescrollRef as mescrollUni).mescroll
            // this.mescrollInitByRef && this.mescrollInitByRef() // 兼容字节跳动小程序 (mescroll-mixins.js)
            // 自动加载当前tab的数据
            if (this.i === this.index) {
                this.isInit = true // 标记为true
                this.mescroll.triggerDownScroll()
            }
        }, 0)

    }

    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef () {
        console.log(111111,this.$refs.mescrollRef)
        if (!this.mescroll || !this.mescroll.resetUpScroll) {
                console.log(this.$refs.mescrollRef)
            // if (this.mescrollRef) this.mescroll = this.mescrollRef.mescroll
            // if (this.$refs.mescrollRef as any) this.mescroll = (this.$refs.mescrollRef as any).mescroll
            // ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }
    }

    // 下拉刷新的回调 (mixin默认resetUpScroll)
    downCallback() {
        if(this.mescroll.optUp.use){
            this.mescroll.resetUpScroll()
        }else{
            setTimeout(()=>{
                this.mescroll.endSuccess();
            }, 500)
        }
    }

    // 上拉加载的回调
    upCallback(page) {
        // mixin默认延时500自动结束加载
        // setTimeout(()=>{
        //     this.mescroll.endErr();
        // }, 500)
    }

    emptyClick () { // 点击空布局按钮的回调
        uni.showToast({
            title: '点击了按钮'
        })
    }

    @Watch('index', { immediate: false, deep: false })
    onChangeValue (val) {
        if (this.i === val && !this.isInit) {
            this.isInit = true // 标记为true
            this.mescroll && this.mescroll.triggerDownScroll()
        }
    }
}
