var express = require('express');
var router = express.Router();
var session = require('express-session');
var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/images/resource/',
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
      maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
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
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

/**
 * 注册
 * @method /api/community/user/register
 */
router.post('/register', function (req, res) {
  var sql = 'INSERT INTO t_user(id, name, tel, pwd, head_img) VALUES (0, ?, ?, ?, ?)';
  var data = req.body;
  var params = [];
  for(var k in data) {
    params.push(data[k]);
  }
  params.push('/images/userImg.png');
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
        // console.log('req9999', req.session);
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
router.get('/user/userInfo', function (req, res) {
  var uid = req.session.sessionId;
  var sql = 'SELECT * FROM t_user where id=' + uid;
  query(sql, null, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.send({ code: 10000, msg: results });
    }
  });
});

/**
 * 用户发表的文章查询
 * @method /api/community/user/articles
 */
router.get('/user/articles', function (req, res) {
  var uid = req.session.sessionId;
  var sql = 'SELECT * FROM t_article where author_id=' + uid;
  query(sql, null, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.send({ code: 10000, msg: results });
    }
  });
});

/**
 * 用户点赞的文章查询
 * @method /api/community/user/likes
 */
router.get('/user/likes', function (req, res) {
  var uid = req.session.sessionId;
  var sql = 'SELECT t_article.* FROM t_like JOIN t_article ON t_article.id=t_like.article_id WHERE t_like.user_id=' + uid;
  query(sql, null, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.send({ code: 10000, msg: results });
    }
  });
});

/**
 * 用户修改姓名
 * @method /api/community/user/updateName
 */
router.post('/user/updateName', function(req, res){
  updateInfo(req, res, 'name');
});

/**
 * 用户修改密码
 * @method /api/community/user/updatePwd
 */
router.post('/user/updatePwd', function(req, res){
  updateInfo(req, res, 'pwd');
});

/**
 * 用户修改手机号
 * @method /api/community/user/updateTel
 */
router.post('/user/updateTel', function(req, res){
  var uid = req.session.sessionId;
  var data = req.body;
  var params = [data.tel, uid]
  var telSql = 'SELECT t_user.tel FROM t_user';
  var sql = 'UPDATE t_user SET tel=? where id=?';
  query(telSql, null, function (error, results, fields) {
    console.log('oooooo', results);
    if (error) {
      throw error;
    } else {
      var bool = true;
      if (results) {
        for (var i = 0;i < results.length;i++) {
          if (results[i].tel == data.tel) {
            bool = false;
            res.send({ code: 10002, msg: '电话号码已存在！' });
          }
        }

        if (bool) {
          query(sql, params, function (error, results, fields) {
            console.log('update', results);
            if (error) {
              throw error;
            } else {
              if (results.serverStatus == 2) {
                res.send({ code: 10000, msg: '修改成功！' });
              }
            }
          });
        }
      }
    }
  });

});

/**
 * 用户修改头像
 * @method /api/community/user/updateImg
 */
router.post('/user/updateImg', function(req, res){
  updateInfo(req, res, 'head_img');
});

function updateInfo(req, res, type) {
  var uid = req.session.sessionId;
  var data = req.body;
  var params = [data[type], uid]
  var sql = 'UPDATE t_user SET '+ type +'=? where id=?';
  query(sql, params, function (error, results, fields) {
    console.log('update', results);
    if (error) {
      throw error;
    } else {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '修改成功！' });
      }
    }
  });
}

/**
 * 退出
 * @method /api/community/user/logout
 */
router.get('/logout', function (req, res) {
    req.session.sessionId = null; // 删除session
    res.redirect('/login');
});

/**
 * 获取用户信息（顶导）
 * @method /api/community/user/base
 * @author Ainama-/*[Mr.Zhang]
 */
router.get('/user/base', function (req, res) {
  var sid = req.session.sessionId;
  var sql = 'SELECT id, head_img FROM t_user WHERE id=' + sid;
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results[0] });
  });
});

/**
 * 最近文章列表
 * @method /api/community/article/recent
 * @author Ainama-/*[Mr.Zhang]
 */
router.get('/article/recent', function (req, res) {
  var start = (req.query.page - 1) * 10;
  var end = req.query.page * 10;
  var sql = 'SELECT t_article.id, t_article.title, t_article.content, t_article.banner, t_article.create_time, t_user.name, t_user.head_img FROM t_article LEFT JOIN t_user ON t_article.author_id=t_user.id ORDER BY create_time DESC limit ' + start + ',' + end;
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

/**
 * 热门文章列表
 * @method /api/community/article/hot
 * @author Ainama-/*[Mr.Zhang]
 */
router.get('/article/hot', function (req, res) {
  var sql = 'SELECT id, title, banner, create_time FROM t_article ORDER BY praise DESC limit 10';
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

/* lichaoqun */
/**
 * 上传图片
 * @method /api/community/uploadImg
 */
router.post('/uploadImg', function (req, res) {
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
 *  add/edit article
 * @method /api/community/article/upload
 */
router.post('/article/upload', function(req, res) {

  // console.log('req => ', req.body.id)
  if (req.body.id == 0) {
    var sql = 'INSERT INTO t_article(id, title, author_id, content, banner) VALUES(0, ?, ?, ?, ?)';
    var data = req.body;
    var params = [];
    for(var k in data) {
      params.push(data[k]);
    };
    params.splice(0,1);
    // console.log('add => ', params)
    query(sql, params, function(error, results, fields) {
      if (error) {
        res.send({ code: 10002, msg: '发布失败', error: error.sqlMessage });
        // throw error;
      } else {
        if (results.serverStatus == 2) {
          res.send({ code: 10000, msg: '发布成功', id: results.insertId });
        } else {
          res.send({ code: 10001, msg: '发布失败' });
        }
      }
    });
  } else {
    var article_id = req.body.id;
    var sql = 'UPDATE t_article SET title = ?, author_id = ?, content = ?, banner = ?, create_time = ? WHERE id = ?';
    var data = req.body;
    var params = [data.title, data.author_id, data.content, data.banner, data.create_time, article_id];
    // for(var k in data) {
    //   params.push(data[k]);
    // };
    // params.splice(0,1);
    // params.push(article_id);
    // console.log('edit => ', params)
    query(sql, params, function(error, results, fields) {
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
  }
});

/**
 * 读文章
 * @method /api/community/article/read
 */
router.post('/article/read', function(req, res) {

  var data = req.body;
  var selectSql = 'SELECT * FROM t_article WHERE id = ' + data.id;
  query(selectSql, null, function(error, results, fields) {
    if (error) { throw error; }

    // 判断是否为作者，是否赞过
    var uid = req.session.sessionId;
    if (uid) {

      var authorID = results[0].author_id;

      if (uid == authorID) { results[0].isAuthor = true; }
      else { results[0].isAuthor = false };

      var s2 = 'SELECT article_id FROM t_like WHERE user_id=' + uid;
      results[0].isLiked = false;
      query(s2, null, function (e, r, f) {
        if (e) throw e;
        for (var i = 0; i < r.length; i++) {
          if (r[i].article_id == data.id) {
            results[0].isLiked = true;
            break;
          }
        }
        res.send({ code: 10000, msg: results });
      });

    } else {
      results[0].isLiked = false;
      results[0].isAuthor = false;
      res.send({ code: 10000, msg: results });
    }

    /* 统计访问次数 */
    var praise = results[0].praise + 1;
    var updatesQL = 'UPDATE t_article SET praise=' + praise + ' WHERE id=' + data.id;
    query(updatesQL, null, function (error, results, fields) {
      if (error) throw error;
    });
  });
});

/**
 * 读like
 * @method /api/community/article/getlike
 */
router.post('/article/getlike', function(req, res) {
  var data = req.body;
  var sql = 'SELECT COUNT(*) AS count FROM t_like WHERE article_id = ' + data.id;
  query(sql, null, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.send({ code: 10000, like: results });
    }
  });
});

/**
 * add like
 * @method /api/community/article/like
 */
router.post('/article/like', function(req, res) {
  var sql = 'INSERT INTO t_like(id, article_id, user_id) VALUES(0, ?, ?)';
  var data = req.body;
  var params = [];
  for(var k in data) {
    params.push(data[k]);
  };
  console.log('add => ', params)
  query(sql, params, function(error, results, fields) {
    if (error) throw error;
    else {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '发布成功' });
        var sql = 'UPDATE t_article SET count_like=count_like+1 WHERE id = ' + data.article_id;
        query(sql, null, function (error, results, fields) {
          if (error) throw error;
        });
      } else {
        res.send({ code: 10001, msg: '发布失败' });
      }
    }
  });
});

/**
 * get authorInfo
 * @method /api/community/article/author
 */
router.post('/article/author', function(req, res) {
  var data = req.body;
  var sql = 'SELECT author_id FROM t_article WHERE id = ' + data.id;
  query(sql, null, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      var author_id = results[0].author_id;
      var sql = 'SELECT * FROM t_user WHERE id = ' + author_id;
      query(sql, null, function(error, results, fields) {
        if (error) {
          throw error;
        } else {
          res.send({ code: 10000, msg: results });
        }
      });
    }
  });
});

/**
 * 最近文章列表
 * @method /api/community/article/latest
 */
router.post('/article/latest', function (req, res) {
  var data = req.body;
  var sql = 'SELECT author_id FROM t_article WHERE id = ' + data.id;
  query(sql, null, function(error, results, fields) {
    if (error) {
      throw error;
    } else {
      var author_id = results[0].author_id;
      var sql = 'SELECT t_article.id,t_article.title,t_article.create_time FROM t_article WHERE t_article.author_id = ' + author_id + ' ORDER BY create_time DESC limit 1';
      query(sql, null, function(error, results, fields) {
        if (error) {
          throw error;
        } else {
          res.send({ code: 10000, msg: results });
        }
      });
    }
  });
});

module.exports = router;
