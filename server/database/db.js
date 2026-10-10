// ============================================================================
// SARPRAS ACADEMIA - POSTGRESQL DATABASE CONNECTION POOL (CLOUD & LOCAL HYBRID)
// ============================================================================

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Auto-load .env or .cloud_db_info.json if available
const rootDir = path.resolve(__dirname, '../..');
const envPath = path.join(rootDir, '.env');
const cloudDbPath = path.join(__dirname, '../.cloud_db_info.json');

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

if (!process.env.DATABASE_URL && fs.existsSync(cloudDbPath)) {
  try {
    const cloudInfo = JSON.parse(fs.readFileSync(cloudDbPath, 'utf-8'));
    if (cloudInfo.connection_string) {
      process.env.DATABASE_URL = cloudInfo.connection_string;
    }
  } catch (e) {}
}

const isCloud = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') && !process.env.DATABASE_URL.includes('127.0.0.1');

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isCloud ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    }
  : {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      user: process.env.DB_USER || 'sarpras_admin',
      password: process.env.DB_PASSWORD || 'sarpras_password_2026',
      database: process.env.DB_NAME || 'Sarpras Academia - pemweb2',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  isCloud
};
