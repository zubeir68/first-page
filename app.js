const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [{
  author: 'Chinua Achebe',
  title: 'Things Fall Apart',
  genre: 'Action',
  read: false
},
{
  author: 'Hans Christian Andersen',
  title: 'Fairy tales',
  genre: 'Comedy',
  read: false
},
{
  author: 'Dante Alighieri',
  title: 'The Divine Comedy',
  genre: 'Love',
  read: false
}];

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      title: 'MyLibrary',
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
      books
    });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'MyLibrary',
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
    });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
