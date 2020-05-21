const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  user: 'trader',
  password: 'trader',
  host: 'localhost',
  port: '5432',
  database: 'trade'
});

module.exports = pool;