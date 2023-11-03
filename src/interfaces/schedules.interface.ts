import { z } from "zod";
import { createSchedulesSchema } from "../schemas/schedules.schema";
import { Repository } from "typeorm";
import Schedule from "../entities/schedules.entity";

export type CreateSchedules = z.infer<typeof createSchedulesSchema>

export type SchedulesRepo = Repository<Schedule>