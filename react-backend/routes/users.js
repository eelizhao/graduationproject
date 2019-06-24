const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')

//通过监听路径判断执行方法
//对应具体做什么保存在userdao里
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})
//比如添加用户，保存在userdao.add方法里
router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next)
})
//  根据用户名潮找user表是否存在
router.get('/queryAll', function(req, res, next) {
  userDao.queryAll(req, res, next)
})
//根据id模糊查询用户
router.get('/query', function(req, res, next) {
  userDao.queryById(req, res, next)
})
// 删除用户根据id
router.get('/deleteUser', function(req, res, next) {
  userDao.delete(req, res, next)
})
//查找评测表最新5条数据
router.get('/homequery', function(req, res, next) {
  userDao.homequery(req, res, next)
})
//查找耳机信息表热度最高10条数据
router.get('/headlist', function(req, res, next) {
  userDao.headlist(req, res, next)
})
//用户登录
router.get('/login', function(req, res, next) {
  userDao.login(req, res, next)
})
//点赞
router.get('/updatelist', function(req, res, next) {
  userDao.updatelist(req, res, next)
})
//增加耳机信息
router.get('/insertheadlist', function(req, res, next) {
  userDao.insertheadlist(req, res, next)
})
//通过评测id，耳机id，用户id模糊查询评测信息
router.get('/querylist', function(req, res, next) {
  userDao.querylist(req, res, next)
})
//根据id删除评测信息
router.get('/deletelist', function(req, res, next) {
  userDao.deletelist(req, res, next)
})
//根据耳机id查找该耳机评测的最新5条数据
router.get('/homequerys', function(req, res, next) {
  userDao.homequerys(req, res, next)
})
//判断数据库是否已经存在该耳机信息
router.get('/lastby', function(req, res, next) {
  userDao.lastby(req, res, next)
})
//根据用户id以及耳机id增加评测信息
router.get('/insertblogs', function(req, res, next) {
  userDao.insertblogs(req, res, next)
})
//根据耳机id查询耳机信息
router.get('/lastby2', function(req, res, next) {
  userDao.lastby2(req, res, next)
})
//根据评测id查找评测具体信息
router.get('/queryblogbyid', function(req, res, next) {
  userDao.queryblogbyid(req, res, next)
})
router.get('/updatefire', function(req, res, next) {
  userDao.updatefire(req, res, next)
})
module.exports = router
