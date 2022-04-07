const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'sirev004',
    password: 'Crikey_Mate31',
    timezone: 'Z'
});

module.exports = pool.promise();