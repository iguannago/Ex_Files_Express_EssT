var express = require('express');
var router = express.Router();
var debug = require('debug')('sample:routes:users');
var data = require('../data/data.json');

router.get('/', (req, res) => {
  debug('get all users call ...');
  res.render('users', {
    title: 'Users',
    data: data,
  });
});

router.get('/:id', (req, res) => {
  debug(`get user(id=${req.params.id}) call ...`);
  res.render('users', {
    title: 'User',
    data: data.find((e) => e.id == req.params.id),
  });
});

router.post('/', (req, res) => {
  debug(`add user(id=${req.body.id}) call ...`);
  newUser = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  data.push(newUser);
  res.json(data[data.length - 1]);
});

module.exports = router;
