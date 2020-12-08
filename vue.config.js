const path = require('path')

// 解决内存溢出问题 MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
// 11 upgrade listeners added. Use emitter.setMaxListeners() to increase limit
require('events').EventEmitter.defaultMaxListeners = 0  // eslint-disable-line

// const TransformPages = require('uni-read-pages') // 配置uni-router的路由页面
// const tfPages = new TransformPages({
// 	includes: ['path', 'name', 'meta']
// })

function resolve (dir) {
    return path.join(__dirname, dir)
}

const mockServerPort = 9999

/**
 *  publicPath 不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，
 *  outputDir 不支持
 *  assetsDir 固定 static
 */
module.exports = {
    /**
     * 在vuex-module-decorators@0.9.3版本开始, 代码最终发布为ES5格式, 因此下面的部分主要针对v0.9.2及以前的版本最终生成的代码是ES2015(ES6)格式的
    */
    transpileDependencies: ['uni-simple-router', 'vuex-module-decorators'],
    configureWebpack: (config) => {
		config.resolve.modules.unshift(path.join(__dirname, 'node_modules'))
		if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 生产环境不输出日志
        } else { // 开发环境配置

        }
        config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']

    },
    // 配置没有export导出的js
    chainWebpack: (config) => {
        // config.module
        //     .rule('zepto')
        //     .test(require.resolve('./src/common/plugin/zepto.min.js'))
        //     .use('exports')
        //     .loader('exports-loader?window.zepto')
        //     .end()
        //     .use('script')
        //     .loader('script-loader')
        //     .end()
        // config.module.rule('tvp')
        //     .test(require.resolve('./src/common/plugin/tvp.js'))
        //     .use('exports')
        //     .loader('exports-loader?window.tvp')
        //     .end()
        //     .use('script')
        //     .loader('script-loader')
        //     .end()
        // config.plugin('env')
        //     .use(require.resolve('webpack/lib/ProvidePlugin'), [{ $: 'zepto' }])
        // 配置快捷访问文件夹
        config.resolve.alias
            .set('zj', resolve('packages/modules/components'))
            .set('uJs', resolve('packages/modules/common'))
            .set('json', resolve('packages/modules/static/json'))
			.set('resources', resolve('packages/modules/static'))
			.set('ys', resolve('packages/modules/styles'))
        // 配置uni-router
        // config.plugin('provide').use(tfPages.webpack.DefinePlugin, [{ ROUTES: JSON.stringify(tfPages.routes) }])
    },
    devServer: { // 开发环境跨域处理
    	open: true,
        proxy: {
			'/mytest': {
				target: `http://127.0.0.1:${mockServerPort}/mock-api/v1`,
				changeOrigin: true, // needed for virtual hosted sites
				ws: true, // proxy websockets
				pathRewrite: {
					'^/mytest' : ''
				}
			},
			'/tp': {
				target: 'https://6d69-miofly-k1xjk-1303051262.tcb.qcloud.la',
				changeOrigin: true, // 是否跨域
				pathRewrite: {
					'^/tp': ''
				}
			},
			'/api': {
				target: 'https://www.okzyw.com',
				changeOrigin: true, // 是否跨域
				pathRewrite: {
					'^/api': ''
				}
			},
            '/appmv': {
                target: 'https://app.movie',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/appmv': ''
                }
            },
            '/foo': {
                target: 'https://api.apiopen.top',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/foo': ''
                }
            },
            '/db': {
                target: 'https://movie.douban.com',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/db': ''
                }
            },
            '/sjh': { // 手机号查询
                target: 'https://tool.lu',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/sjh': ''
                }
            },
            '/mv': {
                target: 'http://123.0t038.cn/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/mv': ''
                }
            },
            '/lz': {
                target: 'http://api.lezhuan2020.cn/api',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/lz': ''
                }
            },
            '/wx': {
                target: 'https://mp.weixin.qq.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/wx': ''
                }
            },
            '/ks': {
                target: 'https://v.kuaishou.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/ks': ''
                }
            },
            '/myx': {
                target: 'https://api-xcx.idoujia.cn',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/myx': ''
                }
            },
            '/dy': {
                target: 'https://v.douyin.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/dy': ''
                }
            },
            '/wxv': {
                target: 'http://api-xcx.idoujia.cn/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/wxv': ''
                }
            }
        }
    }
}
