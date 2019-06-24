var mysql = require('mysql')
var $conf = require('../conf/db')
var $util = require('../util/util')
var $sql = require('./userSqlMapping')

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql))

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

module.exports = {
  //添加用户
  add: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.params
      connection.query(
        $sql.insert,
        [param.username, param.password, param.email],
        function(err, result) {
          if (result) {
            result = {
              code: 200,
              msg: '增加成功'
            }
          }
          //返回值用jsonWrite封装
          jsonWrite(res, result)
          connection.release()
        }
      )
    })
  },
  // 删除用户根据id
  delete: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var id = +req.query.id
      connection.query($sql.delete, id, function(err, result) {
        if (result.affectedRows > 0) {
          result = {
            code: 200,
            msg: '删除成功'
          }
        } else {
          result = void 0
        }
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //根据id模糊查询用户
  queryById: function(req, res, next) {
    var id = +req.query.id
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryById, id, function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //根据用户名潮找user表是否存在
  queryAll: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryAll, [param.username], function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //查找评测表最新5条数据
  homequery: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      connection.query($sql.homequery, function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //查找耳机信息表热度最高10条数据
  headlist: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      connection.query($sql.headlist, function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //用户登录
  login: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.login, [param.username, param.password], function(
        err,
        result
      ) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //点赞功能
  updatelist: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.updatelist, [param.zan, param.id], function(
        err,
        result
      ) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //增加耳机信息
  insertheadlist: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.params
      connection.query(
        $sql.insertheadlist,
        [param.name, param.types, param.peidai],
        function(err, result) {
          if (result) {
            result = {
              code: 200,
              msg: '增加成功'
            }
          }
          jsonWrite(res, result)
          connection.release()
        }
      )
    })
  },
  //通过评测id，耳机id，用户id模糊查询评测信息
  querylist: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query(
        $sql.querylist,
        [param.id, param.headid, param.userid],
        function(err, result) {
          jsonWrite(res, result)
          connection.release()
        }
      )
    })
  },
  //根据id删除评测信息
  deletelist: function(req, res, next) {
    // delete by Id
    pool.getConnection(function(err, connection) {
      var id = +req.query.id
      connection.query($sql.deletelist, id, function(err, result) {
        if (result.affectedRows > 0) {
          result = {
            code: 200,
            msg: '删除成功'
          }
        } else {
          result = void 0
        }
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //根据耳机id查找该耳机评测的最新5条数据
  homequerys: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.homequerys, [param.id], function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //判断数据库是否已经存在该耳机信息
  lastby: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.lastby, [param.id, param.name], function(
        err,
        result
      ) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //根据耳机id查询耳机信息
  lastby2: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.lastby2, [param.id], function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //根据用户id以及耳机id增加评测信息
  insertblogs: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.params
      connection.query(
        $sql.insertblogs,
        [param.dody, param.headid, param.userid],
        function(err, result) {
          if (result) {
            result = {
              code: 200,
              msg: '增加成功'
            }
          }
          jsonWrite(res, result)
          connection.release()
        }
      )
    })
  },
  //根据评测id查找评测具体信息
  queryblogbyid: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryblogbyid, [param.id], function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  },
  //更新耳机热度
  updatefire: function(req, res, next) {
    var param = req.query || req.params
    pool.getConnection(function(err, connection) {
      connection.query($sql.updatefire, [param.id], function(err, result) {
        jsonWrite(res, result)
        connection.release()
      })
    })
  }
}
