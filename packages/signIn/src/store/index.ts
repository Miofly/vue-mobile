/*
/!**
 * @Description: vuex
 * @author wfd
 * @date 2020/8/26 13:35
 * @detail 定义一个modules, 需要创建一个class且extends至VuexModule, 并且Module装饰它
 *!/
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '../../store'


// dynamic: true: 是否使用动态加载，简而言之只有在用到当前的module才会加载，动态创建动态模块,即new Vuex.Store({})里面不用注册的.空着就行,
// store,当前模块注册到store上.也可以写在getModule上,即getModule(PassengerStore,store)
// namespaced: true, name: 'zsQusetion' 命名空间
@Module({ name: 'si', namespaced: true, stateFactory: true, store })
export default class SignIn extends VuexModule {
    footabs: any = [
        { show: true, name: '创建', type: 'youtube' },
        { show: true, name: '签到', type: 'youtube-play' },
        { show: true, name: '更多', type: 'home' }
    ]
}

// export const Test = getModule(ZsQuestion)
*/
