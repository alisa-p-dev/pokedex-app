let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=1500";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
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

  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    loadingMessage.remove();
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiURL)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            weight: item.weight,
          };
          add(pokemon);
        });
      })
      .catch(function (error) {
        hideLoadingMessage();
        console.error(error);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (error) {
        hideLoadingMessage();
        console.error(error);
      });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");

    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    listpokemon.classList.add(
      "list-group-item",
      "list-group-item-action",
      "shadow-sm",
      "rounded"
    );

    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showModal(title, height, weight, image) {
    let modalHeader = document.querySelector(".modal-title");
    let modalContent = document.querySelector(".modal-body");

    modalHeader.innerHTML = "";
    modalContent.innerHTML = "";

    let titleElement = document.createElement("h4");
    titleElement.innerText = title.charAt(0).toUpperCase() + title.slice(1);

    let imageElement = document.createElement("img");
    imageElement.classList.add("img-fluid");
    imageElement.setAttribute("width", "50%");
    imageElement.src = image;

    let contentElementHeight = document.createElement("p");
    contentElementHeight.innerText = "Height: " + height;

    let contentElementWeight = document.createElement("p");
    contentElementWeight.innerText = "Weight: " + weight;

    modalHeader.appendChild(titleElement);
    modalContent.appendChild(imageElement);
    modalContent.appendChild(contentElementHeight);
    modalContent.appendChild(contentElementWeight);
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item.name, item.height, item.weight, item.imageUrl);
    });
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
