/* 启动node.js接口服务：node app.js */

const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')

const app = express()

// 注册中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))


// 解决跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

app.get('/api/homeSwipe', (req, res) => {
  res.json(require('./datas/homeSwipe.json'))
})

// 处理get请求
app.get('/api/citylist', (req, res) => {
  res.json(require('./datas/cityName.json'))
})

app.get('/api/foodtype', (req, res) => {
  res.json(require('./datas/home.json'))
})

app.get('/api/filter', (req, res) => {
  res.json(require('./datas/HomeFilter.json'))
})

app.get('/api/list', (req, res) => {
  // /api/list?offset=0&len=8
  /* 通过offset和len切割数据返回前台 */
  let parseObj = url.parse(req.url, true)
  let { offset, len } = parseObj.query
  offset = parseInt(offset)
  len = parseInt(len)
  const totalResult = require('./datas/list.json').items
  const sliceResult = totalResult.slice(offset, offset + len)
  const data = { data: sliceResult, total: totalResult.length }
  res.json(data)
})

app.get('/api/detail', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { id } = parseObj.query
  const data = require('./datas/detail.json')[id]
  res.json(data ? data : null)
})

app.get('/api/comments', (req, res) => {
  const data = require('./datas/comments.json')
  res.json(data ? data : null)
})

app.get('/api/merchants', (req, res) => {
  const data = require('./datas/merchants.json')
  res.json(data ? data : null)
})

// 开启监听
app.listen(4000, () => {
  console.log('4000端口已经启动')
})
