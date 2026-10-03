// ============================================================================
// SARPRAS ACADEMIA - POSTGRESQL DATABASE CONNECTION POOL
// ============================================================================

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT, 10) || 5433,
  user: process.env.DB_USER || 'sarpras_admin',
  password: process.env.DB_PASSWORD || 'sarpras_password_2026',
  database: process.env.DB_NAME || 'Sarpras Academia - pemweb2',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
