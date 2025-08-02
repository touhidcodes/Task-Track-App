import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),

  deadline: z
    .date({
      message: "Deadline is required",
    })
    .refine((date) => date > new Date(), {
      message: "Deadline must be in the future",
    }),
});

export type TCreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
