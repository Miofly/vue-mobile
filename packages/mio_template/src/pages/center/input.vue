<template>
	<view class="bg-white">
		<m-field :clearable="true" :focus="true" :icon="['address-book'][0]" :labelPosition="['left', 'top'][0]"
				 :password="false" :required="true" :type="['text', 'number', 'idcard', 'digit', 'textarea'][1]"
				 borderBottom="1px solid #eee" borderTop="1px solid transparent" class="" :error-message="''"
				 label="手机号" labelWidth="140" maxlength="240" placeholder="请输入手机号"
				 placeholderStyle="color: grey" v-model="mobile"></m-field>
	</view>
</template>

<script lang="ts">
    import { Component, Prop, Vue, PropSync, Ref, Watch } from 'vue-property-decorator'

    @Component({})
    export default class InputIndex extends Vue {
        mobile: string = ''
    }
</script>
