var mysql = require('mysql');

var mysql_config = require('../config/mysql_config.js');

var pool = mysql.createPool(mysql_config);

pool.on('acquire', function (connection) {
  // console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  // connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
  // console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  // console.log('Connection %d released', connection.threadId);
});

// pool.end(function (err) {
//   // all connections in the pool have ended
// });

/**
 * getConnection 封装函数
 * @method query
 * @param {string} sql SQL语句
 * @param {array} params 数据集合
 * @param {function} callback 匿名函数
 */
var query = function(sql, params, callback) {
  pool.getConnection(function(error, connection) {
    if (error) {
      callback(error, null, null);
    } else {
      connection.query(sql, params, function (error, results, fields) {
        callback(error, results, fields);
        connection.release();
        if (error) throw error;
      });
    }
  });
};

module.exports = query;
