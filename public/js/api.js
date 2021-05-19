const limit = 150;

// get pokemon types to render
function getPokemonTypes(pokemonTypeContainer, types) {
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

  return pokemonTypeContainer.innerHTML;
}

// render pokemon card
function renderData(pokemon) {
  let cardContainer = document.querySelector(".container");
  let card = document.createElement("div");
  let pokemonTypeContainer = document.createElement("div");
  let pokemonImgSrc = pokemon.sprites.other["official-artwork"].front_default;

  card.classList.add("card");
  pokemonTypeContainer.classList.add("type-container");
  pokemonTypeContainer.innerHTML = getPokemonTypes(
    pokemonTypeContainer,
    pokemon.types
  );

  const cardHTML = `
        <div class="card-img">
            <img class="pokemon-img" src="${pokemonImgSrc}" alt="${pokemon.name}">
        </div>
        <div class="card-header">
          <h2 class="pokemon-name">${pokemon.name}</h2>
          <span class="pokemon-id">${pokemon.id}</span>
        </div>`;

  card.innerHTML = cardHTML;

  card.append(pokemonTypeContainer);
  cardContainer.append(card);
}

// get individual pokemon data
const getPokemonData = async () => {
  for (let i = 1; i <= limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    const res = await fetch(url);
    const pokemonData = await res.json();

    console.log(pokemonData.id);
    renderData(pokemonData);
  }
};
getPokemonData();
