describe('02 - Crie a interface IVehicle', () => {
  it('A interface Vehicle existe', () => {
    expect('Vehicle/exists').toCompile();
  });

  it('A interface possui os atributos solicitados', () => {
    expect('Vehicle/attributes').toCompile();
  });
});
