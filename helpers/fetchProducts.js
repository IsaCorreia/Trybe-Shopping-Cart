// const fetch = require('node-fetch')

const fetchProducts = async (input) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`
  
  try {
    const response = await fetch(url)
    .then((response) => response.json())
    return response.results;
  } catch(error) {
    throw new Error(error)
  }
};

fetchProducts('computador')

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
