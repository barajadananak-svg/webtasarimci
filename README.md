# Hazır Web Site Satışı - Statik Web Sitesi

Modern, mobil uyumlu ve tamamen statik HTML/CSS ile hazırlanmış "Hazır Web Site Satışı" temalı çok sayfalı web sitesi.

## 📋 Proje Hakkında

Bu proje, küçük ve orta ölçekli işletmelere hazır web sitesi satışı yapan bir firmanın kurumsal web sitesi taslağıdır. Tamamen statik HTML, CSS ve vanilla JavaScript kullanılarak geliştirilmiştir.

## 🎯 Özellikler

- ✅ Tamamen statik (HTML + CSS + Vanilla JS)
- ✅ Mobil uyumlu (Responsive) tasarım
- ✅ Modern ve temiz arayüz
- ✅ SEO dostu yapı
- ✅ Cross-browser uyumlu
- ✅ Hızlı yükleme
- ✅ Kolay özelleştirilebilir

## 📁 Dosya Yapısı

```
webtasarimci/
├── index.html              # Anasayfa
├── paketler.html           # Paket listeleme sayfası
├── urun-detay.html         # Ürün/Paket detay sayfası
├── sss.html                # Sıkça Sorulan Sorular
├── iletisim.html           # İletişim sayfası
├── giris.html              # Müşteri giriş sayfası
├── yonetici-giris.html     # Yönetici giriş sayfası
├── assets/
│   ├── css/
│   │   └── style.css       # Ana stil dosyası
│   ├── js/
│   │   └── main.js         # Ana JavaScript dosyası
│   └── img/                # Görseller (placeholder'lar ile)
└── README.md               # Bu dosya
```

## 🎨 Sayfalar

### 1. Anasayfa (index.html)
- Hero alanı
- Neden Biz? bölümü (6 özellik kartı)
- Popüler Paketler (3 paket kartı)
- Sektörel Hazır Siteler (8 sektör kartı)
- Kısa SSS (4 soru)
- Müşteri Yorumları

### 2. Paketler (paketler.html)
- 8 farklı paket kartı
- Detaylı özellik listeleri
- Demo ve teklif butonları
- Ortak özellikler bölümü

### 3. Ürün Detay (urun-detay.html)
- Detaylı paket açıklaması
- Teknik özellikler kutusu
- Sekmeli içerik (Özellikler, Teknik, SSS)
- Galeri (lightbox ile)
- Demo Site ve Demo Admin linkleri
- Paket içeriği ve garantiler

### 4. SSS (sss.html)
- 21 soru/cevap
- Akordeon yapısı
- Kategorize edilmiş sorular

### 5. İletişim (iletisim.html)
- İletişim formu
- İletişim bilgileri
- Google Maps entegrasyonu
- Sosyal medya linkleri

### 6. Müşteri Girişi (giris.html)
- Kullanıcı giriş formu
- Beni hatırla özelliği
- Şifremi unuttum linki

### 7. Yönetici Girişi (yonetici-giris.html)
- Yönetici giriş formu
- 2FA desteği
- Güvenlik uyarıları

## 🎨 Tasarım

### Renk Paleti
- **Ana Renk:** #1e3a8a (Koyu Mavi)
- **İkincil Renk:** #f59e0b (Turuncu)
- **Arka Plan:** #f3f4f6 (Açık Gri)
- **Metin:** #374151 (Koyu Gri)

### Tipografi
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive font boyutları

## 🔧 JavaScript Özellikleri

- Mobil menü toggle
- Akordeon (SSS için)
- Lightbox (Galeri için)
- Sekmeli içerik (Tabs)
- Form validasyonu
- Smooth scroll
- Aktif sayfa menü işaretleme

## 📱 Responsive Tasarım

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 320px - 767px

Tüm sayfalar mobil cihazlarda mükemmel çalışır.

## 🚀 Kurulum ve Kullanım

1. Projeyi klonlayın veya indirin
2. Herhangi bir web tarayıcısında `index.html` dosyasını açın
3. Yerel sunucu kullanmak isterseniz:
   ```bash
   # Python ile
   python -m http.server 8000

   # Node.js ile (http-server)
   npx http-server
   ```

## ✏️ Özelleştirme

### Renkleri Değiştirme
`assets/css/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
  --primary-color: #1e3a8a;
  --secondary-color: #f59e0b;
  /* ... diğer renkler */
}
```

### İçerik Güncelleme
- HTML dosyalarındaki metinleri düzenleyin
- Placeholder görselleri gerçek görsellerle değiştirin
- İletişim bilgilerini güncelleyin

### Yeni Sayfa Ekleme
1. Mevcut bir sayfayı kopyalayın
2. Header ve Footer'ı koruyun
3. İçeriği özelleştirin
4. Menüye yeni sayfayı ekleyin

## 🌐 Tarayıcı Desteği

- ✅ Chrome (son 2 versiyon)
- ✅ Firefox (son 2 versiyon)
- ✅ Safari (son 2 versiyon)
- ✅ Edge (son 2 versiyon)

## 📝 Yapılacaklar (İyileştirmeler)

- [ ] Gerçek görseller ekle
- [ ] Backend entegrasyonu (form gönderimi)
- [ ] Gerçek demo site linkleri
- [ ] Blog sayfası ekle
- [ ] Arama özelliği
- [ ] Dil seçeneği (TR/EN)
- [ ] Dark mode

## 📄 Lisans

Bu proje eğitim ve demo amaçlıdır.

## 👤 İletişim

- **E-posta:** info@hazirsiteornek.com
- **Telefon:** 0 532 000 00 00
- **Adres:** Çukurova / Adana

---

**Not:** Bu proje tamamen statik HTML/CSS/JS kullanılarak hazırlanmıştır. Gerçek bir projede backend entegrasyonu, veritabanı ve güvenlik özellikleri eklenmelidir.

## 🎓 Kullanılan Teknolojiler

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- Google Maps API (iframe)

---

**Geliştirme Tarihi:** 2024
**Versiyon:** 1.0.0