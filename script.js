// const { fetchProducts } = require("./helpers/fetchProducts");

function createProductImageElement(imageSource) {
  // Pré-pronta
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  // Pré-pronta
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  // Pré-pronta
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getClickFromItemAdd(event) {
  // Lógica:
  // Essa função é chamada toda vez que detecta um clique no botão que contenha texto "Adicionar ao carrinho!"
  // A partir do elemento do botão, recupera o elemento pai => primeiro elemento(SKU) => texto interno (SKU)
  // Passa esse SKU para a função renderCartITems
  if ( event.target.innerText === 'Adicionar ao carrinho!') {
    const targetID = event.target.parentElement.firstChild.innerHTML;
    renderCartItems(targetID);
  }
}
addEventListener('click', getClickFromItemAdd)

function getSkuFromProductItem(item) {
  // Pré-pronta
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // Limpa o item selecionado do carrinho (refinar o clique para somente o "X")
  // pega o evento do clique, sobe para o elemento pai, remove o filho 'evento'
  event.target.parentNode.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  // Pré-pronta
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Recebe um array de objetos
async function renderItemsList(param) {
  // Lógica:
  //  fetchProducts = objeto com os resultados de pesquisa (results: vários objetos)
  //  Mandar cada entrada de fetchProducts para createProductItemElement.
  //  createProductItemElement vai montar a lista de produtos necessária
  //  por fim, levar os elementos criados para o palco
  const fetchedProducts = await fetchProducts(param);
  fetchedProducts.forEach((item) => {
    document.querySelector('.items')
    .appendChild(createProductItemElement(item));
  });
}

async function renderCartItems(param) {
  // Lógica:
  //  Recebe o SKU da função getClickFromItemAdd, passa SKU para fetchItem
  //  fetchItem retorna objeto com o resultado de pesquisa (um único item)
  //  Mandar resultado de fetchItem para createCartItemElement.
  //  createCartItemElement vai fabricar o elemento li
  //  por fim, leva o elemento criado para o palco
  const fetchedItems = await fetchItem(param);

  document
  .querySelector('.cart__items')
  .appendChild(createCartItemElement(fetchedItems));
}

window.onload = () => {
  renderItemsList('computador');
};
