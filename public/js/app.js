/* ═══════════════════════════════════════════════════════════════════════════
   NABHYA NDVI FRONTEND — Application Logic
   Handles: API calls, file upload, image comparison, gauge animations
   ═══════════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────────────
  const API_BASE = 'https://anand2842-nabhya-ndvi-api.hf.space';
  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 45; // radius=45 from SVG

  // ── State ───────────────────────────────────────────────────────────────
  let selectedFile = null;
  let isAnalyzing = false;
  let currentView = 'original';
  let imageData = {};

  // ── DOM Refs ────────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    serverStatus:   $('serverStatus'),
    statusText:     $('statusText'),
    dropzone:       $('dropzone'),
    fileInput:      $('fileInput'),
    uploadPreview:  $('uploadPreview'),
    previewImg:     $('previewImg'),
    previewName:    $('previewName'),
    previewMeta:    $('previewMeta'),
    removeFile:     $('removeFile'),
    analyzeBtn:     $('analyzeBtn'),
    progressSection:$('progressSection'),
    progressBar:    $('progressBar'),
    progressStatus: $('progressStatus'),
    resultsSection: $('resultsSection'),
    imageDisplay:   $('imageDisplay'),
    viewTabs:       $('viewTabs'),
    compareContainer:$('compareContainer'),
    compareAfter:   $('compareAfter'),
    compareHandle:  $('compareHandle'),
    toast:          $('toast'),
    modelNote:      $('modelNote'),
    fullscreenBtn:  $('fullscreenBtn'),
    healthVerdict:  $('healthVerdict'),
    barHealthy:     $('barHealthy'),
    barStressed:    $('barStressed'),
    barBarren:      $('barBarren')
  };

  // ── Initialize ──────────────────────────────────────────────────────────
  function init() {
    initParticles();
    checkServerHealth();
    bindUploadEvents();
    bindViewTabs();
    bindComparisonSlider();
    bindThumbnails();
    bindResultActions();

    // Periodic health check
    setInterval(checkServerHealth, 30000);
  }

  // ── Particles Canvas ────────────────────────────────────────────────────
  function initParticles() {
    const canvas = $('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const numParticles = Math.floor((width * height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 1) * 0.4 - 0.1, // Float upward
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`; // Accent color
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();
  }

  // ── Server Health ───────────────────────────────────────────────────────
  async function checkServerHealth() {
    try {
      dom.serverStatus.className = 'server-status waking';
      dom.statusText.textContent = 'Connecting…';

      // No timeout — HF Spaces can take 30–60s to wake from sleep
      const res = await fetch(`${API_BASE}/health`);

      if (res.ok) {
        const data = await res.json();
        dom.serverStatus.className = 'server-status online';
        dom.statusText.textContent = data.model_ready
          ? 'Model ready'
          : 'Server online (model loading…)';
      } else {
        throw new Error('Not OK');
      }
    } catch (e) {
      dom.serverStatus.className = 'server-status waking';
      dom.statusText.textContent = 'Server waking — may take up to 60 s';
      setTimeout(checkServerHealth, 15000);
    }
  }

  // ── File Upload ─────────────────────────────────────────────────────────
  function bindUploadEvents() {
    // File input change
    dom.fileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    });

    // Drag events
    dom.dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dom.dropzone.classList.add('drag-over');
    });

    dom.dropzone.addEventListener('dragleave', () => {
      dom.dropzone.classList.remove('drag-over');
    });

    dom.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dom.dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    // Remove file
    dom.removeFile.addEventListener('click', clearFile);

    // Analyze button
    dom.analyzeBtn.addEventListener('click', function(e) {
      createRipple(e, this);
      runAnalysis();
    });

    // Fullscreen button
    if (dom.fullscreenBtn) {
      dom.fullscreenBtn.addEventListener('click', () => {
        dom.imageDisplay.classList.toggle('is-fullscreen');
      });
    }
  }

  function createRipple(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.querySelector('.ripple');
    if (ripple) ripple.remove();

    button.appendChild(circle);
  }

  // Try sample buttons
  document.querySelectorAll('.btn-sample').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation(); // prevent opening file picker
      const url = btn.dataset.sample;
      const name = btn.innerText;
      
      btn.innerText = 'Loading...';
      btn.disabled = true;
      
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], `${name}.jpg`, { type: 'image/jpeg' });
        handleFile(file);
      } catch (err) {
        showToast('Failed to load sample image', 'error');
        console.error(err);
      } finally {
        btn.innerText = name;
        btn.disabled = false;
      }
    });
  });

  function handleFile(file) {
    if (!file) return;
    
    const ext = file.name.split('.').pop().toLowerCase();
    const validExts = ['jpg', 'jpeg', 'png', 'tif', 'tiff'];
    
    if (!file.type.startsWith('image/') && !validExts.includes(ext)) {
      showToast('Please select an image file (JPG, PNG, TIFF)', 'error');
      return;
    }

    selectedFile = file;
    const isTiff = ext === 'tif' || ext === 'tiff';

    // Show preview -- TIFF cannot render in browser, so use a placeholder
    if (isTiff) {
      dom.previewImg.src = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">' +
        '<rect width="72" height="72" rx="8" fill="%231a2332"/>' +
        '<text x="36" y="32" text-anchor="middle" fill="%2310B981" font-family="sans-serif" font-size="11" font-weight="600">TIFF</text>' +
        '<text x="36" y="48" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="9">GeoTIFF</text>' +
        '</svg>'
      );
      dom.previewName.textContent = file.name;
      dom.previewMeta.textContent = formatFileSize(file.size);
      dom.uploadPreview.classList.add('visible');
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        dom.previewImg.src = e.target.result;
        dom.previewName.textContent = file.name;
        dom.previewMeta.textContent = formatFileSize(file.size);
        dom.uploadPreview.classList.add('visible');
      };
      reader.readAsDataURL(file);
    }

    dom.analyzeBtn.disabled = false;
    dom.resultsSection.classList.remove('visible');
  }

  function clearFile() {
    selectedFile = null;
    dom.fileInput.value = '';
    dom.uploadPreview.classList.remove('visible');
    dom.analyzeBtn.disabled = true;
  }

  // ── Analysis ────────────────────────────────────────────────────────────
  async function runAnalysis() {
    if (!selectedFile || isAnalyzing) return;
    isAnalyzing = true;

    // UI state
    dom.analyzeBtn.disabled = true;
    dom.analyzeBtn.innerHTML = '<div class="spinner"></div><span>Analyzing…</span>';
    dom.resultsSection.classList.remove('visible');
    dom.progressSection.classList.add('visible');

    // Reset progress
    resetProgress();
    setProgressStep('upload', 10, 'Uploading image…');

    const form = new FormData();
    form.append('file', selectedFile);

    try {
      // Simulate multi-step progress during fetch
      // No AbortController — CPU inference is legitimately slow (15–60s)
      const progressPromise = simulateProgress();

      // Add a 60-second timeout to prevent indefinite hanging from network/extension issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        body: form,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error (${res.status})`);
      }

      const data = await res.json();

      // Complete progress
      await progressPromise;
      setProgressStep('render', 100, 'Complete');
      completeAllSteps();

      // Short delay for visual satisfaction
      await delay(400);

      // Hide progress, show results
      dom.progressSection.classList.remove('visible');
      displayResults(data);

    } catch (e) {
      dom.progressSection.classList.remove('visible');

      if (e.name === 'TypeError' && e.message.includes('fetch')) {
        showToast('Cannot reach the server. It may be waking up — try again in 30 seconds.', 'error');
      } else {
        showToast('Analysis failed: ' + e.message, 'error');
      }
    } finally {
      isAnalyzing = false;
      dom.analyzeBtn.disabled = false;
      dom.analyzeBtn.innerHTML = '<span>Analyze Vegetation Health</span>';
    }
  }

  // ── Progress Simulation ─────────────────────────────────────────────────
  function resetProgress() {
    $$('.progress-step').forEach(s => {
      s.classList.remove('active', 'done');
    });
    $$('.progress-line').forEach(l => l.classList.remove('filled'));
    dom.progressBar.style.width = '0%';
  }

  function setProgressStep(step, barPercent, statusText) {
    // Mark this step active
    const stepEl = document.querySelector(`.progress-step[data-step="${step}"]`);
    if (stepEl) stepEl.classList.add('active');

    // Mark previous steps as done
    const steps = ['upload', 'preprocess', 'inference', 'render'];
    const idx = steps.indexOf(step);
    steps.forEach((s, i) => {
      const el = document.querySelector(`.progress-step[data-step="${s}"]`);
      if (i < idx) {
        el.classList.remove('active');
        el.classList.add('done');
      }
    });

    // Fill connecting lines
    $$('.progress-line').forEach(line => {
      const after = line.dataset.after;
      const afterIdx = steps.indexOf(after);
      if (afterIdx < idx) line.classList.add('filled');
    });

    dom.progressBar.style.width = barPercent + '%';
    dom.progressStatus.textContent = statusText;
  }

  function completeAllSteps() {
    $$('.progress-step').forEach(s => {
      s.classList.remove('active');
      s.classList.add('done');
    });
    $$('.progress-line').forEach(l => l.classList.add('filled'));
  }

  function simulateProgress() {
    return new Promise((resolve) => {
      setTimeout(() => setProgressStep('preprocess', 25, 'Preprocessing image…'), 800);
      setTimeout(() => setProgressStep('inference', 50, 'Running neural network inference…'), 2000);
      setTimeout(() => {
        dom.progressBar.style.width = '70%';
        dom.progressStatus.textContent = 'Model computing NDVI map…';
      }, 5000);
      setTimeout(() => {
        dom.progressBar.style.width = '85%';
      }, 8000);
      // Resolve after minimum visual time
      setTimeout(resolve, 2500);
    });
  }

  // ── Display Results ─────────────────────────────────────────────────────
  function displayResults(data) {
    const b64 = (str) => 'data:image/png;base64,' + str;

    imageData = {
      original: b64(data.original_base64),
      heatmap:  b64(data.heatmap_base64),
      annotated: b64(data.annotated_heatmap_base64),
      overlay:  b64(data.overlay_base64),
    };

    // Main views
    $('viewOriginal').src = imageData.original;
    $('viewHeatmap').src  = imageData.heatmap;
    $('viewAnnotated').src = imageData.annotated;
    $('viewOverlay').src  = imageData.overlay;

    // Thumbnails
    $('thumbOrig').src = imageData.original;
    $('thumbHeat').src = imageData.heatmap;
    $('thumbAnnotated').src = imageData.annotated;
    $('thumbOver').src = imageData.overlay;

    // Comparison
    $('compareBefore').src    = imageData.original;
    $('compareAfter_img').src = imageData.heatmap;

    // Set default view
    switchView('original');

    // Show results
    dom.resultsSection.classList.add('visible');

    // Populate Intelligence & Zones
    const intel = data.vegetation_intelligence;
    animateValue($('healthScoreValue'), intel.overall_health_score, 1);
    $('healthGrade').textContent = intel.health_grade;
    $('actionFlag').textContent = intel.action_flag;
    $('actionFlag').className = `action-flag ${intel.action_flag}`;
    $('dominantCondition').textContent = intel.dominant_condition;

    $('zoneSummary').textContent = `${data.total_stress_zones} zones (${data.total_stressed_ha} ha)`;
    const zonesList = $('zonesList');
    zonesList.innerHTML = '';
    
    if (data.stress_zones.length === 0) {
      zonesList.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-tertiary);">No significant stress zones detected.</div>';
    } else {
      data.stress_zones.forEach(z => {
        const item = document.createElement('div');
        item.className = 'zone-item';
        item.innerHTML = `
          <div>
            <div class="zone-id">${z.zone_id}</div>
            <div class="zone-stats">${z.area_ha} ha &middot; Index: ${z.stress_severity_index}</div>
          </div>
          <div class="zone-severity ${z.severity}">${z.severity}</div>
        `;
        zonesList.appendChild(item);
      });
    }

    // Animate stats after a short delay
    setTimeout(() => {
      const s = data.statistics;
      animateGauge($('gaugeHealthy'),  s.healthy_pct,  $('valHealthy'),  '%');
      animateGauge($('gaugeStressed'), s.stressed_pct, $('valStressed'), '%');
      animateGauge($('gaugeBarren'),   s.barren_pct,   $('valBarren'),   '%');

      animateValue($('statMean'), s.mean_ndvi, 4);
      animateValue($('statMax'),  s.max_ndvi,  4);
      animateValue($('statMin'),  s.min_ndvi,  4);

      // Update Histogram
      if (dom.barHealthy) dom.barHealthy.style.height = `${s.healthy_pct}%`;
      if (dom.barStressed) dom.barStressed.style.height = `${s.stressed_pct}%`;
      if (dom.barBarren) dom.barBarren.style.height = `${s.barren_pct}%`;

      // Update Verdict Badge
      if (dom.healthVerdict) {
        dom.healthVerdict.className = 'verdict-badge'; // reset
        const actionFlag = data.vegetation_intelligence.action_flag;
        
        if (actionFlag === 'HEALTHY') {
          dom.healthVerdict.textContent = 'Healthy Vegetation Detected';
          dom.healthVerdict.classList.add('healthy');
        } else if (actionFlag === 'MONITOR') {
          dom.healthVerdict.textContent = 'Moderate Stress Detected';
          dom.healthVerdict.classList.add('stressed');
        } else { // ALERT
          dom.healthVerdict.textContent = 'Stressed — Intervention Needed';
          dom.healthVerdict.classList.add('barren');
        }
      }

    }, 200);

    // Model note
    dom.modelNote.textContent = data.model_used
      ? 'Inference ran on trained Pix2Pix UNet Generator'
      : 'Model not loaded -- results from RGB vegetation approximation';

    // Scroll to results
    setTimeout(() => {
      dom.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    showToast('Analysis complete', 'success');
  }

  // ── View Switching ──────────────────────────────────────────────────────
  function bindViewTabs() {
    dom.viewTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.view-tab');
      if (!tab) return;
      switchView(tab.dataset.view);
    });
  }

  function bindThumbnails() {
    $('imageThumbs').addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb');
      if (!thumb) return;
      switchView(thumb.dataset.view);
    });
  }

  function switchView(view) {
    currentView = view;

    // Update tabs
    $$('.view-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));

    // Update thumbs
    $$('.thumb').forEach(t => t.classList.toggle('active', t.dataset.view === view));

    // Toggle images
    const views = ['original', 'heatmap', 'annotated', 'overlay'];
    views.forEach(v => {
      const el = $('view' + v.charAt(0).toUpperCase() + v.slice(1));
      if(el) el.classList.toggle('visible', v === view && view !== 'compare');
    });

    // Comparison mode
    dom.compareContainer.classList.toggle('visible', view === 'compare');

    // Hide single images in compare mode
    if (view === 'compare') {
      views.forEach(v => {
        $('view' + v.charAt(0).toUpperCase() + v.slice(1)).classList.remove('visible');
      });
    }
  }

  // ── Comparison Slider ───────────────────────────────────────────────────
  function bindComparisonSlider() {
    let isDragging = false;

    function updateSlider(clientX) {
      const rect = dom.imageDisplay.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;

      dom.compareHandle.style.left = percent + '%';
      dom.compareAfter.style.clipPath = `inset(0 0 0 ${percent}%)`;
    }

    dom.compareHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });

    document.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support
    dom.compareHandle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDragging = true;
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => { isDragging = false; });

    // Click to jump
    dom.imageDisplay.addEventListener('click', (e) => {
      if (currentView === 'compare') updateSlider(e.clientX);
    });
  }

  // ── Gauge Animation ────────────────────────────────────────────────────
  function animateGauge(circleEl, percent, valueEl, suffix) {
    const offset = GAUGE_CIRCUMFERENCE * (1 - percent / 100);
    circleEl.style.strokeDashoffset = offset;
    animateValue(valueEl, percent, 1, suffix);
  }

  // ── Count-up Animation ─────────────────────────────────────────────────
  function animateValue(el, target, decimals = 2, suffix = '') {
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Toast ───────────────────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg, type = 'success') {
    clearTimeout(toastTimer);
    dom.toast.textContent = msg;
    dom.toast.className = 'toast ' + type;

    requestAnimationFrame(() => {
      dom.toast.classList.add('visible');
    });

    toastTimer = setTimeout(() => {
      dom.toast.classList.remove('visible');
    }, 4000);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ── Result Actions ──────────────────────────────────────────────────────
  function bindResultActions() {
    $('downloadHeatmap').addEventListener('click', () => {
      if (!imageData.heatmap) return;
      const link = document.createElement('a');
      link.href = imageData.heatmap;
      const name = selectedFile ? selectedFile.name.replace(/\.[^.]+$/, '') : 'ndvi';
      link.download = name + '_ndvi_heatmap.png';
      link.click();
    });

    const btnOverlay = $('downloadOverlay');
    if (btnOverlay) {
      btnOverlay.addEventListener('click', () => {
        if (!imageData.overlay) return;
        const link = document.createElement('a');
        link.href = imageData.overlay;
        const name = selectedFile ? selectedFile.name.replace(/\.[^.]+$/, '') : 'ndvi';
        link.download = name + '_ndvi_overlay.png';
        link.click();
      });
    }

    $('newAnalysis').addEventListener('click', () => {
      clearFile();
      dom.resultsSection.classList.remove('visible');
      dom.dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ── Boot ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

})();
