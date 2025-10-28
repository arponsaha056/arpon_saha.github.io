// script.js — interactivity: menu, reveal on scroll, gallery filters and lightbox, profile preview
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  window.toggleMobileMenu = function() {
    const m = document.getElementById('mobileMenu');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
  };

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: 0.15});
  reveals.forEach(r=>obs.observe(r));

  // Gallery filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  // initialize show for visible items
  items.forEach(it=>it.classList.add('show'));
  filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(it=>{
        if(cat === 'all' || it.dataset.category === cat){
          it.style.display = '';
          setTimeout(()=> it.classList.add('show'), 20);
        } else {
          it.style.display = 'none';
          it.classList.remove('show');
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = -1;
  let visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(i=>i.style.display !== 'none');

  function updateVisibleItems(){
    visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(i=>i.style.display !== 'none');
  }

  document.getElementById('galleryGrid').addEventListener('click', (e)=>{
    const item = e.target.closest('.gallery-item');
    if(!item) return;
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    openLightbox(item);
  });

  window.openLightbox = function(item){
    const img = item.querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = item.querySelector('.caption') ? item.querySelector('.caption').textContent : '';
    lightbox.setAttribute('aria-hidden', 'false');
  };

  window.closeLightbox = function(){
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  window.navigateLightbox = function(dir){
    updateVisibleItems();
    if(visibleItems.length === 0) return;
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    const nextItem = visibleItems[currentIndex];
    openLightbox(nextItem);
  };

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e){
    if(lightbox.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') navigateLightbox(-1);
      if(e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  // Profile image preview (client-side only)
  window.previewProfile = function(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(evt){
      document.getElementById('profilePhoto').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Contact form submit (placeholder)
  window.contactSubmit = function(e){
    e.preventDefault();
    alert('Thank you! To send messages, configure a form handler (see README).');
    e.target.reset();
    return false;
  };

  // Lazy-load gallery imgs
  const lazyImgs = document.querySelectorAll('.gallery-item img');
  lazyImgs.forEach(img=> img.loading = 'lazy');
});
