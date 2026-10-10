// ==========================================================================
// SARPRAS ACADEMIA - CLIENT-SIDE JAVASCRIPT APPLICATION ENGINE
// ==========================================================================

// Mock State Database (Preloaded with Realistic Academic Assets)
let inventoryData = [
  { code: "AST-LAB-2026-089", name: "Spektrofotometer UV-Vis Shimadzu UV-2600i", category: "Laboratorium", room: "Lab Kimia Terpadu R.302", price: 285000000, condition: "Perawatan", serial: "893-KM-2026-X901", model: "Shimadzu UV-2600i" },
  { code: "AST-TIK-2025-014", name: "Dell PowerEdge R750 Compute Server Node", category: "IT", room: "Data Center Rektorat Lt. 1", price: 180000000, condition: "Baik", serial: "DELL-R750-SRV-091", model: "Dell EMC PowerEdge R750" },
  { code: "AST-MED-2024-118", name: "Mikroskop Fluoresensi Leica DM2500 Plan-Apo", category: "Laboratorium", room: "Lab Riset Biomedik R.105", price: 310000000, condition: "Perawatan", serial: "LCA-DM25-9921", model: "Leica DM2500 Plan" },
  { code: "AST-TEK-2025-055", name: "Universal Testing Machine Shimadzu 100kN", category: "Laboratorium", room: "Workshop Mesin FT Lt. 1", price: 520000000, condition: "Rusak Berat", serial: "SHM-UTM-100K-08", model: "Shimadzu AGX-V 100kN" },
  { code: "AST-FAC-2023-008", name: "Chiller HVAC Central Daikin 40 TR Modular", category: "Fasilitas", room: "Auditorium Graha Nusantara", price: 425000000, condition: "Perawatan", serial: "DKN-40TR-CENT-02", model: "Daikin Modular Water Chiller" },
  { code: "AST-KLS-2025-032", name: "Interactive Smart Board Touch 85 Inch 4K", category: "Ruang Kuliah", room: "Smart Classroom 401", price: 85000000, condition: "Baik", serial: "SMR-85IN-4K-2025", model: "Newline Interactive 85\" 4K" },
  { code: "AST-LAB-2024-042", name: "High Performance Liquid Chromatography (HPLC)", category: "Laboratorium", room: "Lab Kimia Terpadu R.302", price: 480000000, condition: "Baik", serial: "WTR-HPLC-99210", model: "Waters Alliance e2695" },
  { code: "AST-TIK-2026-002", name: "Cisco Catalyst 9300 Core Switch 48-Port PoE+", category: "IT", room: "Data Center Rektorat Lt. 1", price: 95000000, condition: "Baik", serial: "CSC-C9300-48P-ID", model: "Cisco Catalyst 9300" },
  { code: "AST-KLS-2024-077", name: "Sistem Proyektor Laser Epson 4K 6000 ANSI", category: "Ruang Kuliah", room: "Smart Classroom 401", price: 42000000, condition: "Baik", serial: "EPS-L6000-4K-077", model: "Epson EB-L630U Laser" },
  { code: "AST-MED-2025-029", name: "Refrigerated Centrifuge 15.000 RPM Sorvall", category: "Laboratorium", room: "Lab Riset Biomedik R.105", price: 165000000, condition: "Baik", serial: "TF-SRV-15K-029", model: "Thermo Scientific Sorvall Legend" },
  { code: "AST-TEK-2023-019", name: "Mesin Bubut CNC Mini Precision Lathe Trainer", category: "Laboratorium", room: "Workshop Mesin FT Lt. 1", price: 215000000, condition: "Baik", serial: "CNC-LTH-FT-2023", model: "Optimum CNC L28HS" },
  { code: "AST-FAC-2025-104", name: "Sound System Array & Audio Mixer 32-Channel", category: "Fasilitas", room: "Auditorium Graha Nusantara", price: 125000000, condition: "Baik", serial: "YMH-TF5-MIX-32", model: "Yamaha TF5 Digital Console" }
];

// Room metadata for KIR and directory synchronization
const roomMetadata = {
  "Lab Kimia Terpadu R.302": {
    building: "Gedung Riset Terpadu Lt. 3",
    area: "128 m² (Kapasitas 40 Peneliti / Mahasiswa)",
    pj: "Dr. Retno Lestari, M.Si",
    nip: "19820514 200812 2 001"
  },
  "Data Center Rektorat Lt. 1": {
    building: "Gedung Rektorat Lt. 1",
    area: "85 m² (Tier-3 Standard, Suhu Terkendali 18°C)",
    pj: "Ir. Faisal Akbar, M.Kom",
    nip: "19790820 200501 1 003"
  },
  "Smart Classroom 401": {
    building: "Gedung Kuliah Bersama Lt. 4",
    area: "90 m² (Kapasitas 60 Mahasiswa)",
    pj: "Dr. Budi Santoso, M.Pd",
    nip: "19810217 200701 1 002"
  },
  "Lab Riset Biomedik R.105": {
    building: "Gedung Riset Terpadu Lt. 1",
    area: "110 m² (Cleanroom Class 10.000)",
    pj: "Dr. Nurul Hidayah, Sp.PK",
    nip: "19850412 201101 2 004"
  },
  "Workshop Mesin FT Lt. 1": {
    building: "Gedung Teknik Mesin Lt. 1",
    area: "240 m² (Kapasitas 50 Mahasiswa Praktik)",
    pj: "Ir. Taufik Hidayat, M.T.",
    nip: "19751108 200003 1 001"
  },
  "Auditorium Graha Nusantara": {
    building: "Gedung Rektorat Lt. 2",
    area: "850 m² (Kapasitas 1.200 Kursi Acara)",
    pj: "Biro Umum & Rumah Tangga",
    nip: "19760312 200112 1 002"
  }
};

// Pagination & Sorting State
let currentPage = 1;
const pageSize = 5;
let currentSortColumn = 'code';
let currentSortOrder = 'asc'; // 'asc' or 'desc'
let currentSelectedAfkirIndex = null;
let currentInspectedAssetCode = null;

// Chart Instances
let growthChartInstance = null;
let categoryChartInstance = null;

// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Initialization (Default Light)
  const savedTheme = localStorage.getItem('sarpras_theme') || 'light';
  setTheme(savedTheme);

  // 3. Render Master Data Table & Pagination
  renderInventoryTable();
  renderLoansTable();
  renderWorkOrdersTable();
  updateRoomsDirectoryView();

  // 4. Connect and synchronize with Backend REST API if running on server
  syncWithBackend();

  // 5. Initialize KIR Table for Default or URL-selected Room
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam && roomMetadata[roomParam]) {
    const selector = document.getElementById('kirRoomSelector');
    if (selector) selector.value = roomParam;
    updateKirRoomView(roomParam);
  } else {
    updateKirRoomView("Lab Kimia Terpadu R.302");
  }

  // 6. Navigation Tab Listeners (Only when data-target is defined, else normal multi-page link)
  const navLinks = document.querySelectorAll('.nav-item-link');
  navLinks.forEach(link => {
    const targetViewId = link.getAttribute('data-target');
    if (targetViewId) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToTab(targetViewId);
      });
    }
  });

  // Quick CTA in sidebar - opens fast registration modal
  const btnSidebarRegister = document.getElementById('btnSidebarRegister');
  if (btnSidebarRegister) {
    btnSidebarRegister.addEventListener('click', () => {
      openCreateAssetModal();
    });
  }

  // 7. Theme Toggle Button
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      triggerToast(`Tampilan diubah ke Mode ${next === 'light' ? 'Terang' : 'Gelap'}`);
    });
  }

  // 8. Sidebar Collapse & Expand (Floating Tab on Sidebar Border - SuperApps Portal & Talent Pool Standard)
  const sidebarRail = document.getElementById('sidebarRail');
  const btnDesktopRailToggle = document.getElementById('btnDesktopRailToggle');

  // Restore persisted sidebar state from localStorage
  if (sidebarRail && localStorage.getItem('sarpras_sidebar_collapsed') === 'true') {
    sidebarRail.classList.add('collapsed');
    if (btnDesktopRailToggle) {
      btnDesktopRailToggle.setAttribute('title', 'Rentangkan Menu Sidebar (>)');
      btnDesktopRailToggle.setAttribute('aria-label', 'Rentangkan Menu Sidebar');
    }
  }

  function toggleSidebar() {
    if (!sidebarRail) return;
    sidebarRail.classList.toggle('collapsed');
    const isCollapsed = sidebarRail.classList.contains('collapsed');

    // Persist preference across pages
    localStorage.setItem('sarpras_sidebar_collapsed', isCollapsed ? 'true' : 'false');

    if (btnDesktopRailToggle) {
      btnDesktopRailToggle.setAttribute('title', isCollapsed ? 'Rentangkan Menu Sidebar (>)' : 'Ciutkan Menu Sidebar (<)');
      btnDesktopRailToggle.setAttribute('aria-label', isCollapsed ? 'Rentangkan Menu Sidebar' : 'Ciutkan Menu Sidebar');
    }

    // Trigger chart resize safely with debounce
    setTimeout(() => {
      if (typeof growthChartInstance !== 'undefined' && growthChartInstance) growthChartInstance.resize();
      if (typeof categoryChartInstance !== 'undefined' && categoryChartInstance) categoryChartInstance.resize();
    }, 250);
  }

  if (btnDesktopRailToggle) btnDesktopRailToggle.addEventListener('click', toggleSidebar);

  // 9. Mobile Drawer Navigation
  const btnMobileNavToggle = document.getElementById('btnMobileNavToggle');
  if (btnMobileNavToggle && sidebarRail) {
    btnMobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebarRail.classList.toggle('mobile-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (sidebarRail && sidebarRail.classList.contains('mobile-open') && !sidebarRail.contains(e.target)) {
      sidebarRail.classList.remove('mobile-open');
    }
  });

  // 10. User Profile Dropdown Toggle
  const btnHeaderProfile = document.getElementById('btnHeaderProfile');
  const dropdownProfile = document.getElementById('dropdownProfile');

  if (btnHeaderProfile && dropdownProfile) {
    btnHeaderProfile.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownProfile.classList.toggle('show');
    });
  }

  document.addEventListener('click', () => {
    if (dropdownProfile) dropdownProfile.classList.remove('show');
  });

  // Modal Backdrop Click Closes Dialog
  document.querySelectorAll('.modal-overlay-bg').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // 11. Global Keyboard Shortcuts (Ctrl + K to Search, Esc to Dismiss)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('mainGlobalSearch');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
        triggerToast('Bilah pencarian cepat aktif');
      }
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay-bg.open').forEach(modal => {
        closeModal(modal.id);
      });
      if (dropdownProfile) dropdownProfile.classList.remove('show');
    }
  });

  // Header Search Input (Press Enter -> Filters Master Data)
  const mainGlobalSearch = document.getElementById('mainGlobalSearch');
  if (mainGlobalSearch) {
    mainGlobalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = mainGlobalSearch.value.trim();
        navigateToTab('view-data-master');
        const tableFilterInput = document.getElementById('tableFilterInput');
        if (tableFilterInput) {
          tableFilterInput.value = val;
          currentPage = 1;
          renderInventoryTable();
          triggerToast(`Menyaring data dengan kata kunci: "${val}"`);
        }
      }
    });
  }

  // 12. Table Filter Event Listeners
  const tableFilterInput = document.getElementById('tableFilterInput');
  const selectKategoriFilter = document.getElementById('selectKategoriFilter');
  const selectKondisiFilter = document.getElementById('selectKondisiFilter');

  if (tableFilterInput) {
    tableFilterInput.addEventListener('input', () => {
      currentPage = 1;
      renderInventoryTable();
    });
  }
  if (selectKategoriFilter) {
    selectKategoriFilter.addEventListener('change', () => {
      currentPage = 1;
      renderInventoryTable();
    });
  }
  if (selectKondisiFilter) {
    selectKondisiFilter.addEventListener('change', () => {
      currentPage = 1;
      renderInventoryTable();
    });
  }

  // Master Checkbox Logic
  const masterCheckbox = document.getElementById('masterCheckbox');
  if (masterCheckbox) {
    masterCheckbox.addEventListener('change', () => {
      const rowBoxes = document.querySelectorAll('.table-row-cb');
      rowBoxes.forEach(cb => cb.checked = masterCheckbox.checked);
      if (masterCheckbox.checked) {
        triggerToast(`${rowBoxes.length} sarana pada halaman ini dipilih`);
      }
    });
  }

  // 13. Form Live Synchronizer to Thermal Sticker Barcode Tag
  const formInputCode = document.getElementById('formInputCode');
  const formInputName = document.getElementById('formInputName');
  const formInputRoom = document.getElementById('formInputRoom');
  const formInputPrice = document.getElementById('formInputPrice');
  const stickerCodeDisplay = document.getElementById('stickerCodeDisplay');
  const stickerNameDisplay = document.getElementById('stickerNameDisplay');
  const stickerRoomDisplay = document.getElementById('stickerRoomDisplay');
  const stickerBarcodeText = document.getElementById('stickerBarcodeText');
  const formPricePreviewFormatted = document.getElementById('formPricePreviewFormatted');

  if (formInputCode) {
    formInputCode.addEventListener('input', () => {
      const val = formInputCode.value || 'AST-LAB-2026-090';
      if (stickerCodeDisplay) stickerCodeDisplay.textContent = val;
      if (stickerBarcodeText) stickerBarcodeText.textContent = val;
    });
  }

  if (formInputName && stickerNameDisplay) {
    formInputName.addEventListener('input', () => {
      stickerNameDisplay.textContent = formInputName.value || 'Nama Peralatan Sarpras';
    });
  }

  if (formInputRoom && stickerRoomDisplay) {
    formInputRoom.addEventListener('change', () => {
      stickerRoomDisplay.textContent = formInputRoom.value;
    });
  }

  if (formInputPrice && formPricePreviewFormatted) {
    formInputPrice.addEventListener('input', () => {
      const val = Number(formInputPrice.value) || 0;
      formPricePreviewFormatted.textContent = 'Rp ' + val.toLocaleString('id-ID') + ',00';
    });
  }
});

// ==========================================================================
// REST API BACKEND SYNCHRONIZATION ENGINE
// ==========================================================================
async function syncWithBackend() {
  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    try {
      // 1. Sync Assets
      const resAssets = await fetch('/api/assets');
      if (resAssets.ok) {
        const liveAssets = await resAssets.json();
        if (Array.isArray(liveAssets) && liveAssets.length > 0) {
          inventoryData = liveAssets.map(item => ({
            code: item.code,
            name: item.name,
            category: item.category,
            room: item.room,
            price: Number(item.price),
            condition: item.condition,
            serial: item.serial_number || item.serial || '-',
            model: item.model || '-'
          }));
          renderInventoryTable();
          const activeRoom = document.getElementById('kirCurrentRoomName')?.textContent || "Lab Kimia Terpadu R.302";
          updateKirRoomView(activeRoom);
          updateRoomsDirectoryView();
        }
      }

      // 2. Sync Loans
      const resLoans = await fetch('/api/loans');
      if (resLoans.ok) {
        const liveLoans = await resLoans.json();
        if (Array.isArray(liveLoans) && liveLoans.length > 0) {
          loansData = liveLoans;
          renderLoansTable();
        }
      }

      // 3. Sync Work Orders
      const resWo = await fetch('/api/work-orders');
      if (resWo.ok) {
        const liveWo = await resWo.json();
        if (Array.isArray(liveWo) && liveWo.length > 0) {
          workOrdersData = liveWo;
          renderWorkOrdersTable();
        }
      }

    } catch (e) {
      console.info('Operating in client-side mock fallback mode:', e.message);
    }
  }
}

// ==========================================================================
// THEME SWITCHER
// ==========================================================================
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sarpras_theme', theme);
  const sun = document.getElementById('themeIconSun');
  const moon = document.getElementById('themeIconMoon');
  if (sun && moon) {
    if (theme === 'dark') {
      sun.style.display = 'block';
      moon.style.display = 'none';
    } else {
      sun.style.display = 'none';
      moon.style.display = 'block';
    }
  }
  // Re-render chart color options on theme switch
  initCharts();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

// ==========================================================================
// INTERACTIVE CHART.JS INTEGRATION
// ==========================================================================
function initCharts() {
  if (typeof Chart === 'undefined') return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#9CA3AF' : '#4B5563';
  const titleColor = isDark ? '#F9FAFB' : '#111827';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0';

  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.font.size = 11;

  // 1. Asset Valuation & Growth Combo Chart
  const ctxGrowth = document.getElementById('assetGrowthChart');
  if (ctxGrowth) {
    if (growthChartInstance) growthChartInstance.destroy();
    
    growthChartInstance = new Chart(ctxGrowth, {
      type: 'bar',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026 (Berjalan)'],
        datasets: [
          {
            type: 'line',
            label: 'Valuasi Kumulatif (Miliar Rp)',
            data: [2.45, 3.10, 3.85, 4.32, 4.85],
            borderColor: isDark ? '#3B82F6' : '#1D4ED8',
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(29, 78, 216, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: isDark ? '#3B82F6' : '#1D4ED8',
            pointRadius: 4,
            pointHoverRadius: 6,
            yAxisID: 'yValuasi'
          },
          {
            type: 'bar',
            label: 'Pengadaan Unit Baru',
            data: [120, 185, 210, 245, 182],
            backgroundColor: isDark ? 'rgba(16, 185, 129, 0.45)' : 'rgba(5, 150, 105, 0.35)',
            borderColor: isDark ? '#10B981' : '#059669',
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'yUnit'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, boxWidth: 12, font: { weight: 600 } }
          },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: titleColor,
            bodyColor: textColor,
            borderColor: tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                if (context.dataset.yAxisID === 'yValuasi') {
                  return ` Valuasi: Rp ${context.raw} Miliar`;
                }
                return ` Pengadaan: ${context.raw} Unit Baru`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { weight: 600 } }
          },
          yValuasi: {
            type: 'linear',
            position: 'left',
            grid: { color: gridColor },
            ticks: { color: textColor, callback: value => 'Rp ' + value + ' M' }
          },
          yUnit: {
            type: 'linear',
            position: 'right',
            grid: { display: false },
            ticks: { color: textColor, callback: value => value + ' Unit' }
          }
        }
      }
    });
  }

  // 2. Category Distribution Doughnut Chart (Dynamic from Live Inventory Data)
  const ctxCategory = document.getElementById('categoryDistributionChart');
  if (ctxCategory) {
    if (categoryChartInstance) categoryChartInstance.destroy();

    // Dynamically calculate category counts from live inventoryData
    const catMap = {};
    inventoryData.forEach(item => {
      const c = item.category || 'Lain-lain';
      catMap[c] = (catMap[c] || 0) + 1;
    });

    const catLabels = Object.keys(catMap);
    const catCounts = Object.values(catMap);
    const totalItems = inventoryData.length || 1;

    categoryChartInstance = new Chart(ctxCategory, {
      type: 'doughnut',
      data: {
        labels: catLabels.length > 0 ? catLabels : ['Peralatan Laboratorium', 'Infrastruktur IT', 'Sarana Ruang Kuliah'],
        datasets: [{
          data: catCounts.length > 0 ? catCounts : [5, 4, 3],
          backgroundColor: isDark 
            ? ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']
            : ['#1E3A8A', '#059669', '#D97706', '#6366F1', '#DB2777'],
          borderWidth: 2,
          borderColor: isDark ? '#111827' : '#FFFFFF',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor, boxWidth: 10, padding: 12, font: { weight: 600 } }
          },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: titleColor,
            bodyColor: textColor,
            borderColor: tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                const pct = ((context.raw / totalItems) * 100).toFixed(1);
                return ` ${context.label}: ${context.raw} Unit (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }
}

// ==========================================================================
// REAL TAB NAVIGATION SYSTEM
// ==========================================================================
const breadcrumbTitles = {
  'view-dashboard': 'EXECUTIVE DASHBOARD',
  'view-data-master': 'MASTER DATA SARPRAS',
  'view-form-aset': 'REGISTRASI ASET BARU',
  'view-laporan': 'PUSAT LAPORAN & KIR',
  'view-peminjaman': 'PEMINJAMAN & MUTASI FASILITAS',
  'view-maintenance': 'SERVIS & KALIBRASI ALAT',
  'view-ruangan': 'DIREKTORI RUANGAN & GEDUNG'
};

function navigateToTab(tabId) {
  const allPanes = document.querySelectorAll('.tab-content-view');
  allPanes.forEach(pane => pane.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  const navLinks = document.querySelectorAll('.nav-item-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-target') === tabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const headerBreadcrumbTitle = document.getElementById('headerBreadcrumbTitle');
  if (headerBreadcrumbTitle && breadcrumbTitles[tabId]) {
    headerBreadcrumbTitle.textContent = breadcrumbTitles[tabId];
  }

  // If opening dashboard, trigger chart resize for smoothness
  if (tabId === 'view-dashboard') {
    if (growthChartInstance) growthChartInstance.resize();
    if (categoryChartInstance) categoryChartInstance.resize();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// MASTER DATA TABLE SORTING, FILTERING & REAL PAGINATION
// ==========================================================================
function toggleSort(field) {
  if (currentSortColumn === field) {
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn = field;
    currentSortOrder = 'asc';
  }

  // Update sort indicators in table headers
  const fields = ['code', 'name', 'category', 'room', 'price', 'condition'];
  fields.forEach(f => {
    const el = document.getElementById(`sortIndicator-${f}`);
    if (el) {
      if (f === currentSortColumn) {
        el.textContent = currentSortOrder === 'asc' ? '▲' : '▼';
        el.style.color = 'var(--color-accent-cobalt)';
      } else {
        el.textContent = '↕';
        el.style.color = 'var(--color-text-muted)';
      }
    }
  });

  renderInventoryTable();
  triggerToast(`Data diurutkan berdasarkan ${field.toUpperCase()} (${currentSortOrder.toUpperCase()})`);
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventoryListTbody');
  if (!tbody) return;

  const filterQuery = (document.getElementById('tableFilterInput')?.value || '').toLowerCase();
  const filterKat = document.getElementById('selectKategoriFilter')?.value || 'all';
  const filterKon = document.getElementById('selectKondisiFilter')?.value || 'all';

  // 1. Filter
  let result = inventoryData.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(filterQuery) || item.code.toLowerCase().includes(filterQuery) || item.room.toLowerCase().includes(filterQuery);
    const matchesKat = filterKat === 'all' || item.category === filterKat;
    const matchesKon = filterKon === 'all' || item.condition === filterKon;
    return matchesQuery && matchesKat && matchesKon;
  });

  // 2. Sort
  result.sort((a, b) => {
    let valA = a[currentSortColumn];
    let valB = b[currentSortColumn];
    if (typeof valA === 'string') {
      const comp = valA.localeCompare(valB);
      return currentSortOrder === 'asc' ? comp : -comp;
    } else {
      return currentSortOrder === 'asc' ? valA - valB : valB - valA;
    }
  });

  // 3. Paginate
  const totalItems = result.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = result.slice(startIndex, startIndex + pageSize);

  tbody.innerHTML = '';

  if (pageItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 32px; color: var(--color-text-muted);">
          Tidak ada data sarana yang sesuai dengan filter pencarian.
        </td>
      </tr>
    `;
  } else {
    pageItems.forEach((item, indexInPage) => {
      const globalIndex = inventoryData.findIndex(x => x.code === item.code);
      let badgeClass = 'normal';
      if (item.condition === 'Perawatan') badgeClass = 'warning';
      if (item.condition === 'Rusak Berat') badgeClass = 'critical';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="table-row-cb">
        </td>
        <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${item.code}</td>
        <td style="font-weight: 600;">${item.name}</td>
        <td>${item.category}</td>
        <td style="color: var(--color-text-secondary);">${item.room}</td>
        <td class="font-mono">Rp ${item.price.toLocaleString('id-ID')}</td>
        <td><span class="status-badge-pill ${badgeClass} font-mono">${item.condition}</span></td>
        <td style="text-align: right; white-space: nowrap; padding-right: 24px;">
          <div class="enterprise-action-group">
            <button class="table-action-icon-btn btn-view" title="Detail Spesifikasi Aset" onclick="openAssetDetailModal('${item.code}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="table-action-icon-btn btn-edit" title="Ubah Data Aset" onclick="openAssetEditModal('${item.code}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </button>
            <button class="table-action-icon-btn btn-delete" title="Afkirkan Aset BMN" onclick="openDecommissionModal('${item.code}', '${item.name}', ${globalIndex})">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 4. Update Header Stats
  const tableFilterStats = document.getElementById('tableFilterStats');
  if (tableFilterStats) {
    tableFilterStats.textContent = `Menampilkan ${startIndex + 1} - ${Math.min(startIndex + pageSize, totalItems)} dari ${totalItems} data disaring`;
  }
  const summaryTotalAset = document.getElementById('summaryTotalAset');
  if (summaryTotalAset) summaryTotalAset.textContent = inventoryData.length;
  const countBaik = inventoryData.filter(x => x.condition === 'Baik').length;
  const countPerawatan = inventoryData.filter(x => x.condition !== 'Baik').length;
  const summaryBaik = document.getElementById('summaryBaikAset');
  if (summaryBaik) summaryBaik.textContent = countBaik;
  const summaryPerawatan = document.getElementById('summaryPerawatanAset');
  if (summaryPerawatan) summaryPerawatan.textContent = countPerawatan;
  const sidebarAssetCount = document.getElementById('sidebarAssetCount');
  if (sidebarAssetCount) sidebarAssetCount.textContent = inventoryData.length;

  // Dynamic Dashboard Valuation & Integrity updates from live inventoryData
  const totalValuation = inventoryData.reduce((acc, x) => acc + Number(x.price || 0), 0);
  const elValuation = document.getElementById('dashboardValuationTotal');
  if (elValuation) elValuation.textContent = 'Rp ' + totalValuation.toLocaleString('id-ID');

  const elSubCount = document.getElementById('dashboardAssetCountSub');
  if (elSubCount) elSubCount.textContent = `${inventoryData.length} unit sarana BMN terdaftar di sistem`;

  const totalInv = inventoryData.length || 1;
  const countRusak = inventoryData.filter(x => x.condition === 'Rusak Berat').length;
  const countRawat = inventoryData.filter(x => x.condition === 'Perawatan').length;
  const pctPrima = ((countBaik / totalInv) * 100).toFixed(1);

  const elPct = document.getElementById('dashboardConditionPct');
  if (elPct) elPct.textContent = pctPrima + '%';
  const elBar = document.getElementById('dashboardConditionBar');
  if (elBar) elBar.style.width = pctPrima + '%';

  const elBaik = document.getElementById('dashboardConditionBaik');
  if (elBaik) elBaik.textContent = `${countBaik} Prima`;
  const elRawat = document.getElementById('dashboardConditionPerawatan');
  if (elRawat) elRawat.textContent = `${countRawat} Pemeliharaan`;
  const elRusak = document.getElementById('dashboardConditionRusak');
  if (elRusak) elRusak.textContent = `${countRusak} Afkir`;

  const showingRecordsText = document.getElementById('showingRecordsText');
  if (showingRecordsText) {
    showingRecordsText.textContent = `Halaman ${currentPage} dari ${totalPages} (Total ${totalItems} record terdaftar)`;
  }

  // 5. Render Pagination Controls
  renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
  const container = document.getElementById('inventoryPaginationControls');
  if (!container) return;

  container.innerHTML = '';

  // Prev Button
  const btnPrev = document.createElement('button');
  btnPrev.className = 'btn-page-number';
  btnPrev.innerHTML = '&lt;';
  btnPrev.disabled = currentPage === 1;
  btnPrev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderInventoryTable();
    }
  };
  container.appendChild(btnPrev);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const btnPage = document.createElement('button');
    btnPage.className = `btn-page-number ${i === currentPage ? 'active' : ''}`;
    btnPage.textContent = i;
    btnPage.onclick = () => {
      currentPage = i;
      renderInventoryTable();
    };
    container.appendChild(btnPage);
  }

  // Next Button
  const btnNext = document.createElement('button');
  btnNext.className = 'btn-page-number';
  btnNext.innerHTML = '&gt;';
  btnNext.disabled = currentPage === totalPages;
  btnNext.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderInventoryTable();
    }
  };
  container.appendChild(btnNext);
}

// ==========================================================================
// ASSET DETAIL & EDIT MODALS
// ==========================================================================
function openAssetDetailModal(code) {
  const item = inventoryData.find(x => x.code === code);
  if (!item) return;
  currentInspectedAssetCode = code;

  const content = document.getElementById('modalAssetDetailContent');
  if (content) {
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-whisper);">
        <div>
          <span class="status-badge-pill ${item.condition === 'Baik' ? 'normal' : (item.condition === 'Perawatan' ? 'warning' : 'critical')} font-mono" style="margin-bottom: 6px;">Kondisi: ${item.condition}</span>
          <h2 style="font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${item.name}</h2>
          <span class="font-mono" style="font-size: 12px; font-weight: 700; color: var(--color-accent-cobalt);">${item.code}</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 11px; color: var(--color-text-muted);">Nilai Perolehan</span>
          <div class="font-mono" style="font-size: 16px; font-weight: 800; color: var(--color-text-primary);">Rp ${item.price.toLocaleString('id-ID')}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; font-size: 12px;">
        <div style="background: var(--color-surface-elevated); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--color-border-whisper);">
          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">KATEGORI SARPRAS</span>
          <div style="font-weight: 700; color: var(--color-text-primary); margin-top: 2px;">${item.category}</div>
        </div>
        <div style="background: var(--color-surface-elevated); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--color-border-whisper);">
          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">PENEMPATAN RUANGAN</span>
          <div style="font-weight: 700; color: var(--color-text-primary); margin-top: 2px;">${item.room}</div>
        </div>
        <div style="background: var(--color-surface-elevated); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--color-border-whisper);">
          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">MERK / MODEL PABRIKAN</span>
          <div style="font-weight: 700; color: var(--color-text-primary); margin-top: 2px;">${item.model || '-'}</div>
        </div>
        <div style="background: var(--color-surface-elevated); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--color-border-whisper);">
          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">NOMOR SERI PABRIK</span>
          <div class="font-mono" style="font-weight: 700; color: var(--color-text-primary); margin-top: 2px;">${item.serial || '-'}</div>
        </div>
      </div>

      <div style="margin-top: 14px; padding: 12px 14px; background: var(--color-surface-subtle); border-radius: 6px; border: 1px dashed var(--color-border-specular); font-size: 11px; color: var(--color-text-secondary); line-height: 1.5;">
        Aset telah terverifikasi secara fisik pada siklus inventarisasi akademik berjalan. Tercatat pada buku inventaris kampus dan berstatus operasional aktif.
      </div>
    `;
  }
  openModal('modalAssetDetail');
}

function openEditFromDetail() {
  closeModal('modalAssetDetail');
  if (currentInspectedAssetCode) {
    openAssetEditModal(currentInspectedAssetCode);
  }
}

function openAssetEditModal(code) {
  const item = inventoryData.find(x => x.code === code);
  if (!item) return;

  const hiddenCode = document.getElementById('editAssetCodeHidden');
  const codeField = document.getElementById('editAssetCode');
  const nameField = document.getElementById('editAssetName');
  const catField = document.getElementById('editAssetCategory');
  const condField = document.getElementById('editAssetCondition');
  const roomField = document.getElementById('editAssetRoom');
  const priceField = document.getElementById('editAssetPrice');

  if (hiddenCode) hiddenCode.value = item.code;
  if (codeField) codeField.value = item.code;
  if (nameField) nameField.value = item.name;
  if (catField) catField.value = item.category;
  if (condField) condField.value = item.condition;
  if (roomField) roomField.value = item.room;
  if (priceField) priceField.value = item.price;

  openModal('modalAssetEdit');
}

function handleEditFormSubmit(e) {
  e.preventDefault();
  const code = document.getElementById('editAssetCodeHidden').value;
  const item = inventoryData.find(x => x.code === code);
  if (!item) return;

  item.name = document.getElementById('editAssetName').value.trim();
  item.category = document.getElementById('editAssetCategory').value;
  item.condition = document.getElementById('editAssetCondition').value;
  item.room = document.getElementById('editAssetRoom').value;
  item.price = Number(document.getElementById('editAssetPrice').value) || item.price;

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch(`/api/assets/${encodeURIComponent(item.code)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        room: item.room,
        price: item.price,
        condition: item.condition
      })
    }).catch(err => console.warn('Could not sync update to backend:', err));
  }

  closeModal('modalAssetEdit');
  renderInventoryTable();
  triggerToast(`Data sarana ${item.code} berhasil diperbarui.`);
}

// ==========================================================================
// FORM REGISTRASI HANDLER
// ==========================================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const code = document.getElementById('formInputCode').value.trim();
  const name = document.getElementById('formInputName').value.trim();
  const category = document.getElementById('formInputCategory').value;
  const model = document.getElementById('formInputModel')?.value.trim() || 'Standar Pabrikan';
  const serial = document.getElementById('formInputSerial')?.value.trim() || ('SN-' + new Date().getFullYear() + '-' + String(inventoryData.length + 1).padStart(4, '0'));
  const room = document.getElementById('formInputRoom').value;
  const price = Number(document.getElementById('formInputPrice').value) || 0;
  const condition = document.getElementById('formInputCondition').value;

  if (!code || !name) {
    triggerToast('Harap lengkapi kode aset dan nama peralatan');
    return;
  }

  // Insert to in-memory store
  inventoryData.unshift({
    code: code,
    name: name,
    category: category,
    room: room,
    price: price,
    condition: condition,
    serial: serial,
    model: model
  });

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch('/api/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, category, room, price, condition, serial_number: serial, model })
    }).catch(err => console.warn('Could not sync create to backend:', err));
  }

  // Reset Form
  document.getElementById('newAssetForm').reset();
  const nextCode = 'AST-LAB-2026-0' + (inventoryData.length + 90);
  document.getElementById('formInputCode').value = nextCode;
  document.getElementById('stickerCodeDisplay').textContent = nextCode;
  document.getElementById('stickerBarcodeText').textContent = nextCode;

  // Navigate to Master Data
  currentPage = 1;
  renderInventoryTable();
  if (document.getElementById('view-data-master')) {
    navigateToTab('view-data-master');
    triggerToast(`Sarana ${name} berhasil didaftarkan ke inventaris.`);
  } else {
    triggerToast(`Sarana ${name} berhasil didaftarkan. Mengalihkan...`);
    setTimeout(() => {
      window.location.href = "/data-master";
    }, 600);
  }
}

function setConditionSelect(cond) {
  document.getElementById('formInputCondition').value = cond;
  document.querySelectorAll('.radio-card-label').forEach(c => c.classList.remove('selected'));
  if (cond === 'Baik') document.getElementById('condCardBaik').classList.add('selected');
  if (cond === 'Perawatan') document.getElementById('condCardPerawatan').classList.add('selected');
  if (cond === 'Rusak Berat') document.getElementById('condCardRusak').classList.add('selected');
}

// ==========================================================================
// ROOM DIRECTORY & DYNAMIC KIR SYNCHRONIZATION
// ==========================================================================
function openRoomKir(roomName) {
  if (document.getElementById('view-laporan')) {
    navigateToTab('view-laporan');
    const selector = document.getElementById('kirRoomSelector');
    if (selector) selector.value = roomName;
    updateKirRoomView(roomName);
  } else {
    window.location.href = `laporan.html?room=${encodeURIComponent(roomName)}`;
  }
}

function updateKirRoomView(roomName) {
  const titleEl = document.getElementById('kirCurrentRoomName');
  if (titleEl) titleEl.textContent = roomName;

  const meta = roomMetadata[roomName] || {
    building: "Gedung Fasilitas Kampus",
    area: "100 m²",
    pj: "Biro Sarana dan Prasarana",
    nip: "19760312 200112 1 002"
  };

  const bldEl = document.getElementById('kirBuildingName');
  if (bldEl) bldEl.textContent = meta.building;
  const areaEl = document.getElementById('kirAreaSpecs');
  if (areaEl) areaEl.textContent = meta.area;
  const pjEl = document.getElementById('kirPjName');
  if (pjEl) pjEl.textContent = meta.pj;
  const sigPjEl = document.getElementById('kirSigPjName');
  if (sigPjEl) sigPjEl.textContent = meta.pj;
  const sigNipEl = document.getElementById('kirSigPjNip');
  if (sigNipEl) sigNipEl.textContent = 'NIP. ' + meta.nip;

  // Filter assets belonging to this room
  const roomAssets = inventoryData.filter(item => item.room === roomName);
  const tbody = document.getElementById('kirTableListBody');
  if (tbody) {
    tbody.innerHTML = '';
    if (roomAssets.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
            Belum ada sarana terdata pada ruangan ini.
          </td>
        </tr>
      `;
    } else {
      roomAssets.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="font-mono">${idx + 1}</td>
          <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${item.code}</td>
          <td style="font-weight: 600;">${item.name}</td>
          <td>${item.model || '-'}</td>
          <td class="font-mono">${item.serial || '-'}</td>
          <td class="font-mono">1 Unit</td>
          <td><span class="status-badge-pill ${item.condition === 'Baik' ? 'normal' : 'warning'} font-mono">${item.condition}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  triggerToast(`Memuat lembar KIR resmi untuk: ${roomName}`);
}

function updateRoomsDirectoryView() {
  const cards = document.querySelectorAll('.room-modular-card[data-room-name]');
  if (!cards || cards.length === 0) return;

  cards.forEach(card => {
    const rName = card.getAttribute('data-room-name');
    const matched = inventoryData.filter(x => x.room && (x.room === rName || x.room.toLowerCase().includes(rName.toLowerCase().split(' ')[0])));
    const totalVal = matched.reduce((acc, x) => acc + Number(x.price || 0), 0);
    const count = matched.length;
    const statEl = card.querySelector('.room-stat-text');
    if (statEl) {
      statEl.textContent = `${count} Unit Sarana (Rp ${totalVal.toLocaleString('id-ID')})`;
    }
    const badge = card.querySelector('.status-badge-pill');
    if (badge) {
      const hasPerawatan = matched.some(x => x.condition !== 'Baik');
      if (hasPerawatan) {
        badge.className = 'status-badge-pill warning font-mono';
        badge.textContent = 'Perawatan';
      } else {
        badge.className = 'status-badge-pill normal font-mono';
        badge.textContent = 'KIR Valid';
      }
    }
  });
}

// ==========================================================================
// MODAL DIALOGS ENGINE
// ==========================================================================
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('open');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('open');
}

function openDecommissionModal(code, name, index) {
  currentSelectedAfkirIndex = index;
  const codeEl = document.getElementById('modalAfkirCode');
  const nameEl = document.getElementById('modalAfkirName');
  if (codeEl) codeEl.textContent = code;
  if (nameEl) nameEl.textContent = name;
  openModal('modalDecommission');
}

function executeDecommission() {
  if (currentSelectedAfkirIndex !== null && inventoryData[currentSelectedAfkirIndex]) {
    const removed = inventoryData.splice(currentSelectedAfkirIndex, 1);
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http') && removed[0]?.code) {
      fetch(`/api/assets/${encodeURIComponent(removed[0].code)}`, {
        method: 'DELETE'
      }).catch(err => console.warn('Could not sync delete to backend:', err));
    }
    renderInventoryTable();
    closeModal('modalDecommission');
    triggerToast(`Aset ${removed[0].code} berhasil diafkirkan dari inventaris.`);
  }
}

// State for Loans & Work Orders
let loansData = [
  { id: 1, loan_code: 'PINJ-2026-041', asset_name: 'Proyektor Laser Epson 4K 6000 Lumens', borrower: 'Himpunan Mahasiswa Elektro', start_date: '2026-03-14', end_date: '2026-03-16', status: 'Terlambat' },
  { id: 2, loan_code: 'PINJ-2026-042', asset_name: 'Drone LiDAR DJI Matrice 350 RTK', borrower: 'Lab Pemetaan Geodesi', start_date: '2026-03-15', end_date: '2026-03-22', status: 'Dipinjam' },
  { id: 3, loan_code: 'PINJ-2026-043', asset_name: 'Sound System Array Portable Yamaha TF5', borrower: 'Unit Kegiatan Mahasiswa Musik', start_date: '2026-03-16', end_date: '2026-03-18', status: 'Kembali' }
];

let workOrdersData = [
  { id: 1, wo_code: 'WO-2026-091', item_name: 'Spektrofotometer UV-Vis Shimadzu (Lab R.302)', vendor: 'PT Dynatech Instrumentasi', estimated_cost: 4500000, target_date: '2026-03-25', status: 'Pengerjaan' },
  { id: 2, wo_code: 'WO-2026-092', item_name: 'Chiller HVAC Central Daikin 40 TR (Auditorium)', vendor: 'CV Sejuk Mandiri Teknik', estimated_cost: 8200000, target_date: '2026-03-28', status: 'Pengerjaan' },
  { id: 3, wo_code: 'WO-2026-088', item_name: 'Universal Testing Machine Shimadzu 100kN', vendor: 'PT Labora Mega Mandiri', estimated_cost: 12500000, target_date: '2026-03-10', status: 'Selesai' }
];

function renderLoansTable() {
  const tbody = document.getElementById('borrowingListBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const activeCount = loansData.filter(x => x.status === 'Dipinjam').length;
  const overdueCount = loansData.filter(x => x.status === 'Terlambat').length;
  const returnedCount = loansData.filter(x => x.status === 'Kembali').length;

  const elActive = document.getElementById('kpiActiveLoans');
  if (elActive) elActive.textContent = activeCount;
  const elOverdue = document.getElementById('kpiOverdueLoans');
  if (elOverdue) elOverdue.textContent = overdueCount;
  const elReturned = document.getElementById('kpiReturnedLoans');
  if (elReturned) elReturned.textContent = returnedCount;
  const elTotal = document.getElementById('kpiTotalLoans');
  if (elTotal) elTotal.textContent = loansData.length;

  loansData.forEach(item => {
    const isReturned = item.status === 'Kembali';
    const badgeClass = isReturned ? 'normal' : (item.status === 'Terlambat' ? 'critical' : 'warning');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${item.loan_code}</td>
      <td style="font-weight: 600;">${item.asset_name}</td>
      <td>${item.borrower}</td>
      <td class="font-mono">${item.start_date ? String(item.start_date).split('T')[0] : '-'}</td>
      <td class="font-mono">${item.end_date ? String(item.end_date).split('T')[0] : '-'}</td>
      <td><span class="status-badge-pill ${badgeClass} font-mono">${item.status}</span></td>
      <td style="text-align: right; padding-right: 24px;">
        <div class="enterprise-action-group">
          ${isReturned ? `
            <button class="table-action-icon-btn" style="opacity: 0.7; cursor: default; background: var(--color-surface-elevated); color: var(--color-signal-normal); border-color: rgba(22, 163, 74, 0.3);" title="Pengembalian Telah Diverifikasi">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          ` : `
            <button class="table-action-icon-btn btn-view" title="Proses Pengembalian Sarana" onclick="markReturnLoan('${item.id || item.loan_code}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </button>
          `}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderWorkOrdersTable() {
  const tbody = document.getElementById('woListBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const activeWo = workOrdersData.filter(x => x.status === 'Pengerjaan').length;
  const doneWo = workOrdersData.filter(x => x.status === 'Selesai').length;
  const totalCost = workOrdersData.reduce((acc, x) => acc + Number(x.estimated_cost || 0), 0);

  const elActive = document.getElementById('kpiActiveWo');
  if (elActive) elActive.textContent = activeWo;
  const elCrit = document.getElementById('kpiCriticalWo');
  if (elCrit) elCrit.textContent = activeWo;
  const elDone = document.getElementById('kpiDoneWo');
  if (elDone) elDone.textContent = doneWo;
  const elCost = document.getElementById('kpiTotalCostWo');
  if (elCost) elCost.textContent = 'Rp ' + (totalCost / 1000000).toFixed(1) + ' Jt';

  workOrdersData.forEach(item => {
    const isDone = item.status === 'Selesai';
    const badgeClass = isDone ? 'normal' : 'warning';
    const costFormatted = Number(item.estimated_cost).toLocaleString('id-ID');
    const targetFormatted = item.target_date ? String(item.target_date).split('T')[0] : '-';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${item.wo_code}</td>
      <td style="font-weight: 600;">${item.item_name}</td>
      <td>${item.vendor}</td>
      <td class="font-mono">Rp ${costFormatted}</td>
      <td class="font-mono">${targetFormatted}</td>
      <td><span class="status-badge-pill ${badgeClass} font-mono">${item.status}</span></td>
      <td style="text-align: right; padding-right: 24px;">
        <div class="enterprise-action-group">
          <button class="table-action-icon-btn btn-view" title="Detail Berita Acara Work Order" onclick="openWorkOrderDetailModal('${item.wo_code}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openBorrowModal() {
  openModal('modalBorrow');
}

function submitBorrowLoan() {
  const assetName = document.getElementById('borrowModalSelectAsset').value;
  const borrower = document.getElementById('borrowModalBorrower').value.trim() || 'Unit Kegiatan Kampus';
  const startDate = document.getElementById('borrowModalStartDate').value;
  const endDate = document.getElementById('borrowModalEndDate').value;

  const nextSeq = String(loansData.length + 1).padStart(3, '0');
  const randId = 'PINJ-2026-' + nextSeq;

  const newLoan = {
    loan_code: randId,
    asset_name: assetName,
    borrower: borrower,
    start_date: startDate,
    end_date: endDate,
    status: 'Dipinjam'
  };

  loansData.unshift(newLoan);
  renderLoansTable();

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLoan)
    }).catch(err => console.warn('Could not sync loan to backend:', err));
  }

  closeModal('modalBorrow');
}

function markReturnLoan(id) {
  const item = loansData.find(x => String(x.id) === String(id) || x.loan_code === String(id));
  if (item) {
    item.status = 'Kembali';
    renderLoansTable();
  }

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch(`/api/loans/${encodeURIComponent(id)}/return`, {
      method: 'PUT'
    }).catch(err => console.warn('Could not sync return to backend:', err));
  }
}

function markReturnItem(btn) {
  const tr = btn.closest('tr');
  if (tr) {
    const code = tr.querySelector('td.font-mono')?.textContent?.trim();
    if (code) markReturnLoan(code);
  }
}

function openWorkOrderModal() {
  openModal('modalWorkOrder');
}

function openWorkOrderDetailModal(woCode) {
  const item = workOrdersData.find(x => x.wo_code === woCode) || {
    wo_code: woCode,
    item_name: 'Peralatan Lab Terpadu',
    vendor: 'PT Dynatech Instrumentasi',
    estimated_cost: 4500000,
    target_date: '2026-03-25',
    status: 'Pengerjaan'
  };

  const idEl = document.getElementById('modalWoDetailCode');
  const itemEl = document.getElementById('modalWoDetailItem');
  const vendorEl = document.getElementById('modalWoDetailVendor');
  const costEl = document.getElementById('modalWoDetailCost');
  const dateEl = document.getElementById('modalWoDetailDate');
  const statusEl = document.getElementById('modalWoDetailStatus');

  if (idEl) idEl.textContent = item.wo_code;
  if (itemEl) itemEl.textContent = item.item_name;
  if (vendorEl) vendorEl.textContent = item.vendor;
  if (costEl) costEl.textContent = 'Rp ' + Number(item.estimated_cost).toLocaleString('id-ID');
  if (dateEl) dateEl.textContent = item.target_date ? String(item.target_date).split('T')[0] : '-';
  if (statusEl) {
    statusEl.className = `status-badge-pill ${item.status === 'Selesai' ? 'normal' : 'warning'} font-mono`;
    statusEl.textContent = item.status;
  }

  openModal('modalWorkOrderDetail');
}

function submitNewWorkOrder() {
  const item = document.getElementById('woInputItem').value.trim() || 'Instrumen Lab Terpadu';
  const vendor = document.getElementById('woInputVendor').value.trim() || 'Tim Teknisi Kampus';
  const cost = Number(document.getElementById('woInputCost').value) || 3500000;
  const date = document.getElementById('woInputDate').value;
  const nextWoSeq = String(workOrdersData.length + 1).padStart(3, '0');
  const woId = 'WO-2026-' + nextWoSeq;

  const newWo = {
    wo_code: woId,
    item_name: item,
    vendor: vendor,
    estimated_cost: cost,
    target_date: date,
    status: 'Pengerjaan'
  };

  workOrdersData.unshift(newWo);
  renderWorkOrdersTable();

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch('/api/work-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWo)
    }).catch(err => console.warn('Could not sync work order to backend:', err));
  }

  closeModal('modalWorkOrder');
}

function exportTableToCSV() {
  let csv = 'Kode Aset,Nama Peralatan,Kategori,Lokasi Ruangan,Nilai Perolehan,Kondisi\n';
  inventoryData.forEach(item => {
    csv += `"${item.code}","${item.name}","${item.category}","${item.room}",${item.price},"${item.condition}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Master_Data_Sarpras_2026.csv';
  a.click();
  URL.revokeObjectURL(url);
  triggerToast('Berkas CSV berhasil diekspor.');
}

// ==========================================================================
// MODAL CREATE ASSET & EXPORT WORKFLOW
// ==========================================================================
function openCreateAssetModal() {
  const form = document.getElementById('modalNewAssetForm');
  if (form) form.reset();
  const nextCode = 'AST-LAB-2026-0' + (inventoryData.length + 91);
  const codeInput = document.getElementById('modalInputCode');
  if (codeInput) codeInput.value = nextCode;
  openModal('modalCreateAsset');
}

function submitCreateAssetModal(e) {
  e.preventDefault();
  const code = document.getElementById('modalInputCode').value.trim();
  const name = document.getElementById('modalInputName').value.trim();
  const category = document.getElementById('modalInputCategory').value;
  const room = document.getElementById('modalInputRoom').value;
  const model = document.getElementById('modalInputModel')?.value.trim() || 'Standar Pabrikan';
  const serial = document.getElementById('modalInputSerial')?.value.trim() || ('SN-' + new Date().getFullYear() + '-' + String(inventoryData.length + 1).padStart(4, '0'));
  const price = Number(document.getElementById('modalInputPrice').value) || 0;
  const condition = document.getElementById('modalInputCondition').value;

  if (!code || !name) {
    triggerToast('Harap lengkapi kode dan nama sarana.');
    return;
  }

  inventoryData.unshift({
    code: code,
    name: name,
    category: category,
    room: room,
    price: price,
    condition: condition,
    serial: serial,
    model: model
  });

  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    fetch('/api/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, category, room, price, condition, serial_number: serial, model })
    }).catch(err => console.warn('Could not sync create to backend:', err));
  }

  closeModal('modalCreateAsset');
  currentPage = 1;
  renderInventoryTable();
  triggerToast(`Sarana ${name} berhasil ditambahkan ke inventaris.`);
}

function openExportModal() {
  openModal('modalExportData');
}

function executeExportDownload(format) {
  closeModal('modalExportData');
  if (format === 'csv') {
    exportTableToCSV();
  } else if (format === 'xlsx') {
    let content = '\uFEFF"KODE SARPRAS"\t"NAMA PERALATAN"\t"KATEGORI"\t"PENEMPATAN RUANGAN"\t"NILAI BUKU (RP)"\t"KONDISI FISIK"\n';
    inventoryData.forEach(item => {
      content += `"${item.code}"\t"${item.name}"\t"${item.category}"\t"${item.room}"\t"${item.price}"\t"${item.condition}"\n`;
    });
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rekapitulasi_Sarpras_Academia_2026.xls';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Rekapitulasi Excel (.xls) berhasil diunduh.');
  } else if (format === 'print') {
    triggerToast('Membuka pratinjau cetak...');
    setTimeout(() => {
      window.print();
    }, 300);
  }
}

function openWorkOrderModalFor(code, name) {
  const itemInput = document.getElementById('woInputItem');
  if (itemInput) {
    itemInput.value = `${name} [${code}]`;
  }
  openModal('modalWorkOrder');
}

// ==========================================================================
// TOAST NOTIFICATIONS (Silenced per user specification - zero intrusive alerts)
// ==========================================================================
function triggerToast(message) {
  // Disabled: Clean executive UI without disruptive toast alerts
}
