import Notiflix from 'notiflix';
import { refs } from './index';

const elem = [];

export function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      elem === data;

      if (elem.status === 404) {
        throw error;
      }
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length >= 2 || data.length < 10) {
        renderList();
      }
      // if (data.length === 1) {
      //   // createDivCountres();
      // }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderList(elem) {
  elem.reduce((acc, { name: { official }, flags: { svg } }) => {
    return (
      acc +
        `<li><img src="${svg}" alt="flags" width="40" /><span>${official}</span></li>`,
      ''
    );
  });
}

function createListCountres() {
  refs.ul.innerHTML = '';
  refs.ul.insertAdjacentElement('beforeend', renderList);
}
// function listCountres({ name: { official }, flags: { svg } }) {
//   return `<li><img src="${svg}" alt="flags" width="40" /><span>${official}</span></li>`;
// }

// function divCountres({ name, flags, capital, population, languages }) {}
// function createDivCountres() {}

// function createListCountres() {
//   // const list = elem.map(listCountres);
//   refs.ul.innerHTML = '';
//   refs.ul.insertAdjacentElement('beforeend', list.join(''));
// }
