import './style.css'
import { PerformanceMonitor, SimpleAnalytics, trackContactInteraction, trackServiceInterest } from './analytics.js'
// Render the main HTML structure
function renderHTML() {
  document.querySelector('#app').innerHTML = `
    <!-- Preloader -->
    <div class="preloader" id="preloader">
      <div class="preloader-content">
        <div class="logo-animation">Bizmark.id</div>
        <div class="loading-spinner"></div>
        <p class="loading-text">Memuat...</p>
      </div>
    </div>

    <!-- Header Navigation -->
    <header class="header" id="header">
      <div class="container">
        <nav class="nav">
          <a href="#home" class="logo">Bizmark.id</a>
          
          <!-- Desktop Navigation -->
          <ul class="nav-links">
            <li><a href="#home" class="nav-link active">Beranda</a></li>
            <li><a href="#about" class="nav-link">Tentang</a></li>
            <li><a href="#services" class="nav-link">Layanan</a></li>
            <li><a href="#testimonials" class="nav-link">Testimoni</a></li>
            <li><a href="#contact" class="nav-link">Kontak</a></li>
          </ul>
          
          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle mobile menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          
          <a href="#contact" class="btn btn-primary btn-sm nav-cta">Konsultasi Gratis</a>
        </nav>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobileMenu">
          <ul class="mobile-nav-links">
            <li><a href="#home" class="mobile-nav-link">Beranda</a></li>
            <li><a href="#about" class="mobile-nav-link">Tentang</a></li>
            <li><a href="#services" class="mobile-nav-link">Layanan</a></li>
            <li><a href="#testimonials" class="mobile-nav-link">Testimoni</a></li>
            <li><a href="#contact" class="mobile-nav-link">Kontak</a></li>
            <li><a href="#contact" class="btn btn-primary btn-sm">Konsultasi Gratis</a></li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section id="home" class="hero section">
        <div class="container">
          <h1 class="animate-fade-in-up">
            Dapatkan Izin Usaha & Lingkungan<br>
            <span style="color: var(--color-primary);">dalam Hitungan Hari</span>
          </h1>
          <p class="animate-fade-in-up">
            Bizmark.id adalah mitra strategis dalam urusan legalitas dan pengembangan bisnis di Indonesia. 
            Kami bantu pelaku UMKM dan startup mendapatkan izin usaha, menyusun laporan keuangan, 
            hingga bertumbuh lewat digitalisasi dan inkubasi bisnis.
          </p>
          <div class="flex gap-md justify-center animate-fade-in-up">
            <a href="#services" class="btn btn-primary btn-lg">Lihat Layanan</a>
            <a href="#contact" class="btn btn-secondary btn-lg">Konsultasi Gratis</a>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="section">
        <div class="container">
          <div class="text-center mb-xl">
            <h2>Mengapa Pilih Bizmark.id?</h2>
            <p class="text-lg">
              Berlokasi di Karawang, Jawa Barat, di bawah legalitas PT. Timur Cakrawala Konsultan.
              Berpengalaman membantu ratusan usaha lokal dan nasional.
            </p>
          </div>
          
          <div class="grid grid-4">
            <div class="card text-center">
              <div class="service-icon">⚡</div>
              <h4>Layanan Cepat & Akurat</h4>
              <p>Proses perizinan yang efisien dengan waktu penyelesaian yang terjamin</p>
            </div>
            
            <div class="card text-center">
              <div class="service-icon">👥</div>
              <h4>Konsultan Berpengalaman</h4>
              <p>Tim ahli dengan pengalaman puluhan tahun di bidang perizinan</p>
            </div>
            
            <div class="card text-center">
              <div class="service-icon">🔗</div>
              <h4>Terintegrasi OSS</h4>
              <p>Terhubung langsung dengan sistem resmi pemerintah</p>
            </div>
            
            <div class="card text-center">
              <div class="service-icon">💬</div>
              <h4>Komunikasi Transparan</h4>
              <p>Update progress real-time dan komunikasi yang responsif</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="section" style="background-color: var(--color-background-secondary);">
        <div class="container">
          <div class="text-center mb-xl">
            <h2>Layanan Kami</h2>
            <p class="text-lg">
              Solusi lengkap untuk kebutuhan perizinan usaha dan lingkungan Anda
            </p>
          </div>
          
          <div class="services-grid">
            <!-- Service 1: Environmental Permits -->
            <div class="card service-card">
              <div class="service-icon">🌿</div>
              <h3>Perizinan Lingkungan</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• Pengelolaan Limbah B3/non-B3</li>
                <li>• AMDAL (Analisis Mengenai Dampak Lingkungan)</li>
                <li>• ANDALALIN (Analisis Dampak Lalu Lintas)</li>
                <li>• UKL/UPL (Upaya Pengelolaan & Pemantauan Lingkungan)</li>
                <li>• Kajian Lingkungan Hidup</li>
              </ul>
            </div>
            
            <!-- Service 2: Business Permits -->
            <div class="card service-card">
              <div class="service-icon">🏢</div>
              <h3>Perizinan Usaha Digital</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• NIB (Nomor Induk Berusaha)</li>
                <li>• SIUP (Surat Izin Usaha Perdagangan)</li>
                <li>• TDUP (Tanda Daftar Usaha Pariwisata)</li>
                <li>• OSS RBA (Online Single Submission)</li>
                <li>• Izin Berusaha Lainnya</li>
              </ul>
            </div>
            
            <!-- Service 3: UMKM Incubator -->
            <div class="card service-card">
              <div class="service-icon">🚀</div>
              <h3>Inkubator UMKM</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• Pendampingan Bisnis</li>
                <li>• Legalitas Usaha</li>
                <li>• Branding & Marketing</li>
                <li>• Digitalisasi Bisnis</li>
                <li>• Akses Permodalan</li>
              </ul>
            </div>
            
            <!-- Service 4: Tax & Finance -->
            <div class="card service-card">
              <div class="service-icon">📊</div>
              <h3>Laporan Keuangan & Pajak</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• Pembukuan Perusahaan</li>
                <li>• SPT Tahunan</li>
                <li>• Pencatatan Usaha Kecil</li>
                <li>• Konsultasi Pajak</li>
                <li>• Perencanaan Keuangan</li>
              </ul>
            </div>
            
            <!-- Service 5: Company Establishment -->
            <div class="card service-card">
              <div class="service-icon">🏗️</div>
              <h3>Pendirian Perusahaan</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• PT (Perseroan Terbatas)</li>
                <li>• CV (Commanditaire Vennootschap)</li>
                <li>• Koperasi</li>
                <li>• Yayasan</li>
                <li>• Perkumpulan</li>
              </ul>
            </div>
            
            <!-- Service 6: Training -->
            <div class="card service-card">
              <div class="service-icon">🎓</div>
              <h3>Workshop & Mentoring</h3>
              <ul style="text-align: left; margin-top: 1rem;">
                <li>• Pelatihan Bisnis</li>
                <li>• Workshop Legal</li>
                <li>• Manajemen Perusahaan</li>
                <li>• Digital Marketing</li>
                <li>• Compliance Training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section id="testimonials" class="section">
        <div class="container">
          <div class="text-center mb-xl">
            <h2>Testimoni Klien</h2>
            <p class="text-lg">
              Kepercayaan klien adalah prioritas utama kami
            </p>
          </div>
          
          <div class="grid grid-3">
            <div class="testimonial">
              <p class="testimonial-text">
                "Sebagai perusahaan B3, kami terbantu sekali dengan layanan OSS berbasis risiko dari Bizmark.id. 
                Mereka memahami alur sistem OSS-RBA dan membantu kami sampai tahap final perizinan operasional."
              </p>
              <div class="testimonial-author">PT Timuraya Tunggal</div>
            </div>
            
            <div class="testimonial">
              <p class="testimonial-text">
                "Bizmark.id sangat membantu kami dalam proses perizinan pengelolaan Limbah B3 yang tergolong kompleks 
                dan sensitif. Dengan dukungan mereka, seluruh dokumen kami lengkap dan sesuai regulasi KLHK."
              </p>
              <div class="testimonial-author">PT Rindu Alam Sejahtera</div>
            </div>
            
            <div class="testimonial">
              <p class="testimonial-text">
                "Kami menggunakan layanan Bizmark.id untuk pengurusan PBG beberapa titik infrastruktur jaringan kami. 
                Prosesnya cepat, terkoordinasi, dan sangat memahami teknis di lapangan."
              </p>
              <div class="testimonial-author">PT. Supra Primatama Nusantara (Biznet)</div>
            </div>
            
            <div class="testimonial">
              <p class="testimonial-text">
                "Dalam mengurus legalitas proyek hunian kami di Karawang, Bizmark.id memberikan pendampingan yang 
                tidak hanya teknis tapi juga strategis. Seluruh dokumen AMDAL, PBG, dan IMB disusun dengan sangat rapi."
              </p>
              <div class="testimonial-author">BUMI NUANI Residence</div>
            </div>
            
            <div class="testimonial">
              <p class="testimonial-text">
                "Pelayanan yang sangat profesional dalam pengurusan izin usaha kami. Tim Bizmark.id memiliki 
                pengalaman yang luas dan selalu memberikan solusi terbaik untuk setiap tantangan perizinan."
              </p>
              <div class="testimonial-author">PT Karawang Prima Industri</div>
            </div>
            
            <div class="testimonial">
              <p class="testimonial-text">
                "Sebagai startup, kami sangat terbantu dengan layanan inkubator UMKM dari Bizmark.id. 
                Dari legalitas hingga strategi bisnis, semuanya ditangani dengan profesional."
              </p>
              <div class="testimonial-author">CV Digital Solusi Indonesia</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section" style="background-color: var(--color-background-secondary);">
        <div class="container">
          <div class="text-center mb-xl">
            <h2>Hubungi Kami</h2>
            <p class="text-lg">
              Bingung soal izin usaha? Ingin bisnis Anda lebih terstruktur?<br>
              Kami siap bantu dari awal hingga tumbuh.
            </p>
          </div>
          
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <h4>WhatsApp</h4>
              <p>
                <a href="https://wa.me/628123456789" target="_blank" style="color: var(--color-primary);">
                  +62 812-3456-7890
                </a>
              </p>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <h4>Email</h4>
              <p>
                <a href="mailto:info@bizmark.id" style="color: var(--color-primary);">
                  info@bizmark.id
                </a>
              </p>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <h4>Alamat</h4>
              <p>Karawang, Jawa Barat<br>Indonesia</p>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">🕒</div>
              <h4>Jam Operasional</h4>
              <p>Senin - Jumat: 08:00 - 17:00<br>Sabtu: 08:00 - 14:00</p>
            </div>
          </div>
          
          <div class="text-center mt-xl">
            <a href="https://wa.me/628123456789?text=Halo%20Bizmark.id,%20saya%20ingin%20konsultasi%20mengenai%20perizinan%20usaha" 
               target="_blank" 
               class="btn btn-primary btn-lg">
              🎯 Jadwalkan Konsultasi Sekarang
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="grid grid-3 mb-lg">
          <div>
            <h4 class="mb-md">Bizmark.id</h4>
            <p class="text-sm">
              PT. Timur Cakrawala Konsultan<br>
              Mitra strategis dalam urusan legalitas dan pengembangan bisnis di Indonesia.
            </p>
          </div>
          
          <div>
            <h4 class="mb-md">Layanan Utama</h4>
            <ul style="list-style: none; padding: 0;">
              <li class="mb-sm"><a href="#services" class="text-sm" style="color: var(--color-text-secondary);">Perizinan Lingkungan</a></li>
              <li class="mb-sm"><a href="#services" class="text-sm" style="color: var(--color-text-secondary);">Perizinan Usaha</a></li>
              <li class="mb-sm"><a href="#services" class="text-sm" style="color: var(--color-text-secondary);">Inkubator UMKM</a></li>
              <li class="mb-sm"><a href="#services" class="text-sm" style="color: var(--color-text-secondary);">Laporan Keuangan</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="mb-md">Kontak</h4>
            <p class="text-sm mb-sm">📱 +62 812-3456-7890</p>
            <p class="text-sm mb-sm">📧 info@bizmark.id</p>
            <p class="text-sm">📍 Karawang, Jawa Barat</p>
          </div>
        </div>
        
        <div style="border-top: 1px solid var(--color-separator); padding-top: var(--space-lg);">
          <p class="text-sm text-center">
            © 2024 Bizmark.id - PT. Timur Cakrawala Konsultan. All rights reserved.
          </p>
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
      }
    });
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
  const animateElements = document.querySelectorAll('.animate-fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
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
});

// Export for potential future use
export { app, init };
