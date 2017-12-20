var express = require('express');
var router = express.Router();

var query = require('../../tools/mysql_server.js');

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
