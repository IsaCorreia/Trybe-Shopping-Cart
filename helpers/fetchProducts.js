// const fetch = require('node-fetch')

const fetchProducts = (input) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`;
  
  try {
    return fetch(url)
    .then((response) => response.json())
    .then((response) => response.results);
  } catch (error) {
    throw new Error(`Erro: ${error}`);
  }
};

// const toPrint = async () => {
//   const print =  await fetchProducts('computador');
//   console.log(print);
// }
// toPrint()

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
