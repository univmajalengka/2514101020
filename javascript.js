document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  // --- NAVBAR SCROLL EFFECT ---
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (menuIcon) {
        if (mobileMenu.classList.contains('hidden')) {
          menuIcon.className = 'fa-solid fa-bars-staggered';
        } else {
          menuIcon.className = 'fa-solid fa-xmark';
        }
      }
    });
  }

  // Menutup drawer mobile menu ketika link diklik
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.className = 'fa-solid fa-bars-staggered';
    });
  });
});

// --- FILTER GALERI FOTO ---
function filterGallery(category, button) {
  const tabs = document.querySelectorAll('.gallery-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  button.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// --- MODAL ZOOM GAMBAR GALERI ---
function openModal(element) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  if (modal && modalImg) {
    const imgSrc = element.querySelector('img').src;
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  // --- NAVBAR SCROLL EFFECT ---
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (menuIcon) {
        if (mobileMenu.classList.contains('hidden')) {
          menuIcon.className = 'fa-solid fa-bars-staggered';
        } else {
          menuIcon.className = 'fa-solid fa-xmark';
        }
      }
    });
  }

  // Menutup drawer mobile menu ketika link diklik
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.className = 'fa-solid fa-bars-staggered';
    });
  });
});

// --- FILTER GALERI FOTO ---
function filterGallery(category, button) {
  const tabs = document.querySelectorAll('.gallery-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  button.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// --- MODAL ZOOM GAMBAR GALERI ---
function openModal(element) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  if (modal && modalImg) {
    const imgSrc = element.querySelector('img').src;
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Variabel simpan daftar gambar galeri
let currentGalleryList = [];
let currentModalIndex = 0;

// Fungsi Membuka Modal Pop-up
function openModal(element) {
  // Ambil semua elemen gambar yang sedang tampil (tidak di-hide oleh filter)
  const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
  currentGalleryList = visibleItems.map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt || 'Galeri Istana Stable'
  }));

  // Cari posisi gambar yang diklik
  const clickedSrc = element.querySelector('img').src;
  currentModalIndex = currentGalleryList.findIndex(item => item.src === clickedSrc);

  if (currentModalIndex === -1) currentModalIndex = 0;

  updateModalContent();

  const modal = document.getElementById('imageModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden'; // Matikan scroll halaman belakang
}

// Update gambar & teks caption modal
function updateModalContent() {
  if (currentGalleryList.length === 0) return;
  const imgData = currentGalleryList[currentModalIndex];
  
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  
  modalImg.src = imgData.src;
  modalCaption.textContent = imgData.alt;
}

// Panah Kanan (Next)
function nextModalImg(event) {
  if (event) event.stopPropagation();
  currentModalIndex = (currentModalIndex + 1) % currentGalleryList.length;
  updateModalContent();
}

// Panah Kiri (Prev)
function prevModalImg(event) {
  if (event) event.stopPropagation();
  currentModalIndex = (currentModalIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
  updateModalContent();
}

// Tutup Modal Pop-up
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = 'auto'; // Aktifkan kembali scroll halaman
}

// Dukungan Tombol Keyboard (Panah Kiri, Panah Kanan, & ESC untuk keluar)
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('imageModal');
  if (!modal.classList.contains('hidden')) {
    if (e.key === 'ArrowRight') nextModalImg();
    if (e.key === 'ArrowLeft') prevModalImg();
    if (e.key === 'Escape') closeModal();
  }
});

// Fungsi Tombol Panah Slider Galeri (Kiri / Kanan)
function slideGallery(direction) {
  const slider = document.getElementById('gallery-slider');
  if (!slider) return;
  
  // Mengambil lebar 1 kartu foto
  const card = slider.querySelector('.gallery-item');
  if (!card) return;
  
  const scrollAmount = card.offsetWidth + 24; // Lebar foto + jarak antar foto (gap)
  
  if (direction === 'left') {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

