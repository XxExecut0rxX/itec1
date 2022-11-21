const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const express_hbs = require('express-handlebars');
// import { engine } from 'express-handlebars';
const path = require('path');

//settings
// app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', express_hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// global variables

// routes
app.use(require('./routes/index.js'));

// public

// starting server

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
})