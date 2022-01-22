const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica se provido com o elemento HTML, chama o método localStorage', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se provido com o elemento HTML, chama o método localStorage, com dois argumentos', () => {
    const elHTML = '<ol><li>Item</li></ol>';
    saveCartItems(elHTML);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', elHTML);
  })
});
