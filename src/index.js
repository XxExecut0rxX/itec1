const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');

//settings
// app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));

// global variables

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// public

// starting server

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
})