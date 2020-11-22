/**
 * @Description: 由于 TypeScript 默认并不支持 *.vue 后缀的文件
 * @author wfd
 * @date 2020/8/14 15:21
 * @detail 在 vue 项目中引入的时候需要创建一个 vue-shim.d.ts 文件，放在项目项目对应使用目录下，例如 src/vue-shim.d.ts
 *         意思是告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理
 *         在代码中导入 *.vue 文件的时候，需要写上 .vue 后缀。
 *         原因还是因为 TypeScript 默认只识别 *.ts 文件，不识别 *.vue 文件
 */
// import Router from '@/router'

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

