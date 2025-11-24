// ========================================
// assets/js/main.js
// Hazır Web Site Satışı - Ana JavaScript Dosyası
// ========================================

document.addEventListener('DOMContentLoaded', function() {

  // ========== Mobil Menü Toggle ==========
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // ========== Akordeon (SSS) ==========
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');

      // Tüm akordeonları kapat
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Tıklanan akordeon kapalıysa aç
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });

  // ========== Sekmeli İçerik (Tabs) ==========
  const tabButtons = document.querySelectorAll('.tab-button');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      const tabContainer = this.closest('.tabs');

      // Tüm butonlardan active sınıfını kaldır
      tabContainer.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });

      // Tüm içeriklerden active sınıfını kaldır
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // Tıklanan butona ve ilgili içeriğe active ekle
      this.classList.add('active');
      const targetContent = tabContainer.querySelector(`#${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ========== Lightbox (Galeri) ==========
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightbox = document.querySelector('.lightbox');

  // Lightbox yoksa oluştur
  if (galleryItems.length > 0 && !lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <div class="lightbox-content">
        <img src="" alt="Galeri Görseli">
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  // Galeri öğelerine tıklama olayı ekle
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img && lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scroll'u kilitle
      }
    });
  });

  // Lightbox kapatma
  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');

    closeBtn.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto'; // Scroll'u aç
    });

    // Lightbox dışına tıklandığında kapat
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ========== Smooth Scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Mobil menüyü kapat
          if (navMenu) {
            navMenu.classList.remove('active');
          }
        }
      }
    });
  });

  // ========== Form Validasyonu ==========
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basit form validasyonu
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        alert('Form başarıyla gönderildi! (Bu bir demo mesajıdır)');
        form.reset();
      } else {
        alert('Lütfen tüm zorunlu alanları doldurun.');
      }
    });
  });

  // ========== Aktif Sayfa Menü İşaretleme ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== Scroll Animasyonları (Opsiyonel) ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animasyon için elemanları seç (opsiyonel)
  document.querySelectorAll('.card, .package-card, .sector-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});

// ========== Yardımcı Fonksiyonlar ==========

// Telefon numarası formatla
function formatPhoneNumber(phone) {
  return phone.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}

// E-posta validasyonu
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// WhatsApp bağlantısı oluştur
function createWhatsAppLink(phone, message = '') {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}