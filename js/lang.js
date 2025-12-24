let isEnglish = true;
const toggle = document.getElementById("langToggle");

function switchLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = isEnglish ? el.dataset.ar : el.dataset.en;
  });

  document.documentElement.lang = isEnglish ? "ar" : "en";
  document.body.style.direction = isEnglish ? "rtl" : "ltr";
  toggle.textContent = isEnglish ? "EN" : "AR";
  isEnglish = !isEnglish;
}

switchLang();
toggle.addEventListener("click", switchLang);
// Services Swiper

// Services Swiper
const servicesSwiper = new Swiper('.services-swiper', {
  slidesPerView: 2,  // قلل العرض قليلاً
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.services-next',
    prevEl: '.services-prev',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 }, // أقل من 3 لتصغير العرض
  },
});

// Portfolio Swiper
const portfolioSwiper = new Swiper('.portfolio-swiper', {
  slidesPerView: 2, // قلل العرض قليلاً
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.portfolio-next',
    prevEl: '.portfolio-prev',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 },
  },
});

// Observer لتفعيل ظهور Section عند التمرير
const sections = document.querySelectorAll('.section-carousel');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));
