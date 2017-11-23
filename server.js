const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const expressStaticGzip = require("express-static-gzip");
const app = express()
let staticPath = 'public'
const api = require('./app/routes/api')

let port = process.env.PORT || 3000
process.env.TZ = 'Asia/Shanghai'
app.set('trust proxy', 1) // trust first proxy
app.use(favicon(path.join(__dirname, 'src', 'images', 'logo.png')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// 设置日志格式
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(cookieParser())
app.use(express.query())
app.use('/local',api)

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    var webpackConfig = require('./webpack.dev.config')
    const webpackBase = require('./webpack.base.config')
    const compiler = webpack(webpackConfig)
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        quiet: false,
        publicPath: webpackBase.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }))
    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }))
} else {
    app.use(expressStaticGzip(staticPath));
    app.use(express.static(path.resolve(__dirname, '.', staticPath)))
}


// 所有其他的地址交给前端路由进行处理
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', staticPath, 'index.html'))
})
app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Listening at ${port}`)
})