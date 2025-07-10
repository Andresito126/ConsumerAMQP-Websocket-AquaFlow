import * as z from "zod/v4"; 

export const OneSensorReadingsSchema = z.object({
    id: z.number(),
    idUser: z.number(),
    value: z.number(),
    date: z.string().datetime(),
    sensor_id: z.number(),
});

export type OneSensorReading = z.infer<typeof OneSensorReadingsSchema>;