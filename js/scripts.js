let pokemonRepository = (function () {
let pokemonList = [
  {
    name: "Squirtle",
    height: 1.08,
    types: ["water"],
  },
  {
    name: "Charmander",
    height: 2,
    types: ["fire"],
  },
  {
    name: "Miraidon",
    height: 11.06,
    types: ["electric", "dragon"],
  },
  {
    name: "Enamorus",
    height: 5.03,
    types: ["fairy", "flying"],
  },
];
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

//Display the list of pokemons names and height. Adding a comment if the height is bigger then 10
function displayPokemon(pokemon) {
  if (pokemon.height > 10) {
    document.write(
      `${pokemon.name} (height: ${pokemon.height}) - Wow, that\’s big!<br>`
    );
  } else {
    document.write(`${pokemon.name} (height: ${pokemon.height})<br>`);
  }
}

pokemonRepository.getAll().forEach(function(pokemon) {
    displayPokemon(pokemon);
  });
