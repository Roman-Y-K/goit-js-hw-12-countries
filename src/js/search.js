const debounce = require("lodash.debounce");
import contriesListTpl from "../templates/countries-list.hbs";
import contriesCardTpl from "../templates/country-card.hbs";
import { PNotify } from "./pnotify";
import fetchCountries from "./fetchCountries";

const searchInputRef = document.querySelector(".js-search-input");
const containerRef = document.querySelector(".container-js");

searchInputRef.addEventListener("input", debounce(serchCountry, 500));

function serchCountry(e) {
  const queryValue = e.target.value;

  fetchCountries(queryValue)
    .then((data) => {
      if (data.length === 1) {
        createMarkup(data, contriesCardTpl);
        return;
      }

      if (data.length >= 2 && data.length <= 10) {
        createMarkup(data, contriesListTpl);
        return;
      }

      callNotification(
        "Too many matches found. Please enter a more specific query!",
      );
    })
    .catch((err) => {
      clearContainer();
      if (queryValue !== "") {
        callNotification("Enter correct query!");
      }
    });
}

function createMarkup(array, template) {
  clearContainer();
  const markap = template(array);

  containerRef.insertAdjacentHTML("afterbegin", markap);
}

function clearContainer() {
  containerRef.innerHTML = "";
}

function callNotification(string) {
  clearContainer();
  PNotify.error({
    text: string,
    stack: {
      dir1: "down",
      dir2: "left",
      firstpos1: 25,
      firstpos2: 25,
      modal: false,
    },
  });
}
