vue中@Action的异常处理 <br>
在某行代码有错误抛出后，后面的代码都不会被执行，直接阻断 <br> 
try-catch 语句里的代码有一行有错误，后面也阻断，但是跳出 catch 语句后面的代码依然可以执行，因为抛出的错误被 catch 接到了

@Action 在不给 rawError 置为 true 时，会 new 一个新的 Error，并且带上 aciton 里抛出的错误，包裹到一起抛出，因此页面 catch 住的 error 是@Action 抛出的错误，打印就会看到原 error 的信息
解决方法： 加rawError属性，@Action({rawError:true})，即暴露出原生 error。
`vuex-module-decorators` </br>
https://github.com/championswimmer/vuex-module-decorators/blob/master/src/action.ts
