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
    uuid: any = ''

    ptgg: string = 'adunit-00e1022d0ea25478'
    jlgg: string = 'adunit-c032eda868cde7c8'
    cpgg: string = 'adunit-aeb64142b023c5f4'
    spgg: string = 'adunit-b4b59ee060f44213'
    tpgg: string = 'adunit-649916b6ab77ef4f'
}
