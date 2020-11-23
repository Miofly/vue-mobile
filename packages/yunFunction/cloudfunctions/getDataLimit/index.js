// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName;
  var fdName = event.fdName;
  var fdNames = event.fdNames;
  var filter = event.filter ? event.filter : null;
  var fieldName = event.fieldName ? event.fieldName : '_id';
  var order = event.order ? event.order : 'asc';
  var pageIndex = event.pageIndex ? event.pageIndex : 1;
  var pageSize = event.pageSize ? event.pageSize : 10;
  const countResult = await db.collection(dbName).where(filter).count();
  const total = countResult.total;
  const totalPage = Math.ceil(total / pageSize);
  var hasMore;
  if (pageIndex > totalPage || pageIndex == totalPage) {
    hasMore = false
  } else {
    hasMore = true
  }
  return db.collection(dbName).where({
    month: event.month, day: _.gt(event.min).and(_.lt(event.max))
  }).skip((pageIndex - 1) * pageSize).limit(pageSize).orderBy(fieldName, order).get().then(res => {
    res.hasMore = hasMore;
    return res;
  })
}