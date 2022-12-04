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
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
      refs.ul.innerHTML = '';
    });
}
function createCounries(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    renderList(countries);
    refs.div = '';
  } else if (countries.length === 1) {
    renderDiv(countries);
    refs.div.innerHTML = '';
  } else if (countries > 10) {
    refs.ul.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  refs.ul.innerHTML = elem;
}

function renderList(countries) {
  elem = countries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class = "country-items"><img src="${svg}" alt="flags" width="40" /><span class="country-span">${official}</span></li>`;
    })
    .join('');
}
function renderDiv(countries) {
  elem = countries.map(country => {
    return `<li class = "country-items">
    <img src="${country.flags.svg}" width = 40 alt="" />
    <span>${country.name.official}</span>
  </li>
  <div>Capital: ${country.capital}</div>
  <div>Population: ${country.population}</div>
  <div>Languages: ${Object.values(country.languages).join(`, `)}</div>`;
  });
}
