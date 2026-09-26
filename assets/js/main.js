// State Store (In-Memory Mock Database)
    let inventoryData = [
      { code: "AST-LAB-2026-089", name: "Spektrofotometer UV-Vis Shimadzu UV-2600i", category: "Laboratorium", room: "Lab Kimia Terpadu R.302", price: 285000000, condition: "Perawatan" },
      { code: "AST-TIK-2025-014", name: "Dell PowerEdge R750 Compute Server Node", category: "IT", room: "Data Center Rektorat Lt. 1", price: 180000000, condition: "Baik" },
      { code: "AST-MED-2024-118", name: "Mikroskop Fluoresensi Leica DM2500 Plan-Apo", category: "Laboratorium", room: "Lab Riset Biomedik R.105", price: 310000000, condition: "Perawatan" },
      { code: "AST-TEK-2025-055", name: "Universal Testing Machine Shimadzu 100kN", category: "Laboratorium", room: "Workshop Mesin FT Lt. 1", price: 520000000, condition: "Rusak Berat" },
      { code: "AST-FAC-2023-008", name: "Chiller HVAC Central Daikin 40 TR Modular", category: "Fasilitas", room: "Gedung Rektorat", price: 425000000, condition: "Perawatan" },
      { code: "AST-KLS-2025-032", name: "Interactive Smart Board Touch 85 Inch 4K", category: "Ruang Kuliah", room: "Smart Classroom 401", price: 85000000, condition: "Baik" }
    ];

    let currentSelectedAfkirIndex = null;

    document.addEventListener('DOMContentLoaded', () => {
      // 1. Initial Theme Check (Light Mode Default)
      const savedTheme = localStorage.getItem('sarpras_theme') || 'light';
      setTheme(savedTheme);

      // 2. Render Initial Master Data Table
      renderInventoryTable();

      // 3. Setup Navigation Tab Listeners
      const navLinks = document.querySelectorAll('.nav-item-link');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetViewId = link.getAttribute('data-target');
          navigateToTab(targetViewId);
        });
      });

      // Quick CTA in sidebar
      const btnSidebarRegister = document.getElementById('btnSidebarRegister');
      if (btnSidebarRegister) {
        btnSidebarRegister.addEventListener('click', () => {
          navigateToTab('view-form-aset');
        });
      }

      // 4. Setup Theme Toggle Button
      const btnThemeToggle = document.getElementById('btnThemeToggle');
      if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'light';
          const next = current === 'light' ? 'dark' : 'light';
          setTheme(next);
          triggerToast(`Tampilan diubah ke Mode ${next === 'light' ? 'Terang' : 'Gelap'}`);
        });
      }

      // 5. Sidebar Collapse Toggle
      const btnToggleSidebarRail = document.getElementById('btnToggleSidebarRail');
      const sidebarRail = document.getElementById('sidebarRail');
      if (btnToggleSidebarRail && sidebarRail) {
        btnToggleSidebarRail.addEventListener('click', () => {
          sidebarRail.classList.toggle('collapsed');
          const isCollapsed = sidebarRail.classList.contains('collapsed');
          const toggleText = btnToggleSidebarRail.querySelector('.toggle-text');
          if (toggleText) toggleText.textContent = isCollapsed ? '' : 'Perkecil Menu';
        });
      }

      // 6. Mobile Drawer Toggle
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

      // 7. Popovers Toggle
      const btnHeaderNotif = document.getElementById('btnHeaderNotif');
      const dropdownNotifications = document.getElementById('dropdownNotifications');
      const btnHeaderProfile = document.getElementById('btnHeaderProfile');
      const dropdownProfile = document.getElementById('dropdownProfile');

      if (btnHeaderNotif && dropdownNotifications) {
        btnHeaderNotif.addEventListener('click', (e) => {
          e.stopPropagation();
          if (dropdownProfile) dropdownProfile.classList.remove('show');
          dropdownNotifications.classList.toggle('show');
        });
      }

      if (btnHeaderProfile && dropdownProfile) {
        btnHeaderProfile.addEventListener('click', (e) => {
          e.stopPropagation();
          if (dropdownNotifications) dropdownNotifications.classList.remove('show');
          dropdownProfile.classList.toggle('show');
        });
      }

      document.addEventListener('click', () => {
        if (dropdownNotifications) dropdownNotifications.classList.remove('show');
        if (dropdownProfile) dropdownProfile.classList.remove('show');
      });

      // 8. Global Keyboard Shortcut
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
          closeModal('modalDecommission');
          closeModal('modalBorrow');
          closeModal('modalWorkOrder');
          if (dropdownNotifications) dropdownNotifications.classList.remove('show');
          if (dropdownProfile) dropdownProfile.classList.remove('show');
        }
      });

      // Search bar filter on Enter
      const mainGlobalSearch = document.getElementById('mainGlobalSearch');
      if (mainGlobalSearch) {
        mainGlobalSearch.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = mainGlobalSearch.value.trim();
            navigateToTab('view-data-master');
            const tableFilterInput = document.getElementById('tableFilterInput');
            if (tableFilterInput) {
              tableFilterInput.value = val;
              renderInventoryTable();
              triggerToast(`Menyaring data dengan kata kunci: "${val}"`);
            }
          }
        });
      }

      // 9. Table Filter Inputs Live Event Listeners
      const tableFilterInput = document.getElementById('tableFilterInput');
      const selectKategoriFilter = document.getElementById('selectKategoriFilter');
      const selectKondisiFilter = document.getElementById('selectKondisiFilter');

      if (tableFilterInput) tableFilterInput.addEventListener('input', renderInventoryTable);
      if (selectKategoriFilter) selectKategoriFilter.addEventListener('change', renderInventoryTable);
      if (selectKondisiFilter) selectKondisiFilter.addEventListener('change', renderInventoryTable);

      // Master Checkbox
      const masterCheckbox = document.getElementById('masterCheckbox');
      if (masterCheckbox) {
        masterCheckbox.addEventListener('change', () => {
          const rowBoxes = document.querySelectorAll('.table-row-cb');
          rowBoxes.forEach(cb => cb.checked = masterCheckbox.checked);
          if (masterCheckbox.checked) {
            triggerToast(`${rowBoxes.length} sarana dipilih sekaligus`);
          }
        });
      }

      // 10. Live Form Field Synchronizer to Barcode Thermal Sticker
      const formInputCode = document.getElementById('formInputCode');
      const formInputName = document.getElementById('formInputName');
      const formInputRoom = document.getElementById('formInputRoom');
      const formInputPrice = document.getElementById('formInputPrice');
      const stickerCodeDisplay = document.getElementById('stickerCodeDisplay');
      const stickerNameDisplay = document.getElementById('stickerNameDisplay');
      const stickerRoomDisplay = document.getElementById('stickerRoomDisplay');
      const formPricePreviewFormatted = document.getElementById('formPricePreviewFormatted');

      if (formInputCode && stickerCodeDisplay) {
        formInputCode.addEventListener('input', () => {
          stickerCodeDisplay.textContent = formInputCode.value || 'AST-LAB-2026-090';
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
    // THEME ENGINE
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
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
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
      // 1. Switch Active Pane
      const allPanes = document.querySelectorAll('.tab-content-view');
      allPanes.forEach(pane => pane.classList.remove('active'));

      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // 2. Update Sidebar Active Link
      const navLinks = document.querySelectorAll('.nav-item-link');
      navLinks.forEach(link => {
        if (link.getAttribute('data-target') === tabId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // 3. Update Breadcrumbs in Header
      const headerBreadcrumbTitle = document.getElementById('headerBreadcrumbTitle');
      if (headerBreadcrumbTitle && breadcrumbTitles[tabId]) {
        headerBreadcrumbTitle.textContent = breadcrumbTitles[tabId];
      }

      // Scroll viewport to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==========================================================================
    // MASTER DATA TABLE RENDERER & FILTER ENGINE
    // ==========================================================================
    function renderInventoryTable() {
      const tbody = document.getElementById('inventoryListTbody');
      if (!tbody) return;

      const filterQuery = (document.getElementById('tableFilterInput')?.value || '').toLowerCase();
      const filterKat = document.getElementById('selectKategoriFilter')?.value || 'all';
      const filterKon = document.getElementById('selectKondisiFilter')?.value || 'all';

      const filtered = inventoryData.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(filterQuery) || item.code.toLowerCase().includes(filterQuery);
        const matchesKat = filterKat === 'all' || item.category === filterKat;
        const matchesKon = filterKon === 'all' || item.condition === filterKon;
        return matchesQuery && matchesKat && matchesKon;
      });

      tbody.innerHTML = '';

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align: center; padding: 32px; color: var(--color-text-muted);">
              Tidak ada data sarana yang sesuai dengan filter pencarian.
            </td>
          </tr>
        `;
        return;
      }

      filtered.forEach((item, idx) => {
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
          <td style="text-align: right;">
            <button class="table-action-link" onclick="triggerToast('Melihat rincian ${item.code}')">Detail</button>
            <button class="table-action-link danger" onclick="openDecommissionModal('${item.code}', '${item.name}', ${idx})">Afkir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      // Update counters
      const tableFilterStats = document.getElementById('tableFilterStats');
      if (tableFilterStats) {
        tableFilterStats.textContent = `Menampilkan ${filtered.length} dari ${inventoryData.length} data`;
      }
      const summaryTotalAset = document.getElementById('summaryTotalAset');
      if (summaryTotalAset) summaryTotalAset.textContent = inventoryData.length;
      const sidebarAssetCount = document.getElementById('sidebarAssetCount');
      if (sidebarAssetCount) sidebarAssetCount.textContent = inventoryData.length;
    }

    // ==========================================================================
    // FORM REGISTRASI SUBMISSION HANDLER
    // ==========================================================================
    function handleFormSubmit(e) {
      e.preventDefault();
      const code = document.getElementById('formInputCode').value.trim();
      const name = document.getElementById('formInputName').value.trim();
      const category = document.getElementById('formInputCategory').value;
      const room = document.getElementById('formInputRoom').value;
      const price = Number(document.getElementById('formInputPrice').value) || 0;
      const condition = document.getElementById('formInputCondition').value;

      if (!code || !name) {
        triggerToast('Harap lengkapi kode aset dan nama peralatan');
        return;
      }

      // Add to inventory database
      inventoryData.unshift({
        code: code,
        name: name,
        category: category,
        room: room,
        price: price,
        condition: condition
      });

      // Reset form
      document.getElementById('newAssetForm').reset();
      document.getElementById('formInputCode').value = 'AST-LAB-2026-0' + (inventoryData.length + 90);

      // Re-render table and navigate to Master Data
      renderInventoryTable();
      navigateToTab('view-data-master');
      triggerToast(`Berhasil mendaftarkan sarana baru: ${name}`);
    }

    function setConditionSelect(cond) {
      document.getElementById('formInputCondition').value = cond;
      document.querySelectorAll('.radio-card-label').forEach(c => c.classList.remove('selected'));
      if (cond === 'Baik') document.getElementById('condCardBaik').classList.add('selected');
      if (cond === 'Perawatan') document.getElementById('condCardPerawatan').classList.add('selected');
      if (cond === 'Rusak Berat') document.getElementById('condCardRusak').classList.add('selected');
    }

    // ==========================================================================
    // ROOM & KIR VIEWER
    // ==========================================================================
    function openRoomKir(roomName) {
      navigateToTab('view-laporan');
      const selector = document.getElementById('kirRoomSelector');
      if (selector) selector.value = roomName;
      updateKirRoomView(roomName);
    }

    function updateKirRoomView(roomName) {
      const titleEl = document.getElementById('kirCurrentRoomName');
      if (titleEl) titleEl.textContent = roomName;
      triggerToast(`Memuat lembar KIR untuk: ${roomName}`);
    }

    // ==========================================================================
    // MODALS ENGINE
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
      document.getElementById('modalAfkirCode').textContent = code;
      document.getElementById('modalAfkirName').textContent = name;
      openModal('modalDecommission');
    }

    function executeDecommission() {
      if (currentSelectedAfkirIndex !== null && inventoryData[currentSelectedAfkirIndex]) {
        const removed = inventoryData.splice(currentSelectedAfkirIndex, 1);
        renderInventoryTable();
        closeModal('modalDecommission');
        triggerToast(`Aset ${removed[0].code} berhasil diafkirkan dari daftar.`);
      }
    }

    function openBorrowModal() {
      openModal('modalBorrow');
    }

    function submitBorrowLoan() {
      const assetName = document.getElementById('borrowModalSelectAsset').value;
      const borrower = document.getElementById('borrowModalBorrower').value.trim() || 'Unit Kegiatan Kampus';
      const startDate = document.getElementById('borrowModalStartDate').value;
      const endDate = document.getElementById('borrowModalEndDate').value;

      const tbody = document.getElementById('borrowingListBody');
      if (tbody) {
        const tr = document.createElement('tr');
        const randId = 'PINJ-2026-0' + Math.floor(Math.random() * 80 + 50);
        tr.innerHTML = `
          <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${randId}</td>
          <td style="font-weight: 600;">${assetName}</td>
          <td>${borrower}</td>
          <td class="font-mono">${startDate}</td>
          <td class="font-mono">${endDate}</td>
          <td><span class="status-badge-pill warning font-mono">Dipinjam</span></td>
          <td style="text-align: right;">
            <button class="table-action-link" onclick="markReturnItem(this)">Proses Kembali</button>
          </td>
        `;
        tbody.prepend(tr);
      }

      closeModal('modalBorrow');
      triggerToast(`Permohonan pinjam ${assetName} telah disetujui`);
    }

    function markReturnItem(btn) {
      const tr = btn.closest('tr');
      if (tr) {
        const statusBadge = tr.querySelector('.status-badge-pill');
        if (statusBadge) {
          statusBadge.className = 'status-badge-pill normal font-mono';
          statusBadge.textContent = 'Kembali';
        }
        btn.remove();
        triggerToast('Sarana telah diverifikasi kembali dalam kondisi utuh.');
      }
    }

    function openWorkOrderModal() {
      openModal('modalWorkOrder');
    }

    function submitNewWorkOrder() {
      const item = document.getElementById('woInputItem').value.trim() || 'Instrumen Lab Terpadu';
      const vendor = document.getElementById('woInputVendor').value.trim() || 'Tim Teknisi Kampus';
      const cost = Number(document.getElementById('woInputCost').value) || 3500000;
      const date = document.getElementById('woInputDate').value;

      const tbody = document.getElementById('woListBody');
      if (tbody) {
        const tr = document.createElement('tr');
        const woId = 'WO-2026-0' + Math.floor(Math.random() * 80 + 95);
        tr.innerHTML = `
          <td class="font-mono" style="color: var(--color-accent-cobalt); font-weight: 700;">${woId}</td>
          <td style="font-weight: 600;">${item}</td>
          <td>${vendor}</td>
          <td class="font-mono">Rp ${cost.toLocaleString('id-ID')}</td>
          <td class="font-mono">${date}</td>
          <td><span class="status-badge-pill warning font-mono">Pengerjaan</span></td>
          <td style="text-align: right;">
            <button class="table-action-link" onclick="triggerToast('Detail Berita Acara Servis dimuat')">Detail WO</button>
          </td>
        `;
        tbody.prepend(tr);
      }

      closeModal('modalWorkOrder');
      triggerToast(`Perintah kerja pemeliharaan berhasil diterbitkan.`);
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
    // ZERO-DEPENDENCY TOAST NOTIFICATION
    // ==========================================================================
    function triggerToast(message) {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast-card';
      toast.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-signal-normal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 160ms ease';
        setTimeout(() => toast.remove(), 160);
      }, 2800);
    }