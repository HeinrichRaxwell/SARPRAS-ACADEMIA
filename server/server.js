// ============================================================================
// SARPRAS ACADEMIA - BACKEND REST API & STATIC APPLICATION SERVER
// ============================================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static directories
const rootDir = path.resolve(__dirname, '..');
app.use('/assets', express.static(path.join(rootDir, 'assets')));
app.use('/pages', express.static(path.join(rootDir, 'pages')));
app.use('/docs', express.static(path.join(rootDir, 'docs')));

// Clean page routes
app.get('/', (req, res) => res.sendFile(path.join(rootDir, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'dashboard.html')));
app.get('/data-master', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'data-master.html')));
app.get('/form', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'form.html')));
app.get('/laporan', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'laporan.html')));
app.get('/peminjaman', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'peminjaman.html')));
app.get('/maintenance', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'maintenance.html')));
app.get('/ruangan', (req, res) => res.sendFile(path.join(rootDir, 'pages', 'ruangan.html')));
app.get('/layout', (req, res) => res.sendFile(path.join(rootDir, 'layout.html')));

// ============================================================================
// REST API ENDPOINTS
// ============================================================================

// 1. Health & Database Status
app.get('/api/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as db_time, count(*) as total_assets FROM assets');
    res.json({
      status: 'online',
      institution: 'Universitas Pamulang - Biro Sarpras',
      database: 'PostgreSQL 16 (Sarpras Academia - pemweb2)',
      total_assets: parseInt(result.rows[0].total_assets, 10),
      timestamp: result.rows[0].db_time
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Dashboard Telemetry & Analytics
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalAssetsRes = await db.query('SELECT COUNT(*) as total, COALESCE(SUM(price), 0) as valuation FROM assets WHERE status = $1', ['active']);
    const conditionsRes = await db.query(`
      SELECT 
        COUNT(*) FILTER (WHERE condition = 'Baik') as baik,
        COUNT(*) FILTER (WHERE condition = 'Perawatan') as perawatan,
        COUNT(*) FILTER (WHERE condition = 'Rusak Berat') as rusak_berat
      FROM assets WHERE status = 'active'
    `);
    const categoryRes = await db.query(`
      SELECT category, COUNT(*) as count, COALESCE(SUM(price), 0) as valuation 
      FROM assets WHERE status = 'active' 
      GROUP BY category
    `);
    const upcomingCalibration = await db.query(`
      SELECT code, name, room, condition 
      FROM assets 
      WHERE condition IN ('Perawatan', 'Rusak Berat') AND status = 'active'
      LIMIT 5
    `);

    res.json({
      total_assets: parseInt(totalAssetsRes.rows[0].total, 10),
      total_valuation: parseFloat(totalAssetsRes.rows[0].valuation),
      conditions: {
        baik: parseInt(conditionsRes.rows[0].baik, 10),
        perawatan: parseInt(conditionsRes.rows[0].perawatan, 10),
        rusak_berat: parseInt(conditionsRes.rows[0].rusak_berat, 10)
      },
      categories: categoryRes.rows,
      upcoming_calibration: upcomingCalibration.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Asset Catalog (Master Data with Search, Filter & Sort)
app.get('/api/assets', async (req, res) => {
  try {
    const { q, category, condition, sort, order } = req.query;
    let query = 'SELECT * FROM assets WHERE status = $1';
    const params = ['active'];

    if (q) {
      params.push(`%${q}%`);
      query += ` AND (name ILIKE $${params.length} OR code ILIKE $${params.length} OR room ILIKE $${params.length})`;
    }

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (condition && condition !== 'all') {
      params.push(condition);
      query += ` AND condition = $${params.length}`;
    }

    const sortColumn = ['code', 'name', 'category', 'room', 'price', 'condition'].includes(sort) ? sort : 'id';
    const sortDirection = order === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortColumn} ${sortDirection}`;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Asset Details
app.get('/api/assets/:code', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM assets WHERE code = $1', [req.params.code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aset tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Create Asset
app.post('/api/assets', async (req, res) => {
  try {
    const { code, name, category, room, price, condition, serial_number, model } = req.body;
    if (!code || !name) {
      return res.status(400).json({ error: 'Kode dan Nama aset wajib diisi' });
    }

    const insertQuery = `
      INSERT INTO assets (code, name, category, room, price, condition, serial_number, model, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active')
      RETURNING *
    `;
    const values = [
      code,
      name,
      category || 'Laboratorium',
      room || 'Lab Kimia Terpadu R.302',
      parseFloat(price) || 0,
      condition || 'Baik',
      serial_number || null,
      model || null
    ];

    const result = await db.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Update Asset
app.put('/api/assets/:code', async (req, res) => {
  try {
    const { name, category, room, price, condition } = req.body;
    const updateQuery = `
      UPDATE assets 
      SET name = $1, category = $2, room = $3, price = $4, condition = $5
      WHERE code = $6
      RETURNING *
    `;
    const result = await db.query(updateQuery, [name, category, room, parseFloat(price) || 0, condition, req.params.code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aset tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Decommission Asset (Soft Delete / Archive)
app.delete('/api/assets/:code', async (req, res) => {
  try {
    const result = await db.query("UPDATE assets SET status = 'archived' WHERE code = $1 RETURNING *", [req.params.code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aset tidak ditemukan' });
    }
    res.json({ message: 'Aset berhasil diafkirkan', asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Room Directory & KIR
app.get('/api/rooms', async (req, res) => {
  try {
    const roomsRes = await db.query('SELECT * FROM rooms ORDER BY id ASC');
    const rooms = await Promise.all(roomsRes.rows.map(async (room) => {
      const assetsCountRes = await db.query('SELECT COUNT(*) as asset_count FROM assets WHERE room = $1 AND status = $2', [room.name, 'active']);
      return {
        ...room,
        asset_count: parseInt(assetsCountRes.rows[0].asset_count, 10)
      };
    }));
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Loans (Peminjaman & Mutasi)
app.get('/api/loans', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM loans ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/loans', async (req, res) => {
  try {
    const { loan_code, asset_name, borrower, start_date, end_date } = req.body;
    const code = loan_code || `PINJ-2026-0${Math.floor(Math.random() * 80 + 50)}`;
    const query = `
      INSERT INTO loans (loan_code, asset_name, borrower, start_date, end_date, status)
      VALUES ($1, $2, $3, $4, $5, 'Dipinjam')
      RETURNING *
    `;
    const result = await db.query(query, [code, asset_name, borrower, start_date, end_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/loans/:id/return', async (req, res) => {
  try {
    const result = await db.query("UPDATE loans SET status = 'Kembali' WHERE id = $1 RETURNING *", [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Work Orders (Servis & Kalibrasi)
app.get('/api/work-orders', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM work_orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/work-orders', async (req, res) => {
  try {
    const { wo_code, item_name, vendor, estimated_cost, target_date } = req.body;
    const code = wo_code || `WO-2026-0${Math.floor(Math.random() * 80 + 95)}`;
    const query = `
      INSERT INTO work_orders (wo_code, item_name, vendor, estimated_cost, target_date, status)
      VALUES ($1, $2, $3, $4, $5, 'Pengerjaan')
      RETURNING *
    `;
    const result = await db.query(query, [code, item_name, vendor, parseFloat(estimated_cost) || 0, target_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(` SARPRAS ACADEMIA - BACKEND APPLICATION SERVER`);
    console.log(` Environment: Pemrograman Web 2 (Universitas Pamulang)`);
    console.log(` Running on : http://localhost:${PORT}`);
    console.log(` PostgreSQL : 127.0.0.1:5433 (Database: "Sarpras Academia - pemweb2")`);
    console.log(`================================================================`);
  });
}

module.exports = app;
