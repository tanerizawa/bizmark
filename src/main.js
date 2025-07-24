import './style.css'
import { PerformanceMonitor, SimpleAnalytics, trackContactInteraction, trackServiceInterest } from './analytics.js'

// ==========================================================================
// BIZMARK.ID - Main Application JavaScript
// ==========================================================================

// Application state
const app = {
  isScrolled: false,
  mobileMenuOpen: false,
  currentSection: 'home',
  analytics: null,
  performance: null
};

// Initialize the application
function init() {
  // Initialize analytics and performance monitoring
  app.performance = new PerformanceMonitor();
  app.analytics = new SimpleAnalytics();
  window.bizmarkAnalytics = app.analytics; // Make it globally accessible
  
  renderHTML();
  setupEventListeners();
  setupScrollAnimations();
  setupIntersectionObserver();
  setupServiceTracking();
}

// Render the main HTML structure with Apple HIG compliance
function renderHTML() {
  document.querySelector('#app').innerHTML = `
    <!-- Preloader with ARIA attributes -->
    <div class="preloader" id="preloader" role="dialog" aria-label="Loading page content" aria-live="polite">
      <div class="preloader-content">
        <div class="logo-animation" aria-hidden="true">Bizmark.id</div>
        <div class="loading-spinner" role="progressbar" aria-label="Loading"></div>
        <p class="loading-text">Memuat...</p>
      </div>
    </div>

    <!-- Header Navigation with full accessibility -->
    <header class="header" id="header" role="banner">
      <div class="container">
        <nav class="nav" role="navigation" aria-label="Main navigation">
          <a href="#home" class="logo" aria-label="Bizmark.id homepage">Bizmark.id</a>
          
          <!-- Desktop Navigation -->
          <ul class="nav-links" role="menubar">
            <li role="none"><a href="#home" class="nav-link active" role="menuitem" aria-current="page">Beranda</a></li>
            <li role="none"><a href="#about" class="nav-link" role="menuitem">Tentang</a></li>
            <li role="none"><a href="#services" class="nav-link" role="menuitem">Layanan</a></li>
            <li role="none"><a href="#testimonials" class="nav-link" role="menuitem">Testimoni</a></li>
            <li role="none"><a href="#contact" class="nav-link" role="menuitem">Kontak</a></li>
          </ul>
          
          <!-- Mobile Menu Button with proper ARIA -->
          <button 
            class="mobile-menu-btn" 
            id="mobileMenuBtn" 
            aria-label="Toggle mobile menu"
            aria-expanded="false"
            aria-controls="mobileMenu"
            aria-haspopup="true"
          >
            <span class="hamburger-line" aria-hidden="true"></span>
            <span class="hamburger-line" aria-hidden="true"></span>
            <span class="hamburger-line" aria-hidden="true"></span>
          </button>
          
          <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20tertarik%20untuk%20konsultasi%20gratis%20mengenai%20perizinan%20usaha.%20Bisakah%20kami%20berdiskusi%20lebih%20lanjut%3F" class="btn btn-primary btn-sm nav-cta" data-track="nav-cta" target="_blank">Konsultasi Gratis</a>
        </nav>
        
        <!-- Mobile Menu with accessibility -->
        <div 
          class="mobile-menu" 
          id="mobileMenu" 
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          aria-hidden="true"
        >
          <h2 id="mobile-menu-title" class="sr-only">Mobile Navigation Menu</h2>
          <ul class="mobile-nav-links" role="menu">
            <li role="none"><a href="#home" class="mobile-nav-link" role="menuitem">Beranda</a></li>
            <li role="none"><a href="#about" class="mobile-nav-link" role="menuitem">Tentang</a></li>
            <li role="none"><a href="#services" class="mobile-nav-link" role="menuitem">Layanan</a></li>
            <li role="none"><a href="#testimonials" class="mobile-nav-link" role="menuitem">Testimoni</a></li>
            <li role="none"><a href="#contact" class="mobile-nav-link" role="menuitem">Kontak</a></li>
          </ul>
          <div class="mobile-nav-cta">
            <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20ingin%20konsultasi%20gratis%20tentang%20perizinan%20bisnis.%20Mohon%20informasinya." class="btn btn-primary" role="button" data-track="mobile-nav-cta" target="_blank">Konsultasi Gratis</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content with semantic structure -->
    <main role="main">
      <!-- Hero Parallax Slider Section -->
      <section id="home" class="hero-parallax-section" role="banner" aria-labelledby="hero-heading">
        <div class="hero-slider-container">
          <!-- Slide 1: Pengelolaan Limbah B3 -->
          <div class="hero-slide active" data-slide="0">
            <div class="parallax-background">
              <img src="https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop" alt="Industrial Waste Management" loading="lazy">
              <div class="background-overlay"></div>
            </div>
            <div class="hero-content">
              <div class="container">
                <div class="slide-content">
                  <div class="slide-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Izin Pengelolaan Limbah B3
                  </div>
                  <h1 class="slide-title">
                    Solusi Lengkap<br>
                    <span class="text-highlight">Pengelolaan Limbah B3</span>
                  </h1>
                  <p class="slide-description">
                    Dapatkan izin pengelolaan Limbah Bahan Berbahaya & Beracun (B3) yang sesuai dengan regulasi KLHK. 
                    Kami memastikan perusahaan Anda memenuhi standar lingkungan dengan layanan profesional dan terpercaya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 2: Izin Industri dan Rumah Sakit -->
          <div class="hero-slide" data-slide="1">
            <div class="parallax-background">
              <img src="https://images.pexels.com/photos/236378/pexels-photo-236378.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop" alt="Industrial Factory" loading="lazy">
              <div class="background-overlay"></div>
            </div>
            <div class="hero-content">
              <div class="container">
                <div class="slide-content">
                  <div class="slide-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Izin Industri & Kesehatan
                  </div>
                  <h1 class="slide-title">
                    Perizinan Industri &<br>
                    <span class="text-highlight">Fasilitas Kesehatan</span>
                  </h1>
                  <p class="slide-description">
                    Layanan komprehensif untuk perizinan industri manufaktur dan fasilitas kesehatan. 
                    Dari PBG hingga izin operasional, kami pastikan bisnis Anda beroperasi dengan legal dan standar keselamatan tertinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide 3: Perumahan dan Properti -->
          <div class="hero-slide" data-slide="2">
            <div class="parallax-background">
              <img src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop" alt="Modern Housing Development" loading="lazy">
              <div class="background-overlay"></div>
            </div>
            <div class="hero-content">
              <div class="container">
                <div class="slide-content">
                  <div class="slide-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    Perumahan & Properti
                  </div>
                  <h1 class="slide-title">
                    Perizinan Proyek<br>
                    <span class="text-highlight">Perumahan & Properti</span>
                  </h1>
                  <p class="slide-description">
                    Solusi lengkap untuk perizinan proyek perumahan, apartemen, dan properti komersial. 
                    Kami menangani semua aspek regulasi dari tahap perencanaan hingga sertifikat laik fungsi bangunan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section - Compact & Informative -->
      <section id="about" class="section about-section" role="region" aria-labelledby="about-heading">
        <div class="container">
          <div class="about-compact">
            <!-- Main Heading & Description -->
            <div class="about-header">
              <h2 id="about-heading" class="about-title">Mengapa Pilih Bizmark.id?</h2>
              <p class="about-subtitle">
                <strong>PT. Timur Cakrawala Konsultan</strong> - Konsultan terpercaya di Karawang, Jawa Barat dengan 
                <span class="highlight-text">track record 500+ klien</span> dan <span class="highlight-text">98% tingkat keberhasilan</span>
              </p>
            </div>
            
            <!-- Key Stats & Features Grid -->
            <div class="about-content-grid">
              <!-- Left: Key Statistics -->
              <div class="stats-section">
                <div class="stats-grid">
                  <div class="stat-card">
                    <div class="stat-number">7</div>
                    <div class="stat-label">Hari Rata-rata<br>Penyelesaian</div>
                    <div class="stat-desc">Proses perizinan tercepat di Karawang</div>
                  </div>
                  
                  <div class="stat-card">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Tahun<br>Pengalaman</div>
                    <div class="stat-desc">Expertise mendalam di bidang perizinan</div>
                  </div>
                  
                  <div class="stat-card">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Support<br>System</div>
                    <div class="stat-desc">Konsultasi kapan saja Anda butuhkan</div>
                  </div>
                </div>
              </div>
              
              <!-- Right: Key Advantages -->
              <div class="advantages-section">
                <h3 class="advantages-title">Keunggulan Utama</h3>
                <div class="advantages-list">
                  <div class="advantage-item">
                    <div class="advantage-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
                      </svg>
                    </div>
                    <div class="advantage-content">
                      <h4>Kecepatan & Akurasi Terjamin</h4>
                      <p>Sistem tracking real-time dengan SOP standar nasional dan garansi revisi gratis</p>
                    </div>
                  </div>
                  
                  <div class="advantage-item">
                    <div class="advantage-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div class="advantage-content">
                      <h4>Tim Ahli Bersertifikat</h4>
                      <p>25+ konsultan ahli dengan 50+ sertifikasi AMDAL, OSS, dan pengalaman multi-sektor</p>
                    </div>
                  </div>
                  
                  <div class="advantage-item">
                    <div class="advantage-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="4" width="16" height="12" rx="2"/>
                        <path d="m8 18 4-4 4 4-4 2-4-2z"/>
                      </svg>
                    </div>
                    <div class="advantage-content">
                      <h4>Terintegrasi Teknologi</h4>
                      <p>OSS-RBA Partnership dengan digital document management dan mobile progress tracking</p>
                    </div>
                  </div>
                  
                  <div class="advantage-item">
                    <div class="advantage-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="8"/>
                        <path d="M8 12h8"/>
                        <path d="m3 12 6-6-6-6"/>
                        <path d="m21 12-6-6 6-6"/>
                      </svg>
                    </div>
                    <div class="advantage-content">
                      <h4>Jaringan Strategis & Support</h4>
                      <p>Partner resmi instansi dengan dukungan menyeluruh pra & pasca perizinan</p>
                    </div>
                  </div>
                  
                  <div class="advantage-item">
                    <div class="advantage-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <div class="advantage-content">
                      <h4>Efisiensi Biaya</h4>
                      <p>✓ Transparent pricing ✓ No hidden cost ✓ Flexible payment terms ✓ ROI optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="section" style="background-color: var(--color-background-secondary);" role="region" aria-labelledby="services-heading">
        <div class="container">
          <div class="services-compact">
            <div class="services-header">
              <h2 id="services-heading">Layanan Kami</h2>
              <p class="services-subtitle">
                Konsultan terpercaya untuk perizinan usaha dan lingkungan di Karawang & Jawa Barat
              </p>
            </div>
            
            <!-- Services Grid - Compact Layout -->
            <div class="services-grid-compact">
              <!-- Core Services -->
              <div class="services-core">
                <h3 class="services-category-title">Spesialisasi Utama</h3>
                <div class="core-services-row">
                  <div class="service-card-compact primary-service">
                    <div class="service-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 3v18m9-9H3"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <div class="service-content-compact">
                      <h4>Perizinan Lingkungan</h4>
                      <p>AMDAL • UKL/UPL • Limbah B3 • ANDALALIN</p>
                    </div>
                  </div>
                  
                  <div class="service-card-compact">
                    <div class="service-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <div class="service-content-compact">
                      <h4>OSS & Perizinan Usaha</h4>
                      <p>NIB • SIUP • OSS-RBA • PBG</p>
                    </div>
                  </div>
                  
                  <div class="service-card-compact">
                    <div class="service-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      </svg>
                    </div>
                    <div class="service-content-compact">
                      <h4>Pendirian Badan Usaha</h4>
                      <p>PT • CV • Yayasan • Akta Notaris</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Supporting Services -->
              <div class="services-supporting">
                <h3 class="services-category-title">Layanan Pendukung</h3>
                <div class="supporting-services-grid">
                  <div class="service-item-mini">
                    <div class="service-mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                    </div>
                    <div class="service-mini-content">
                      <h5>Keuangan & Perpajakan</h5>
                      <span>SPT • Audit • Pembukuan</span>
                    </div>
                  </div>
                  
                  <div class="service-item-mini">
                    <div class="service-mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
                      </svg>
                    </div>
                    <div class="service-mini-content">
                      <h5>Inkubator UMKM</h5>
                      <span>Mentoring • Digital • Coaching</span>
                    </div>
                  </div>
                  
                  <div class="service-item-mini">
                    <div class="service-mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 0 6 0 9-5"/>
                      </svg>
                    </div>
                    <div class="service-mini-content">
                      <h5>Pelatihan & Workshop</h5>
                      <span>Corporate • Legal • Management</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Service CTA -->
              <div class="services-cta">
                <div class="cta-content">
                  <h4>Butuh Konsultasi Khusus?</h4>
                  <p>Tim ahli kami siap membantu analisis kebutuhan perizinan bisnis Anda</p>
                </div>
                <div class="cta-actions">
                  <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20tertarik%20dengan%20layanan%20perizinan%20yang%20Anda%20tawarkan.%20Bisakah%20saya%20mendapat%20konsultasi%20gratis%3F" class="btn btn-primary" data-track="services-consultation" target="_blank">
                    Konsultasi Gratis
                  </a>
                  <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20ingin%20menghubungi%20langsung%20untuk%20perizinan%20usaha." class="btn btn-outline-primary" data-track="services-call" target="_blank">
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
 
          
          <!-- Service Process Section - Compact Single Screen Design -->
          <div class="process-section">
            <div class="process-header">
              <h3 class="section-title">Proses Kerja Kami</h3>
              <p class="section-subtitle">Metodologi sistematis untuk hasil yang optimal</p>
            </div>
            
            <!-- Compact Horizontal Process Flow -->
            <div class="process-flow-compact">
              <div class="process-steps-grid">
                <!-- Step 1 -->
                <div class="process-step-compact" data-step="1">
                  <div class="step-circle-compact active">
                    <div class="step-number-compact">01</div>
                    <div class="step-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <path d="M13 8H7"/>
                        <path d="M17 12H7"/>
                      </svg>
                    </div>
                  </div>
                  <div class="step-info-compact">
                    <h4>Konsultasi Awal</h4>
                    <p>Analisis kebutuhan & assessment dokumen</p>
                    <div class="step-features-compact">
                      <span>🆓 Gratis</span>
                      <span>⏱️ 30 menit</span>
                    </div>
                  </div>
                  <div class="step-arrow-compact">
                    <svg viewBox="0 0 24 12">
                      <path d="M2 6 L18 6 M15 3 L18 6 L15 9" stroke="var(--color-teal-primary)" stroke-width="2" fill="none"/>
                    </svg>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="process-step-compact" data-step="2">
                  <div class="step-circle-compact">
                    <div class="step-number-compact">02</div>
                    <div class="step-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                      </svg>
                    </div>
                  </div>
                  <div class="step-info-compact">
                    <h4>Proposal & Planning</h4>
                    <p>Timeline, budget & scope pekerjaan</p>
                    <div class="step-features-compact">
                      <span>📋 Transparan</span>
                      <span>📊 Detail</span>
                    </div>
                  </div>
                  <div class="step-arrow-compact">
                    <svg viewBox="0 0 24 12">
                      <path d="M2 6 L18 6 M15 3 L18 6 L15 9" stroke="var(--color-teal-primary)" stroke-width="2" fill="none"/>
                    </svg>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="process-step-compact" data-step="3">
                  <div class="step-circle-compact">
                    <div class="step-number-compact">03</div>
                    <div class="step-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/>
                      </svg>
                    </div>
                  </div>
                  <div class="step-info-compact">
                    <h4>Eksekusi</h4>
                    <p>Pengurusan dengan monitoring real-time</p>
                    <div class="step-features-compact">
                      <span>⚡ Real-time</span>
                      <span>📱 Update</span>
                    </div>
                  </div>
                  <div class="step-arrow-compact">
                    <svg viewBox="0 0 24 12">
                      <path d="M2 6 L18 6 M15 3 L18 6 L15 9" stroke="var(--color-teal-primary)" stroke-width="2" fill="none"/>
                    </svg>
                  </div>
                </div>

                <!-- Step 4 -->
                <div class="process-step-compact" data-step="4">
                  <div class="step-circle-compact completed">
                    <div class="step-number-compact">04</div>
                    <div class="step-icon-compact">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22,4 12,14.01 9,11.01"/>
                      </svg>
                    </div>
                  </div>
                  <div class="step-info-compact">
                    <h4>Serah Terima</h4>
                    <p>Dokumen lengkap + after-sales support</p>
                    <div class="step-features-compact">
                      <span>✅ Lengkap</span>
                      <span>🎯 Support</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Compact Stats & CTA Row -->
              <div class="process-bottom-compact">
                <div class="process-stats-compact">
                  <div class="stat-compact">
                    <div class="stat-number-compact">7</div>
                    <div class="stat-label-compact">Hari Rata-rata</div>
                  </div>
                  <div class="stat-compact">
                    <div class="stat-number-compact">98%</div>
                    <div class="stat-label-compact">Tingkat Sukses</div>
                  </div>
                  <div class="stat-compact">
                    <div class="stat-number-compact">500+</div>
                    <div class="stat-label-compact">Klien Terlayani</div>
                  </div>
                </div>
                <div class="process-cta-compact">
                  <h4>Siap memulai proses perizinan bisnis Anda?</h4>
                  <div class="cta-buttons-compact">
                    <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20siap%20memulai%20proses%20perizinan%20bisnis%20dan%20ingin%20konsultasi%20gratis%20terlebih%20dahulu.%20Mohon%20bantuannya." class="btn btn-primary" data-track="process-cta" target="_blank">
                      Mulai Konsultasi Gratis
                    </a>
                    <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20siap%20memulai%20proses%20perizinan%20bisnis.%20Mohon%20bantuannya." class="btn btn-outline-primary" data-track="process-call" target="_blank">
                      Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section id="testimonials" class="section testimonials-carousel-section">
        <div class="container">
          <div class="text-center mb-xl">
            <h2>Testimoni Klien</h2>
            <p class="text-lg">
              Kepercayaan klien adalah prioritas utama kami
            </p>
          </div>
          
          <div class="testimonials-carousel-container">
            <div class="testimonials-carousel">
              <!-- Testimonial Cards -->
              <div class="testimonial-card active">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Layanan OSS berbasis risiko sangat membantu perusahaan B3 kami. Mereka memahami alur sistem OSS-RBA dengan sempurna."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">PT</div>
                  <div class="author-info">
                    <div class="author-name">PT Timuraya Tunggal</div>
                    <div class="author-role">Perusahaan B3</div>
                  </div>
                </div>
              </div>

              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Proses perizinan Limbah B3 yang kompleks menjadi mudah. Seluruh dokumen lengkap dan sesuai regulasi KLHK."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">PT</div>
                  <div class="author-info">
                    <div class="author-name">PT Rindu Alam Sejahtera</div>
                    <div class="author-role">Pengelola Limbah B3</div>
                  </div>
                </div>
              </div>

              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Pengurusan PBG infrastruktur jaringan kami cepat dan terkoordinasi. Sangat memahami teknis lapangan."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">BZ</div>
                  <div class="author-info">
                    <div class="author-name">PT. Supra Primatama Nusantara</div>
                    <div class="author-role">Biznet</div>
                  </div>
                </div>
              </div>

              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Pendampingan legalitas proyek hunian tidak hanya teknis tapi strategis. AMDAL, PBG, IMB tersusun rapi."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">BN</div>
                  <div class="author-info">
                    <div class="author-name">BUMI NUANI Residence</div>
                    <div class="author-role">Developer Properti</div>
                  </div>
                </div>
              </div>

              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Pelayanan sangat profesional dengan pengalaman luas. Selalu memberikan solusi terbaik untuk tantangan perizinan."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">KP</div>
                  <div class="author-info">
                    <div class="author-name">PT Karawang Prima Industri</div>
                    <div class="author-role">Perusahaan Industri</div>
                  </div>
                </div>
              </div>

              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="quote-icon">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p>"Layanan inkubator UMKM sangat membantu startup. Dari legalitas hingga strategi bisnis ditangani profesional."</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">DS</div>
                  <div class="author-info">
                    <div class="author-name">CV Digital Solusi Indonesia</div>
                    <div class="author-role">Startup Technology</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Carousel Navigation -->
            <div class="carousel-nav">
              <button class="carousel-btn prev-btn" onclick="prevTestimonial()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <button class="carousel-btn next-btn" onclick="nextTestimonial()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>

            <!-- Carousel Indicators -->
            <div class="carousel-indicators">
              <button class="indicator active" onclick="goToTestimonial(0)"></button>
              <button class="indicator" onclick="goToTestimonial(1)"></button>
              <button class="indicator" onclick="goToTestimonial(2)"></button>
              <button class="indicator" onclick="goToTestimonial(3)"></button>
              <button class="indicator" onclick="goToTestimonial(4)"></button>
              <button class="indicator" onclick="goToTestimonial(5)"></button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <!-- Main Footer Content -->
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-brand">
              <h3 class="footer-logo">Bizmark.id</h3>
              <p class="footer-tagline">PT. Timur Cakrawala Konsultan</p>
              <p class="footer-description">
                Mitra strategis dalam urusan legalitas dan pengembangan bisnis di Indonesia. 
                Kami berkomitmen memberikan layanan berkualitas tinggi dengan standar profesional terbaik.
              </p>
              
              <!-- Social Media Links -->
              <div class="footer-social">
                <a href="https://wa.me/6283879602855?text=Halo%20Bizmark.id%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20tentang%20layanan%20konsultasi%20perizinan%20usaha%20Anda." class="social-link" aria-label="WhatsApp" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                  </svg>
                </a>
                <a href="mailto:info@bizmark.id" class="social-link" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
                <a href="https://instagram.com/bizmark.id" class="social-link" aria-label="Instagram" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Layanan Utama</h4>
            <ul class="footer-links">
              <li><a href="#services" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                Perizinan Lingkungan
              </a></li>
              <li><a href="#services" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                Perizinan Usaha OSS
              </a></li>
              <li><a href="#services" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Inkubator UMKM
              </a></li>
              <li><a href="#services" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Laporan Keuangan
              </a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Informasi</h4>
            <ul class="footer-links">
              <li><a href="#about" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Tentang Kami
              </a></li>
              <li><a href="#process" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Proses Kerja
              </a></li>
              <li><a href="#testimonials" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
                Testimoni Klien
              </a></li>
              <li><a href="#contact" class="footer-link">
                <svg class="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Hubungi Kami
              </a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Alamat Kantor</h4>
            <div class="footer-address">
              <div class="address-item">
                <svg class="address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="address-text">
                  <p>PT. Timur Cakrawala Konsultan</p>
                  <p>Jl. Permata Sari Indah No.2</p>
                  <p>Palumbonsari, Kec. Karawang Tim.</p>
                  <p>Karawang, Jawa Barat 41314</p>
                  <p>Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="footer-copyright">
              © 2024 Bizmark.id - PT. Timur Cakrawala Konsultan. All rights reserved.
            </p>
            <div class="footer-bottom-links">
              <a href="#" class="footer-bottom-link">Kebijakan Privasi</a>
              <span class="footer-divider">•</span>
              <a href="#" class="footer-bottom-link">Syarat & Ketentuan</a>
              <span class="footer-divider">•</span>
              <a href="#" class="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Setup event listeners
function setupEventListeners() {
  // Preloader
  window.addEventListener('load', hidePreloader);
  
  // Scroll event for header
  window.addEventListener('scroll', debounce(handleScroll, 10));
  
  // Navigation clicks
  document.addEventListener('click', handleNavigation);
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (app.mobileMenuOpen && !e.target.closest('.header')) {
      closeMobileMenu();
    }
  });
  
  // Handle escape key for mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app.mobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (app.mobileMenuOpen) {
          closeMobileMenu();
        }
        
        // Track navigation
        if (app.analytics) {
          app.analytics.trackEvent('navigation_click', {
            target: this.getAttribute('href'),
            text: this.textContent
          });
        }
      }
    });
  });
  
  // Track all clicks with data-track attribute
  document.addEventListener('click', (e) => {
    const trackData = e.target.getAttribute('data-track');
    if (trackData && app.analytics) {
      app.analytics.trackEvent('tracked_click', {
        action: trackData,
        element: e.target.tagName,
        text: e.target.textContent
      });
    }
  });
}

// Handle scroll events
function handleScroll() {
  const header = document.getElementById('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50 && !app.isScrolled) {
    header.classList.add('scrolled');
    app.isScrolled = true;
  } else if (scrollPosition <= 50 && app.isScrolled) {
    header.classList.remove('scrolled');
    app.isScrolled = false;
  }
}

// Handle navigation
function handleNavigation(e) {
  if (e.target.classList.contains('nav-link') || e.target.classList.contains('mobile-nav-link')) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    e.target.classList.add('active');
  }
}

// Preloader functions
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

// Mobile menu functions
function toggleMobileMenu() {
  if (app.mobileMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
    app.mobileMenuOpen = true;
    
    // Track mobile menu open
    if (app.analytics) {
      app.analytics.trackEvent('mobile_menu_open');
    }
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
    app.mobileMenuOpen = false;
  }
}

// Setup scroll animations
function setupScrollAnimations() {
  // Handle all animation types
  const animationSelectors = [
    '.animate-fade-in-up',
    '.animate-fade-in',
    '.animate-scale',
    '.animate-slide-in-left',
    '.animate-slide-in-right'
  ];
  
  const allAnimateElements = document.querySelectorAll(animationSelectors.join(', '));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Apply different animation styles based on class
        if (element.classList.contains('animate-fade-in-up')) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        } else if (element.classList.contains('animate-fade-in')) {
          element.style.opacity = '1';
        } else if (element.classList.contains('animate-scale')) {
          element.style.opacity = '1';
          element.style.transform = 'scale(1)';
        } else if (element.classList.contains('animate-slide-in-left')) {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        } else if (element.classList.contains('animate-slide-in-right')) {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        }
        
        // Track element visibility
        if (app.analytics) {
          app.analytics.trackEvent('element_visible', {
            element: element.className
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Initialize styles for each animation type
  allAnimateElements.forEach(el => {
    if (el.classList.contains('animate-fade-in-up')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    } else if (el.classList.contains('animate-fade-in')) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.6s ease-out';
    } else if (el.classList.contains('animate-scale')) {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    } else if (el.classList.contains('animate-slide-in-left')) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    } else if (el.classList.contains('animate-slide-in-right')) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(50px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }
    
    // Handle animation delays
    if (el.classList.contains('animate-delay-100')) {
      el.style.transitionDelay = '0.1s';
    } else if (el.classList.contains('animate-delay-200')) {
      el.style.transitionDelay = '0.2s';
    } else if (el.classList.contains('animate-delay-300')) {
      el.style.transitionDelay = '0.3s';
    } else if (el.classList.contains('animate-delay-400')) {
      el.style.transitionDelay = '0.4s';
    }
    
    observer.observe(el);
  });
}

// Setup intersection observer for navigation highlighting
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentSection = entry.target.id;
        
        // Update navigation
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
        
        app.currentSection = currentSection;
        
        // Track section view
        if (app.analytics) {
          app.analytics.trackEvent('section_view', {
            section: currentSection
          });
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Setup service tracking
function setupServiceTracking() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const serviceName = card.getAttribute('data-service');
      if (serviceName) {
        trackServiceInterest(serviceName);
      }
    });
  });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some basic error handling
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  if (app.analytics) {
    app.analytics.trackEvent('javascript_error', {
      message: e.error?.message,
      filename: e.filename,
      line: e.lineno
    });
  }
});

// Floating WhatsApp CTA Component
function createFloatingWhatsApp() {
  const floatingWA = document.createElement('div');
  floatingWA.className = 'floating-whatsapp';
  floatingWA.innerHTML = `
    <div class="floating-wa-container">
      <div class="floating-wa-tooltip">
        <div class="tooltip-content">
          <div class="tooltip-header">
            <div class="tooltip-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
            <div class="tooltip-info">
              <div class="tooltip-name">Bizmark.id</div>
              <div class="tooltip-status">
                <div class="status-dot"></div>
                Online
              </div>
            </div>
          </div>
          <div class="tooltip-message">
            Ada yang bisa kami bantu? 💬
          </div>
          <div class="tooltip-time">
            Biasanya membalas dalam beberapa menit
          </div>
        </div>
        <div class="tooltip-arrow"></div>
      </div>
      
      <button class="floating-wa-button" onclick="openWhatsAppChat()">
        <div class="wa-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </div>
        <div class="wa-pulse-1"></div>
        <div class="wa-pulse-2"></div>
        <div class="wa-pulse-3"></div>
      </button>
      
      <div class="floating-wa-notification">
        <div class="notification-dot">1</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(floatingWA);
  
  // Initialize floating WhatsApp behavior
  initFloatingWhatsApp();
}

function initFloatingWhatsApp() {
  const floatingWA = document.querySelector('.floating-whatsapp');
  const button = document.querySelector('.floating-wa-button');
  const tooltip = document.querySelector('.floating-wa-tooltip');
  const notification = document.querySelector('.floating-wa-notification');
  
  // Show/hide tooltip on hover
  button.addEventListener('mouseenter', () => {
    tooltip.classList.add('show');
  });
  
  button.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!tooltip.matches(':hover')) {
        tooltip.classList.remove('show');
      }
    }, 100);
  });
  
  tooltip.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });
  
  // Auto-show notification after 5 seconds
  setTimeout(() => {
    notification.classList.add('show');
    
    // Auto-hide notification after 10 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 10000);
  }, 5000);
  
  // Hide notification on button click
  button.addEventListener('click', () => {
    notification.classList.remove('show');
  });
  
  // Scroll behavior - hide when scrolling up, show when scrolling down
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateFloatingWA() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      floatingWA.classList.add('scroll-hide');
    } else {
      // Scrolling up
      floatingWA.classList.remove('scroll-hide');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateFloatingWA);
      ticking = true;
    }
  });
}

function openWhatsAppChat() {
  const message = encodeURIComponent('Halo Bizmark.id, saya tertarik untuk konsultasi mengenai perizinan usaha. Bisakah kami berdiskusi lebih lanjut?');
  const whatsappURL = `https://wa.me/6283879602855?text=${message}`;
  
  // Track the interaction
  if (window.app && window.app.analytics) {
    window.app.analytics.trackEvent('floating_whatsapp_click', {
      source: 'floating_button',
      timestamp: new Date().toISOString()
    });
  }
  
  window.open(whatsappURL, '_blank');
}

// Testimonial Carousel Functions
let currentTestimonialIndex = 0;
const totalTestimonials = 6;
let testimonialInterval;

function initTestimonialCarousel() {
  // Auto-play carousel
  startTestimonialAutoPlay();
  
  // Pause on hover
  const carouselContainer = document.querySelector('.testimonials-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopTestimonialAutoPlay);
    carouselContainer.addEventListener('mouseleave', startTestimonialAutoPlay);
  }
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
  updateTestimonialCarousel();
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + totalTestimonials) % totalTestimonials;
  updateTestimonialCarousel();
}

function goToTestimonial(index) {
  currentTestimonialIndex = index;
  updateTestimonialCarousel();
}

function updateTestimonialCarousel() {
  const cards = document.querySelectorAll('.testimonial-card');
  const indicators = document.querySelectorAll('.indicator');
  
  // Update cards
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentTestimonialIndex);
  });
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentTestimonialIndex);
  });
  
  // Update carousel position
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    carousel.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
  }
}

function startTestimonialAutoPlay() {
  stopTestimonialAutoPlay();
  testimonialInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
}

function stopTestimonialAutoPlay() {
  if (testimonialInterval) {
    clearInterval(testimonialInterval);
    testimonialInterval = null;
  }
}

// Make functions global for onclick handlers
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.goToTestimonial = goToTestimonial;

// Hero Parallax Slider Functions
let currentHeroSlide = 0;
const totalHeroSlides = 3;
let heroSliderInterval;
let isHeroAutoPlay = true;

function initHeroSlider() {
  // Start auto-play
  startHeroAutoPlay();
  
  // Pause on hover
  const heroContainer = document.querySelector('.hero-slider-container');
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', stopHeroAutoPlay);
    heroContainer.addEventListener('mouseleave', () => {
      if (isHeroAutoPlay) startHeroAutoPlay();
    });
  }
  
  // Initialize parallax effect
  initParallaxEffect();
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevHeroSlide();
    } else if (e.key === 'ArrowRight') {
      nextHeroSlide();
    }
  });
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  updateHeroSlider();
  resetHeroAutoPlay();
}

function prevHeroSlide() {
  currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  updateHeroSlider();
  resetHeroAutoPlay();
}

function goToHeroSlide(index) {
  currentHeroSlide = index;
  updateHeroSlider();
  resetHeroAutoPlay();
}

function updateHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  
  // Update slides
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentHeroSlide);
  });
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentHeroSlide);
  });
  
  // Track slide change
  if (window.app && window.app.analytics) {
    const slideNames = ['limbah-b3', 'industri-rs', 'perumahan'];
    window.app.analytics.trackEvent('hero_slide_change', {
      slide: slideNames[currentHeroSlide],
      index: currentHeroSlide
    });
  }
}

function startHeroAutoPlay() {
  stopHeroAutoPlay();
  heroSliderInterval = setInterval(nextHeroSlide, 7000); // Change every 7 seconds
}

function stopHeroAutoPlay() {
  if (heroSliderInterval) {
    clearInterval(heroSliderInterval);
    heroSliderInterval = null;
  }
}

function resetHeroAutoPlay() {
  if (isHeroAutoPlay) {
    startHeroAutoPlay();
  }
}

function initParallaxEffect() {
  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.pageYOffset;
    const heroSection = document.querySelector('.hero-parallax-section');
    
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const backgrounds = document.querySelectorAll('.parallax-background');
        backgrounds.forEach((bg, index) => {
          if (index === currentHeroSlide) {
            const speed = 0.5; // Parallax speed
            bg.style.transform = `translateY(${scrollY * speed}px) scale(1.1)`;
          }
        });
      }
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// Make hero slider functions global for onclick handlers
window.nextHeroSlide = nextHeroSlide;
window.prevHeroSlide = prevHeroSlide;
window.goToHeroSlide = goToHeroSlide;

// Initialize floating WhatsApp when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add a small delay to ensure everything is loaded
  setTimeout(createFloatingWhatsApp, 1000);
  
  // Initialize testimonial carousel
  setTimeout(initTestimonialCarousel, 1500);
  
  // Initialize hero slider
  setTimeout(initHeroSlider, 500);
});

// Export for potential future use
export { app, init };
