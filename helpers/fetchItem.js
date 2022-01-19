// const fetch = require('node-fetch');

const fetchItem = (input) => {
  if (input === undefined) throw new Error('You need to provide an item ID');
  const url = `https://api.mercadolibre.com/items/${input}`;

  return fetch(url)
  .then((response) => response.json())
  .then((response) => response);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
