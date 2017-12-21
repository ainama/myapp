var express = require('express');
var router = express.Router();

var query = require('../../tools/community_server.js');

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


/* limin */
/* some api code */

/* lynn chaoqun */
/* some api code */

module.exports = router;
