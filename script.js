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

function getSkuFromProductItem(item) {
  // Pré-pronta
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
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

window.onload = () => {
  renderItemsList('computador');
};
