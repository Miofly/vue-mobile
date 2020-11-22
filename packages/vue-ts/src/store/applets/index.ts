/**
 * @Description: vuex
 * @author wfd
 * @date 2020/8/26 13:35
 * @detail 定义一个modules, 需要创建一个class且extends至VuexModule, 并且Module装饰它
 */
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '../../store'


// dynamic: true: 是否使用动态加载，简而言之只有在用到当前的module才会加载，动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(PassengerStore,store)
// namespaced: true, name: 'zsQusetion' 命名空间
@Module({ name: 'xcx', namespaced: true, stateFactory: true, store })
export default class Applets extends VuexModule {
    footabs: any = [
        { show: true, name: '首页', type: 'home' },
        { show: true, name: '团队', type: 'users' },
        { show: true, name: '排行', type: 'gift' },
        { show: true, name: '我的', type: 'user' }
    ]

    footabsTwo: any = [
        { show: true, name: '首页', type: 'home' },
        { show: true, name: '团队', type: 'users' },
        { show: true, name: '我的', type: 'user' }
    ]

    jfcs: any = 0
    phIndex: any = 0
}

// export const Test = getModule(ZsQuestion)
