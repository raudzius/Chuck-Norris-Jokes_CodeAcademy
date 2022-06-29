const form = document.querySelector('form');
const div = document.querySelector('div');
const selectElement = document.querySelector('select');

fetch('https://api.chucknorris.io/jokes/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const optionEl = document.createElement('option');
      optionEl.textContent = category;
      optionEl.value = category;
      selectElement.append(optionEl);
    });
  });

form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const select = form.querySelector('select');
  const searchInputValue = form.elements.search.value;
  const selectedCategory = select.value;

  div.textContent = 'Loading...';

  fetch(`https://api.chucknorris.io/jokes/search?query=${searchInputValue}`)
    .then(res => {
      return res.json();
    })
    .then(jokes => {
      const filteredJokes = jokes.result.filter(joke =>
        joke.categories.includes(selectedCategory)
      );
      const jokeIndex = Math.floor(Math.random() * filteredJokes.length);

      div.textContent = filteredJokes[jokeIndex].value || 'No results...';
    })
    .catch(() => {
      div.textContent = 'Invalid input...';
    });
});
//     2. Sukurti galimybę pasirinkti juokelių kategoriją:
//   2.1. Sukurti formą, kurioje bus <select> elementas.
//   2.2. <select> elementas savyje turės <option> elementus. Juose galima pasirinkti juokelių kategoriją. Šie elementai turi susigeneruoti automatiškai, priklausomai nuo to, kokias kategorijas turi API.
//   2.3. Sukurti mygtuką, kurį paspaudus, sugeneruotų atsitiktinį juokelį pagal pasirinktą kategoriją.
// 3. Sukurti galimybę ieškoti juokelių pagal užklausos frazę.
// 4. Sukurti galimybę ieškoti juokelių pagal užklausos frazę nurodytoje kategorijoje.
