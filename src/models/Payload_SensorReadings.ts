import { SensorReadingsSchema } from "./SensorReadings";
import * as z from "zod/v4"; 

export const PayloadSensorReadingsSchema = z.object({
    idUser: z.number(),
    idFiltrer: z.number(),
    sensorReadings: z.array(SensorReadingsSchema),
});

export type PayloadSensorReadings = z.infer<typeof PayloadSensorReadingsSchema>;