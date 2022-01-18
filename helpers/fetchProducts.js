// const fetch = require('node-fetch')

const fetchProducts = (input) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`
  
  try {
    return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const data = response.results;
      console.log(data);
      // Chamar todas as funções em script.js que precisam desse dado abaixo:
      convertIntoItems(data);
      createItemsList(data);
    });
  } catch(error) {
    return Error(`Erro: ${error}`);
  }
};
// fetchProducts('computador')

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
