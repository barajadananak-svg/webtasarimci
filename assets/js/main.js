// ========================================
// Hazır Web Site Satışı - Ana JavaScript
// Modern, İnteraktif, E-Ticaret Odaklı
// ========================================

document.addEventListener('DOMContentLoaded', function() {

  // ========== Header Scroll Effect ==========
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ========== Mobile Menu Toggle ==========
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
  }

  // ========== Hero Slider ==========
  const initSlider = () => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');

    let currentSlide = 0;
    const slideCount = slides.length;

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      currentSlide = (index + slideCount) % slideCount;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    // Auto play
    let autoPlay = setInterval(nextSlide, 5000);

    // Reset auto play on interaction
    const resetAutoPlay = () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(nextSlide, 5000);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    };
  };

  initSlider();

  // ========== Product Gallery (Thumbnail Gallery) ==========
  const initProductGallery = () => {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || !thumbnails.length) return;

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));

        // Add active class to clicked thumbnail
        this.classList.add('active');

        // Update main image
        const newSrc = this.src;
        mainImage.style.opacity = '0';

        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 200);
      });
    });
  };

  initProductGallery();

  // ========== Dinamik Fiyatlandırma Hesaplama ==========
  const initPriceCalculator = () => {
    const form = document.getElementById('purchase-form');
    if (!form) return;

    const inputs = {
      package: document.getElementById('package'),
      domain: document.getElementById('domain'),
      hosting: document.getElementById('hosting'),
      content: document.getElementById('content'),
      logo: document.getElementById('logo'),
      seo: document.getElementById('seo'),
      ssl: document.getElementById('ssl')
    };

    const priceDisplay = document.getElementById('total-price');
    const detailsDiv = document.getElementById('price-details');

    // Fiyat tablosu
    const prices = {
      package: {
        'baslangic': 2999,
        'standart': 3999,
        'profesyonel': 4999,
        'kurumsal': 7999,
        'eticaret': 9999
      },
      domain: {
        'yok': 0,
        'com': 0,
        'com-tr': 0,
        'net': 0,
        'org': 150
      },
      hosting: {
        '5gb': 0,
        '10gb': 500,
        '20gb': 1000,
        '50gb': 2000,
        '100gb': 3500
      },
      content: {
        'hazir': 0,
        'yardim': 1500,
        'profesyonel': 3500
      },
      logo: {
        'var': 0,
        'basit': 500,
        'profesyonel': 1500,
        'premium': 3000
      },
      seo: {
        'hayir': 0,
        'temel': 1000,
        'ileri': 2500
      },
      ssl: {
        'dahil': 0,
        'premium': 500
      }
    };

    const calculateTotal = () => {
      let total = 0;
      let details = [];

      // Paket fiyatı
      if (inputs.package && inputs.package.value) {
        const packagePrice = prices.package[inputs.package.value] || 0;
        total += packagePrice;
        const packageText = inputs.package.options[inputs.package.selectedIndex].text;
        details.push(`${packageText}: ${packagePrice.toLocaleString('tr-TR')} ₺`);
      }

      // Domain
      if (inputs.domain && inputs.domain.value && inputs.domain.value !== 'yok') {
        const domainPrice = prices.domain[inputs.domain.value] || 0;
        if (domainPrice > 0) {
          total += domainPrice;
          details.push(`Domain: ${domainPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // Hosting
      if (inputs.hosting && inputs.hosting.value) {
        const hostingPrice = prices.hosting[inputs.hosting.value] || 0;
        if (hostingPrice > 0) {
          total += hostingPrice;
          const hostingText = inputs.hosting.options[inputs.hosting.selectedIndex].text;
          details.push(`${hostingText}: ${hostingPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // İçerik
      if (inputs.content && inputs.content.value) {
        const contentPrice = prices.content[inputs.content.value] || 0;
        if (contentPrice > 0) {
          total += contentPrice;
          const contentText = inputs.content.options[inputs.content.selectedIndex].text;
          details.push(`${contentText}: ${contentPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // Logo
      if (inputs.logo && inputs.logo.value) {
        const logoPrice = prices.logo[inputs.logo.value] || 0;
        if (logoPrice > 0) {
          total += logoPrice;
          const logoText = inputs.logo.options[inputs.logo.selectedIndex].text;
          details.push(`${logoText}: ${logoPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // SEO
      if (inputs.seo && inputs.seo.value) {
        const seoPrice = prices.seo[inputs.seo.value] || 0;
        if (seoPrice > 0) {
          total += seoPrice;
          const seoText = inputs.seo.options[inputs.seo.selectedIndex].text;
          details.push(`${seoText}: ${seoPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // SSL
      if (inputs.ssl && inputs.ssl.value) {
        const sslPrice = prices.ssl[inputs.ssl.value] || 0;
        if (sslPrice > 0) {
          total += sslPrice;
          const sslText = inputs.ssl.options[inputs.ssl.selectedIndex].text;
          details.push(`${sslText}: ${sslPrice.toLocaleString('tr-TR')} ₺`);
        }
      }

      // KDV hesapla (%20)
      const kdv = total * 0.20;
      const totalWithKDV = total + kdv;

      // Fiyatı güncelle
      if (priceDisplay) {
        priceDisplay.innerHTML = `
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">
            ${totalWithKDV.toLocaleString('tr-TR')} ₺
          </div>
          <div style="font-size: 1rem; color: var(--gray-600); margin-top: 0.5rem;">
            (${total.toLocaleString('tr-TR')} ₺ + ${kdv.toLocaleString('tr-TR')} ₺ KDV)
          </div>
        `;
      }

      // Detayları göster
      if (detailsDiv && details.length > 0) {
        detailsDiv.innerHTML = `
          <div style="background: var(--gray-100); padding: 1.5rem; border-radius: var(--radius-lg); margin-top: 1rem;">
            <h4 style="margin-bottom: 1rem; color: var(--gray-900);">Fiyat Detayları:</h4>
            ${details.map(detail => `<div style="margin-bottom: 0.5rem;">• ${detail}</div>`).join('')}
            <div style="border-top: 2px solid var(--gray-300); margin-top: 1rem; padding-top: 1rem; font-weight: 700;">
              Toplam: ${totalWithKDV.toLocaleString('tr-TR')} ₺ (KDV Dahil)
            </div>
          </div>
        `;
      }
    };

    // Event listeners
    Object.values(inputs).forEach(input => {
      if (input) {
        input.addEventListener('change', calculateTotal);
      }
    });

    // İlk hesaplama
    calculateTotal();
  };

  initPriceCalculator();

  // ========== WhatsApp Satın Al ==========
  window.sendWhatsAppOrder = function() {
    const form = document.getElementById('purchase-form');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // WhatsApp mesajı oluştur
    let message = '🛒 *YENİ SİPARİŞ*\n\n';
    message += `📦 Paket: ${data.package}\n`;
    message += `🌐 Domain: ${data.domain || 'Belirtilmedi'}\n`;
    message += `💾 Hosting: ${data.hosting || 'Belirtilmedi'}\n`;
    message += `📝 İçerik: ${data.content || 'Belirtilmedi'}\n`;
    message += `🎨 Logo: ${data.logo || 'Belirtilmedi'}\n`;
    message += `🔍 SEO: ${data.seo || 'Belirtilmedi'}\n\n`;

    if (data.name) message += `👤 Ad Soyad: ${data.name}\n`;
    if (data.email) message += `📧 E-posta: ${data.email}\n`;
    if (data.phone) message += `📱 Telefon: ${data.phone}\n`;
    if (data.notes) message += `\n💬 Notlar: ${data.notes}\n`;

    const whatsappNumber = '905320000000'; // Telefon numarasını buradan değiştir
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  // ========== Form Validasyonu ==========
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--danger)';

          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
        }
      });

      if (isValid) {
        // Form geçerliyse WhatsApp'a yönlendir
        if (form.id === 'purchase-form') {
          sendWhatsAppOrder();
        } else {
          alert('✅ Formunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
          form.reset();
        }
      } else {
        alert('⚠️ Lütfen tüm zorunlu alanları doldurun.');
      }
    });
  });

  // ========== Smooth Scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu
        if (navMenu) navMenu.classList.remove('active');
      }
    });
  });

  // ========== Active Page Highlighting ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== Lazy Loading Images ==========
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ========== Scroll Animations ==========
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  };

  animateOnScroll();

  // ========== Category Filter ==========
  window.filterCategory = function(category) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
      if (category === 'all' || product.dataset.category === category) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  // ========== Search Functionality ==========
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const products = document.querySelectorAll('.product-card');

      products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  }

  console.log('🚀 Hazır Web Site Satışı - Sistem Yüklendi!');

  // ========== Shopping Cart System ==========
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCartCount = () => {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  };

  window.addToCart = function(productId, productName, productPrice, productImage, productCategory) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show notification
    alert(`✅ ${productName} sepete eklendi!`);
  };

  window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartPage();
  };

  window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartPage();
      }
    }
  };

  const renderCartPage = () => {
    const cartTableBody = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartTableBody) return;

    if (cart.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 3rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
            <h3>Sepetiniz Boş</h3>
            <p style="color: var(--gray-600); margin-bottom: 2rem;">Henüz sepetinize ürün eklemediniz.</p>
            <a href="kategoriler.html" class="btn btn-primary">Ürünleri İncele</a>
          </td>
        </tr>
      `;
      if (cartSummary) cartSummary.style.display = 'none';
      return;
    }

    let subtotal = 0;
    const rows = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      return `
        <tr>
          <td>
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          </td>
          <td>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-category">${item.category}</div>
          </td>
          <td><strong>${formatPrice(item.price)}</strong></td>
          <td>
            <div class="cart-quantity">
              <button class="cart-quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
              <input type="number" value="${item.quantity}" class="cart-quantity-input" readonly>
              <button class="cart-quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
          </td>
          <td><strong>${formatPrice(itemTotal)}</strong></td>
          <td>
            <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">🗑️ Sil</button>
          </td>
        </tr>
      `;
    }).join('');

    cartTableBody.innerHTML = rows;

    if (cartSummary) {
      const kdv = subtotal * 0.20;
      const total = subtotal + kdv;

      cartSummary.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;">Sipariş Özeti</h3>
        <div class="cart-summary-row">
          <span class="cart-summary-label">Ara Toplam:</span>
          <span class="cart-summary-value">${formatPrice(subtotal)}</span>
        </div>
        <div class="cart-summary-row">
          <span class="cart-summary-label">KDV (%20):</span>
          <span class="cart-summary-value">${formatPrice(kdv)}</span>
        </div>
        <div class="cart-summary-row total">
          <span class="cart-summary-label">Genel Toplam:</span>
          <span class="cart-summary-value">${formatPrice(total)}</span>
        </div>
        <button class="btn btn-primary btn-block mt-3" onclick="proceedToCheckout()">
          Sipariş Tamamla
        </button>
      `;
    }
  };

  window.proceedToCheckout = function() {
    if (cart.length === 0) {
      alert('Sepetinizde ürün bulunmuyor!');
      return;
    }

    let message = '🛒 *YENİ SİPARİŞ*\n\n';
    cart.forEach(item => {
      message += `📦 ${item.name}\n`;
      message += `   Adet: ${item.quantity}\n`;
      message += `   Fiyat: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const kdv = subtotal * 0.20;
    const total = subtotal + kdv;

    message += `💰 Ara Toplam: ${formatPrice(subtotal)}\n`;
    message += `📊 KDV: ${formatPrice(kdv)}\n`;
    message += `✅ *Toplam: ${formatPrice(total)}*\n`;

    const whatsappNumber = '905320000000';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  };

  // Initialize cart on page load
  updateCartCount();
  if (document.getElementById('cart-items')) {
    renderCartPage();
  }

  // ========== Domain Search API ==========
  window.searchDomain = async function() {
    const domainInput = document.getElementById('domain-search');
    const resultDiv = document.getElementById('domain-result');

    if (!domainInput || !resultDiv) return;

    const domainName = domainInput.value.trim();

    if (!domainName) {
      alert('Lütfen bir domain adı girin!');
      return;
    }

    // Show checking status
    resultDiv.className = 'domain-result checking';
    resultDiv.textContent = '🔍 Domain kontrol ediliyor...';

    try {
      // Simulate API call (Replace with real API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Random result for demo (Replace with real API response)
      const isAvailable = Math.random() > 0.5;

      if (isAvailable) {
        resultDiv.className = 'domain-result available';
        resultDiv.innerHTML = `
          ✅ <strong>${domainName}</strong> kullanılabilir!
          <button class="btn btn-sm btn-primary" style="margin-left: 1rem;" onclick="selectDomain('${domainName}')">
            Bu Domain'i Seç
          </button>
        `;
      } else {
        resultDiv.className = 'domain-result unavailable';
        resultDiv.innerHTML = `
          ❌ <strong>${domainName}</strong> kullanılamaz.
          <div style="margin-top: 0.5rem; font-size: 0.875rem;">
            Alternatif: ${domainName}web.com, ${domainName}pro.com
          </div>
        `;
      }
    } catch (error) {
      resultDiv.className = 'domain-result unavailable';
      resultDiv.textContent = '⚠️ Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };

  window.selectDomain = function(domainName) {
    const domainSelect = document.getElementById('domain');
    if (domainSelect) {
      // Add as selected domain
      const selectedDomainDiv = document.getElementById('selected-domain');
      if (selectedDomainDiv) {
        selectedDomainDiv.innerHTML = `
          <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: var(--radius); margin-top: 1rem;">
            ✅ Seçili Domain: <strong>${domainName}</strong>
          </div>
        `;
      }
      alert(`✅ ${domainName} seçildi!`);
    }
  };

  // Domain option selection
  const domainOptionCards = document.querySelectorAll('.domain-option-card');
  domainOptionCards.forEach(card => {
    card.addEventListener('click', function() {
      domainOptionCards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');

      const option = this.dataset.option;
      const domainFields = document.getElementById('domain-fields');

      if (option === 'new' && domainFields) {
        domainFields.style.display = 'block';
      } else if (domainFields) {
        domainFields.style.display = 'none';
      }
    });
  });

  // ========== Mobile Dropdown Toggle ==========
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
          dropdown.style.position = 'static';
          dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
          dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      });
    }
  });

});

// ========== Utility Functions ==========

// Format phone number
function formatPhone(phone) {
  return phone.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}

// Format price
function formatPrice(price) {
  return price.toLocaleString('tr-TR') + ' ₺';
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}