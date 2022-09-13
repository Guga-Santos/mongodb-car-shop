describe('01 - Crie a interface genérica IModel', () => {
  it('Existe a interface Model', () => {
    expect('Model/exists').toCompile();
  });

  it('A interface Model possui todas as funções solicitadas', () => {
    expect('Model/functions').notToCompile();
  });

  it('A interface Model pode ser implementada com qualquer tipo', () => {
    expect('Model/genericType').toCompile();
  });
});
