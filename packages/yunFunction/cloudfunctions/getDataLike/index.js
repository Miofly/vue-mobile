// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var filter = event.filter ? event.filter : {};
  var fieldName = event.fieldName ? event.fieldName : '_id';
  var order = event.order ? event.order : 'asc';
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ? event.pageSize : 10;
  const countResult = await db.collection(dbName).where(filter).count();
  const total = countResult.total;
  const totalPage = Math.ceil(total / 10);
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false
  } else {
    hasMore = true
  }

  return db.collection(dbName).where(_.or([
    {
      title: db.RegExp({
        regexp: event.title,
        options: 'i',
      })
    },
    {
      actor: db.RegExp({
        regexp: event.actor,
        options: 'i',
      })
    }
  ])).skip((pageIndex - 1) * pageSize).limit(pageSize).orderBy(fieldName, order).get().then(res => {
    res.hasMore = hasMore;
    return res;
  })
}