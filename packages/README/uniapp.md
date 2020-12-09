#### vue.config.js 配置注意事项
`publicPath 不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，参考文档：h5-router`<br>
`outputDir 不支持`<br>
`assetsDir 固定 static`<br>
`pages 不支持`<br>
`runtimeCompiler 固定 false`<br>
`productionSourceMap 固定 false`<br>
`css.extract H5 平台固定 false，其他平台固定 true`<br>
`parallel 固定 false`<br>

#### vue-cli方式
###### vue create -p dcloudio/uni-preset-vue my-project
######vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project
