// Modal JavaScript Functions - Global funksiyalar
window.openContactModal = function() {
  console.log('openContactModal funksiyası çağırıldı!');
  const modal = document.getElementById('contactModal');
  
  if (!modal) {
    console.error('Modal element tapılmadı!');
    console.log('Səhifədəki bütün elementlər:', document.body.innerHTML.substring(0, 500));
    return;
  }
  
  console.log('Modal element tapıldı:', modal);
  console.log('Modal-ın cari class-ları:', modal.className);
  
  // Hide class-ını çıxar
  modal.classList.remove('hidden');
  
  // Kiçik gecikmə ilə show class əlavə et (animasiya üçün)
  setTimeout(() => {
    modal.classList.add('show');
    console.log('Show class əlavə edildi, yeni class-lar:', modal.className);
  }, 10);
  
  // Body scroll-unu blokla
  document.body.style.overflow = 'hidden';
  
  console.log('Modal açılması tamamlandı');
};

function openContactModal() {
  return window.openContactModal();
}

window.closeContactModal = function() {
  console.log('closeContactModal funksiyası çağırıldı!');
  const modal = document.getElementById('contactModal');
  
  if (!modal) {
    console.error('Modal element tapılmadı!');
    return;
  }
  
  // Show class-ını çıxar (animasiya başlar)
  modal.classList.remove('show');
  
  // Animasiya bitdikdən sonra hidden class əlavə et
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Body scroll-unu bərpa et
  }, 300);
  
  console.log('Modal bağlandı');
};

function closeContactModal() {
  return window.closeContactModal();
}

// Səhifə yükləndikdən sonra event listener-ləri əlavə et
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yükləndi, event listener-lər əlavə edilir...');
  
  // Contact button-a click event listener əlavə et
  const contactButton = document.getElementById('contact-link');
  if (contactButton) {
    console.log('Contact button tapıldı, click listener əlavə edilir...');
    contactButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Contact button click edildi!');
      openContactModal();
    });
  } else {
    console.error('Contact button tapılmadı!');
  }
  
  // Close button-a click event listener əlavə et
  const closeButton = document.getElementById('close-modal-btn');
  if (closeButton) {
    console.log('Close button tapıldı, click listener əlavə edilir...');
    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Close button click edildi!');
      closeContactModal();
    });
  } else {
    console.error('Close button tapılmadı!');
  }
  
  // Modal xaricinə klik etdikdə bağla
  document.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (modal && event.target === modal) {
      closeContactModal();
    }
  });

  // ESC düyməsi ilə bağla
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('contactModal');
      if (modal && !modal.classList.contains('hidden')) {
        closeContactModal();
      }
    }
  });
  
  // Image zoom functionality
  initializeImageZoom();
  
  console.log('Event listener-lər əlavə edildi');
});

// Magnifying glass zoom functionality
function initializeImageZoom() {
  const zoomContainers = document.querySelectorAll('.image-zoom-container');
  
  zoomContainers.forEach(container => {
    const image = container.querySelector('.zoom-image');
    const lens = container.querySelector('.zoom-lens');
    const hint = container.querySelector('.zoom-hint');
    
    if (!image || !lens) return;
    
    // Lens boyutunu ayarla (150x150px)
    const lensSize = 150;
    lens.style.width = lensSize + 'px';
    lens.style.height = lensSize + 'px';
    
    // Mouse enter - lens göster ve hint gizle
    container.addEventListener('mouseenter', function() {
      lens.classList.remove('hidden');
      if (hint) hint.style.opacity = '0';
    });
    
    // Mouse leave - lens gizle ve hint göster
    container.addEventListener('mouseleave', function() {
      lens.classList.add('hidden');
      if (hint) hint.style.opacity = '1';
    });
    
    // Mouse move - lens pozisyonunu güncelle
    container.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Lens merkezi mouse pozisyonuna gelecek şekilde ayarla
      const lensX = x - lensSize / 2;
      const lensY = y - lensSize / 2;
      
      // Lens'in container sınırları içinde kalmasını sağla
      const maxX = container.offsetWidth - lensSize;
      const maxY = container.offsetHeight - lensSize;
      
      const clampedX = Math.max(0, Math.min(lensX, maxX));
      const clampedY = Math.max(0, Math.min(lensY, maxY));
      
      lens.style.left = clampedX + 'px';
      lens.style.top = clampedY + 'px';
      
      // Zoom efekti için background pozisyonunu hesapla
      const zoomFactor = 2.5; // 2.5x zoom
      const bgX = -(clampedX + lensSize / 2) * zoomFactor + lensSize / 2;
      const bgY = -(clampedY + lensSize / 2) * zoomFactor + lensSize / 2;
      
      // Lens'in arka planını ayarla (büyütülmüş görüntü)
      lens.style.backgroundImage = `url('${image.src}')`;
      lens.style.backgroundSize = `${container.offsetWidth * zoomFactor}px ${container.offsetHeight * zoomFactor}px`;
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
      lens.style.backgroundRepeat = 'no-repeat';
    });
  });
}