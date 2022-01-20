const getSavedCartItems = () => {
  if(localStorage.getItem('cartItems')) {
    const savedItems = localStorage.getItem('cartItems');
    document.querySelector('.cart__items').innerHTML = savedItems;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
