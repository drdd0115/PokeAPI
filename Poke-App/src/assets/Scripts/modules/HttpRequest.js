import axios from "axios";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000,
});

const pokemonData = async (url) => (await instance.get(url)).data;

export const getPokemonData = (nameOrId) => pokemonData(`pokemon/${nameOrId}`);
export const getTypeData = (type) => pokemonData(`type/${type}`);
export const getAbilityData = (ability) => pokemonData(`ability/${ability}`);
export const getSpeciesData = (name) => pokemonData(`pokemon-species/${name}`);
export const getEvolutionData = (url) => pokemonData(url);

// instance
// export const getPokemonData = async (pokeName) => {
//   try {
//     const response = await instance.get(pokeName); //fixed
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     alert("Pokemon not found");
//   }
// }
