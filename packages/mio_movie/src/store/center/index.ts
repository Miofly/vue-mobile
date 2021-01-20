/**
 * @Description: vuex
 * @author wfd
 * @date 2020/8/26 13:35
 * @detail 定义一个modules, 需要创建一个class且extends至VuexModule, 并且Module装饰它
 */
import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ name: 'Vehicle', namespaced: true, stateFactory: true })
export default class Index extends VuexModule {
	footabs: any = [
		{ show: true, name: '电影', type: 'youtube' },
		{ show: true, name: '连续剧', type: 'youtube-play' },
		{ show: true, name: '解说', type: 'home' },
		{ show: true, name: '综艺', type: 'vimeo-square' },
		{ show: true, name: '动漫', type: 'wpbeginner' }
	]
}
