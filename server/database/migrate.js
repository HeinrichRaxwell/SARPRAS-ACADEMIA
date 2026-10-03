// ============================================================================
// SARPRAS ACADEMIA - DATABASE MIGRATION & SEED RUNNER
// ============================================================================

const fs = require('fs');
const path = require('path');
const db = require('./db');

async function runMigration() {
  console.log('[MIGRATION] Membaca berkas skema schema.sql...');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  console.log('[MIGRATION] Menghubungkan ke PostgreSQL: 127.0.0.1:5433 (Sarpras Academia - pemweb2)...');
  try {
    await db.query(sql);
    console.log('[MIGRATION] Berhasil! Seluruh tabel dan data awal (seeding) telah terpasang.');
    process.exit(0);
  } catch (err) {
    console.error('[MIGRATION] Terjadi kesalahan migrasi:', err.message);
    process.exit(1);
  }
}

runMigration();
