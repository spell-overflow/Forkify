// import { join } from 'core-js/core/array';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const generateMarkupBtnPrev = `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;

    const generateMarkupBtnNext = `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
  `;

    // Page 1 && other pages exist
    if (currPage === 1 && numPages > 1) {
      return generateMarkupBtnNext;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return generateMarkupBtnPrev;
    }

    // Other page
    if (currPage < numPages) {
      return generateMarkupBtnPrev + generateMarkupBtnNext;
    }
    // Page 1 && no other pages exist
    if (currPage === 1 && numPages === 1) {
      return '';
    }
  }
}
export default new PaginationView();
