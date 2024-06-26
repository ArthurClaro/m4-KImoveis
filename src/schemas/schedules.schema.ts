import { z } from 'zod';

export const schedulesSchema = z.object({
    id: z.number().positive(),
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().int().positive(),
    userId: z.number().int().positive()
})

export const createSchedulesSchema = schedulesSchema.omit({ id: true, userId: true })