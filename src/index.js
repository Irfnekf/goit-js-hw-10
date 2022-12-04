import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
let elem = '';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (!refs.input.value.trim()) {
    refs.ul.innerHTML = '';
    return;
  }
  fetchCountries(refs.input.value.trim())
    .then(createCounries)
    .catch(error => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}
function createCounries(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    renderList(countries);
  } else if (countries.length === 1) {
    renderDiv(countries);
  } else if (countries > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  refs.ul.innerHTML = elem;
}

function renderList(countries) {
  elem = countries.reduce((acc, { name: { official }, flags: { svg } }) => {
    return (
      acc +
      `<li class = "country-items"><img src="${svg}" alt="flags" width="40" /><span class="country-span">${official}</span></li>`
    );
  }, '');
}
function renderDiv(countries) {
  elem = countries.reduce(
    (
      acc,
      { name: { official }, flags: { svg }, capital, population, languages }
    ) => {
      return (
        acc +
        `<li class = "country-items">
    <img src="${svg}" width = 40 alt="" />
    <span>${official}</span>
  </li>
  <div>Capital: ${capital}</div>
  <div>Population: ${population}</div>
  <div>Languages: ${Object.values(languages).join(', ')}</div>`
      );
    },
    ''
  );
}
