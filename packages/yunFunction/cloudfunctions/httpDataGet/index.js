// 云函数入口文件
const cloud = require('wx-server-sdk')
var http = require('http')
var request = require('request')
cloud.init()

var test;
if (test) {
  test.abort()
  console.log('终止')
}
exports.main = async (event, context) => {
  var key = event.key
  return new Promise((resolve, reject) => {
    test = request.get('https://api.apiopen.top/getJoke?page=1&count=1110&type=video', (err,res, body) => {
      if (err) {
        reject('返回2', err)
      } else {
        try {
          res.test = test
         resolve(res)
        } catch (e) {
          reject('返回1', body)
        }
      }
    })
  })
}