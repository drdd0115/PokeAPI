import "../styles/style.css";
import {
  getPokemonData,
  getTypeData,
  getAbilityData,
  getSpeciesData,
  getEvolutionData,
} from "./modules/HttpRequest";
import { extractData, showData } from "./modules/PokemonData";

let currentPokemon = null;

const resultElement = document.querySelector("#js-result");

const showError = (message) => {
  resultElement.innerHTML = `<p class="error">${message}</p>`;
};

const displayPokemon = async (nameOrId) => {
  try {
    resultElement.textContent = "Loading...";

    const pokemonData = await getPokemonData(nameOrId);
    const extractedData = extractData(pokemonData);

    currentPokemon = extractedData;
    showData(extractedData);

    return extractedData;
  } catch (error) {
    console.error("failed to get Pokemon:", error);

    currentPokemon = null;
    showError("Pokemon could not be loaded.");

    return null;
  }
};

const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName");

  if (typeof pokeName !== "string") {
    return "";
  }

  return pokeName.trim().toLowerCase();
};

const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);

  if (!inputName) {
    showError("Please enter a Pokemon name.");
    return;
  }

  const submitButton = e.currentTarget.querySelector('button[type="submit"]');

  submitButton.disabled = true;

  try {
    await displayPokemon(inputName);
  } finally {
    submitButton.disabled = false;
  }
};

// ランダムなポケモンを表示するためのコード
const randomButton = document.querySelector("#js-random-button");

const randomHandler = async () => {
  randomButton.disabled = true;

  try {
    const midId = 1;
    const maxId = 151;
    const randomId = Math.floor(Math.random() * (maxId - midId + 1)) + midId;

    await displayPokemon(randomId);
  } finally {
    randomButton.disabled = false;
  }
};

const STORAGE_KEY = "favoritePokemon";

const loadFavorites = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

const showFavorites = () => {
  const favorites = loadFavorites();

  document.querySelector("#js-favorites").innerHTML = favorites
    .map(
      (pokemon) => `
    <article class="favorite-card">
      <button
        type="button"
        class="favorite-name"
        data-name="${pokemon.name}"
      >
        ${pokemon.name}
      </button>

      <img
        class="favorite-image"
        src="${pokemon.img ?? ""}"
        alt="${pokemon.name}"
      >

      <button type="button" data-remove-id="${pokemon.id}">
        Remove
      </button>
    </article>
  `,
    )
    .join("");
};

// お気に入り登録
document.querySelector("#js-favorite-button").addEventListener("click", () => {
  if (!currentPokemon) return;

  const favorites = loadFavorites();
  const alreadyExists = favorites.some(
    (pokemon) => pokemon.id === currentPokemon.id,
  );

  if (alreadyExists) return;

  favorites.push(currentPokemon);
  saveFavorites(favorites);
  showFavorites();
});

// お気に入り削除
document.querySelector("#js-favorites").addEventListener("click", async (e) => {
  const name = e.target.dataset.name;
  const removeId = Number(e.target.dataset.removeId);

  if (name) {
    await displayPokemon(name);
  }

  if (removeId) {
    const favorites = loadFavorites().filter(
      (pokemon) => pokemon.id !== removeId,
    );
    saveFavorites(favorites);
    showFavorites();
  }
});

randomButton.addEventListener("click", randomHandler);

document
  .querySelector("#js-form")
  .addEventListener("submit", (e) => submitHandler(e));

showFavorites();
