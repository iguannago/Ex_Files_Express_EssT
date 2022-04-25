const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routes:users');
const debugDb = require('debug')('users:mongodb');
const data = require('../data/data.json');
const MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
  debug('get all users call ...');

  MongoClient.connect(
    'mongodb://admin:password@localhost:27017',
    (err, client) => {
      if (err) throw err;

      debugDb('Connected successfully...');
      const db = client.db('user-account');
      const result = db
        .collection('users')
        .find()
        .toArray((err, result) => {
          if (err) throw err;

          debugDb(`users found are: ${JSON.stringify(result)}`);
          client.close();
          res.render('users', {
            title: 'Users',
            data: result,
          });
        });
    }
  );
});

router.get('/:dni', (req, res) => {
  debug(`get user(dni=${req.params.dni}) call ...`);

  MongoClient.connect(
    'mongodb://admin:password@localhost:27017',
    (err, client) => {
      if (err) throw err;

      debugDb('Connected successfully...');
      const db = client.db('user-account');
      db.collection('users').findOne({ dni: req.params.dni }, (err, result) => {
        if (err) throw err;

        debugDb(
          `user(dni=${req.params.dni}) found is: ${JSON.stringify(result)}`
        );
        client.close();

        res.render('users', {
          title: 'User',
          data: result,
        });
      });
    }
  );
});

router.post('/', (req, res) => {
  debug(`add user(id=${req.body.dni}) call ...`);

  MongoClient.connect(
    'mongodb://admin:password@localhost:27017',
    (err, client) => {
      if (err) throw err;

      debugDb('Connected successfully...');
      const db = client.db('user-account');

      db.collection('users').updateOne(
        { dni: req.params.dni },
        { $set: req.body },
        { upsert: true },
        (err, result) => {
          if (err) throw err;

          debugDb(
            `user(id=${req.params.id}) updated or inserted: ${JSON.stringify(
              result
            )}`
          );
          client.close();

          res.json(req.body);
        }
      );
    }
  );
});

module.exports = router;
