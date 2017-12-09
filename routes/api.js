var express = require('express');
var router = express.Router();

var query = require('../tools/mysql_server.js');

/* 设置跨域访问 未测试 */
router.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/**
 * 获取已完成todo列表
 * @method /todo/completed/list
 */
router.get('/todo/completed/list', function (req, res) {
  var sql = 'SELECT * FROM test WHERE status=1 ORDER BY update_time DESC';
  query(sql, null, function (error, results, fields) {
    res.send({ code: 10000, msg: results });
    if (error) throw error;
  });
});

/**
 * 获取未完成todo列表
 * @method /todo/undone/list
 */
router.get('/todo/undone/list', function (req, res) {
  var sql = 'SELECT * FROM test WHERE status=0';
  query(sql, null, function (error, results, fields) {
    res.send({ code: 10000, msg: results });
    if (error) throw error;
  });
});

/**
 * 新增todo
 * @method /todo/add
 * @param {string} todo TODO内容
 */
router.post('/todo/add', function (req, res) {
  var data = req.body;
  var sql = 'INSERT INTO test(id, todo, status) VALUES (0, ?, ?)';
  var params = [data.todo, 0];
  query(sql, params, function (error, results, fields) {
    if (results.serverStatus == 2) {
      res.send({ code: 10000, msg: '请求成功' });
    } else {
      res.send({ code: 10001, msg: '请求失败' });
    }
    if (error) throw error;
  });
});

/**
 * 修改todo
 * @method /todo/edit
 * @param {int} id TODOID
 * @param {string} todo TODO内容
 * @param {int} status TODO完成状态
 */
router.put('/todo/edit', function (req, res) {
  var data = req.body;
  var sql = 'UPDATE test SET todo = ?, status = ? WHERE id = ?';
  var params = [data.todo, data.status, data.id];
  query(sql, params, function (error, results, fields) {
    if (results.serverStatus == 2) {
      res.send({ code: 10000, msg: '请求成功' });
    } else {
      res.send({ code: 10001, msg: '请求失败' });
    }
    if (error) throw error;
  });
});

/**
 * 删除已完成todo
 * @method /todo/completed/remove
 */
router.delete('/todo/completed/remove', function (req, res) {
  var sql = 'DELETE FROM test WHERE status = 1';
  connection.query(sql, function (error, results, fields) {
    if (results.serverStatus == 2) {
      res.send({ code: 10000, msg: '请求成功' });
    } else {
      res.send({ code: 10001, msg: '请求失败' });
    }
    if (error) throw error;
  });
});

module.exports = router;
