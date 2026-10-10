// ============================================================================
// SARPRAS ACADEMIA - POSTGRESQL DATABASE CONNECTION POOL (CLOUD & LOCAL HYBRID)
// ============================================================================

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Auto-load .env if available
const rootDir = path.resolve(__dirname, '../..');
const envPath = path.join(rootDir, '.env');

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value.trim();
    }
  });
}

const isCloud = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') && !process.env.DATABASE_URL.includes('127.0.0.1');

let poolConfig;

if (process.env.DATABASE_URL) {
  const isAiven = process.env.DATABASE_URL.includes('aivencloud.com');
  const aivenHost = 'pemweb2-reydav0509-dccc.i.aivencloud.com';
  const aivenIp = '168.144.213.53';

  // Strip query string like ?sslmode=require so driver accepts cloud CA
  const cleanConn = process.env.DATABASE_URL.split('?')[0];

  if (isAiven && !process.env.VERCEL && process.env.DATABASE_URL.includes(aivenHost)) {
    try {
      const parsed = new URL(cleanConn);
      poolConfig = {
        host: aivenIp,
        port: parseInt(parsed.port, 10) || 13337,
        user: parsed.username,
        password: parsed.password,
        database: parsed.pathname.replace(/^\//, '') || 'defaultdb',
        ssl: { rejectUnauthorized: false, servername: aivenHost },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      };
    } catch (e) {
      poolConfig = {
        connectionString: cleanConn,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      };
    }
  } else {
    poolConfig = {
      connectionString: cleanConn,
      ssl: isCloud ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };
  }
} else {
  poolConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5433,
    user: process.env.DB_USER || 'sarpras_admin',
    password: process.env.DB_PASSWORD || 'sarpras_password_2026',
    database: process.env.DB_NAME || 'Sarpras Academia - pemweb2',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
  };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  isCloud
};
