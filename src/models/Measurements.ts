import { SensorReadings, SensorReadingsSchema } from "./SensorReadings";
import * as z from "zod/v4"; 

export const MeasurementsSchema = z.object({
    filtrer_id: z.number(),
    temperature: z.object(SensorReadingsSchema),
    tds: z.object(SensorReadingsSchema),
    ph: z.object(SensorReadingsSchema),
    turbidity: z.object(SensorReadingsSchema),
});

export type Measurements = z.infer<typeof MeasurementsSchema>;