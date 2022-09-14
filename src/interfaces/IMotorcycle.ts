import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(0).max(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { motorcycleZodSchema };
