// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.filter : null;
  var fieldName = event.fieldName
  var num = event.num
  return db.collection(dbName)
    .aggregate()
    .sample({
      size: num
    })
    .end()
}