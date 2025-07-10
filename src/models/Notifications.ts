import * as z from "zod/v4"; 

export const NotificationsSchema = z.object({
    id_notification: z.number(),
    user_id: z.number(),
    filtrer_id: z.number(),
    notification_type_id: z.number(),
    timestamp: z.string().datetime(),
});

export type Notifications = z.infer<typeof NotificationsSchema>;