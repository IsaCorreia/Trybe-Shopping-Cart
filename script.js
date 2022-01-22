const emptyCart = document.querySelector('.empty-cart');
const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const totalPrice = document.querySelector('.total-price');

function saveToCart() {
  saveCartItems(cartItems.innerHTML);
}
// ----------> Criação de elementos para DOM - INÍCIO <----------
// Funções pré-prontas
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}
// ----------> Criação de elementos para DOM - FIM <----------

// ----------> Renderização de elementos na tela - INÍCIO <----------
async function renderItemsList(param) {
  // Carrega o elemento "loading" enquanto busca pelo fetch.
  //  fetchProducts = objeto com os resultados de pesquisa (results: vários objetos)
  //  Ao receber o fetch, remove o elemento "loading"
  //  Mandar cada entrada de fetchProducts para createProductItemElement.
  //  createProductItemElement vai montar a lista de produtos necessária
  //  por fim, levar os elementos criados para o palco
  items.appendChild(createCustomElement('p', 'loading', 'Carregando...'));
  const fetchedProducts = await fetchProducts(param);
  items.querySelector('.loading').remove();
  fetchedProducts.forEach((item) => {
    document.querySelector('.items')
    .appendChild(createProductItemElement(item));
  });
}

async function renderCartItems(prodId) {
  //  Recebe o SKU da função getClickFromItemAdd, passa SKU para fetchItem
  //  fetchItem retorna objeto com o resultado de pesquisa (um único item)
  //  Mandar resultado de fetchItem para createCartItemElement.
  //  createCartItemElement vai fabricar o elemento li
  //  por fim, leva o elemento criado para o palco
  const fetchedItem = await fetchItem(prodId);
  cartItems.appendChild(createCartItemElement(fetchedItem));
  saveToCart();
  sumsTotalPrice(fetchedItem.price, true);
}

const sumsTotalPrice = (price, sum) => {
  if (sum) {
  totalPrice.innerText = +totalPrice.innerText + price;
  } else {
    totalPrice.innerText = +totalPrice.innerText - price;
  }
}
// ----------> Renderização de elementos na tela - FIM <----------

// ----------> Captura de cliques - INÍCIO <----------
cartItems.addEventListener('click', (event) => {
  // Limpa o item selecionado do carrinho (refinar o clique para somente o "X")
  // pega o evento do clique, sobe para o elemento pai, remove o filho 'evento'
  if (event.target.className === 'cart__item') {
    const price = event.target.innerText.split('$')[1];
    sumsTotalPrice(price, false);
    // sumTotalPrice(+totalPrice.innerText - event.target.price);
    event.target.remove();
    saveToCart();
  }
});

emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  saveToCart();
});

items.addEventListener('click', (event) => {
  // Essa função é chamada toda vez que detecta um clique no botão que contenha texto "Adicionar ao carrinho!"
  // A partir do elemento do botão, recupera o elemento pai => primeiro elemento(SKU) => texto interno (SKU)
  // Passa esse SKU para a função renderCartITems
  if (event.target.className === 'item__add') {
    const targetID = getSkuFromProductItem(event.target.parentElement);
    renderCartItems(targetID);
  }
});
// ----------> Captura de cliques - FIM <----------

window.onload = () => {
  renderItemsList('computador');
  getSavedCartItems();
};
