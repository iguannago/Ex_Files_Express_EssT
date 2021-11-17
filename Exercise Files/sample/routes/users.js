var express = require('express');
var router = express.Router();
var debug = require("debug")("sample:routes:users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  debug(`new user(id=${req.body.id}) added`);
  res.send(`new user(id=${req.body.id}) added`);
});

module.exports = router;
