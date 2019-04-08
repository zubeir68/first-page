const express = require('express');
const sql = require('mssql');

// const debug = require('debug')('app:bookRoutes');


const bookRouter = express.Router();

function router(nav) {
  // const books = [{
  //   author: 'Chinua Achebe',
  //   title: 'Things Fall Apart',
  //   genre: 'Action',
  //   read: false
  // },
  // {
  //   author: 'Hans Christian Andersen',
  //   title: 'Fairy tales',
  //   genre: 'Comedy',
  //   read: false
  // },
  // {
  //   author: 'Dante Alighieri',
  //   title: 'The Divine Comedy',
  //   genre: 'Love',
  //   read: false
  // }];

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books');
        res.render('bookListView', {
          title: 'MyLibrary',
          nav,
          books: recordset
        });
      }());
    });


  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();

        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        title: 'MyLibrary',
        nav,
        book: req.book
      });
    });

  return bookRouter;
}

module.exports = router;
