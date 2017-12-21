var express = require('express');
var router = express.Router();

var query = require('../../tools/community_server.js');

/**
 * test
 * @method /api/community/test
 */
router.get('/test', function (req, res) {
  var sql = 'select * from t_user;';
  query(sql, null, function (error, results, fields) {
    if (error) throw error;
    res.send({ code: 10000, msg: results });
  });
});

module.exports = router;
