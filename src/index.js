import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countrylist: document.querySelector('.country-list'),
  countryinfo: document.querySelector('.country-info'),
};
let elem = '';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (!refs.input.value.trim()) {
    refs.countrylist.innerHTML = '';
    refs.countryinfo.innerHTML = '';

    return;
  }
  fetchCountries(refs.input.value.trim())
    .then(createCounries)
    .catch(error => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}
function createCounries(countries) {
  if (countries.length > 2 || countries.length <= 10) {
    renderList(countries);
    refs.countrylist.innerHTML = '';
    refs.countryinfo.innerHTML = 'elem';
  }
  if (countries.length === 1) {
    renderDiv(countries);
    refs.countrylist.innerHTML = '';
    refs.countryinfo.innerHTML = 'elem';
  }
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    refs.countrylist.innerHTML = '';
    refs.countryinfo.innerHTML = '';
  }
}

function renderList(countries) {
  elem = countries.reduce((acc, { name: { official }, flags: { svg } }) => {
    return (
      acc +
      `<li class = "country-items"><img src="${svg}" alt="flags" width="40" /><span>${official}</span></li>`
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
    <span class="country-span">${official}</span>
  </li>
  <div><span class="country-span">Capital:</span> ${capital}</div>
  <div><span class="country-span">Population:</span> ${population}</div>
  <div><span class="country-span">Languages:</span> ${Object.values(
    languages
  ).join(', ')}</div>`
      );
    },
    ''
  );
}
