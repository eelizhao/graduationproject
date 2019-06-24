//s所有ql语句保存在这里，方便修改
const user = {
  insert: `INSERT INTO userinfo(id, username, password,email,isadmin) VALUES(0,?,?,?,0)`,
  delete: `DELETE FROM userinfo WHERE id=?`,
  queryById: `SELECT * FROM userinfo WHERE id like ?`,
  queryAll: `SELECT id FROM userinfo WHERE username=?`,
  homequery: `SELECT blogs.*,userinfo.username,userinfo.email,headphone.name "headname" FROM  blogs, userinfo,headphone WHERE userinfo.id = blogs.userid and headphone.id=blogs.headid order by id desc LIMIT 5`,
  headlist: `SELECT *  FROM headphone order by fire desc limit 10`,
  login: `SELECT * FROM userinfo WHERE username=? and password=?`,
  updatelist: `UPDATE blogs set zan=? WHERE id=?`,
  querylist: `SELECT * FROM blogs WHERE id like ? and  headid like ? and userid like ?`,
  deletelist: `DELETE FROM blogs WHERE id=?`,
  queryblogbyid: `SELECT blogs.*,userinfo.username,userinfo.email ,headphone.name "headname"  FROM  blogs, userinfo,headphone WHERE userinfo.id = blogs.userid and headphone.id=blogs.headid and blogs.id=?`,
  insertheadlist: `INSERT INTO headphone(id,fire,name,types,peidai) VALUES(0,0,?,?,?)`,
  lastby: `SELECT * FROM headphone WHERE id like ? AND name = ?`,
  lastby2: `SELECT * FROM headphone WHERE id like ?`,
  insertblogs: `INSERT INTO blogs(id,dody,headid,userid,zan) VALUES (0,?,?,?,0)`,
  homequerys: `SELECT  blogs.*,userinfo.username,userinfo.email FROM blogs,headphone,userinfo WHERE blogs.headid=headphone.id and userinfo.id=blogs.userid and blogs.headid=? order by id desc LIMIT 5`,
  updatefire: `UPDATE headphone SET fire=fire+1 WHERE id = ?`
}
//导出这个user
module.exports = user
