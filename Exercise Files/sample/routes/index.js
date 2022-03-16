const express = require('express');
const router = express.Router();
const debugDb = require('debug')('app:routes:index');

/* GET home page. */
router.get('/', function (req, res, next) {
  debugDb('main page router...');
  res.render('index', {
    title: 'Tennis club',
    text: 'Villanueva de la Serena',
  });
});

module.exports = router;
