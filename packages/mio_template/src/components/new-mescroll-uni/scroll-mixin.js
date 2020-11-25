"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = require("vue-property-decorator");
var scrollMixin = /** @class */ (function (_super) {
    __extends(scrollMixin, _super);
    function scrollMixin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mescroll = ''; // mescroll实例对象
        _this.isInit = false; // 当前tab是否已初始化
        return _this;
    }
    scrollMixin.prototype.mounted = function () {
        // this.mescrollInitByRef() // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
    };
    // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    scrollMixin.prototype.onPullDownRefresh = function () {
        this.mescroll && this.mescroll.onPullDownRefresh();
    };
    // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    scrollMixin.prototype.onPageScroll = function (e) {
        this.mescroll && this.mescroll.onPageScroll(e);
    };
    // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    scrollMixin.prototype.onReachBottom = function () {
        this.mescroll && this.mescroll.onReachBottom();
    };
    // mescroll组件初始化的回调,可获取到mescroll对象
    scrollMixin.prototype.mescrollInit = function (mescroll) {
        var _this = this;
        setTimeout(function () {
            _this.mescroll = _this.$refs.mescrollRef.mescroll;
            // this.mescrollInitByRef && this.mescrollInitByRef() // 兼容字节跳动小程序 (mescroll-mixins.js)
            // 自动加载当前tab的数据
            if (_this.i === _this.index) {
                _this.isInit = true; // 标记为true
                _this.mescroll.triggerDownScroll();
            }
        }, 0);
    };
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    scrollMixin.prototype.mescrollInitByRef = function () {
        console.log(111111, this.$refs.mescrollRef);
        if (!this.mescroll || !this.mescroll.resetUpScroll) {
            console.log(this.$refs.mescrollRef);
            // if (this.mescrollRef) this.mescroll = this.mescrollRef.mescroll
            // if (this.$refs.mescrollRef as any) this.mescroll = (this.$refs.mescrollRef as any).mescroll
            // ;(this.$refs.swiperTab as swiperTab).longClick(e.detail.current)
        }
    };
    // 下拉刷新的回调 (mixin默认resetUpScroll)
    scrollMixin.prototype.downCallback = function () {
        var _this = this;
        if (this.mescroll.optUp.use) {
            this.mescroll.resetUpScroll();
        }
        else {
            setTimeout(function () {
                _this.mescroll.endSuccess();
            }, 500);
        }
    };
    // 上拉加载的回调
    scrollMixin.prototype.upCallback = function (page) {
        // mixin默认延时500自动结束加载
        // setTimeout(()=>{
        //     this.mescroll.endErr();
        // }, 500)
    };
    scrollMixin.prototype.emptyClick = function () {
        uni.showToast({
            title: '点击了按钮'
        });
    };
    scrollMixin.prototype.onChangeValue = function (val) {
        if (this.i === val && !this.isInit) {
            this.isInit = true; // 标记为true
            this.mescroll && this.mescroll.triggerDownScroll();
        }
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: 0, type: Number })
    ], scrollMixin.prototype, "i", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: 0, type: Number })
    ], scrollMixin.prototype, "index", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { return []; }, type: Array })
    ], scrollMixin.prototype, "tabLists", void 0);
    __decorate([
        vue_property_decorator_1.Watch('index', { immediate: false, deep: false })
    ], scrollMixin.prototype, "onChangeValue", null);
    scrollMixin = __decorate([
        vue_property_decorator_1.Component
    ], scrollMixin);
    return scrollMixin;
}(vue_property_decorator_1.Vue));
exports.default = scrollMixin;
