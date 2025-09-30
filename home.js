// Initialize Swiper when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Initialize Swiper if it exists on the page
  if (document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      breakpoints: {
        768: {
          allowTouchMove: false
        }
      }
    });
  }
  
  // Lazy load videos
  const videos = document.querySelectorAll('video[data-src]');
  
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.getAttribute('data-src');
          video.removeAttribute('data-src');
          videoObserver.unobserve(video);
        }
      });
    });
    
    videos.forEach(video => {
      videoObserver.observe(video);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    videos.forEach(video => {
      video.src = video.getAttribute('data-src');
    });
  }
});

// Optimize images that enter viewport
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
}

// Call lazy loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
  lazyLoadImages();
}