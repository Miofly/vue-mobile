// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.filter : null;
  var datas = event.datas ? event.datas : null;
 
  return db.collection(dbName).where(filter).update({
    data: datas,
    success: function (res) {
      console.log(res.data)
    }
  })
}