const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track.querySelectorAll('.project-slide'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  let activeIndex = 0;

  const dots = slides.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show project ${index + 1}`);
    button.addEventListener('click', () => goTo(index));
    dotsWrap.appendChild(button);
    return button;
  });

  function update(options = { scroll: true }) {
    slides.forEach((slide, index) => {
      slide.toggleAttribute('aria-current', index === activeIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
    if (options.scroll) {
      slides[activeIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function goTo(index) {
    activeIndex = (index + slides.length) % slides.length;
    update();
  }

  prev.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  track.addEventListener('scroll', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const index = Math.round(track.scrollLeft / slideWidth);
    if (index !== activeIndex && index >= 0 && index < slides.length) {
      activeIndex = index;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeIndex));
    }
  }, { passive: true });

  update({ scroll: false });
}
