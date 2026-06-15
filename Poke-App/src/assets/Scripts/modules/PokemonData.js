// export const extractData = (pokemon) => ({
//   id: pokemon.id,
//   name: pokemon.name,
//   img: pokemon.sprites.front_default,
//   types: pokemon.types.map((item) => item.type.name),
//   stats: Object.fromEntries(
//     pokemon.stats.map((item) => [item.stat.name, item.base_stat]),
//   ),
// });

export const extractData = (pokemon) => {
  const types = pokemon.types.map((item) => {
    return item.type.name;
  });

  const statEntries = pokemon.stats.map((item) => {
    return [item.stat.name, item.base_stat];
  });

  const stats = Object.fromEntries(statEntries);

  console.log(types);
  console.log(statEntries);
  console.log(stats);

  return {
    id: pokemon.id,
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    types,
    stats,
  };
};

export const showData = (data) => {
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt=""></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dd>
  </dl>`;

  document.querySelector("#js-result").innerHTML = htmlData;
};
