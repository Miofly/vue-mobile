/**
 * @Description: vuex
 * @author wfd
 * @date 2020/8/26 13:35
 * @detail 定义一个modules, 需要创建一个class且extends至VuexModule, 并且Module装饰它
 *
 dynamic: true: 是否使用动态加载，简而言之只有在用到当前的module才会加载，动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
 store,当前模块注册到store上.也可以写在getModule上,即getModule(PassengerStore,store)
 namespaced: true, name: 'zsQusetion' 命名空间
 export const Test = getModule(ZsQuestion)
 dynamic: true,
 */
import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ name: 'root', namespaced: true, stateFactory: true })
export default class Root extends VuexModule {
    ggkz: boolean = false
    ggkzs: boolean = true
    master: boolean = false
    ptgg: string = 'adunit-3999b6616115fdf2'
    jlgg: string = 'adunit-d66cc4b7fd9de7a0'
    cpgg: string = 'adunit-0179bafea0d0554f'
    spgg: string = 'adunit-23bbf513de802fce'
    tpgg: string = 'adunit-649916b6ab77ef4f'
	
	// ptgg: string = 'adunit-f938a39b34ed4d50'
	// jlgg: string = 'adunit-061fae57903cc6c7'
	// cpgg: string = 'adunit-046dcc3f70a0098d'
	// spgg: string = 'adunit-1bbe9e92cb9da055'
	// tpgg: string = 'adunit-0398e0fd83b0659b'
}
