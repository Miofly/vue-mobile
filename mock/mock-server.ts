import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import path from 'path'
import yaml from 'yamljs'
import * as api from './api'

const app = express()
const port = 8686
const { connector, summarise } = require('swagger-routes-express')

app.use(compression())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
	limit: '20mb',
	extended: false
}))
app.use((req, res, next) => {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', '-1')
	next()
})

// 读取并调整配置文件
const apiDefinition = yaml.load(path.resolve(__dirname, 'swagger.yml'))
// 基于swaggerConfig创建模拟函数
const options = {
	security: {
		// AccessTokenAuth: accessTokenAuth
	}
}
const connectSwagger = connector(api, apiDefinition, options)
connectSwagger(app)
// 打印swagger路由器api摘要
const apiSummary = summarise(apiDefinition)
console.log(apiSummary)

// 捕获404错误
app.use((req, res, next) => {
	const err = new Error('Not Found')
	res.status(404).json({
		message: err.message,
		error: err
	})
})

// 创建HTTP服务器。
const server = http.createServer(app)

// 在所有网络接口上侦听提供的端口。
server.listen(port)
server.on('error', onError)
console.log(`Mock server started on port ${port}!`)

// HTTP服务器“错误”事件的事件侦听器。
function onError (error: any) {
	if (error.syscall !== 'listen') {
		throw error
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error('Express ERROR (app) : %s requires elevated privileges', bind)
		process.exit(1)
	case 'EADDRINUSE':
		console.error('Express ERROR (app) : %s is already in use', bind)
		process.exit(1)
	default:
		throw error
	}
}
