const limit = 150;
const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

// get pokemon types to render
const getPokemonTypes = (pokemonTypeContainer, types) => {
  let typeHeader = document.createElement("span");
  typeHeader.classList.add("type-heading");
  typeHeader.innerHTML = "Type: ";
  pokemonTypeContainer.append(typeHeader);
  types.forEach((pokemon) => {
    let type = document.createElement("span");
    type.classList.add("type", pokemon.type.name);
    type.innerHTML = pokemon.type.name;

    pokemonTypeContainer.append(type);
  });

  return pokemonTypeContainer;
};

// render pokemon card
const renderData = (pokemon) => {
  let cardContainer = document.querySelector(".container");
  let card = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardBodyHeader = document.createElement("div");
  let pokemonTypeContainer = document.createElement("div");
  let pokemonImgSrc = pokemon.sprites.other["official-artwork"].front_default;

  // add classes for styling
  card.classList.add("card");
  cardBody.classList.add("card-body");
  cardBodyHeader.classList.add("card-header");
  pokemonTypeContainer.classList.add("type-container");

  // card skeleton
  cardBody.innerHTML = `
    <div class="card-img">
        <img class="pokemon-img" src=${pokemonImgSrc}>
    </div>`;

  cardBodyHeader.innerHTML = `
    <h2 class="pokemon-name">${pokemon.name}</h2>
    <span class="pokemon-id">#${pokemon.id}</span>`;

  pokemonTypeContainer = getPokemonTypes(pokemonTypeContainer, pokemon.types);

  cardBody.append(cardBodyHeader, pokemonTypeContainer);
  card.append(cardBody);
  cardContainer.appendChild(card);
};

// get individual pokemon data
const getPokemonData = (results) => {
  const pokemonURL = results.url;

  fetch(pokemonURL)
    .then((response) => response.json())
    .then((pokemonData) => renderData(pokemonData));
};

// get all pokemons
const fetchAllPokemon = () => {
  fetch(url).then((response) =>
    response.json().then((Allpokemon) =>
      Allpokemon.results.forEach((pokemon) => {
        getPokemonData(pokemon);
      })
    )
  );
};

fetchAllPokemon();
