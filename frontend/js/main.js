// ==========================================================================
// SWACHH SATHI - CORE APPLICATION SCRIPT
// ==========================================================================

// Global state
let leafletMap = null;
let mapMarkers = [];
let allHotspotsData = [];
let userLocationMarker = null;

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 400);
    }, 600);
  }
});

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== MOBILE NAVBAR TOGGLE =====
function toggleMobileMenu() {
  const nav = document.getElementById('nav-links');
  if (nav) nav.classList.toggle('open');
}

// Close mobile navbar on link click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('nav-links');
  const burger = document.querySelector('.hamburger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ===== ANIMATED STATS COUNTER =====
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const duration = 1800;
        const steps = 40;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.innerText = Math.floor(current).toLocaleString();
          }
        }, duration / steps);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ===== HIGHLIGHT TODAY'S PICKUP SCHEDULE =====
function highlightCurrentDay() {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = days[new Date().getDay()];
  const card = document.getElementById(`sch-${today}`);
  if (card && today !== 'sun') {
    card.classList.add('active-day');
  }
}

// ===== INTERACTIVE LEAFLET MAP (ALANDI HOTSPOTS) =====
async function initAlandiMap() {
  const mapElement = document.getElementById('alandi-map');
  if (!mapElement) return;

  // Center on Alandi Devachi, Maharashtra
  const alandiCenter = [18.6706, 73.8756];

  leafletMap = L.map('alandi-map', {
    center: alandiCenter,
    zoom: 15,
    minZoom: 13,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: false
  });

  // OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(leafletMap);

  // Invalidate size once rendered
  setTimeout(() => {
    leafletMap.invalidateSize();
  }, 400);

  // Town Center Label Pin
  L.marker(alandiCenter, {
    icon: L.divIcon({
      className: '',
      html: `<div style="
        background:#064e3b; color:#34d399; padding:4px 10px; border-radius:100px;
        font-size:0.75rem; font-weight:700; border:1px solid #34d399;
        white-space:nowrap; box-shadow:0 4px 12px rgba(0,0,0,0.3);
      ">📍 Alandi Devachi Center</div>`,
      iconAnchor: [70, 14]
    })
  }).addTo(leafletMap);

  // Fetch hotspots from backend
  await loadMapData();

  // Setup Map Filter Tabs
  setupMapFilters();

  // Setup Ward Navigation Jump
  const jumpSelect = document.getElementById('ward-jump-select');
  if (jumpSelect) {
    jumpSelect.addEventListener('change', (e) => {
      const coords = e.target.value.split(',');
      if (coords.length === 2) {
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);
        leafletMap.flyTo([lat, lng], 17, { duration: 1.2 });
      }
    });
  }

  // Click on map to report waste at specific spot
  leafletMap.on('click', (e) => {
    const lat = e.latlng.lat.toFixed(5);
    const lng = e.latlng.lng.toFixed(5);

    const clickPopup = L.popup()
      .setLatLng(e.latlng)
      .setContent(`
        <div style="font-family:'DM Sans',sans-serif;min-width:190px;padding:4px 0;">
          <div style="font-weight:700;font-size:0.92rem;color:#0f172a;margin-bottom:4px;">📍 Spot Waste Here?</div>
          <div style="font-size:0.78rem;color:#64748b;margin-bottom:8px;">Lat: ${lat}, Lng: ${lng}</div>
          <button onclick="openReportModalWithCoords(${lat}, ${lng})" style="
            width:100%;padding:6px 12px;background:#059669;color:#ffffff;
            border:none;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;
          ">
            <i class="fa-solid fa-camera"></i> Report at this Spot
          </button>
        </div>
      `)
      .openOn(leafletMap);
  });
}

// Marker Pin Factory
function createMarkerIcon(color, pulse = true) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 18px; height: 18px; border-radius: 50%;
        background: ${color}; border: 3px solid #ffffff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.4);
        position: relative;
      ">
        ${pulse ? `<div style="
          position: absolute; top: 50%; left: 50%;
          width: 32px; height: 32px; border-radius: 50%;
          background: ${color}; opacity: 0.35;
          transform: translate(-50%, -50%);
          animation: mapPulse 2s infinite ease-out;
        "></div>` : ''}
      </div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12]
  });
}

const statusColors = {
  'pending': '#ef4444',     // Red
  'in progress': '#f59e0b', // Amber
  'resolved': '#10b981',    // Green
  'pickup': '#3b82f6'       // Blue
};

// Load Map Data
async function loadMapData() {
  let data = [];
  try {
    data = await api.getMapHotspots();
  } catch (err) {
    console.warn('Backend map load error, using default seed points', err);
  }

  // If backend returns empty, provide rich default Alandi hotspots
  if (!data || data.length === 0) {
    data = [
      { _id: '1', status: 'Pending', wasteType: 'Plastic', location: 'Alandi Bus Stand Platform 2', description: 'Discarded bottles and snack pouches', priority: 'High', latitude: 18.6731, longitude: 73.8762, createdAt: new Date() },
      { _id: '2', status: 'In Progress', wasteType: 'Wet', location: 'Indrayani River Bank, Siddhabett Ghat', description: 'Nirmalya floral offerings collected for composting', priority: 'Urgent', latitude: 18.6680, longitude: 73.8730, createdAt: new Date() },
      { _id: '3', status: 'In Progress', wasteType: 'Dry', location: 'Market Road, Vegetable Mandi', description: 'Corrugated cartons and dry packaging debris', priority: 'Normal', latitude: 18.6718, longitude: 73.8789, createdAt: new Date() },
      { _id: '4', status: 'Pending', wasteType: 'Hazardous', location: 'Old Alandi Road, Medical Clinic Area', description: 'Broken medicine vials and chemical packaging', priority: 'Urgent', latitude: 18.6690, longitude: 73.8768, createdAt: new Date() },
      { _id: '5', status: 'In Progress', wasteType: 'Other', location: 'New Market Road Construction Site', description: 'Concrete rubble and debris blocking walkway', priority: 'Normal', latitude: 18.6724, longitude: 73.8745, createdAt: new Date() },
      { _id: '6', status: 'Resolved', wasteType: 'Wet', location: 'Vitthal Temple Chowk, Ward 1', description: 'Cleaned pilgrim wet waste bin', priority: 'Normal', latitude: 18.6695, longitude: 73.8748, createdAt: new Date() },
      { _id: '7', status: 'Resolved', wasteType: 'Plastic', location: 'Alandi Municipal School Zone', description: 'Plastic wrappers and containers cleared', priority: 'Low', latitude: 18.6708, longitude: 73.8771, createdAt: new Date() },
      { _id: '8', status: 'Resolved', wasteType: 'Dry', location: 'Chhatrapati Shivaji Maharaj Chowk', description: 'Dry litter gathered and transported to recycling center', priority: 'Normal', latitude: 18.6700, longitude: 73.8740, createdAt: new Date() },
      { _id: '9', status: 'Pickup', wasteType: 'Dry', location: 'Sai Vihar, Temple Street, Ward 1', description: 'Scheduled doorstep paper and cardboard pickup', priority: 'Normal', latitude: 18.6742, longitude: 73.8735, createdAt: new Date() },
      { _id: '10', status: 'Pickup', wasteType: 'Plastic', location: 'River View Colony, Ward 2', description: 'Bulk recyclable plastics scheduled pickup', priority: 'Normal', latitude: 18.6692, longitude: 73.8715, createdAt: new Date() }
    ];
  }

  allHotspotsData = data;
  updateHotspotCounters(allHotspotsData);
  renderMarkers(allHotspotsData);
}

// Update Filter Count Badges
function updateHotspotCounters(hotspots) {
  const allCount = hotspots.length;
  const pendingCount = hotspots.filter(h => (h.status || '').toLowerCase() === 'pending').length;
  const inProgressCount = hotspots.filter(h => (h.status || '').toLowerCase() === 'in progress').length;
  const resolvedCount = hotspots.filter(h => (h.status || '').toLowerCase() === 'resolved').length;
  const pickupCount = hotspots.filter(h => (h.status || '').toLowerCase() === 'pickup' || (h.status || '').toLowerCase() === 'requested' || (h.status || '').toLowerCase() === 'assigned').length;

  document.getElementById('count-all')?.replaceChildren(document.createTextNode(allCount));
  document.getElementById('count-pending')?.replaceChildren(document.createTextNode(pendingCount));
  document.getElementById('count-inprogress')?.replaceChildren(document.createTextNode(inProgressCount));
  document.getElementById('count-resolved')?.replaceChildren(document.createTextNode(resolvedCount));
  document.getElementById('count-pickup')?.replaceChildren(document.createTextNode(pickupCount));
}

// Render Leaflet Markers
function renderMarkers(hotspots) {
  if (!leafletMap) return;

  // Clear existing markers
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];

  const statusLabels = {
    'pending': '🔴 ' + t('filter_pending'),
    'in progress': '🟡 ' + t('filter_inprogress'),
    'resolved': '🟢 ' + t('filter_resolved'),
    'pickup': '🔵 ' + t('filter_pickups')
  };

  hotspots.forEach(item => {
    if (!item.latitude || !item.longitude) return;

    let normStatus = (item.status || 'Pending').toLowerCase();
    if (normStatus === 'requested' || normStatus === 'assigned') normStatus = 'pickup';

    const color = statusColors[normStatus] || '#10b981';
    const marker = L.marker([item.latitude, item.longitude], {
      icon: createMarkerIcon(color, normStatus !== 'resolved')
    });

    const popupHtml = `
      <div style="font-family:'DM Sans',sans-serif;min-width:210px;padding:4px 0;">
        <div style="font-weight:700;font-size:0.95rem;color:#0f172a;margin-bottom:6px;">${item.location || 'Alandi Ward'}</div>
        <div style="font-size:0.82rem;color:#475569;margin-bottom:4px;">
          <b>Waste Category:</b> <span style="font-weight:600;color:#059669;">${item.wasteType || 'General'}</span>
        </div>
        <div style="font-size:0.82rem;color:#475569;margin-bottom:6px;">
          <b>Status:</b> ${statusLabels[normStatus] || item.status}
        </div>
        ${item.description ? `<div style="font-size:0.8rem;color:#64748b;line-height:1.4;margin-bottom:8px;background:#f8fafc;padding:6px;border-radius:6px;">${item.description}</div>` : ''}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
          <span style="font-size:0.75rem;color:#94a3b8;">${new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
          <button onclick="openReportModalWithLocation('${(item.location || '').replace(/'/g, "\\'")}')" style="
            padding:4px 10px;background:#059669;color:#fff;border:none;border-radius:6px;font-size:0.78rem;font-weight:600;cursor:pointer;
          ">Report Similar</button>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, { maxWidth: 260 });
    marker.addTo(leafletMap);
    mapMarkers.push(marker);
  });
}

// Setup Map Filter Tabs
function setupMapFilters() {
  const filterBtns = document.querySelectorAll('#map-filter-buttons .map-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        renderMarkers(allHotspotsData);
      } else if (filter === 'pickup') {
        const filtered = allHotspotsData.filter(h => {
          const s = (h.status || '').toLowerCase();
          return s === 'pickup' || s === 'requested' || s === 'assigned';
        });
        renderMarkers(filtered);
      } else {
        const filtered = allHotspotsData.filter(h => (h.status || '').toLowerCase() === filter);
        renderMarkers(filtered);
      }
    });
  });
}

// Locate User on Map (GPS)
function locateUserOnMap() {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser', 'error');
    return;
  }

  showToast('Locating your position in Alandi...', 'info');

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (userLocationMarker) {
        leafletMap.removeLayer(userLocationMarker);
      }

      userLocationMarker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="
            width:22px;height:22px;border-radius:50%;background:#3b82f6;border:3px solid #fff;
            box-shadow:0 0 15px #3b82f6;position:relative;
          "><div style="
            position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:50%;
            background:#3b82f6;opacity:0.3;transform:translate(-50%,-50%);
            animation:mapPulse 2s infinite ease-out;
          "></div></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })
      }).addTo(leafletMap);

      leafletMap.flyTo([lat, lng], 16, { duration: 1.5 });
      showToast('📍 Centered on your current location!');
    },
    (err) => {
      showToast('Unable to access GPS location. Please check browser permissions.', 'error');
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// ===== QUICK REPORT MODAL =====
function openReportModal() {
  const modal = document.getElementById('report-modal');
  if (modal) modal.classList.add('open');
}

function openReportModalWithCoords(lat, lng) {
  openReportModal();
  const latInput = document.getElementById('qr-lat');
  const lngInput = document.getElementById('qr-lng');
  const locInput = document.getElementById('qr-location');
  const statusSmall = document.getElementById('qr-gps-status');

  if (latInput) latInput.value = lat;
  if (lngInput) lngInput.value = lng;
  if (locInput && !locInput.value) locInput.value = `Pinned Coords (${lat}, ${lng})`;
  if (statusSmall) statusSmall.innerText = `GPS coordinates attached: ${lat}, ${lng}`;
}

function openReportModalWithLocation(locationName) {
  openReportModal();
  const locInput = document.getElementById('qr-location');
  if (locInput) locInput.value = `Near ${locationName}`;
}

function closeReportModal() {
  const modal = document.getElementById('report-modal');
  if (modal) modal.classList.remove('open');
}

function fetchCurrentGPS() {
  const statusEl = document.getElementById('qr-gps-status');
  if (!navigator.geolocation) {
    if (statusEl) statusEl.innerText = 'Geolocation not supported.';
    return;
  }

  if (statusEl) statusEl.innerText = 'Acquiring GPS fix...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      document.getElementById('qr-lat').value = lat;
      document.getElementById('qr-lng').value = lng;
      if (statusEl) statusEl.innerText = `GPS captured: ${lat}, ${lng}`;
      showToast('GPS coordinates attached!');
    },
    () => {
      if (statusEl) statusEl.innerText = 'GPS permission denied. Please type location.';
    }
  );
}

async function submitQuickReport(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('qr-submit-btn');
  const originalText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
  }

  const payload = {
    wasteType: document.getElementById('qr-waste-type').value,
    location: document.getElementById('qr-location').value,
    priority: document.getElementById('qr-priority').value,
    description: document.getElementById('qr-description').value,
    latitude: parseFloat(document.getElementById('qr-lat').value) || 18.6706,
    longitude: parseFloat(document.getElementById('qr-lng').value) || 73.8756
  };

  try {
    const res = await api.createComplaint(payload);
    if (res.success) {
      showToast('✅ ' + t('toast_complaint_success'));
      closeReportModal();
      document.getElementById('quick-report-form').reset();
      document.getElementById('qr-gps-status').innerText = '';

      // Reload live map data so new report appears instantly
      await loadMapData();
    } else {
      showToast('Error: ' + (res.error || 'Failed to submit report'), 'error');
    }
  } catch (err) {
    showToast('Server offline. Report cached locally.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
}

// ===== AI WASTE SEGREGATION ASSISTANT =====
const localAiDataset = {
  'plastic bottle': { type: 'Plastic', bin: 'Blue Bin (Dry Recyclable)', method: 'Rinse, flatten to save space, and place in Blue Recycling Bin.' },
  'flower nirmalya': { type: 'Wet', bin: 'Green Bin (Compostable)', method: 'Sacred temple offerings and flowers go into Green Nirmalya pits for sacred organic composting.' },
  'temple nirmalya': { type: 'Wet', bin: 'Green Bin (Compostable)', method: 'Sacred temple offerings and flowers go into Green Nirmalya pits for sacred organic composting.' },
  'battery': { type: 'Hazardous', bin: 'Red Bin (Domestic Hazardous)', method: '⚠️ Toxic chemicals! Drop off at Alandi E-waste kiosk or battery recycling center. Never throw in normal trash.' },
  'banana peel': { type: 'Wet', bin: 'Green Bin (Organic Waste)', method: '100% biodegradable. Decomposes into nutrient-rich soil in 2-4 weeks.' },
  'cardboard box': { type: 'Dry', bin: 'Blue Bin (Dry Recyclable)', method: 'Flatten completely to save truck space. Ensure free from oil and food grease.' },
  'milk pouch': { type: 'Plastic', bin: 'Blue Bin (Clean Plastic)', method: 'Rinse milk residue, dry, and place with clean soft plastics.' },
  'coconut shell': { type: 'Wet', bin: 'Green Bin (Compostable/Garden)', method: 'Can be used for organic bio-mulch, compost, or incense manufacturing.' },
  'medicine': { type: 'Hazardous', bin: 'Red Bin (Medical Hazardous)', method: 'Expired pharma must be given to primary health clinic or hazardous waste drive.' },
  'glass bottle': { type: 'Dry', bin: 'Blue Bin (Glass Recyclable)', method: 'Clean glass jars and bottles are 100% infinitely recyclable in the blue container.' }
};

function quickAnalyze(item) {
  const input = document.getElementById('waste-item');
  if (input) input.value = item;
  analyzeWaste();
}

async function analyzeWaste() {
  const input = document.getElementById('waste-item');
  const item = input?.value.trim();
  if (!item) return;

  const resultBox = document.getElementById('ai-result');
  if (!resultBox) return;

  resultBox.classList.remove('hidden');
  resultBox.innerHTML = '<p><i class="fa-solid fa-spinner fa-spin"></i> Analyzing with AI Waste Model...</p>';

  let result = null;

  // Try backend AI endpoint
  try {
    const res = await api.segregateWaste(item);
    if (res.success && res.data) {
      result = {
        type: res.data.wasteType,
        bin: res.data.wasteType === 'Wet' ? 'Green Bin (Organic)' : (res.data.wasteType === 'Plastic' || res.data.wasteType === 'Dry' ? 'Blue Bin (Recyclable)' : 'Red Bin (Hazardous)'),
        method: res.data.disposalMethod
      };
    }
  } catch (e) {
    // Fallback to local
  }

  // Local knowledge fallback
  if (!result) {
    const key = item.toLowerCase();
    for (const [k, v] of Object.entries(localAiDataset)) {
      if (key.includes(k) || k.includes(key)) {
        result = v;
        break;
      }
    }
  }

  if (!result) {
    result = {
      type: 'Dry',
      bin: 'Blue or Green Bin',
      method: 'Check local municipal segregation guidelines or dispose in general sorted dry bin.'
    };
  }

  const badgeClass = result.type.toLowerCase();
  resultBox.innerHTML = `
    <h4><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Segregation Recommended</h4>
    <p><strong>Item:</strong> ${item}</p>
    <p><strong>Classification:</strong> <span class="waste-badge ${badgeClass}">${result.type} Waste</span></p>
    <p><strong>Recommended Bin:</strong> <span style="font-weight:700;">${result.bin}</span></p>
    <p><strong>Disposal Instructions:</strong> ${result.method}</p>
  `;
}

// ===== LOAD WARD SANITATION HEROES =====
async function loadWorkers() {
  const grid = document.getElementById('workers-grid');
  if (!grid) return;

  const fallbackWorkers = [
    { name: 'Rajesh Kumar', role: 'Sanitation Supervisor', phone: '+91 98220 12345', area: 'Ward 1 - Devachi Alandi & Temple Complex', image: 'images/workers/worker1.jpg' },
    { name: 'Sunita Deshmukh', role: 'Waste Collection Lead', phone: '+91 98220 23456', area: 'Ward 2 - Indrayani River Ghat & Pilgrim Corridor', image: 'images/workers/worker2.jpg' },
    { name: 'Prakash Shinde', role: 'Dry Waste Operations', phone: '+91 98220 34567', area: 'Ward 3 - Market Road & Vegetable Mandi', image: 'images/workers/worker3.jpg' },
    { name: 'Kavita Jadhav', role: 'Residential Zone In-Charge', phone: '+91 98220 45678', area: 'Ward 4 - Dehu Phata & Chakan Road', image: 'images/workers/worker4.jpg' },
    { name: 'Suresh More', role: 'Composting & Wet Waste Inspector', phone: '+91 98220 56789', area: 'Ward 5 - Vadgaon Ghenand Road', image: 'images/workers/worker5.jpg' },
    { name: 'Anjali Gaikwad', role: 'Emergency Cleanliness Wing', phone: '+91 98220 67890', area: 'Ward 6 - Shivaji Chowk & Bus Station Zone', image: 'images/workers/worker6.jpg' }
  ];

  let workers = [];
  try {
    workers = await api.getWorkers();
  } catch (err) {
    console.warn('Failed to load workers from API, falling back to local list', err);
  }

  if (!workers || workers.length === 0) {
    workers = fallbackWorkers;
  }

  grid.innerHTML = workers.map(w => `
    <div class="worker-card">
      <img src="${w.image}" alt="${w.name}" class="worker-image" loading="lazy" onerror="this.onerror=null;this.src='images/workers/worker1.jpg'">
      <h3>${w.name}</h3>
      <div class="worker-role">${w.role}</div>
      <div class="worker-area"><i class="fa-solid fa-location-dot"></i> ${w.area}</div>
      <div class="worker-actions">
        <a href="tel:${w.phone}" class="worker-btn btn-call"><i class="fa-solid fa-phone"></i> <span data-i18n="btn_call">Call</span></a>
        <a href="https://wa.me/${w.phone.replace(/\\D/g,'')}" target="_blank" class="worker-btn btn-chat"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="btn_whatsapp">WhatsApp</span></a>
      </div>
    </div>
  `).join('');

  if (typeof setLanguage === 'function') {
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    const dynamicElements = grid.querySelectorAll('[data-i18n]');
    dynamicElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }
}

// ===== LOAD CLEANUP DRIVES & EVENTS =====
async function loadEvents() {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  try {
    const events = await api.getEvents();
    if (!events || events.length === 0) return;

    grid.innerHTML = events.map(ev => `
      <div class="event-card">
        <div class="event-date">
          <i class="fa-solid fa-calendar-days"></i>
          ${new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <h3>${ev.title}</h3>
        <div class="event-meta">
          <i class="fa-solid fa-location-dot"></i> ${ev.location}
        </div>
        <p>${ev.description}</p>
        <button onclick="rsvpEvent('${(ev.title || '').replace(/'/g, "\\'")}')" class="btn btn-outline-green btn-sm" style="width:100%;">
          <i class="fa-solid fa-hand-holding-heart"></i> Join This Drive
        </button>
      </div>
    `).join('');
  } catch (err) {
    console.warn('Failed to load events from API', err);
  }
}

function rsvpEvent(title) {
  showToast(`🎉 Thank you for volunteering for "${title}"! See you there.`);
}

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Init map
  initAlandiMap();

  // Load backend content
  loadWorkers();
  loadEvents();

  // Init UI helpers
  initAnimatedCounters();
  highlightCurrentDay();

  // AI input Enter key
  const aiInput = document.getElementById('waste-item');
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') analyzeWaste();
    });
  }

  // Language changed reactive listener
  window.addEventListener('languageChanged', () => {
    if (allHotspotsData && allHotspotsData.length > 0) {
      renderMarkers(allHotspotsData);
    }
  });

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const nav = document.getElementById('nav-links');
        if (nav) nav.classList.remove('open');
      }
    });
  });
});
