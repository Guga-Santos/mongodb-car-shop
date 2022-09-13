import { ICar } from '../../../src/interfaces/ICar';
import { IVehicle } from '../../../src/interfaces/IVehicle';

const testVehicleInterface = (obj: IVehicle): boolean => true;

const testCar: ICar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

testVehicleInterface(testCar);
