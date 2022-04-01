const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'bckegdqi9kkfb86jzayd-mysql.services.clever-cloud.com',
    user: 'uwwhw3lru01a0hyp',
    database: 'bckegdqi9kkfb86jzayd',
    password: 'xpq0Rre3cM2AHv0tdw9H',
    port:3306
});
module.exports = pool.connect();