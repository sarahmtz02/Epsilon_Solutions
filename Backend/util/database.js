//const mysql = require('mysql2');

// Para revertir y hacer pruebas sólo hay que conectarse a la DB local con el código siguiente: (Las tablas van en minuscula!)

/* const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'sirev004',
    password: 'Crikey_Mate31',
    timezone: 'Z'
}); */

// DB en CleverCloud, las tablas no van en minuscula!

const { createPool } = require("mysql2");

const pool = createPool({
    host: 'bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com',
    user: 'u5sokjl76zng6fqs',
    password: 'dIpxqPIEwLvAmwnGxFl4',
    port: 3306,
    database: 'bpnzdg3qreqalbxfqwow',
});

module.exports = pool.promise();