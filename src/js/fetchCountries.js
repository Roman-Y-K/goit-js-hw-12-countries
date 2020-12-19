export default function fetchCountries(searchQuery) {
  const url = "https://restcountries.eu/rest/v2/name/";

  return fetch(`${url}${searchQuery}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Ошибка");
  });
}
