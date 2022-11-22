const mysql = require('mysql2');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

// console.log('connecting');


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
        else throw err;
    }

    // connection.query('SELECT * FROM client', function (error, results, fields) {
    //     // When done with the connection, release it.
    //     connection.release();

    //     // Handle error after the release.
    //     if (error) throw error;

    //     // Don't use the connection here, it has been returned to the pool.
    // });

    if (connection) connection.release();
    console.log('DB is Connected');
    console.log('connected as id ' + connection.threadId);
    return;
});


pool.query = promisify(pool.query);
// console.log(pool.query('SELECT * FROM client'));
module.exports = pool;