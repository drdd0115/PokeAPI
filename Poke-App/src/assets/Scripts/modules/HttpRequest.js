import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
});

// instance
export const getPokemonData = async (pokeName) => {
  try {
    const response = await instance.get(pokeName); //fixed
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Pokemon not found");
  }
}