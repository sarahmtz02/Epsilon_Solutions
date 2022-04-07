const { createPool } = require("mysql2");

const pool = createPool({
  host: 'bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com',
  user: 'u5sokjl76zng6fqs',
  password: 'dIpxqPIEwLvAmwnGxFl4',
  port: 3306,
  database: 'bpnzdg3qreqalbxfqwow',
});

module.exports = pool.promise();