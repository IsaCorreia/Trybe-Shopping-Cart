// const fetch = require('node-fetch')

const fetchProducts = (input) => {
  if (input === undefined) throw new Error('You need to provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`;
  
  try {
    return fetch(url)
    .then((response) => response.json())
    .then((response) => response.results);
  } catch (error) {
    throw new Error(`Erro: ${error}`);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
