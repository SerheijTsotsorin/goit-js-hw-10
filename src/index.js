import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
// import templatesCountry from './templates/country-temp.hbs'

const DEBOUNCE_DELAY = 300;

const searchCountry = document.querySelector("#search-box");
const listCountry = document.querySelector('.country-list');

searchCountry.addEventListener(
    'input',
    debounce(handleInput, DEBOUNCE_DELAY)
);

function handleInput(evt) {
    const userInput = evt.target.value.trim();
    if (userInput === "") {
        listCountry.innerHTML = "";
        return;
    }
        fetchCountries(userInput)
            .then(showCountries)
            .catch(showError);
}

function showCountries (data) {
               if (data.length > 10) {
                   return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
               }
                
    if (data.length >= 2 && data.length <= 10) {
                    listCountry.innerHTML = markUpListCountries(data);
                }

                if (data.length === 1) {
                    listCountry.innerHTML = markupCountry(data[0]);
                }
            }

function showError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    console.log(error);
};

function markupCountry(country) {
    return `<div class="country-box">
    <img src="${country.flag}" class="image" alt="countries flag" width="150"/>
    <h1 class="name">${country.name}</h1>
        <ul class="country-content-list">
            <li class="country-content-item"> Capital:
            <span class="content-item-info">${country.capital} </span></li>
            <li class="country-content-item"> Population:
            <span class="content-item-info">${country.population}</span></li>
            <li class="country-content-item"> Languages:${country.languages.map((language) => `${language.name}`)}</li>
            </ul>
    </div>`;
};

function markUpListCountries(country) {
    
    return country
    .map(({ flag, name }) => {
        return `<li class="country-list"> 
      <img class="flag-list" src ="${flag}" alt="Flag of ${name}"  width="50"/>
      <span class = "name-list">${name}</span></li>`;
    })
        .join('');
}