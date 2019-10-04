const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 打包后再服务器部署的路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    assetsDir: 'static', //资源目录,相对于outputDir
    // indexPath: 'Areas/MobileWork/Views/AppDefalut/Index.cshtml', //生成的index文件路径,相对于outputDir
    indexPath: 'index.html', //生成的index文件路径,相对于outputDir
    filenameHashing: true, //打包生成的文件名有hash值
    productionSourceMap: false, //js不生成map文件
    lintOnSave: true, //保存时检查eslint
    // css相关配置
    css: {
        // 是否生成css  map文件
        sourceMap: false,
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
        modules: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                data: '@import "@/theme/index.scss";' //sass全局变量文件
            }
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        //请求代理
        // proxy: {
        //     '/MobileWork': {
        //         target: 'http://www.hnyyyz.com:8089',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // },
        open: true, //自动打开浏览器
        host: 'localhost', //主机
        port: 8080 //端口
        // https: false,
        // hotOnly: false,
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias.set('@', path.join(__dirname, 'src'))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    //预渲染
                    new PrerenderSPAPlugin({
                        // 生成文件的路径，也可以与webpakc打包的一致。
                        // 下面这句话非常重要！！！
                        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                        staticDir: path.join(__dirname, 'dist'),
                        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                        routes: [
                            '/',
                            '/AutoForm',
                            '/GoTop',
                            '/Search',
                            '/Upload',
                            '/AutoImg',
                            '/Feedback',
                            '/Actionsheet',
                            '/DatetimePicker',
                            '/Infinitescroll',
                            '*'
                        ],
                        // 这个很重要，如果没有配置这段，也不会进行预编译
                        renderer: new Renderer({
                            inject: {
                                foo: 'bar'
                            },
                            headless: false,
                            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                            renderAfterDocumentEvent: 'render-event'
                        })
                    })
                ]
            }
        }
    }
}
