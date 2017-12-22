var express = require('express');
var router = express.Router();
var session = require('express-session');
var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/images/article/',
    domain = "http://localhost:3000";

var query = require('../../tools/community_server.js');

/* limin */
/* some api code */
// 使用 session 中间件
router.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  if (req.session.sessionId) {
    console.log('Request URL:', req.originalUrl);
    next();
  } else {
    console.log('没有登录');
    res.send({ code: 10008, msg: '未登录' });
  }
});

/**
 * 注册
 * @method /api/community/user/register
 */
router.post('/register', function (req, res) {
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
 * @method /api/community/user/login
 */
router.post('/login', function (req, res) {
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
 * @method /api/community/user/userInfo
 */
router.get('/user/userInfo/ssss', function (req, res) {
  // if (req.session.sessionId) {

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
  // } else {
  //   res.redirect('/community');
  // }
});

/**
 * 退出
 * @method /api/community/user/logout
 */
router.get('/logout', function (req, res) {
    req.session.sessionId = null; // 删除session
    res.redirect('/login');
});

/* zhangning */
/**
 * 获取用户信息（顶导）
 * @method /api/community/user/base
 */
router.get('/user/base', function (req, res) {
  // 1. 获取当前用户ID

  // 2.1 ID存在，返回用户信息


  // 2.2 ID不存在，返回10001未登录

  var sql = 'select * from t_user;';
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

/**
 * 获取文章列表
 * @method /api/community/article/list
 */
router.get('/article/list', function (req, res) {
  var sql = 'select * from t_article;';
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

/* lichaoqun */
/**
 * 上传文章banner
 * @method /api/community/uploadArticleImg
 */
router.post('/article/image', function (req, res) {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    // console.log('files', files);

    var extName = '';  //后缀名
    switch (files.image.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    // console.log("newPath",newPath);
    fs.renameSync(files.image.path, newPath);  //重命名
    res.json({
      "newPath":showUrl
    });
  });
});
/**
 * 上传文章
 * @method /api/community/uploadArticle
 */
router.post('/article/upload', function (req, res) {
  var sql = 'INSERT INTO t_article(id, title, user_id, content, banner) VALUES(0, ?, ?, ?, ?)';
  console.log('req', req.body);
  var data = req.body;
  var params = [];
  for(var k in data) {
    params.push(data[k]);
  };
  query(sql, params, function (error, results, fields) {

    if (error) {
      res.send({ code: 10002, msg: '发布失败', error: error.sqlMessage });
      // throw error;
    } else {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '发布成功' });
      } else {
        res.send({ code: 10001, msg: '发布失败' });
      }
    }
  });
});

module.exports = router;
