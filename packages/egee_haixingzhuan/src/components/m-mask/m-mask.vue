<template>
	<view :class="{'scale-1.2': zoom,show: show}" :style="[maskStyle, zoomStyle]" @tap="click"
		  @touchmove.stop.prevent="() => {}" class="m-mask" hover-stop-propagation>
		<slot />
	</view>
</template>

<script lang="ts">
    import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component({})
    export default class MaskIndex extends Vue {
        @Prop({ default: false, type: Boolean }) show?: boolean // 是否显示遮罩
        @Prop({ default: false, type: Boolean }) zoom?: boolean // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
        @Prop({ default: true, type: Boolean }) maskClickAble?: boolean // 是否可以通过点击遮罩进行关闭
        @Prop({ default: '', type: [Number, String] }) zIndex?: number | string // 层级z-index
        @Prop({ default: 300, type: [Number, String] }) duration?: any // 遮罩的过渡时间，单位为ms
        @Prop({
            default () {
                return {}
            }
        }) customStyle?: any // 用户自定义样式

        zoomStyle: any = { transform: '' }
        scale: string = 'scale(1.2, 1.2)'

        @Watch('show', { immediate: false, deep: false })
        onChangeValue (val) {
            if (val && this.zoom) {
                // 当展示遮罩的时候，设置scale为1，达到缩小(原来为1.2)的效果
                this.zoomStyle.transform = 'scale(1, 1)'
            } else if (!val && this.zoom) {
                // 当隐藏遮罩的时候，设置scale为1.2，达到放大(因为显示遮罩时已重置为1)的效果
                this.zoomStyle.transform = this.scale
            }
        }

        get maskStyle () {
            let style: any = {}
            style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            if (this.show) style.zIndex = this.zIndex ? this.zIndex : this.$mio.miocfg.mask
            else style.zIndex = -1
            style.transition = `all ${this.duration / 1000}s ease-in-out`
            // 判断用户传递的对象是否为空，不为空就进行合并
            if (Object.keys(this.customStyle).length) {
                style = {
                    ...style,
                    ...this.customStyle
                }
            }
            return style
        }

        @Emit()
        click (): void {

		}
    }
</script>

<style lang="scss" scoped>
	.m-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		transition: transform 0.3s;
	}
</style>
