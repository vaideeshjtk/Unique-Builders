/* ============================================
   UNIQUE BUILDERS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ NAVBAR ============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Navbar scroll effect
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll);

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');

  const highlightActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    mobileOverlay.style.display = mobileMenu.classList.contains('open') ? 'block' : 'none';
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile CTA button click
  const mobileCTABtn = document.querySelector('.navbar__mobile-cta .btn');
  if (mobileCTABtn) {
    mobileCTABtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  }


  // ============ SCROLL REVEAL ANIMATIONS ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve — let it stay visible
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ============ ANIMATED COUNTERS ============
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + '+';
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const statsSection = document.getElementById('stats');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // Also animate the about badge counter
  const aboutBadgeNumber = document.querySelector('.about__experience-badge .number');
  if (aboutBadgeNumber) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(aboutBadgeNumber);
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    aboutObserver.observe(aboutBadgeNumber);
  }


  // ============ PROJECT FILTERS ============
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('project-card--hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, index * 80);
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.classList.add('project-card--hidden');
          }, 300);
        }
      });
    });
  });


  // ============ TESTIMONIALS CAROUSEL ============
  const carousel = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialDots');
  const testimonialCards = carousel ? carousel.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;
  let autoPlayInterval;

  const createDots = () => {
    if (!dotsContainer) return;
    testimonialCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonials__dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.testimonials__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  const goToSlide = (index) => {
    if (!carousel) return;
    currentSlide = index;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
    resetAutoPlay();
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % testimonialCards.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + testimonialCards.length) % testimonialCards.length);
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  };

  if (carousel && testimonialCards.length > 0) {
    createDots();
    startAutoPlay();
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }


  // ============ CONTACT FORM ============
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        return;
      }

      // Simulate submission
      const submitBtn = document.getElementById('contactSubmit');
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1500);
    });

    // Input focus effects
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }


  // ============ NEWSLETTER FORM ============
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Subscribed!';
      btn.style.background = '#4ade80';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    });
  }


  // ============ BACK TO TOP ============
  const backToTop = document.getElementById('backToTop');

  const handleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTop);

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });


  // ============ PARALLAX EFFECT (Hero) ============
  const heroBg = document.querySelector('.hero__bg img');

  const handleParallax = () => {
    if (heroBg && window.innerWidth > 768) {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });


  // ============ PRELOADER (optional subtle fade-in) ============
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

});
