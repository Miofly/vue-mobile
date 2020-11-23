// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var singer = event.singer
  var num = event.num
  return new Promise((resolve, reject) => {
    request.get(`http://mp34.butterfly.mopaasapp.com/?mp3=${singer}&p=${num}`, (error, response, body) => {
      if (error) {
        reject('返回2', error)
      } else {
        try {
          resolve(response)
        } catch (e) {
          reject('返回1', body)
        }
      }
    })
  })
}