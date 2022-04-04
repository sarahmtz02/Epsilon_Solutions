const { createPool } = require("mysql2");

const pool = createPool({
  host: 'bckegdqi9kkfb86jzayd-mysql.services.clever-cloud.com',
  user: 'uwwhw3lru01a0hyp',
  password: 'xpq0Rre3cM2AHv0tdw9H',
  port: 3306,
  database: 'bckegdqi9kkfb86jzayd',
});

module.exports = pool.promise();