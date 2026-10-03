-- ============================================================================
-- SARPRAS ACADEMIA - SCHEMA DEFINITION (POSTGRESQL 16)
-- Database: "Sarpras Academia - pemweb2"
-- ============================================================================

-- 1. Users & Authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(30) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 3. Campus Rooms & Facilities Directory
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    building VARCHAR(150) NOT NULL,
    area VARCHAR(100),
    pic_name VARCHAR(100),
    pic_nip VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Master Data Assets (Barang Milik Institusi / BMN)
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    room VARCHAR(150) NOT NULL,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0,
    condition VARCHAR(50) NOT NULL DEFAULT 'Baik',
    serial_number VARCHAR(100),
    model VARCHAR(150),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Asset Loans & Circulation (Peminjaman Fasilitas)
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    loan_code VARCHAR(50) UNIQUE NOT NULL,
    asset_name VARCHAR(255) NOT NULL,
    borrower VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Dipinjam',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Maintenance & Work Orders (Servis & Kalibrasi)
CREATE TABLE IF NOT EXISTS work_orders (
    id SERIAL PRIMARY KEY,
    wo_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    vendor VARCHAR(150) NOT NULL,
    estimated_cost NUMERIC(15, 2) NOT NULL DEFAULT 0,
    target_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pengerjaan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SEED INITIAL DATA
-- ============================================================================

-- Admin User (Password: admin123)
INSERT INTO users (username, password_hash, full_name, role) VALUES 
('admin', 'admin123', 'Haidar Reyhan (Biro Sarpras UNPAM)', 'Administrator')
ON CONFLICT (username) DO NOTHING;

-- Preload Categories
INSERT INTO categories (name, description) VALUES 
('Laboratorium', 'Peralatan instrumen riset dan laboratorium terpadu'),
('IT', 'Infrastruktur server, jaringan komunikasi, dan data center'),
('Ruang Kuliah', 'Sarana teknologi kelas smart classroom dan multimedia'),
('Fasilitas', 'Utilitas pendingin sentral, genset, dan tata ruang kampus')
ON CONFLICT (name) DO NOTHING;

-- Preload Rooms
INSERT INTO rooms (name, building, area, pic_name, pic_nip) VALUES 
('Lab Kimia Terpadu R.302', 'Gedung Riset Terpadu Lt. 3', '128 m2 (Kapasitas 40 Peneliti)', 'Dr. Retno Lestari, M.Si', '19820514 200812 2 001'),
('Data Center Rektorat Lt. 1', 'Gedung Rektorat Lt. 1', '85 m2 (Tier-3 Standard, Suhu 18 C)', 'Ir. Faisal Akbar, M.Kom', '19790820 200501 1 003'),
('Smart Classroom 401', 'Gedung Kuliah Bersama Lt. 4', '90 m2 (Kapasitas 60 Mahasiswa)', 'Dr. Budi Santoso, M.Pd', '19810217 200701 1 002'),
('Lab Riset Biomedik R.105', 'Gedung Riset Terpadu Lt. 1', '110 m2 (Cleanroom Class 10.000)', 'Dr. Nurul Hidayah, Sp.PK', '19850412 201101 2 004'),
('Workshop Mesin FT Lt. 1', 'Gedung Teknik Mesin Lt. 1', '240 m2 (Kapasitas 50 Mahasiswa)', 'Ir. Taufik Hidayat, M.T.', '19751108 200003 1 001'),
('Auditorium Graha Nusantara', 'Gedung Rektorat Lt. 2', '850 m2 (Kapasitas 1.200 Kursi Acara)', 'Biro Umum & Rumah Tangga', '19760312 200112 1 002')
ON CONFLICT (name) DO NOTHING;

-- Preload Master Assets
INSERT INTO assets (code, name, category, room, price, condition, serial_number, model) VALUES 
('AST-LAB-2026-089', 'Spektrofotometer UV-Vis Shimadzu UV-2600i', 'Laboratorium', 'Lab Kimia Terpadu R.302', 285000000, 'Perawatan', '893-KM-2026-X901', 'Shimadzu UV-2600i'),
('AST-TIK-2025-014', 'Dell PowerEdge R750 Compute Server Node', 'IT', 'Data Center Rektorat Lt. 1', 180000000, 'Baik', 'DELL-R750-SRV-091', 'Dell EMC PowerEdge R750'),
('AST-MED-2024-118', 'Mikroskop Fluoresensi Leica DM2500 Plan-Apo', 'Laboratorium', 'Lab Riset Biomedik R.105', 310000000, 'Perawatan', 'LCA-DM25-9921', 'Leica DM2500 Plan'),
('AST-TEK-2025-055', 'Universal Testing Machine Shimadzu 100kN', 'Laboratorium', 'Workshop Mesin FT Lt. 1', 520000000, 'Rusak Berat', 'SHM-UTM-100K-08', 'Shimadzu AGX-V 100kN'),
('AST-FAC-2023-008', 'Chiller HVAC Central Daikin 40 TR Modular', 'Fasilitas', 'Auditorium Graha Nusantara', 425000000, 'Perawatan', 'DKN-40TR-CENT-02', 'Daikin Modular Water Chiller'),
('AST-KLS-2025-032', 'Interactive Smart Board Touch 85 Inch 4K', 'Ruang Kuliah', 'Smart Classroom 401', 85000000, 'Baik', 'SMR-85IN-4K-2025', 'Newline Interactive 85 4K'),
('AST-LAB-2024-042', 'High Performance Liquid Chromatography (HPLC)', 'Laboratorium', 'Lab Kimia Terpadu R.302', 480000000, 'Baik', 'WTR-HPLC-99210', 'Waters Alliance e2695'),
('AST-TIK-2026-002', 'Cisco Catalyst 9300 Core Switch 48-Port PoE+', 'IT', 'Data Center Rektorat Lt. 1', 95000000, 'Baik', 'CSC-C9300-48P-ID', 'Cisco Catalyst 9300'),
('AST-KLS-2024-077', 'Sistem Proyektor Laser Epson 4K 6000 ANSI', 'Ruang Kuliah', 'Smart Classroom 401', 42000000, 'Baik', 'EPS-L6000-4K-077', 'Epson EB-L630U Laser'),
('AST-MED-2025-029', 'Refrigerated Centrifuge 15.000 RPM Sorvall', 'Laboratorium', 'Lab Riset Biomedik R.105', 165000000, 'Baik', 'TF-SRV-15K-029', 'Thermo Scientific Sorvall Legend'),
('AST-TEK-2023-019', 'Mesin Bubut CNC Mini Precision Lathe Trainer', 'Laboratorium', 'Workshop Mesin FT Lt. 1', 215000000, 'Baik', 'CNC-LTH-FT-2023', 'Optimum CNC L28HS'),
('AST-FAC-2025-104', 'Sound System Array & Audio Mixer 32-Channel', 'Fasilitas', 'Auditorium Graha Nusantara', 125000000, 'Baik', 'YMH-TF5-MIX-32', 'Yamaha TF5 Digital Console')
ON CONFLICT (code) DO NOTHING;

-- Preload Loans
INSERT INTO loans (loan_code, asset_name, borrower, start_date, end_date, status) VALUES 
('PINJ-2026-001', 'Proyektor Laser Epson 4K 6000 ANSI', 'Himpunan Mahasiswa TI', '2026-03-12', '2026-03-15', 'Dipinjam'),
('PINJ-2026-002', 'Sound System Portable Yamaha StagePas', 'BEM Fakultas Ilmu Komputer', '2026-03-14', '2026-03-16', 'Dipinjam')
ON CONFLICT (loan_code) DO NOTHING;

-- Preload Work Orders
INSERT INTO work_orders (wo_code, item_name, vendor, estimated_cost, target_date, status) VALUES 
('WO-2026-001', 'Spektrofotometer UV-Vis Shimadzu (Lab R.302)', 'PT Dynatech Instrumentasi', 4500000, '2026-03-25', 'Pengerjaan'),
('WO-2026-002', 'Chiller HVAC Central Daikin 40 TR (Auditorium)', 'CV Sejuk Mandiri Teknik', 8200000, '2026-03-28', 'Pengerjaan')
ON CONFLICT (wo_code) DO NOTHING;
