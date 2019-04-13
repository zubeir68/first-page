const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'zubeir',
  password: 'Munmah7364',
  server: 'zubeir.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch((err) => { debug(err); });

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
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
