// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var dbName = event.dbName;
  var filter = event.filter ? event.filter : null;
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  return db.collection(dbName).where({ openId: wxContext.OPENID}).get().then(res => {
    
    return {res, OPENID};
  })
  
}