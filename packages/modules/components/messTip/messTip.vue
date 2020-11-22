<template>
	<view v-if="position=='top'">
		<view :class="['mio-'+type,show?'mio-top-show':'']"
			  class="mio-tips-class mio-toptips">
			{{msg}}
		</view>
	</view>
	<view v-else>
		<view :class="[position=='center'?'mio-centertips':'mio-bottomtips',show?'mio-toast-show':'']"
			  class="mio-tips-class mio-toast">
			<view :class="['mio-'+type]" class="mio-tips-content">
				{{msg}}
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class messTip extends Vue {
        @Prop({ default: 'top', type: String }) position?: string // top bottom center

        timer: any = null
        show: boolean = false
        msg: string = '无法连接到服务器~'
        // translucent,primary,green,warning,danger
        type: string = 'translucent'

        showTips (options) {
            const {
                type = 'translucent',
                duration = 2000
            } = options
            clearTimeout(this.timer)
            this.show = true
            // this.duration = duration < 2000 ? 2000 : duration;
            this.type = type
            this.msg = options.msg
            this.timer = setTimeout(() => {
                this.show = false
                clearTimeout(this.timer)
                this.timer = null
            }, duration)
        }
    }
</script>
