import './sass/main.scss';
import { refs } from './js/refs';
import cardImgTpl from './templates/cardImgTpl.hbs';
import PixApiService from './js/apiService';
import makeNotification from './js/notifications';
import { alert, error, success } from '@pnotify/core';
import trackScroll from './js/trackScroll';
import backToTop from './js/backToTop';

window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

const pixApiService = new PixApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  pixApiService.query = evt.currentTarget.elements.query.value.trim();
  if (pixApiService.query === '') {
    return makeNotification(alert, 'Warning', 'Empty request');
  }

  pixApiService.resetPage();

  pixApiService.fetchArticles().then(items => {
    clearContainer(refs.gallery);

    if (items.length === 0) {
      return makeNotification(error, 'SORRY', 'Pictures not found');
    }

    makeNotification(success, 'Success', 'Some pictures was found');
    appendItemsMarkup(refs.gallery, cardImgTpl, items);
  });
}

function appendItemsMarkup(container, template, items) {
  container.insertAdjacentHTML('beforeend', template(items));
}

function clearContainer(container) {
  container.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && pixApiService.query !== '') {
      console.log('грузим ещё');
      pixApiService.fetchArticles().then(items => {
        appendItemsMarkup(refs.gallery, cardImgTpl, items);
      });
    }
  });
};

const observerOptions = {
  rootMargin: '250px',
};

const observer = new IntersectionObserver(onEntry, observerOptions);
observer.observe(refs.loadingPoint);
