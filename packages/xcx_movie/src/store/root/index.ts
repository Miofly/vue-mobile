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
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

@Module({ name: 'root', namespaced: true, stateFactory: true })
export default class Root extends VuexModule {
    ggkz: boolean = false
    ggkzs: boolean = true
    master: boolean = false
    ptgg: string = 'adunit-60f954ce26ce0f92'
    jlgg: string = 'adunit-64b41a9e2fa80176'
    cpgg: string = 'adunit-2d05b89d262a6943'
    spgg: string = 'adunit-f4b9d5450ec9474c'
}
