var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
  host     : 'bdm236195480.my3w.com',
  user     : 'bdm236195480',
  password : 'bdm236195480',
  database : 'bdm236195480_db',
  port: '3306'
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

// pool.end(function (err) {
//   // all connections in the pool have ended
// });

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
  pool.getConnection(function(err, connection) {
    var command = 'SELECT * FROM test WHERE status=1 ORDER BY update_time DESC';
    connection.query(command, function (error, results, fields) {
      res.send({ code: 10000, msg: results });
      connection.release();
      if (error) throw error;
    });
  });
});

/**
 * 获取未完成todo列表
 * @method /todo/undone/list
 */
router.get('/todo/undone/list', function (req, res) {
  pool.getConnection(function(err, connection) {
    var command = 'SELECT * FROM test WHERE status=0';
    connection.query(command, function (error, results, fields) {
      res.send({ code: 10000, msg: results });
      connection.release();
      if (error) throw error;
    });
  });
});

/**
 * 新增todo
 * @method /todo/add
 * @param {string} todo TODO内容
 */
router.post('/todo/add', function (req, res) {
  pool.getConnection(function(err, connection) {
    var data = req.body;
    var command = 'INSERT INTO test(id, todo, status) VALUES (0, ?, ?)';
    var params = [data.todo, 0];
    connection.query(command, params, function (error, results, fields) {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '请求成功' });
      } else {
        res.send({ code: 10001, msg: '请求失败' });
      }
      connection.release();
      if (error) throw error;
    });
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
  pool.getConnection(function(err, connection) {
    var data = req.body;
    var command = 'UPDATE test SET todo = ?, status = ? WHERE id = ?';
    var params = [data.todo, data.status, data.id];
    connection.query(command, params, function (error, results, fields) {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '请求成功' });
      } else {
        res.send({ code: 10001, msg: '请求失败' });
      }
      connection.release();
      if (error) throw error;
    });
  });
});

/**
 * 删除已完成todo
 * @method /todo/completed/remove
 */
router.delete('/todo/completed/remove', function (req, res) {
  pool.getConnection(function(err, connection) {
    var command = 'DELETE FROM test WHERE status = 1';
    connection.query(command, function (error, results, fields) {
      if (results.serverStatus == 2) {
        res.send({ code: 10000, msg: '请求成功' });
      } else {
        res.send({ code: 10001, msg: '请求失败' });
      }
      connection.release();
      if (error) throw error;
    });
  });
});

module.exports = router;
