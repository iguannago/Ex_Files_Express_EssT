var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Tennis club', 
    text: 'Villanueva de la Serena'
  });
});

module.exports = router;
