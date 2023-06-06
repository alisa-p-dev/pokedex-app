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
    if (typeof pokemon === "object" && Object.keys(pokemon).length === 3) {
      const requiredKeys = ["name", "height", "types"];
      const hasRequiredKeys = requiredKeys.every((key) =>
        Object.keys(pokemon).includes(key)
      );

      if (hasRequiredKeys) {
        pokemonList.push(pokemon);
      } else {
        console.error("Invalid object: Missing required keys");
      }
    } else {
      console.error("Invalid parameter: Expected an object");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function findByName(name) {
    const filteredPokemon = pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
    return filteredPokemon;
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
  };
})();

function displayPokemon(pokemon) {
  if (pokemon.height > 10) {
    document.write(
      `${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!<br>`
    );
  } else {
    document.write(`${pokemon.name} (height: ${pokemon.height})<br>`);
  }
}

pokemonRepository.getAll().forEach(function (pokemon) {
  displayPokemon(pokemon);
});
const pokemonByName = pokemonRepository.findByName("Squirtle");
console.log(pokemonByName);
