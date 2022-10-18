const optionList = document.querySelector(`.form-select`);
const pokemonSelector = document.getElementById(`pokemon-selector`);
const pokemonCard = document.getElementById(`pokemon-details`);
let options;
let abilitiesArr = [];
let typesArr = [];

getPokemons();

function getItGoing() {
  addingNames();
  getOptions();
}

let pokemonList = [];
async function getPokemons() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0/`
  );

  // converting to JSON
  const data = await response.json();
  data.results.map((pokemon) => {
    pokemonList.push(pokemon);
  });
  getItGoing();
}

async function getPokemonInfo(pokemon) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);

  // converting to JSON
  let pokemonInfo = await response.json();
  console.log(pokemonInfo);

  //getting abilities
  getAbilities(pokemonInfo);

  // getting types
  getTypes(pokemonInfo);

  renderCard(pokemonInfo);
}

function getAbilities(pokemonInfo) {
  clearArrData(abilitiesArr);
  for (ability of pokemonInfo.abilities) {
    abilitiesArr.push(ability.ability.name);
  }
}

function getTypes(pokemonInfo) {
  clearArrData(typesArr);
  for (type of pokemonInfo.types) {
    typesArr.push(type.type.name);
  }
}

function addingNames() {
  pokemonList.forEach((pokemon) => {
    let options = optionList.appendChild(document.createElement(`option`));
    options.setAttribute(`value`, pokemon.name);
    options.classList.add(`option`);
    options.innerHTML = pokemon.name;
  });
}

function clearArrData(arr) {
  arr.splice(0, arr.length);

  console.log(arr);
}

function getOptions() {
  option = document.querySelectorAll(`.option`);
}

optionList.addEventListener("click", function () {
  clearArrData(abilitiesArr);
  clearArrData(typesArr);
  let currentPokemon = optionList.options[optionList.selectedIndex].value;
  console.log(currentPokemon);
  getPokemonInfo(currentPokemon);
});

function renderCard(pokemonInfo) {
  pokemonCard.innerHTML = `<div class="card" style="width: 30rem">
  <h5 class="card-title">${pokemonInfo.name}</h5>
   <img id="official-artwork" src="
     https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
       pokemonInfo.id
     }.png"
    class="card-img-top" alt="front view" />
  <div id="image-container">
  
  <img id="front-view" src="${
    pokemonInfo.sprites.front_default
  }" class="card-img-top" alt="front view" />
  <img id="back-view" src="${
    pokemonInfo.sprites.back_default
  }" class="card-img-top" alt="back view" /></div>
  <div class="card-body">
  
 
  </div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item blue"><h5 style="font-weight: 550">abilities</h5>
  ${abilitiesArr.join(` , `)}</li>
  <li class="list-group-item blue"><h5 style="font-weight: 550">type</h5>
  ${typesArr.join(` , `)}</li>
 
  </ul>
  <div class="card-body gold">
  <a  target="_blank" href="https://en.wikipedia.org/wiki/${
    pokemonInfo.name
  }" class="card-link">more info from wikipedia</a>
  
  </div>
  </div>`;
}
