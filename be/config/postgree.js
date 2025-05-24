const { Pool } = require('pg');

const poolPostgres = new Pool({
  host: '34.55.152.199',
  user: 'postgres',
  password: '',
  database: 'users',
  port: 5432,
  ssl: false,
});

module.exports = {
  query: (text, params) => poolPostgres.query(text, params),
};
