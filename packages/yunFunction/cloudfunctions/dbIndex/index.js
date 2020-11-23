// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var key = event.key
  var id = event.id
  return new Promise((resolve, reject) => {
    var test = request.get('https://movie.douban.com/', (error, response, body) => {
      try {
        resolve(response)
      } catch (e) {
        reject('返回1', body)
      }
    })
    setTimeout(function () {
      console.log('清除请求')
      test.abort()
    }, 1000)

  })
}