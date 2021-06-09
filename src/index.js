import './sass/main.scss';
import { refs } from './js/refs';
import cardImgTpl from './templates/cardImgTpl.hbs';
import PixApiService from './js/apiService';
import LoadMoreBtn from './js/onLoadButton';
import makeNotification from './js/notifications';
import { alert, error, success } from '@pnotify/core';
import trackScroll from './js/trackScroll';
import backToTop from './js/backToTop';

window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const pixApiService = new PixApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  if (evt.currentTarget.elements.query.value.trim() === '') {
    return makeNotification(alert, 'Warning', 'Empty request');
  }

  pixApiService.query = evt.currentTarget.elements.query.value.trim();

  loadMoreBtn.show();
  loadMoreBtn.disable();

  pixApiService.resetPage();

  pixApiService.fetchArticles().then(items => {
    clearContainer(refs.gallery);

    if (items.length === 0) {
      loadMoreBtn.hide();
      return makeNotification(error, 'SORRY', 'Pictures not found');
    }

    makeNotification(success, 'Success', 'Some pictures was found');
    appendItemsMarkup(refs.gallery, cardImgTpl, items);

    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();

  pixApiService.fetchArticles().then(items => {
    appendItemsMarkup(refs.gallery, cardImgTpl, items);
    loadMoreBtn.enable();

    refs.gallery.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  });
}

function appendItemsMarkup(container, template, items) {
  container.insertAdjacentHTML('beforeend', template(items));
}

function clearContainer(container) {
  container.innerHTML = '';
}
