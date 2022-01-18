require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', async (done) => {
    expect(typeof fetchProducts).toBe('function');
    done();
  });
  it('Verifica se a função chama o fetch() quando fornecido o argumento "computador"', async (done) => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
    done();
  });
  it('Verifica se ao chamar fetchProducts com o argumento "computador", utiliza o endpoint especificado', async (done) => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url);
    done();
  })
  it('Verifica se, ao fornecer o argumento "computador" para fetchProducts, retorna uma estrutura de dados igual a do objeto referência', async (done) => {
    expect(fetchProducts('computador')).toBe(computadorSearch.results);
    done();
  })

  it('Verifica se ao ser chamada com argumento vazio, retorna mensagem de erro', (done) => {
    expect(fetchProducts()).toThrow(Error);
    done();
  })
  // fail('Teste vazio');
});
