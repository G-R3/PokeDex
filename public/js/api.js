let pokemonList = [];
let pokemTypes = [];
const pokedex = document.querySelector(".pokedex");
const searchBar = document.querySelector("#searchBar");

// search for a pokemon
searchBar.addEventListener("keyup", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filtered = pokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchQuery) ||
      pokemon.type[0].type.name.toLowerCase().includes(searchQuery) // can only search by the first type: TODO -> check all types
    );
  });

  // console.log(filtered);
  displayPokemons(filtered); // display pokemons matching search string
});

// get a pokemons type(s) so that they get their own individual HTML element
// This way we can give the individual element a class name equal to the type name
// it works lol
function geTypes(types) {
  const typeContainer = document.createElement("div");
  types.forEach((element) => {
    let span = document.createElement("span");
    span.classList.add("type", element.type.name);
    span.innerText = element.type.name;

    typeContainer.append(span);
  });

  return typeContainer.innerHTML;
}

// display pokemons by creating an HTML template using string literals
function displayPokemons(pokemonList) {
  const htmlTemplate = pokemonList
    .map((pokemon) => {
      return `
        <li class="pokemon">
            <img src=${pokemon.imgURL} class="pokemonImg">
            <div class="pokemonHeader">
                <h2 class="pokemonName">${pokemon.name}</h2>
                <p class="pokemonId">#${pokemon.id
                  .toString()
                  .padStart(3, "0")}</p>
            </div>
            <div class="typeContainer"> 
                Type(s): ${geTypes(pokemon.type)}
            </div>
            
        </li>
      `;
    })
    .join("");

  pokedex.innerHTML = htmlTemplate;
}

// fetch pokemons from API
const getPokemons = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    pokemonList = results.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.id,
      imgURL: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types,
    }));

    displayPokemons(pokemonList);
  });
};

getPokemons();
