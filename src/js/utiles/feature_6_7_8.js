import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getPopMovies } from './javascript/api';

const paginationContainer = document.querySelector('#tui-pagination-container');

//опції для пагінації
const paginDesktopOptions = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginMobileOptions = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

//опції для адаптиву
let options = null;
if (window.screen.width <= 480) {
  options = paginMobileOptions;
} else {
  options = paginDesktopOptions;
}

//ініціалізація пагінації
const pagination = new Pagination(paginationContainer, options);

//отримання поточної сторінки
const page = pagination.getCurrentPage();
console.log(page);

//запуск популярних фільмів за день
startPage();

//запускаємо пагінацію
pagination.on('beforeMove', loadMorePopMovies);

//плавний скрол вгору при кліку на кнопку
pagination.on('afterMove', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
