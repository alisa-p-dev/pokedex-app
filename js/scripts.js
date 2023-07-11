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
          };
          add(pokemon);
          console.log(pokemon);
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
    listpokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add("btn");
    button.addEventListener("click", () => showDetails(pokemon));
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item.name, item.height, item.imageUrl);
      console.log(item);
    });
  }

  let modalContainer = document.querySelector("#modal-container");

  function showModal(title, text, image) {
    // Clear all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "x";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title.charAt(0).toUpperCase() + title.slice(1);

    let contentElement = document.createElement("p");
    contentElement.innerText = "height: " + text;

    let imageElement = document.createElement("img");
  imageElement.classList.add("img-fluid");
    imageElement.src = image;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
