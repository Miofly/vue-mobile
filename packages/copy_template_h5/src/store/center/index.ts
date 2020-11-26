/**
 * @Description: vuex
 * @author wfd
 * @date 2020/8/26 13:35
 * @detail 定义一个modules, 需要创建一个class且extends至VuexModule, 并且Module装饰它
 */
import { VuexModule, Module } from 'vuex-module-decorators'

@Module({ name: 'Vehicle', namespaced: true, stateFactory: true })
export default class Index extends VuexModule {
	footabs: any[] = [
		{ name: 'one', type: 'moduleOne' },
		{ name: 'center', type: 'center' },
		{ name: 'two', type: 'moduleTwo' }
	]
}
