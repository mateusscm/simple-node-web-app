import { z } from "zod";

export const createCitySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "City name must be at least 3 characters long")
    .max(50, {
      message: "City name must be between 3 and 50 characters long",
    }),
  state: z
    .string({
      required_error: "State is required",
      invalid_type_error: "State must be a string",
    })
    .min(3, "State must be at least 3 characters long")
    .max(50, {
      message: "State must be between 3 and 50 characters long",
    }),
});

export const filterSchema = z.object({
  filter: z
    .string()
    .min(3, "Filter must be at least 3 characters long")
    .nonempty(),
  limit: z.number().int().min(1, "Limit must be at least 1").nonnegative(),
});

export type CreateCityInput = z.infer<typeof createCitySchema>;
export type FilterInput = z.infer<typeof filterSchema>;
