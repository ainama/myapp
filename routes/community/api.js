var express = require('express');
var router = express.Router();
var session = require('express-session');

var query = require('../../tools/mysql_server.js');

// 使用 session 中间件
router.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

/**
 * 注册
 * @method /user/register
 */
router.post('/user/register', function (req, res) {
  var sql = 'INSERT INTO t_user(id, name, tel, pwd) VALUES (0, ?, ?, ?)';
  var data = req.body;
  var params = [];
  for(var k in data) {
    params.push(data[k]);
  }
  query(sql, params, function (error, results, fields) {

    if (error) {
      res.send({ code: 10002, msg: '注册失败', error: error.sqlMessage });
      // throw error;
    } else {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '注册成功' });
      } else {
        res.send({ code: 10001, msg: '注册失败' });
      }
    }
  });
});


/**
 * 登录
 * @method /user/login
 */
router.post('/user/login', function (req, res) {
  var data = req.body;
  var sql = 'SELECT * FROM t_user where tel=' + data.tel;
  query(sql, null, function (error, results, fields) {
    // console.log('results00', results);
    if (results.length == 0) {
      res.send({ code: 10002, msg: '账号不存在'});
      // throw error;
    } else {
      var bool = results[0].pwd == data.pwd;
      if (bool) {
        req.session.sessionId = results[0].id; // 登录成功，设置 session
        console.log('req9999', req.session);
        res.send({ code: 10000, msg: '登录成功'});
      } else {
        res.send({ code: 10001, msg: '密码错误'});
      }
    }
  });
});


/**
 * 用户信息查询
 * @method /user/userInfo
 */
router.get('/user/userInfo', function (req, res) {
  if (req.session.sessionId) {

    var data = req.query;
    var sql = 'SELECT * FROM t_user where id=' + data.id;
    query(sql, null, function (error, results, fields) {
      console.log('req.session.6666666', req.session);
      if (error) {
        throw error;
      } else {
        res.send({ code: 10000, msg: results });
      }
    });
  } else {
    res.redirect('/community');
  }
});

/**
 * 退出
 * @method /user/logout
 */
router.get('/user/logout', function (req, res) {
    req.session.sessionId = null; // 删除session
    res.redirect('login');
});



/**
 * test
 * @method /api/community/test
 */
router.get('/test', function (req, res) {
  var sql = 'SELECT * FROM test WHERE status=1 ORDER BY update_time DESC';
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

module.exports = router;
