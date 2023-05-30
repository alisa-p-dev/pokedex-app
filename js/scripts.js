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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 10) {
        document.write( `${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that\’s big!<br>`);
    }
  else { 
    document.write( `${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`
  );
}
}
