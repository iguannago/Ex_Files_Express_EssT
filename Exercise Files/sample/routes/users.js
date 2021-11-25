var express = require('express');
var router = express.Router();
var debug = require('debug')('sample:routes:users');
var debugDb = require('debug')('sample:mongodb');
var data = require('../data/data.json');
const MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
  MongoClient.connect(
    'mongodb://admin:password@localhost:27017',
    (err, client) => {
      if (err) throw err;
      debugDb('Connected successfully...');
    }
  );
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
