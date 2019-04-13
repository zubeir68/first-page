const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');


const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render('bookListView', {
            title: 'MyLibrary',
            nav,
            books
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          const { id } = req.params;

          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          res.render('bookView', {
            title: 'MyLibrary',
            nav,
            book
          });
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return bookRouter;
}


module.exports = router;
