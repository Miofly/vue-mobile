// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数


exports.main = async (event, context) => {
  var dbName = event.dbName;
  try {
    return await db.collection(dbName).where(
      { 
        id: _.gt(event.num) 
       }
    ).remove()
  } catch (e) {
    console.error(e)
  }
}