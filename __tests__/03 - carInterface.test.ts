describe('03 - Crie a interface ICar a partir da interface IVehicle', () => {
  it('O tipo Car estende a Interface Vehicle', () => {
    expect('Cars/vehicleInterface').toCompile();
  });

  it('É possível criar um objeto do tipo Car', () => {
    expect('Cars/ok').toCompile();
  })

  it('Não é possível criar um  tipo Car sem as propriedades doorsQty e seatsQty', () => {
    expect('Cars/doorsQty').notToCompile();
    expect('Cars/seatsQty').notToCompile();
  });
});
