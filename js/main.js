//*? **************************************** NAVIGATION MENU **************************************** */

(() => {
  const menuBtn = document.querySelector('.menu-btn');
  navMenu = document.querySelector('.nav-menu');
  closeNav = document.querySelector('.close-nav-menu');

  menuBtn.addEventListener('click', showNav);
  closeNav.addEventListener('click', hideNav);

  function showNav() {
    navMenu.classList.add('open');
    bodyScrollingToggle();
  }

  function hideNav() {
    navMenu.classList.remove('open');
    bodyScrollingToggle();
    fadeOutEffect();
  }

  function fadeOutEffect() {
    document.querySelector('.fade-out-effect').classList.add('active');
    setTimeout(() => {
      document.querySelector('.fade-out-effect').classList.remove('active');
    }, 300);
  }

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('link-item')) {
      if (event.target.hash !== '') {
        event.preventDefault();
        const hash = event.target.hash;
        document.querySelector('.section.active').classList.add('hide');
        document.querySelector('.section.active').classList.remove('active');
        document.querySelector(hash).classList.add('active');
        document.querySelector(hash).classList.remove('hide');

        navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
        navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');

        event.target.classList.add('active', 'inner-shadow');
        event.target.classList.remove('outer-shadow', 'hover-in-shadow');
        hideNav();

        console.log(hash);
      }
    } else {
    }
  });
})();

//*? **************************************** ABOUT SECTION **************************************** */

(() => {
  const aboutSection = document.querySelector('.section-about');
  tabsContainer = document.querySelector('.about-tabs');

  tabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-item') && !event.target.classList.contains('active')) {
      const target = event.target.getAttribute('data-target');
      tabsContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
      event.target.classList.add('active', 'outer-shadow');
      aboutSection.querySelector('.tab-content.active').classList.remove('active');
      aboutSection.querySelector(target).classList.add('active');
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle('stop-scrolling');
}

//*? **************************************** PORTFOLIO FILTER  **************************************** */

(() => {
  const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector('.portfolio-popout'),
    prevBtn = popup.querySelector('.pp-prev'),
    nextBtn = popup.querySelector('.pp-next'),
    closeBtn = popup.querySelector('.pp-close'),
    projectDetailsContainer = popup.querySelector('.pp-details'),
    projectDetailsBtn = popup.querySelector('.pp-project-details-btn');
  let itemIndex, slideIndex, screenshots;

  filterContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('filter-item') && !event.target.classList.contains('active')) {
      filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
      event.target.classList.add('active', 'outer-shadow');
      const target = event.target.getAttribute('data-target');
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove('hide');
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-item-inner')) {
      const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
      screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshot');
      screenshots = screenshots.split(',');
      if (screenshots.length === 1) {
        prevBtn.style.disply = 'none';
        nextBtn.style.disply = 'none';
      } else {
        prevBtn.style.disply = 'block';
        nextBtn.style.disply = 'block';
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener('click', () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains('active')) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle('open');
    bodyScrollingToggle('');
  }
  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector('.pp-img');
    popup.querySelector('.pp-loader').classList.add('active');
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector('.pp-loader').classList.remove('active');
    };
    popup.querySelector('.pp-counter').innerHTML = slideIndex + 1 + ' of ' + screenshots.length;
  }

  nextBtn.addEventListener('click', () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });
  prevBtn.addEventListener('click', () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
    popup.querySelector('.pp-project-details').innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
    popup.querySelector('pp-title h2').innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute('data-category');
    console.log(category);
  }

  projectDetailsBtn.addEventListener('click', () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains('active')) {
      projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
      projectDetailsBtn.querySelector('i').classList.add('fa-plus');
      projectDetailsContainer.classList.remove('active');
      projectDetailsContainer.style.maxHeight = 0 + 'px';
    } else {
      projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
      projectDetailsBtn.querySelector('i').classList.add('fa-minus');
      projectDetailsContainer.classList.add('active');
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
      popup.scrollTo(0, portfolioItemsContainer.offsetTop);
    }
  }
})();

//*? **************************************** TESTIMONIAL SLIDER  **************************************** */

(() => {
  const sliderContainer = document.querySelector('.testimonial-slider-container');
  slides = sliderContainer.querySelectorAll('.testimonial-item');
  slideWidth = sliderContainer.offsetWidth;
  prevBtn = document.querySelector('.testimonial-slider-nav .prev');
  nextBtn = document.querySelector('.testimonial-slider-nav .next');
  activeSlide = sliderContainer.querySelector('.testimonial-item.active');
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

  slides.forEach((slide) => {
    slide.style.width = slideWidth + 'px';
  });

  sliderContainer.style.width = slideWidth * slides.length + 'px';

  nextBtn.addEventListener('click', () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + 'px';
  });
  prevBtn.addEventListener('click', () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });
  function slider() {
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + 'px';
  }
  slider();
})();

//*? **************************************** HIDE ALL SECTIONS  **************************************** */

(() => {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    if (!section.classList.contains('active')) {
      section.classList.add('hide');
    }
  });
})();
