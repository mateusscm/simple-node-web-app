import { z } from "zod";

export const createCitySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name is required")
    .min(2, "City name must be at least 2 characters long")
    .max(50, {
      message: "City name must be between 2 and 50 characters long",
    }),
  state: z
    .string({
      required_error: "State is required",
      invalid_type_error: "State must be a string",
    })
    .min(2, "State must be at least 2 characters long")
    .max(50, {
      message: "State must be between 2 and 50 characters long",
    }),
});

export type CreateCityInput = z.infer<typeof createCitySchema>;
