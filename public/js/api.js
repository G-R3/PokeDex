const limit = 150;
const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

const renderTypes = (container, types) => {
  let typeHeading = document.createElement("span");
  typeHeading.classList.add("type-heading");
  typeHeading.innerHTML = "Type: ";
  container.append(typeHeading);
  types.forEach((pokemon) => {
    console.log(pokemon);
    let typeSpan = document.createElement("span");
    typeSpan.classList.add("type", pokemon.type.name);
    typeSpan.innerHTML = pokemon.type.name;

    container.append(typeSpan);
  });

  return container;
};

// render pokemon card
const renderData = (pokeData) => {
  console.log(pokeData);
  let cardContainer = document.querySelector(".container-fluid");
  let card = document.createElement("div");
  let cardHeader = document.createElement("div");
  let cardBody = document.createElement("div");
  let typeContainer = document.createElement("div");

  cardHeader.classList.add("card-header");
  cardBody.classList.add("card-body");
  cardHeader.innerHTML = `
    <h1 class="card-header-tittle">${pokeData.name}</h1>
    <span class="card-header-number">${pokeData.id}</span>`;

  cardBody.innerHTML = `
    <div class="card-img">
        <img class="img" src=${pokeData.sprites.front_default}>
    </div>`;

  typeContainer = renderTypes(typeContainer, pokeData.types);
  card.append(cardHeader, cardBody, typeContainer);
  cardContainer.appendChild(card);
};

// get individual pokemon data
const getPokemonData = (results) => {
  const pokemonURL = results.url;

  fetch(pokemonURL)
    .then((response) => response.json())
    .then((pokeData) => renderData(pokeData));
};

// get all pokemons
const fetchAllPokemon = () => {
  fetch(url).then((response) =>
    response.json().then((pokemons) =>
      pokemons.results.forEach((pokemon) => {
        getPokemonData(pokemon);
      })
    )
  );
};

fetchAllPokemon();
