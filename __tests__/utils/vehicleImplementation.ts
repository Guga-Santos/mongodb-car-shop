import { IVehicle } from '../../src/interfaces/IVehicle';

export const testVehicleInterface = (obj: IVehicle): boolean =>
  typeof obj.model === 'string';

export default { testVehicleInterface };
