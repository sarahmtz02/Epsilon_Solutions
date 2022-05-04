//const mysql = require('mysql2');

// Para revertir y hacer pruebas sólo hay que conectarse a la DB local con el código siguiente: (Las tablas van en minuscula!)

const { createPool } = require("mysql2");
const pool = createPool({
    host: 'bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com',
    user: 'u5sokjl76zng6fqs',
    password: 'dIpxqPIEwLvAmwnGxFl4',
    port: 3306,
    database: 'bpnzdg3qreqalbxfqwow',
    timezone: 'Z'
});

module.exports = pool.promise();


// DB en CleverCloud, las tablas no van en minuscula!

/*const { createPool } = require("mysql2");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Epsil0n*',
    port: 3306,
    database: 'SIRE',
    timezone: 'Z'
});


module.exports = pool.promise();
*/
