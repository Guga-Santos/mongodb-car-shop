import { IMotorcycle } from '../../../src/interfaces/IMotorcycle';
import { IVehicle } from '../../../src/interfaces/IVehicle';

const testVehicleInterface = (obj: IVehicle): boolean => true;

const testMotorcycle: IMotorcycle = {
  model: 'Yamaha NEO',
  year: 2022,
  color: 'Blue',
  buyValue: 9000,
  category: 'Street',
  engineCapacity: 125,
};

testVehicleInterface(testMotorcycle);
