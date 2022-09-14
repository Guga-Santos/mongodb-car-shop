import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const carZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema };
