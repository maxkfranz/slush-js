var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', {
    development: req.app.get('env') === 'development'
  });
});

module.exports = router;
