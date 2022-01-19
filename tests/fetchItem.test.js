require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Verifica se a função chama o fetch', async(done) => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    done()
  })
  it('Verifica se ao chamar a função com o argumento do item, utiliza o endpoint correto', async (done) => {
    const id = 'MLB1615760527';
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem(id);
    expect(fetch).toHaveBeenCalledWith(url);
    done()
  })
  it('Verifica se o retorno da função é um objeto conforme esperado', async (done) => {
    const id = 'MLB1615760527';
    const result = await fetchItem(id);
    expect(result).toBe(item);
    done();
  })
  it('Verifica se ao ser chamada com argumento vazio, a função retorna um erro', async (done) => {
    const expectedError = Error('You need to provide an item ID');
    await expect(() => fetchItem()).toThrow(expectedError);
    done();
  })
});
