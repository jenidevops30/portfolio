import { useEffect } from 'react';

const SELECTORS = [
  '.section-label',
  '.section-title',
  '.section-intro',
  '.about-grid',
  '.timeline > *',
  '.skill-group',
  '.projects-grid > *',
  '.arch-card',
  '.recognition-grid > *',
  '.contact-card',
  '.blog-topic-card',
];

const ScrollReveal = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll(SELECTORS.join(','));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    });

    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 75}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollReveal;
