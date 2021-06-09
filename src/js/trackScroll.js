import { refs } from './refs';
export default function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.goTopBtn.classList.remove('back_to_top-show');
  }
}
